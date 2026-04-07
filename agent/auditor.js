// ─── Phase 3 : Auditeur ─────────────────────────────────────────
// Valide le catalogue avant deploy. Si tout passe → git push.
// Si échec → restaure l'ancien catalogue, alerte Discord.

import { readFile, writeFile } from 'fs/promises'
import { execSync } from 'child_process'
import { CATALOGUE_PATH, AUDIT_RULES, CPU_WHITELIST, PRICE_SANITY_RULES, CPU_PRICE_CAPS, BLOCKED_SOURCES } from './config.js'
import { checkUrl, matchesCpuWhitelist, discordAlert, mapWithConcurrency, log } from './utils.js'

export async function runAudit() {
  log('Audit du catalogue...')

  let catalogue
  try {
    const raw = await readFile(CATALOGUE_PATH, 'utf-8')
    catalogue = JSON.parse(raw)
  } catch (err) {
    return fail([`Impossible de lire le catalogue : ${err.message}`])
  }

  const products = catalogue.products || []
  const checks = []
  const failures = []

  // ── Check 0: Retirer les sources bloquées ─────────────────────
  if (BLOCKED_SOURCES && BLOCKED_SOURCES.length > 0) {
    const blockedSet = new Set(BLOCKED_SOURCES)
    const blocked = catalogue.products.filter(p => blockedSet.has(p.source))
    if (blocked.length > 0) {
      for (const p of blocked.slice(0, 5)) {
        log(`  ✗ Source bloquée (auto-retiré): "${p.name?.slice(0, 45)}" (${p.source})`)
      }
      if (blocked.length > 5) log(`  ... et ${blocked.length - 5} autres`)
      catalogue.products = catalogue.products.filter(p => !blockedSet.has(p.source))
      log(`  → ${blocked.length} produits de sources bloquées retirés, ${catalogue.products.length} restants`)
    }
    checks.push({
      name: 'blockedSources',
      passed: true,
      details: blocked.length === 0 ? 'Aucun' : `${blocked.length} retirés (${BLOCKED_SOURCES.join(', ')})`,
    })
  }

  // ── Check 1: Nombre total de produits ─────────────────────────
  if (products.length < AUDIT_RULES.minTotalProducts) {
    failures.push(`Total: ${products.length} produits (min ${AUDIT_RULES.minTotalProducts})`)
    checks.push({ name: 'total', passed: false, details: `${products.length} < ${AUDIT_RULES.minTotalProducts}` })
  } else {
    checks.push({ name: 'total', passed: true, details: `${products.length} produits` })
  }

  // ── Check 2: Distribution par catégorie ───────────────────────
  const byCat = {}
  for (const p of products) {
    byCat[p.category] = (byCat[p.category] || 0) + 1
  }
  let distOk = true
  for (const [cat, min] of Object.entries(AUDIT_RULES.minPerCategory)) {
    const count = byCat[cat] || 0
    if (count < min) {
      failures.push(`Distribution: ${cat} = ${count} (min ${min})`)
      distOk = false
    }
  }
  checks.push({
    name: 'distribution',
    passed: distOk,
    details: Object.entries(byCat).map(([k, v]) => `${k}:${v}`).join(', '),
  })

  // ── Check 3: Prix valides (auto-retire au lieu de fail) ────────
  const badPrices = products.filter(p =>
    !p.price || p.price < AUDIT_RULES.minPrice || p.price > AUDIT_RULES.maxPrice
  )
  if (badPrices.length > 0) {
    const badPriceIds = new Set(badPrices.map(p => p.id))
    for (const p of badPrices) {
      log(`  ⚠ Prix invalide (auto-retiré): "${p.name?.slice(0, 40)}" = ${p.price}$`)
    }
    catalogue.products = catalogue.products.filter(p => !badPriceIds.has(p.id))
    log(`  → ${badPrices.length} produits prix invalides retirés, ${catalogue.products.length} restants`)
  }
  checks.push({
    name: 'prices',
    passed: true, // auto-cleaned, always pass
    details: badPrices.length === 0 ? 'Tous OK' : `${badPrices.length} auto-retirés`,
  })

  // ── Check 3b: Price sanity — ALL prices, not just AI ──────────
  // Uses PRICE_SANITY_RULES from config (min/max per product type)
  const insanePrices = []
  for (const p of catalogue.products) {
    for (const rule of PRICE_SANITY_RULES) {
      if (rule.match.test(p.name) && (p.price > rule.max || p.price < rule.min)) {
        insanePrices.push(p)
        const reason = p.price > rule.max ? `>${rule.max}` : `<${rule.min}`
        log(`  ⚠ Prix suspect (auto-retiré): "${p.name?.slice(0, 45)}" = ${p.price}$ (${rule.label}: ${reason}) [source: ${p.priceSource || '?'}]`)
        break
      }
    }
  }
  if (insanePrices.length > 0) {
    const insaneIds = new Set(insanePrices.map(p => p.id))
    catalogue.products = catalogue.products.filter(p => !insaneIds.has(p.id))
    log(`  → ${insanePrices.length} prix suspects retirés, ${catalogue.products.length} restants`)
  }
  checks.push({
    name: 'priceSanity',
    passed: true,
    details: insanePrices.length === 0 ? 'Tous OK' : `${insanePrices.length} auto-retirés`,
  })

  // ── Check 3b2: CPU generation price caps — old chips ≠ premium ──
  const NON_CPU_CATS = ['monitor', 'dock']
  const cpuOverpriced = []
  if (CPU_PRICE_CAPS && CPU_PRICE_CAPS.length > 0) {
    for (const p of catalogue.products) {
      if (NON_CPU_CATS.includes(p.category)) continue
      const cpu = p.specs?.cpu || ''
      if (!cpu) continue
      for (const rule of CPU_PRICE_CAPS) {
        if (rule.match.test(cpu) && p.price > rule.max) {
          cpuOverpriced.push(p)
          log(`  ⚠ Vieux CPU surpayé (auto-retiré): "${p.name?.slice(0, 45)}" = ${p.price}$ > ${rule.max}$ (${rule.label}: ${cpu})`)
          break
        }
      }
    }
    if (cpuOverpriced.length > 0) {
      const overIds = new Set(cpuOverpriced.map(p => p.id))
      catalogue.products = catalogue.products.filter(p => !overIds.has(p.id))
      log(`  → ${cpuOverpriced.length} produits vieux CPU surpayés retirés, ${catalogue.products.length} restants`)
    }
  }
  checks.push({
    name: 'cpuPriceCaps',
    passed: true,
    details: cpuOverpriced.length === 0 ? 'Tous OK' : `${cpuOverpriced.length} auto-retirés`,
  })

  // ── Check 3c: Staleness — retirer les produits trop vieux ─────
  const now = Date.now()
  const staleDaysPage = AUDIT_RULES.staleDaysPage || 14
  const staleDaysAi = AUDIT_RULES.staleDaysAi || 7
  const staleProducts = []
  for (const p of catalogue.products) {
    if (!p.lastVerified) continue
    const age = (now - new Date(p.lastVerified).getTime()) / (1000 * 60 * 60 * 24)
    const maxDays = p.priceSource === 'ai' ? staleDaysAi : staleDaysPage
    if (age > maxDays) {
      staleProducts.push(p)
      log(`  ⚠ Produit périmé (auto-retiré): "${p.name?.slice(0, 45)}" — ${Math.round(age)}j (max ${maxDays}j, source: ${p.priceSource || '?'})`)
    }
  }
  if (staleProducts.length > 0) {
    const staleIds = new Set(staleProducts.map(p => p.id))
    catalogue.products = catalogue.products.filter(p => !staleIds.has(p.id))
    log(`  → ${staleProducts.length} produits périmés retirés, ${catalogue.products.length} restants`)
  }
  checks.push({
    name: 'staleness',
    passed: true, // auto-cleaned
    details: staleProducts.length === 0 ? 'Tous frais' : `${staleProducts.length} auto-retirés`,
  })

  // ── Check 3d: % de prix AI — alerte si trop élevé ────────────
  const aiCount = catalogue.products.filter(p => p.priceSource === 'ai').length
  const aiPercent = catalogue.products.length > 0 ? (aiCount / catalogue.products.length) * 100 : 0
  const maxAiPercent = AUDIT_RULES.maxAiPricePercent || 40
  if (aiPercent > maxAiPercent) {
    log(`  ⚠ ${aiPercent.toFixed(0)}% de prix AI (seuil: ${maxAiPercent}%) — alerte envoyée`)
    await discordAlert(`⚠️ Qualité prix: ${aiPercent.toFixed(0)}% des produits ont un prix AI non vérifié (${aiCount}/${catalogue.products.length}). Seuil: ${maxAiPercent}%.`)
  }
  checks.push({
    name: 'aiPriceRatio',
    passed: aiPercent <= maxAiPercent,
    details: `${aiCount}/${catalogue.products.length} AI (${aiPercent.toFixed(0)}%)`,
  })

  // ── Check 4: CPU whitelist ────────────────────────────────────
  // CPU whitelist — only applies to computers
  const NON_CPU_CATEGORIES = ['monitor', 'dock']
  const computerProducts = catalogue.products.filter(p => !NON_CPU_CATEGORIES.includes(p.category))
  const badCpus = computerProducts.filter(p => !matchesCpuWhitelist(p.specs?.cpu || ''))
  if (badCpus.length > computerProducts.length * 0.2) {
    failures.push(`CPU: ${badCpus.length}/${computerProducts.length} hors whitelist (>20%)`)
  }
  checks.push({
    name: 'cpu',
    passed: badCpus.length <= computerProducts.length * 0.2,
    details: `${computerProducts.length - badCpus.length}/${computerProducts.length} OK (ordinateurs seulement)`,
  })

  // ── Check 5: RAM et stockage minimums ─────────────────────────
  // Auto-remove products with bad/missing specs instead of failing the whole audit
  const badSpecs = computerProducts.filter(p => {
    const ram = parseGB(p.specs?.ram || '')
    const storage = parseGB(p.specs?.storage || '')
    return ram < AUDIT_RULES.minRamGB || storage < AUDIT_RULES.minStorageGB
  })
  if (badSpecs.length > 0) {
    for (const p of badSpecs.slice(0, 5)) {
      log(`  ⚠ Specs insuffisantes (auto-retiré): "${p.name?.slice(0, 40)}" RAM=${p.specs?.ram} Storage=${p.specs?.storage}`)
    }
    // Remove bad products from catalogue instead of failing
    const badIds = new Set(badSpecs.map(p => p.id))
    catalogue.products = catalogue.products.filter(p => !badIds.has(p.id))
    log(`  → ${badSpecs.length} produits retirés, ${catalogue.products.length} restants`)
  }
  checks.push({
    name: 'specs',
    passed: true, // auto-cleaned, always pass
    details: badSpecs.length === 0 ? 'Tous OK' : `${badSpecs.length} auto-retirés`,
  })

  // ── Check 6: Doublons (exact + near-match, auto-remove) ───────
  const nameMap = new Map()
  const dupeIds = new Set()
  for (const p of catalogue.products) {
    // Exact match key
    const key = p.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    if (nameMap.has(key)) {
      dupeIds.add(p.id)
      log(`  ⚠ Doublon exact (auto-retiré): "${p.name?.slice(0, 50)}"`)
    }
    nameMap.set(key, true)
    // Near-match: same brand + first 30 chars of name
    const nearKey = (p.brand || '').toLowerCase() + '-' + p.name.slice(0, 30).toLowerCase().replace(/[^a-z0-9]/g, '')
    if (nameMap.has('near:' + nearKey) && !dupeIds.has(p.id)) {
      dupeIds.add(p.id)
      log(`  ⚠ Doublon proche (auto-retiré): "${p.name?.slice(0, 50)}"`)
    }
    if (!nameMap.has('near:' + nearKey)) nameMap.set('near:' + nearKey, true)
  }
  if (dupeIds.size > 0) {
    catalogue.products = catalogue.products.filter(p => !dupeIds.has(p.id))
    log(`  → ${dupeIds.size} doublons retirés, ${catalogue.products.length} restants`)
  }
  checks.push({
    name: 'duplicates',
    passed: true, // auto-cleaned
    details: dupeIds.size === 0 ? 'Aucun doublon' : `${dupeIds.size} auto-retirés`,
  })

  // ── Check 7: URLs (échantillon — vérifier 10 URLs max) ───────
  const urlSample = catalogue.products.slice(0, Math.min(10, catalogue.products.length))
  let deadCount = 0
  await mapWithConcurrency(urlSample, async (p) => {
    const alive = await checkUrl(p.url)
    if (!alive) {
      deadCount++
      log(`  ✗ URL morte: ${p.url?.slice(0, 60)}`)
    }
  }, 5)

  const deadPercent = (deadCount / urlSample.length) * 100
  if (deadPercent > AUDIT_RULES.maxDeadUrlPercent) {
    failures.push(`URLs: ${deadCount}/${urlSample.length} mortes (${deadPercent.toFixed(0)}% > ${AUDIT_RULES.maxDeadUrlPercent}%)`)
  }
  checks.push({
    name: 'urls',
    passed: deadPercent <= AUDIT_RULES.maxDeadUrlPercent,
    details: `${urlSample.length - deadCount}/${urlSample.length} OK (échantillon)`,
  })

  // ── Résultat ──────────────────────────────────────────────────
  const passed = failures.length === 0

  log(`\nAudit ${passed ? '✅ PASSÉ' : '❌ ÉCHOUÉ'}`)
  for (const c of checks) {
    log(`  ${c.passed ? '✓' : '✗'} ${c.name}: ${c.details}`)
  }

  if (passed) {
    // Write cleaned catalogue before deploy (bad specs may have been removed)
    await writeFile(CATALOGUE_PATH, JSON.stringify(catalogue, null, 2), 'utf-8')
    await deployToVercel(catalogue.products.length)
  } else {
    await rollback(failures)
  }

  return { passed, checks, failures }
}

