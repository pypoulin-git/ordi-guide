#!/usr/bin/env node
// ─── Compliance Audit Agent — Audit de conformité Shop Compy ─────
// Vérifie : vie privée, cookies, sécurité, tiers, accessibilité, i18n
// Usage :  node agent/compliance-audit.js [--verbose]
// Cron  :  1 fois par semaine
// Env   :  DISCORD_CATALOGUE_WEBHOOK (optionnel)

import { writeFile, mkdir } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import {
  LEGAL_PAGES,
  PRIVACY_REQUIRED_TERMS,
  THIRD_PARTY_SERVICES,
  REQUIRED_SECURITY_HEADERS,
  ACCESSIBILITY_CHECKS,
  SAMPLE_PAGES,
  SCORING,
} from './compliance-knowledge.js'

// ── Configuration ────────────────────────────────────────────────

const PROD_URL = 'https://ordi-guide.vercel.app'
const LOCAL_URL = 'http://localhost:3334'
const DISCORD_WEBHOOK = process.env.DISCORD_CATALOGUE_WEBHOOK || ''
const VERBOSE = process.argv.includes('--verbose')
const TIMEOUT_MS = 10_000
const LOCALES = ['fr', 'en']
const USER_AGENT = 'ShopCompy-ComplianceAudit/1.0'

// ── Résultats ────────────────────────────────────────────────────

const results = []
let baseUrl = PROD_URL

// ── Helpers ──────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url))

function log(msg) {
  const ts = new Date().toISOString().slice(11, 19)
  console.log(`[${ts}] ${msg}`)
}

function verbose(msg) {
  if (VERBOSE) log(`  ↳ ${msg}`)
}

/** Couleurs ANSI pour la console */
const C = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
}

function statusIcon(status) {
  if (status === 'pass') return C.green('PASS')
  if (status === 'fail') return C.red('FAIL')
  return C.yellow('WARN')
}

/** Fetch avec timeout et gestion d'erreur gracieuse */
async function safeFetch(url, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: { 'User-Agent': USER_AGENT, ...options.headers },
      redirect: options.redirect || 'follow',
    })
    clearTimeout(timer)
    return res
  } catch (err) {
    clearTimeout(timer)
    return null
  }
}

/** Fetch page HTML avec timeout */
async function fetchHTML(url) {
  const res = await safeFetch(url)
  if (!res) return { status: 0, html: '', headers: null }
  const html = await res.text()
  return { status: res.status, html, headers: res.headers }
}

/** Ajouter un résultat d'audit */
function addResult(id, category, title, status, severity, details) {
  results.push({ id, category, title, status, severity, details })
  const icon = statusIcon(status)
  log(`  ${icon} ${C.dim(`[${category}]`)} ${title}${details && VERBOSE ? ` — ${details}` : ''}`)
}

// ══════════════════════════════════════════════════════════════════
// A. Vérification des pages légales (vie privée et conditions)
// ══════════════════════════════════════════════════════════════════

