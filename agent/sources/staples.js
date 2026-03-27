// ─── Source : Bureau en Gros (Staples Canada) ───────────────────

import { searxSearch, withRetry, log } from '../utils.js'

const SEARCH_QUERIES = [
  'site:bureauengros.com laptop ordinateur portable',
  'site:bureauengros.com desktop ordinateur bureau',
  'site:bureauengros.com chromebook',
  'site:staples.ca laptop computer',
]

export async function fetchStaples() {
  log('Bureau en Gros — début du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await withRetry(
        () => searxSearch(query, { engines: 'google,bing' }),
        `staples:${query.slice(0, 30)}`
      )
      const filtered = results
        .filter(r => r.url?.includes('bureauengros.com') || r.url?.includes('staples.ca'))
        .map(r => ({
          title: r.title || '',
          url: r.url,
          snippet: r.content || '',
          source: 'staples',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ Staples query failed: ${query.slice(0, 40)} — ${err.message}`)
    }
  }

  const seen = new Set()
  const unique = allResults.filter(r => {
    if (seen.has(r.url)) return false
    seen.add(r.url)
    return true
  })

  log(`Bureau en Gros — ${unique.length} résultats uniques`)
  return unique
}
