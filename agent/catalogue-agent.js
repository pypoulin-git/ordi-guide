#!/usr/bin/env node
// ─── Catalogue Agent — Orchestrateur 3 phases ───────────────────
//
// Cron nightly à 3h00 AM ET (7h00 UTC)
// Phase 1 : Scanner  — scrape 4 sources, enrichit pages, filtre CPU
// Phase 2 : Curateur — curation IA, merge, liens affiliés
// Phase 3 : Auditeur — valide tout, deploy ou rollback
//
// Chaque phase est indépendante : si Phase 1 échoue, on garde
// l'ancien catalogue. Si Phase 3 échoue, on rollback.

import { runScanner } from './scanner.js'
import { runCurator } from './curator.js'
import { runAudit } from './auditor.js'
import { log, discordAlert } from './utils.js'

async function main() {
  const start = Date.now()
  log('═══════════════════════════════════════════════')
  log('═══ Catalogue Agent v2 — Début du cycle ═══')
  log('═══════════════════════════════════════════════')

  // ── Phase 1 : Scanner ──────────────────────────────────────
  log('\n── Phase 1 : Scanner ──')
  let scanResults
  try {
    scanResults = await runScanner()
    log(`Scanner terminé : ${scanResults.totalAfterFilter} produits de ${scanResults.totalRaw} bruts`)
  } catch (err) {
    log(`✗ FATAL Scanner: ${err.message}`)
    await discordAlert(`❌ Catalogue Agent — Scanner ÉCHOUÉ : ${err.message.slice(0, 200)}`)
    process.exit(1)
  }

  if (scanResults.results.length === 0) {
    log('Aucun résultat du scanner. Catalogue existant conservé.')
    await discordAlert('⚠️ Catalogue Agent — 0 résultats du scanner. Ancien catalogue conservé.')
    return
  }

  // ── Phase 2 : Curateur ─────────────────────────────────────
  log('\n── Phase 2 : Curateur ──')
  let curatorStats
  try {
    curatorStats = await runCurator(scanResults)
    log(`Curateur terminé : ${curatorStats.kept} gardés, ${curatorStats.newAdded} nouveaux, ${curatorStats.replaced} remplacés, ${curatorStats.removedDead} URLs mortes retirées`)
  } catch (err) {
    log(`✗ FATAL Curateur: ${err.message}`)
    await discordAlert(`❌ Catalogue Agent — Curateur ÉCHOUÉ : ${err.message.slice(0, 200)}`)
    process.exit(1)
  }

  // ── Phase 3 : Auditeur ─────────────────────────────────────
  log('\n── Phase 3 : Auditeur ──')
  let audit
  try {
    audit = await runAudit()
  } catch (err) {
    log(`✗ FATAL Auditeur: ${err.message}`)
    await discordAlert(`❌ Catalogue Agent — Auditeur ÉCHOUÉ : ${err.message.slice(0, 200)}`)
    process.exit(1)
  }

  // ── Rapport final ──────────────────────────────────────────
  const elapsed = ((Date.now() - start) / 1000).toFixed(0)
  log(`\n═══ Cycle terminé en ${elapsed}s ═══`)
  log(`Résultat : ${audit.passed ? '✅ DÉPLOYÉ' : '❌ ROLLBACK'}`)

  if (audit.passed) {
    log(`  Produits : ${curatorStats.kept}`)
    log(`  Nouveaux : ${curatorStats.newAdded}`)
    log(`  Remplacés : ${curatorStats.replaced}`)
    log(`  URLs mortes retirées : ${curatorStats.removedDead}`)
  } else {
    log(`  Échecs audit :`)
    for (const f of audit.failures) log(`    • ${f}`)
  }
}

// Run
main().catch(async err => {
  console.error('FATAL:', err)
  try { await discordAlert(`💀 Catalogue Agent CRASH: ${err.message?.slice(0, 200)}`) } catch {}
  process.exit(1)
})
