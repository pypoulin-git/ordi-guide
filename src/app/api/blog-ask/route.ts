import { NextRequest, NextResponse } from 'next/server'
import { getArticles } from '@/content/articles'
import type { Locale } from '@/i18n/config'

// ── Rate limiting ────────────────────────────────────────────────
const rateLimiter = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 8
const RATE_WINDOW = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimiter.get(ip)
  if (!entry || now > entry.reset) {
    rateLimiter.set(ip, { count: 1, reset: now + RATE_WINDOW })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT
}

// ── Stopwords (FR + EN) — filtered out before scoring ────────────
const STOPWORDS = new Set([
  // French
  'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'ce', 'ces', 'cet', 'cette',
  'je', 'tu', 'il', 'elle', 'on', 'nous', 'vous', 'ils', 'elles',
  'me', 'te', 'se', 'en', 'y',
  'et', 'ou', 'mais', 'donc', 'car', 'ni', 'que', 'qui', 'dont', 'où',
  'est', 'sont', 'suis', 'es', 'a', 'ai', 'as', 'ont', 'avons', 'avez',
  'ne', 'pas', 'plus', 'jamais', 'rien',
  'dans', 'sur', 'sous', 'avec', 'sans', 'pour', 'par', 'entre',
  'au', 'aux', 'mon', 'ton', 'son', 'ma', 'ta', 'sa', 'mes', 'tes', 'ses',
  'quoi', 'comment', 'pourquoi', 'quand', 'combien',
  "c'est", "qu'est", "j'ai", "l'on", "n'est",
  'ça', 'cela', 'tout', 'tous', 'très', 'bien', 'aussi', 'comme', 'même',
  'être', 'avoir', 'faire', 'dire', 'aller', 'voir', 'vouloir', 'pouvoir',
  // English
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
  'my', 'your', 'his', 'its', 'our', 'their',
  'this', 'that', 'these', 'those', 'what', 'which', 'who', 'how', 'why', 'when',
  'in', 'on', 'at', 'to', 'for', 'of', 'with', 'from', 'by', 'about',
  'and', 'or', 'but', 'not', 'no', 'so', 'if', 'than', 'too', 'very',
])

// ── Sanitize input ───────────────────────────────────────────────
function sanitize(input: string): string {
  return input
    .replace(/[\x00-\x1f\x7f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200)
}

// ── Extract meaningful keywords from query ───────────────────────
function extractKeywords(query: string): string[] {
  // Normalize: lowercase, strip accents for matching
  const normalized = query.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip accents

  // Split on whitespace and punctuation
  const words = normalized.split(/[\s,;:.!?'"()]+/).filter(Boolean)

  // Also check for multi-word stopwords like "c'est"
  const cleaned = words.filter(w => {
    if (w.length < 2) return false
    if (STOPWORDS.has(w)) return false
    // Also check the original form with accents
    return true
  })

  return cleaned
}

// ── Score article relevance ──────────────────────────────────────
interface ArticleData {
  slug: string
  title: string
  description: string
  tags: string[]
  tldr: string
  category: string
  sections: { title: string; paragraphs: string[] }[]
}

function scoreArticle(article: ArticleData, keywords: string[]): number {
  if (keywords.length === 0) return 0

  // Normalize all article text (strip accents for comparison)
  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  const slug = norm(article.slug)
  const title = norm(article.title)
  const desc = norm(article.description)
  const tldr = norm(article.tldr)
  const tags = article.tags.map(t => norm(t))
  const category = norm(article.category)
  const sectionTitles = article.sections.map(s => norm(s.title)).join(' ')
  const sectionText = article.sections.map(s => s.paragraphs.map(p => norm(p)).join(' ')).join(' ')

  let score = 0

  for (const kw of keywords) {
    // Slug match (strongest signal — the article IS about this topic)
    if (slug.includes(kw)) score += 10

    // Title match (very strong)
    if (title.includes(kw)) score += 8

    // Tag match (strong — curated topic label)
    if (tags.some(t => t === kw || t.includes(kw))) score += 6

    // TL;DR match (strong — article summary)
    if (tldr.includes(kw)) score += 4

    // Description match
    if (desc.includes(kw)) score += 3

    // Section titles match
    if (sectionTitles.includes(kw)) score += 3

    // Category match
    if (category.includes(kw)) score += 2

    // Body text match (weakest but still relevant)
    if (sectionText.includes(kw)) score += 1
  }

  return score
}

// ── Main API handler ─────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Trop de requêtes. Réessaie dans une minute.' }, { status: 429 })
  }

  let body: { query?: string; locale?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Format invalide' }, { status: 400 })
  }

  const query = sanitize(body.query || '')
  if (query.length < 3) {
    return NextResponse.json({ error: 'Question trop courte (3 caractères minimum)' }, { status: 400 })
  }

  const locale = (body.locale === 'en' ? 'en' : 'fr') as Locale
  const articles = getArticles(locale)
  const keywords = extractKeywords(query)

  // Score all articles
  const scored = articles
    .map(a => ({ article: a, score: scoreArticle(a as ArticleData, keywords) }))
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  // Require a minimum score to count as a real match
  const MIN_RELEVANT_SCORE = 6
  const relevantMatches = scored.filter(s => s.score >= MIN_RELEVANT_SCORE)
  const hasMatches = relevantMatches.length > 0

  // Call Gemini for the answer
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || ''
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'Service temporairement indisponible' }, { status: 503 })
  }

  const articleContext = hasMatches
    ? relevantMatches.map(s => `- "${s.article.title}" (slug: ${s.article.slug}): ${s.article.description}. TL;DR: ${s.article.tldr}`).join('\n')
    : ''

  const systemPrompt = locale === 'fr'
    ? `Tu es Compy, l'assistant tech de Shop Compy. Tu aides les gens à comprendre la technologie informatique en langage simple, avec un ton amical québécois.

${hasMatches ? `Voici des articles pertinents de notre blog :\n${articleContext}\n\nBase ta réponse sur ces articles. Mentionne naturellement qu'on a un article sur le sujet.` : 'Aucun article ne correspond directement à cette question. Réponds de ton mieux avec tes connaissances.'}

