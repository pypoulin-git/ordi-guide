// ─── Catalogue Agent — Curateur IA (Gemini 2.0 Flash) ───────────
//
// Prend les résultats bruts de SearXNG et les transforme en
// CatalogueProduct structurés avec score IA et avis.

import { geminiGenerate, withRetry, slugify, log } from './utils.js'
import { CATEGORIES, PROFILES, BUDGET_TIERS, MIN_AI_SCORE, MAX_PRODUCTS } from './config.js'

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
      specs: {
        type: 'OBJECT',
        properties: {
          cpu:     { type: 'STRING' },
          ram:     { type: 'STRING' },
          storage: { type: 'STRING' },
          display: { type: 'STRING' },
          gpu:     { type: 'STRING' },
          battery: { type: 'STRING' },
        },
        required: ['cpu', 'ram', 'storage'],
      },
      aiScore:      { type: 'INTEGER' },
      aiRationale:  { type: 'STRING' },
    },
    required: ['name', 'brand', 'category', 'profiles', 'budgetTier', 'price', 'isOnSale', 'specs', 'aiScore', 'aiRationale'],
  },
}

/**
 * Envoie un lot de résultats bruts à Gemini pour extraction et notation.
 * Retourne un tableau de produits structurés.
 */
export async function curateProducts(rawResults, source) {
  if (rawResults.length === 0) return []

  // Envoyer par lots de 15 pour éviter les limites de tokens
  const BATCH_SIZE = 15
  const allProducts = []

  for (let i = 0; i < rawResults.length; i += BATCH_SIZE) {
    const batch = rawResults.slice(i, i + BATCH_SIZE)
    log(`  Curation ${source} lot ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} résultats)`)

    const prompt = buildPrompt(batch, source)

    try {
      const products = await withRetry(
        () => geminiGenerate(prompt, PRODUCT_SCHEMA),
        `curation-${source}-lot${i}`
      )

      if (Array.isArray(products)) {
        const enriched = products
          .filter(p => p.aiScore >= MIN_AI_SCORE)
          .map(p => ({
            id: `${source}-${slugify(p.name)}`,
            ...p,
            url: findUrl(batch, p.name),
            source,
            addedAt: new Date().toISOString(),
            lastVerified: new Date().toISOString(),
          }))
        allProducts.push(...enriched)
      }
    } catch (err) {
      log(`  ✗ Curation ${source} lot ${Math.floor(i / BATCH_SIZE) + 1} échouée: ${err.message}`)
    }
  }

  log(`  ${source}: ${allProducts.length} produits retenus après curation`)
  return allProducts
}

/**
 * Fusionne les produits de toutes les sources, élimine les doublons,
 * et sélectionne les meilleurs en respectant la distribution.
 */
export function selectFinalCatalogue(allProducts, existingProducts = []) {
  // Dédupliquer par nom normalisé
  const nameMap = new Map()
  for (const p of allProducts) {
    const key = p.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    const existing = nameMap.get(key)
    if (!existing || p.aiScore > existing.aiScore) {
      nameMap.set(key, p)
    }
  }

  let products = [...nameMap.values()]

  // Trier par score IA décroissant
  products.sort((a, b) => b.aiScore - a.aiScore)

  // Si pas assez de nouveaux produits, garder les existants comme fallback
  if (products.length < 10) {
    log(`  Seulement ${products.length} nouveaux produits. Conservation des existants comme fallback.`)
    const existingMap = new Map(existingProducts.map(p => [p.id, p]))
    for (const p of existingProducts) {
      const key = p.name.toLowerCase().replace(/[^a-z0-9]/g, '')
      if (!nameMap.has(key)) {
        products.push({ ...p, lastVerified: new Date().toISOString() })
      }
    }
    products.sort((a, b) => b.aiScore - a.aiScore)
  }

  // Limiter au max
  if (products.length > MAX_PRODUCTS) {
    products = products.slice(0, MAX_PRODUCTS)
  }

  return products
}

function buildPrompt(batch, source) {
  const listings = batch.map((r, i) =>
    `${i + 1}. "${r.title}"\n   URL: ${r.url}\n   Extrait: ${r.snippet}`
  ).join('\n\n')

  return `Tu es un expert en hardware informatique au Québec. Analyse ces résultats de recherche provenant de ${source} et extrais les ordinateurs disponibles à l'achat.

Pour chaque ordinateur trouvé, fournis :
- name : nom complet du produit
- brand : marque (Apple, Lenovo, HP, Dell, ASUS, Acer, etc.)
- category : "laptop", "desktop", "apple" (pour les Mac), ou "chromebook"
- profiles : tableau parmi ["basic", "work", "student", "creative", "gaming"] selon les usages appropriés
- budgetTier : "under500" (<500$), "500to900", "900to1500", ou "over1500"
- price : prix en dollars canadiens (nombre)
- originalPrice : prix original si en solde (nombre, sinon 0)
- isOnSale : true/false
- specs : { cpu, ram, storage, display (optionnel), gpu (optionnel), battery (optionnel) }
- aiScore : note de 0 à 100 basée sur le rapport qualité-prix pour le public québécois
- aiRationale : 1-2 phrases en français québécois expliquant pourquoi ce produit est bon ou pas. Ton direct, pas de jargon inutile.

Critères de notation (aiScore) :
- 90+ : Excellent rapport qualité-prix, impossible de se tromper
- 80-89 : Très bon choix dans sa catégorie
- 70-79 : Correct, quelques compromis
- 65-69 : Acceptable mais on peut trouver mieux
- <65 : Ne pas inclure

Ignore les accessoires, les résultats qui ne sont pas des ordinateurs, et les annonces sans prix clair.

Résultats à analyser :

${listings}`
}

function findUrl(batch, productName) {
  const nameLower = productName.toLowerCase()
  const match = batch.find(r =>
    r.title.toLowerCase().includes(nameLower.slice(0, 20)) ||
    nameLower.includes(r.title.toLowerCase().slice(0, 20))
  )
  return match?.url || batch[0]?.url || ''
}