async function checkPrivacyLegalPages() {
  log(C.bold('\n── A. Pages légales & vie privée ──'))

  for (const page of LEGAL_PAGES) {
    for (const locale of LOCALES) {
      const url = `${baseUrl}/${locale}${page.path}`
      const { status, html } = await fetchHTML(url)
      const checkId = `legal-${locale}-${page.path.replace('/', '')}`

      // Vérifier que la page existe
      if (status === 200) {
        addResult(checkId, 'privacy', `${page.label} [${locale.toUpperCase()}] existe`, 'pass', 'critical', url)
      } else if (page.required) {
        addResult(checkId, 'privacy', `${page.label} [${locale.toUpperCase()}] manquante`, 'fail', 'critical', `HTTP ${status} — ${url}`)
        continue
      } else {
        addResult(checkId, 'privacy', `${page.label} [${locale.toUpperCase()}] manquante`, 'warning', 'high', `HTTP ${status} — ${url}`)
        continue
      }

      // Vérifier les termes obligatoires dans la page de confidentialité
      if (page.path === '/privacy' && html) {
        const terms = PRIVACY_REQUIRED_TERMS[locale] || []
        const htmlLower = html.toLowerCase()
        const found = terms.filter(t => htmlLower.includes(t.toLowerCase()))
        const missing = terms.filter(t => !htmlLower.includes(t.toLowerCase()))

        if (missing.length === 0) {
          addResult(`${checkId}-terms`, 'privacy', `Termes obligatoires [${locale.toUpperCase()}] tous présents`, 'pass', 'high', `${found.length}/${terms.length} termes`)
        } else if (missing.length <= 2) {
          addResult(`${checkId}-terms`, 'privacy', `Termes manquants [${locale.toUpperCase()}]`, 'warning', 'high', `Manquants: ${missing.join(', ')}`)
        } else {
          addResult(`${checkId}-terms`, 'privacy', `Termes manquants [${locale.toUpperCase()}]`, 'fail', 'critical', `Manquants: ${missing.join(', ')}`)
        }

        // Vérifier les coordonnées de contact/responsable
        const hasContact = /courriel|email|contact|responsable|officer|dpo/i.test(html)
        addResult(`${checkId}-contact`, 'privacy', `Info contact/responsable [${locale.toUpperCase()}]`, hasContact ? 'pass' : 'warning', 'medium',
          hasContact ? 'Coordonnées trouvées' : 'Aucune info de contact détectée')
      }
    }
  }
}

// ══════════════════════════════════════════════════════════════════
// B. Consentement aux cookies
// ══════════════════════════════════════════════════════════════════

async function checkCookieConsent() {
  log(C.bold('\n── B. Consentement aux cookies ──'))

  const { html } = await fetchHTML(`${baseUrl}/fr`)
  if (!html) {
    addResult('cookie-banner', 'cookies', 'Bannière de cookies', 'fail', 'critical', 'Impossible de charger la page')
    return
  }

  // Chercher des indicateurs de bannière cookie dans le HTML
  const cookiePatterns = [
    /cookie[- ]?consent/i,
    /cookie[- ]?banner/i,
    /cookie[- ]?notice/i,
    /cookie[- ]?policy/i,
    /consentement.*cookie/i,
    /accepter.*cookie/i,
    /cookie.*accepter/i,
    /gdpr/i,
    /ccpa/i,
  ]

  const hasBanner = cookiePatterns.some(p => p.test(html))
  if (hasBanner) {
    addResult('cookie-banner', 'cookies', 'Bannière de cookies détectée', 'pass', 'high', 'Mécanisme de consentement trouvé dans le HTML')
  } else {
    addResult('cookie-banner', 'cookies', 'Bannière de cookies non détectée', 'warning', 'high',
      'Aucun mécanisme de consentement cookie trouvé (peut utiliser un script JS externe)')
  }

  // Vérifier que le consentement n'est pas pré-coché
  const preChecked = /checked.*cookie|cookie.*checked|default.*accept|auto.*accept/i.test(html)
  if (preChecked) {
    addResult('cookie-optin', 'cookies', 'Consentement cookies pré-coché', 'fail', 'critical', 'Le consentement doit être opt-in (non pré-coché)')
  } else {
    addResult('cookie-optin', 'cookies', 'Consentement cookies opt-in', 'pass', 'high', 'Pas de consentement pré-coché détecté')
  }
}

// ══════════════════════════════════════════════════════════════════
// C. En-têtes de sécurité
// ══════════════════════════════════════════════════════════════════

async function checkSecurityHeaders() {
  log(C.bold('\n── C. En-têtes de sécurité ──'))

  const res = await safeFetch(`${baseUrl}/fr`)
  if (!res) {
    addResult('sec-headers-fetch', 'security', 'Récupération headers', 'fail', 'critical', 'Impossible de joindre le site')
    return
  }

  for (const header of REQUIRED_SECURITY_HEADERS) {
    const value = res.headers.get(header.name)
    if (value) {
      addResult(`sec-${header.name}`, 'security', `${header.label}`, 'pass', header.severity, VERBOSE ? value.slice(0, 120) : 'Présent')
    } else {
      addResult(`sec-${header.name}`, 'security', `${header.label} manquant`, 'fail', header.severity, `Header ${header.name} absent de la réponse`)
    }
  }
}

