// ─── Source : Apple Store Canada ─────────────────────────────────
// SearXNG queries targeting apple.com/ca/shop for Mac products.
// Apple prices are stable/public — high confidence.

import { searxSearchMulti, fetchPage, extractPrice, mapWithConcurrency, log, sleep } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // MacBook Air
  'MacBook Air M4 site:apple.com/ca',
  'MacBook Air M3 prix site:apple.com/ca',
  // MacBook Pro
  'MacBook Pro M4 site:apple.com/ca',
  'MacBook Pro M4 Pro prix site:apple.com/ca',
  // iMac
  'iMac M4 prix site:apple.com/ca',
  // Mac Mini / Studio
  'Mac Mini M4 site:apple.com/ca',
  'Mac Studio M4 site:apple.com/ca',
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
  // Accept Apple Store product/buy pages and main product pages
  if (/apple\.com\/ca\/(shop\/buy|shop\/product)/i.test(url)) return true
  // Accept main product pages like /ca/macbook-air, /ca/imac
  if (/apple\.com\/ca\/(macbook|imac|mac-mini|mac-studio|mac-pro)\/?/i.test(url)) return true
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
