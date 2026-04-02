// ─── Source : Amazon Canada ──────────────────────────────────────
// SearXNG multi-query + page enrichment. PA-API a integrer quand affiliate approuve.

import { searxSearchMulti, fetchPage, extractPrice, withRetry, mapWithConcurrency, log, isCleanProductUrl, sleep } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Laptops
  'laptop ASUS ZenBook 14 2025 prix',
  'laptop HP Spectre x360 14 2025 prix',
  'MacBook Air M4 prix',
  'laptop gaming ASUS ROG Zephyrus G14 2025',
  // Desktops
  'desktop gaming pc rtx 4060 tour',
  'iMac M4 prix',
  // Monitors
  'moniteur LG 27UK850 4K USB-C',
  // Chromebooks
  'Chromebook Acer 314 2025 prix',
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
