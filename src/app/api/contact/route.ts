import { NextRequest, NextResponse } from 'next/server'

const VALID_SUBJECTS = ['general', 'partnership', 'bug', 'other']

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

    // Log for now (can add email sending later)
    console.log('[Contact Form]', {
      name: name.trim(),
      email: email.trim(),
      subject: subject || 'general',
      message: message.trim().slice(0, 200) + (message.trim().length > 200 ? '...' : ''),
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
