// ─── Source : Microsoft Store Canada ─────────────────────────────
// SearXNG multi-query + fetch page pour enrichissement.

import { searxSearchMulti, fetchPage, extractPrice, withRetry, mapWithConcurrency, log, isCleanProductUrl, sleep } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Laptops
  'Microsoft Surface Pro 11 Copilot+ prix',
  'Microsoft Surface Laptop 6 15 pouces prix',
  'Microsoft Surface Laptop Go 3 prix',
  'Microsoft Surface Laptop Studio 2 prix',
  // Desktops
  'Surface Copilot+ PC laptop Snapdragon prix',
  // Monitors & peripherals
  'Microsoft Ergonomic Keyboard clavier prix',
  'Xbox Wireless Controller manette prix',
  'Surface Dock 2 thunderbolt prix',
]

export async function fetchMicrosoft() {
  log('Microsoft — debut du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await searxSearchMulti('microsoft.com', query, { minResults: 2 })
      const filtered = results
        .filter(r => r.url?.includes('microsoft.com') && isProductUrl(r.url) && isCleanProductUrl(r.url))
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

  log(`Microsoft — ${unique.length} resultats uniques, enrichissement pages...`)

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
  // Reject store browse, collections, and general shop pages
  if (/\/store\/b\//i.test(url)) return false
  if (/\/store\/collections\//i.test(url)) return false
  if (/\/[a-z]{2}-[a-z]{2}\/shop\/?(\?|$)/i.test(url)) return false
  if (/\/[a-z]{2}-[a-z]{2}\/shop\/[^/]*$/i.test(url) && !/\/[a-z]{2}-[a-z]{2}\/shop\/\w+-\w+.*\d/i.test(url)) return false
  // Microsoft Store product URLs: /d/... or /p/... or URLs containing "surface"
  return /microsoft\.com.*\/(d|p)\//i.test(url) ||
    /microsoft\.com.*surface/i.test(url)
}

function cleanUrl(url) {
  try {
    const u = new URL(url)
    u.searchParams.delete('icid')
    u.searchParams.delete('activetab')
    u.searchParams.delete('ef_id')
    return u.toString()
  } catch { return url }
}
