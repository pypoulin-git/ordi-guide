// ─── Source : Bureau en Gros (Staples Canada) ───────────────────

import { searxSearch, fetchPage, extractPrice, withRetry, mapWithConcurrency, log } from '../utils.js'
import { PAGE_FETCH_CONCURRENCY } from '../config.js'

const SEARCH_QUERIES = [
  'site:bureauengros.com laptop ordinateur portable',
  'site:bureauengros.com desktop ordinateur bureau',
  'site:bureauengros.com chromebook',
  'site:bureauengros.com macbook apple',
  'site:staples.ca laptop computer deal',
  'bureauengros.com ordinateur solde promotion 2025',
]

export async function fetchStaples() {
  log('Bureau en Gros — début du scan')
  const allResults = []

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await withRetry(
        () => searxSearch(query, { engines: 'google,bing' }),
        `staples:${query.slice(0, 30)}`
      )
      const filtered = results
        .filter(r => (r.url?.includes('bureauengros.com') || r.url?.includes('staples.ca')) && isProductUrl(r.url))
        .map(r => ({
          title: r.title || '',
          url: r.url.split('?')[0],
          snippet: r.content || '',
          imageUrl: r.thumbnail || r.img_src || '',
          source: 'staples',
        }))
      allResults.push(...filtered)
    } catch (err) {
      log(`  ✗ Staples query failed: ${query.slice(0, 40)} — ${err.message}`)
    }
  }

  const seen = new Set()
  const unique = allResults.filter(r => {
    if (seen.has(r.url)) return false
    seen.add(r.url)
    return true
  })

  log(`Bureau en Gros — ${unique.length} résultats uniques, enrichissement pages...`)

  const enriched = await mapWithConcurrency(unique, async (r) => {
    const page = await fetchPage(r.url)
    if (!page) return { ...r, pageText: null, pagePrice: null }
    if (!page.available) {
      log(`  ✗ Bureau en Gros indisponible : ${r.title.slice(0, 50)}`)
      return null
    }
    const pagePrice = extractPrice(page.html, 'staples')
    const imageUrl = r.imageUrl || page.imageUrl || ''
    return { ...r, pageText: page.text, pagePrice, imageUrl }
  }, PAGE_FETCH_CONCURRENCY)

  const available = enriched.filter(Boolean)
  const withData = available.filter(r => r.pageText)
  log(`Bureau en Gros — ${withData.length}/${unique.length} pages enrichies (${unique.length - available.length} indisponibles)`)
  return available
}

function isProductUrl(url) {
  return /\/(product|produit|p)\//i.test(url) ||
    /(laptop|ordinateur|macbook|desktop|chromebook)/i.test(url)
}