// ══════════════════════════════════════════════════════════════════
// D. SSL/HTTPS
// ══════════════════════════════════════════════════════════════════

async function checkSSL() {
  log(C.bold('\n── D. SSL / HTTPS ──'))

  // Vérifier que le site est accessible en HTTPS
  const httpsRes = await safeFetch(`https://ordi-guide.vercel.app`, { redirect: 'manual' })
  if (httpsRes && httpsRes.status >= 200 && httpsRes.status < 400) {
    addResult('ssl-https', 'security', 'Site accessible en HTTPS', 'pass', 'critical', `HTTP ${httpsRes.status}`)
  } else {
    addResult('ssl-https', 'security', 'Site inaccessible en HTTPS', 'fail', 'critical',
      httpsRes ? `HTTP ${httpsRes.status}` : 'Connexion échouée')
  }

  // Vérifier redirection HTTP → HTTPS (Vercel fait ça automatiquement)
  const httpRes = await safeFetch(`http://ordi-guide.vercel.app`, { redirect: 'manual' })
  if (httpRes) {
    const location = httpRes.headers.get('location') || ''
    if (httpRes.status >= 300 && httpRes.status < 400 && location.startsWith('https://')) {
      addResult('ssl-redirect', 'security', 'Redirection HTTP → HTTPS', 'pass', 'critical', `${httpRes.status} → ${location.slice(0, 80)}`)
    } else if (httpRes.status === 200) {
      // Vercel peut servir directement en HTTPS sans redirection explicite
      addResult('ssl-redirect', 'security', 'Redirection HTTP → HTTPS', 'warning', 'high', 'Pas de redirection explicite détectée')
    } else {
      addResult('ssl-redirect', 'security', 'Redirection HTTP → HTTPS', 'fail', 'high', `HTTP ${httpRes.status} sans redirection HTTPS`)
    }
  } else {
    addResult('ssl-redirect', 'security', 'Redirection HTTP → HTTPS', 'warning', 'medium', 'Impossible de tester (connexion HTTP refusée — probablement HTTPS-only)')
  }
}

// ══════════════════════════════════════════════════════════════════
// E. Divulgation des services tiers
// ══════════════════════════════════════════════════════════════════

async function checkThirdPartyDisclosure() {
  log(C.bold('\n── E. Services tiers & divulgation ──'))

  // Récupérer le contenu de quelques pages pour détecter les services tiers
  const pagesHTML = []
  for (const p of ['/', '/guide', '/catalogue', '/about']) {
    const { html } = await fetchHTML(`${baseUrl}/fr${p}`)
    if (html) pagesHTML.push(html)
  }
  const allHTML = pagesHTML.join('\n')

  // Récupérer la page de confidentialité pour vérifier les divulgations
  const { html: privacyHTML } = await fetchHTML(`${baseUrl}/fr/privacy`)
  const privacyLower = (privacyHTML || '').toLowerCase()

  // Détecter les services tiers utilisés dans le code source
  const detectedServices = []
  const undisclosedServices = []

  for (const svc of THIRD_PARTY_SERVICES) {
    const found = svc.patterns.some(p => allHTML.toLowerCase().includes(p.toLowerCase()))
    if (found) {
      detectedServices.push(svc)
      // Vérifier si le service est mentionné dans la politique de confidentialité
      const disclosed = svc.patterns.some(p => privacyLower.includes(p.toLowerCase())) ||
        privacyLower.includes(svc.id.toLowerCase())
      if (!disclosed) {
        undisclosedServices.push(svc)
      }
    }
  }

  if (detectedServices.length === 0) {
    addResult('3p-detection', 'thirdParty', 'Services tiers détectés', 'pass', 'medium', 'Aucun service tiers détecté dans le code source')
  } else {
    verbose(`Services détectés: ${detectedServices.map(s => s.disclosure).join(', ')}`)
    addResult('3p-detection', 'thirdParty', `${detectedServices.length} service(s) tiers détecté(s)`, 'pass', 'medium',
      detectedServices.map(s => s.disclosure).join(', '))
  }

  if (undisclosedServices.length === 0 && detectedServices.length > 0) {
    addResult('3p-disclosure', 'thirdParty', 'Tous les services tiers divulgués', 'pass', 'high', 'Politique de confidentialité couvre tous les services')
  } else if (undisclosedServices.length > 0) {
    addResult('3p-disclosure', 'thirdParty', 'Services tiers non divulgués', 'fail', 'high',
      `Non mentionnés dans la politique : ${undisclosedServices.map(s => s.disclosure).join(', ')}`)
  }
}

