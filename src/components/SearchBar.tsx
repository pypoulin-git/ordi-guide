'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { SOURCE_LABELS, PROFILE_LABELS } from '@/types/catalogue'
import type { CatalogueProduct } from '@/types/catalogue'
import { useTranslation } from '@/i18n/DictionaryContext'
import { buildAffiliateUrl, getAffiliateRel } from '@/lib/affiliate'

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
  const [focused, setFocused] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [loadingMsg, setLoadingMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const msgIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { t, locale } = useTranslation()
  const s = t.search

  const RECENT_KEY = 'recent_searches'
  const MAX_RECENT = 5

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) setRecentSearches(parsed.slice(0, MAX_RECENT))
      }
    } catch { /* ignore */ }
  }, [])

  function saveRecentSearch(q: string) {
    const trimmed = q.trim()
    if (!trimmed || trimmed.length < 3) return
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== trimmed.toLowerCase())
      const updated = [trimmed, ...filtered].slice(0, MAX_RECENT)
      try { localStorage.setItem(RECENT_KEY, JSON.stringify(updated)) } catch { /* ignore */ }
      return updated
    })
  }

  function clearHistory() {
    setRecentSearches([])
    try { localStorage.removeItem(RECENT_KEY) } catch { /* ignore */ }
  }

  // Close recent panel on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

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

    // Abort previous request if any
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    // Rotating loading messages
    const isFrLocal = locale === 'fr'
    const msgs = isFrLocal
      ? ['Analyse en cours...', 'Consultation du catalogue...', 'Préparation de ta recommandation...']
      : ['Analyzing your request...', 'Browsing the catalogue...', 'Preparing your recommendation...']
    let msgIdx = 0
    setLoadingMsg(msgs[0])
    if (msgIntervalRef.current) clearInterval(msgIntervalRef.current)
    msgIntervalRef.current = setInterval(() => {
      msgIdx = (msgIdx + 1) % msgs.length
      setLoadingMsg(msgs[msgIdx])
    }, 3000)

    setLoading(true)
    setError('')
    setResult(null)
    setFocused(false)
    saveRecentSearch(text.trim())

    // Timeout after 12 seconds
    const timeoutId = setTimeout(() => controller.abort(), 12000)

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text.trim(), locale }),
        signal: controller.signal,
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        setError(isFrLocal
          ? 'La recherche a pris trop de temps. Réessaie dans un instant.'
          : 'Search took too long. Please try again in a moment.')
      } else {
        setError(s.connectionError)
      }
    } finally {
      clearTimeout(timeoutId)
      if (msgIntervalRef.current) clearInterval(msgIntervalRef.current)
      msgIntervalRef.current = null
      setLoading(false)
      abortRef.current = null
    }
  }

  function useExample(ex: string) {
    setQuery(ex)
    search(ex)
  }

  const arch = result?.archetype ? ARCHETYPE_LABELS[result.archetype] : null

  return (
    <div ref={containerRef}>
      {/* Search input */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && search()}
          onFocus={() => setFocused(true)}
          placeholder={s.placeholder}
          aria-label={s.placeholder}
          className="flex-1 px-4 py-3 rounded-xl outline-none transition-colors text-[var(--text)] placeholder:text-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent)]"
          style={{ fontSize: '1rem' }}
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

      {/* Recent searches */}
      {!result && !loading && focused && recentSearches.length > 0 && (
        <div className="mt-3 p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-muted)]">{s.recentSearches}</span>
            <button
              onClick={clearHistory}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--warn)] transition-colors"
            >
              {s.clearHistory}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map(rs => (
              <button key={rs} onClick={() => useExample(rs)}
                className="text-sm px-3 py-1 rounded-full transition-colors hover:bg-[var(--accent-bg)] bg-[var(--bg-subtle)] text-[var(--text-subtle)]">
                {rs}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Examples — show when no recent searches or not focused */}
      {!result && !loading && !(focused && recentSearches.length > 0) && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-sm text-[var(--text-muted)]">{s.tryLabel}</span>
          {EXAMPLES.map(ex => (
            <button key={ex} onClick={() => useExample(ex)}
              className="text-sm px-3 py-1 rounded-full transition-colors hover:bg-[var(--accent-bg)] bg-[var(--bg-card)] text-[var(--text-subtle)]">
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
          <p className="text-sm font-medium text-[var(--text-muted)] animate-pulse">{loadingMsg || s.loading}</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div role="alert" className="mt-4 p-4 rounded-xl" style={{ background: 'var(--accent-bg)', color: 'var(--warn)', borderLeft: '4px solid var(--warn)' }}>
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6 space-y-4" role="region" aria-live="polite" aria-label={s.recommendedSpecs}>
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
            <p className="text-[var(--text)]" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
              {result.answer}
            </p>
          </div>

          {/* Specs */}
          {result.specs && (
            <div className="card" style={{ padding: '1.25rem' }}>
              <h3 className="font-semibold mb-3 text-[var(--text)]">
                {s.recommendedSpecs}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(result.specs).map(([key, val]) => (
                  <div key={key} className="flex items-start gap-2">
                    <span className="text-[var(--success)]" style={{ fontWeight: 700, flexShrink: 0 }}>·</span>
                    <div>
                      <span className="font-semibold text-[var(--text)]">
                        {SPEC_LABELS[key] || key}
                      </span>
                      <span className="text-[var(--text-muted)]"> : {val}</span>
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
                  <span className="text-sm font-bold uppercase tracking-wide text-[var(--success)]">
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
                  <p className="text-sm font-medium mb-0.5 text-[var(--text-muted)]">{p.brand}</p>
                  <h4 className="font-bold mb-3 text-[var(--text)]" style={{ fontSize: '1rem', lineHeight: 1.3 }}>
                    {p.name}
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3 text-sm">
                    {p.specs.cpu && <div><span className="font-medium text-[var(--text)]">CPU</span> <span className="text-[var(--text-muted)]">{p.specs.cpu}</span></div>}
                    {p.specs.ram && <div><span className="font-medium text-[var(--text)]">RAM</span> <span className="text-[var(--text-muted)]">{p.specs.ram}</span></div>}
                    {p.specs.storage && <div><span className="font-medium text-[var(--text)]">{SPEC_LABELS.ssd}</span> <span className="text-[var(--text-muted)]">{p.specs.storage}</span></div>}
                    {p.specs.gpu && <div><span className="font-medium text-[var(--text)]">GPU</span> <span className="text-[var(--text-muted)]">{p.specs.gpu}</span></div>}
                  </div>
                  <div className="p-3 rounded-lg mb-3 bg-[var(--accent-bg)]" style={{ borderLeft: '3px solid var(--success)' }}>
                    <p className="text-sm leading-relaxed text-[var(--text-subtle)]">{p.aiRationale}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.profiles.map(pr => (
                      <span key={pr} className="text-sm px-2.5 py-1 rounded-full bg-[var(--accent-bg)] text-[var(--accent)]">
                        {PROFILE_LABELS[pr].label}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-end justify-between pt-2 border-t border-[var(--border)]">
                    <div>
                      <span className="text-2xl font-bold text-[var(--text)]">
                        {p.price.toLocaleString(locale === 'fr' ? 'fr-CA' : 'en-CA')} $
                      </span>
                      {p.isOnSale && p.originalPrice && (
                        <span className="ml-2 text-sm line-through text-[var(--text-muted)]">
                          {p.originalPrice.toLocaleString(locale === 'fr' ? 'fr-CA' : 'en-CA')} $
                        </span>
                      )}
                    </div>
                    <a href={buildAffiliateUrl(p.url, p.source)} target="_blank"
                      rel={getAffiliateRel(p.isGiftPick)}
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

          <p className="text-center text-sm text-[var(--text-muted)]">
            {s.disclaimer}
          </p>
        </div>
      )}
    </div>
  )
}
