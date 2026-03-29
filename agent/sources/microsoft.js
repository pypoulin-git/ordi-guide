// ─── Source : Microsoft Store Canada ─────────────────────────────
// SearXNG pour découverte + fetch page pour enrichissement.

import { searxSearch, fetchPage, extractPrice, withRetry, mapWithConcurrency, log } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Surface Pro
  'site:microsoft.com Surface Pro tablet laptop 2025 2026',
  'site:microsoft.com Surface Pro 10 11 prix canada',
  // Surface Laptop
  'site:microsoft.com Surface Laptop ordinateur portable 2025',
  'site:microsoft.com Surface Laptop Go Studio prix',
  // Surface accessories
  'site:microsoft.com Surface accessories clavier stylet dock',
  'site:microsoft.com Surface dock thunderbolt hub USB-C',
  // Xbox accessories (gaming peripherals)
  'site:microsoft.com Xbox manette controller accessoires',
  // Monitors & peripherals
  'site:microsoft.com monitor écran ergonomic webcam',
  // Deals
  'microsoft.com/en-ca deals solde promotion Surface 2025',
  'site:microsoft.com Copilot+ PC laptop Surface canada',
]

export async function fetchMicrosoft() {
  log('Microsoft — début du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await withRetry(
        () => searxSearch(query, { engines: 'google,bing' }),
        `microsoft:${query.slice(0, 30)}`
      )
      const filtered = results
        .filter(r => r.url?.includes('microsoft.com') && isProductUrl(r.url))
        .map(r => ({
          title: r.title || '',
          url: cleanUrl(r.url),
          snippet: r.content || '',
          imageUrl: r.thumbnail || r.img_src || '',
          source: 'microsoft',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ Microsoft query failed: ${query.slice(0, 40)} — ${err.message}`)
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

  log(`Microsoft — ${unique.length} résultats uniques, enrichissement pages...`)

  // Enrichir avec le contenu réel des pages
  const enriched = await mapWithConcurrency(unique, async (r) => {
    const page = await fetchPage(r.url)
    if (!page) return { ...r, pageText: null, pagePrice: null }
    if (!page.available) {
      log(`  ✗ Microsoft indisponible : ${r.title.slice(0, 50)}`)
      return null
    }
    const pagePrice = extractPrice(page.html, 'microsoft')
    const imageUrl = r.imageUrl || page.imageUrl || ''
    return { ...r, pageText: page.text, pagePrice, imageUrl }
  }, PAGE_FETCH_CONCURRENCY)

  const available = enriched.filter(Boolean)
  const withData = available.filter(r => r.pageText)
  log(`Microsoft — ${withData.length}/${unique.length} pages enrichies (${unique.length - available.length} indisponibles)`)
  return available
}

function isProductUrl(url) {
  // Microsoft Store product URLs: /d/... or /p/... or URLs containing "surface"
  return /microsoft\.com.*\/(d|p)\//i.test(url) ||
    /microsoft\.com.*surface/i.test(url)
}

function cleanUrl(url) {
  try {
    const u = new URL(url)
    // Remove tracking params
    u.searchParams.delete('icid')
    u.searchParams.delete('activetab')
    u.searchParams.delete('ef_id')
    return u.toString()
  } catch { return url }
}
