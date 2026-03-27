import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `Tu es l'assistant de recherche de Shop Compy, un site québécois d'aide à l'achat d'ordinateurs.

L'utilisateur te pose une question en langage naturel sur quel ordinateur choisir. Tu dois :
1. Comprendre son besoin réel derrière la question
2. Extraire les critères techniques implicites
3. Donner une recommandation claire et vulgarisée

RÈGLES :
- Réponds TOUJOURS en français québécois naturel (pas de France)
- Zéro jargon technique non expliqué
- Utilise des analogies simples (corps humain ou automobile)
- Sois concis : maximum 4-5 phrases de réponse
- Termine par une suggestion de spécifications minimum
- Si la question n'est pas liée aux ordinateurs, dis-le gentiment et redirige

FORMAT DE RÉPONSE (JSON strict) :
{
  "answer": "Ta réponse vulgarisée ici (4-5 phrases max)",
  "specs": {
    "cpu": "ex: Intel Core i5 ou AMD Ryzen 5 (minimum)",
    "ram": "ex: 16 Go recommandé",
    "ssd": "ex: SSD 512 Go",
    "gpu": "ex: Intégré suffit / Carte dédiée recommandée",
    "budget": "ex: 700-1000 $ CAD"
  },
  "archetype": "minimalist|athlete|geek|none",
  "usage_detected": ["web", "bureautique", "video", "gaming", "etudes", "creation"]
}`

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json()

    if (!query || typeof query !== 'string' || query.trim().length < 3) {
      return NextResponse.json({ error: 'Question trop courte' }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Service de recherche non configuré' }, { status: 503 })
    }

    // Call Gemini 2.5 Flash via Google Generative AI REST API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: [
            { role: 'user', parts: [{ text: query.trim() }] },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
            responseMimeType: 'application/json',
          },
        }),
      }
    )

    if (!response.ok) {
      const err = await response.text()
      console.error('Gemini API error:', response.status, err)
      return NextResponse.json({ error: 'Service IA temporairement indisponible. Réessaie dans un instant.' }, { status: 502 })
    }

    const data = await response.json()

    // Gemini 2.5 Flash may return multiple parts (thinking + response) — grab the last text part
    const parts = data?.candidates?.[0]?.content?.parts ?? []
    const text = parts.filter((p: { text?: string }) => p.text).map((p: { text: string }) => p.text).pop()

    if (!text) {
      console.error('No text in Gemini response, parts:', JSON.stringify(parts).slice(0, 300))
      return NextResponse.json({ error: 'Pas de réponse du modèle' }, { status: 502 })
    }

    // Extract JSON object robustly: find first { and last }
    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    if (start === -1 || end === -1 || end <= start) {
      console.error('No JSON found in response:', text.slice(0, 300))
      return NextResponse.json({ error: 'Réponse IA mal formatée. Réessaie.' }, { status: 502 })
    }

    let parsed
    try {
      parsed = JSON.parse(text.slice(start, end + 1))
    } catch {
      console.error('JSON parse failed:', text.slice(start, start + 300))
      return NextResponse.json({ error: 'Réponse IA mal formatée. Réessaie.' }, { status: 502 })
    }
    return NextResponse.json(parsed)
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('Search API error:', msg)
    return NextResponse.json({ error: 'Erreur interne : ' + msg.slice(0, 100) }, { status: 500 })
  }
}
