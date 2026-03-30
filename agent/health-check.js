#!/usr/bin/env node
// ─── Health Check (C2) ─────────────────────────────────────────
// Weekly verification cron: checks all URLs, validates prices,
// removes dead products, sends Discord report.
//
// Cron: hebdomadaire, lundi 8h AM ET (12h UTC)
// Usage: node agent/health-check.js

// Load .env.local
import { readFileSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
try {
  const envPath = resolve(__dirname, '..', '.env.local')
  const envContent = readFileSync(envPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx < 0) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const value = trimmed.slice(eqIdx + 1).trim()
    if (!process.env[key]) process.env[key] = value
  }
} catch { /* .env.local not found */ }

import { CATALOGUE_PATH } from './config.js'
import { checkUrl, fetchPage, extractPrice, mapWithConcurrency, discordAlert, log } from './utils.js'

async function main() {
  log('═══ Health Check — Début ═══')

  const raw = await readFile(CATALOGUE_PATH, 'utf-8')
  const catalogue = JSON.parse(raw)
  const products = catalogue.products
  const originalCount = products.length

  log(`Catalogue : ${originalCount} produits`)

  // ── 1. Check ALL URLs ──────────────────────────────────────
  log('\n1. Vérification URLs...')
  const deadProducts = []
  const aliveProducts = []

  await mapWithConcurrency(products, async (product) => {
    const alive = await checkUrl(product.url)
    if (alive) {
      aliveProducts.push(product)
    } else {
      deadProducts.push(product)
      log(`  ✗ Lien mort : ${product.name.slice(0, 45)} [${product.source}]`)
    }
  }, 5)

  log(`URLs : ${aliveProducts.length} vivantes, ${deadProducts.length} mortes`)

  // ── 2. Spot-check prices (sample 20 products) ─────────────
  log('\n2. Vérification prix (échantillon)...')
  const priceSample = aliveProducts
    .sort(() => Math.random() - 0.5)
    .slice(0, 20)

  let priceOk = 0
  let priceWrong = 0
  const priceIssues = []

  await mapWithConcurrency(priceSample, async (product) => {
    const page = await fetchPage(product.url)
    if (!page?.html) return

    const extractedPrice = extractPrice(page.html, product.source)
    if (!extractedPrice) return

    const diff = Math.abs(extractedPrice - product.price) / product.price
    if (diff > 0.25) {
      priceWrong++
      priceIssues.push({
        name: product.name.slice(0, 40),
        cataloguePrice: product.price,
        realPrice: extractedPrice,
        source: product.source,
      })
      // Auto-correct
      product.price = extractedPrice
      if (extractedPrice < 500) product.budgetTier = 'under500'
      else if (extractedPrice < 900) product.budgetTier = '500to900'
      else if (extractedPrice < 1500) product.budgetTier = '900to1500'
      else product.budgetTier = 'over1500'
      log(`  ⚠ Prix corrigé : ${product.name.slice(0, 40)} — ${product.price}$ → ${extractedPrice}$`)
    } else {
      priceOk++
    }
  }, 3)

  log(`Prix : ${priceOk} OK, ${priceWrong} corrigés`)

  // ── 3. Check image URLs ────────────────────────────────────
  log('\n3. Vérification images...')
  const withImages = aliveProducts.filter(p => p.imageUrl)
  const noImages = aliveProducts.filter(p => !p.imageUrl)
  let brokenImages = 0

  await mapWithConcurrency(withImages, async (product) => {
    const alive = await checkUrl(product.imageUrl)
    if (!alive) {
      product.imageUrl = ''
      brokenImages++
      log(`  ✗ Image cassée : ${product.name.slice(0, 45)}`)
    }
  }, 5)

  log(`Images : ${withImages.length - brokenImages} OK, ${brokenImages} cassées, ${noImages.length} manquantes`)

  // ── 4. Distribution check ──────────────────────────────────
  log('\n4. Distribution...')
  const byCat = {}
  for (const p of aliveProducts) {
    if (!byCat[p.category]) byCat[p.category] = 0
    byCat[p.category]++
  }
  const catReport = Object.entries(byCat)
    .map(([k, v]) => `${k}:${v}`)
    .join(', ')
  log(`  ${catReport}`)

  // ── 5. Save cleaned catalogue ──────────────────────────────
  catalogue.products = aliveProducts
  catalogue.lastHealthCheck = new Date().toISOString()
  await writeFile(CATALOGUE_PATH, JSON.stringify(catalogue, null, 2), 'utf-8')

  // ── 6. Report ──────────────────────────────────────────────
  const report = [
    `📋 **Health Check — ${new Date().toISOString().slice(0, 10)}**`,
    ``,
    `Produits : ${aliveProducts.length}/${originalCount} (${deadProducts.length} liens morts retirés)`,
    `Prix : ${priceOk} OK, ${priceWrong} corrigés`,
    `Images : ${withImages.length - brokenImages} OK, ${brokenImages} cassées, ${noImages.length} manquantes`,
    `Distribution : ${catReport}`,
  ]

  if (priceIssues.length > 0) {
    report.push(``, `**Prix corrigés :**`)
    for (const p of priceIssues) {
      report.push(`• ${p.name} — ${p.cataloguePrice}$ → ${p.realPrice}$ [${p.source}]`)
    }
  }

  if (deadProducts.length > 0) {
    report.push(``, `**Liens morts retirés :**`)
    for (const p of deadProducts.slice(0, 10)) {
      report.push(`• ${p.name.slice(0, 40)} [${p.source}]`)
    }
    if (deadProducts.length > 10) report.push(`• ...et ${deadProducts.length - 10} autres`)
  }

  const reportText = report.join('\n')
  log('\n' + reportText)
  await discordAlert(reportText)

  // Git push if changes were made
  if (deadProducts.length > 0 || priceWrong > 0 || brokenImages > 0) {
    try {
      const { execSync } = await import('child_process')
      const cwd = resolve(__dirname, '..')
      execSync('git add data/catalogue.json', { cwd })
      execSync(`git commit -m "health-check: ${deadProducts.length} dead, ${priceWrong} price fixes, ${brokenImages} broken images"`, { cwd })
      execSync('git push', { cwd })
      log('✅ Changements poussés → Vercel auto-deploy')
    } catch (err) {
      log(`⚠ Git push failed: ${err.message}`)
    }
  }

  log('\n═══ Health Check — Terminé ═══')
}

main().catch(err => {
  console.error('FATAL:', err)
  process.exit(1)
})
