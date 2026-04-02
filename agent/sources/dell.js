// ─── Source : Dell Canada ────────────────────────────────────────
// SearXNG multi-query + fetch page pour enrichissement.

import { searxSearchMulti, fetchPage, extractPrice, withRetry, mapWithConcurrency, log, isCleanProductUrl, sleep } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Laptops
  'Dell XPS 14 9440 laptop prix',
  'Dell Inspiron 16 7640 laptop 2025',
  'Dell Latitude 5550 laptop professionnel prix',
  'Dell Alienware m16 R2 gaming laptop rtx',
  // Desktops
  'Dell Inspiron 3030 desktop tour prix',
  'Alienware Aurora R16 gaming desktop rtx',
  // Monitors
  'Dell UltraSharp U2724D moniteur 27 QHD',
  'Dell S2722QC moniteur 27 4K USB-C',
]

export async function fetchDell() {
  log('Dell — debut du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await searxSearchMulti('dell.com', query, { minResults: 2 })
      const filtered = results
        .filter(r => r.url?.includes('dell.com') && isProductUrl(r.url) && isCleanProductUrl(r.url))
        .map(r => ({
          title: r.title || '',
          url: cleanUrl(r.url),
          snippet: r.content || '',
          imageUrl: r.thumbnail || r.img_src || '',
          source: 'dell',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ Dell query failed: ${query.slice(0, 40)} — ${err.message}`)
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

  log(`Dell — ${unique.length} resultats uniques, enrichissement pages...`)

  const enriched = await mapWithConcurrency(unique, async (r) => {
    const page = await fetchPage(r.url)
    if (!page) return { ...r, pageText: null, pagePrice: null }
    if (!page.available) {
      log(`  ✗ Dell indisponible : ${r.title.slice(0, 50)}`)
      return null
    }
    const pagePrice = extractPrice(page.html, 'dell')
    const imageUrl = r.imageUrl || page.imageUrl || ''
    return { ...r, pageText: page.text, pagePrice, imageUrl }
  }, PAGE_FETCH_CONCURRENCY)

  const available = enriched.filter(Boolean)
  const withData = available.filter(r => r.pageText)
  log(`Dell — ${withData.length}/${unique.length} pages enrichies (${unique.length - available.length} indisponibles)`)
  return available
}

function isProductUrl(url) {
  // Reject deals, landing pages, and learn pages
  if (/\/deals\//i.test(url)) return false
  if (/\/lp\//i.test(url)) return false
  if (/\/learn\//i.test(url)) return false
  // Dell product URLs: /shop/... or /pd/... or /productdetail/...
  return /dell\.com.*\/(shop|pd)\//i.test(url) ||
    /dell\.com.*\/productdetail/i.test(url)
}

function cleanUrl(url) {
  try {
    const u = new URL(url)
    u.searchParams.delete('ref')
    u.searchParams.delete('dgc')
    u.searchParams.delete('cid')
    u.searchParams.delete('lid')
    return u.toString()
  } catch { return url }
}
