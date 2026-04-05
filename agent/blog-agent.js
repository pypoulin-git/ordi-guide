#!/usr/bin/env node
// ─── Blog Agent — Orchestrateur ──────────────────────────────────
// Pipeline 3 phases : recherche (NOVA) → rédaction → publication
// Cron : 1 fois par semaine (lundi 9h00 ET / 13h00 UTC)
//
// Usage :  node blog-agent.js
// Env :    GEMINI_API_KEY, DISCORD_BLOG_WEBHOOK (optionnel)

import { execSync } from 'node:child_process'
import { research } from './blog-researcher.js'
import { writeArticle } from './blog-writer.js'
import { publish } from './blog-publisher.js'
import { log } from './utils.js'
import { DISCORD_WEBHOOK_URL } from './blog-config.js'

function countWords(article) {
  let text = ''
  for (const section of article.sections || []) {
    text += section.title + ' '
    for (const p of section.paragraphs || []) {
      text += p + ' '
    }
  }
  text += (article.tldr || '') + ' ' + (article.description || '') + ' ' + (article.ctaText || '')
  return text.trim().split(/\s+/).filter(Boolean).length
}

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
      // ── Phase 4: Quality Gate + Build + Deploy ──────────────────
      const wordsFr = countWords(articles.fr)
      const wordsEn = countWords(articles.en)
      log(`Phase 4: Quality Gate — FR: ${wordsFr} mots, EN: ${wordsEn} words`)

      let deployed = false

      if (wordsFr < 400 || wordsEn < 400) {
        log(`⚠️ Article trop court (min 400 mots). FR=${wordsFr}, EN=${wordsEn}. Deploy annulé.`)
      } else {
        // Build via Windows PowerShell (critical — WSL build fails due to native modules)
        try {
          log('Build Next.js via PowerShell...')
          const buildResult = execSync(
            'powershell.exe -Command "cd \'C:\\Users\\pypou\\OneDrive\\Bureau\\NemoClaw\\ordi-guide\' ; node_modules\\.bin\\next build 2>&1 | Select-Object -Last 5"',
            { timeout: 120000, encoding: 'utf8' }
          )
          log('Build: ' + buildResult.trim())
          if (buildResult.includes('Error') || buildResult.includes('error')) {
            throw new Error('Build failed: ' + buildResult.slice(0, 200))
          }

          // Git commit + push → Vercel auto-deploy
          try {
            execSync('git -C "/mnt/c/Users/pypou/OneDrive/Bureau/NemoClaw/ordi-guide" add -A', { encoding: 'utf8' })
            execSync('git -C "/mnt/c/Users/pypou/OneDrive/Bureau/NemoClaw/ordi-guide" commit -m "blog: auto-publish weekly article"', { encoding: 'utf8' })
            execSync('git -C "/mnt/c/Users/pypou/OneDrive/Bureau/NemoClaw/ordi-guide" push origin main', { encoding: 'utf8', timeout: 30000 })
            log('Deploy: git push -> Vercel auto-deploy')
            deployed = true
          } catch (e) {
            log('Git push failed: ' + e.message)
          }
        } catch (e) {
          log('Build failed -- articles written but NOT deployed: ' + e.message)
        }
      }

      const msg = `${deployed ? '🚀' : '✅'} **Blog Agent** — Nouvel article publié en ${elapsed}s\n` +
        `**FR:** ${result.titleFr} (${wordsFr} mots)\n` +
        `**EN:** ${result.titleEn} (${wordsEn} words)\n` +
        `**Catégorie:** ${result.category}\n` +
        `**Tags:** ${result.tags.join(', ')}\n` +
        `**Slug:** \`${result.slug}\`\n` +
        (deployed ? '🚀 Auto-deployed via Vercel.' : '⚠️ Non déployé — vérifier les logs.')
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
