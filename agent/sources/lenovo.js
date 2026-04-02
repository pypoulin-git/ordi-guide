// ─── Source : Lenovo Canada ──────────────────────────────────────
// SearXNG multi-query + fetch page pour enrichissement.

import { searxSearchMulti, fetchPage, extractPrice, withRetry, mapWithConcurrency, log, isCleanProductUrl, sleep } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Laptops
  'Lenovo ThinkPad X1 Carbon Gen 12 prix',
  'Lenovo IdeaPad Slim 5 14 2025 prix',
  'Lenovo Yoga 9i 14 2025 OLED prix',
  'Lenovo Legion Pro 5 16 rtx 4070 prix',
  // Desktops
  'Lenovo ThinkCentre M75q Tiny desktop prix',
  'Lenovo IdeaCentre AIO 27 tout-en-un 2025',
  // Monitors
  'Lenovo ThinkVision T27p-30 moniteur 27 4K',
  'Lenovo ThinkVision P27h-30 moniteur QHD USB-C',
]

export async function fetchLenovo() {
  log('Lenovo — debut du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await searxSearchMulti('lenovo.com', query, { minResults: 2 })
      const filtered = results
        .filter(r => r.url?.includes('lenovo.com') && isProductUrl(r.url) && isCleanProductUrl(r.url))
        .map(r => ({
          title: r.title || '',
          url: cleanUrl(r.url),
          snippet: r.content || '',
          imageUrl: r.thumbnail || r.img_src || '',
          source: 'lenovo',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ Lenovo query failed: ${query.slice(0, 40)} — ${err.message}`)
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

  log(`Lenovo — ${unique.length} resultats uniques, enrichissement pages...`)

  const enriched = await mapWithConcurrency(unique, async (r) => {
    const page = await fetchPage(r.url)
    if (!page) return { ...r, pageText: null, pagePrice: null }
    if (!page.available) {
      log(`  ✗ Lenovo indisponible : ${r.title.slice(0, 50)}`)
      return null
    }
    const pagePrice = extractPrice(page.html, 'lenovo')
    const imageUrl = r.imageUrl || page.imageUrl || ''
    return { ...r, pageText: page.text, pagePrice, imageUrl }
  }, PAGE_FETCH_CONCURRENCY)

  const available = enriched.filter(Boolean)
  const withData = available.filter(r => r.pageText)
  log(`Lenovo — ${withData.length}/${unique.length} pages enrichies (${unique.length - available.length} indisponibles)`)
  return available
}

function isProductUrl(url) {
  // Reject deals, sale, and category pages
  if (/\/d\/deals\//i.test(url)) return false
  if (/\/sale\//i.test(url)) return false
  if (/\/c\//i.test(url)) return false
  // Lenovo product URLs: /p/... or /laptops/... or /desktops/... or /monitors/... or /accessories/...
  return /lenovo\.com.*\/(p|laptops|desktops|monitors|accessories)\//i.test(url)
}

function cleanUrl(url) {
  try {
    const u = new URL(url)
    u.searchParams.delete('cid')
    u.searchParams.delete('clickid')
    u.searchParams.delete('orgRef')
    return u.toString()
  } catch { return url }
}
