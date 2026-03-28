'use client'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function CookieConsent() {
  const { t } = useTranslation()
  const c = t.cookie
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      setVisible(true)
    }
  }, [])

  function handleChoice(value: 'accepted' | 'refused') {
    localStorage.setItem('cookie_consent', value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--bg-card)]"
      style={{ backdropFilter: 'blur(12px)' }}>
      <div className="container py-4 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-[var(--text-subtle)] flex-1">
          {c.cookieMessage}
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => handleChoice('refused')}
            className="px-4 py-2 rounded-lg border-2 border-[var(--accent)] text-sm font-medium text-[var(--accent)] hover:bg-[var(--bg-subtle)] transition-colors"
          >
            {c.cookieRefuse}
          </button>
          <button
            onClick={() => handleChoice('accepted')}
            className="px-4 py-2 rounded-lg border-2 border-[var(--accent)] bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {c.cookieAccept}
          </button>
        </div>
      </div>
    </div>
  )
}
