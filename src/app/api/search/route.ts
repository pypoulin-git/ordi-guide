import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

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
- ARCHÉTYPES : "minimalist" = usage léger/basique, "athlete" = équilibré/polyvalent, "geek" = puissance brute CPU/RAM, "douchebag" = machine déséquilibrée (gros GPU mais CPU/RAM faibles, ou specs qui ne matchent pas l'usage réel — AVERTIS l'utilisateur du piège), "none" = inclassable

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
  "archetype": "minimalist|athlete|geek|douchebag|none",
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
            maxOutputTokens: 2048,
            responseMimeType: 'application/json',
            thinkingConfig: { thinkingBudget: 0 },
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
    // ── Match best product from catalogue ────────────────────────
    try {
      const catPath = path.join(process.cwd(), 'data', 'catalogue.json')
      const catRaw = await fs.readFile(catPath, 'utf-8')
      const catalogue = JSON.parse(catRaw)
      const products = catalogue.products ?? []

      if (products.length > 0 && parsed.specs) {
        // Parse budget range from specs (e.g. "700-1000 $ CAD" or "700$-1000$")
        const budgetStr = parsed.specs.budget || ''
        const nums = budgetStr.match(/\d[\d\s]*\d|\d+/g)?.map((n: string) => parseInt(n.replace(/\s/g, ''), 10)) || []
        const budgetMin = nums.length >= 1 ? nums[0] : 0
        const budgetMax = nums.length >= 2 ? nums[1] : nums.length === 1 ? nums[0] * 1.3 : Infinity

        // Map usage_detected to profile tags
        const usageToProfile: Record<string, string> = {
          web: 'basic', bureautique: 'work', etudes: 'student',
          video: 'creative', creation: 'creative', gaming: 'gaming',
        }
        const targetProfiles = (parsed.usage_detected || [])
          .map((u: string) => usageToProfile[u]).filter(Boolean)

        // Score each product
        const scored = products.map((p: { price: number; profiles: string[]; aiScore: number; specs?: { gpu?: string } }) => {
          let score = 0

          // Budget proximity (0-40 pts): within range = 40, close = 20, far = 0
          if (p.price >= budgetMin * 0.8 && p.price <= budgetMax * 1.2) score += 40
          else if (p.price >= budgetMin * 0.5 && p.price <= budgetMax * 1.5) score += 20

          // Profile match (0-30 pts)
          const profileMatches = targetProfiles.filter((tp: string) => p.profiles.includes(tp)).length
          if (targetProfiles.length > 0) score += Math.min(30, (profileMatches / targetProfiles.length) * 30)
          else score += 15 // neutral

          // GPU match for gaming/creative
          const needsGpu = (parsed.usage_detected || []).some((u: string) => ['gaming', 'video', 'creation'].includes(u))
          if (needsGpu && p.specs?.gpu) score += 15
          if (!needsGpu && !p.specs?.gpu) score += 5

          // AI score bonus (0-15 pts)
          score += (p.aiScore / 100) * 15

          return { product: p, score }
        })

        scored.sort((a: { score: number }, b: { score: number }) => b.score - a.score)
        if (scored[0]) {
          parsed.recommended_product = scored[0].product
        }
      }
    } catch (catErr) {
      // Non-blocking: if catalogue fails, just return without product
      console.error('Catalogue match error:', catErr)
    }

    return NextResponse.json(parsed)
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('Search API error:', msg)
    return NextResponse.json({ error: 'Erreur interne : ' + msg.slice(0, 100) }, { status: 500 })
  }
}
