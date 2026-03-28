import { NextRequest, NextResponse } from 'next/server'
import { getArticles } from '@/content/articles'
import type { Locale } from '@/i18n/config'

// Rate limiting
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

// Sanitize input
function sanitize(input: string): string {
  return input
    .replace(/[\x00-\x1f\x7f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200)
}

// Simple relevance scoring for articles
function scoreArticle(article: { title: string; description: string; tags: string[]; tldr: string; category: string }, queryWords: string[]) {
  const text = `${article.title} ${article.description} ${article.tldr} ${article.tags.join(' ')} ${article.category}`.toLowerCase()
  let score = 0
  for (const word of queryWords) {
    if (word.length < 2) continue
    const w = word.toLowerCase()
    if (text.includes(w)) {
      score += article.title.toLowerCase().includes(w) ? 3 : 1
      score += article.tags.some(t => t.toLowerCase().includes(w)) ? 2 : 0
    }
  }
  return score
}

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
  const queryWords = query.split(/\s+/)

  // Score all articles
  const scored = articles
    .map(a => ({ article: a, score: scoreArticle(a, queryWords) }))
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  const hasMatches = scored.length > 0

  // Call Gemini for the answer
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || ''
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'Service temporairement indisponible' }, { status: 503 })
  }

  const articleContext = hasMatches
    ? scored.map(s => `- "${s.article.title}": ${s.article.description}. TL;DR: ${s.article.tldr}`).join('\n')
    : ''

  const systemPrompt = locale === 'fr'
    ? `Tu es Compy, l'assistant tech de Shop Compy. Tu aides les gens à comprendre la technologie informatique en langage simple, avec un ton amical québécois.

${hasMatches ? `Voici des articles pertinents de notre blog :\n${articleContext}\n\nBase ta réponse sur ces articles quand pertinent. Mentionne-les naturellement.` : 'Aucun article ne correspond directement à cette question. Réponds de ton mieux avec tes connaissances.'}

Règles :
- Réponds en 3-5 phrases max, clair et concis
- Langage simple, pas de jargon technique non expliqué
- Ton amical et accessible (tu, pas vous)
- Si tu n'es pas sûr, dis-le honnêtement
- Ne recommande pas de marques spécifiques sauf si demandé`
    : `You are Compy, Shop Compy's tech assistant. You help people understand computer technology in simple language, with a friendly tone.

${hasMatches ? `Here are relevant blog articles:\n${articleContext}\n\nBase your answer on these articles when relevant. Mention them naturally.` : 'No articles directly match this question. Answer with your best knowledge.'}

Rules:
- Answer in 3-5 sentences max, clear and concise
- Simple language, no unexplained jargon
- Friendly and accessible tone
- If unsure, say so honestly
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
            properties: {
              answer: { type: 'string' },
            },
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

    return NextResponse.json({
      answer: parsed.answer,
      matchedArticles: scored.map(s => ({
        slug: s.article.slug,
        title: s.article.title,
        relevance: locale === 'fr'
          ? (s.score >= 5 ? 'Très pertinent' : 'Connexe')
          : (s.score >= 5 ? 'Very relevant' : 'Related'),
      })),
      isImprovised: !hasMatches,
    })
  } catch (err) {
    console.error('blog-ask error:', err)
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 })
  }
}

// Log unanswered topics to a local backlog file (for the blog agent to pick up)
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

    // Don't add duplicates (same topic within last 7 days)
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const isDupe = backlog.some(b =>
      b.topic.toLowerCase() === query.toLowerCase() &&
      new Date(b.date).getTime() > weekAgo
    )
    if (isDupe) return

    backlog.push({
      topic: query,
      locale,
      date: new Date().toISOString(),
      source: 'compy-blog-bar',
    })

    // Keep only last 100 entries
    if (backlog.length > 100) backlog = backlog.slice(-100)

    await fs.writeFile(backlogPath, JSON.stringify(backlog, null, 2))
  } catch (err) {
    console.error('Failed to log topic to backlog:', err)
  }
}
