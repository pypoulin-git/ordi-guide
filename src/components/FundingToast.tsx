'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/i18n/DictionaryContext'

/**
 * One-time toast notification for returning visitors.
 * Announces the new funding model (affiliates, ad spot, support).
 * Shows once per device, stored in localStorage.
 */
export default function FundingToast() {
  const [visible, setVisible] = useState(false)
  const { t, locale } = useTranslation()

  useEffect(() => {
    // Only show to returning visitors who haven't seen it yet
    const seen = localStorage.getItem('funding_toast_seen')
    const hasVisited = localStorage.getItem('cookie_consent') !== null
      || localStorage.getItem('theme') !== null
      || document.cookie.length > 0

    if (!seen && hasVisited) {
      // Small delay so it doesn't compete with page load
      const timer = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  function dismiss() {
    setVisible(false)
    localStorage.setItem('funding_toast_seen', '1')
  }

  if (!visible) return null

  const isFr = locale === 'fr'

  return (
    <div
      className="fixed bottom-20 right-4 z-40 max-w-sm"
      style={{ animation: 'slideInRight 0.3s ease-out' }}
      role="status"
      aria-live="polite"
    >
      <div
        className="card shadow-lg"
        style={{ padding: '1.25rem', border: '1px solid var(--accent)', borderLeft: '4px solid var(--accent)' }}
      >
        <div className="flex items-start gap-3">
          <span className="text-xl shrink-0" aria-hidden="true">💡</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--text)] mb-1">
              {isFr ? 'Du nouveau chez Shop Compy' : 'What\'s new at Shop Compy'}
            </p>
            <p className="text-sm text-[var(--text-subtle)] leading-relaxed">
              {isFr
                ? 'On a ajouté quelques options pour financer le site. Tout reste gratuit et honnête.'
                : 'We\'ve added a few options to fund the site. Everything stays free and honest.'}
            </p>
            <Link
              href={`/${locale}/about#financement`}
              className="text-sm font-medium text-[var(--accent)] hover:underline mt-1.5 inline-block"
              onClick={dismiss}
            >
              {isFr ? 'En savoir plus →' : 'Learn more →'}
            </Link>
          </div>
          <button
            onClick={dismiss}
            className="shrink-0 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors p-0.5"
            aria-label={isFr ? 'Fermer' : 'Close'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
