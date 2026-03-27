// ─── Source : Amazon Canada ──────────────────────────────────────
// SearXNG + page enrichment. PA-API à intégrer quand affiliate approuvé.

import { searxSearch, fetchPage, extractPrice, withRetry, mapWithConcurrency, log } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  'site:amazon.ca laptop ordinateur portable intel core ultra 2025',
  'site:amazon.ca laptop amd ryzen 7 8000',
  'site:amazon.ca macbook air m4',
  'site:amazon.ca macbook pro m4',
  'site:amazon.ca desktop gaming rtx 4060',
  'site:amazon.ca chromebook 2025',
  'site:amazon.ca laptop deal solde ordinateur portable',
  'site:amazon.ca laptop gaming rtx 4070 canada',
  'amazon.ca best seller laptop 2025',
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
        .filter(r => r.url?.includes('amazon.ca') && isProductUrl(r.url))
        .map(r => ({
          title: r.title || '',
          url: cleanUrl(r.url),
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
    const key = extractAsin(r.url) || r.url.split('?')[0]
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  log(`Amazon — ${unique.length} résultats uniques, enrichissement pages...`)

  const enriched = await mapWithConcurrency(unique, async (r) => {
    const pageText = await fetchPage(r.url)
    const pagePrice = extractPrice(pageText, 'amazon')
    return { ...r, pageText, pagePrice }
  }, PAGE_FETCH_CONCURRENCY)

  const withData = enriched.filter(r => r.pageText)
  log(`Amazon — ${withData.length}/${unique.length} pages enrichies`)
  return enriched
}

function isProductUrl(url) {
  // Amazon product pages have /dp/ASIN or /gp/product/ASIN
  return /amazon\.ca\/(dp|gp\/product)\/[A-Z0-9]{10}/i.test(url) ||
    /amazon\.ca.*\/(laptop|computer|ordinateur|macbook)/i.test(url)
}

function extractAsin(url) {
  const m = url.match(/\/(dp|gp\/product)\/([A-Z0-9]{10})/i)
  return m ? m[2] : null
}

function cleanUrl(url) {
  try {
    const u = new URL(url)
    // Keep only the product path
    const asin = extractAsin(url)
    if (asin) return `https://www.amazon.ca/dp/${asin}`
    return u.origin + u.pathname
  } catch { return url }
}
