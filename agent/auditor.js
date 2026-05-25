// ─── Phase 3 : Auditeur ─────────────────────────────────────────
// Valide le catalogue avant deploy. Si tout passe → git push.
// Si échec → restaure l'ancien catalogue, alerte Discord.

import { readFile, writeFile } from 'fs/promises'
import { execSync } from 'child_process'
import { CATALOGUE_PATH, AUDIT_RULES, CPU_WHITELIST, PRICE_SANITY_RULES, CPU_PRICE_CAPS, BLOCKED_SOURCES, UNSCRAPABLE_SOURCES } from './config.js'
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
  const hardFailures = []
  const softFailures = []

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
  if (products.length < 15) {
    hardFailures.push(`Total: ${products.length} produits (hard min 15)`)
    checks.push({ name: 'total', passed: false, details: `${products.length} < 15 (hard fail)` })
  } else if (products.length < AUDIT_RULES.minTotalProducts) {
    softFailures.push(`Total: ${products.length} produits (min ${AUDIT_RULES.minTotalProducts})`)
    checks.push({ name: 'total', passed: false, details: `${products.length} < ${AUDIT_RULES.minTotalProducts} (soft)` })
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
      softFailures.push(`Distribution: ${cat} = ${count} (min ${min})`)
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

  // ── Check 3d: % de prix AI — exclut les sources inscrappables ──
  const unscrapableSet = new Set(UNSCRAPABLE_SOURCES || [])
  const verifiableProducts = catalogue.products.filter(p => !unscrapableSet.has(p.source))
  const aiCount = verifiableProducts.filter(p => p.priceSource === 'ai').length
  const aiPercent = verifiableProducts.length > 0 ? (aiCount / verifiableProducts.length) * 100 : 0
  const totalAiCount = catalogue.products.filter(p => p.priceSource === 'ai').length
  const maxAiPercent = AUDIT_RULES.maxAiPricePercent || 60
  if (aiPercent > maxAiPercent) {
    log(`  ⚠ ${aiPercent.toFixed(0)}% de prix AI sur sources vérifiables (seuil: ${maxAiPercent}%) — alerte envoyée`)
    await discordAlert(`⚠️ Qualité prix: ${aiPercent.toFixed(0)}% des produits vérifiables ont un prix AI (${aiCount}/${verifiableProducts.length}). Total AI: ${totalAiCount}/${catalogue.products.length}. Seuil: ${maxAiPercent}%.`)
  }
  checks.push({
    name: 'aiPriceRatio',
    passed: aiPercent <= maxAiPercent,
    details: `${aiCount}/${verifiableProducts.length} AI vérifiables (${aiPercent.toFixed(0)}%), ${totalAiCount} AI total`,
  })

  // ── Check 4: CPU whitelist ────────────────────────────────────
  // CPU whitelist — only applies to computers
  const NON_CPU_CATEGORIES = ['monitor', 'dock']
  const computerProducts = catalogue.products.filter(p => !NON_CPU_CATEGORIES.includes(p.category))
  const badCpus = computerProducts.filter(p => !matchesCpuWhitelist(p.specs?.cpu || ''))
  if (badCpus.length > computerProducts.length * 0.3) {
    hardFailures.push(`CPU: ${badCpus.length}/${computerProducts.length} hors whitelist (>30%)`)
  }
  checks.push({
    name: 'cpu',
    passed: badCpus.length <= computerProducts.length * 0.3,
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

  // ── Check 5b: Cohérence catégorie / nom — auto-recatégorise ──
  // Ex: produit nommé "OptiPlex 7010 Desktop" avec category "monitor" → desktop
  const DESKTOP_KW = /\b(optiplex|thinkcentre|beelink|minisforum|nuc|mini[- ]?pc|tower|desktop|aurora r\d+|imac|mac ?studio|mac ?mini|mac ?pro)\b/i
  const MONITOR_KW = /\b(monitor|moniteur|display|ultrasharp|ultragear|odyssey|prodisplay|pro ?display|studio ?display|ecran|écran)\b/i
  const LAPTOP_KW = /\b(laptop|notebook|portable|ordinateur portable|chromebook|macbook|thinkpad|xps|zenbook|vivobook|pavilion laptop|ideapad|yoga|legion (slim|pro|5|7)|inspiron \d+\s+(laptop|portable))\b/i
  let recategorized = 0
  for (const p of catalogue.products) {
    const name = p.name || ''
    const isDesk = DESKTOP_KW.test(name) && !MONITOR_KW.test(name)
    const isMon = MONITOR_KW.test(name) && !DESKTOP_KW.test(name) && !LAPTOP_KW.test(name)
    let newCat = null
    if (isDesk && p.category === 'monitor') newCat = 'desktop'
    else if (isDesk && p.category === 'laptop') newCat = 'desktop'
    else if (isMon && p.category !== 'monitor' && p.category !== 'dock') newCat = 'monitor'
    if (newCat && newCat !== p.category) {
      log(`  ⚠ Catégorie corrigée: "${name.slice(0, 45)}" ${p.category} → ${newCat}`)
      p.category = newCat
      recategorized++
    }
  }
  checks.push({
    name: 'categoryConsistency',
    passed: true,
    details: recategorized === 0 ? 'Toutes OK' : `${recategorized} auto-corrigées`,
  })

  // ── Check 6a: Apple URLs génériques (vue picker, pas SKU) ────
  // Reject Apple /shop/buy-mac URLs without config markers — they land
  // on a picker page with no price. Must match the logic in sources/apple.js.
  const appleGenericIds = new Set()
  const APPLE_CONFIG = /(chip|memory|storage|gpu|cpu|ultra|-max-|apple-m[1-9])/i
  for (const p of catalogue.products) {
    if (!p.url || !/apple\.com\/ca/i.test(p.url)) continue
    // Always accept /shop/product/{sku}/ and standalone displays
    if (/apple\.com\/ca\/shop\/product\/[a-z0-9]+\//i.test(p.url)) continue
    if (/apple\.com\/ca\/shop\/buy-mac\/(studio-display|pro-display-xdr)(\/|$|\?)/i.test(p.url)) continue
    // /shop/buy-mac/* without config markers = generic picker → reject
    if (/apple\.com\/ca\/shop\/buy-mac\//i.test(p.url) && !APPLE_CONFIG.test(p.url)) {
      appleGenericIds.add(p.id)
      log(`  ⚠ URL Apple générique (auto-retiré): "${p.name?.slice(0, 45)}" → ${p.url.slice(0, 80)}`)
    }
  }
  if (appleGenericIds.size > 0) {
    catalogue.products = catalogue.products.filter(p => !appleGenericIds.has(p.id))
    log(`  → ${appleGenericIds.size} URLs Apple génériques retirées, ${catalogue.products.length} restants`)
  }
  checks.push({
    name: 'appleGenericUrls',
    passed: true,
    details: appleGenericIds.size === 0 ? 'Aucune' : `${appleGenericIds.size} auto-retirées`,
  })

  // ── Check 6b: URLs dupliquées entre produits ─────────────────
  // Deux produits différents qui pointent vers la même URL = ambiguïté
  // Ex: 3 variantes MacBook Pro pointant vers la même page liste Apple
  const urlGroups = new Map()
  for (const p of catalogue.products) {
    const key = canonicalizeUrl(p.url)
    if (!key) continue
    if (!urlGroups.has(key)) urlGroups.set(key, [])
    urlGroups.get(key).push(p)
  }
  const urlDupeIds = new Set()
  for (const [key, group] of urlGroups) {
    if (group.length <= 1) continue
    // Keep the "best" product: priceSource "page" > "manual" > "ai", then highest aiScore
    const rank = (p) => {
      const srcRank = p.priceSource === 'page' ? 2 : p.priceSource === 'manual' ? 1 : 0
      return srcRank * 1000 + (p.aiScore || 0)
    }
    const sorted = [...group].sort((a, b) => rank(b) - rank(a))
    const keeper = sorted[0]
    for (const p of sorted.slice(1)) {
      urlDupeIds.add(p.id)
      log(`  ⚠ URL dupliquée (auto-retiré): "${p.name?.slice(0, 45)}" partage URL avec "${keeper.name?.slice(0, 35)}"`)
    }
  }
  if (urlDupeIds.size > 0) {
    catalogue.products = catalogue.products.filter(p => !urlDupeIds.has(p.id))
    log(`  → ${urlDupeIds.size} duplicatas URL retirés, ${catalogue.products.length} restants`)
  }
  checks.push({
    name: 'urlDuplicates',
    passed: true, // auto-cleaned
    details: urlDupeIds.size === 0 ? 'Aucune URL partagée' : `${urlDupeIds.size} auto-retirés`,
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
  if (deadPercent > 50) {
    hardFailures.push(`URLs: ${deadCount}/${urlSample.length} mortes (${deadPercent.toFixed(0)}% > 50%)`)
  } else if (deadPercent > AUDIT_RULES.maxDeadUrlPercent) {
    softFailures.push(`URLs: ${deadCount}/${urlSample.length} mortes (${deadPercent.toFixed(0)}% > ${AUDIT_RULES.maxDeadUrlPercent}%)`)
  }
  checks.push({
    name: 'urls',
    passed: deadPercent <= AUDIT_RULES.maxDeadUrlPercent,
    details: `${urlSample.length - deadCount}/${urlSample.length} OK (échantillon)`,
  })

  // ── Résultat : PASS / PARTIAL / FAIL ───────────────────────────
  const hardFail = hardFailures.length > 0
  const softFail = softFailures.length > 0
  const outcome = hardFail ? 'FAIL' : softFail ? 'PARTIAL' : 'PASS'

  log(`\nAudit ${outcome === 'PASS' ? '✅ PASSÉ' : outcome === 'PARTIAL' ? '⚠️ PARTIEL' : '❌ ÉCHOUÉ'}`)
  for (const c of checks) {
    log(`  ${c.passed ? '✓' : '✗'} ${c.name}: ${c.details}`)
  }
  if (hardFailures.length > 0) log(`  Hard failures: ${hardFailures.join('; ')}`)
  if (softFailures.length > 0) log(`  Soft failures: ${softFailures.join('; ')}`)

  if (hardFail) {
    await rollback(hardFailures)
  } else {
    // PASS or PARTIAL — deploy the catalogue
    await writeFile(CATALOGUE_PATH, JSON.stringify(catalogue, null, 2), 'utf-8')
    await deployToVercel(catalogue.products.length)
    if (softFail) {
      await discordAlert(`⚠️ Catalogue déployé avec avertissements:\n${softFailures.map(f => `• ${f}`).join('\n')}`)
    }
  }

  const failures = [...hardFailures, ...softFailures]
  return { passed: !hardFail, outcome, checks, failures }
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

function canonicalizeUrl(url) {
  if (!url || typeof url !== 'string') return null
  try {
    const u = new URL(url)
    // Strip tracking/affiliate params — only the product identity matters for dedup
    const stripParams = [
      'tag', 'ascsubtag', 'linkCode', 'linkId', 'ref', 'ref_', 'refRID',
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
      'dgc', 'cid', 'lid', 'jumpid', 'clickid', 'afid', 'aosid', 'mtid',
    ]
    for (const p of stripParams) u.searchParams.delete(p)
    // Normalize host + strip trailing slash on path
    const host = u.host.toLowerCase().replace(/^www\./, '')
    const path = u.pathname.replace(/\/+$/, '').toLowerCase()
    const qs = u.searchParams.toString()
    return `${host}${path}${qs ? '?' + qs : ''}`
  } catch {
    return url.toLowerCase().split('?')[0].replace(/\/+$/, '')
  }
}

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
