import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

type Product = {
  id?: string
  category?: string
  brand?: string
  priceSource?: string
  imageUrl?: string
  isOnSale?: boolean
  lastVerified?: string
}

type AgentRun = {
  scannedAt?: string
  completedAt?: string
  totalScanned?: number
  productsKept?: number
  productsNew?: number
  productsReplaced?: number
  deadUrlsRemoved?: number
  productsDeduplicated?: number
}

/**
 * GET /api/health/catalogue
 *
 * Lightweight read-only health probe for the catalogue pipeline.
 * Consumers: Mission Control dashboard, UptimeRobot ping, Discord alerts.
 * No secrets returned. Cached 60 s to avoid hammering the JSON file on
 * serverless cold starts.
 */
export async function GET() {
  try {
    const catPath = path.join(process.cwd(), 'data', 'catalogue.json')
    const raw = await fs.readFile(catPath, 'utf-8')
    const catalogue = JSON.parse(raw) as {
      lastUpdated?: string
      agentRun?: AgentRun
      products?: Product[]
    }
    const products = catalogue.products ?? []
    const total = products.length

    // ── Category + brand distribution ────────────────────
    const categoryDistribution: Record<string, number> = {}
    const brandDistribution: Record<string, number> = {}
    for (const p of products) {
      const c = p.category ?? 'unknown'
      const b = p.brand ?? 'unknown'
      categoryDistribution[c] = (categoryDistribution[c] ?? 0) + 1
      brandDistribution[b] = (brandDistribution[b] ?? 0) + 1
    }

    // ── Price source breakdown ───────────────────────────
    let aiCount = 0
    let verifiedCount = 0
    let manualCount = 0
    let otherCount = 0
    for (const p of products) {
      switch (p.priceSource) {
        case 'ai': aiCount++; break
        case 'verified': verifiedCount++; break
        case 'manual': manualCount++; break
        default: otherCount++
      }
    }

    // ── Images coverage ──────────────────────────────────
    let imagesPresent = 0
    for (const p of products) {
      if (p.imageUrl && !p.imageUrl.includes('placeholder')) imagesPresent++
    }
    const imagesMissing = total - imagesPresent

    // ── Sales ───────────────────────────────────────────
    const onSale = products.filter(p => p.isOnSale).length

    // ── Staleness (hours since last agent run) ──────────
    const lastRunIso = catalogue.agentRun?.completedAt ?? catalogue.lastUpdated ?? null
    const now = Date.now()
    const hoursSinceLastRun = lastRunIso
      ? Math.round(((now - new Date(lastRunIso).getTime()) / 3_600_000) * 10) / 10
      : null

    // ── Health status heuristic (PASS / WARN / FAIL) ────
    const aiPricePercent = total === 0 ? 0 : Math.round((aiCount / total) * 100)
    const imagesMissingPercent = total === 0 ? 0 : Math.round((imagesMissing / total) * 100)
    let status: 'pass' | 'warn' | 'fail' = 'pass'
    const warnings: string[] = []
    if (total < 20) { warnings.push(`Low product count (${total})`); status = 'warn' }
    if (aiPricePercent > 40) { warnings.push(`AI prices > 40% (${aiPricePercent}%)`); status = 'warn' }
    if (imagesMissingPercent > 15) { warnings.push(`Missing images > 15% (${imagesMissingPercent}%)`); status = 'warn' }
    if (hoursSinceLastRun !== null && hoursSinceLastRun > 72) {
      warnings.push(`Last run > 72h ago (${hoursSinceLastRun}h)`)
      status = 'fail'
    }
    if (total === 0) { status = 'fail' }

    return NextResponse.json(
      {
        status,
        warnings,
        productCount: total,
        lastRun: lastRunIso,
        hoursSinceLastRun,
        categoryDistribution,
        brandDistribution,
        priceSources: {
          ai: aiCount,
          verified: verifiedCount,
          manual: manualCount,
          other: otherCount,
          aiPercent: aiPricePercent,
        },
        images: {
          present: imagesPresent,
          missing: imagesMissing,
          missingPercent: imagesMissingPercent,
        },
        onSale,
        agentRun: catalogue.agentRun ?? null,
        checkedAt: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    )
  } catch (err) {
    return NextResponse.json(
      {
        status: 'fail',
        warnings: ['Failed to read catalogue.json'],
        error: err instanceof Error ? err.message : 'unknown',
        checkedAt: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
