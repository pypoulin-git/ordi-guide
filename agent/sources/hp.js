// ─── Source : HP Canada ──────────────────────────────────────────
// SearXNG multi-query + fetch page pour enrichissement.

import { searxSearchMulti, fetchPage, extractPrice, withRetry, mapWithConcurrency, log, isCleanProductUrl, sleep } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  // Laptops — Spectre / EliteBook (premium / pro)
  'HP Spectre x360 14 OLED laptop prix',
  'HP Spectre x360 16 laptop 2025 prix',
  'HP EliteBook 840 G11 laptop professionnel prix',
  'HP EliteBook 1040 G11 Intel Ultra prix',
  'HP EliteBook Ultra G1q Snapdragon prix',
  'HP ZBook Firefly 14 G11 workstation',
  // Laptops — Pavilion / Envy (grand public)
  'HP Pavilion 15 laptop 2025 prix',
  'HP Pavilion Plus 14 2025 OLED prix',
  'HP Envy x360 14 2-en-1 2025 prix',
  'HP Envy 16 laptop rtx 4060 prix',
  // Laptops — OMEN / Victus (gaming)
  'HP OMEN 16 gaming laptop rtx 4070 prix',
  'HP OMEN Transcend 14 gaming rtx 4060',
  'HP Victus 15 gaming laptop rtx 4050',
  'HP Victus 16 gaming rtx 4060 prix',
  // Desktops
  'HP Pavilion Desktop TP01 tour 2025 prix',
  'HP OMEN 25L desktop gaming rtx 4060',
  'HP OMEN 45L desktop gaming rtx 4080',
  'HP All-in-One 27 tout-en-un 2025 prix',
  'HP EliteDesk 800 G9 tour pro prix',
  // Monitors
  'HP M27fd moniteur 27 QHD USB-C prix',
  'HP Series 7 Pro moniteur 27 4K USB-C',
  'HP OMEN 27qs moniteur gaming 240Hz QHD',
  'HP X27q moniteur gaming 27 QHD 165Hz',
]

export async function fetchHp() {
  log('HP — debut du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await searxSearchMulti('hp.com', query, { minResults: 2 })
      const filtered = results
        .filter(r => r.url?.includes('hp.com') && isProductUrl(r.url) && isCleanProductUrl(r.url))
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

  log(`HP — ${unique.length} resultats uniques, enrichissement pages...`)

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
  // Reject category, sitelet, and marketing landing pages
  if (/\/cat\//i.test(url)) return false
  if (/\/sitelet\//i.test(url)) return false
  if (/\/mlp\//i.test(url)) return false
  // HP product URLs: /pdp/... or /product/... or /shop/...
  return /hp\.com.*\/(pdp|product|shop)\//i.test(url)
}

function cleanUrl(url) {
  try {
    const u = new URL(url)
    u.searchParams.delete('jumpid')
    u.searchParams.delete('ctrl')
    u.searchParams.delete('ref')
    return u.toString()
  } catch { return url }
}
