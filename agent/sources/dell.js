// ─── Source : Dell Canada ────────────────────────────────────────
// SearXNG pour découverte + fetch page pour enrichissement.

import { searxSearch, fetchPage, extractPrice, withRetry, mapWithConcurrency, log, isCleanProductUrl } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Laptops
  'site:dell.com Latitude laptop canada 2025 2026',
  'site:dell.com Inspiron ordinateur portable prix',
  'site:dell.com XPS laptop ultrabook 2025',
  // Gaming
  'site:dell.com Alienware gaming laptop rtx 2025',
  'site:dell.com Dell G16 G15 gaming laptop',
  // Desktop
  'site:dell.com OptiPlex desktop ordinateur bureau',
  'site:dell.com desktop gaming Alienware Aurora',
  // Monitors & docks
  'site:dell.com monitor écran UltraSharp 4K 27 32',
  'site:dell.com docking station WD22 WD19 thunderbolt',
  // Deals
  'dell.com/en-ca deals solde promotion ordinateur 2025',
  'site:dell.com accessories clavier souris hub canada',
]

export async function fetchDell() {
  log('Dell — début du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await withRetry(
        () => searxSearch(query, { engines: 'google,bing' }),
        `dell:${query.slice(0, 30)}`
      )
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
  }

  // Dédupliquer par URL
  const seen = new Set()
  const unique = allResults.filter(r => {
    const key = r.url.split('?')[0]
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  log(`Dell — ${unique.length} résultats uniques, enrichissement pages...`)

  // Enrichir avec le contenu réel des pages
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
    // Remove tracking params
    u.searchParams.delete('ref')
    u.searchParams.delete('dgc')
    u.searchParams.delete('cid')
    u.searchParams.delete('lid')
    return u.toString()
  } catch { return url }
}
