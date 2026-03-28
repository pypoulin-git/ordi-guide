// ─── Blog Agent — Phase 1: Researcher (NOVA-style) ──────────────
// Searches web for trending topics + checks backlog for user questions
// Picks the best topic and gathers source material

import { searxSearch, geminiGenerate, log } from './utils.js'
import {
  TREND_QUERIES, MAX_SEARCH_RESULTS, MAX_SOURCES_PER_ARTICLE,
  BACKLOG_PATH, ARTICLES_FR_PATH, CATEGORIES,
} from './blog-config.js'
import { readFile } from 'fs/promises'

export async function research() {
  log('📡 Phase 1: Recherche de sujets...')

  // 1. Check backlog for user-submitted topics
  let backlog = []
  try {
    const raw = await readFile(BACKLOG_PATH, 'utf-8')
    backlog = JSON.parse(raw)
    log(`  Backlog: ${backlog.length} sujets en attente`)
  } catch { /* no backlog */ }

  // 2. Get existing article slugs to avoid duplicates
  let existingSlugs = []
  try {
    const articlesRaw = await readFile(ARTICLES_FR_PATH, 'utf-8')
    const slugMatches = articlesRaw.matchAll(/slug:\s*'([^']+)'/g)
    existingSlugs = [...slugMatches].map(m => m[1])
    log(`  Articles existants: ${existingSlugs.length}`)
  } catch { /* */ }

  // 3. Search trending topics via SearXNG
  log('  Recherche tendances via SearXNG...')
  const allResults = []

  // Pick 3-4 random trend queries to avoid always searching the same ones
  const shuffled = TREND_QUERIES.sort(() => Math.random() - 0.5).slice(0, 4)

  for (const query of shuffled) {
    try {
      const results = await searxSearch(query, { categories: 'general,it' })
      allResults.push(...results.slice(0, MAX_SEARCH_RESULTS / 4).map(r => ({
        title: r.title,
        url: r.url,
        content: r.content || '',
        query,
      })))
    } catch (err) {
      log(`  ⚠ SearXNG failed for "${query}": ${err.message}`)
    }
  }

  log(`  ${allResults.length} résultats de recherche collectés`)

  // 4. Ask Gemini to pick the best topic
  const backlogTopics = backlog.slice(-10).map(b => b.topic).join('\n- ')
  const existingTitles = existingSlugs.join(', ')

  const topicPrompt = `Tu es NOVA, agent de veille technologique pour Shop Compy, un site d'aide à l'achat d'ordinateurs au Canada.

Voici des résultats de recherche sur les tendances actuelles :
${allResults.slice(0, 15).map(r => `- "${r.title}" : ${r.content.slice(0, 150)}`).join('\n')}

${backlogTopics ? `Sujets demandés par les utilisateurs (priorité haute) :\n- ${backlogTopics}` : ''}

Articles déjà publiés (à ne pas refaire) : ${existingTitles}

Catégories possibles : ${CATEGORIES.join(', ')}

Choisis LE MEILLEUR sujet pour un nouvel article. Priorise :
1. Les sujets demandés par les utilisateurs (backlog)
2. Les tendances d'actualité pertinentes
3. Les sujets éducatifs manquants

Retourne un JSON avec : topic, category, angle (l'angle unique de l'article), targetAudience, searchQueries (3 queries pour approfondir la recherche).`

  const topicSchema = {
    type: 'object',
    properties: {
      topic: { type: 'string' },
      category: { type: 'string' },
      angle: { type: 'string' },
      targetAudience: { type: 'string' },
      searchQueries: { type: 'array', items: { type: 'string' } },
    },
    required: ['topic', 'category', 'angle', 'targetAudience', 'searchQueries'],
  }

  const chosenTopic = await geminiGenerate(topicPrompt, topicSchema)
  log(`  Sujet choisi: "${chosenTopic.topic}" (${chosenTopic.category})`)
  log(`  Angle: ${chosenTopic.angle}`)

  // 5. Deep research on the chosen topic
  log('  Recherche approfondie...')
  const deepResults = []
  for (const q of chosenTopic.searchQueries) {
    try {
      const results = await searxSearch(q, { categories: 'general,it' })
      deepResults.push(...results.slice(0, MAX_SOURCES_PER_ARTICLE).map(r => ({
        title: r.title,
        url: r.url,
        content: r.content || '',
      })))
    } catch (err) {
      log(`  ⚠ Deep search failed for "${q}": ${err.message}`)
    }
  }

  log(`  ${deepResults.length} sources approfondies collectées`)

  return {
    topic: chosenTopic,
    sources: deepResults.slice(0, MAX_SOURCES_PER_ARTICLE * 3),
    backlogMatch: backlog.find(b =>
      b.topic.toLowerCase().includes(chosenTopic.topic.toLowerCase().split(' ')[0])
    ),
  }
}