Règles :
- Réponds en 3-5 phrases max, clair et concis
- Langage simple, pas de jargon technique non expliqué
- Ton amical et accessible (tu, pas vous)
- Si un article pertinent existe, encourage à le lire pour plus de détails
- Ne recommande pas de marques spécifiques sauf si demandé`
    : `You are Compy, Shop Compy's tech assistant. You help people understand computer technology in simple language, with a friendly tone.

${hasMatches ? `Here are relevant blog articles:\n${articleContext}\n\nBase your answer on these articles. Naturally mention that we have an article on the topic.` : 'No articles directly match this question. Answer with your best knowledge.'}

Rules:
- Answer in 3-5 sentences max, clear and concise
- Simple language, no unexplained jargon
- Friendly and accessible tone
- If a relevant article exists, encourage reading it for more details
- Don't recommend specific brands unless asked`

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`
    const res = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nQuestion: ${query}` }] },
        ],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 512,
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'object',
            properties: { answer: { type: 'string' } },
            required: ['answer'],
          },
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Gemini error:', errText.slice(0, 300))
      return NextResponse.json({ error: 'Service temporairement indisponible' }, { status: 503 })
    }

    const data = await res.json()
    const parts = data.candidates?.[0]?.content?.parts ?? []
    const text = parts.filter((p: { text?: string }) => p.text).map((p: { text: string }) => p.text).pop()
    if (!text) {
      return NextResponse.json({ error: 'Réponse vide du service' }, { status: 503 })
    }

    const parsed = JSON.parse(text)

    // If improvised (no matching articles), log topic to backlog
    if (!hasMatches) {
      logTopicToBacklog(query, locale).catch(() => {})
    }

    // Build matched articles response with relevance tiers
    const HIGH_SCORE = 12
    const matchedArticles = relevantMatches.map(s => ({
      slug: s.article.slug,
      title: s.article.title,
      score: s.score,
      relevance: locale === 'fr'
        ? (s.score >= HIGH_SCORE ? 'Lire l\'article' : 'Connexe')
        : (s.score >= HIGH_SCORE ? 'Read the article' : 'Related'),
      isTopMatch: s.score >= HIGH_SCORE,
    }))

    return NextResponse.json({
      answer: parsed.answer,
      matchedArticles,
      isImprovised: !hasMatches,
    })
  } catch (err) {
    console.error('blog-ask error:', err)
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 })
  }
}

// ── Log unanswered topics to backlog ─────────────────────────────
async function logTopicToBacklog(query: string, locale: string) {
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    const backlogPath = path.join(process.cwd(), 'data', 'article-backlog.json')

    let backlog: { topic: string; locale: string; date: string; source: string }[] = []
    try {
      const raw = await fs.readFile(backlogPath, 'utf-8')
      backlog = JSON.parse(raw)
    } catch { /* file doesn't exist yet */ }

    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const isDupe = backlog.some(b =>
      b.topic.toLowerCase() === query.toLowerCase() &&
      new Date(b.date).getTime() > weekAgo
    )
    if (isDupe) return

    backlog.push({ topic: query, locale, date: new Date().toISOString(), source: 'compy-blog-bar' })
    if (backlog.length > 100) backlog = backlog.slice(-100)
    await fs.writeFile(backlogPath, JSON.stringify(backlog, null, 2))
  } catch (err) {
    console.error('Failed to log topic to backlog:', err)
  }
}