// ── Deploy ──────────────────────────────────────────────────────

async function deployToVercel(productCount) {
  const gitDir = CATALOGUE_PATH.replace(/[\\/]data[\\/]catalogue\.json$/, '')
  try {
    execSync('git add data/catalogue.json data/scan-results.json', { cwd: gitDir, stdio: 'pipe' })

    const diff = execSync('git diff --cached --stat', { cwd: gitDir, encoding: 'utf-8' })
    if (!diff.trim()) {
      log('Aucun changement dans le catalogue, pas de push')
      return
    }

    execSync(
      `git commit -m "chore(catalogue): MAJ auto — ${productCount} produits, audit OK"`,
      { cwd: gitDir, stdio: 'pipe' }
    )
    execSync('git push origin main', { cwd: gitDir, stdio: 'pipe', timeout: 30000 })
    log('✅ Git push réussi → Vercel auto-deploy')
    await discordAlert(`✅ Catalogue mis à jour : ${productCount} produits. Audit OK. Deploy en cours.`)
  } catch (err) {
    log(`✗ Git push échoué: ${err.message}`)
    await discordAlert(`⚠️ Catalogue audit OK mais deploy échoué : ${err.message.slice(0, 200)}`)
  }
}

// ── Rollback ────────────────────────────────────────────────────

async function rollback(failures) {
  const gitDir = CATALOGUE_PATH.replace(/[\\/]data[\\/]catalogue\.json$/, '')
  try {
    execSync('git checkout -- data/catalogue.json', { cwd: gitDir, stdio: 'pipe' })
    log('Ancien catalogue restauré via git checkout')
  } catch {
    log('⚠ Impossible de restaurer le catalogue via git')
  }

  const msg = `❌ Audit catalogue ÉCHOUÉ — ancien catalogue conservé.\n${failures.map(f => `• ${f}`).join('\n')}`
  log(msg)
  await discordAlert(msg)
}

// ── Helpers ─────────────────────────────────────────────────────

function parseGB(str) {
  if (!str) return 0
  const s = str.toLowerCase()
  const tb = s.match(/(\d+(?:\.\d+)?)\s*t[bo]/i)
  if (tb) return parseFloat(tb[1]) * 1000
  const gb = s.match(/(\d+(?:\.\d+)?)\s*g[bo]/i)
  if (gb) return parseFloat(gb[1])
  return 0
}

function fail(failures) {
  return { passed: false, checks: [], failures }
}
