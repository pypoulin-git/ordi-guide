#!/usr/bin/env node
// ─── Price Diagnostic Tool ─────────────────────────────────────
// Standalone script to inspect catalogue price quality.
// Usage: node agent/check-prices.js
//
// Shows a table of all products with price source, age, and warnings.

import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CATALOGUE_PATH = path.join(__dirname, '..', 'data', 'catalogue.json')

async function main() {
  const raw = await readFile(CATALOGUE_PATH, 'utf-8')
  const catalogue = JSON.parse(raw)
  const products = catalogue.products || []
  const now = Date.now()

  console.log(`\n📊 Diagnostic prix — ${products.length} produits`)
  console.log(`   Dernière MAJ: ${catalogue.lastUpdated || '?'}`)
  console.log('')

  // Per-source stats
  const sourceStats = {}
  let totalAi = 0
  let totalPage = 0
  let totalStale = 0
  const warnings = []

  const rows = products.map(p => {
    const src = p.source || '?'
    if (!sourceStats[src]) sourceStats[src] = { page: 0, ai: 0, stale: 0, total: 0 }
    sourceStats[src].total++

    const isAi = p.priceSource === 'ai'
    if (isAi) { totalAi++; sourceStats[src].ai++ } else { totalPage++; sourceStats[src].page++ }

    const age = p.lastVerified
      ? Math.round((now - new Date(p.lastVerified).getTime()) / (1000 * 60 * 60 * 24))
      : '?'
    const maxAge = isAi ? 7 : 14
    const isStale = typeof age === 'number' && age > maxAge
    if (isStale) { totalStale++; sourceStats[src].stale++ }

    const flags = []
    if (isAi) flags.push('🤖 AI')
    if (isStale) flags.push(`⏰ ${age}j`)
    if (p.price < 50 || p.price > 5000) flags.push('💰 hors range')

    if (flags.length > 0) {
      warnings.push({ name: p.name.slice(0, 50), price: p.price, source: src, flags: flags.join(' ') })
    }

    return {
      source: src.padEnd(12),
      price: `${p.price}$`.padStart(10),
      priceSource: (p.priceSource || '?').padEnd(4),
      age: (typeof age === 'number' ? `${age}j` : '?').padStart(5),
      name: p.name.slice(0, 55),
      flags: flags.join(' '),
    }
  })

  // Summary
  const aiPct = products.length > 0 ? ((totalAi / products.length) * 100).toFixed(0) : 0
  console.log(`  ✅ Prix vérifiés (page): ${totalPage}`)
  console.log(`  🤖 Prix AI estimés:     ${totalAi} (${aiPct}%)`)
  console.log(`  ⏰ Produits périmés:     ${totalStale}`)
  console.log('')

  // Per-source report
  console.log('📡 Par source:')
  for (const [src, s] of Object.entries(sourceStats).sort((a, b) => b[1].total - a[1].total)) {
    const aiPct = s.total > 0 ? ((s.ai / s.total) * 100).toFixed(0) : 0
    const flag = Number(aiPct) > 50 ? ' ⚠️' : ''
    console.log(`  ${src.padEnd(16)} ${String(s.total).padStart(3)} total | ${String(s.page).padStart(2)} page | ${String(s.ai).padStart(2)} AI (${aiPct}%)${flag} | ${s.stale} stale`)
  }
  console.log('')

  // Warnings table
  if (warnings.length > 0) {
    console.log(`⚠️  ${warnings.length} produits avec problèmes:`)
    console.log('─'.repeat(100))
    for (const w of warnings) {
      console.log(`  ${w.source.padEnd(14)} ${String(w.price + '$').padStart(10)}  ${w.flags.padEnd(15)}  ${w.name}`)
    }
    console.log('')
  }

  // Full table
  console.log('📋 Catalogue complet:')
  console.log('─'.repeat(110))
  console.log(`  ${'Source'.padEnd(12)}  ${'Prix'.padStart(10)}  ${'Src'.padEnd(4)}  ${'Âge'.padStart(5)}  Produit`)
  console.log('─'.repeat(110))
  for (const r of rows) {
    console.log(`  ${r.source}  ${r.price}  ${r.priceSource}  ${r.age}  ${r.name}${r.flags ? '  ' + r.flags : ''}`)
  }
  console.log('')
}

main().catch(err => {
  console.error('Erreur:', err.message)
  process.exit(1)
})
