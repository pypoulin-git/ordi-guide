// ─── Source : Costco Canada ──────────────────────────────────────

import { searxSearchMulti, fetchPage, extractPrice, withRetry, mapWithConcurrency, log, isCleanProductUrl, sleep } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Laptops
  'laptop Lenovo IdeaPad 5 prix',
  'laptop HP Pavilion 15 2025 prix',
  'MacBook Air M4 prix',
  'laptop gaming ASUS TUF Gaming A15 2025',
  // Desktops
  'desktop Lenovo IdeaCentre 2025 prix',
  'desktop gaming pc tour rtx',
  // Monitors
  'moniteur LG UltraWide 34 pouces prix',
  // Chromebooks
  'Chromebook HP 14 prix',
]

export async function fetchCostco() {
  log('Costco — debut du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await searxSearchMulti('costco.ca', query, { minResults: 2 })
      const filtered = results
        .filter(r => r.url?.includes('costco.ca') && isProductUrl(r.url) && isCleanProductUrl(r.url))
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
    await sleep(5000)
  }

  const seen = new Set()
  const unique = allResults.filter(r => {
    const key = r.url
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  log(`Costco — ${unique.length} resultats uniques, enrichissement pages...`)

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
  // Reject browse/category pages
  if (/\/(browse|category)\//i.test(url)) return false
  // Costco product pages have .product. in the URL path
  return /\.product\./i.test(url)
}
