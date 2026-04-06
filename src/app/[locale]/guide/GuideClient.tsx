'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useAnalogy, type AnalogyMode } from '@/contexts/AnalogyContext'
import AnalogyToggle from '@/components/AnalogyToggle'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import TechIllustration, { getAnalogyVariant } from '@/components/TechIllustration'
import { useTranslation } from '@/i18n/DictionaryContext'
import { getGuideSections, type Section, type ContentBlock, type DualContent } from '@/content/guide-sections'

function isDual(c: ContentBlock | DualContent): c is DualContent {
  return 'body' in c && 'car' in c
}

/* -- Icons per section -- */
function SectionSvgIcon({ component, mode, size = 40 }: { component?: string; mode: AnalogyMode; size?: number }) {
  if (!component) return null
  const variant = getAnalogyVariant(component, mode)
  if (!variant) return null
  return <TechIllustration variant={variant} size={size} />
}

/* -- Section divider with label -- */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 pt-8 pb-4">
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
        {label}
      </span>
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
    </div>
  )
}

/* -- Component -- */
export default function GuideClient() {
  const { mode, modeLabel, modeIcon } = useAnalogy()
  const { t, locale } = useTranslation()
  const g = t.guide

  const sections = getGuideSections(locale)

  // Group sections by category
  const introSections = sections.filter(s => s.category === 'intro')
  const analogySections = sections.filter(s => s.category === 'analogy')
  const conclusionSections = sections.filter(s => s.category === 'conclusion')

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'fr' ? 'Accueil' : 'Home', item: `https://shopcompy.ca/${locale}` },
      { '@type': 'ListItem', position: 2, name: locale === 'fr' ? 'Guide' : 'Guide', item: `https://shopcompy.ca/${locale}/guide` },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {/* -- Hero -- */}
      <PageHero
        title={g.heroTitle}
        subtitle={g.heroSubtitle}
        badge={g.heroBadge}
        gradient="linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)"
      />

      {/* -- Table of contents -- */}
      <section className="section" style={{ paddingTop: '1.25rem', paddingBottom: '1.5rem' }}>
        <div className="container max-w-3xl mx-auto">
          <div className="card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4">
              <h2 className="font-semibold text-[var(--text)]" style={{ fontSize: '1rem' }}>{g.tocTitle}</h2>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm shrink-0 bg-[var(--bg-card)] text-[var(--text-subtle)]">
                <span>{modeIcon}</span>
                <span>{g.modeLabel} <strong>{modeLabel}</strong></span>
                <span className="text-[var(--text-muted)]">·</span>
                <AnalogyToggle variant="pill" />
              </div>
            </div>

            {/* TOC: intro items */}
            <div className="mb-3">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-[var(--text-muted)]">{g.introLabel}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {introSections.map((s) => (
                  <a key={s.id} href={`#${s.id}`}
                    className="flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all hover:shadow-md hover:-translate-y-0.5"
                    style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', color: 'var(--text-subtle)' }}>
                    <span style={{ fontSize: '0.875rem' }}>
                      <strong>{s.title[mode]}</strong>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* TOC: analogy items */}
            <div className="mb-3">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-[var(--accent)]">{g.analogyLabel}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {analogySections.map((s) => {
                  const title = s.title[mode]
                  const componentMatch = title.match(/^(.*?)(,\s*.*)$/)
                  return (
                    <a key={s.id} href={`#${s.id}`}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all hover:shadow-md hover:-translate-y-0.5 bg-[var(--accent-bg)] text-[var(--accent)]"
                      style={{ border: '1px solid var(--border)' }}>
                      <span className="shrink-0">
                        <SectionSvgIcon component={s.component} mode={mode} size={42} />
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

            {/* TOC: conclusion items */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-[var(--text-muted)]">{g.conclusionLabel}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {conclusionSections.map((s) => (
                  <a key={s.id} href={`#${s.id}`}
                    className="flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all hover:shadow-md hover:-translate-y-0.5"
                    style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', color: 'var(--text-subtle)' }}>
                    <span style={{ fontSize: '0.875rem' }}>
                      <strong>{s.title[mode]}</strong>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- Content sections -- */}
      <div className="container max-w-3xl mx-auto pb-16 space-y-2">

        {/* ── INTRO sections ────────────────────────────────────── */}
        <SectionDivider label={g.introLabel} />
        {introSections.map((s, idx) => (
          <GenericSection key={s.id} section={s} idx={idx} mode={mode} tipLabel={g.tipLabel} />
        ))}

        {/* ── ANALOGY sections ──────────────────────────────────── */}
        <SectionDivider label={g.analogyLabel} />
        {analogySections.map((s, idx) => (
          <AnalogySectionBlock key={s.id} section={s} idx={idx} mode={mode} tipLabel={g.tipLabel} />
        ))}

        {/* ── CONCLUSION sections ───────────────────────────────── */}
        <SectionDivider label={g.conclusionLabel} />
        {conclusionSections.map((s, idx) => (
          <GenericSection key={s.id} section={s} idx={idx} mode={mode} tipLabel={g.tipLabel} />
        ))}
      </div>

      {/* -- Bottom CTA -- */}
      <section className="section bg-[var(--bg-subtle)] border-t border-[var(--border)]">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3 text-[var(--text)]">
            {g.ctaTitle}
          </h2>
          <p className="mb-6 text-[var(--text-subtle)]">
            {g.ctaSubtitle}
          </p>
          <Link href={`/${locale}/comparateur`} className="btn-primary">
            {g.ctaButton}
          </Link>
        </div>
      </section>
    </>
  )
}

