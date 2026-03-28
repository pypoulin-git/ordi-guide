// ─── Blog Agent — Phase 3: Publisher ─────────────────────────────
// Validates the article, appends it to articles.fr.ts / articles.en.ts,
// removes the topic from backlog, and optionally deploys.

import { readFile, writeFile } from 'fs/promises'
import { log } from './utils.js'
import { ARTICLES_FR_PATH, ARTICLES_EN_PATH, BACKLOG_PATH, CATEGORIES } from './blog-config.js'

export async function publish(articles, backlogMatch) {
  log('📦 Phase 3: Publication...')

  const { fr, en } = articles

  // ── Validation ──────────────────────────────────────────────
  const errors = []

  if (!fr.slug || fr.slug.length < 5) errors.push('Slug FR manquant ou trop court')
  if (!fr.title || fr.title.length < 10) errors.push('Titre FR manquant')
  if (!fr.sections || fr.sections.length < 2) errors.push('Moins de 2 sections FR')
  if (!fr.tldr || fr.tldr.length < 20) errors.push('TL;DR FR trop court')
  if (!CATEGORIES.includes(fr.category)) errors.push(`Catégorie invalide: ${fr.category}`)
  if (!fr.tags || fr.tags.length < 2) errors.push('Pas assez de tags FR')

  if (!en.title || en.title.length < 10) errors.push('Titre EN manquant')
  if (!en.sections || en.sections.length < 2) errors.push('Moins de 2 sections EN')

  if (errors.length > 0) {
    log(`  ❌ Validation échouée:`)
    errors.forEach(e => log(`    - ${e}`))
    return { success: false, errors }
  }

  log('  ✓ Validation OK')

  // ── Check for duplicate slug ────────────────────────────────
  const frRaw = await readFile(ARTICLES_FR_PATH, 'utf-8')
  if (frRaw.includes(`slug: '${fr.slug}'`)) {
    log(`  ⚠ Slug "${fr.slug}" existe déjà — abandon`)
    return { success: false, errors: [`Slug duplicate: ${fr.slug}`] }
  }

  // ── Append to articles.fr.ts ────────────────────────────────
  log('  Ajout à articles.fr.ts...')
  const frEntry = formatArticleEntry(fr)
  const frUpdated = frRaw.replace(
    /^(export const articles: Article\[\] = \[)/m,
    `$1\n${frEntry},`
  )
  await writeFile(ARTICLES_FR_PATH, frUpdated)

  // ── Append to articles.en.ts ────────────────────────────────
  log('  Ajout à articles.en.ts...')
  const enRaw = await readFile(ARTICLES_EN_PATH, 'utf-8')
  const enEntry = formatArticleEntry(en)
  const enUpdated = enRaw.replace(
    /^(export const articles: Article\[\] = \[)/m,
    `$1\n${enEntry},`
  )
  await writeFile(ARTICLES_EN_PATH, enUpdated)

  // ── Remove from backlog if matched ──────────────────────────
  if (backlogMatch) {
    try {
      const backlogRaw = await readFile(BACKLOG_PATH, 'utf-8')
      let backlog = JSON.parse(backlogRaw)
      backlog = backlog.filter(b => b.topic !== backlogMatch.topic)
      await writeFile(BACKLOG_PATH, JSON.stringify(backlog, null, 2))
      log(`  ✓ Sujet retiré du backlog: "${backlogMatch.topic}"`)
    } catch { /* */ }
  }

  log(`  ✓ Article publié: "${fr.title}" (${fr.slug})`)

  return {
    success: true,
    slug: fr.slug,
    titleFr: fr.title,
    titleEn: en.title,
    category: fr.category,
    tags: fr.tags,
  }
}

function formatArticleEntry(article) {
  const esc = (s) => s.replace(/'/g, "\\'").replace(/\n/g, '\\n')

  const sections = article.sections.map(s => {
    const paras = s.paragraphs.map(p => `          '${esc(p)}',`).join('\n')
    return `      {
        title: '${esc(s.title)}',
        paragraphs: [
${paras}
        ],
      }`
  }).join(',\n')

  return `  {
    slug: '${esc(article.slug)}',
    title: '${esc(article.title)}',
    description: '${esc(article.description)}',
    date: '${article.date}',
    readTime: '${article.readTime}',
    category: '${esc(article.category)}',
    categoryColor: '${article.categoryColor}',
    icon: '',
    tags: [${article.tags.map(t => `'${esc(t)}'`).join(', ')}],
    featured: false,
    coverGradient: '${article.coverGradient || ''}',
    tldr: '${esc(article.tldr)}',
    sections: [
${sections}
    ],
    ctaText: '${esc(article.ctaText)}',
  }`
}
