// ─── Source : Best Buy Canada ────────────────────────────────────
// Utilise SearXNG pour scraper les résultats.
// Quand l'API affiliée sera approuvée, on pourra passer en direct.

import { searxSearch, withRetry, log } from '../utils.js'

const SEARCH_QUERIES = [
  'site:bestbuy.ca laptop ordinateur portable',
  'site:bestbuy.ca desktop ordinateur bureau',
  'site:bestbuy.ca macbook apple',
  'site:bestbuy.ca chromebook',
  'site:bestbuy.ca gaming laptop RTX',
]

export async function fetchBestBuy() {
  log('Best Buy — début du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await withRetry(
        () => searxSearch(query, { engines: 'google,bing' }),
        `bestbuy:${query.slice(0, 30)}`
      )
      const filtered = results
        .filter(r => r.url?.includes('bestbuy.ca'))
        .map(r => ({
          title: r.title || '',
          url: r.url,
          snippet: r.content || '',
          source: 'bestbuy',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ Best Buy query failed: ${query.slice(0, 40)} — ${err.message}`)
    }
  }

  // Dédupliquer par URL
  const seen = new Set()
  const unique = allResults.filter(r => {
    if (seen.has(r.url)) return false
    seen.add(r.url)
    return true
  })

  log(`Best Buy — ${unique.length} résultats uniques`)
  return unique
}
