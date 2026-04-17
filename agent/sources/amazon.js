// ─── Source : Amazon Canada ──────────────────────────────────────
// SearXNG multi-query + page enrichment. PA-API a integrer quand affiliate approuve.

import { searxSearchMulti, fetchPage, extractPrice, withRetry, mapWithConcurrency, log, isCleanProductUrl, sleep } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Laptops — ultraportables
  'laptop ASUS ZenBook 14 2025 prix',
  'laptop HP Spectre x360 14 2025 prix',
  'laptop Lenovo ThinkPad X1 Carbon 2025',
  'laptop Dell XPS 13 Plus 2025',
  'laptop ASUS Vivobook S 14 OLED',
  // Laptops — mainstream
  'laptop HP Pavilion 15 2025 Intel Core',
  'laptop Acer Swift Go 14 prix',
  'laptop Lenovo IdeaPad 5 Ryzen 7 2025',
  // Laptops — gaming
  'laptop gaming ASUS ROG Zephyrus G14 2025',
  'laptop gaming Lenovo Legion 5i Pro rtx 4070',
  'laptop gaming MSI Stealth 16 rtx 4080',
  'laptop gaming Acer Predator Helios 2025',
  // Apple
  'MacBook Air M4 13 pouces prix',
  'MacBook Pro M4 14 pouces prix',
  'Mac Mini M4 prix',
  'iMac M4 24 pouces prix',
  // Desktops
  'desktop gaming pc rtx 4060 tour',
  'desktop gaming pc rtx 4070 tour 2025',
  'HP Pavilion desktop tour 2025 prix',
  'mini pc Beelink SER Ryzen 2025',
  // Monitors
  'moniteur LG 27UK850 4K USB-C',
  'moniteur Dell S2722QC 27 4K USB-C',
  'moniteur Samsung Odyssey G7 32 pouces',
  // Chromebooks
  'Chromebook Acer 314 2025 prix',
  'Chromebook Lenovo Duet 5 prix',
  'Chromebook HP x360 14 prix',
]

export async function fetchAmazon() {
  log('Amazon — debut du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await searxSearchMulti('amazon.ca', query, { minResults: 2 })
      const filtered = results
        .filter(r => r.url?.includes('amazon.ca') && isProductUrl(r.url) && isCleanProductUrl(r.url))
        .map(r => ({
          title: r.title || '',
          url: cleanUrl(r.url),
          snippet: r.content || '',
          imageUrl: r.thumbnail || r.img_src || '',
          source: 'amazon',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ Amazon query failed: ${query.slice(0, 40)} — ${err.message}`)
    }
    await sleep(5000)
  }

  // Dedupliquer par ASIN
  const seen = new Set()
  const unique = allResults.filter(r => {
    const key = extractAsin(r.url) || r.url.split('?')[0]
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  log(`Amazon — ${unique.length} resultats uniques, enrichissement pages...`)

  const enriched = await mapWithConcurrency(unique, async (r) => {
    const page = await fetchPage(r.url)
    if (!page) return { ...r, pageText: null, pagePrice: null }
    if (!page.available) {
      log(`  ✗ Amazon indisponible : ${r.title.slice(0, 50)}`)
      return null
    }
    const pagePrice = extractPrice(page.html, 'amazon')
    const imageUrl = r.imageUrl || page.imageUrl || ''
    return { ...r, pageText: page.text, pagePrice, imageUrl }
  }, PAGE_FETCH_CONCURRENCY)

  const available = enriched.filter(Boolean)
  const withData = available.filter(r => r.pageText)
  log(`Amazon — ${withData.length}/${unique.length} pages enrichies (${unique.length - available.length} indisponibles filtres)`)
  return available
}

function isProductUrl(url) {
  // Reject non-product pages first (account for locale prefixes like /-/fr/)
  if (/amazon\.ca\/((-\/\w+\/)?)(help|gp\/help|b\/|b\?|stores\/|s\?|hz\/)/i.test(url)) return false
  // Accept any URL containing /dp/ASIN or /gp/product/ASIN anywhere in path
  if (/\/dp\/[A-Z0-9]{10}/i.test(url) && url.includes('amazon.ca')) return true
  if (/\/gp\/product\/[A-Z0-9]{10}/i.test(url) && url.includes('amazon.ca')) return true
  return false
}

function extractAsin(url) {
  const m = url.match(/\/(dp|gp\/product)\/([A-Z0-9]{10})/i)
  return m ? m[2] : null
}

function cleanUrl(url) {
  try {
    const asin = extractAsin(url)
    if (asin) return `https://www.amazon.ca/dp/${asin}`
    const u = new URL(url)
    return u.origin + u.pathname
  } catch { return url }
}
