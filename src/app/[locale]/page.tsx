'use client'
import Link from 'next/link'
import Image from 'next/image'
import AnalogyToggle from '@/components/AnalogyToggle'
import SearchBar from '@/components/SearchBar'
import { useAnalogy } from '@/contexts/AnalogyContext'
import TechIllustration, { getAnalogyVariant } from '@/components/TechIllustration'
import ActionCTA from '@/components/ActionCTA'
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
      darkBg: '#1e3a5f',
    },
    {
      href: `/${locale}/comparateur`,
      title: t.home.featureComparatorTitle,
      desc: t.home.featureComparatorDesc,
      cta: t.home.featureComparatorCta,
      color: '#0891b2',
      bg: '#ecfeff',
      darkBg: '#164e63',
    },
    {
      href: `/${locale}/glossaire`,
      title: t.home.featureGlossaryTitle,
      desc: t.home.featureGlossaryDesc,
      cta: t.home.featureGlossaryCta,
      color: '#7c3aed',
      bg: '#f5f3ff',
      darkBg: '#3b1f6e',
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
      {/* -- HERO BANNIERE PLEINE LARGEUR -- */}
      <section className="hero-home" style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 45%, #4338ca 100%)',
        padding: 'clamp(2.5rem, 6vw, 5rem) 0 clamp(3rem, 7vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Formes decoratives */}
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
            <h1 className="font-bold text-white mb-5 leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}>
              {t.home.heroTitle.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h1>
            <p className="text-white/80 leading-relaxed mb-10"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '36rem', margin: '0 auto 2.5rem' }}>
              {t.home.heroSubtitle.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/comparateur`}
                className="inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all hover:-translate-y-0.5 w-full sm:w-auto"
                style={{
                  background: 'white', color: '#1e3a8a',
                  padding: '0.875rem 1.5rem', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                  minHeight: '48px',
                }}>
                {t.home.heroCta}
              </Link>
              <Link href={`/${locale}/guide`}
                className="inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:bg-white/10 w-full sm:w-auto"
                style={{
                  background: 'transparent', color: 'white',
                  border: '2px solid rgba(255,255,255,0.6)',
                  padding: '0.875rem 1.5rem', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                  minHeight: '48px',
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
            <path d="M0,48 L0,24 Q360,0 720,24 Q1080,48 1440,24 L1440,48 Z" style={{ fill: 'var(--bg)' }} />
          </svg>
        </div>
      </section>

      {/* -- BARRE DE RECHERCHE -- */}
      <section className="bg-[var(--bg)]" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2 text-[var(--text)]">
            {t.home.searchTitle}
          </h2>
          <p className="text-center mb-6 text-[var(--text-muted)]">
            {t.home.searchSubtitle}
          </p>
          <SearchBar />
        </div>
      </section>

      {/* -- SECTION ANALOGIES ENCADREE -- */}
      <section className="bg-[var(--bg-subtle)]" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden bg-[var(--bg)] border border-[var(--border)]" style={{ borderWidth: '1.5px' }}>

            {/* En-tete de la section */}
            <div className="px-4 sm:px-8 py-5 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
              <h2 className="text-xl font-bold text-[var(--text)]">
                {t.home.analogyTitle}
              </h2>
              <p className="text-sm mt-1 text-[var(--text-muted)]">
                {t.home.analogySubtitle}
              </p>
            </div>

            {/* Corps 2 colonnes */}
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: '280px' }}>

              {/* Colonne gauche : toggle */}
              <div className="flex flex-col justify-center px-4 sm:px-8 py-6 md:border-r border-[var(--border)]">
                <p className="font-bold text-lg mb-1 text-[var(--text)]">{t.home.analogyStyle}</p>
                <p className="text-sm mb-4 text-[var(--text-muted)]">
                  {t.home.analogyDesc}
                </p>
                <AnalogyToggle variant="card" />
                <p className="text-sm mt-3 text-[var(--text-muted)]">
                  {t.home.analogyChangeAnytime}
                </p>
              </div>

              {/* Colonne droite : 6 dimensions verticales */}
              <div className="px-4 sm:px-8 py-6">
                <p className="text-sm font-semibold uppercase tracking-wider mb-5 text-[var(--text-muted)]">
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
                          <div className="font-semibold text-[var(--text)]" style={{ fontSize: '0.9375rem' }}>
                            {analogy.name}
                          </div>
                          <div className="text-sm text-[var(--text-muted)]" style={{ lineHeight: 1.4 }}>
                            {analogy.short}
                          </div>
                        </div>
                        <span className="shrink-0 text-sm px-2.5 py-0.5 rounded-full mt-0.5 bg-[var(--bg-card)] text-[var(--text-muted)]"
                          style={{ whiteSpace: 'nowrap' }}>
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

      {/* -- FEATURE CARDS -- */}
      <section className="section bg-[var(--bg)]">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-2 text-[var(--text)]">{t.home.featuresTitle}</h2>
          <p className="text-center mb-10 text-[var(--text-subtle)]">{t.home.featuresSubtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(f => (
              <Link key={f.href} href={f.href} className="card block hover:no-underline"
                style={{ background: 'var(--bg-card)', borderColor: f.color + '30' }}>
                <h3 className="text-xl font-bold mb-3 text-[var(--text)]">{f.title}</h3>
                <p className="leading-relaxed mb-5 text-[var(--text-subtle)]">{f.desc}</p>
                <span className="font-semibold" style={{ color: f.color }}>{f.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -- REASSURANCES -- */}
      <section className="section bg-[var(--bg-subtle)]">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {reassurances.map(r => (
              <div key={r.label} className="text-center">
                <div className="font-semibold mb-1 text-[var(--text)]">{r.label}</div>
                <div className="text-sm text-[var(--text-muted)]">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- WARM ILLUSTRATION: Happy people with technology -- */}
      <section className="section bg-[var(--bg)]">
        <div className="container max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-[var(--border)]"
            style={{ background: 'var(--bg-subtle)' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Scene 1 */}
              <div className="flex flex-col items-center justify-center p-5 sm:p-8 text-center border-b md:border-b-0 md:border-r border-[var(--border)]">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'var(--accent-bg)', fontSize: '2.5rem' }}>
                  👵
                </div>
                <p className="text-sm font-semibold text-[var(--text)] mb-1">
                  {locale === 'fr' ? 'Simple et clair' : 'Simple and clear'}
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {locale === 'fr'
                    ? 'Pas de jargon technique. On vous parle comme un ami.'
                    : 'No tech jargon. We talk to you like a friend.'}
                </p>
              </div>
              {/* Scene 2 */}
              <div className="flex flex-col items-center justify-center p-5 sm:p-8 text-center border-b md:border-b-0 md:border-r border-[var(--border)]">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'var(--accent-bg)', fontSize: '2.5rem' }}>
                  👨‍👧
                </div>
                <p className="text-sm font-semibold text-[var(--text)] mb-1">
                  {locale === 'fr' ? 'Pour toute la famille' : 'For the whole family'}
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {locale === 'fr'
                    ? 'Aidez vos parents ou grands-parents à choisir.'
                    : 'Help your parents or grandparents choose.'}
                </p>
              </div>
              {/* Scene 3 */}
              <div className="flex flex-col items-center justify-center p-5 sm:p-8 text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'var(--accent-bg)', fontSize: '2.5rem' }}>
                  😊
                </div>
                <p className="text-sm font-semibold text-[var(--text)] mb-1">
                  {locale === 'fr' ? 'Achat sans stress' : 'Stress-free shopping'}
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {locale === 'fr'
                    ? 'Recommandations honnêtes, sans pression de vente.'
                    : 'Honest recommendations, no sales pressure.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- FAQ -- */}
      <section className="section bg-[var(--bg)]">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2 text-[var(--text)]">{t.home.faqTitle}</h2>
          <p className="text-center mb-10 text-[var(--text-subtle)]">{t.home.faqSubtitle}</p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="card cursor-pointer" style={{ padding: '1.25rem 1.5rem' }}>
                <summary className="font-semibold list-none flex items-center justify-between gap-4 text-[var(--text)]"
                  style={{ fontSize: '1.0625rem' }}>
                  {faq.q}
                  <span className="text-xl shrink-0 text-[var(--accent)]">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-[var(--text-subtle)]">{faq.a}</p>
              </details>
            ))}
          </div>
          <p className="text-center mt-6 text-sm text-[var(--text-muted)]">
            {t.home.faqGlossaryHint}{' '}
            <Link href={`/${locale}/glossaire`} className="underline text-[var(--accent)]">
              {t.home.faqGlossaryLink}
            </Link>{' '}
            {t.home.faqGlossaryEnd}
          </p>
        </div>
      </section>

      {/* -- Expert + Don -- */}
      <section className="section bg-[var(--bg)]">
        <div className="container max-w-2xl mx-auto">
          <ActionCTA variant="inline" />
        </div>
      </section>

      {/* -- BOTTOM CTA -- */}
      <section className="section bg-blue-600">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">{t.home.bottomCtaTitle}</h2>
          <p className="text-base sm:text-lg mb-8 text-white/80">
            {t.home.bottomCtaSubtitle}
          </p>
          <Link href={`/${locale}/comparateur`}
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold py-3.5 px-6 sm:px-10 rounded-xl text-base sm:text-lg transition-transform hover:-translate-y-0.5 w-full sm:w-auto"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.2)', minHeight: '48px' }}>
            {t.home.bottomCtaButton}
          </Link>
        </div>
      </section>
    </>
  )
}