// ══════════════════════════════════════════════════════════════════
// F. Minimisation des données
// ══════════════════════════════════════════════════════════════════

async function checkDataMinimization() {
  log(C.bold('\n── F. Minimisation des données ──'))

  // Tester les routes API pour vérifier qu'elles ne loguent pas de PII excessif
  // On vérifie les headers de réponse et la structure de la réponse

  const apiRoutes = [
    { path: '/api/search', method: 'POST', body: { query: 'test laptop' } },
    { path: '/api/blog-ask', method: 'POST', body: { query: 'test', locale: 'fr' } },
  ]

  for (const route of apiRoutes) {
    const url = `${baseUrl}${route.path}`
    const res = await safeFetch(url, {
      method: route.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(route.body),
    })

    if (!res) {
      addResult(`data-api-${route.path}`, 'dataMin', `API ${route.path}`, 'warning', 'medium', 'Impossible de joindre l\'API')
      continue
    }

    // Vérifier que la réponse ne contient pas d'info PII inattendue
    const data = await res.json().catch(() => null)
    if (data) {
      const responseStr = JSON.stringify(data).toLowerCase()
      const piiPatterns = ['email', 'phone', 'address', 'ip_address', 'user_agent', 'password', 'token']
      const foundPII = piiPatterns.filter(p => responseStr.includes(p))

      if (foundPII.length === 0) {
        addResult(`data-api-${route.path}`, 'dataMin', `API ${route.path} — pas de PII dans la réponse`, 'pass', 'medium', 'Aucune donnée personnelle détectée')
      } else {
        addResult(`data-api-${route.path}`, 'dataMin', `API ${route.path} — PII possible`, 'warning', 'high',
          `Champs suspects: ${foundPII.join(', ')}`)
      }
    }

    // Vérifier les en-têtes de rate limiting
    const rateHeaders = ['x-ratelimit-limit', 'x-ratelimit-remaining', 'retry-after', 'ratelimit-limit']
    const hasRateLimit = rateHeaders.some(h => res.headers.get(h))
    addResult(`data-ratelimit-${route.path}`, 'dataMin', `Rate limiting sur ${route.path}`,
      hasRateLimit || res.status === 429 ? 'pass' : 'warning', 'medium',
      hasRateLimit ? 'Headers rate-limit présents' : 'Pas de headers rate-limit détectés (peut être géré en interne)')
  }
}

// ══════════════════════════════════════════════════════════════════
// G. Accessibilité (vérifications rapides)
// ══════════════════════════════════════════════════════════════════

