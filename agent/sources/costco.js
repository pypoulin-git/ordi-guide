// ─── Source : Costco Canada ──────────────────────────────────────

import { searxSearch, withRetry, log } from '../utils.js'

const SEARCH_QUERIES = [
  'site:costco.ca laptop ordinateur portable',
  'site:costco.ca desktop ordinateur bureau',
  'site:costco.ca macbook apple',
  'site:costco.ca chromebook',
]

export async function fetchCostco() {
  log('Costco — début du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await withRetry(
        () => searxSearch(query, { engines: 'google,bing' }),
        `costco:${query.slice(0, 30)}`
      )
      const filtered = results
        .filter(r => r.url?.includes('costco.ca'))
        .map(r => ({
          title: r.title || '',
          url: r.url,
          snippet: r.content || '',
          source: 'costco',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ Costco query failed: ${query.slice(0, 40)} — ${err.message}`)
    }
  }

  const seen = new Set()
  const unique = allResults.filter(r => {
    if (seen.has(r.url)) return false
    seen.add(r.url)
    return true
  })

  log(`Costco — ${unique.length} résultats uniques`)
  return unique
}
