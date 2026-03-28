'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { SOURCE_LABELS, PROFILE_LABELS } from '@/types/catalogue'
import type { CatalogueProduct } from '@/types/catalogue'
import { useTranslation } from '@/i18n/DictionaryContext'

interface SearchResult {
  answer: string
  specs: {
    cpu: string
    ram: string
    ssd: string
    gpu: string
    budget: string
  }
  archetype: string
  usage_detected: string[]
  recommended_product?: CatalogueProduct
  error?: string
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<SearchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { t, locale } = useTranslation()
  const s = t.search

  const ARCHETYPE_LABELS: Record<string, { label: string; color: string; desc: string }> = {
    minimalist: { label: s.archetypeMinimalist, color: '#7c3aed', desc: s.archetypeMinimalistDesc },
    athlete:    { label: s.archetypeAthlete,    color: '#0891b2', desc: s.archetypeAthleteDesc },
    geek:       { label: s.archetypeGeek,       color: '#1e40af', desc: s.archetypeGeekDesc },
    douchebag:  { label: s.archetypeDouchebag,  color: '#d97706', desc: s.archetypeDouchebagDesc },
  }

  const EXAMPLES = [s.example1, s.example2, s.example3, s.example4]

  const SPEC_LABELS: Record<string, string> = {
    cpu: s.specCpu, ram: s.specRam, ssd: s.specSsd, gpu: s.specGpu, budget: s.specBudget,
  }

  async function search(q?: string) {
    const text = q || query
    if (!text.trim() || text.trim().length < 3) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text.trim() }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch {
      setError(s.connectionError)
    } finally {
      setLoading(false)
    }
  }

  function useExample(ex: string) {
    setQuery(ex)
    search(ex)
  }

  const arch = result?.archetype ? ARCHETYPE_LABELS[result.archetype] : null

  return (
    <div>
      {/* Search input */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && search()}
          placeholder={s.placeholder}
          className="flex-1 px-4 py-3 rounded-xl border-2 outline-none transition-colors bg-[--bg] text-[--text]"
          style={{ borderColor: 'var(--border)', fontSize: '1rem' }}
          disabled={loading}
        />
        <button
          onClick={() => search()}
          disabled={loading || query.trim().length < 3}
          className="btn-primary shrink-0 disabled:opacity-50"
        >
          {loading ? s.searching : s.submit}
        </button>
      </div>

      {/* Examples */}
      {!result && !loading && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-sm text-[--text-muted]">{s.tryLabel}</span>
          {EXAMPLES.map(ex => (
            <button key={ex} onClick={() => useExample(ex)}
              className="text-sm px-3 py-1 rounded-full transition-colors hover:bg-[--accent-bg] bg-[--bg-card] text-[--text-subtle]">
              {ex}
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-6 flex flex-col items-center gap-3">
          <img
            src="/images/VideoGIFCompySearching.gif"
            alt="Compy searching"
            width={100}
            height={100}
            className="rounded-xl"
          />
          <p className="text-sm font-medium text-[--text-muted] animate-pulse">{s.loading}</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 p-4 rounded-xl" style={{ background: 'var(--accent-bg)', color: 'var(--warn)', borderLeft: '4px solid var(--warn)' }}>
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6 space-y-4">
          {/* Answer */}
          <div className="card" style={{ border: '2px solid var(--accent)', padding: '1.5rem' }}>
            {arch && (
              <div className="mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold"
                  style={{ background: arch.color + '15', color: arch.color }}>
                  {s.profileLabel} : {arch.label}
                </div>
                <p className="text-sm mt-1.5" style={{ color: arch.color + 'cc' }}>{arch.desc}</p>
              </div>
            )}
            <p className="text-[--text]" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
              {result.answer}
            </p>
          </div>

          {/* Specs */}
          {result.specs && (
            <div className="card" style={{ padding: '1.25rem' }}>
              <h3 className="font-semibold mb-3 text-[--text]">
                {s.recommendedSpecs}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(result.specs).map(([key, val]) => (
                  <div key={key} className="flex items-start gap-2">
                    <span className="text-[--success]" style={{ fontWeight: 700, flexShrink: 0 }}>·</span>
                    <div>
                      <span className="font-semibold text-[--text]">
                        {SPEC_LABELS[key] || key}
                      </span>
                      <span className="text-[--text-muted]"> : {val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended product */}
          {result.recommended_product && (() => {
            const p = result.recommended_product!
            const source = SOURCE_LABELS[p.source]
            return (
              <div className="card" style={{ padding: 0, overflow: 'hidden', border: '2px solid var(--success)' }}>
                <div className="px-5 pt-4 pb-1 flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-wide text-[--success]">
                    {s.recommendedProduct}
                  </span>
                  <div className="flex items-center gap-2">
                    {p.isOnSale && p.originalPrice && (
                      <span className="text-sm font-bold px-2.5 py-0.5 rounded-full text-white bg-blue-600">
                        -{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)} %
                      </span>
                    )}
                    <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full"
                      style={{ background: source.color + '15', color: source.color }}>
                      {source.label}
                    </span>
                  </div>
                </div>
                <div className="px-5 pt-2 pb-4">
                  <p className="text-sm font-medium mb-0.5 text-[--text-muted]">{p.brand}</p>
                  <h4 className="font-bold mb-3 text-[--text]" style={{ fontSize: '1rem', lineHeight: 1.3 }}>
                    {p.name}
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3 text-sm">
                    {p.specs.cpu && <div><span className="font-medium text-[--text]">CPU</span> <span className="text-[--text-muted]">{p.specs.cpu}</span></div>}
                    {p.specs.ram && <div><span className="font-medium text-[--text]">RAM</span> <span className="text-[--text-muted]">{p.specs.ram}</span></div>}
                    {p.specs.storage && <div><span className="font-medium text-[--text]">{SPEC_LABELS.ssd}</span> <span className="text-[--text-muted]">{p.specs.storage}</span></div>}
                    {p.specs.gpu && <div><span className="font-medium text-[--text]">GPU</span> <span className="text-[--text-muted]">{p.specs.gpu}</span></div>}
                  </div>
                  <div className="p-3 rounded-lg mb-3 bg-[--accent-bg]" style={{ borderLeft: '3px solid var(--success)' }}>
                    <p className="text-sm leading-relaxed text-[--text-subtle]">{p.aiRationale}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.profiles.map(pr => (
                      <span key={pr} className="text-sm px-2.5 py-1 rounded-full bg-[--accent-bg] text-[--accent]">
                        {PROFILE_LABELS[pr].label}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-end justify-between pt-2 border-t border-[--border]">
                    <div>
                      <span className="text-2xl font-bold text-[--text]">
                        {p.price.toLocaleString(locale === 'fr' ? 'fr-CA' : 'en-CA')} $
                      </span>
                      {p.isOnSale && p.originalPrice && (
                        <span className="ml-2 text-sm line-through text-[--text-muted]">
                          {p.originalPrice.toLocaleString(locale === 'fr' ? 'fr-CA' : 'en-CA')} $
                        </span>
                      )}
                    </div>
                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}>
                      {s.viewPrice}
                    </a>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={`/${locale}/comparateur`} className="btn-primary flex-1 justify-center">
              {s.fullQuiz}
            </Link>
            <Link href={`/${locale}/guide`} className="btn-outline flex-1 justify-center">
              {s.learnMore}
            </Link>
          </div>

          <p className="text-center text-sm text-[--text-muted]">
            {s.disclaimer}
          </p>
        </div>
      )}
    </div>
  )
}