async function checkAccessibility() {
  log(C.bold('\n── G. Accessibilité ──'))

  for (const page of SAMPLE_PAGES) {
    const url = `${baseUrl}/fr${page.path}`
    const { html } = await fetchHTML(url)
    if (!html) {
      addResult(`a11y-${page.path}`, 'accessibility', `${page.label} — inaccessible`, 'warning', 'medium', 'Page non chargée')
      continue
    }

    // Attribut lang sur <html>
    const hasLang = /<html[^>]+lang=/i.test(html)
    addResult(`a11y-lang-${page.path}`, 'accessibility', `lang attr [${page.label}]`, hasLang ? 'pass' : 'fail', 'high',
      hasLang ? 'Attribut lang présent' : 'Attribut lang manquant sur <html>')

    // Balise <h1> présente
    const hasH1 = /<h1[\s>]/i.test(html)
    addResult(`a11y-h1-${page.path}`, 'accessibility', `<h1> [${page.label}]`, hasH1 ? 'pass' : 'warning', 'medium',
      hasH1 ? 'Balise h1 trouvée' : 'Aucune balise h1 détectée')

    // Images avec alt text
    const imgTags = html.match(/<img[^>]*>/gi) || []
    if (imgTags.length > 0) {
      const withAlt = imgTags.filter(t => /alt=/i.test(t))
      const emptyAlt = imgTags.filter(t => /alt=""/i.test(t))
      const noAlt = imgTags.length - withAlt.length

      if (noAlt === 0) {
        addResult(`a11y-alt-${page.path}`, 'accessibility', `Images alt [${page.label}]`, 'pass', 'high',
          `${imgTags.length} images, toutes avec alt`)
      } else {
        addResult(`a11y-alt-${page.path}`, 'accessibility', `Images sans alt [${page.label}]`, 'fail', 'high',
          `${noAlt}/${imgTags.length} images sans attribut alt`)
      }
      verbose(`${page.label}: ${imgTags.length} images, ${withAlt.length} avec alt, ${emptyAlt.length} alt vides`)
    }

    // Vérifier hiérarchie des headings (h1 → h2 → h3, pas de saut)
    const headings = [...html.matchAll(/<(h[1-6])[\s>]/gi)].map(m => parseInt(m[1][1]))
    if (headings.length > 1) {
      let hasSkip = false
      for (let i = 1; i < headings.length; i++) {
        if (headings[i] > headings[i - 1] + 1) {
          hasSkip = true
          break
        }
      }
      if (hasSkip) {
        addResult(`a11y-heading-${page.path}`, 'accessibility', `Hiérarchie headings [${page.label}]`, 'warning', 'medium',
          `Saut de niveau détecté: ${headings.join(' → ')}`)
      } else {
        addResult(`a11y-heading-${page.path}`, 'accessibility', `Hiérarchie headings [${page.label}]`, 'pass', 'medium',
          `Niveaux: ${headings.join(' → ')}`)
      }
    }
  }
}

// ══════════════════════════════════════════════════════════════════
// H. Conformité i18n (FR obligatoire — Loi 25)
// ══════════════════════════════════════════════════════════════════

async function checkI18n() {
  log(C.bold('\n── H. Conformité i18n ──'))

  // Vérifier que toutes les pages légales existent en FR et EN
  for (const page of LEGAL_PAGES) {
    for (const locale of LOCALES) {
      const url = `${baseUrl}/${locale}${page.path}`
      const res = await safeFetch(url)
      const status = res ? res.status : 0

      // Déjà vérifié dans la section A, mais on vérifie l'aspect i18n ici
      if (status === 200) {
        addResult(`i18n-${locale}-${page.path.replace('/', '')}`, 'i18n',
          `${page.label} disponible en ${locale.toUpperCase()}`, 'pass', locale === 'fr' ? 'critical' : 'high',
          `${url} — HTTP ${status}`)
      } else {
        const severity = locale === 'fr' ? 'critical' : 'high'
        const s = page.required ? 'fail' : 'warning'
        addResult(`i18n-${locale}-${page.path.replace('/', '')}`, 'i18n',
          `${page.label} manquante en ${locale.toUpperCase()}`, s, severity,
          `Loi 25 exige la disponibilité en français`)
      }
    }
  }

  // Vérifier que la page d'accueil est disponible dans les deux langues
  for (const locale of LOCALES) {
    const { status, html } = await fetchHTML(`${baseUrl}/${locale}`)
    if (status === 200 && html.length > 500) {
      addResult(`i18n-home-${locale}`, 'i18n', `Accueil [${locale.toUpperCase()}]`, 'pass', 'high', 'Page fonctionnelle')
    } else {
      addResult(`i18n-home-${locale}`, 'i18n', `Accueil [${locale.toUpperCase()}]`, status === 200 ? 'warning' : 'fail', 'high',
        status === 200 ? 'Page très courte' : `HTTP ${status}`)
    }
  }

  // Vérifier la présence du sélecteur de langue
  const { html: homeHtml } = await fetchHTML(`${baseUrl}/fr`)
  if (homeHtml) {
    const hasLangSwitch = /lang.*switch|language.*select|\/en|hreflang/i.test(homeHtml)
    addResult('i18n-switch', 'i18n', 'Sélecteur de langue', hasLangSwitch ? 'pass' : 'warning', 'medium',
      hasLangSwitch ? 'Détecté dans le HTML' : 'Non détecté (peut être JS-only)')
  }
}

