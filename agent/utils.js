// ─── Catalogue Agent — Utilitaires ───────────────────────────────

import {
  SEARXNG_URL, GEMINI_API_URL, getGeminiApiKey,
  MAX_RETRIES, RETRY_DELAY_MS,
  CPU_WHITELIST, AFFILIATE_TAGS,
  PAGE_FETCH_TIMEOUT, getDiscordWebhookUrl,
} from './config.js'

// ── SearXNG ─────────────────────────────────────────────────────

export async function searxSearch(query, options = {}) {
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    language: 'fr-CA',
    categories: options.categories || 'general',
    engines: options.engines || '',
    pageno: String(options.page || 1),
  })

  const res = await fetch(`${SEARXNG_URL}/search?${params}`, {
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) throw new Error(`SearXNG ${res.status}: ${res.statusText}`)
  const data = await res.json()
  return data.results || []
}

/**
 * Multi-page search with domain filter fallback.
 * 1. Try `site:domain query` on page 1 and 2
 * 2. If < minResults product URLs found, try without `site:` and filter by domain
 * Returns raw SearXNG results (caller applies isProductUrl).
 */
export async function searxSearchMulti(domain, query, options = {}) {
  const allResults = []
  const minResults = options.minResults || 3

  // Try multiple engine groups — use whichever works
  const engineGroups = ['brave,bing', 'qwant,mojeek', 'yandex,startpage', 'duckduckgo']

  for (const engines of engineGroups) {
    if (allResults.filter(r => r.url?.includes(domain)).length >= minResults) break

    // Try domain-in-query first (more reliable)
    try {
      const r = await searxSearch(`${domain} ${query}`, { engines })
      const matching = r.filter(r => r.url?.includes(domain))
      if (matching.length > 0) {
        allResults.push(...matching)
        continue // this engine group worked, move on
      }
    } catch { /* ignore */ }

    // Try site: operator as fallback
    await sleep(2000)
    try {
      const r = await searxSearch(`site:${domain} ${query}`, { engines })
      allResults.push(...r.filter(r => r.url?.includes(domain)))
    } catch { /* ignore */ }

    await sleep(2000)
  }

  return allResults
}

// ── Gemini ───────────────────────────────────────────────────────

