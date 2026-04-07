'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/i18n/DictionaryContext'

const STORAGE_KEY = 'affiliate-dismissed'

export default function AffiliateDisclosure() {
  const { t, locale } = useTranslation()
  // Default to true (hidden) to prevent flash on hydration
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    setDismissed(sessionStorage.getItem(STORAGE_KEY) === '1')
  }, [])

  if (dismissed) return null

  const handleDismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setDismissed(true)
  }

  return (
    <div
      className="w-full mt-1 border-b border-[var(--border)]"
      style={{ backgroundColor: 'var(--bg-subtle)' }}
    >
      <div className="container max-w-6xl mx-auto flex items-center gap-2 py-2.5 px-4 text-xs text-[var(--text-muted)]">
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="shrink-0 opacity-60"
          aria-hidden="true"
        >
          <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 12.5a5.5 5.5 0 110-11 5.5 5.5 0 010 11zM8 4a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 4zm0 6.5a.75.75 0 100 1.5.75.75 0 000-1.5z" />
        </svg>
        <span>
          {t.affiliate.disclosure}{' '}
          <Link
            href={`/${locale}/about#funding`}
            className="underline hover:text-[var(--accent)]"
          >
            {t.affiliate.learnMore}
          </Link>
        </span>
        <button
          onClick={handleDismiss}
          className="ml-auto shrink-0 p-2 -mr-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
          aria-label={t.affiliate.dismiss}
          style={{ minWidth: '44px', minHeight: '44px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
