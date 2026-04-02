// ─── Source : Bureau en Gros (Staples Canada) ───────────────────

import { searxSearchMulti, fetchPage, extractPrice, withRetry, mapWithConcurrency, log, isCleanProductUrl, sleep } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Laptops
  'laptop HP ProBook 450 G11 prix',
  'laptop Lenovo ThinkPad E14 2025 prix',
  'MacBook Air M4 prix',
  'laptop ASUS VivoBook 15 2025 prix',
  // Desktops
  'desktop HP Pro Tower 290 G9 prix',
  'desktop Lenovo ThinkCentre M70q Tiny prix',
  // Monitors
  'moniteur Dell E2723HN 27 pouces prix',
  // Chromebooks
  'Chromebook Acer 314 prix',
]

export async function fetchStaples() {
  log('Bureau en Gros — debut du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      // Search staples.ca only (bureauengros.com often redirects to staples.ca)
      const results = await searxSearchMulti('staples.ca', query, { minResults: 2 })
      const filtered = results
        .filter(r => (r.url?.includes('bureauengros.com') || r.url?.includes('staples.ca')) && isProductUrl(r.url) && isCleanProductUrl(r.url))
        .map(r => ({
          title: r.title || '',
          url: r.url.split('?')[0],
          snippet: r.content || '',
          imageUrl: r.thumbnail || r.img_src || '',
          source: 'staples',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ Staples query failed: ${query.slice(0, 40)} — ${err.message}`)
    }
    await sleep(5000)
  }

  const seen = new Set()
  const unique = allResults.filter(r => {
    if (seen.has(r.url)) return false
    seen.add(r.url)
    return true
  })

  log(`Bureau en Gros — ${unique.length} resultats uniques, enrichissement pages...`)

  const enriched = await mapWithConcurrency(unique, async (r) => {
    const page = await fetchPage(r.url)
    if (!page) return { ...r, pageText: null, pagePrice: null }
    if (!page.available) {
      log(`  ✗ Bureau en Gros indisponible : ${r.title.slice(0, 50)}`)
      return null
    }
    const pagePrice = extractPrice(page.html, 'staples')
    const imageUrl = r.imageUrl || page.imageUrl || ''
    return { ...r, pageText: page.text, pagePrice, imageUrl }
  }, PAGE_FETCH_CONCURRENCY)

  const available = enriched.filter(Boolean)
  const withData = available.filter(r => r.pageText)
  log(`Bureau en Gros — ${withData.length}/${unique.length} pages enrichies (${unique.length - available.length} indisponibles)`)
  return available
}

function isProductUrl(url) {
  // Reject search and category listing pages
  if (/\/search\?/i.test(url)) return false
  if (/\/category\//i.test(url)) return false
  // Require a numeric product ID in the URL
  return /\/\d{4,}/i.test(url)
}
