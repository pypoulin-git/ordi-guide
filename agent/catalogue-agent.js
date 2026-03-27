#!/usr/bin/env node
// ─── Catalogue Agent — Orchestrateur ────────────────────────────
//
// Point d'entrée PM2. Tourne chaque nuit à 3h (cron: 0 3 * * *)
// 1. Scrape les 4 sources via SearXNG
// 2. Envoie à Gemini Flash pour curation + notation
// 3. Sélectionne les meilleurs produits (max 60)
// 4. Écrit data/catalogue.json
// 5. Commit + push → Vercel auto-deploy

import { readFile, writeFile } from 'fs/promises'
import { execSync } from 'child_process'
import { log } from './utils.js'
import { CATALOGUE_PATH } from './config.js'
import { fetchBestBuy } from './sources/bestbuy.js'
import { fetchAmazon } from './sources/amazon.js'
import { fetchCostco } from './sources/costco.js'
import { fetchStaples } from './sources/staples.js'
import { curateProducts, selectFinalCatalogue } from './curator.js'

async function main() {
  const startedAt = new Date().toISOString()
  log('═══ Catalogue Agent — Début du cycle ═══')

  const errors = []

  // 1. Charger le catalogue existant
  let existing = { products: [] }
  try {
    const raw = await readFile(CATALOGUE_PATH, 'utf-8')
    existing = JSON.parse(raw)
    log(`Catalogue existant : ${existing.products.length} produits`)
  } catch {
    log('Aucun catalogue existant, on part de zéro')
  }

  // 2. Scraper toutes les sources
  log('── Phase 1 : Scraping ──')
  const rawBySource = {}

  const sources = [
    { name: 'bestbuy', fn: fetchBestBuy },
    { name: 'amazon', fn: fetchAmazon },
    { name: 'costco', fn: fetchCostco },
    { name: 'staples', fn: fetchStaples },
  ]

  for (const { name, fn } of sources) {
    try {
      rawBySource[name] = await fn()
    } catch (err) {
      log(`✗ Source ${name} complètement échouée: ${err.message}`)
      errors.push(`${name}: ${err.message}`)
      rawBySource[name] = []
    }
  }

  const totalRaw = Object.values(rawBySource).reduce((s, arr) => s + arr.length, 0)
  log(`Total résultats bruts : ${totalRaw}`)

  if (totalRaw === 0) {
    log('Aucun résultat. Conservation du catalogue existant. Fin.')
    errors.push('Aucun résultat brut de toutes les sources')
    await writeCatalogue(existing.products, startedAt, errors, 0)
    return
  }

  // 3. Curation IA
  log('── Phase 2 : Curation IA (Gemini Flash) ──')
  const allCurated = []

  for (const [source, raw] of Object.entries(rawBySource)) {
    if (raw.length === 0) continue
    try {
      const curated = await curateProducts(raw, source)
      allCurated.push(...curated)
    } catch (err) {
      log(`✗ Curation ${source} échouée: ${err.message}`)
      errors.push(`curation-${source}: ${err.message}`)
    }
  }

  log(`Total après curation : ${allCurated.length} produits`)

  // 4. Sélection finale
  log('── Phase 3 : Sélection finale ──')
  const finalProducts = selectFinalCatalogue(allCurated, existing.products)
  log(`Catalogue final : ${finalProducts.length} produits`)

  // 5. Écrire le catalogue
  const replaced = existing.products.length > 0
    ? existing.products.filter(ep => !finalProducts.some(fp => fp.id === ep.id)).length
    : 0

  await writeCatalogue(finalProducts, startedAt, errors, replaced)

  // 6. Git commit + push
  log('── Phase 4 : Git push ──')
  try {
    const gitDir = CATALOGUE_PATH.replace(/[\\/]data[\\/]catalogue\.json$/, '')
    execSync('git add data/catalogue.json', { cwd: gitDir, stdio: 'pipe' })

    const diff = execSync('git diff --cached --stat', { cwd: gitDir, encoding: 'utf-8' })
    if (diff.trim()) {
      execSync(
        `git commit -m "chore(catalogue): mise à jour automatique — ${finalProducts.length} produits"`,
        { cwd: gitDir, stdio: 'pipe' }
      )
      execSync('git push origin main', { cwd: gitDir, stdio: 'pipe' })
      log('Git push réussi → Vercel auto-deploy déclenché')
    } else {
      log('Aucun changement dans le catalogue, pas de push')
    }
  } catch (err) {
    log(`✗ Git push échoué: ${err.message}`)
    errors.push(`git: ${err.message}`)
  }

  log('═══ Catalogue Agent — Cycle terminé ═══')
}

async function writeCatalogue(products, startedAt, errors, replaced) {
  const catalogue = {
    version: 1,
    lastUpdated: new Date().toISOString(),
    agentRun: {
      startedAt,
      completedAt: new Date().toISOString(),
      productsScanned: 0,
      productsKept: products.length,
      productsReplaced: replaced,
      errors,
    },
    products,
  }

  await writeFile(CATALOGUE_PATH, JSON.stringify(catalogue, null, 2), 'utf-8')
  log(`Catalogue écrit : ${products.length} produits → ${CATALOGUE_PATH}`)
}

// Run
main().catch(err => {
  console.error('FATAL:', err)
  process.exit(1)
})
