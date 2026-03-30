// ─── Phase 2 : Curateur IA ──────────────────────────────────────
// Prend les scan results, curate via Gemini, vérifie les existants,
// merge intelligemment, injecte les liens affiliés.

import { readFile, writeFile } from 'fs/promises'
import {
  CATALOGUE_PATH, CATEGORIES, PROFILES, BUDGET_TIERS,
  MIN_AI_SCORE, MAX_PRODUCTS, MIN_PER_CATEGORY,
} from './config.js'
import {
  geminiGenerate, withRetry, checkUrl, matchesCpuWhitelist,
  injectAffiliateTag, mapWithConcurrency, slugify, log,
} from './utils.js'

// ── Gemini output schema ────────────────────────────────────────

const PRODUCT_SCHEMA = {
  type: 'ARRAY',
  items: {
    type: 'OBJECT',
    properties: {
      name:          { type: 'STRING' },
      brand:         { type: 'STRING' },
      category:      { type: 'STRING', enum: CATEGORIES },
      profiles:      { type: 'ARRAY', items: { type: 'STRING', enum: PROFILES } },
      budgetTier:    { type: 'STRING', enum: BUDGET_TIERS },
      price:         { type: 'NUMBER' },
      originalPrice: { type: 'NUMBER' },
      isOnSale:      { type: 'BOOLEAN' },
      cpuModel:      { type: 'STRING' },
      specs: {
        type: 'OBJECT',
        properties: {
          cpu:            { type: 'STRING' },
          ram:            { type: 'STRING' },
          storage:        { type: 'STRING' },
          display:        { type: 'STRING' },
          gpu:            { type: 'STRING' },
          battery:        { type: 'STRING' },
          // New — for monitors
          panelType:      { type: 'STRING' },
          resolution:     { type: 'STRING' },
          refreshRate:    { type: 'STRING' },
          size:           { type: 'STRING' },
          // New — for docks/peripherals
          ports:          { type: 'STRING' },
          powerDelivery:  { type: 'STRING' },
        },
        required: ['cpu'],  // Relax — only cpu required (may be "N/A" for monitors)
      },
      aiScore:     { type: 'INTEGER' },
      aiRationale: { type: 'STRING' },
    },
    required: ['name', 'brand', 'category', 'profiles', 'budgetTier', 'price',
      'isOnSale', 'specs', 'aiScore', 'aiRationale'],
  },
}

// ── Main entry point ────────────────────────────────────────────

