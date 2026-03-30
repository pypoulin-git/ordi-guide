// ─── Source : Best Buy Canada ────────────────────────────────────
// SearXNG pour découverte + fetch page pour enrichissement.

import { searxSearch, fetchPage, extractPrice, withRetry, mapWithConcurrency, log, isCleanProductUrl } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Par gamme de prix
  'site:bestbuy.ca ordinateur portable laptop solde promotion 2025',
  'site:bestbuy.ca laptop intel core ultra 2025',
  'site:bestbuy.ca laptop amd ryzen 7 8000 2025',
  'site:bestbuy.ca macbook air m4 prix',
  'site:bestbuy.ca macbook pro m4 prix',
  'site:bestbuy.ca desktop ordinateur bureau gaming rtx',
  'site:bestbuy.ca chromebook 2025 prix',
  'site:bestbuy.ca laptop gaming rtx 4060 4070 prix',
  // Deal pages
  'bestbuy.ca deals ordinateur solde canada',
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
        .filter(r => r.url?.includes('bestbuy.ca') && isProductUrl(r.url) && isCleanProductUrl(r.url))
        .map(r => ({
          title: r.title || '',
          url: cleanUrl(r.url),
          snippet: r.content || '',
          imageUrl: r.thumbnail || r.img_src || '',
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
    const key = r.url.split('?')[0] // ignore query params for dedup
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  log(`Best Buy — ${unique.length} résultats uniques, enrichissement pages...`)

  // Enrichir avec le contenu réel des pages
  const enriched = await mapWithConcurrency(unique, async (r) => {
    const page = await fetchPage(r.url)
    if (!page) return { ...r, pageText: null, pagePrice: null }
    if (!page.available) {
      log(`  ✗ Best Buy indisponible : ${r.title.slice(0, 50)}`)
      return null
    }
    const pagePrice = extractPrice(page.html, 'bestbuy')
    const imageUrl = r.imageUrl || page.imageUrl || ''
    return { ...r, pageText: page.text, pagePrice, imageUrl }
  }, PAGE_FETCH_CONCURRENCY)

  const available = enriched.filter(Boolean)
  const withData = available.filter(r => r.pageText)
  log(`Best Buy — ${withData.length}/${unique.length} pages enrichies (${unique.length - available.length} indisponibles)`)
  return available
}

function isProductUrl(url) {
  // Reject category, collection, browse, and search pages
  if (/\/(collection|b|category)\//i.test(url)) return false
  if (/\/search/i.test(url)) return false
  // Best Buy product URLs must contain /product/ with a numeric ID or slug
  return /bestbuy\.ca\/(en-ca|fr-ca)?\/?product\//i.test(url)
}

function cleanUrl(url) {
  try {
    const u = new URL(url)
    // Remove tracking params
    u.searchParams.delete('icmp')
    u.searchParams.delete('irclickid')
    return u.toString()
  } catch { return url }
}
