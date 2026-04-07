// ─── Phase 1 : Scanner ──────────────────────────────────────────
// Scrape les sources actives, enrichit avec les pages réelles,
// pré-filtre par CPU whitelist, écrit scan-results.json.
// Sources bloquées (bestbuy, costco, staples) ne sont plus scannées.

import { writeFile } from 'fs/promises'
import { SCAN_RESULTS_PATH } from './config.js'
import { matchesCpuWhitelist, log, sleep } from './utils.js'
import { fetchAmazon } from './sources/amazon.js'
import { fetchNewegg } from './sources/newegg.js'
import { fetchLenovo } from './sources/lenovo.js'
import { fetchDell } from './sources/dell.js'
import { fetchHp } from './sources/hp.js'
import { fetchWalmart } from './sources/walmart.js'
import { fetchCanadaComputers } from './sources/canadacomputers.js'
import { fetchMicrosoft } from './sources/microsoft.js'

export async function runScanner() {
  const startedAt = new Date().toISOString()
  const errors = []

  const sources = [
    { name: 'amazon', fn: fetchAmazon },
    { name: 'newegg', fn: fetchNewegg },
    { name: 'lenovo', fn: fetchLenovo },
    { name: 'dell', fn: fetchDell },
    { name: 'hp', fn: fetchHp },
    { name: 'walmart', fn: fetchWalmart },
    { name: 'canadacomputers', fn: fetchCanadaComputers },
    { name: 'microsoft', fn: fetchMicrosoft },
  ]

  const allResults = []

  // Scrape séquentiellement (ne pas surcharger SearXNG)
  for (let i = 0; i < sources.length; i++) {
    const { name, fn } = sources[i]
    try {
      const results = await fn()
      log(`  ${name}: ${results.length} résultats`)
      allResults.push(...results)
    } catch (err) {
      log(`  ✗ ${name} complètement échoué: ${err.message}`)
      errors.push(`${name}: ${err.message}`)
    }
    // Delay between sources to avoid SearXNG rate limiting
    if (i < sources.length - 1) await sleep(5000)
  }

  const totalRaw = allResults.length
  log(`Total brut : ${totalRaw} résultats`)

  // Pré-filtre CPU : rejeter les produits avec un CPU identifié hors whitelist
  const filtered = allResults.filter(r => {
    const text = `${r.title} ${r.snippet} ${r.pageText || ''}`.toLowerCase()

    // Don't CPU-filter monitors and docks
    // If the title/snippet suggests it's not a computer, skip CPU filter
    if (/monitor|écran|dock|station|hub/i.test(text)) {
      return true
    }

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
      imageUrl: r.imageUrl || null,
      pagePrice: r.pagePrice || null,
      // Tronquer pageText pour le JSON intermédiaire
      pageText: r.pageText ? r.pageText.slice(0, 2000) : null,
    })),
  }

  await writeFile(SCAN_RESULTS_PATH, JSON.stringify(scanResults, null, 2), 'utf-8')
  log(`Scan results écrits → ${SCAN_RESULTS_PATH}`)

  return scanResults
}
