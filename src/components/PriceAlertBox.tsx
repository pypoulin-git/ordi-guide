'use client'

import { useState } from 'react'
import { useTranslation } from '@/i18n/DictionaryContext'

interface PriceAlertBoxProps {
  productId: string
  productName: string
  currentPrice: number
}

export default function PriceAlertBox({ productId, productName, currentPrice }: PriceAlertBoxProps) {
  const { t } = useTranslation()
  const pa = t.priceAlert
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/price-alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), productId, productName, currentPrice }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus('error')
        return
      }
      setStatus(data.message === 'already_subscribed' ? 'already' : 'success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success' || status === 'already') {
    return (
      <div className="rounded-xl p-4 bg-[var(--accent-bg)] border border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔔</span>
          <p className="text-sm font-medium text-[var(--success)]">
            {status === 'already' ? pa.alreadySubscribed : pa.subscribed}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl p-4 bg-[var(--bg-subtle)] border border-[var(--border)]">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🔔</span>
        <h3 className="text-sm font-bold text-[var(--text)]">{pa.title}</h3>
      </div>
      <p className="text-xs text-[var(--text-muted)] mb-3">{pa.description}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={pa.placeholder}
          required
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-white text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 text-sm font-semibold rounded-lg text-white shrink-0 disabled:opacity-50"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          {status === 'loading' ? '...' : pa.button}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-xs text-red-500 mt-2">{pa.error}</p>
      )}
      <p className="text-[10px] text-[var(--text-muted)] mt-2">{pa.privacy}</p>
    </div>
  )
}
