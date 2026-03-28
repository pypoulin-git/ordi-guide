'use client'
import { useTranslation } from '@/i18n/DictionaryContext'

interface DonationBoxProps {
  className?: string
}

const DONATE_URL = process.env.NEXT_PUBLIC_STRIPE_DONATION_URL
  || 'https://donate.stripe.com/7sY8wI9N79Vx45pdKP2Ry00'

export default function DonationBox({ className = '' }: DonationBoxProps) {
  const { t, locale } = useTranslation()
  const d = t.donation

  return (
    <div className={`border-2 border-dashed border-[var(--border)] bg-[var(--bg-subtle)] rounded-xl p-6 text-center ${className}`}>
      <p className="font-semibold text-[var(--text)] mb-1">{d.donationTitle}</p>
      <p className="text-sm text-[var(--text-subtle)] mb-4">{d.donationSubtitle}</p>

      <a
        href={DONATE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent-dark)] transition-colors"
      >
        {locale === 'fr' ? 'Faire un don' : 'Make a donation'} ☕
      </a>

      <p className="text-xs text-[var(--text-muted)] mt-4">{d.donationThanks}</p>
    </div>
  )
}