// ══════════════════════════════════════════════════════════════════
// Rapport & Score
// ══════════════════════════════════════════════════════════════════

function generateReport() {
  const passed = results.filter(r => r.status === 'pass').length
  const failed = results.filter(r => r.status === 'fail').length
  const warnings = results.filter(r => r.status === 'warning').length
  const total = results.length
  const score = total > 0 ? Math.round((passed / total) * 100) : 0

  // Générer les recommandations basées sur les échecs
  const recommendations = []

  // Recommandations critiques (échecs sévères)
  const criticalFails = results.filter(r => r.status === 'fail' && r.severity === 'critical')
  for (const f of criticalFails) {
    recommendations.push({
      priority: 'critical',
      title: f.title,
      description: f.details,
    })
  }

  // Recommandations hautes (échecs importants)
  const highFails = results.filter(r => r.status === 'fail' && r.severity === 'high')
  for (const f of highFails) {
    recommendations.push({
      priority: 'high',
      title: f.title,
      description: f.details,
    })
  }

  // Recommandations moyennes (warnings importants)
  const mediumWarns = results.filter(r => r.status === 'warning' && (r.severity === 'critical' || r.severity === 'high'))
  for (const w of mediumWarns) {
    recommendations.push({
      priority: 'medium',
      title: w.title,
      description: w.details,
    })
  }

  return {
    date: new Date().toISOString(),
    score: `${score}%`,
    totalChecks: total,
    passed,
    failed,
    warnings,
    results,
    recommendations,
  }
}

// ── Envoi Discord ────────────────────────────────────────────────

async function sendDiscordAlert(report) {
  if (!DISCORD_WEBHOOK) {
    log('\n' + C.dim('Discord webhook non configuré — alerte non envoyée'))
    return
  }

  const score = parseInt(report.score)
  let emoji = '✅'
  if (score < SCORING.thresholds.critical) emoji = '🔴'
  else if (score < SCORING.thresholds.warning) emoji = '⚠️'

  const criticalCount = report.recommendations.filter(r => r.priority === 'critical').length
  const highCount = report.recommendations.filter(r => r.priority === 'high').length

  let msg = `${emoji} **Audit Conformité — Shop Compy**\n`
  msg += `Score: **${report.score}** | ${report.passed} pass / ${report.failed} fail / ${report.warnings} warn\n`

  if (criticalCount > 0) {
    msg += `\n**${criticalCount} problème(s) critique(s) :**\n`
    report.recommendations
      .filter(r => r.priority === 'critical')
      .slice(0, 5)
      .forEach(r => { msg += `- ${r.title}\n` })
  }

  if (highCount > 0) {
    msg += `\n**${highCount} problème(s) important(s) :**\n`
    report.recommendations
      .filter(r => r.priority === 'high')
      .slice(0, 5)
      .forEach(r => { msg += `- ${r.title}\n` })
  }

  if (report.failed === 0 && report.warnings === 0) {
    msg += '\nAucun problème de conformité détecté.'
  }

  // Tronquer si trop long pour Discord (2000 chars max)
  if (msg.length > 1900) msg = msg.slice(0, 1900) + '\n...'

  try {
    await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: msg }),
    })
    log(C.green('\n✓ Rapport envoyé sur Discord'))
  } catch (err) {
    log(C.red(`\n✗ Erreur envoi Discord: ${err.message}`))
  }
}

// ══════════════════════════════════════════════════════════════════
// Main — Orchestration
// ══════════════════════════════════════════════════════════════════

