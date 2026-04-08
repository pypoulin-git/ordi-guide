import { NextRequest, NextResponse } from 'next/server'

const VALID_SUBJECTS = ['general', 'partnership', 'bug', 'other']
const DISCORD_WEBHOOK = process.env.DISCORD_CONTACT_WEBHOOK || ''

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }
    if (subject && !VALID_SUBJECTS.includes(subject)) {
      return NextResponse.json({ error: 'Invalid subject' }, { status: 400 })
    }

    const contactData = {
      name: name.trim(),
      email: email.trim(),
      subject: subject || 'general',
      message: message.trim(),
      timestamp: new Date().toISOString(),
    }

    // Log locally
    console.log('[Contact Form]', {
      ...contactData,
      message: contactData.message.slice(0, 200) + (contactData.message.length > 200 ? '...' : ''),
    })

    // Send to Discord webhook if configured
    if (DISCORD_WEBHOOK) {
      try {
        const embed = {
          title: `📬 Nouveau message — ${contactData.subject}`,
          color: 0x2563eb,
          fields: [
            { name: 'Nom', value: contactData.name, inline: true },
            { name: 'Email', value: contactData.email, inline: true },
            { name: 'Sujet', value: contactData.subject, inline: true },
            { name: 'Message', value: contactData.message.slice(0, 1024) },
          ],
          timestamp: contactData.timestamp,
          footer: { text: 'Shop Compy — Contact Form' },
        }
        await fetch(DISCORD_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ embeds: [embed] }),
        })
      } catch (webhookErr) {
        console.error('[Contact Form] Discord webhook failed:', webhookErr)
      }
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
