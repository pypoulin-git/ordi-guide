// ─── Source : Newegg Canada ──────────────────────────────────────
// SearXNG pour découverte + fetch page pour enrichissement.

import { searxSearch, fetchPage, extractPrice, withRetry, mapWithConcurrency, log } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Laptops
  'site:newegg.ca laptop ordinateur portable 2025 2026',
  'site:newegg.ca laptop gaming rtx 4060 4070 2025',
  'site:newegg.ca laptop intel core ultra i7 2025',
  'site:newegg.ca laptop amd ryzen 7 9000 2025',
  // Desktops
  'site:newegg.ca desktop gaming pc rtx 5070 2025',
  'site:newegg.ca desktop ordinateur bureau intel amd',
  // Monitors & peripherals
  'site:newegg.ca monitor écran 27 32 pouces 4K',
  'site:newegg.ca docking station usb-c thunderbolt',
  'site:newegg.ca clavier souris accessoires ordinateur',
  // Deals
  'newegg.ca deals promotions solde ordinateur canada 2025',
  'site:newegg.ca chromebook 2025 prix',
]

export async function fetchNewegg() {
  log('Newegg — début du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await withRetry(
        () => searxSearch(query, { engines: 'google,bing' }),
        `newegg:${query.slice(0, 30)}`
      )
      const filtered = results
        .filter(r => r.url?.includes('newegg.ca') && isProductUrl(r.url))
        .map(r => ({
          title: r.title || '',
          url: cleanUrl(r.url),
          snippet: r.content || '',
          imageUrl: r.thumbnail || r.img_src || '',
          source: 'newegg',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ Newegg query failed: ${query.slice(0, 40)} — ${err.message}`)
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

  log(`Newegg — ${unique.length} résultats uniques, enrichissement pages...`)

  // Enrichir avec le contenu réel des pages
  const enriched = await mapWithConcurrency(unique, async (r) => {
    const pageText = await fetchPage(r.url)
    const pagePrice = extractPrice(pageText, 'newegg')
    return { ...r, pageText, pagePrice }
  }, PAGE_FETCH_CONCURRENCY)

  const withData = enriched.filter(r => r.pageText)
  log(`Newegg — ${withData.length}/${unique.length} pages enrichies`)
  return enriched
}

function isProductUrl(url) {
  // Newegg product URLs: /p/XXXX or /Product/Product.aspx
  return /newegg\.ca\/.*\/p\//i.test(url) ||
    /newegg\.ca\/Product/i.test(url)
}

function cleanUrl(url) {
  try {
    const u = new URL(url)
    // Remove tracking params
    u.searchParams.delete('cm_sp')
    u.searchParams.delete('icid')
    u.searchParams.delete('ref')
    return u.toString()
  } catch { return url }
}
