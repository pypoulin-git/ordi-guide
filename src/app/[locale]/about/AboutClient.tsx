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
          <div className="card" style={{ padding: '2.5rem', borderLeft: '4px solid var(--accent)' }}>
            <p className="text-sm font-semibold uppercase tracking-wider mb-4 text-[--accent]">
              {a.origin}
            </p>
            <blockquote className="text-xl leading-relaxed mb-0 text-[--text]" style={{ fontStyle: 'italic' }}>
              &laquo;&nbsp;{a.originQuote}&nbsp;&raquo;
            </blockquote>
          </div>

          <div className="mt-6 text-[--text-subtle]">
            <p className="leading-relaxed mb-5">{a.originP1}</p>
          </div>

          {/* Nostalgic computer shop photo */}
          <div className="my-8 max-w-2xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/compu-station.jpg"
                alt={locale === 'fr'
                  ? 'Une boutique informatique dans un centre commercial du Québec, années 2000'
                  : 'A computer shop in a Quebec mall, early 2000s'}
                width={800}
                height={500}
                className="w-full h-auto grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none'
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement
                  if (fallback) fallback.style.display = 'flex'
                }}
              />
              {/* Fallback if image not found */}
              <div className="hidden items-center justify-center bg-[--bg-subtle] border border-[--border] rounded-xl"
                style={{ minHeight: '200px' }}>
                <div className="text-center text-[--text-muted] px-6 py-8">
                  <span className="text-4xl block mb-3">🖥️</span>
                  <p className="text-sm italic">
                    {locale === 'fr'
                      ? 'Les boutiques informatiques des années 2000'
                      : 'Computer shops from the 2000s'}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-center text-sm italic mt-3 text-[--text-muted]">
              {locale === 'fr'
                ? 'Les boutiques informatiques des années 2000 — une autre époque.'
                : 'Computer shops from the 2000s — a different era.'}
            </p>
          </div>

          <div className="text-[--text-subtle]">
            <p className="leading-relaxed">{a.originP2}</p>
          </div>
        </div>
      </section>

      {/* Histoire 2 : aujourd'hui */}
      <section className="section bg-[--bg-subtle]">
        <div className="container max-w-3xl mx-auto">
          <div className="card" style={{ padding: '2.5rem', borderLeft: '4px solid #7c3aed' }}>
            <p className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#7c3aed' }}>
              {a.today}
            </p>
            <blockquote className="text-xl leading-relaxed mb-0 text-[--text]" style={{ fontStyle: 'italic' }}>
              &laquo;&nbsp;{a.todayQuote}&nbsp;&raquo;
            </blockquote>
          </div>

          <div className="mt-6 text-[--text-subtle]">
            <p className="leading-relaxed">{a.todayP1}</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-3 text-[--text]">{a.missionTitle}</h2>
          <p className="leading-relaxed mb-8 text-[--text-subtle]">{a.missionIntro}</p>

          <div className="space-y-4">
            <div className="card flex gap-5 items-start" style={{ padding: '1.5rem 2rem' }}>
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white bg-blue-600"
                style={{ fontSize: '1rem' }}>1</div>
              <div>
                <h3 className="font-bold mb-1 text-[--text]" style={{ fontSize: '1.0625rem' }}>{a.step1Title}</h3>
                <p className="text-[--text-subtle]" style={{ fontSize: '0.9375rem' }}>{a.step1Desc}</p>
              </div>
            </div>

            <div className="card flex gap-5 items-start" style={{ padding: '1.5rem 2rem' }}>
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: '#7c3aed', fontSize: '1rem' }}>2</div>
              <div>
                <h3 className="font-bold mb-1 text-[--text]" style={{ fontSize: '1.0625rem' }}>{a.step2Title}</h3>
                <p className="text-[--text-subtle]" style={{ fontSize: '0.9375rem' }}>{a.step2Desc}</p>
              </div>
            </div>

            <div className="card flex gap-5 items-start" style={{ padding: '1.5rem 2rem' }}>
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: '#0891b2', fontSize: '1rem' }}>3</div>
              <div>
                <h3 className="font-bold mb-1 text-[--text]" style={{ fontSize: '1.0625rem' }}>{a.step3Title}</h3>
                <p className="text-[--text-subtle]" style={{ fontSize: '0.9375rem' }}>{a.step3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Citation finale */}
      <section className="section" style={{ background: '#1e3a8a' }}>
        <div className="container max-w-2xl mx-auto text-center">
          <Image src="/images/compy-logo.png" alt="Shop Compy" width={80} height={80}
            className="mx-auto mb-6" style={{ filter: 'brightness(1.3) saturate(0.7)' }} />
          <p className="text-2xl leading-relaxed text-white/90 mb-6" style={{ fontStyle: 'italic' }}>
            &laquo;&nbsp;{a.finalQuote}&nbsp;&raquo;
          </p>
          <p className="font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {a.founder}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[--bg-subtle] border-t border-[--border]">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3 text-[--text]">{a.ctaTitle}</h2>
          <p className="mb-6 text-[--text-subtle]">{a.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/comparateur`} className="btn-primary">{a.ctaChoose}</Link>
            <Link href={`/${locale}/guide`} className="btn-outline">{a.ctaGuide}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
