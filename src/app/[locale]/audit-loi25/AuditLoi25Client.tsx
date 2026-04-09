'use client'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function AuditLoi25Client() {
  const { t, locale } = useTranslation()
  const a = t.auditLoi25

  // Tier data — keys are flat strings (Dictionary type constraint)
  const tier1Features = [a.tier1Feat1, a.tier1Feat2, a.tier1Feat3, a.tier1Feat4, a.tier1Feat5, a.tier1Feat6]
  const tier2Features = [a.tier2Feat1, a.tier2Feat2, a.tier2Feat3, a.tier2Feat4, a.tier2Feat5, a.tier2Feat6, a.tier2Feat7]
  const tier3Features = [a.tier3Feat1, a.tier3Feat2, a.tier3Feat3, a.tier3Feat4, a.tier3Feat5, a.tier3Feat6, a.tier3Feat7]

  const steps = [
    { day: a.step1Day, title: a.step1Title },
    { day: a.step2Day, title: a.step2Title },
    { day: a.step3Day, title: a.step3Title },
    { day: a.step4Day, title: a.step4Title },
  ]

  const diffs = [
    { title: a.diff1Title, desc: a.diff1Desc },
    { title: a.diff2Title, desc: a.diff2Desc },
    { title: a.diff3Title, desc: a.diff3Desc },
    { title: a.diff4Title, desc: a.diff4Desc },
  ]

  // Contact link for "ask a question first" CTA
  const contactHref = `/${locale}/contact`

  return (
    <>
      <PageHero
        title={a.heroTitle}
        subtitle={a.heroSubtitle}
        badge={a.heroBadge}
        gradient="linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)"
      />

      {/* Why this matters */}
      <section className="section" style={{ paddingTop: '2.5rem', paddingBottom: '2rem' }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--text)]">{a.whyTitle}</h2>
            <p className="text-base md:text-lg leading-relaxed text-[var(--text-subtle)] mb-4">
              {a.whyIntro}
            </p>
            <p
              className="inline-block text-sm font-semibold px-4 py-2 rounded-lg"
              style={{
                background: 'var(--accent-bg)',
                color: 'var(--accent)',
                border: '1px solid var(--accent)',
              }}
            >
              {a.whyAmount}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="section" style={{ paddingTop: '2rem', background: 'var(--bg-subtle)' }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[var(--text)]">{a.tiersTitle}</h2>
            <p className="text-base text-[var(--text-subtle)]">{a.tiersSubtitle}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {/* Tier 1 — Express */}
            <article
              className="card flex flex-col"
              style={{ padding: 'clamp(1.5rem, 4vw, 2rem)' }}
            >
              <header className="mb-4">
                <h3 className="text-xl font-bold text-[var(--text)] mb-1">{a.tier1Name}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-3" style={{ minHeight: '2.5rem' }}>{a.tier1For}</p>
                <div>
                  <span className="text-3xl font-bold text-[var(--text)]">{a.tier1Price}</span>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{a.tier1PriceUnit}</p>
                </div>
              </header>

              <ul className="flex-1 space-y-2 mb-6 text-sm text-[var(--text-subtle)]">
                {tier1Features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5" aria-hidden>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={contactHref} className="btn-outline w-full text-center mt-auto" style={{ minHeight: '44px' }}>
                {a.tier1Cta}
              </Link>
            </article>

            {/* Tier 2 — Standard (POPULAR) */}
            <article
              className="card relative flex flex-col"
              style={{
                padding: 'clamp(1.5rem, 4vw, 2rem)',
                border: '2px solid var(--accent)',
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.12)',
              }}
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ background: 'var(--accent)' }}
              >
                {a.tier2Badge}
              </div>

              <header className="mb-4">
                <h3 className="text-xl font-bold text-[var(--text)] mb-1">{a.tier2Name}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-3" style={{ minHeight: '2.5rem' }}>{a.tier2For}</p>
                <div>
                  <span className="text-3xl font-bold text-[var(--accent)]">{a.tier2Price}</span>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{a.tier2PriceUnit}</p>
                </div>
              </header>

              <ul className="flex-1 space-y-2 mb-6 text-sm text-[var(--text-subtle)]">
                {tier2Features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5" aria-hidden>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={contactHref} className="btn-primary w-full text-center mt-auto" style={{ minHeight: '44px' }}>
                {a.tier2Cta}
              </Link>
            </article>

            {/* Tier 3 — Complet */}
            <article
              className="card flex flex-col"
              style={{ padding: 'clamp(1.5rem, 4vw, 2rem)' }}
            >
              <header className="mb-4">
                <h3 className="text-xl font-bold text-[var(--text)] mb-1">{a.tier3Name}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-3" style={{ minHeight: '2.5rem' }}>{a.tier3For}</p>
                <div>
                  <span className="text-3xl font-bold text-[var(--text)]">{a.tier3Price}</span>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{a.tier3PriceUnit}</p>
                </div>
              </header>

              <ul className="flex-1 space-y-2 mb-6 text-sm text-[var(--text-subtle)]">
                {tier3Features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5" aria-hidden>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={contactHref} className="btn-outline w-full text-center mt-auto" style={{ minHeight: '44px' }}>
                {a.tier3Cta}
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[var(--text)] text-center">
            {a.processTitle}
          </h2>
          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-4 p-4 rounded-lg border border-[var(--border)]"
                style={{ background: 'var(--bg-card)' }}
              >
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm shrink-0"
                  style={{
                    background: 'var(--accent-bg)',
                    color: 'var(--accent)',
                    border: '1px solid var(--accent)',
                  }}
                  aria-hidden
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-1">{s.day}</p>
                  <p className="text-base font-medium text-[var(--text)]">{s.title}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section" style={{ background: 'var(--bg-subtle)' }}>
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[var(--text)] text-center">
            {a.diffTitle}
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {diffs.map((d, i) => (
              <div
                key={i}
                className="card"
                style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}
              >
                <h3 className="text-lg font-bold mb-2 text-[var(--text)]">{d.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--text-subtle)]">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container">
          <div
            className="max-w-2xl mx-auto text-center p-8 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              color: 'white',
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'white' }}>
              {a.ctaTitle}
            </h2>
            <p className="text-base md:text-lg mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {a.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={contactHref}
                className="btn-primary"
                style={{ minHeight: '48px', padding: '0.875rem 2rem' }}
              >
                {a.ctaButton}
              </Link>
              <Link
                href={contactHref}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium border-2 transition-colors"
                style={{
                  borderColor: 'rgba(255,255,255,0.4)',
                  color: 'white',
                  minHeight: '48px',
                }}
              >
                {a.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="section" style={{ paddingTop: '0', paddingBottom: '3rem' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <p className="text-xs text-[var(--text-muted)] italic">{a.disclaimer}</p>
        </div>
      </section>
    </>
  )
}
