#!/usr/bin/env node
// ─── Blog Agent — Orchestrateur ──────────────────────────────────
// Pipeline 3 phases : recherche (NOVA) → rédaction → publication
// Cron : 1 fois par semaine (lundi 9h00 ET / 13h00 UTC)
//
// Usage :  node blog-agent.js
// Env :    GEMINI_API_KEY, DISCORD_BLOG_WEBHOOK (optionnel)

import { research } from './blog-researcher.js'
import { writeArticle } from './blog-writer.js'
import { publish } from './blog-publisher.js'
import { log } from './utils.js'
import { DISCORD_WEBHOOK_URL } from './blog-config.js'

async function discordAlert(message) {
  if (!DISCORD_WEBHOOK_URL) return
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message }),
    })
  } catch { /* silent */ }
}

async function main() {
  const start = Date.now()
  log('═══════════════════════════════════════════════════════')
  log(`Blog Agent — ${new Date().toLocaleString('fr-CA')}`)
  log('═══════════════════════════════════════════════════════')

  try {
    // Phase 1: Research
    const researchResult = await research()

    // Phase 2: Write article
    const articles = await writeArticle(researchResult)

    // Phase 3: Publish
    const result = await publish(articles, researchResult.backlogMatch)

    const elapsed = ((Date.now() - start) / 1000).toFixed(0)

    if (result.success) {
      const msg = `✅ **Blog Agent** — Nouvel article publié en ${elapsed}s\n` +
        `**FR:** ${result.titleFr}\n` +
        `**EN:** ${result.titleEn}\n` +
        `**Catégorie:** ${result.category}\n` +
        `**Tags:** ${result.tags.join(', ')}\n` +
        `**Slug:** \`${result.slug}\`\n` +
        `⚠️ Build + deploy requis pour mettre en ligne.`
      log(msg)
      await discordAlert(msg)
    } else {
      const msg = `❌ **Blog Agent** — Échec de publication\n` +
        `Erreurs: ${result.errors.join(', ')}`
      log(msg)
      await discordAlert(msg)
    }

  } catch (err) {
    const msg = `💥 **Blog Agent** — Erreur fatale: ${err.message}`
    log(msg)
    console.error(err)
    await discordAlert(msg)
    process.exit(1)
  }

  log(`\nTerminé en ${((Date.now() - start) / 1000).toFixed(1)}s`)
}

main()
