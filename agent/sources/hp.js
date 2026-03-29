// ─── Source : HP Canada ──────────────────────────────────────────
// SearXNG pour découverte + fetch page pour enrichissement.

import { searxSearch, fetchPage, extractPrice, withRetry, mapWithConcurrency, log } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Laptops
  'site:hp.com Pavilion laptop ordinateur portable 2025 2026',
  'site:hp.com ProBook EliteBook laptop professionnel',
  'site:hp.com Spectre Envy laptop ultrabook 2025',
  // Gaming
  'site:hp.com OMEN Victus gaming laptop rtx 2025',
  // Desktop
  'site:hp.com desktop ordinateur bureau Pavilion Pro',
  'site:hp.com desktop gaming OMEN tower',
  // Monitors & docks
  'site:hp.com monitor écran 4K 27 32 pouces',
  'site:hp.com docking station thunderbolt G5 USB-C',
  // Accessories & peripherals
  'site:hp.com accessories clavier souris webcam hub',
  // Deals
  'hp.com/ca deals solde promotion laptop ordinateur 2025',
  'site:hp.com chromebook 2025 prix canada',
]

export async function fetchHp() {
  log('HP — début du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await withRetry(
        () => searxSearch(query, { engines: 'google,bing' }),
        `hp:${query.slice(0, 30)}`
      )
      const filtered = results
        .filter(r => r.url?.includes('hp.com') && isProductUrl(r.url))
        .map(r => ({
          title: r.title || '',
          url: cleanUrl(r.url),
          snippet: r.content || '',
          imageUrl: r.thumbnail || r.img_src || '',
          source: 'hp',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ HP query failed: ${query.slice(0, 40)} — ${err.message}`)
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

  log(`HP — ${unique.length} résultats uniques, enrichissement pages...`)

  // Enrichir avec le contenu réel des pages
  const enriched = await mapWithConcurrency(unique, async (r) => {
    const page = await fetchPage(r.url)
    if (!page) return { ...r, pageText: null, pagePrice: null }
    if (!page.available) {
      log(`  ✗ HP indisponible : ${r.title.slice(0, 50)}`)
      return null
    }
    const pagePrice = extractPrice(page.html, 'hp')
    const imageUrl = r.imageUrl || page.imageUrl || ''
    return { ...r, pageText: page.text, pagePrice, imageUrl }
  }, PAGE_FETCH_CONCURRENCY)

  const available = enriched.filter(Boolean)
  const withData = available.filter(r => r.pageText)
  log(`HP — ${withData.length}/${unique.length} pages enrichies (${unique.length - available.length} indisponibles)`)
  return available
}

function isProductUrl(url) {
  // HP product URLs: /pdp/... or /product/... or /shop/...
  return /hp\.com.*\/(pdp|product|shop)\//i.test(url)
}

function cleanUrl(url) {
  try {
    const u = new URL(url)
    // Remove tracking params
    u.searchParams.delete('jumpid')
    u.searchParams.delete('ctrl')
    u.searchParams.delete('ref')
    return u.toString()
  } catch { return url }
}
