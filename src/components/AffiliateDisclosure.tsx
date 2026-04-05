'use client'

import Link from 'next/link'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function AffiliateDisclosure() {
  const { t, locale } = useTranslation()

  return (
    <div
      className="w-full border-b border-[var(--border)]"
      style={{ backgroundColor: 'var(--bg-subtle)' }}
    >
      <div className="container max-w-6xl mx-auto flex items-center gap-2 py-2 px-4 text-xs text-[var(--text-muted)]">
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
      </div>
    </div>
  )
}
