// ─── Price Verifier (B2) ────────────────────────────────────────
// Post-curation step: re-fetches product pages to verify prices.
// If extracted price differs >20% from Gemini price, uses extracted price.
// Adds `priceSource` field: 'page' | 'ai' for auditability.
// Updates `lastVerified` on successful verification.
// Sends per-source report + alerts if too many unverifiable.

import { readFile, writeFile } from 'fs/promises'
import { CATALOGUE_PATH } from './config.js'
import { fetchPage, extractPrice, mapWithConcurrency, log, discordAlert } from './utils.js'

export async function runPriceVerifier() {
  const raw = await readFile(CATALOGUE_PATH, 'utf-8')
  const catalogue = JSON.parse(raw)
  const products = catalogue.products

  log(`Prix — Vérification de ${products.length} produits...`)

  let verified = 0
  let corrected = 0
  let unverifiable = 0

  // Per-source tracking
  const sourceStats = {}

  await mapWithConcurrency(products, async (product) => {
    const src = product.source || 'unknown'
    if (!sourceStats[src]) sourceStats[src] = { page: 0, ai: 0, failed: 0 }

    const page = await fetchPage(product.url)
    if (!page || !page.html) {
      product.priceSource = product.priceSource || 'ai'
      // Do NOT update lastVerified — keep old date to track staleness
      unverifiable++
      sourceStats[src].failed++
      return
    }

    const extractedPrice = extractPrice(page.html, product.source)

    if (!extractedPrice) {
      product.priceSource = product.priceSource || 'ai'
      // Do NOT update lastVerified
      unverifiable++
      sourceStats[src].failed++
      return
    }

    const diff = Math.abs(extractedPrice - product.price) / product.price

    if (diff > 0.20) {
      log(`  ⚠ Prix corrigé : ${product.name.slice(0, 45)} — ${product.price}$ → ${extractedPrice}$ (${product.source})`)
      product.price = extractedPrice
      product.priceSource = 'page'
      product.lastVerified = new Date().toISOString()
      corrected++
      sourceStats[src].page++

      // Recalculate budget tier
      if (extractedPrice < 500) product.budgetTier = 'under500'
      else if (extractedPrice < 900) product.budgetTier = '500to900'
      else if (extractedPrice < 1500) product.budgetTier = '900to1500'
      else product.budgetTier = 'over1500'
    } else {
      product.priceSource = 'page'
      product.lastVerified = new Date().toISOString()
      verified++
      sourceStats[src].page++
    }
  }, 3)

  // ── Per-source report ──────────────────────────────────────────
  log(`\nPrix — Rapport par source :`)
  const sourceLines = []
  for (const [src, s] of Object.entries(sourceStats).sort((a, b) => a[0].localeCompare(b[0]))) {
    const total = s.page + s.ai + s.failed
    const failPct = total > 0 ? ((s.failed / total) * 100).toFixed(0) : '0'
    const flag = s.failed > 0 && s.page === 0 ? ' ⚠ 100% échec' : ''
    const line = `  ${src}: ${s.page} page, ${s.failed} échecs (${failPct}%)${flag}`
    log(line)
    sourceLines.push(line)
  }

  log(`\nPrix — ${verified} confirmés, ${corrected} corrigés, ${unverifiable} non vérifiables`)

  // ── Alert if too many unverifiable ─────────────────────────────
  const unverifiablePct = products.length > 0 ? (unverifiable / products.length) * 100 : 0
  if (unverifiablePct > 30) {
    const msg = `⚠️ Price Verifier: ${unverifiable}/${products.length} produits non vérifiables (${unverifiablePct.toFixed(0)}%)\n${sourceLines.join('\n')}`
    await discordAlert(msg)
  }

  // Write updated catalogue
  await writeFile(CATALOGUE_PATH, JSON.stringify(catalogue, null, 2), 'utf-8')

  return { verified, corrected, unverifiable, sourceStats }
}
