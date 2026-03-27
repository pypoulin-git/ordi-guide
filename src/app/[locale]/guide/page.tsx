'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useAnalogy, type AnalogyMode } from '@/contexts/AnalogyContext'
import AnalogyToggle from '@/components/AnalogyToggle'
import PageHero from '@/components/PageHero'
import TechIllustration, { getAnalogyVariant } from '@/components/TechIllustration'
import { useTranslation } from '@/i18n/DictionaryContext'
import { getGuideSections, type Section, type ContentBlock, type DualContent } from '@/content/guide-sections'

function isDual(c: ContentBlock | DualContent): c is DualContent {
  return 'body' in c && 'car' in c
}

/* ── Icons per section ─────────────────────────────────────────── */
function SectionSvgIcon({ component, mode, size = 40 }: { component?: string; mode: AnalogyMode; size?: number }) {
  if (!component) return null
  const variant = getAnalogyVariant(component, mode)
  if (!variant) return null
  return <TechIllustration variant={variant} size={size} />
}

/* ── Component ─────────────────────────────────────────────────── */
export default function GuidePage() {
  const { mode, modeLabel, modeIcon } = useAnalogy()
  const { t, locale } = useTranslation()
  const g = t.guide

  const sections = getGuideSections(locale)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <PageHero
        title={g.heroTitle}
        subtitle={g.heroSubtitle}
        badge={g.heroBadge}
        gradient="linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)"
      />

      {/* ── Table of contents ────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: '1.25rem', paddingBottom: '1.5rem' }}>
        <div className="container max-w-3xl mx-auto">
          <div className="card">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="font-semibold" style={{ color: '#0f172a', fontSize: '1rem' }}>{g.tocTitle}</h2>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm shrink-0"
                style={{ background: '#f1f5f9', color: '#475569' }}>
                <span>{modeIcon}</span>
                <span>{g.modeLabel} <strong>{modeLabel}</strong></span>
                <span style={{ color: '#cbd5e1' }}>·</span>
                <AnalogyToggle variant="pill" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sections.map((s) => {
                const title = s.title[mode]
                const componentMatch = title.match(/^(.*?)(,\s*.*)$/)
                return (
                  <a key={s.id} href={`#${s.id}`}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:shadow-md hover:-translate-y-0.5"
                    style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb' }}>
                    <span className="shrink-0">
                      <SectionSvgIcon component={s.component} mode={mode} size={36} />
                    </span>
                    <span style={{ fontSize: '0.9375rem', lineHeight: '1.4' }}>
                      {componentMatch ? (
                        <>
                          <strong>{componentMatch[1]}</strong>
                          <span className="font-normal">{componentMatch[2]}</span>
                        </>
                      ) : (
                        <strong>{title}</strong>
                      )}
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sections ─────────────────────────────────────────────── */}
      <div className="container max-w-3xl mx-auto pb-16 space-y-6">
        {sections.map((s: Section, idx: number) => {
          const isEven = idx % 2 === 0
          const hasAltBg = idx % 3 === 1
          return (
          <section key={s.id} id={s.id} className="scroll-mt-20"
            style={{
              background: hasAltBg ? '#f8fafc' : 'transparent',
              margin: hasAltBg ? '0 -1.5rem' : undefined,
              padding: hasAltBg ? '2.5rem 1.5rem' : '2.5rem 0',
              borderRadius: hasAltBg ? '1.5rem' : undefined,
              borderTop: idx > 0 && !hasAltBg ? '1px solid #e2e8f0' : 'none',
            }}>
            {/* Section header with decorative accent */}
            <div className="flex items-start gap-4 mb-6"
              style={{ paddingLeft: isEven ? 0 : '1rem' }}>
              {s.component && (
                <div className="shrink-0 rounded-2xl p-2.5 shadow-sm"
                  style={{
                    background: isEven
                      ? 'linear-gradient(135deg, #eff6ff, #dbeafe)'
                      : 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                    border: `1px solid ${isEven ? '#bfdbfe' : '#bbf7d0'}`,
                  }}>
                  <SectionSvgIcon component={s.component} mode={mode} size={48} />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold leading-tight" style={{ color: '#0f172a' }}>
                  {s.title[mode]}
                </h2>
                {s.component && (
                  <div className="mt-1.5 h-1 rounded-full" style={{
                    width: '3rem',
                    background: isEven
                      ? 'linear-gradient(90deg, #2563eb, #60a5fa)'
                      : 'linear-gradient(90deg, #16a34a, #4ade80)',
                  }} />
                )}
              </div>
            </div>

            {/* Content blocks with varied layout */}
            <div className="space-y-4" style={{ paddingLeft: isEven ? '0.5rem' : '1.5rem' }}>
              {s.content.map((c, ci) => (
                <div key={c.subtitle} className="card"
                  style={{
                    borderLeft: ci === 0 && s.component
                      ? `3px solid ${isEven ? '#93c5fd' : '#86efac'}`
                      : undefined,
                  }}>
                  <h3 className="font-semibold mb-2" style={{ color: '#0f172a' }}>{c.subtitle}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                    {isDual(c) ? c[mode] : c.text}
                  </p>
                </div>
              ))}

              {/* À retenir — original style + Compy icon */}
              <div className="flex gap-4 items-start">
                <Image src="/compy-icon.svg" alt="Compy" width={44} height={44}
                  className="shrink-0 mt-1 hidden sm:block"
                  style={{ filter: 'drop-shadow(0 2px 6px rgba(37,99,235,0.18))' }} />
                <div className="flex-1 min-w-0 p-4 rounded-xl" style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderLeft: '4px solid #2563eb',
                }}>
                  <p className="font-semibold text-xs uppercase tracking-wide mb-1" style={{ color: '#2563eb' }}>
                    {g.tipLabel}
                  </p>
                  <p className="leading-relaxed" style={{ color: '#1d4ed8', fontSize: '0.9375rem' }}>
                    {s.tip[mode]}
                  </p>
                </div>
              </div>
            </div>
          </section>
          )
        })}
      </div>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#0f172a' }}>
            {g.ctaTitle}
          </h2>
          <p className="mb-6" style={{ color: '#475569' }}>
            {g.ctaSubtitle}
          </p>
          <Link href="/comparateur" className="btn-primary">
            {g.ctaButton}
          </Link>
        </div>
      </section>
    </>
  )
}
