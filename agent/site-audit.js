#!/usr/bin/env node
// ─── Site Audit Agent — Scan complet Shop Compy ──────────────────
// Vérifie : pages, API, liens, performance, SEO, contenu
// Usage :  node site-audit.js [url]
// Default: https://ordi-guide.vercel.app

const BASE = process.argv[2] || 'https://ordi-guide.vercel.app'
const DISCORD_WEBHOOK = process.env.DISCORD_CATALOGUE_WEBHOOK || process.env.DISCORD_BLOG_WEBHOOK || ''

const LOCALES = ['fr', 'en']
const PAGES = [
  '', // homepage
  '/guide',
  '/comparateur',
  '/glossaire',
  '/catalogue',
  '/blog',
  '/about',
]

// Known blog slugs to test (sample)
const BLOG_SLUGS = [
  'processeur-cerveau-moteur-ordinateur',
  'ram-memoire-vive-poumons-transmission',
  'ssd-stockage-memoire-coffre',
]

const API_ROUTES = [
  { path: '/api/search', method: 'POST', body: { query: 'laptop pour etudiant' } },
  { path: '/api/blog-ask', method: 'POST', body: { query: 'c\'est quoi un processeur', locale: 'fr' } },
]

const results = {
  timestamp: new Date().toISOString(),
  baseUrl: BASE,
  pages: [],
  api: [],
  seo: [],
  content: [],
  errors: [],
  warnings: [],
  summary: {},
}

function log(msg) {
  const ts = new Date().toLocaleTimeString('fr-CA')
  console.log(`[${ts}] ${msg}`)
}

async function checkPage(url, label) {
  const start = Date.now()
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'ShopCompy-Audit/1.0' },
      redirect: 'follow',
    })
    const elapsed = Date.now() - start
    const status = res.status
    const contentType = res.headers.get('content-type') || ''
    const html = await res.text()

    const entry = {
      url, label, status, elapsed,
      hasTitle: /<title>/.test(html),
      hasMetaDesc: /<meta[^>]+name="description"/.test(html),
      hasOG: /<meta[^>]+property="og:/.test(html),
      size: html.length,
      issues: [],
    }

    // Performance
    if (elapsed > 3000) entry.issues.push(`Lent: ${elapsed}ms`)
    if (elapsed > 5000) entry.issues.push('CRITIQUE: >5s de chargement')

    // Status
    if (status >= 400) entry.issues.push(`HTTP ${status}`)
    if (status >= 300 && status < 400) entry.issues.push(`Redirect ${status}`)

    // SEO basics
    if (!entry.hasTitle) entry.issues.push('Pas de balise <title>')
    if (!entry.hasMetaDesc) entry.issues.push('Pas de meta description')

    // Content checks
    if (!contentType.includes('text/html')) entry.issues.push(`Content-Type: ${contentType}`)
    if (html.length < 500) entry.issues.push('Page quasi vide (<500 bytes)')

    // Check for broken images / emojis still present
    const emojiPattern = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu
    const emojiMatches = html.match(emojiPattern)
    if (emojiMatches && emojiMatches.length > 0) {
      entry.issues.push(`Emojis trouvés (${emojiMatches.length}): ${[...new Set(emojiMatches)].slice(0, 5).join(' ')}`)
    }

    // Security headers
    const secHeaders = ['x-frame-options', 'x-content-type-options', 'strict-transport-security', 'content-security-policy']
    const missingHeaders = secHeaders.filter(h => !res.headers.get(h))
    if (missingHeaders.length > 0) entry.issues.push(`Headers manquants: ${missingHeaders.join(', ')}`)

    results.pages.push(entry)

    const statusIcon = status === 200 ? '✓' : '✗'
    const perf = elapsed < 1000 ? '⚡' : elapsed < 3000 ? '🟡' : '🔴'
    log(`  ${statusIcon} ${perf} ${label} — ${status} (${elapsed}ms, ${(html.length / 1024).toFixed(0)}kb)${entry.issues.length ? ' ⚠ ' + entry.issues.length + ' issues' : ''}`)

    return entry
  } catch (err) {
    const entry = { url, label, status: 0, elapsed: Date.now() - start, error: err.message, issues: [`Erreur fetch: ${err.message}`] }
    results.pages.push(entry)
    results.errors.push(`${label}: ${err.message}`)
    log(`  ✗ ${label} — ERREUR: ${err.message}`)
    return entry
  }
}

