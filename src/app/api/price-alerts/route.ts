import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const ALERTS_FILE = path.join(process.cwd(), 'data', 'price-alerts.json')

interface PriceAlert {
  email: string
  productId: string
  productName: string
  priceAtSubscription: number
  subscribedAt: string
}

interface AlertsData {
  alerts: PriceAlert[]
}

async function readAlerts(): Promise<AlertsData> {
  try {
    const raw = await fs.readFile(ALERTS_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return { alerts: [] }
  }
}

async function writeAlerts(data: AlertsData): Promise<void> {
  await fs.writeFile(ALERTS_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

// POST — Subscribe to price alert
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, productId, productName, currentPrice } = body

    // Validate
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    if (!productId || typeof productId !== 'string') {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
    }
    if (!currentPrice || typeof currentPrice !== 'number') {
      return NextResponse.json({ error: 'Current price required' }, { status: 400 })
    }

    const data = await readAlerts()

    // Check duplicate
    const exists = data.alerts.some(
      a => a.email === email.trim().toLowerCase() && a.productId === productId
    )
    if (exists) {
      return NextResponse.json({ ok: true, message: 'already_subscribed' })
    }

    // Add alert
    data.alerts.push({
      email: email.trim().toLowerCase(),
      productId,
      productName: productName || productId,
      priceAtSubscription: currentPrice,
      subscribedAt: new Date().toISOString(),
    })

    await writeAlerts(data)

    // Notify Discord
    const webhook = process.env.DISCORD_CATALOGUE_WEBHOOK
    if (webhook) {
      fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🔔 **Nouvelle alerte prix** — ${email.trim()} s'abonne à **${productName || productId}** (${currentPrice} $)`,
        }),
      }).catch(() => {})
    }

    return NextResponse.json({ ok: true, message: 'subscribed' })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

// GET — Stats (admin, no sensitive data)
export async function GET() {
  const data = await readAlerts()
  return NextResponse.json({
    totalAlerts: data.alerts.length,
    uniqueEmails: new Set(data.alerts.map(a => a.email)).size,
    uniqueProducts: new Set(data.alerts.map(a => a.productId)).size,
  })
}