export async function runCurator(scanResults) {
  const stats = { kept: 0, replaced: 0, removedDead: 0, newAdded: 0 }

  // 1. Charger le catalogue existant
  let existing = []
  try {
    const raw = await readFile(CATALOGUE_PATH, 'utf-8')
    const data = JSON.parse(raw)
    existing = data.products || []
    log(`Catalogue existant : ${existing.length} produits`)
  } catch {
    log('Pas de catalogue existant')
  }

  // 2. Vérifier que les produits existants sont encore en ligne
  log('Vérification URLs existantes...')
  const verifiedExisting = []
  const deadUrls = []

  await mapWithConcurrency(existing, async (product) => {
    const alive = await checkUrl(product.url)
    if (alive) {
      verifiedExisting.push(product)
    } else {
      deadUrls.push(product)
      log(`  ✗ URL morte : ${product.name.slice(0, 40)} → ${product.url.slice(0, 60)}`)
    }
  }, 5)

  stats.removedDead = deadUrls.length
  log(`URLs vérifiées : ${verifiedExisting.length} vivantes, ${deadUrls.length} mortes`)

  // 3. Curate les nouveaux résultats via Gemini
  log('Curation IA des scan results...')
  const scanItems = scanResults.results || []
  const allCurated = []

  // Grouper par source pour des prompts cohérents
  const bySource = {}
  for (const item of scanItems) {
    if (!bySource[item.source]) bySource[item.source] = []
    bySource[item.source].push(item)
  }

  for (const [source, items] of Object.entries(bySource)) {
    const BATCH_SIZE = 12
    for (let i = 0; i < items.length; i += BATCH_SIZE) {
      const batch = items.slice(i, i + BATCH_SIZE)
      const batchNum = Math.floor(i / BATCH_SIZE) + 1
      log(`  Curation ${source} lot ${batchNum} (${batch.length} items)`)

      try {
        const products = await withRetry(
          () => geminiGenerate(buildPrompt(batch, source), PRODUCT_SCHEMA),
          `curation-${source}-${batchNum}`
        )

        if (Array.isArray(products)) {
          const enriched = products
            .filter(p => {
              // Filtre score
              if (p.aiScore < MIN_AI_SCORE) return false
              // Skip CPU whitelist for non-computer categories
              const NON_CPU_CATEGORIES = ['monitor', 'dock', 'peripheral', 'storage', 'accessory']
              if (!NON_CPU_CATEGORIES.includes(p.category)) {
                if (!matchesCpuWhitelist(p.cpuModel || p.specs?.cpu || '')) {
                  log(`    ✗ CPU rejeté: ${p.cpuModel || p.specs?.cpu} — ${p.name?.slice(0, 40)}`)
                  return false
                }
              }
              // Filtre prix
              if (!p.price || p.price < 50 || p.price > 5000) return false
              return true
            })
            .map(p => {
              // Prefer page-extracted price over Gemini's guess
              const matchedItem = batch.find(r =>
                r.title?.toLowerCase().includes(p.name?.toLowerCase().slice(0, 20)) ||
                p.name?.toLowerCase().includes(r.title?.toLowerCase().slice(0, 20))
              )
              const finalPrice = matchedItem?.pagePrice || p.price

              return {
                id: `${source}-${slugify(p.name)}`,
                name: p.name,
                brand: p.brand,
                category: p.category,
                profiles: p.profiles,
                budgetTier: p.budgetTier,
                price: finalPrice,
                originalPrice: p.originalPrice || 0,
                isOnSale: p.isOnSale || false,
                specs: p.specs,
                aiScore: p.aiScore,
                aiRationale: p.aiRationale,
                url: injectAffiliateTag(findUrl(batch, p.name), source),
                imageUrl: findImageUrl(batch, p.name),
                source,
                addedAt: new Date().toISOString(),
                lastVerified: new Date().toISOString(),
              }
            })

          allCurated.push(...enriched)
        }
      } catch (err) {
        log(`  ✗ Curation ${source} lot ${batchNum} échouée: ${err.message}`)
      }
    }
  }

  log(`Total curated : ${allCurated.length} nouveaux produits`)

  // 4. Merge : nouveaux vs existants
  const finalProducts = mergeProducts(allCurated, verifiedExisting)
  stats.kept = finalProducts.length
  stats.newAdded = finalProducts.filter(p => !verifiedExisting.some(e => e.id === p.id)).length
  stats.replaced = verifiedExisting.length - (stats.kept - stats.newAdded)

  // 5. Injecter les liens affiliés sur les existants aussi
  for (const p of finalProducts) {
    p.url = injectAffiliateTag(p.url, p.source)
    p.lastVerified = new Date().toISOString()
  }

  // 6. Écrire le catalogue
  const catalogue = {
    version: 2,
    lastUpdated: new Date().toISOString(),
    agentRun: {
      scannedAt: scanResults.scannedAt,
      completedAt: new Date().toISOString(),
      totalScanned: scanResults.totalRaw,
      productsKept: finalProducts.length,
      productsNew: stats.newAdded,
      productsReplaced: stats.replaced,
      deadUrlsRemoved: stats.removedDead,
    },
    products: finalProducts,
  }

  await writeFile(CATALOGUE_PATH, JSON.stringify(catalogue, null, 2), 'utf-8')
  log(`Catalogue écrit : ${finalProducts.length} produits`)

  return stats
}

// ── Merge logic ─────────────────────────────────────────────────

function mergeProducts(newProducts, existingProducts) {
  const normalize = s => s.toLowerCase().replace(/[^a-z0-9]/g, '')

  // Index existants par nom normalisé
  const existingMap = new Map()
  for (const p of existingProducts) {
    existingMap.set(normalize(p.name), p)
  }

  // Appliquer les nouveaux
  for (const np of newProducts) {
    const key = normalize(np.name)
    const existing = existingMap.get(key)

    if (existing) {
      // Remplacer si meilleur score OU prix plus bas avec score similaire
      if (np.aiScore > existing.aiScore || (np.aiScore >= existing.aiScore - 5 && np.price < existing.price)) {
        // Preserve imageUrl from existing if new product lacks one
        if (!np.imageUrl && existing.imageUrl) np.imageUrl = existing.imageUrl
        existingMap.set(key, np)
      }
    } else {
      existingMap.set(key, np)
    }
  }

  let products = [...existingMap.values()]

  // Tri par score décroissant
  products.sort((a, b) => b.aiScore - a.aiScore)

  // Assurer la distribution minimum par catégorie
  const byCat = {}
  for (const p of products) {
    if (!byCat[p.category]) byCat[p.category] = []
    byCat[p.category].push(p)
  }

  // Assurer les minimums
  const selected = []
  for (const [cat, min] of Object.entries(MIN_PER_CATEGORY)) {
    const catProducts = byCat[cat] || []
    selected.push(...catProducts.slice(0, Math.max(min, 1)))
  }

  // Remplir avec le reste par score
  const selectedIds = new Set(selected.map(p => p.id))
  const remaining = products.filter(p => !selectedIds.has(p.id))
  selected.push(...remaining)

  // Dédupliquer et limiter
  const seen = new Set()
  const final = []
  for (const p of selected) {
    if (seen.has(p.id)) continue
    seen.add(p.id)
    final.push(p)
    if (final.length >= MAX_PRODUCTS) break
  }

  return final
}