async function checkAPI(route) {
  const url = `${BASE}${route.path}`
  const start = Date.now()
  try {
    const res = await fetch(url, {
      method: route.method,
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'ShopCompy-Audit/1.0' },
      body: route.body ? JSON.stringify(route.body) : undefined,
    })
    const elapsed = Date.now() - start
    const data = await res.json().catch(() => null)

    const entry = {
      path: route.path,
      method: route.method,
      status: res.status,
      elapsed,
      hasData: !!data,
      hasError: !!(data?.error),
      errorMsg: data?.error || null,
      issues: [],
    }

    if (res.status >= 400 && res.status !== 429) entry.issues.push(`HTTP ${res.status}: ${data?.error || 'unknown'}`)
    if (elapsed > 10000) entry.issues.push(`Très lent: ${elapsed}ms`)
    if (!data) entry.issues.push('Réponse non-JSON')

    results.api.push(entry)
    const icon = res.status < 400 ? '✓' : '✗'
    log(`  ${icon} API ${route.method} ${route.path} — ${res.status} (${elapsed}ms)${entry.issues.length ? ' ⚠ ' + entry.issues.join(', ') : ''}`)

    return entry
  } catch (err) {
    results.api.push({ path: route.path, method: route.method, status: 0, error: err.message, issues: [err.message] })
    results.errors.push(`API ${route.path}: ${err.message}`)
    log(`  ✗ API ${route.path} — ERREUR: ${err.message}`)
  }
}

async function checkSEO() {
  log('\n── SEO checks ──')

  // Robots.txt
  try {
    const res = await fetch(`${BASE}/robots.txt`)
    if (res.ok) {
      const txt = await res.text()
      results.seo.push({ check: 'robots.txt', ok: true, detail: `${txt.length} bytes` })
      log('  ✓ robots.txt présent')
    } else {
      results.seo.push({ check: 'robots.txt', ok: false, detail: `HTTP ${res.status}` })
      results.warnings.push('robots.txt manquant ou inaccessible')
      log('  ✗ robots.txt manquant')
    }
  } catch (e) { results.seo.push({ check: 'robots.txt', ok: false, detail: e.message }) }

  // Sitemap.xml
  try {
    const res = await fetch(`${BASE}/sitemap.xml`)
    if (res.ok) {
      const txt = await res.text()
      const urlCount = (txt.match(/<url>/g) || []).length
      results.seo.push({ check: 'sitemap.xml', ok: true, detail: `${urlCount} URLs` })
      log(`  ✓ sitemap.xml — ${urlCount} URLs`)
    } else {
      results.seo.push({ check: 'sitemap.xml', ok: false, detail: `HTTP ${res.status}` })
      results.warnings.push('sitemap.xml manquant')
      log('  ✗ sitemap.xml manquant')
    }
  } catch (e) { results.seo.push({ check: 'sitemap.xml', ok: false, detail: e.message }) }

  // Canonical / hreflang on homepage
  try {
    const res = await fetch(`${BASE}/fr`)
    const html = await res.text()
    const hasCanonical = /rel="canonical"/.test(html)
    const hasHreflang = /hreflang/.test(html)
    results.seo.push({ check: 'canonical', ok: hasCanonical, detail: hasCanonical ? 'Présent' : 'Manquant' })
    results.seo.push({ check: 'hreflang', ok: hasHreflang, detail: hasHreflang ? 'Présent' : 'Manquant' })
    if (!hasCanonical) results.warnings.push('Canonical tag manquant sur homepage FR')
    if (!hasHreflang) results.warnings.push('Hreflang manquant sur homepage FR')
    log(`  ${hasCanonical ? '✓' : '✗'} Canonical tag`)
    log(`  ${hasHreflang ? '✓' : '✗'} Hreflang`)
  } catch (e) { log(`  ✗ SEO check erreur: ${e.message}`) }
}

