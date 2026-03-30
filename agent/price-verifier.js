// ─── Price Verifier (B2) ────────────────────────────────────────
// Post-curation step: re-fetches product pages to verify prices.
// If extracted price differs >20% from Gemini price, uses extracted price.
// Adds `priceSource` field: 'page' | 'ai' for auditability.

import { readFile, writeFile } from 'fs/promises'
import { CATALOGUE_PATH } from './config.js'
import { fetchPage, extractPrice, mapWithConcurrency, log } from './utils.js'

export async function runPriceVerifier() {
  const raw = await readFile(CATALOGUE_PATH, 'utf-8')
  const catalogue = JSON.parse(raw)
  const products = catalogue.products

  log(`Prix — Vérification de ${products.length} produits...`)

  let verified = 0
  let corrected = 0
  let unverifiable = 0

  await mapWithConcurrency(products, async (product) => {
    const page = await fetchPage(product.url)
    if (!page || !page.html) {
      product.priceSource = product.priceSource || 'ai'
      unverifiable++
      return
    }

    const extractedPrice = extractPrice(page.html, product.source)

    if (!extractedPrice) {
      product.priceSource = product.priceSource || 'ai'
      unverifiable++
      return
    }

    const diff = Math.abs(extractedPrice - product.price) / product.price

    if (diff > 0.20) {
      log(`  ⚠ Prix corrigé : ${product.name.slice(0, 45)} — ${product.price}$ → ${extractedPrice}$ (${product.source})`)
      product.price = extractedPrice
      product.priceSource = 'page'
      corrected++

      // Recalculate budget tier
      if (extractedPrice < 500) product.budgetTier = 'under500'
      else if (extractedPrice < 900) product.budgetTier = '500to900'
      else if (extractedPrice < 1500) product.budgetTier = '900to1500'
      else product.budgetTier = 'over1500'
    } else {
      product.priceSource = 'page'
      verified++
    }
  }, 3)

  log(`Prix — ${verified} confirmés, ${corrected} corrigés, ${unverifiable} non vérifiables`)

  // Write updated catalogue
  await writeFile(CATALOGUE_PATH, JSON.stringify(catalogue, null, 2), 'utf-8')

  return { verified, corrected, unverifiable }
}
