'use client'
import { useState } from 'react'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import { useTranslation } from '@/i18n/DictionaryContext'
import { getGlossaryTerms, glossaryCategories, type GlossaryCategory } from '@/content/glossaire-terms'

const categoryFilterKeys: Record<string, string> = {
  all: 'filterAll',
  processor: 'filterProcessor',
  memory: 'filterMemory',
  storage: 'filterStorage',
  display: 'filterDisplay',
  connectivity: 'filterConnectivity',
  ai: 'filterAi',
  power: 'filterPower',
}

export default function GlossaireClient() {
  const { t, locale } = useTranslation()
  const g = t.glossary
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | 'all'>('all')

  const allTerms = getGlossaryTerms(locale)

  // Filter by category
  const terms = activeCategory === 'all'
    ? allTerms
    : allTerms.filter(term => term.category === activeCategory)

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
    mainEntity: allTerms.map(t => ({
      '@type': 'Question',
      name: `${g.faqPrefix} ${t.term} (${t.fr}) ?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: t.def,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'fr' ? 'Accueil' : 'Home', item: `https://shopcompy.ca/${locale}` },
      { '@type': 'ListItem', position: 2, name: locale === 'fr' ? 'Glossaire' : 'Glossary', item: `https://shopcompy.ca/${locale}/glossaire` },
    ],
  }

  const definedTermSetSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: locale === 'fr' ? 'Glossaire informatique' : 'Computer Glossary',
    description: locale === 'fr'
      ? 'Lexique des termes informatiques expliques simplement'
      : 'Computer terms explained in plain language',
    hasDefinedTerm: allTerms.map(term => ({
      '@type': 'DefinedTerm',
      name: term.term,
      description: term.def,
      inDefinedTermSet: `https://shopcompy.ca/${locale}/glossaire`,
    })),
  }

  const categoryColors: Record<string, string> = {
    processor: '#2563eb',
    memory: '#7c3aed',
    storage: '#0891b2',
    display: '#d97706',
    connectivity: '#2563eb',
    ai: '#7c3aed',
    power: '#d97706',
  }

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={definedTermSetSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* -- Hero -- */}
      <PageHero
        title={g.heroTitle}
        subtitle={g.heroSubtitle}
        badge={g.heroBadge.replace('{count}', String(allTerms.length))}
        gradient="linear-gradient(135deg, #312e81 0%, #7c3aed 50%, #8b5cf6 100%)"
        accentColor="#7c3aed"
      />

      {/* -- Category filter -- */}
      <section className="bg-[var(--bg-subtle)] border-b border-[var(--border)]" style={{ padding: '0.75rem 0' }}>
        <div className="container max-w-3xl mx-auto space-y-3">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {['all', ...glossaryCategories.map(c => c.id)].map(cat => {
              const key = categoryFilterKeys[cat]
              const label = (g as Record<string, string>)[key] || cat
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as GlossaryCategory | 'all')}
                  className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c3aed]"
                  style={{
                    background: isActive ? '#7c3aed' : 'var(--accent-bg)',
                    color: isActive ? '#ffffff' : 'var(--text-subtle)',
                    minHeight: '36px',
                  }}
                  aria-pressed={isActive}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Quick nav letters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {letters.map(l => (
              <a key={l} href={`#letter-${l}`}
                className="w-11 h-11 flex items-center justify-center rounded-lg text-base font-bold transition-colors hover:bg-[#7c3aed] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c3aed]"
                style={{ background: 'var(--accent-bg)', color: '#7c3aed', minWidth: '44px', minHeight: '44px' }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* -- Terms -- */}
      <div className="container max-w-3xl mx-auto py-8 sm:py-12 space-y-10">
        {letters.map(letter => (
          <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-lg"
                style={{ background: 'var(--accent-bg)', color: '#7c3aed' }}>
                {letter}
              </span>
              <div className="flex-1 h-px bg-[var(--border)]" />
            </div>
            <div className="space-y-4">
              {grouped[letter].map(term => (
                <div key={term.term} className="card" style={{
                  borderLeft: term.category ? `3px solid ${categoryColors[term.category] || '#7c3aed'}` : undefined,
                }}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <span className="text-xl font-bold text-[var(--text)]">{term.term}</span>
                    <span className="text-sm font-medium" style={{ color: '#7c3aed' }}>{term.full}</span>
                    <span className="text-sm text-[var(--text-muted)]">· {term.fr}</span>
                  </div>
                  {term.category && (
                    <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2"
                      style={{ background: `${categoryColors[term.category]}15`, color: categoryColors[term.category] }}>
                      {(g as Record<string, string>)[categoryFilterKeys[term.category]] || term.category}
                    </span>
                  )}
                  <p className="text-sm leading-relaxed mb-2 text-[var(--text-subtle)]">{term.def}</p>
                  <p className="text-sm text-[var(--text-muted)]">
                    <span className="font-medium">{g.exLabel}</span> {term.example}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