async function main() {
  log('═══════════════════════════════════════════════════════')
  log(C.bold('Compliance Audit — Shop Compy'))
  log(`Date : ${new Date().toLocaleString('fr-CA')}`)
  log('═══════════════════════════════════════════════════════')

  // Déterminer l'URL de base (production ou local)
  const prodCheck = await safeFetch(PROD_URL)
  if (prodCheck && prodCheck.status === 200) {
    baseUrl = PROD_URL
    log(`Cible : ${C.cyan(PROD_URL)} (production)`)
  } else {
    log(C.yellow(`Production inaccessible, fallback vers ${LOCAL_URL}`))
    const localCheck = await safeFetch(LOCAL_URL)
    if (localCheck && localCheck.status === 200) {
      baseUrl = LOCAL_URL
      log(`Cible : ${C.cyan(LOCAL_URL)} (local)`)
    } else {
      log(C.red('ERREUR : Ni production ni local accessibles. Abandon.'))
      process.exit(1)
    }
  }

  const start = Date.now()

  // Exécuter tous les audits séquentiellement
  await checkPrivacyLegalPages()
  await checkCookieConsent()
  await checkSecurityHeaders()
  await checkSSL()
  await checkThirdPartyDisclosure()
  await checkDataMinimization()
  await checkAccessibility()
  await checkI18n()

  const elapsed = ((Date.now() - start) / 1000).toFixed(1)

  // Générer le rapport
  const report = generateReport()

  // Afficher le résumé
  log('\n═══════════════════════════════════════════════════════')
  log(C.bold('RÉSUMÉ'))
  log('═══════════════════════════════════════════════════════')
  log(`Score global : ${C.bold(report.score)}`)
  log(`Vérifications : ${report.totalChecks} total`)
  log(`  ${C.green(`✓ ${report.passed} pass`)}  ${C.red(`✗ ${report.failed} fail`)}  ${C.yellow(`⚠ ${report.warnings} warnings`)}`)
  log(`Durée : ${elapsed}s`)

  if (report.recommendations.length > 0) {
    log(C.bold('\n── Recommandations ──'))
    const byPriority = { critical: [], high: [], medium: [] }
    report.recommendations.forEach(r => byPriority[r.priority]?.push(r))

    if (byPriority.critical.length > 0) {
      log(C.red(`\n  CRITIQUE (${byPriority.critical.length}) :`))
      byPriority.critical.forEach(r => log(`    ✗ ${r.title}`))
    }
    if (byPriority.high.length > 0) {
      log(C.yellow(`\n  IMPORTANT (${byPriority.high.length}) :`))
      byPriority.high.forEach(r => log(`    ⚠ ${r.title}`))
    }
    if (byPriority.medium.length > 0) {
      log(C.dim(`\n  MOYEN (${byPriority.medium.length}) :`))
      byPriority.medium.forEach(r => log(`    ↳ ${r.title}`))
    }
  } else {
    log(C.green('\nAucune recommandation — conformité parfaite.'))
  }

  // Sauvegarder le rapport JSON
  const reportPath = join(__dirname, '..', 'data', 'compliance-report.json')
  try {
    await mkdir(dirname(reportPath), { recursive: true })
    await writeFile(reportPath, JSON.stringify(report, null, 2))
    log(`\n${C.green('✓')} Rapport JSON : ${reportPath}`)
  } catch (err) {
    log(C.red(`\n✗ Erreur écriture rapport: ${err.message}`))
  }

  // Record to Knowledge Store
  try {
    var ks = require("/home/pypou/pclaw-discord/knowledge-store.js");
    var failedChecks = report.recommendations.filter(r => r.priority === 'critical' || r.priority === 'high').map(r => r.title);
    ks.recordComplianceScore(parseInt(report.score), failedChecks);
  } catch(e) { /* knowledge store optional */ }

  // Envoyer l'alerte Discord
  await sendDiscordAlert(report)

  log('\n' + C.dim('Audit terminé.'))
}

main().catch(err => {
  console.error('Compliance audit fatal error:', err)
  process.exit(1)
})
