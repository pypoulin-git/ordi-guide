'use client'
import Link from 'next/link'
import Image from 'next/image'
import AnalogyToggle from '@/components/AnalogyToggle'
import SearchBar from '@/components/SearchBar'
import { useAnalogy } from '@/contexts/AnalogyContext'
import TechIllustration, { getAnalogyVariant } from '@/components/TechIllustration'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function HomePage() {
  const { a, mode, modeLabel, modeIcon } = useAnalogy()
  const { t, locale } = useTranslation()

  const features = [
    {
      href: `/${locale}/guide`,
      title: t.home.featureGuideTitle,
      desc: t.home.featureGuideDesc,
      cta: t.home.featureGuideCta,
      color: '#2563eb',
      bg: '#eff6ff',
    },
    {
      href: `/${locale}/comparateur`,
      title: t.home.featureComparatorTitle,
      desc: t.home.featureComparatorDesc,
      cta: t.home.featureComparatorCta,
      color: '#0891b2',
      bg: '#ecfeff',
    },
    {
      href: `/${locale}/glossaire`,
      title: t.home.featureGlossaryTitle,
      desc: t.home.featureGlossaryDesc,
      cta: t.home.featureGlossaryCta,
      color: '#7c3aed',
      bg: '#f5f3ff',
    },
  ]

  const reassurances = [
    { label: t.home.reassurance1, desc: t.home.reassurance1Desc },
    { label: t.home.reassurance2, desc: t.home.reassurance2Desc },
    { label: t.home.reassurance3, desc: t.home.reassurance3Desc },
    { label: t.home.reassurance4, desc: t.home.reassurance4Desc },
  ]

  const faqs = [
    { q: t.home.faq1Q, a: t.home.faq1A },
    { q: t.home.faq2Q, a: t.home.faq2A },
    { q: t.home.faq3Q, a: t.home.faq3A },
    { q: t.home.faq4Q, a: t.home.faq4A },
  ]

  return (
    <>
      {/* ── HERO BANNIÈRE PLEINE LARGEUR ── */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 45%, #4338ca 100%)',
        padding: '5rem 0 6rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Formes décoratives */}
        <div aria-hidden style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
        }} />
        <div aria-hidden style={{
          position: 'absolute', bottom: '-60px', left: '10%',
          width: '260px', height: '260px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
        }} />

        <div className="container" style={{ position: 'relative' }}>
          <div className="max-w-3xl mx-auto text-center">
            <Image src="/logo-compy.svg" alt="Shop Compy" width={80} height={80}
              className="mx-auto mb-6" style={{ filter: 'brightness(1.4) drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }} />
            <h1 className="font-bold text-white mb-5 leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}>
              {t.home.heroTitle.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h1>
            <p className="text-white/80 leading-relaxed mb-10"
              style={{ fontSize: '1.25rem', maxWidth: '36rem', margin: '0 auto 2.5rem' }}>
              {t.home.heroSubtitle.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/comparateur`}
                className="inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all hover:-translate-y-0.5"
                style={{
                  background: 'white', color: '#1e3a8a',
                  padding: '1rem 2.25rem', fontSize: '1.0625rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                }}>
                {t.home.heroCta}
              </Link>
              <Link href={`/${locale}/guide`}
                className="inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:bg-white/10"
                style={{
                  background: 'transparent', color: 'white',
                  border: '2px solid rgba(255,255,255,0.6)',
                  padding: '1rem 2.25rem', fontSize: '1.0625rem',
                }}>
                {t.home.heroCtaGuide}
              </Link>
            </div>
          </div>
        </div>

        {/* Vague de transition */}
        <div aria-hidden style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '48px',
        }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path d="M0,48 L0,24 Q360,0 720,24 Q1080,48 1440,24 L1440,48 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── BARRE DE RECHERCHE ── */}
      <section style={{ background: 'white', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: '#0f172a' }}>
            {t.home.searchTitle}
          </h2>
          <p className="text-center mb-6" style={{ color: '#64748b' }}>
            {t.home.searchSubtitle}
          </p>
          <SearchBar />
        </div>
      </section>

      {/* ── SECTION ANALOGIES ENCADRÉE ── */}
      <section style={{ background: '#f8fafc', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid #e2e8f0', background: 'white' }}>

            {/* En-tête de la section */}
            <div className="px-8 py-5" style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <h2 className="text-xl font-bold" style={{ color: '#0f172a' }}>
                {t.home.analogyTitle}
              </h2>
              <p className="text-sm mt-1" style={{ color: '#64748b' }}>
                {t.home.analogySubtitle}
              </p>
            </div>

            {/* Corps 2 colonnes */}
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: '280px' }}>

              {/* Colonne gauche : toggle */}
              <div className="flex flex-col justify-center px-8 py-6"
                style={{ borderRight: '1px solid #e2e8f0' }}>
                <p className="font-bold text-lg mb-1" style={{ color: '#0f172a' }}>{t.home.analogyStyle}</p>
                <p className="text-sm mb-4" style={{ color: '#64748b' }}>
                  {t.home.analogyDesc}
                </p>
                <AnalogyToggle variant="card" />
                <p className="text-xs mt-3" style={{ color: '#94a3b8' }}>
                  {t.home.analogyChangeAnytime}
                </p>
              </div>

              {/* Colonne droite : 6 dimensions verticales */}
              <div className="px-8 py-6">
                <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: '#94a3b8' }}>
                  {modeIcon} {t.home.analogyMode} {modeLabel}
                </p>
                <ul className="space-y-5">
                  {(['cpu', 'ram', 'ssd', 'gpu', 'battery', 'screen'] as const).map(comp => {
                    const analogy = a(comp)
                    return (
                      <li key={comp} className="flex items-start gap-3">
                        <span className="w-9 shrink-0 mt-0.5 flex justify-center">
                          {(() => {
                            const v = getAnalogyVariant(comp, mode)
                            return v ? <TechIllustration variant={v} size={32} /> : <span className="text-2xl">{analogy.icon}</span>
                          })()}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold" style={{ color: '#0f172a', fontSize: '0.9375rem' }}>
                            {analogy.name}
                          </div>
                          <div className="text-sm" style={{ color: '#64748b', lineHeight: 1.4 }}>
                            {analogy.short}
                          </div>
                        </div>
                        <span className="shrink-0 text-xs px-2 py-0.5 rounded-full mt-0.5"
                          style={{ background: '#f1f5f9', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                          {t.comp[comp as keyof typeof t.comp]}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURE CARDS ── */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: '#0f172a' }}>{t.home.featuresTitle}</h2>
          <p className="text-center mb-10" style={{ color: '#475569' }}>{t.home.featuresSubtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(f => (
              <Link key={f.href} href={f.href} className="card block hover:no-underline"
                style={{ background: f.bg, borderColor: f.color + '30' }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0f172a' }}>{f.title}</h3>
                <p className="leading-relaxed mb-5" style={{ color: '#475569' }}>{f.desc}</p>
                <span className="font-semibold" style={{ color: f.color }}>{f.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RÉASSURANCES ── */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {reassurances.map(r => (
              <div key={r.label} className="text-center">
                <div className="font-semibold mb-1" style={{ color: '#0f172a' }}>{r.label}</div>
                <div className="text-sm" style={{ color: '#94a3b8' }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: '#0f172a' }}>{t.home.faqTitle}</h2>
          <p className="text-center mb-10" style={{ color: '#475569' }}>{t.home.faqSubtitle}</p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="card cursor-pointer" style={{ padding: '1.25rem 1.5rem' }}>
                <summary className="font-semibold list-none flex items-center justify-between gap-4"
                  style={{ color: '#0f172a', fontSize: '1.0625rem' }}>
                  {faq.q}
                  <span className="text-xl shrink-0" style={{ color: '#2563eb' }}>+</span>
                </summary>
                <p className="mt-3 leading-relaxed" style={{ color: '#475569' }}>{faq.a}</p>
              </details>
            ))}
          </div>
          <p className="text-center mt-6 text-sm" style={{ color: '#94a3b8' }}>
            {t.home.faqGlossaryHint}{' '}
            <Link href={`/${locale}/glossaire`} className="underline" style={{ color: '#2563eb' }}>
              {t.home.faqGlossaryLink}
            </Link>{' '}
            {t.home.faqGlossaryEnd}
          </p>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="section" style={{ background: '#2563eb' }}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">{t.home.bottomCtaTitle}</h2>
          <p className="text-lg mb-8 text-white/80">
            {t.home.bottomCtaSubtitle}
          </p>
          <Link href={`/${locale}/comparateur`}
            className="inline-flex items-center gap-2 bg-white font-bold py-3 px-8 rounded-xl text-base transition-transform hover:-translate-y-0.5"
            style={{ color: '#2563eb', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
            {t.home.bottomCtaButton}
          </Link>
        </div>
      </section>
    </>
  )
}
