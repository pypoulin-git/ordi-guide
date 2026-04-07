'use client'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { useTranslation } from '@/i18n/DictionaryContext'

const SUPPORT_URL = process.env.NEXT_PUBLIC_STRIPE_SUPPORT_URL
  || 'https://buy.stripe.com/3cIaEQaRb3x9dFZ0Y32Ry01'

export default function SupportClient() {
  const { t, locale } = useTranslation()
  const s = t.support

  const isFr = locale === 'fr'
  const examples = [s.supportEx1, s.supportEx2, s.supportEx3, s.supportEx4]

  return (
    <>
      <PageHero
        title={s.supportHeroTitle}
        subtitle={s.supportHeroSubtitle}
        gradient="linear-gradient(135deg, #064e3b 0%, #059669 50%, #34d399 100%)"
      />

      {/* CTA above the fold — pricing + reassurance */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container">
          <div className="max-w-lg mx-auto">
            <div
              className="card relative flex flex-col text-center"
              style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1.25rem, 4vw, 2rem)', border: '2px solid var(--accent)' }}
            >
              <p className="text-4xl font-bold text-[var(--text)] mb-1">10 $</p>
              <p className="font-semibold text-[var(--text)] mb-2">
                {isFr ? '1 question, 1 réponse d\'expert' : '1 question, 1 expert answer'}
              </p>
              <p className="text-sm text-[var(--text-subtle)] mb-4">
                {isFr
                  ? 'Pose ta question par courriel et reçois une réponse personnalisée en moins de 24h.'
                  : 'Ask your question by email and get a personalized answer within 24h.'}
              </p>

              <a
                href={SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full mb-4"
              >
                {s.supportCta}
              </a>

              {/* Reassurance badges */}
              <div className="flex flex-wrap justify-center gap-3 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  {isFr ? 'Remboursé si sans réponse' : 'Refund if unanswered'}
                </span>
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {isFr ? 'Réponse en 24h' : 'Reply within 24h'}
                </span>
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  {isFr ? 'Paiement sécurisé Stripe' : 'Secure Stripe payment'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <p className="text-lg text-[var(--text-subtle)] leading-relaxed">
            {s.supportIntro}
          </p>
        </div>
      </section>

      {/* Example questions */}
      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-5 text-[var(--text)] text-center">
            {s.supportExamples}
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {examples.map((ex, i) => (
              <span
                key={i}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text-subtle)]"
                style={{ minHeight: '44px' }}
              >
                {ex}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="section bg-[var(--bg-subtle)] border-t border-[var(--border)]">
        <div className="container max-w-3xl mx-auto text-center">
          <p className="text-[var(--text-subtle)] leading-relaxed">
            {isFr
              ? 'Réponse garantie en moins de 24h par courriel. Si on ne peut pas t\'aider, tu es remboursé.'
              : 'Guaranteed response within 24h by email. If we can\'t help, you get a full refund.'}
          </p>
          <div className="mt-6">
            <Link href={`/${locale}`} className="inline-flex items-center text-[var(--accent)] font-medium hover:underline" style={{ minHeight: '44px' }}>
              {isFr ? '← Retour à l\'accueil' : '← Back to home'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
