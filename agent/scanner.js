// ─── Phase 1 : Scanner ──────────────────────────────────────────
// Scrape les 4 sources, enrichit avec les pages réelles,
// pré-filtre par CPU whitelist, écrit scan-results.json.

import { writeFile } from 'fs/promises'
import { SCAN_RESULTS_PATH } from './config.js'
import { matchesCpuWhitelist, log } from './utils.js'
import { fetchBestBuy } from './sources/bestbuy.js'
import { fetchAmazon } from './sources/amazon.js'
import { fetchCostco } from './sources/costco.js'
import { fetchStaples } from './sources/staples.js'

export async function runScanner() {
  const startedAt = new Date().toISOString()
  const errors = []

  const sources = [
    { name: 'bestbuy', fn: fetchBestBuy },
    { name: 'amazon', fn: fetchAmazon },
    { name: 'costco', fn: fetchCostco },
    { name: 'staples', fn: fetchStaples },
  ]

  const allResults = []

  // Scrape séquentiellement (ne pas surcharger SearXNG)
  for (const { name, fn } of sources) {
    try {
      const results = await fn()
      log(`  ${name}: ${results.length} résultats`)
      allResults.push(...results)
    } catch (err) {
      log(`  ✗ ${name} complètement échoué: ${err.message}`)
      errors.push(`${name}: ${err.message}`)
    }
  }

  const totalRaw = allResults.length
  log(`Total brut : ${totalRaw} résultats`)

  // Pré-filtre CPU : rejeter les produits avec un CPU identifié hors whitelist
  const filtered = allResults.filter(r => {
    const text = `${r.title} ${r.snippet} ${r.pageText || ''}`.toLowerCase()

    // Rejeter les CPU clairement obsolètes
    if (/celeron|pentium|atom/i.test(text) && !/core\s*(ultra|[357i])/i.test(text)) {
      log(`  ✗ CPU obsolète filtré: Celeron/Pentium — ${r.title.slice(0, 50)}`)
      return false
    }

    // Rejeter les vieilles générations explicites (i5-8xxx, i5-10xxx, i5-11xxx)
    const oldCpu = text.match(/core\s*i[357]-([1-9]\d{3,})/i)
    if (oldCpu) {
      const gen = parseInt(oldCpu[1].slice(0, -2)) // "8365" -> 83, "1135" -> 11
      if (gen < 12) {
        log(`  ✗ CPU obsolète filtré: "Core i-${oldCpu[1]}" (gen ${gen}) — ${r.title.slice(0, 50)}`)
        return false
      }
    }

    // Tout le reste passe — Gemini fera le tri fin en Phase 2
    return true
  })

  log(`Après filtre CPU : ${filtered.length}/${totalRaw} (${totalRaw - filtered.length} rejetés)`)

  // Écrire les résultats intermédiaires
  const scanResults = {
    scannedAt: startedAt,
    completedAt: new Date().toISOString(),
    totalRaw,
    totalAfterFilter: filtered.length,
    errors,
    results: filtered.map(r => ({
      title: r.title,
      url: r.url,
      snippet: r.snippet,
      source: r.source,
      pagePrice: r.pagePrice || null,
      // Tronquer pageText pour le JSON intermédiaire
      pageText: r.pageText ? r.pageText.slice(0, 2000) : null,
    })),
  }

  await writeFile(SCAN_RESULTS_PATH, JSON.stringify(scanResults, null, 2), 'utf-8')
  log(`Scan results écrits → ${SCAN_RESULTS_PATH}`)

  return scanResults
}
