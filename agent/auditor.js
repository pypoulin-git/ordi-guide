// ─── Phase 3 : Auditeur ─────────────────────────────────────────
// Valide le catalogue avant deploy. Si tout passe → git push.
// Si échec → restaure l'ancien catalogue, alerte Discord.

import { readFile } from 'fs/promises'
import { execSync } from 'child_process'
import { CATALOGUE_PATH, AUDIT_RULES, CPU_WHITELIST } from './config.js'
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

  // ── Check 3: Prix valides ─────────────────────────────────────
  const badPrices = products.filter(p =>
    !p.price || p.price < AUDIT_RULES.minPrice || p.price > AUDIT_RULES.maxPrice
  )
  if (badPrices.length > 0) {
    for (const p of badPrices) {
      failures.push(`Prix invalide: "${p.name?.slice(0, 30)}" = ${p.price}$`)
    }
  }
  checks.push({
    name: 'prices',
    passed: badPrices.length === 0,
    details: badPrices.length === 0 ? 'Tous OK' : `${badPrices.length} prix invalides`,
  })

  // ── Check 4: CPU whitelist ────────────────────────────────────
  const badCpus = products.filter(p => !matchesCpuWhitelist(p.specs?.cpu || ''))
  if (badCpus.length > products.length * 0.2) {
    // Tolérance 20% — certains produits peuvent avoir un format CPU non-standard
    failures.push(`CPU: ${badCpus.length}/${products.length} hors whitelist (>20%)`)
  }
  checks.push({
    name: 'cpu',
    passed: badCpus.length <= products.length * 0.2,
    details: `${products.length - badCpus.length}/${products.length} OK`,
  })

  // ── Check 5: RAM et stockage minimums ─────────────────────────
  const badSpecs = products.filter(p => {
    const ram = parseGB(p.specs?.ram || '')
    const storage = parseGB(p.specs?.storage || '')
    return ram < AUDIT_RULES.minRamGB || storage < AUDIT_RULES.minStorageGB
  })
  if (badSpecs.length > 0) {
    for (const p of badSpecs.slice(0, 3)) {
      failures.push(`Specs: "${p.name?.slice(0, 30)}" RAM=${p.specs?.ram} Storage=${p.specs?.storage}`)
    }
  }
  checks.push({
    name: 'specs',
    passed: badSpecs.length === 0,
    details: badSpecs.length === 0 ? 'Tous OK' : `${badSpecs.length} sous les minimums`,
  })

  // ── Check 6: Doublons ─────────────────────────────────────────
  const nameMap = new Map()
  const dupes = []
  for (const p of products) {
    const key = p.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    if (nameMap.has(key)) dupes.push(p.name)
    nameMap.set(key, true)
  }
  if (dupes.length > 0) {
    failures.push(`Doublons: ${dupes.length} (${dupes.slice(0, 2).join(', ')})`)
  }
  checks.push({
    name: 'duplicates',
    passed: dupes.length === 0,
    details: dupes.length === 0 ? 'Aucun doublon' : `${dupes.length} doublons`,
  })

  // ── Check 7: URLs (échantillon — vérifier 10 URLs max) ───────
  const urlSample = products.slice(0, Math.min(10, products.length))
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
    await deployToVercel(products.length)
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
