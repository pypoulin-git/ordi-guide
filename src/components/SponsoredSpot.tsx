'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/i18n/DictionaryContext'

interface SponsoredSpotProps {
  className?: string
}

export default function SponsoredSpot({ className = '' }: SponsoredSpotProps) {
  const { t, locale } = useTranslation()
  const s = t.sponsored
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    setConsented(consent === 'accepted')
  }, [])

  if (!consented) return null

  return (
    <div className={`border-2 border-dashed border-[var(--border)] bg-[var(--bg-subtle)] rounded-xl p-5 ${className}`}>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
        {s.sponsoredLabel}
      </p>

      {/* Placeholder for AdSense */}
      <div
        id="adsense-spot"
        className="min-h-[90px] flex items-center justify-center rounded-lg bg-[var(--bg)] border border-[var(--border)]"
      >
        <span className="text-xs text-[var(--text-muted)]">Ad</span>
      </div>

      <p className="text-xs text-[var(--text-muted)] mt-3">
        {s.sponsoredFunds}{' '}
        <Link
          href={`/${locale}/about#financement`}
          className="underline hover:text-[var(--accent)] transition-colors"
        >
          {s.sponsoredLearnMore}
        </Link>
      </p>
    </div>
  )
}
