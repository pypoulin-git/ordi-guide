// ─── Image Fetcher (B1) ─────────────────────────────────────────
// Post-curation step: fetches missing product images.
// Strategy 1: Re-fetch product page and extract og:image
// Strategy 2: Google Custom Search Images API (if configured)
// Strategy 3: Download and cache images locally in public/images/products/

import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { CATALOGUE_PATH } from './config.js'
import { fetchPage, mapWithConcurrency, log, slugify } from './utils.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PRODUCTS_IMG_DIR = resolve(__dirname, '..', 'public', 'images', 'products')
const GOOGLE_CSE_KEY = process.env.GOOGLE_API_KEY || process.env.GOOGLE_CSE_KEY || ''
const GOOGLE_CSE_CX = process.env.GOOGLE_CSE_CX || '' // Custom Search Engine ID

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

export async function runImageFetcher() {
  const raw = await readFile(CATALOGUE_PATH, 'utf-8')
  const catalogue = JSON.parse(raw)
  const products = catalogue.products

  const missing = products.filter(p => !p.imageUrl)
  log(`Images — ${missing.length}/${products.length} produits sans image`)

  if (missing.length === 0) {
    log('Images — Rien à faire')
    return { fetched: 0, failed: 0 }
  }

  // Ensure output directory exists
  if (!existsSync(PRODUCTS_IMG_DIR)) {
    await mkdir(PRODUCTS_IMG_DIR, { recursive: true })
  }

  let fetched = 0
  let failed = 0

  await mapWithConcurrency(missing, async (product) => {
    let imageUrl = null

    // Strategy 1: Re-fetch product page for og:image
    imageUrl = await extractImageFromProductPage(product.url)

    // Strategy 2: Google Custom Search Images (if API key available)
    if (!imageUrl && GOOGLE_CSE_KEY && GOOGLE_CSE_CX) {
      imageUrl = await searchGoogleImage(`${product.brand} ${product.name}`)
    }

    // Strategy 3: Fallback — search via SearXNG images
    if (!imageUrl) {
      imageUrl = await searchSearxngImage(`${product.brand} ${product.name} product photo`)
    }

    if (imageUrl) {
      // Try to download and cache locally
      const localPath = await downloadImage(imageUrl, product.id)
      product.imageUrl = localPath || imageUrl
      fetched++
      log(`  ✓ Image trouvée : ${product.name.slice(0, 40)}`)
    } else {
      failed++
    }
  }, 2) // Low concurrency to be polite

  log(`Images — ${fetched} trouvées, ${failed} toujours manquantes`)

  // Phase 2: Cache existing external images locally
  const external = products.filter(p => p.imageUrl && p.imageUrl.startsWith('http'))
  log(`Images — ${external.length} images externes à cacher localement`)

  let cached = 0
  if (external.length > 0) {
    await mapWithConcurrency(external, async (product) => {
      const localPath = await downloadImage(product.imageUrl, product.id)
      if (localPath) {
        product.imageUrl = localPath
        cached++
      }
    }, 2)
    log(`Images — ${cached} images externes cachées localement`)
  }

  await writeFile(CATALOGUE_PATH, JSON.stringify(catalogue, null, 2), 'utf-8')
  return { fetched, failed, cached }
}

// ── Strategy 1: Extract from product page ──────────────────────

async function extractImageFromProductPage(url) {
  const page = await fetchPage(url)
  if (!page?.imageUrl) return null
  // Validate it's a real product image (not a logo or spacer)
  if (page.imageUrl.length < 20) return null
  return page.imageUrl
}

// ── Strategy 2: Google Custom Search Images ────────────────────

async function searchGoogleImage(query) {
  if (!GOOGLE_CSE_KEY || !GOOGLE_CSE_CX) return null

  try {
    const params = new URLSearchParams({
      key: GOOGLE_CSE_KEY,
      cx: GOOGLE_CSE_CX,
      q: query,
      searchType: 'image',
      num: '1',
      imgSize: 'large',
      safe: 'active',
    })

    const res = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`)
    if (!res.ok) return null

    const data = await res.json()
    const firstImage = data.items?.[0]?.link
    if (firstImage && /\.(jpg|jpeg|png|webp)/i.test(firstImage)) {
      return firstImage
    }
  } catch {
    // Silently fail — fallback to other strategies
  }
  return null
}

// ── Strategy 3: SearXNG Image Search ───────────────────────────

async function searchSearxngImage(query) {
  try {
    const params = new URLSearchParams({
      q: query,
      format: 'json',
      categories: 'images',
      language: 'fr-CA',
    })

    const res = await fetch(`http://localhost:8888/search?${params}`)
    if (!res.ok) return null

    const data = await res.json()
    const results = data.results || []

    // Find the first result with a valid thumbnail/image
    for (const r of results.slice(0, 5)) {
      const img = r.img_src || r.thumbnail
      if (img && img.length > 20 && /\.(jpg|jpeg|png|webp)/i.test(img)) {
        return img
      }
    }
  } catch {
    // SearXNG might be down
  }
  return null
}

// ── Download and cache image locally ───────────────────────────

async function downloadImage(url, productId) {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 10000)

    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': UA },
      redirect: 'follow',
    })
    clearTimeout(timer)

    if (!res.ok) return null

    const contentType = res.headers.get('content-type') || ''
    if (!contentType.includes('image')) return null
    if (contentType.includes('text/html')) return null  // HTML error page, not an image

    const ext = contentType.includes('png') ? 'png'
      : contentType.includes('webp') ? 'webp'
      : 'jpg'

    const buffer = Buffer.from(await res.arrayBuffer())

    // Reject tracking pixels, logos, and oversized images
    if (buffer.length < 5000) return null  // Too small — likely icon/logo
    if (buffer.length > 2_000_000) return null  // Too large — not a product photo

    const filename = `${slugify(productId)}.${ext}`
    const filepath = resolve(PRODUCTS_IMG_DIR, filename)
    await writeFile(filepath, buffer)

    return `/images/products/${filename}`
  } catch {
    return null
  }
}