export async function geminiGenerate(prompt, jsonSchema = null) {
  const GEMINI_API_KEY = getGeminiApiKey()
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY manquante')

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 8192,
      thinkingConfig: { thinkingBudget: 0 },
    },
  }

  if (jsonSchema) {
    body.generationConfig.responseMimeType = 'application/json'
    body.generationConfig.responseSchema = jsonSchema
  }

  const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini ${res.status}: ${err.slice(0, 300)}`)
  }

  const data = await res.json()
  const parts = data.candidates?.[0]?.content?.parts ?? []
  const text = parts.filter(p => p.text).map(p => p.text).pop()
  if (!text) throw new Error('Réponse Gemini vide')

  return jsonSchema ? JSON.parse(text) : text
}

// ── Page fetching ───────────────────────────────────────────────

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

/**
 * Fetch a product page and return { text, html, imageUrl, available }.
 * text = stripped body text (max 3000 chars).
 * html = raw HTML (for price extraction).
 * imageUrl = best product image found in the page.
 * available = false if product is explicitly unavailable.
 * Returns null on failure — does not throw.
 */
export async function fetchPage(url, timeout = PAGE_FETCH_TIMEOUT) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeout)
    try {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: { 'User-Agent': UA, Accept: 'text/html' },
        redirect: 'follow',
      })
      clearTimeout(timer)
      if (!res.ok) {
        if (attempt === 0) { await sleep(2000); continue }
        return null
      }
      const html = await res.text()

      // Extract product image from HTML
      const imageUrl = extractImageFromHtml(html, url)

      // Check availability
      const available = checkAvailability(html)

      // Strip scripts, styles, tags, compress whitespace
      const text = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ').replace(/&#\d+;/g, '')
        .replace(/\s{3,}/g, '\n').trim()
      return { text: text.slice(0, 3000), html, imageUrl, available }
    } catch {
      clearTimeout(timer)
      if (attempt === 0) { await sleep(2000); continue }
      return null
    }
  }
  return null
}

/**
 * Extract the best product image from raw HTML.
 * Checks og:image, Twitter image, JSON-LD image, common product image patterns.
 */
function extractImageFromHtml(html, url) {
  // 1. og:image (most reliable)
  const ogMatch = html.match(/<meta\s+(?:property|name)=["']og:image["']\s+content=["']([^"']+)["']/i)
    || html.match(/<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']og:image["']/i)
  if (ogMatch?.[1] && isValidImageUrl(ogMatch[1])) return ogMatch[1]

  // 2. Twitter image
  const twMatch = html.match(/<meta\s+(?:property|name)=["']twitter:image["']\s+content=["']([^"']+)["']/i)
    || html.match(/<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']twitter:image["']/i)
  if (twMatch?.[1] && isValidImageUrl(twMatch[1])) return twMatch[1]

  // 3. JSON-LD image
  const jsonLdMatch = html.match(/"image"\s*:\s*"(https?:\/\/[^"]+\.(jpg|jpeg|png|webp)[^"]*)"/i)
  if (jsonLdMatch?.[1] && isValidImageUrl(jsonLdMatch[1])) return jsonLdMatch[1]

  // 4. Amazon-specific: main product image (landingImage or imgTagWrapperId)
  if (url?.includes('amazon')) {
    const amzMatch = html.match(/id=["']landingImage["'][^>]*src=["']([^"']+)["']/i)
      || html.match(/id=["']imgBlkFront["'][^>]*src=["']([^"']+)["']/i)
      || html.match(/"hiRes"\s*:\s*"(https?:\/\/[^"]+)"/i)
      || html.match(/"large"\s*:\s*"(https?:\/\/[^"]+)"/i)
    if (amzMatch?.[1] && isValidImageUrl(amzMatch[1])) return amzMatch[1]
  }

  // 5. Best Buy specific
  if (url?.includes('bestbuy')) {
    const bbMatch = html.match(/class=["'][^"']*productImage[^"']*["'][^>]*src=["']([^"']+)["']/i)
      || html.match(/multimedia\.bbycastatic\.ca\/[^"'\s]+/i)
    if (bbMatch?.[0] && isValidImageUrl(bbMatch[0])) return bbMatch[0].startsWith('http') ? bbMatch[0] : 'https:' + bbMatch[0]
    if (bbMatch?.[1] && isValidImageUrl(bbMatch[1])) return bbMatch[1]
  }

  // 6. Walmart specific
  if (url?.includes('walmart')) {
    const wmMatch = html.match(/src=["'](https?:\/\/i5\.walmartimages[^"']+)["']/i)
    if (wmMatch?.[1] && isValidImageUrl(wmMatch[1])) return wmMatch[1]
  }

  // 7. Microsoft Store specific
  if (url?.includes('microsoft.com')) {
    const msMatch = html.match(/src=["'](https?:\/\/img-prod-cms-rt-microsoft-com[^"']+)["']/i)
      || html.match(/src=["'](https?:\/\/store-images\.s-microsoft\.com[^"']+)["']/i)
    if (msMatch?.[1] && isValidImageUrl(msMatch[1])) return msMatch[1]
  }

  // 8. Generic fallback: first large product image (src with dimensions > 200)
  const genericImgs = html.matchAll(/<img[^>]+src=["'](https?:\/\/[^"']+\.(jpg|jpeg|png|webp)[^"']*)["'][^>]*>/gi)
  for (const m of genericImgs) {
    const imgUrl = m[1]
    if (isValidImageUrl(imgUrl) && imgUrl.length > 30) {
      // Skip tiny images (check for dimension hints in URL)
      if (/\b(50x50|100x100|32x32|16x16|favicon|thumb_small)\b/i.test(imgUrl)) continue
      return imgUrl
    }
  }

  return ''
}

function isValidImageUrl(url) {
  if (!url || url.length < 10) return false
  // Reject tracking pixels, spacers, icons
  if (/1x1|spacer|pixel|blank|icon|logo|sprite|badge|\.svg/i.test(url)) return false
  // Must look like an image URL or come from a known CDN
  return /\.(jpg|jpeg|png|webp|avif)/i.test(url) ||
    /images-amazon|media\.bestbuy|multimedia\.bbycastatic|i\.dell|p\.globalsources|walmartimages|img-prod-cms-rt-microsoft|store-images\.s-microsoft|pisces\.bbystatic/i.test(url)
}

/**
 * Check if a product is available for purchase.
 * Returns false if the page contains explicit unavailability markers.
 * Only checks prominent/structural elements to avoid false positives on listing pages.
 */
function checkAvailability(html) {
  // Extract only the "main content" area — skip nav, footer, sidebar
  // Look for unavailability in prominent page elements (titles, alerts, buttons, main content)
  const unavailablePatterns = [
    // Amazon-specific
    /id=["']availability["'][^>]*>[\s\S]{0,200}(actuellement\s+indisponible|currently\s+unavailable)/i,
    /we\s+don['']t\s+know\s+when\s+or\s+if\s+this\s+item\s+will\s+be\s+back/i,
    // Generic product page markers (in prominent elements)
    /<(h[1-3]|div\s+class[^>]*(?:alert|notice|status|availability)[^>]*|span\s+class[^>]*(?:alert|notice|status|availability))[^>]*>[\s\S]{0,100}(out\s+of\s+stock|rupture\s+de\s+stock|actuellement\s+indisponible|currently\s+unavailable|produit\s+discontinu[ée])/i,
    // Primary product status classes (not variant tooltips like Amazon's twister)
    /class=["'](?:product-)?(?:sold-?out|out-of-stock)["']/i,
    // Structured data marking as out of stock
    /"availability"\s*:\s*"(?:https?:\/\/schema\.org\/)?(?:OutOfStock|Discontinued|SoldOut)"/i,
  ]
  return !unavailablePatterns.some(pattern => pattern.test(html))
}

/**
 * Extract price from raw HTML using common retailer patterns.
 * Returns a number or null.
 * Strategy: extract ALL candidate prices, then pick the most likely product price.
 */
export function extractPrice(html, source) {
  if (!html) return null

  const candidates = []

  // ── 1. JSON-LD structured data (most reliable) ────────────
  // Find Product schema specifically (not random "price" fields)
  const jsonLdBlocks = html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
  for (const block of jsonLdBlocks) {
    try {
      const data = JSON.parse(block[1])
      const items = Array.isArray(data) ? data : [data]
      for (const item of items) {
        // Direct Product schema
        if (item['@type'] === 'Product' && item.offers) {
          const offers = Array.isArray(item.offers) ? item.offers : [item.offers]
          for (const offer of offers) {
            const p = parseFloat(String(offer.price || offer.lowPrice || '').replace(/,/g, ''))
            if (p > 50 && p < 10000) candidates.push({ price: p, confidence: 10, source: 'jsonld-product' })
          }
        }
        // Nested @graph
        if (item['@graph']) {
          for (const node of item['@graph']) {
            if (node['@type'] === 'Product' && node.offers) {
              const offers = Array.isArray(node.offers) ? node.offers : [node.offers]
              for (const offer of offers) {
                const p = parseFloat(String(offer.price || offer.lowPrice || '').replace(/,/g, ''))
                if (p > 50 && p < 10000) candidates.push({ price: p, confidence: 10, source: 'jsonld-graph' })
              }
            }
          }
        }
      }
    } catch { /* invalid JSON-LD, skip */ }
  }

  // ── 2. Source-specific patterns ────────────────────────────
  if (source === 'amazon') {
    const m = html.match(/class="a-price-whole">(\d[\d,]*)<.*?a-price-fraction">(\d{2})/is)
    if (m) {
      const p = parseFloat(m[1].replace(/,/g, '') + '.' + m[2])
      if (p > 50 && p < 10000) candidates.push({ price: p, confidence: 9, source: 'amazon-dom' })
    }
  }

  if (source === 'bestbuy') {
    // Best Buy Canada: look for the sale or regular price
    const bbSale = html.match(/class="[^"]*price_FHDu[^"]*"[^>]*>\$?([\d,]+\.\d{2})/is)
    if (bbSale) {
      const p = parseFloat(bbSale[1].replace(/,/g, ''))
      if (p > 50 && p < 10000) candidates.push({ price: p, confidence: 9, source: 'bestbuy-class' })
    }
    const bbMeta = html.match(/data-automation="price"[^>]*>.*?\$?\s*(\d[\d,]*\.\d{2})/is)
    if (bbMeta) {
      const p = parseFloat(bbMeta[1].replace(/,/g, ''))
      if (p > 50 && p < 10000) candidates.push({ price: p, confidence: 8, source: 'bestbuy-auto' })
    }
  }

  if (source === 'costco') {
    // Costco: your price in JS data
    const costcoPrice = html.match(/"yourPrice"\s*:\s*"?(\d[\d,]*\.?\d*)"?/i)
    if (costcoPrice) {
      const p = parseFloat(costcoPrice[1].replace(/,/g, ''))
      if (p > 50 && p < 10000) candidates.push({ price: p, confidence: 9, source: 'costco-yourPrice' })
    }
  }

  if (source === 'walmart') {
    const wmPrice = html.match(/"currentPrice"\s*:\s*(\d[\d,]*\.?\d*)/i)
    if (wmPrice) {
      const p = parseFloat(wmPrice[1].replace(/,/g, ''))
      if (p > 50 && p < 10000) candidates.push({ price: p, confidence: 9, source: 'walmart-current' })
    }
  }

  if (source === 'staples') {
    // Bureau en Gros / Staples Canada
    const stPrice = html.match(/"price"\s*:\s*"?(\d[\d,]*\.\d{2})"?\s*,\s*"priceCurrency"/i)
    if (stPrice) {
      const p = parseFloat(stPrice[1].replace(/,/g, ''))
      if (p > 50 && p < 10000) candidates.push({ price: p, confidence: 9, source: 'staples-schema' })
    }
  }

  if (source === 'dell') {
    const dellPrice = html.match(/"dell_sale_price"\s*:\s*"?(\d[\d,]*\.?\d*)"?/i)
      || html.match(/"price"\s*:\s*"?(\d[\d,]*\.?\d*)"?\s*,\s*"priceCurrency"\s*:\s*"CAD"/i)
    if (dellPrice) {
      const p = parseFloat(dellPrice[1].replace(/,/g, ''))
      if (p > 50 && p < 10000) candidates.push({ price: p, confidence: 9, source: 'dell-specific' })
    }
  }

  if (source === 'lenovo') {
    const lenPrice = html.match(/"finalPrice"\s*:\s*"?(\d[\d,]*\.?\d*)"?/i)
      || html.match(/"price"\s*:\s*"?(\d[\d,]*\.?\d*)"?\s*,\s*"priceCurrency"/i)
    if (lenPrice) {
      const p = parseFloat(lenPrice[1].replace(/,/g, ''))
      if (p > 50 && p < 10000) candidates.push({ price: p, confidence: 9, source: 'lenovo-specific' })
    }
  }

  if (source === 'hp') {
    const hpPrice = html.match(/"price"\s*:\s*"?(\d[\d,]*\.?\d*)"?\s*,\s*"priceCurrency"/i)
    if (hpPrice) {
      const p = parseFloat(hpPrice[1].replace(/,/g, ''))
      if (p > 50 && p < 10000) candidates.push({ price: p, confidence: 9, source: 'hp-schema' })
    }
  }

  if (source === 'microsoft') {
    const msPrice = html.match(/"price"\s*:\s*"?(\d[\d,]*\.?\d*)"?\s*,\s*"priceCurrency"\s*:\s*"CAD"/i)
    if (msPrice) {
      const p = parseFloat(msPrice[1].replace(/,/g, ''))
      if (p > 50 && p < 10000) candidates.push({ price: p, confidence: 9, source: 'ms-schema' })
    }
  }

  if (source === 'apple') {
    // Apple Store Canada uses structured data and "À partir de X $" / "Starting at $X" patterns
    const appleFrom = html.match(/(?:À partir de|Starting at|From)\s*\$?\s*(\d[\d\s,]*\.?\d*)\s*\$?/i)
    if (appleFrom) {
      const p = parseFloat(appleFrom[1].replace(/[\s,]/g, ''))
      if (p > 500 && p < 10000) candidates.push({ price: p, confidence: 8, source: 'apple-from' })
    }
    // Also check schema.org price
    const appleSchema = html.match(/"price"\s*:\s*"?(\d[\d,]*\.?\d*)"?\s*,\s*"priceCurrency"\s*:\s*"CAD"/i)
    if (appleSchema) {
      const p = parseFloat(appleSchema[1].replace(/,/g, ''))
      if (p > 500 && p < 10000) candidates.push({ price: p, confidence: 9, source: 'apple-schema' })
    }
  }

  // ── 3. Generic HTML patterns (lower confidence) ───────────
  const dataPrice = html.match(/data-price="(\d[\d,]*\.?\d*)"/i)
  if (dataPrice) {
    const p = parseFloat(dataPrice[1].replace(/,/g, ''))
    if (p > 50 && p < 10000) candidates.push({ price: p, confidence: 5, source: 'data-attr' })
  }

  // Match $X,XXX.XX patterns in visible text (not inside script/style tags)
  const visibleHtml = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
  const dollarPrices = [...visibleHtml.matchAll(/\$\s*(\d[\d,]*\.\d{2})/g)]
  for (const m of dollarPrices) {
    const p = parseFloat(m[1].replace(/,/g, ''))
    if (p > 50 && p < 10000) candidates.push({ price: p, confidence: 3, source: 'dollar-text' })
  }

  // ── Pick best candidate ───────────────────────────────────
  if (candidates.length === 0) return null

  // Sort by confidence (highest first), then by price (lowest first for same confidence)
  candidates.sort((a, b) => b.confidence - a.confidence || a.price - b.price)
  return candidates[0].price
}

/**
 * HEAD request — returns true if URL responds 200-399.
 */
export async function checkUrl(url, timeout = 8000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: { 'User-Agent': UA },
      redirect: 'follow',
    })
    clearTimeout(timer)
    return res.status >= 200 && res.status < 400
  } catch {
    clearTimeout(timer)
    return false
  }
}

// ── CPU whitelist ───────────────────────────────────────────────

export function matchesCpuWhitelist(cpuString) {
  if (!cpuString) return false
  return CPU_WHITELIST.some(rx => rx.test(cpuString))
}

// ── Affiliate links ─────────────────────────────────────────────

export function injectAffiliateTag(url, source) {
  const tag = AFFILIATE_TAGS[source]
  if (!tag || !url || !tag.value) return url
  try {
    const u = new URL(url)
    u.searchParams.set(tag.param, tag.value)
    return u.toString()
  } catch {
    return url
  }
}

// ── Discord alert ───────────────────────────────────────────────

export async function discordAlert(message) {
  const webhookUrl = getDiscordWebhookUrl()
  if (!webhookUrl) {
    log('⚠ Discord webhook not configured — alert not sent')
    return
  }
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: `🤖 **Catalogue Agent**\n${message}` }),
    })
  } catch (err) {
    log(`✗ Discord alert failed: ${err.message}`)
  }
}

// ── Concurrency helper ──────────────────────────────────────────

export async function mapWithConcurrency(items, fn, limit = 3) {
  const results = []
  let idx = 0

  async function worker() {
    while (idx < items.length) {
      const i = idx++
      results[i] = await fn(items[i], i)
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()))
  return results
}

// ── Retry wrapper ───────────────────────────────────────────────

export async function withRetry(fn, label = 'operation') {
  let lastErr
  for (let i = 0; i <= MAX_RETRIES; i++) {
    try {
      return await fn()
    } catch (err) {
      lastErr = err
      if (i < MAX_RETRIES) {
        log(`  ⚠ ${label} tentative ${i + 1} échouée: ${err.message}. Retry...`)
        await sleep(RETRY_DELAY_MS)
      }
    }
  }
  throw lastErr
}

// ── Product URL filter ──────────────────────────────────────────

/**
 * Centralized filter to reject obvious non-product URLs.
 * Used as an additional layer alongside each source's specific isProductUrl().
 */
export function isCleanProductUrl(url) {
  if (!url) return false
  const rejectPatterns = [
    /\/collection\//i, /\/category\//i, /\/search\?/i, /\/browse\//i,
    /\/deals\//i, /\/sale\//i, /\/promotions\//i, /\/lp\//i,
    /\/cp\//i, /\/b\//i, /\/b\?/i,
  ]
  return !rejectPatterns.some(p => p.test(url))
}

// ── Helpers ─────────────────────────────────────────────────────

export function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60)
}

export function log(msg) {
  const ts = new Date().toISOString().slice(11, 19)
  console.log(`[${ts}] ${msg}`)
}