/* ── Generic section (intro / conclusion — no component icon) ──── */
function GenericSection({ section: s, idx, mode, tipLabel }: {
  section: Section; idx: number; mode: AnalogyMode; tipLabel: string
}) {
  return (
    <section id={s.id} className="scroll-mt-20" style={{ padding: '2rem 0' }}>
      <h2 className="text-xl font-bold mb-4 text-[var(--text)]">
        {s.title[mode]}
      </h2>
      <div className="space-y-3">
        {s.content.map((c) => (
          <div key={c.subtitle} className="card">
            <h3 className="font-semibold mb-2 text-[var(--text)]">{c.subtitle}</h3>
            <p className="text-sm leading-relaxed text-[var(--text-subtle)]">
              {isDual(c) ? c[mode] : c.text}
            </p>
          </div>
        ))}
        <TipBlock tip={s.tip[mode]} label={tipLabel} />
      </div>
    </section>
  )
}

/* ── Analogy section (with component icon, accent border) ──────── */
function AnalogySectionBlock({ section: s, idx, mode, tipLabel }: {
  section: Section; idx: number; mode: AnalogyMode; tipLabel: string
}) {
  const isEven = idx % 2 === 0
  const hasAltBg = idx % 3 === 1

  return (
    <section id={s.id} className="scroll-mt-20"
      style={{
        background: hasAltBg ? 'var(--bg-subtle)' : 'transparent',
        margin: hasAltBg ? '0 -1rem' : undefined,
        padding: hasAltBg ? '2rem 1rem' : '2rem 0',
        borderRadius: hasAltBg ? '1rem' : undefined,
        borderTop: idx > 0 && !hasAltBg ? '1px solid var(--border)' : 'none',
      }}>
      {/* Section header with decorative accent */}
      <div className="flex items-start gap-3 sm:gap-4 mb-6"
        style={{ paddingLeft: isEven ? 0 : '0.5rem' }}>
        {s.component && (
          <div className="shrink-0 rounded-2xl p-2.5 shadow-sm"
            style={{
              background: 'var(--accent-bg)',
              border: '1px solid var(--border)',
            }}>
            <SectionSvgIcon component={s.component} mode={mode} size={64} />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold leading-tight text-[var(--text)]">
            {s.title[mode]}
          </h2>
          {s.component && (
            <div className="mt-1.5 h-1 rounded-full" style={{
              width: '3rem',
              background: 'var(--accent)',
            }} />
          )}
        </div>
      </div>

      {/* Content blocks with varied layout */}
      <div className="space-y-4" style={{ paddingLeft: isEven ? '0' : '0.5rem' }}>
        {s.content.map((c, ci) => (
          <div key={c.subtitle} className="card"
            style={{
              borderLeft: ci === 0 && s.component
                ? '3px solid var(--accent)'
                : undefined,
            }}>
            <h3 className="font-semibold mb-2 text-[var(--text)]">{c.subtitle}</h3>
            <p className="text-sm leading-relaxed text-[var(--text-subtle)]">
              {isDual(c) ? c[mode] : c.text}
            </p>
          </div>
        ))}

        {/* A retenir -- Compy icon */}
        <TipBlock tip={s.tip[mode]} label={tipLabel} showCompy />
      </div>
    </section>
  )
}

/* ── Shared tip block ──────────────────────────────────────────── */
function TipBlock({ tip, label, showCompy }: { tip: string; label: string; showCompy?: boolean }) {
  return (
    <div className="flex gap-4 items-start">
      {showCompy && (
        <Image src="/compy-icon.svg" alt="Compy" width={44} height={44}
          className="shrink-0 mt-1 hidden sm:block compy-logo" />
      )}
      <div className="flex-1 min-w-0 p-4 rounded-xl bg-[var(--accent-bg)]" style={{
        border: '1px solid var(--border)',
        borderLeft: '4px solid var(--accent)',
      }}>
        <p className="font-semibold text-xs uppercase tracking-wide mb-1 text-[var(--accent)]">
          {label}
        </p>
        <p className="leading-relaxed text-[var(--text-subtle)]" style={{ fontSize: '0.9375rem' }}>
          {tip}
        </p>
      </div>
    </div>
  )
}
