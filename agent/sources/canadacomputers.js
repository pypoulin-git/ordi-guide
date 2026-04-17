// ─── Source : Canada Computers ───────────────────────────────────
// SearXNG multi-query + fetch page pour enrichissement.

import { searxSearchMulti, fetchPage, extractPrice, withRetry, mapWithConcurrency, log, isCleanProductUrl, sleep } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Laptops — gaming
  'laptop ASUS ROG Zephyrus G14 2025 prix',
  'laptop Lenovo Legion Pro 7i rtx 4080',
  'laptop MSI Vector 16 rtx 4070 prix',
  'laptop Acer Nitro V 15 gaming rtx 4060',
  'laptop Razer Blade 14 rtx 4070 prix',
  // Laptops — pro / étudiants
  'laptop Lenovo ThinkPad E16 2025 prix',
  'laptop HP Pavilion Plus 14 2025 prix',
  'laptop ASUS Zenbook Duo 14 2025 prix',
  'laptop Dell Latitude 7450 Intel Ultra',
  // Desktops
  'desktop gaming pc ASUS ROG Strix rtx 4070',
  'desktop gaming MSI MAG Infinite rtx 4070',
  'desktop Dell XPS 8960 tour Intel',
  'mini pc ASUS NUC Intel 2025 prix',
  'mini pc ASUS PN64 Intel Core Ultra',
  // Monitors
  'moniteur ASUS ProArt PA278QV 27 IPS prix',
  'moniteur BenQ PD2705U 27 4K designer',
  'moniteur MSI MAG 274QPF 27 QHD 170Hz',
  'moniteur LG 27GP950 UltraGear 4K prix',
  // Docks
  'station accueil Thunderbolt 4 CalDigit TS4',
  'station accueil Anker 675 USB-C dock',
  // Chromebooks
  'Chromebook ASUS 14 pouces 2025 prix',
  'Chromebook Lenovo IdeaPad Duet 3 prix',
]

export async function fetchCanadaComputers() {
  log('Canada Computers — debut du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await searxSearchMulti('canadacomputers.com', query, { minResults: 2 })
      const filtered = results
        .filter(r => r.url?.includes('canadacomputers.com') && isProductUrl(r.url) && isCleanProductUrl(r.url))
        .map(r => ({
          title: r.title || '',
          url: cleanUrl(r.url),
          snippet: r.content || '',
          imageUrl: r.thumbnail || r.img_src || '',
          source: 'canadacomputers',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ Canada Computers query failed: ${query.slice(0, 40)} — ${err.message}`)
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

  log(`Canada Computers — ${unique.length} resultats uniques, enrichissement pages...`)

  const enriched = await mapWithConcurrency(unique, async (r) => {
    const page = await fetchPage(r.url)
    if (!page) return { ...r, pageText: null, pagePrice: null }
    if (!page.available) {
      log(`  ✗ Canada Computers indisponible : ${r.title.slice(0, 50)}`)
      return null
    }
    const pagePrice = extractPrice(page.html, 'canadacomputers')
    const imageUrl = r.imageUrl || page.imageUrl || ''
    return { ...r, pageText: page.text, pagePrice, imageUrl }
  }, PAGE_FETCH_CONCURRENCY)

  const available = enriched.filter(Boolean)
  const withData = available.filter(r => r.pageText)
  log(`Canada Computers — ${withData.length}/${unique.length} pages enrichies (${unique.length - available.length} indisponibles)`)
  return available
}

function isProductUrl(url) {
  // Canada Computers product URLs: /product/... or /product_info.php?...
  return /canadacomputers\.com\/product[_/]/i.test(url)
}

function cleanUrl(url) {
  try {
    const u = new URL(url)
    u.searchParams.delete('utm_source')
    u.searchParams.delete('utm_medium')
    u.searchParams.delete('utm_campaign')
    return u.toString()
  } catch { return url }
}
