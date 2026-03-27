// ─── Source : Costco Canada ──────────────────────────────────────

import { searxSearch, fetchPage, extractPrice, withRetry, mapWithConcurrency, log } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  'site:costco.ca laptop ordinateur portable',
  'site:costco.ca macbook apple',
  'site:costco.ca desktop ordinateur bureau',
  'site:costco.ca chromebook',
  'site:costco.ca laptop gaming',
  'costco.ca ordinateur solde promotion 2025',
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
        .filter(r => r.url?.includes('costco.ca') && isProductUrl(r.url))
        .map(r => ({
          title: r.title || '',
          url: r.url.split('?')[0],
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
    const key = r.url
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  log(`Costco — ${unique.length} résultats uniques, enrichissement pages...`)

  const enriched = await mapWithConcurrency(unique, async (r) => {
    const pageText = await fetchPage(r.url)
    const pagePrice = extractPrice(pageText, 'costco')
    return { ...r, pageText, pagePrice }
  }, PAGE_FETCH_CONCURRENCY)

  const withData = enriched.filter(r => r.pageText)
  log(`Costco — ${withData.length}/${unique.length} pages enrichies`)
  return enriched
}

function isProductUrl(url) {
  return /costco\.ca.*\.product\./i.test(url) ||
    /costco\.ca.*(laptop|ordinateur|macbook|desktop|chromebook)/i.test(url)
}
