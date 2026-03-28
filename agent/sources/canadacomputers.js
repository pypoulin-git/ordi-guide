// ─── Source : Canada Computers ───────────────────────────────────
// SearXNG pour découverte + fetch page pour enrichissement.

import { searxSearch, fetchPage, extractPrice, withRetry, mapWithConcurrency, log } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Laptops
  'site:canadacomputers.com laptop ordinateur portable 2025 2026',
  'site:canadacomputers.com laptop gaming rtx 4060 4070',
  'site:canadacomputers.com laptop intel core ultra amd ryzen',
  // Desktops
  'site:canadacomputers.com desktop gaming pc prebuilt',
  'site:canadacomputers.com desktop ordinateur bureau intel amd',
  // Monitors
  'site:canadacomputers.com monitor écran 4K 27 32 pouces',
  'site:canadacomputers.com monitor gaming 144hz 240hz',
  // Docking stations & peripherals
  'site:canadacomputers.com docking station thunderbolt usb-c',
  'site:canadacomputers.com clavier souris peripherals accessories',
  'site:canadacomputers.com SSD NVMe stockage disque',
  // Deals
  'canadacomputers.com deals solde promotion ordinateur 2025',
]

export async function fetchCanadaComputers() {
  log('Canada Computers — début du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await withRetry(
        () => searxSearch(query, { engines: 'google,bing' }),
        `canadacomputers:${query.slice(0, 30)}`
      )
      const filtered = results
        .filter(r => r.url?.includes('canadacomputers.com') && isProductUrl(r.url))
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
  }

  // Dédupliquer par URL
  const seen = new Set()
  const unique = allResults.filter(r => {
    const key = r.url.split('?')[0]
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  log(`Canada Computers — ${unique.length} résultats uniques, enrichissement pages...`)

  // Enrichir avec le contenu réel des pages
  const enriched = await mapWithConcurrency(unique, async (r) => {
    const pageText = await fetchPage(r.url)
    const pagePrice = extractPrice(pageText, 'canadacomputers')
    return { ...r, pageText, pagePrice }
  }, PAGE_FETCH_CONCURRENCY)

  const withData = enriched.filter(r => r.pageText)
  log(`Canada Computers — ${withData.length}/${unique.length} pages enrichies`)
  return enriched
}

function isProductUrl(url) {
  // Canada Computers product URLs: /product/...
  return /canadacomputers\.com\/product\//i.test(url)
}

function cleanUrl(url) {
  try {
    const u = new URL(url)
    // Remove tracking params
    u.searchParams.delete('utm_source')
    u.searchParams.delete('utm_medium')
    u.searchParams.delete('utm_campaign')
    return u.toString()
  } catch { return url }
}
