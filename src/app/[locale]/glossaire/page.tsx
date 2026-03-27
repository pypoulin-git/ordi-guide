'use client'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import { useTranslation } from '@/i18n/DictionaryContext'
import { getGlossaryTerms } from '@/content/glossaire-terms'

export default function GlossairePage() {
  const { t, locale } = useTranslation()
  const g = t.glossary

  const terms = getGlossaryTerms(locale)

  // Group by first letter
  const grouped = terms.reduce<Record<string, typeof terms>>((acc, t) => {
    const letter = t.term[0].toUpperCase()
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(t)
    return acc
  }, {})

  const letters = Object.keys(grouped).sort()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: terms.map(t => ({
      '@type': 'Question',
      name: `${g.faqPrefix} ${t.term} (${t.fr}) ?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: t.def,
      },
    })),
  }

  return (
    <>
      <JsonLd data={faqSchema} />
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <PageHero
        title={g.heroTitle}
        subtitle={g.heroSubtitle}
        badge={g.heroBadge.replace('{count}', String(terms.length))}
        gradient="linear-gradient(135deg, #312e81 0%, #7c3aed 50%, #8b5cf6 100%)"
        accentColor="#7c3aed"
      />

      {/* ── Quick nav ────────────────────────────────────────────── */}
      <section style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '1rem 0' }}>
        <div className="container max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {letters.map(l => (
              <a key={l} href={`#letter-${l}`}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors hover:bg-[#7c3aed] hover:text-white"
                style={{ background: '#e9d5ff', color: '#7c3aed' }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Terms ────────────────────────────────────────────────── */}
      <div className="container max-w-3xl mx-auto py-12 space-y-10">
        {letters.map(letter => (
          <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-lg"
                style={{ background: '#f5f3ff', color: '#7c3aed' }}>
                {letter}
              </span>
              <div className="flex-1 h-px" style={{ background: '#e2e8f0' }} />
            </div>
            <div className="space-y-4">
              {grouped[letter].map(term => (
                <div key={term.term} className="card">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <span className="text-xl font-bold" style={{ color: '#0f172a' }}>{term.term}</span>
                    <span className="text-sm font-medium" style={{ color: '#7c3aed' }}>{term.full}</span>
                    <span className="text-sm" style={{ color: '#94a3b8' }}>· {term.fr}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-2" style={{ color: '#475569' }}>{term.def}</p>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>
                    <span className="font-medium">{g.exLabel}</span> {term.example}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
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
