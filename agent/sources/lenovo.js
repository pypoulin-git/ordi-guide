// ─── Source : Lenovo Canada ──────────────────────────────────────
// SearXNG pour découverte + fetch page pour enrichissement.

import { searxSearch, fetchPage, extractPrice, withRetry, mapWithConcurrency, log } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // ThinkPad & IdeaPad
  'site:lenovo.com ThinkPad laptop canada 2025 2026',
  'site:lenovo.com IdeaPad ordinateur portable prix canada',
  'site:lenovo.com IdeaPad Slim Flex 2025',
  // Gaming — Legion
  'site:lenovo.com Legion gaming laptop rtx 2025',
  // Desktop — ThinkCentre
  'site:lenovo.com ThinkCentre desktop ordinateur bureau',
  'site:lenovo.com IdeaCentre desktop 2025',
  // Monitors & docks
  'site:lenovo.com monitor écran ThinkVision 27 32',
  'site:lenovo.com docking station thunderbolt usb-c',
  // Accessories
  'site:lenovo.com accessories clavier souris hub canada',
  // Deals
  'lenovo.com/ca solde deals promotion laptop 2025',
  'site:lenovo.com Yoga laptop 2-in-1 2025 canada',
]

export async function fetchLenovo() {
  log('Lenovo — début du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await withRetry(
        () => searxSearch(query, { engines: 'google,bing' }),
        `lenovo:${query.slice(0, 30)}`
      )
      const filtered = results
        .filter(r => r.url?.includes('lenovo.com') && isProductUrl(r.url))
        .map(r => ({
          title: r.title || '',
          url: cleanUrl(r.url),
          snippet: r.content || '',
          source: 'lenovo',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ Lenovo query failed: ${query.slice(0, 40)} — ${err.message}`)
    }
  }

  // Dédupliquer par URL
  const seen = new Set()
  const unique = allResults.filter(r => {
    const key = r.url.split('?')[0]
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  log(`Lenovo — ${unique.length} résultats uniques, enrichissement pages...`)

  // Enrichir avec le contenu réel des pages
  const enriched = await mapWithConcurrency(unique, async (r) => {
    const pageText = await fetchPage(r.url)
    const pagePrice = extractPrice(pageText, 'lenovo')
    return { ...r, pageText, pagePrice }
  }, PAGE_FETCH_CONCURRENCY)

  const withData = enriched.filter(r => r.pageText)
  log(`Lenovo — ${withData.length}/${unique.length} pages enrichies`)
  return enriched
}

function isProductUrl(url) {
  // Lenovo product URLs: /p/... or /laptops/... or /desktops/... or /monitors/... or /accessories/...
  // Prefer Canadian pages (/ca/) but accept general lenovo.com too
  return /lenovo\.com.*\/(p|laptops|desktops|monitors|accessories)\//i.test(url)
}

function cleanUrl(url) {
  try {
    const u = new URL(url)
    // Remove tracking params
    u.searchParams.delete('cid')
    u.searchParams.delete('clickid')
    u.searchParams.delete('orgRef')
    return u.toString()
  } catch { return url }
}
