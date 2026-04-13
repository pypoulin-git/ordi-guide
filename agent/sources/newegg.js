// ─── Source : Newegg Canada ──────────────────────────────────────
// SearXNG multi-query + fetch page pour enrichissement.

import { searxSearchMulti, fetchPage, extractPrice, withRetry, mapWithConcurrency, log, isCleanProductUrl, sleep } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Laptops
  'laptop ASUS ROG Strix G16 2025 prix',
  'laptop MSI Katana 15 rtx 4060 prix',
  'laptop Lenovo Legion 5 rtx 4070 prix',
  'laptop Acer Predator Helios Neo 16 2025',
  // Desktops
  'desktop gaming pc ASUS ROG Strix rtx 5070',
  'desktop CyberPowerPC gaming tour rtx',
  // Monitors
  'moniteur LG UltraGear 27GP850 gaming 165hz',
  'ecran Samsung Odyssey G5 32 QHD gaming',
  // Chromebooks
  'Chromebook ASUS HP Acer 2025 prix',
]

export async function fetchNewegg() {
  log('Newegg — debut du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await searxSearchMulti('newegg.ca', query, { minResults: 2 })
      const filtered = results
        .filter(r => r.url?.includes('newegg.ca') && isProductUrl(r.url) && isCleanProductUrl(r.url))
        .map(r => ({
          title: r.title || '',
          url: cleanUrl(r.url),
          snippet: r.content || '',
          imageUrl: r.thumbnail || r.img_src || '',
          source: 'newegg',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ Newegg query failed: ${query.slice(0, 40)} — ${err.message}`)
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

  log(`Newegg — ${unique.length} resultats uniques, enrichissement pages...`)

  const enriched = await mapWithConcurrency(unique, async (r) => {
    const page = await fetchPage(r.url)
    if (!page) return { ...r, pageText: null, pagePrice: null }
    if (!page.available) {
      log(`  ✗ Newegg indisponible : ${r.title.slice(0, 50)}`)
      return null
    }
    const pagePrice = extractPrice(page.html, 'newegg')
    const imageUrl = r.imageUrl || page.imageUrl || ''
    return { ...r, pageText: page.text, pagePrice, imageUrl }
  }, PAGE_FETCH_CONCURRENCY)

  const available = enriched.filter(Boolean)
  const withData = available.filter(r => r.pageText)
  log(`Newegg — ${withData.length}/${unique.length} pages enrichies (${unique.length - available.length} indisponibles)`)
  return available
}

function isProductUrl(url) {
  // Reject global and promotions pages
  if (/\/(global|promotions)\//i.test(url)) return false
  // Newegg product URLs: /p/XXXX (with or without category prefix) or /Product/Product.aspx
  return /newegg\.ca\/(.*\/)?p\//i.test(url) ||
    /newegg\.ca\/Product/i.test(url)
}

function cleanUrl(url) {
  try {
    const u = new URL(url)
    u.searchParams.delete('cm_sp')
    u.searchParams.delete('icid')
    u.searchParams.delete('ref')
    return u.toString()
  } catch { return url }
}