// ── Prompt builder ──────────────────────────────────────────────

function buildPrompt(batch, source) {
  const listings = batch.map((r, i) => {
    let entry = `${i + 1}. "${r.title}"\n   URL: ${r.url}\n   Extrait: ${r.snippet}`
    if (r.pagePrice) entry += `\n   Prix détecté sur la page: ${r.pagePrice} $`
    if (r.pageText) entry += `\n   Contenu page (extrait): ${r.pageText.slice(0, 500)}`
    return entry
  }).join('\n\n')

  return `Tu es un expert hardware informatique au Québec. Analyse ces résultats de ${source} et extrais les produits disponibles à l'achat au Canada.

CATÉGORIES ACCEPTÉES :
- "laptop" : ordinateurs portables Windows/Linux
- "desktop" : ordinateurs de bureau
- "apple" : MacBook, iMac, Mac Mini, Mac Studio
- "chromebook" : Chromebooks
- "monitor" : écrans/moniteurs (bureau, gaming, ultrawide)
- "dock" : stations d'accueil, hubs USB-C, docking stations
- "peripheral" : claviers, souris, casques, webcams
- "storage" : SSD externes, disques durs, clés USB
- "accessory" : câbles, adaptateurs, supports, sacoches

RÈGLES POUR ORDINATEURS (laptop, desktop, apple, chromebook) :
- UNIQUEMENT des CPU de génération récente : Intel 12th gen+ (i5-12xxx, Core Ultra), AMD Ryzen 5000+, Apple M2+, Snapdragon X
- Si un CPU est Intel 11th gen ou plus vieux, Ryzen 3000/4000, ou Apple M1 → NE PAS INCLURE
- Le champ "cpuModel" doit contenir le modèle EXACT du CPU (ex: "Intel Core i7-14700H", "Apple M4")
- Ignore les tablettes sans clavier et imprimantes

RÈGLES POUR MONITEURS :
- Remplis specs.panelType (IPS, VA, OLED), specs.resolution (1920x1080, 2560x1440, 3840x2160), specs.refreshRate (60Hz, 144Hz...), specs.size (24", 27", 32"...)
- cpuModel = "N/A"
- specs.cpu = "N/A", specs.ram = "N/A", specs.storage = "N/A"

RÈGLES POUR DOCKS / PÉRIPHÉRIQUES / STOCKAGE / ACCESSOIRES :
- Remplis specs.ports (ex: "2x USB-A, 1x HDMI, 1x USB-C PD") et specs.powerDelivery (ex: "100W USB-C") si applicable
- cpuModel = "N/A"
- specs.cpu = "N/A"
- Pour le stockage : specs.storage = capacité (ex: "2TB NVMe"), specs.ram = "N/A"

POUR TOUS LES PRODUITS :
- name : nom complet du produit
- brand : marque
- category : une des catégories ci-dessus
- profiles : parmi ["basic", "work", "student", "creative", "gaming"]
- budgetTier : "under500" (<500$), "500to900", "900to1500", "over1500"
- price : prix en $ CAD (nombre). Si un "prix détecté sur la page" est fourni, utilise-le.
- originalPrice : prix original si en solde (sinon 0)
- isOnSale : true/false
- specs : { cpu, ram, storage, display?, gpu?, battery?, panelType?, resolution?, refreshRate?, size?, ports?, powerDelivery? }
- aiScore : 0-100 (rapport qualité-prix pour un consommateur canadien)
- aiRationale : 1-2 phrases en français québécois, ton direct

Scoring :
- 90+ : Deal incroyable, rapport qualité-prix imbattable
- 80-89 : Très bon choix solide
- 70-79 : Correct avec compromis
- 65-69 : Passable
- <65 : Ne pas inclure

Résultats :

${listings}`
}

// ── URL matching ────────────────────────────────────────────────

function findUrl(batch, productName) {
  if (!productName) return batch[0]?.url || ''
  const nameLower = productName.toLowerCase()
  const match = batch.find(r =>
    r.title?.toLowerCase().includes(nameLower.slice(0, 20)) ||
    nameLower.includes(r.title?.toLowerCase().slice(0, 20))
  )
  return match?.url || batch[0]?.url || ''
}

function findImageUrl(batch, productName) {
  if (!productName) return batch[0]?.imageUrl || ''
  const nameLower = productName.toLowerCase()
  const match = batch.find(r =>
    r.title?.toLowerCase().includes(nameLower.slice(0, 20)) ||
    nameLower.includes(r.title?.toLowerCase().slice(0, 20))
  )
  return match?.imageUrl || ''
}
