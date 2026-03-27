'use client'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function AboutPage() {
  const { t } = useTranslation()
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
          <div className="card" style={{ padding: '2.5rem', borderLeft: '4px solid #2563eb' }}>
            <p className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#2563eb' }}>
              {a.origin}
            </p>
            <blockquote className="text-xl leading-relaxed mb-0" style={{ color: '#0f172a', fontStyle: 'italic' }}>
              &laquo;&nbsp;{a.originQuote}&nbsp;&raquo;
            </blockquote>
          </div>

          <div className="mt-6" style={{ color: '#475569' }}>
            <p className="leading-relaxed mb-5">{a.originP1}</p>
            <p className="leading-relaxed">{a.originP2}</p>
          </div>
        </div>
      </section>

      {/* Histoire 2 : aujourd'hui */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container max-w-3xl mx-auto">
          <div className="card" style={{ padding: '2.5rem', borderLeft: '4px solid #7c3aed' }}>
            <p className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#7c3aed' }}>
              {a.today}
            </p>
            <blockquote className="text-xl leading-relaxed mb-0" style={{ color: '#0f172a', fontStyle: 'italic' }}>
              &laquo;&nbsp;{a.todayQuote}&nbsp;&raquo;
            </blockquote>
          </div>

          <div className="mt-6" style={{ color: '#475569' }}>
            <p className="leading-relaxed">{a.todayP1}</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#0f172a' }}>{a.missionTitle}</h2>
          <p className="leading-relaxed mb-8" style={{ color: '#475569' }}>{a.missionIntro}</p>

          <div className="space-y-4">
            <div className="card flex gap-5 items-start" style={{ padding: '1.5rem 2rem' }}>
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: '#2563eb', fontSize: '1rem' }}>1</div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: '#0f172a', fontSize: '1.0625rem' }}>{a.step1Title}</h3>
                <p style={{ color: '#475569', fontSize: '0.9375rem' }}>{a.step1Desc}</p>
              </div>
            </div>

            <div className="card flex gap-5 items-start" style={{ padding: '1.5rem 2rem' }}>
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: '#7c3aed', fontSize: '1rem' }}>2</div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: '#0f172a', fontSize: '1.0625rem' }}>{a.step2Title}</h3>
                <p style={{ color: '#475569', fontSize: '0.9375rem' }}>{a.step2Desc}</p>
              </div>
            </div>

            <div className="card flex gap-5 items-start" style={{ padding: '1.5rem 2rem' }}>
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: '#0891b2', fontSize: '1rem' }}>3</div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: '#0f172a', fontSize: '1.0625rem' }}>{a.step3Title}</h3>
                <p style={{ color: '#475569', fontSize: '0.9375rem' }}>{a.step3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Citation finale */}
      <section className="section" style={{ background: '#1e3a8a' }}>
        <div className="container max-w-2xl mx-auto text-center">
          <Image src="/logo-compy.svg" alt="Shop Compy" width={80} height={80}
            className="mx-auto mb-6" style={{ filter: 'brightness(1.3) saturate(0.7)' }} />
          <p className="text-2xl leading-relaxed text-white/90 mb-6" style={{ fontStyle: 'italic' }}>
            &laquo;&nbsp;{a.finalQuote}&nbsp;&raquo;
          </p>
          <p className="font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {a.founder}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#0f172a' }}>{a.ctaTitle}</h2>
          <p className="mb-6" style={{ color: '#475569' }}>{a.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/comparateur" className="btn-primary">{a.ctaChoose}</Link>
            <Link href="/guide" className="btn-outline">{a.ctaGuide}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
