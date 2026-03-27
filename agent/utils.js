// ─── Catalogue Agent — Utilitaires ───────────────────────────────

import {
  SEARXNG_URL, GEMINI_API_URL, GEMINI_API_KEY,
  MAX_RETRIES, RETRY_DELAY_MS,
  CPU_WHITELIST, AFFILIATE_TAGS,
  PAGE_FETCH_TIMEOUT, DISCORD_WEBHOOK_URL,
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

  const res = await fetch(`${SEARXNG_URL}/search?${params}`)
  if (!res.ok) throw new Error(`SearXNG ${res.status}: ${res.statusText}`)
  const data = await res.json()
  return data.results || []
}

// ── Gemini ───────────────────────────────────────────────────────

export async function geminiGenerate(prompt, jsonSchema = null) {
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
 * Fetch a product page and return stripped body text (max 3000 chars).
 * Returns null on failure — does not throw.
 */
export async function fetchPage(url, timeout = PAGE_FETCH_TIMEOUT) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': UA, Accept: 'text/html' },
      redirect: 'follow',
    })
    clearTimeout(timer)
    if (!res.ok) return null
    const html = await res.text()
    // Strip scripts, styles, tags, compress whitespace
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ').replace(/&#\d+;/g, '')
      .replace(/\s{3,}/g, '\n').trim()
    return text.slice(0, 3000)
  } catch {
    clearTimeout(timer)
    return null
  }
}

/**
 * Extract price from raw HTML using common retailer patterns.
 * Returns a number or null.
 */
export function extractPrice(html, source) {
  if (!html) return null

  const patterns = [
    // JSON-LD price (most reliable)
    /"price"\s*:\s*"?(\d[\d,]*\.?\d*)"?/i,
    // Common HTML patterns
    /\$\s*(\d[\d,]*\.\d{2})/,
    /prix[^<]*?(\d[\d,]*\.\d{2})/i,
    /data-price="(\d[\d,]*\.?\d*)"/i,
  ]

  // Source-specific patterns
  if (source === 'bestbuy') {
    patterns.unshift(/data-automation="price"[^>]*>.*?\$?\s*(\d[\d,]*\.\d{2})/is)
  } else if (source === 'amazon') {
    patterns.unshift(/class="a-price-whole">(\d[\d,]*)<.*?a-price-fraction">(\d{2})/is)
  }

  for (const pat of patterns) {
    const m = html.match(pat)
    if (m) {
      // Handle amazon's split format (whole + fraction)
      if (m[2] && source === 'amazon') {
        const price = parseFloat(m[1].replace(/,/g, '') + '.' + m[2])
        if (price > 30 && price < 10000) return price
      }
      const price = parseFloat(m[1].replace(/,/g, ''))
      if (price > 30 && price < 10000) return price
    }
  }
  return null
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
  if (!tag || !url) return url
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
  if (!DISCORD_WEBHOOK_URL) {
    log('⚠ Discord webhook not configured — alert not sent')
    return
  }
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
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
