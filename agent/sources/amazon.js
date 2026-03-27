// ─── Source : Amazon Canada ──────────────────────────────────────
// SearXNG fallback. PA-API à intégrer quand les clés seront dispo.

import { searxSearch, withRetry, log } from '../utils.js'

const SEARCH_QUERIES = [
  'site:amazon.ca laptop ordinateur portable',
  'site:amazon.ca desktop PC bureau',
  'site:amazon.ca macbook apple mac',
  'site:amazon.ca chromebook',
  'site:amazon.ca gaming laptop',
]

export async function fetchAmazon() {
  log('Amazon — début du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await withRetry(
        () => searxSearch(query, { engines: 'google,bing' }),
        `amazon:${query.slice(0, 30)}`
      )
      const filtered = results
        .filter(r => r.url?.includes('amazon.ca'))
        .map(r => ({
          title: r.title || '',
          url: r.url,
          snippet: r.content || '',
          source: 'amazon',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ Amazon query failed: ${query.slice(0, 40)} — ${err.message}`)
    }
  }

  const seen = new Set()
  const unique = allResults.filter(r => {
    if (seen.has(r.url)) return false
    seen.add(r.url)
    return true
  })

  log(`Amazon — ${unique.length} résultats uniques`)
  return unique
}
