// ─── Catalogue Agent — Utilitaires ───────────────────────────────

import { SEARXNG_URL, GEMINI_API_URL, GEMINI_API_KEY, MAX_RETRIES, RETRY_DELAY_MS } from './config.js'

/**
 * Recherche via SearXNG local
 */
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

/**
 * Appel Gemini 2.0 Flash avec JSON structuré
 */
export async function geminiGenerate(prompt, jsonSchema = null) {
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY manquante')

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 8192,
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
    throw new Error(`Gemini ${res.status}: ${err}`)
  }

  const data = await res.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('Réponse Gemini vide')

  return jsonSchema ? JSON.parse(text) : text
}

/**
 * Retry wrapper
 */
export async function withRetry(fn, label = 'operation') {
  let lastErr
  for (let i = 0; i <= MAX_RETRIES; i++) {
    try {
      return await fn()
    } catch (err) {
      lastErr = err
      if (i < MAX_RETRIES) {
        console.warn(`  ⚠ ${label} tentative ${i + 1} échouée: ${err.message}. Retry...`)
        await sleep(RETRY_DELAY_MS)
      }
    }
  }
  throw lastErr
}

export function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

/**
 * Génère un ID slug à partir du nom du produit
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60)
}

/**
 * Log horodaté
 */
export function log(msg) {
  const ts = new Date().toISOString().slice(11, 19)
  console.log(`[${ts}] ${msg}`)
}
