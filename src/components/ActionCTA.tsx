'use client'
import { useTranslation } from '@/i18n/DictionaryContext'

const DONATE_URL = process.env.NEXT_PUBLIC_STRIPE_DONATION_URL
  || 'https://donate.stripe.com/7sY8wI9N79Vx45pdKP2Ry00'

const SUPPORT_URL = process.env.NEXT_PUBLIC_STRIPE_SUPPORT_URL
  || 'https://buy.stripe.com/3cIaEQaRb3x9dFZ0Y32Ry01'

interface ActionCTAProps {
  /** 'full' = 2 cards side by side (footer), 'compact' = single row inline */
  variant?: 'full' | 'compact' | 'inline'
  className?: string
}

export default function ActionCTA({ variant = 'full', className = '' }: ActionCTAProps) {
  const { locale } = useTranslation()
  const isFr = locale === 'fr'

  if (variant === 'inline') {
    return (
      <div className={`flex flex-col sm:flex-row gap-3 justify-center ${className}`}>
        <a
          href={SUPPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
          style={{ background: 'var(--accent)', color: 'white' }}
        >
          💬 {isFr ? 'Demander à un expert — 5 $' : 'Ask an expert — $5'}
        </a>
        <a
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm border-2 transition-colors"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
        >
          ☕ {isFr ? 'Faire un don' : 'Make a donation'}
        </a>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`rounded-xl p-5 ${className}`} style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
        <p className="text-center text-sm font-semibold text-[var(--text)] mb-3">
          {isFr ? 'Besoin d\'aide personnalisée ?' : 'Need personalized help?'}
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
            style={{ background: 'var(--accent)', color: 'white' }}
          >
            💬 {isFr ? 'Poser ma question — 5 $' : 'Ask my question — $5'}
          </a>
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm border-2 transition-colors"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          >
            ☕ {isFr ? 'Soutenir le projet' : 'Support the project'}
          </a>
        </div>
        <p className="text-center text-xs text-[var(--text-muted)] mt-2.5">
          {isFr ? 'Un humain te répond en 24h. Remboursé si on ne peut pas aider.' : 'A human answers within 24h. Refunded if we can\'t help.'}
        </p>
      </div>
    )
  }

  // variant === 'full' — used in footer
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${className}`}>
      {/* Expert card */}
      <div className="rounded-xl p-6 text-center" style={{ background: 'var(--bg-card)', border: '2px solid var(--accent)' }}>
        <span className="text-3xl mb-2 block">💬</span>
        <h3 className="font-bold text-[var(--text)] mb-1 text-lg">
          {isFr ? 'Demander à un expert' : 'Ask an expert'}
        </h3>
        <p className="text-sm text-[var(--text-subtle)] mb-4 leading-relaxed">
          {isFr
            ? 'Pose ta question, un humain te répond en 24h.'
            : 'Ask your question, a human answers within 24h.'}
        </p>
        <a
          href={SUPPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors w-full"
          style={{ background: 'var(--accent)', color: 'white' }}
        >
          {isFr ? 'Poser ma question — 5 $' : 'Ask my question — $5'}
        </a>
        <p className="text-xs text-[var(--text-muted)] mt-2">
          {isFr ? 'Remboursé si on ne peut pas t\'aider' : 'Refunded if we can\'t help'}
        </p>
      </div>

      {/* Donation card */}
      <div className="rounded-xl p-6 text-center" style={{ background: 'var(--bg-card)', border: '2px dashed var(--border)' }}>
        <span className="text-3xl mb-2 block">☕</span>
        <h3 className="font-bold text-[var(--text)] mb-1 text-lg">
          {isFr ? 'Soutenir Shop Compy' : 'Support Shop Compy'}
        </h3>
        <p className="text-sm text-[var(--text-subtle)] mb-4 leading-relaxed">
          {isFr
            ? 'Le site est gratuit et le restera. Ton don aide à le maintenir.'
            : 'The site is free and will stay free. Your donation helps keep it running.'}
        </p>
        <a
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border-2 transition-colors w-full"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
        >
          {isFr ? 'Faire un don' : 'Make a donation'}
        </a>
        <p className="text-xs text-[var(--text-muted)] mt-2">
          {isFr ? 'Montant au choix' : 'Any amount'}
        </p>
      </div>
    </div>
  )
}
