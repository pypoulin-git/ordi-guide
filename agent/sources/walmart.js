// ─── Source : Walmart Canada ─────────────────────────────────────
// SearXNG pour découverte + fetch page pour enrichissement.

import { searxSearch, fetchPage, extractPrice, withRetry, mapWithConcurrency, log } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Laptops
  'site:walmart.ca laptop ordinateur portable 2025 2026',
  'site:walmart.ca laptop gaming rtx 4060 4070',
  'site:walmart.ca laptop amd ryzen intel core prix',
  // Desktops
  'site:walmart.ca desktop ordinateur bureau gaming',
  // Monitors
  'site:walmart.ca monitor écran ordinateur 27 32 4K',
  // Chromebooks
  'site:walmart.ca chromebook 2025 prix',
  // Accessories & peripherals
  'site:walmart.ca clavier souris webcam accessoires ordinateur',
  'site:walmart.ca disque dur SSD stockage externe',
  // Deals
  'walmart.ca deals solde promotion ordinateur laptop canada 2025',
  'site:walmart.ca macbook surface laptop prix',
]

export async function fetchWalmart() {
  log('Walmart — début du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await withRetry(
        () => searxSearch(query, { engines: 'google,bing' }),
        `walmart:${query.slice(0, 30)}`
      )
      const filtered = results
        .filter(r => r.url?.includes('walmart.ca') && isProductUrl(r.url))
        .map(r => ({
          title: r.title || '',
          url: cleanUrl(r.url),
          snippet: r.content || '',
          imageUrl: r.thumbnail || r.img_src || '',
          source: 'walmart',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ Walmart query failed: ${query.slice(0, 40)} — ${err.message}`)
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

  log(`Walmart — ${unique.length} résultats uniques, enrichissement pages...`)

  // Enrichir avec le contenu réel des pages
  const enriched = await mapWithConcurrency(unique, async (r) => {
    const pageText = await fetchPage(r.url)
    const pagePrice = extractPrice(pageText, 'walmart')
    return { ...r, pageText, pagePrice }
  }, PAGE_FETCH_CONCURRENCY)

  const withData = enriched.filter(r => r.pageText)
  log(`Walmart — ${withData.length}/${unique.length} pages enrichies`)
  return enriched
}

function isProductUrl(url) {
  // Walmart Canada product URLs: /product/... or /ip/...
  return /walmart\.ca\/.*\/product\//i.test(url) ||
    /walmart\.ca.*\/ip\//i.test(url)
}

function cleanUrl(url) {
  try {
    const u = new URL(url)
    // Remove tracking params
    u.searchParams.delete('athcpid')
    u.searchParams.delete('athpgid')
    u.searchParams.delete('athznid')
    u.searchParams.delete('athmtid')
    return u.toString()
  } catch { return url }
}
