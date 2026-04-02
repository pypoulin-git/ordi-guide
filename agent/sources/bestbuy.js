// ─── Source : Best Buy Canada ────────────────────────────────────
// SearXNG pour découverte + fetch page pour enrichissement.

import { searxSearchMulti, fetchPage, extractPrice, withRetry, mapWithConcurrency, log, isCleanProductUrl, sleep } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

// Model-specific queries to get product pages (not category pages)
const SEARCH_QUERIES = [
  // Laptops
  'laptop dell xps 14 2025 prix',
  'macbook air m4 2025 prix',
  'laptop hp envy omnibook spectre 2025 prix',
  'laptop gaming asus rog legion 2025',
  // Desktops
  'desktop gaming rtx 5070 tour 2025',
  'desktop all-in-one tout-en-un dell hp 2025',
  // Monitors
  'monitor dell ultrasharp lg 27 32 4K',
  // Chromebooks
  'chromebook acer hp lenovo 2025 prix',
]

export async function fetchBestBuy() {
  log('Best Buy — début du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await searxSearchMulti('bestbuy.ca', query, { minResults: 2 })
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
    await sleep(5000)
  }

  // Dédupliquer par URL
  const seen = new Set()
  const unique = allResults.filter(r => {
    const key = r.url.split('?')[0]
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
  if (/(collection|b|category)\//i.test(url)) return false
  if (/\/search/i.test(url)) return false
  return /bestbuy\.ca\/(en-ca|fr-ca)?\/?product\//i.test(url)
}

function cleanUrl(url) {
  try {
    const u = new URL(url)
    u.searchParams.delete('icmp')
    u.searchParams.delete('irclickid')
    return u.toString()
  } catch { return url }
}
