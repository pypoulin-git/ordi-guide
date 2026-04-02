// ─── Source : Walmart Canada ─────────────────────────────────────
// SearXNG multi-query + fetch page pour enrichissement.

import { searxSearchMulti, fetchPage, extractPrice, withRetry, mapWithConcurrency, log, isCleanProductUrl, sleep } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Laptops
  'laptop HP Pavilion 15 2025 prix',
  'laptop Acer Aspire 5 A515 2025 prix',
  'MacBook Air M4 prix',
  'laptop gaming ASUS TUF Gaming A15 rtx',
  // Desktops
  'desktop gaming pc tour rtx 4060 prix',
  'ordinateur bureau HP Slim Desktop 2025',
  // Monitors
  'moniteur Samsung 27 pouces 4K prix',
  // Chromebooks
  'Chromebook Acer 315 prix',
]

export async function fetchWalmart() {
  log('Walmart — debut du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await searxSearchMulti('walmart.ca', query, { minResults: 2 })
      const filtered = results
        .filter(r => r.url?.includes('walmart.ca') && isProductUrl(r.url) && isCleanProductUrl(r.url))
        .map(r => ({
          title: r.title || '',
          url: cleanUrl(r.url),
          snippet: r.content || '',
          imageUrl: r.thumbnail || r.img_src || '',
          source: 'walmart',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ Walmart query failed: ${query.slice(0, 40)} — ${err.message}`)
    }
    await sleep(5000)
  }

  // Dedupliquer par URL
  const seen = new Set()
  const unique = allResults.filter(r => {
    const key = r.url.split('?')[0]
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  log(`Walmart — ${unique.length} resultats uniques, enrichissement pages...`)

  const enriched = await mapWithConcurrency(unique, async (r) => {
    const page = await fetchPage(r.url)
    if (!page) return { ...r, pageText: null, pagePrice: null }
    if (!page.available) {
      log(`  ✗ Walmart indisponible : ${r.title.slice(0, 50)}`)
      return null
    }
    const pagePrice = extractPrice(page.html, 'walmart')
    const imageUrl = r.imageUrl || page.imageUrl || ''
    return { ...r, pageText: page.text, pagePrice, imageUrl }
  }, PAGE_FETCH_CONCURRENCY)

  const available = enriched.filter(Boolean)
  const withData = available.filter(r => r.pageText)
  log(`Walmart — ${withData.length}/${unique.length} pages enrichies (${unique.length - available.length} indisponibles)`)
  return available
}

function isProductUrl(url) {
  // Reject browse, search, and category pages
  if (/\/browse\//i.test(url)) return false
  if (/\/search\//i.test(url)) return false
  if (/\/cp\//i.test(url)) return false
  // Walmart Canada product URLs: /product/... or /ip/...
  return /walmart\.ca\/.*\/product\//i.test(url) ||
    /walmart\.ca.*\/ip\//i.test(url)
}

function cleanUrl(url) {
  try {
    const u = new URL(url)
    u.searchParams.delete('athcpid')
    u.searchParams.delete('athpgid')
    u.searchParams.delete('athznid')
    u.searchParams.delete('athmtid')
    return u.toString()
  } catch { return url }
}
