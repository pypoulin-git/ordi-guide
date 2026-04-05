'use client'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function AboutClient() {
  const { t, locale } = useTranslation()
  const a = t.about

  return (
    <>
      {/* Hero */}
      <PageHero
        title={a.heroTitle}
        subtitle={a.heroSubtitle}
        gradient="linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #334155 100%)"
      />

      {/* Histoire 1 : Dell */}
      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2.5rem)', borderLeft: '4px solid var(--accent)' }}>
            <p className="text-sm font-semibold uppercase tracking-wider mb-4 text-[var(--accent)]">
              {a.origin}
            </p>
            <blockquote className="text-lg sm:text-xl leading-relaxed mb-3 text-[var(--text)]" style={{ fontStyle: 'italic' }}>
              &laquo;&nbsp;{a.originQuote}&nbsp;&raquo;
            </blockquote>
            <p className="text-sm text-[var(--text-muted)] text-right font-medium">
              — {locale === 'fr' ? 'Le propriétaire' : 'The owner'}
            </p>
          </div>

          <div className="mt-6 text-[var(--text-subtle)]">
            <p className="leading-relaxed mb-5">{a.originP1}</p>
          </div>

          {/* Nostalgic computer shop photo */}
          <div className="my-8 max-w-2xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/ImageKiosque.png"
                alt={locale === 'fr'
                  ? 'Le kiosque Compu-Station dans un centre commercial québécois, années 2000'
                  : 'The Compu-Station kiosk in a Quebec shopping mall, early 2000s'}
                width={900}
                height={500}
                className="w-full h-auto"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <p className="text-center text-sm italic mt-3 text-[var(--text-muted)]">
              {locale === 'fr'
                ? 'Les boutiques informatiques des années 2000 — une autre époque.'
                : 'Computer shops from the 2000s — a different era.'}
            </p>
          </div>

          <div className="text-[var(--text-subtle)]">
            <p className="leading-relaxed">{a.originP2}</p>
          </div>
        </div>
      </section>

      {/* Histoire 2 : aujourd'hui */}
      <section className="section bg-[var(--bg-subtle)]">
        <div className="container max-w-3xl mx-auto">
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2.5rem)', borderLeft: '4px solid #7c3aed' }}>
            <p className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#7c3aed' }}>
              {a.today}
            </p>
            <blockquote className="text-lg sm:text-xl leading-relaxed mb-0 text-[var(--text)]" style={{ fontStyle: 'italic' }}>
              &laquo;&nbsp;{a.todayQuote}&nbsp;&raquo;
            </blockquote>
          </div>

          <div className="mt-6 text-[var(--text-subtle)]">
            <p className="leading-relaxed">{a.todayP1}</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-3 text-[var(--text)]">{a.missionTitle}</h2>
          <p className="leading-relaxed mb-8 text-[var(--text-subtle)]">{a.missionIntro}</p>

          <div className="space-y-4">
            <div className="card flex gap-3 sm:gap-5 items-start" style={{ padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 2rem)' }}>
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white bg-blue-600"
                style={{ fontSize: '1rem' }}>1</div>
              <div>
                <h3 className="font-bold mb-1 text-[var(--text)]" style={{ fontSize: '1.0625rem' }}>{a.step1Title}</h3>
                <p className="text-[var(--text-subtle)]" style={{ fontSize: '0.9375rem' }}>{a.step1Desc}</p>
              </div>
            </div>

            <div className="card flex gap-3 sm:gap-5 items-start" style={{ padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 2rem)' }}>
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: '#7c3aed', fontSize: '1rem' }}>2</div>
              <div>
                <h3 className="font-bold mb-1 text-[var(--text)]" style={{ fontSize: '1.0625rem' }}>{a.step2Title}</h3>
                <p className="text-[var(--text-subtle)]" style={{ fontSize: '0.9375rem' }}>{a.step2Desc}</p>
              </div>
            </div>

            <div className="card flex gap-3 sm:gap-5 items-start" style={{ padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 2rem)' }}>
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: '#0891b2', fontSize: '1rem' }}>3</div>
              <div>
                <h3 className="font-bold mb-1 text-[var(--text)]" style={{ fontSize: '1.0625rem' }}>{a.step3Title}</h3>
                <p className="text-[var(--text-subtle)]" style={{ fontSize: '0.9375rem' }}>{a.step3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How we recommend */}
      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-[var(--text)]">{a.methodTitle}</h2>
          <p className="leading-relaxed mb-8 text-[var(--text-subtle)]">{a.methodSubtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* AI-Powered Analysis */}
            <div className="card" style={{ padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 2rem)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                style={{ background: 'var(--accent-bg)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93" /><path d="M8.24 9.93A4 4 0 0 1 12 2" /><path d="M12 22v-6" /><path d="M6 18h12" /><circle cx="12" cy="14" r="2" /><path d="M17 10h3" /><path d="M4 10h3" />
                </svg>
              </div>
              <h3 className="font-bold mb-1 text-[var(--text)]" style={{ fontSize: '1.0625rem' }}>{a.method1Title}</h3>
              <p className="text-[var(--text-subtle)]" style={{ fontSize: '0.9375rem' }}>{a.method1Desc}</p>
            </div>

            {/* Real Prices */}
            <div className="card" style={{ padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 2rem)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                style={{ background: '#dcfce715', color: 'var(--success)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="font-bold mb-1 text-[var(--text)]" style={{ fontSize: '1.0625rem' }}>{a.method2Title}</h3>
              <p className="text-[var(--text-subtle)]" style={{ fontSize: '0.9375rem' }}>{a.method2Desc}</p>
            </div>

            {/* No Pay-to-Play */}
            <div className="card" style={{ padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 2rem)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                style={{ background: '#fef3c715', color: 'var(--warn)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-bold mb-1 text-[var(--text)]" style={{ fontSize: '1.0625rem' }}>{a.method3Title}</h3>
              <p className="text-[var(--text-subtle)]" style={{ fontSize: '0.9375rem' }}>{a.method3Desc}</p>
            </div>

            {/* Updated Weekly */}
            <div className="card" style={{ padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 2rem)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                style={{ background: '#ede9fe15', color: '#7c3aed' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
              </div>
              <h3 className="font-bold mb-1 text-[var(--text)]" style={{ fontSize: '1.0625rem' }}>{a.method4Title}</h3>
              <p className="text-[var(--text-subtle)]" style={{ fontSize: '0.9375rem' }}>{a.method4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Funding / Transparency */}
      <section className="section bg-[var(--bg-subtle)]">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-3 text-[var(--text)]">{t.funding.fundingTitle}</h2>
          <p className="leading-relaxed mb-8 text-[var(--text-subtle)]">{t.funding.fundingIntro}</p>

          {/* Donation box — full width */}
          <div className="rounded-xl p-6 mb-6 text-center" style={{ background: 'var(--accent-bg)', border: '2px dashed var(--accent)' }}>
            <span className="text-3xl block mb-2">☕</span>
            <h3 className="font-bold text-lg text-[var(--text)] mb-1">
              {locale === 'fr' ? 'Soutenir Shop Compy' : 'Support Shop Compy'}
            </h3>
            <p className="text-sm text-[var(--text-subtle)] mb-4 max-w-md mx-auto">
              {locale === 'fr'
                ? 'Le site est 100 % gratuit. Si tu trouves ça utile, un petit don nous aide à continuer.'
                : 'The site is 100% free. If you find it useful, a small donation helps us keep going.'}
            </p>
            <a
              href={process.env.NEXT_PUBLIC_STRIPE_DONATION_URL || 'https://donate.stripe.com/7sY8wI9N79Vx45pdKP2Ry00'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
              style={{ background: 'var(--accent)', color: 'white' }}
            >
              {locale === 'fr' ? 'Faire un don — montant au choix' : 'Make a donation — any amount'}
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="card" style={{ padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 2rem)' }}>
              <div className="text-2xl mb-2">🔗</div>
              <h3 className="font-bold mb-1 text-[var(--text)]" style={{ fontSize: '1.0625rem' }}>{t.funding.fundingAffiliateTitle}</h3>
              <p className="text-[var(--text-subtle)]" style={{ fontSize: '0.9375rem' }}>{t.funding.fundingAffiliateDesc}</p>
            </div>
            <div className="card" style={{ padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 2rem)' }}>
              <div className="text-2xl mb-2">📢</div>
              <h3 className="font-bold mb-1 text-[var(--text)]" style={{ fontSize: '1.0625rem' }}>{t.funding.fundingPartnerTitle}</h3>
              <p className="text-[var(--text-subtle)]" style={{ fontSize: '0.9375rem' }}>{t.funding.fundingPartnerDesc}</p>
            </div>
            <div className="card" style={{ padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 2rem)' }}>
              <div className="text-2xl mb-2">🎁</div>
              <h3 className="font-bold mb-1 text-[var(--text)]" style={{ fontSize: '1.0625rem' }}>{t.funding.fundingGiftTitle}</h3>
              <p className="text-[var(--text-subtle)]" style={{ fontSize: '0.9375rem' }}>{t.funding.fundingGiftDesc}</p>
            </div>
            <div className="card" style={{ padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 2rem)' }}>
              <div className="text-2xl mb-2">💬</div>
              <h3 className="font-bold mb-1 text-[var(--text)]" style={{ fontSize: '1.0625rem' }}>{t.funding.fundingSupportTitle}</h3>
              <p className="text-[var(--text-subtle)] mb-3" style={{ fontSize: '0.9375rem' }}>{t.funding.fundingSupportDesc}</p>
              <a
                href={process.env.NEXT_PUBLIC_STRIPE_SUPPORT_URL || 'https://buy.stripe.com/3cIaEQaRb3x9dFZ0Y32Ry01'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                style={{ background: 'var(--accent)', color: 'white' }}
              >
                {locale === 'fr' ? 'Poser ma question — 10 $' : 'Ask my question — $10'}
              </a>
            </div>
          </div>

          <p className="leading-relaxed mb-8 text-[var(--text-subtle)]" style={{ fontSize: '0.9375rem' }}>
            {t.funding.fundingWhy}
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            {[t.funding.fundingBadge1, t.funding.fundingBadge2, t.funding.fundingBadge3].map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium"
                style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Data Management */}
      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-3 text-[var(--text)]">{a.privacyTitle}</h2>
          <p className="leading-relaxed mb-6 text-[var(--text-subtle)]">{a.privacyIntro}</p>

          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2.5rem)' }}>
            <div className="flex gap-4 items-start mb-5">
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent-bg)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <p className="leading-relaxed text-[var(--text-subtle)] mb-4" style={{ fontSize: '0.9375rem' }}>{a.privacyP1}</p>
                <p className="leading-relaxed text-[var(--text-subtle)] mb-4" style={{ fontSize: '0.9375rem' }}>{a.privacyP2}</p>
                <p className="leading-relaxed text-[var(--text-subtle)]" style={{ fontSize: '0.9375rem' }}>{a.privacyP3}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
              <button
                onClick={() => window.dispatchEvent(new Event('manage-cookies'))}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                {a.privacyManageCookies}
              </button>
              <Link
                href={`/${locale}/privacy`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                </svg>
                {a.privacyFullPolicy}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section bg-[var(--bg-subtle)]">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-3 text-[var(--text)]">{a.contactTitle}</h2>
          <p className="leading-relaxed mb-6 text-[var(--text-subtle)]">{a.contactIntro}</p>

          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2.5rem)' }}>
            <div className="flex gap-4 items-start mb-5">
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent-bg)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p className="text-[var(--text)] font-medium mb-1">{a.contactEmail}</p>
                <p className="text-sm text-[var(--text-muted)]">{a.contactResponse}</p>
              </div>
            </div>

            <div className="mt-4 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                style={{ background: 'var(--accent)', color: 'white' }}
              >
                {a.contactCta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Citation finale */}
      <section className="section" style={{ background: '#1e3a8a' }}>
        <div className="container max-w-2xl mx-auto text-center">
          <Image src="/images/compy-logo.png" alt="Shop Compy" width={80} height={80}
            className="mx-auto mb-6 compy-logo" />
          <p className="text-xl sm:text-2xl leading-relaxed text-white/90 mb-6" style={{ fontStyle: 'italic' }}>
            &laquo;&nbsp;{a.finalQuote}&nbsp;&raquo;
          </p>
          <p className="font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {a.founder}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[var(--bg-subtle)] border-t border-[var(--border)]">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3 text-[var(--text)]">{a.ctaTitle}</h2>
          <p className="mb-6 text-[var(--text-subtle)]">{a.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/comparateur`} className="btn-primary">{a.ctaChoose}</Link>
            <Link href={`/${locale}/guide`} className="btn-outline">{a.ctaGuide}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
