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
          imageUrl: r.thumbnail || r.img_src || '',
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
    const page = await fetchPage(r.url)
    if (!page) return { ...r, pageText: null, pagePrice: null }
    if (!page.available) {
      log(`  ✗ Costco indisponible : ${r.title.slice(0, 50)}`)
      return null
    }
    const pagePrice = extractPrice(page.html, 'costco')
    const imageUrl = r.imageUrl || page.imageUrl || ''
    return { ...r, pageText: page.text, pagePrice, imageUrl }
  }, PAGE_FETCH_CONCURRENCY)

  const available = enriched.filter(Boolean)
  const withData = available.filter(r => r.pageText)
  log(`Costco — ${withData.length}/${unique.length} pages enrichies (${unique.length - available.length} indisponibles)`)
  return available
}

function isProductUrl(url) {
  return /costco\.ca.*\.product\./i.test(url) ||
    /costco\.ca.*(laptop|ordinateur|macbook|desktop|chromebook)/i.test(url)
}
