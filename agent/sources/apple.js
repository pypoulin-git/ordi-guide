// ─── Source : Apple Store Canada ─────────────────────────────────
// SearXNG queries targeting apple.com/ca/shop for Mac products.
// Apple prices are stable/public — high confidence.

import { searxSearchMulti, fetchPage, extractPrice, mapWithConcurrency, log, sleep } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // MacBook Air
  'MacBook Air M4 13 pouces site:apple.com/ca',
  'MacBook Air M4 15 pouces site:apple.com/ca',
  'MacBook Air M3 prix site:apple.com/ca',
  // MacBook Pro
  'MacBook Pro M4 14 pouces site:apple.com/ca',
  'MacBook Pro M4 16 pouces site:apple.com/ca',
  'MacBook Pro M4 Pro prix site:apple.com/ca',
  'MacBook Pro M4 Max site:apple.com/ca',
  // iMac
  'iMac M4 24 pouces site:apple.com/ca',
  'iMac M4 prix site:apple.com/ca',
  // Mac Mini / Studio
  'Mac Mini M4 site:apple.com/ca',
  'Mac Mini M4 Pro site:apple.com/ca',
  'Mac Studio M4 Max site:apple.com/ca',
  'Mac Pro M2 Ultra site:apple.com/ca',
  // Studio Display
  'Apple Studio Display site:apple.com/ca',
  'Apple Pro Display XDR site:apple.com/ca',
]

export async function fetchApple() {
  log('Apple — debut du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await searxSearchMulti('apple.com', query, { minResults: 2 })
      const filtered = results
        .filter(r => r.url?.includes('apple.com/ca') && isProductUrl(r.url))
        .map(r => ({
          title: r.title || '',
          url: cleanUrl(r.url),
          snippet: r.content || '',
          imageUrl: r.thumbnail || r.img_src || '',
          source: 'apple',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ Apple query failed: ${query.slice(0, 40)} — ${err.message}`)
    }
    await sleep(5000)
  }

  // Deduplicate by cleaned URL
  const seen = new Set()
  const unique = allResults.filter(r => {
    const key = r.url.split('?')[0].replace(/\/$/, '')
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  log(`Apple — ${unique.length} resultats uniques, enrichissement pages...`)

  const enriched = await mapWithConcurrency(unique, async (r) => {
    const page = await fetchPage(r.url)
    if (!page) return { ...r, pageText: null, pagePrice: null }
    const pagePrice = extractPrice(page.html, 'apple')
    const imageUrl = r.imageUrl || page.imageUrl || ''
    return { ...r, pageText: page.text, pagePrice, imageUrl }
  }, PAGE_FETCH_CONCURRENCY)

  const available = enriched.filter(Boolean)
  const withData = available.filter(r => r.pageText)
  log(`Apple — ${withData.length}/${unique.length} pages enrichies`)
  return available
}

function isProductUrl(url) {
  // Apple Store — only accept URLs that identify a specific SKU/configuration.
  // Generic landing pages like /shop/buy-mac/macbook-pro/14-inch land on a picker
  // and expose no price — they cannot be verified, so we reject them.

  // Refurbished product pages always have a unique SKU in the path
  if (/apple\.com\/ca\/shop\/product\/[a-z0-9]+\//i.test(url)) return true

  // Standalone display products (single SKU)
  if (/apple\.com\/ca\/shop\/buy-mac\/(studio-display|pro-display-xdr)(\/|$|\?)/i.test(url)) return true

  // Configured Mac buy URLs must carry at least one config marker in the slug.
  // Real product URLs look like:
  //   /shop/buy-mac/macbook-pro/14-inch-silver-standard-display-apple-m4-pro-chip-12-core-cpu...
  // Generic landings look like:
  //   /shop/buy-mac/macbook-pro/14-inch   (rejected)
  const CONFIG_MARKERS = /(chip|memory|storage|gpu|cpu|ultra|-max-|apple-m[1-9])/i
  if (/apple\.com\/ca\/shop\/buy-mac\//i.test(url) && CONFIG_MARKERS.test(url)) return true

  return false
}

function cleanUrl(url) {
  try {
    const u = new URL(url)
    // Remove tracking params
    u.searchParams.delete('afid')
    u.searchParams.delete('cid')
    u.searchParams.delete('mtid')
    u.searchParams.delete('aosid')
    return u.toString()
  } catch { return url }
}