async function main() {
  log('═══════════════════════════════════════════════════════')
  log(`Site Audit — Shop Compy`)
  log(`URL: ${BASE}`)
  log(`Date: ${new Date().toLocaleString('fr-CA')}`)
  log('═══════════════════════════════════════════════════════')

  // 1. Check all pages (both locales)
  log('\n── Pages ──')
  for (const locale of LOCALES) {
    for (const page of PAGES) {
      const url = `${BASE}/${locale}${page}`
      const label = `[${locale.toUpperCase()}] ${page || '/'}`
      await checkPage(url, label)
    }
  }

  // Blog article pages
  log('\n── Articles de blog ──')
  for (const slug of BLOG_SLUGS) {
    await checkPage(`${BASE}/fr/blog/${slug}`, `[FR] /blog/${slug}`)
  }

  // Catalogue product page (first one)
  log('\n── Catalogue produit (sample) ──')
  try {
    const catRes = await fetch(`${BASE}/fr/catalogue`)
    const catHtml = await catRes.text()
    const productLink = catHtml.match(/href="\/fr\/catalogue\/([^"]+)"/)
    if (productLink) {
      await checkPage(`${BASE}/fr/catalogue/${productLink[1]}`, `[FR] /catalogue/${productLink[1]}`)
    }
  } catch { /* */ }

  // 2. Check APIs
  log('\n── API Routes ──')
  for (const route of API_ROUTES) {
    await checkAPI(route)
  }

  // 3. SEO checks
  await checkSEO()

  // 4. Summary
  const totalPages = results.pages.length
  const okPages = results.pages.filter(p => p.status === 200).length
  const slowPages = results.pages.filter(p => p.elapsed > 3000).length
  const allIssues = results.pages.flatMap(p => p.issues).concat(results.api.flatMap(a => a.issues || []))

  results.summary = {
    totalPages,
    okPages,
    errorPages: totalPages - okPages,
    slowPages,
    totalIssues: allIssues.length,
    totalErrors: results.errors.length,
    totalWarnings: results.warnings.length,
    avgResponseMs: Math.round(results.pages.reduce((s, p) => s + (p.elapsed || 0), 0) / totalPages),
  }

  log('\n═══════════════════════════════════════════════════════')
  log('RÉSUMÉ')
  log('═══════════════════════════════════════════════════════')
  log(`Pages testées : ${totalPages} (${okPages} OK, ${totalPages - okPages} erreurs)`)
  log(`Pages lentes (>3s) : ${slowPages}`)
  log(`Temps moyen : ${results.summary.avgResponseMs}ms`)
  log(`Issues trouvées : ${allIssues.length}`)
  log(`Erreurs : ${results.errors.length}`)
  log(`Warnings : ${results.warnings.length}`)

  if (allIssues.length > 0) {
    log('\n── Issues détaillées ──')
    results.pages.forEach(p => {
      if (p.issues.length > 0) {
        log(`  ${p.label}:`)
        p.issues.forEach(i => log(`    - ${i}`))
      }
    })
    results.api.forEach(a => {
      if (a.issues && a.issues.length > 0) {
        log(`  API ${a.path}:`)
        a.issues.forEach(i => log(`    - ${i}`))
      }
    })
  }

  if (results.warnings.length > 0) {
    log('\n── Warnings ──')
    results.warnings.forEach(w => log(`  ⚠ ${w}`))
  }

  // Discord report
  if (DISCORD_WEBHOOK) {
    const emoji = results.errors.length === 0 && allIssues.length < 5 ? '✅' : allIssues.length < 15 ? '⚠️' : '🔴'
    const msg = `${emoji} **Site Audit — Shop Compy**\n` +
      `Pages: ${okPages}/${totalPages} OK | Avg: ${results.summary.avgResponseMs}ms\n` +
      `Issues: ${allIssues.length} | Errors: ${results.errors.length} | Warnings: ${results.warnings.length}\n` +
      (allIssues.length > 0 ? `\n**Top issues:**\n${allIssues.slice(0, 10).map(i => `- ${i}`).join('\n')}` : '\nAucune issue majeure.')

    try {
      await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: msg }),
      })
      log('\n✓ Rapport envoyé sur Discord')
    } catch { log('\n⚠ Impossible d\'envoyer sur Discord') }
  }

  // Write JSON report
  const fs = await import('fs/promises')
  const path = await import('path')
  const reportPath = path.join(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '..', 'data', 'audit-report.json')
  await fs.writeFile(reportPath, JSON.stringify(results, null, 2))
  log(`\n✓ Rapport JSON: ${reportPath}`)
}

main().catch(err => {
  console.error('Audit fatal error:', err)
  process.exit(1)
})
