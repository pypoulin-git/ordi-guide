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

      {/* Intro */}
      <section className="section">
        <div className="container max-w-3xl mx-auto text-center">
          <p className="text-lg text-[var(--text-subtle)] leading-relaxed">
            {s.supportIntro}
          </p>
        </div>
      </section>

      {/* Single pricing card */}
      <section className="section bg-[var(--bg-subtle)]">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div
              className="card relative flex flex-col text-center"
              style={{ padding: '2.5rem 2rem', border: '2px solid var(--accent)' }}
            >
              <p className="text-4xl font-bold text-[var(--text)] mb-1">5 $</p>
              <p className="font-semibold text-[var(--text)] mb-2">
                {isFr ? '1 question, 1 réponse d\'expert' : '1 question, 1 expert answer'}
              </p>
              <p className="text-sm text-[var(--text-subtle)] mb-6">
                {isFr
                  ? 'Pose ta question par courriel et reçois une réponse personnalisée en moins de 24h.'
                  : 'Ask your question by email and get a personalized answer within 24h.'}
              </p>

              <a
                href={SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                {s.supportCta}
              </a>
            </div>
          </div>
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
                className="inline-block px-4 py-2 rounded-full text-sm bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text-subtle)]"
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
            <Link href={`/${locale}`} className="text-[var(--accent)] font-medium hover:underline">
              {isFr ? '← Retour à l\'accueil' : '← Back to home'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
