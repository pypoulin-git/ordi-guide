// ─── Blog Agent — Phase 2: Writer ────────────────────────────────
// Takes research results and generates a full article in FR + EN

import { geminiGenerate, log } from './utils.js'
import { CATEGORY_COLORS } from './blog-config.js'

export async function writeArticle(research) {
  const { topic, sources } = research
  log('✍️ Phase 2: Rédaction de l\'article...')

  const sourceContext = sources.slice(0, 12).map(s =>
    `- "${s.title}" (${s.url}): ${s.content.slice(0, 200)}`
  ).join('\n')

  const categoryColor = CATEGORY_COLORS[topic.category] || '#2563eb'

  // Generate French article
  log('  Rédaction FR...')
  const frPrompt = `Tu es un rédacteur pour Shop Compy, un site d'aide à l'achat d'ordinateurs au Canada.
Écris un article de blog complet en français québécois sur le sujet suivant.

Sujet : ${topic.topic}
Angle : ${topic.angle}
Catégorie : ${topic.category}
Audience : ${topic.targetAudience}

Sources à utiliser :
${sourceContext}

RÈGLES DE STYLE :
- Ton amical, tutoiement, vocabulaire simple
- PAS d'émojis, PAS de mots anglais non nécessaires
- Utilise les analogies corps humain / automobile quand pertinent
- 4-5 sections avec 2-3 paragraphes chacune
- TL;DR en début d'article (2-3 phrases)
- CTA en fin d'article qui invite à utiliser le comparateur
- Tags pertinents (3-5 mots-clés courts)
- Temps de lecture estimé

Retourne un JSON avec la structure exacte d'un article Shop Compy.`

  const articleSchema = {
    type: 'object',
    properties: {
      slug: { type: 'string' },
      title: { type: 'string' },
      description: { type: 'string' },
      readTime: { type: 'string' },
      category: { type: 'string' },
      tldr: { type: 'string' },
      sections: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            paragraphs: { type: 'array', items: { type: 'string' } },
          },
          required: ['title', 'paragraphs'],
        },
      },
      ctaText: { type: 'string' },
      tags: { type: 'array', items: { type: 'string' } },
    },
    required: ['slug', 'title', 'description', 'readTime', 'category', 'tldr', 'sections', 'ctaText', 'tags'],
  }

  const frArticle = await geminiGenerate(frPrompt, articleSchema)

  // Fill in computed fields
  frArticle.date = new Date().toISOString().split('T')[0]
  frArticle.categoryColor = categoryColor
  frArticle.icon = '' // no emoji
  frArticle.featured = false
  frArticle.coverGradient = `linear-gradient(135deg, ${categoryColor}40 0%, #1e293b 60%, #334155 100%)`

  log(`  FR: "${frArticle.title}" (${frArticle.sections.length} sections, ${frArticle.tags.length} tags)`)

  // Generate English translation
  log('  Traduction EN...')
  const enPrompt = `Translate this French tech article to English (Canadian English). Keep the same tone: friendly, simple, accessible. Keep the same slug.

French article:
${JSON.stringify(frArticle, null, 2)}

Return the same JSON structure but in English.`

  const enArticle = await geminiGenerate(enPrompt, articleSchema)
  enArticle.date = frArticle.date
  enArticle.categoryColor = categoryColor
  enArticle.icon = ''
  enArticle.featured = false
  enArticle.coverGradient = frArticle.coverGradient
  enArticle.slug = frArticle.slug // keep same slug

  log(`  EN: "${enArticle.title}"`)

  return { fr: frArticle, en: enArticle }
}
