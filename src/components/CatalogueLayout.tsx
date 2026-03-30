'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { ProfileTag, BudgetTier, Category, CatalogueProduct } from '@/types/catalogue'
import { PROFILE_LABELS, BUDGET_LABELS, CATEGORY_LABELS } from '@/types/catalogue'
import ProductCard from './ProductCard'
import AdBanner from './AdBanner'
import { useTranslation } from '@/i18n/DictionaryContext'

type FilterState = {
  profile: ProfileTag | null
  budget: BudgetTier | null
  category: Category | null
  search: string
}

const PAGE_SIZE = 12

const COMPUTER_CATEGORIES: Category[] = ['laptop', 'desktop', 'apple', 'chromebook']
const ACCESSORY_CATEGORIES: Category[] = ['monitor', 'dock']

export default function CatalogueLayout({ products }: { products: CatalogueProduct[] }) {
  const [filters, setFilters] = useState<FilterState>({
    profile: null, budget: null, category: null, search: '',
  })
  const [filterHistory, setFilterHistory] = useState<string[]>([])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const { t, locale } = useTranslation()
  const cat = t.catalogue
  const isFr = locale === 'fr'

  const toggle = useCallback(<K extends keyof FilterState>(key: K, val: FilterState[K]) => {
    setFilters(prev => {
      const next = prev[key] === val ? null : val
      if (next !== null && key !== 'search') {
        const label = key === 'profile'
          ? PROFILE_LABELS[val as ProfileTag]?.label
          : key === 'budget'
            ? BUDGET_LABELS[val as BudgetTier]
            : CATEGORY_LABELS[val as Category]
        if (label) {
          setFilterHistory(h => {
            const entry = `${key}: ${label}`
            if (h.includes(entry)) return h
            return [...h.slice(-4), entry]
          })
        }
      }
      return { ...prev, [key]: next }
    })
  }, [])

  const [searchInput, setSearchInput] = useState('')
  const [searchIntent, setSearchIntent] = useState<SearchIntent | null>(null)
  const [aiScores, setAiScores] = useState<Map<string, number> | null>(null)
  const [searching, setSearching] = useState(false)

  // Submit search — Enter key or button
  const submitSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchIntent(null)
      setAiScores(null)
      setFilters(prev => ({ ...prev, search: '', category: null, budget: null, profile: null }))
      return
    }

    // 1. Instant local parse for filters
    const intent = parseSearchQuery(query, isFr)
    setSearchIntent({ ...intent, feedback: isFr ? 'Compy réfléchit...' : 'Compy is thinking...' })
    setFilters(prev => ({
      ...prev,
      search: intent.keywords.join(' '),
      category: intent.category ?? prev.category,
      budget: intent.budget ?? prev.budget,
      profile: intent.profile ?? prev.profile,
    }))

    // 2. Call Gemini AI for deep understanding
    setSearching(true)
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, locale }),
      })
      if (res.ok) {
        const data = await res.json()
        // Score all products against AI response
        const scores = scoreProductsFromAI(products, data)
        setAiScores(scores)

        // Update intent with AI feedback
        setSearchIntent({
          ...intent,
          feedback: data.answer || intent.feedback,
          category: intent.category,
          budget: intent.budget,
          profile: intent.profile,
          keywords: intent.keywords,
        })

        // Apply profile from AI usage detection
        if (!intent.profile && data.usage_detected?.length) {
          const usageMap: Record<string, ProfileTag> = {
            web: 'basic', bureautique: 'work', office: 'work',
            etudes: 'student', school: 'student',
            video: 'creative', creation: 'creative', creative: 'creative',
            gaming: 'gaming',
          }
          for (const u of data.usage_detected) {
            if (usageMap[u]) {
              setFilters(prev => ({ ...prev, profile: usageMap[u] }))
              break
            }
          }
        }
      }
    } catch {
      // AI failed — keep local parse results
    } finally {
      setSearching(false)
    }
  }, [isFr, locale, products])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitSearch(searchInput)
  }

  const filtered = products.filter(p => {
    if (filters.profile && !p.profiles.includes(filters.profile)) return false
    if (filters.budget && p.budgetTier !== filters.budget) return false
    if (filters.category && p.category !== filters.category) return false
    if (filters.search) {
      const words = filters.search.toLowerCase().split(/\s+/).filter(Boolean)
      if (words.length > 0) {
        const haystack = `${p.name} ${p.brand} ${p.specs.cpu || ''} ${p.specs.gpu || ''} ${p.specs.ram || ''} ${p.specs.display || ''} ${p.aiRationale}`.toLowerCase()
        if (!words.some(w => haystack.includes(w))) return false
      }
    }
    return true
  })

  // If AI scored products, sort by AI relevance; otherwise keep aiScore order
  const sortedFiltered = aiScores
    ? [...filtered].sort((a, b) => (aiScores.get(b.id) ?? 0) - (aiScores.get(a.id) ?? 0))
    : filtered

  // Reset pagination when filters change
  useEffect(() => { setVisibleCount(PAGE_SIZE) }, [filters.profile, filters.budget, filters.category, filters.search])

  const visibleProducts = sortedFiltered.slice(0, visibleCount)
  const hasMore = visibleCount < sortedFiltered.length

  // Infinite scroll
  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount(v => Math.min(v + PAGE_SIZE, sortedFiltered.length))
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [hasMore, sortedFiltered.length])

  const reset = () => {
    setFilters({ profile: null, budget: null, category: null, search: '' })
    setSearchInput('')
    setSearchIntent(null)
    setAiScores(null)
  }
  const hasFilters = filters.profile || filters.budget || filters.category || filters.search

  const compySummary = buildCompySummary(filters, filtered.length, products.length, isFr)

  return (
    <div>

      {/* ── Top bar: profiles + search ───────────────────────── */}
      <div className="mb-6 space-y-4">

        {/* Profile pills — horizontal */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mr-1">
            {cat.profileLabel}
          </span>
          {(Object.keys(PROFILE_LABELS) as ProfileTag[]).map(key => (
            <button key={key} onClick={() => toggle('profile', key)}
              className="text-sm px-4 py-2 rounded-full font-medium transition-all"
              style={{
                minHeight: '40px',
                ...(filters.profile === key
                  ? { background: 'var(--accent)', color: 'white' }
                  : { background: 'var(--bg-card)', color: 'var(--text-subtle)', border: '1px solid var(--border)' }),
              }}>
              {PROFILE_LABELS[key].label}
            </button>
          ))}
        </div>

        {/* Natural language search bar */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <Image src="/images/compy-logo.png" alt="" width={22} height={22}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 compy-logo" />
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder={isFr
              ? 'Demande-moi : un portable pour le bureau, un Mac pour le montage... (Entrée pour chercher)'
              : 'Ask me: a laptop for work, a Mac for editing... (Enter to search)'}
            className="w-full rounded-xl border border-[var(--border)] bg-white text-[var(--text)] text-sm pl-12 pr-20 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
            style={{ minHeight: '48px' }}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {searchInput && (
              <button type="button" onClick={() => { setSearchInput(''); reset() }}
                className="text-[var(--text-muted)] hover:text-[var(--text)] p-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            )}
            <button type="submit" disabled={searching || !searchInput.trim()}
              className="rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all disabled:opacity-30"
              style={{ background: 'var(--accent)', color: 'white' }}>
              {searching
                ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>}
            </button>
          </div>
        </form>

        {/* Search intent feedback */}
        {searchIntent && searchInput && (
          <div className="flex items-start gap-2.5 rounded-lg px-4 py-3" style={{ background: 'var(--accent-bg)', border: '1px solid var(--border)' }}>
            <Image src="/images/compy-logo.png" alt="" width={20} height={20} className="compy-logo shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm leading-relaxed text-[var(--text-subtle)]">
                {searchIntent.feedback}
              </p>
              {searching && (
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="inline-block w-3 h-3 border-2 border-[var(--accent)]/30 border-t-[var(--accent)] rounded-full animate-spin" />
                  <span className="text-xs text-[var(--text-muted)]">
                    {isFr ? 'Analyse en cours...' : 'Analyzing...'}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-6 items-start overflow-hidden">

        {/* ── Left sidebar (sticky) ────────────────────────────── */}
        <aside
          className="hidden lg:block shrink-0 sticky"
          style={{ top: '5rem', width: '240px' }}
        >
          <div className="space-y-5">

            {/* Category filter — Computers group */}
            <div>
              <p className="font-bold mb-1.5 text-xs uppercase tracking-wider text-[var(--text)]">
                {isFr ? 'Ordinateurs' : 'Computers'}
              </p>
              <div className="flex flex-col gap-2">
                {COMPUTER_CATEGORIES.map(key => (
                  <button key={key} onClick={() => toggle('category', key)}
                    className="text-sm px-3.5 py-2 rounded-lg font-medium transition-all text-left w-full"
                    style={{
                      minHeight: '44px',
                      ...(filters.category === key
                        ? { background: 'var(--accent)', color: 'white' }
                        : { background: 'var(--bg-card)', color: 'var(--text-subtle)' }),
                    }}>
                    {CATEGORY_LABELS[key]}
                  </button>
                ))}
              </div>
            </div>

            {/* Category filter — Accessories group */}
            <div>
              <p className="font-bold mb-1.5 text-xs uppercase tracking-wider text-[var(--text)]">
                {isFr ? 'Écrans & Docks' : 'Monitors & Docks'}
              </p>
              <div className="flex flex-col gap-2">
                {ACCESSORY_CATEGORIES.map(key => (
                  <button key={key} onClick={() => toggle('category', key)}
                    className="text-sm px-3.5 py-2 rounded-lg font-medium transition-all text-left w-full"
                    style={{
                      minHeight: '44px',
                      ...(filters.category === key
                        ? { background: 'var(--accent)', color: 'white' }
                        : { background: 'var(--bg-card)', color: 'var(--text-subtle)' }),
                    }}>
                    {CATEGORY_LABELS[key]}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget filter */}
            <FilterGroup
              label={cat.budgetLabel}
              options={Object.keys(BUDGET_LABELS) as BudgetTier[]}
              active={filters.budget}
              getLabel={(k) => BUDGET_LABELS[k]}
              onToggle={(k) => toggle('budget', k)}
            />

            {/* Reset */}
            {hasFilters && (
              <button onClick={reset}
                className="text-sm font-medium transition-colors text-[var(--accent)] underline w-full text-left">
                {cat.clearFilters}
              </button>
            )}

            {/* ── Compy summary ────────────────────────────────── */}
            <div className="rounded-xl p-3.5 mt-2" style={{
              background: 'var(--accent-bg)',
              border: '1px solid var(--border)',
            }}>
              <div className="flex items-center gap-2 mb-2">
                <Image src="/images/compy-logo.png" alt="Compy" width={28} height={28}
                  className="compy-logo shrink-0" />
                <span className="text-xs font-bold text-[var(--accent)]">Compy</span>
              </div>
              <p className="text-xs leading-relaxed text-[var(--text-subtle)]">
                {compySummary}
              </p>
              {filterHistory.length > 0 && (
                <div className="mt-2 pt-2 border-t border-[var(--border)]">
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-1 text-[var(--text-muted)]">
                    {isFr ? 'Tes recherches' : 'Your searches'}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {filterHistory.map((entry, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}>
                        {entry.split(': ')[1]}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA link */}
            <div className="rounded-xl p-3.5" style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
            }}>
              <p className="text-xs mb-2 text-[var(--text-subtle)]">
                {isFr ? 'Pas certain de ton choix ?' : 'Not sure which one?'}
              </p>
              <Link href={`/${locale}/comparateur`} className="text-xs font-semibold text-[var(--accent)] hover:underline">
                {isFr ? 'M\'aider à choisir →' : 'Help me choose →'}
              </Link>
            </div>
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Mobile filters (categories + budget, visible on smaller screens) */}
          <div className="lg:hidden mb-6 space-y-4">
            <FilterGroup
              label={isFr ? 'Ordinateurs' : 'Computers'}
              options={COMPUTER_CATEGORIES}
              active={filters.category}
              getLabel={(k) => CATEGORY_LABELS[k]}
              onToggle={(k) => toggle('category', k)}
              inline
            />
            <FilterGroup
              label={isFr ? 'Écrans & Docks' : 'Monitors & Docks'}
              options={ACCESSORY_CATEGORIES}
              active={filters.category}
              getLabel={(k) => CATEGORY_LABELS[k]}
              onToggle={(k) => toggle('category', k)}
              inline
            />
            <FilterGroup
              label={cat.budgetLabel}
              options={Object.keys(BUDGET_LABELS) as BudgetTier[]}
              active={filters.budget}
              getLabel={(k) => BUDGET_LABELS[k]}
              onToggle={(k) => toggle('budget', k)}
              inline
            />
            {hasFilters && (
              <button onClick={reset}
                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90"
                style={{ background: 'var(--accent)', color: 'white', minHeight: '40px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
                {isFr ? 'Réinitialiser' : 'Reset filters'}
              </button>
            )}
          </div>

          {/* Results count + reset button */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-[var(--text-muted)]">
              {filtered.length} {filtered.length > 1 ? cat.productPlural : cat.productSingular}
              {hasFilters ? ` ${cat.matching}` : ` ${cat.total}`}
            </p>
            {hasFilters && (
              <button onClick={reset}
                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90"
                style={{ background: 'var(--accent)', color: 'white', minHeight: '40px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
                {isFr ? 'Réinitialiser' : 'Reset filters'}
              </button>
            )}
          </div>

          {/* Product grid */}
          <h2 className="sr-only">{isFr ? 'Produits' : 'Products'}</h2>
          {filtered.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
                {visibleProducts.map((p, i) => (
                  <React.Fragment key={p.id}>
                    <ProductCard product={p} />
                    {i === 5 && visibleProducts.length > 6 && (
                      <div className="col-span-full">
                        <AdBanner slot="6409853100" format="in-feed" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Load more / infinite scroll sentinel */}
              {hasMore && (
                <div ref={loadMoreRef} className="flex flex-col items-center gap-3 mt-8">
                  <button
                    onClick={() => setVisibleCount(v => Math.min(v + PAGE_SIZE, filtered.length))}
                    className="btn-outline"
                    style={{ padding: '0.75rem 2rem', fontSize: '0.9375rem', minHeight: '44px' }}
                  >
                    {isFr
                      ? `Voir plus (${Math.min(PAGE_SIZE, sortedFiltered.length - visibleCount)} de plus)`
                      : `Show more (${Math.min(PAGE_SIZE, sortedFiltered.length - visibleCount)} more)`}
                  </button>
                  <p className="text-xs text-[var(--text-muted)]">
                    {visibleCount} / {sortedFiltered.length}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="card text-center" style={{ padding: '3rem 2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }} aria-hidden>
                🔍
              </div>
              <p className="text-xl font-bold mb-3 text-[var(--text)]">
                {cat.noProducts}
              </p>
              <p className="text-base leading-relaxed mb-2 text-[var(--text-muted)]">
                {cat.noProductsHint}
              </p>
              <p className="text-base mb-6 text-[var(--text-muted)]">
                {cat.noProductsSuggestion}
              </p>
              <button onClick={reset}
                className="btn-primary"
                style={{ padding: '0.75rem 2rem', fontSize: '1rem', minHeight: '44px' }}>
                {cat.viewAll}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Filter group sub-component ──────────────────────────────────── */
function FilterGroup<T extends string>({ label, options, active, getLabel, onToggle, inline }: {
  label: string
  options: T[]
  active: T | null
  getLabel: (k: T) => string
  onToggle: (k: T) => void
  inline?: boolean
}) {
  return (
    <div>
      <p className={`font-bold mb-1.5 text-[var(--text)] ${inline ? 'text-sm' : 'text-xs uppercase tracking-wider'}`}>
        {label}
      </p>
      <div className={`flex ${inline ? 'flex-wrap' : 'flex-col'} gap-2`}>
        {options.map(key => (
          <button key={key} onClick={() => onToggle(key)}
            className={`text-sm px-3.5 py-2 rounded-lg font-medium transition-all text-left ${inline ? '' : 'w-full'}`}
            style={{
              minHeight: '44px',
              ...(active === key
                ? { background: 'var(--accent)', color: 'white' }
                : { background: 'var(--bg-card)', color: 'var(--text-subtle)' }),
            }}>
            {getLabel(key)}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── AI product scoring ────────────────────────────────────────── */
function scoreProductsFromAI(
  products: CatalogueProduct[],
  aiResponse: { specs?: { cpu?: string; ram?: string; ssd?: string; gpu?: string; budget?: string }; usage_detected?: string[]; archetype?: string },
): Map<string, number> {
  const scores = new Map<string, number>()
  if (!aiResponse.specs) {
    products.forEach(p => scores.set(p.id, p.aiScore))
    return scores
  }

  // Parse budget
  const budgetStr = aiResponse.specs.budget || ''
  const nums = budgetStr.match(/\d[\d\s]*\d|\d+/g)?.map(n => parseInt(n.replace(/\s/g, ''), 10)) || []
  const budgetMin = nums.length >= 1 ? nums[0] : 0
  const budgetMax = nums.length >= 2 ? nums[1] : nums.length === 1 ? nums[0] * 1.3 : Infinity

  // Map usage to profiles
  const usageMap: Record<string, ProfileTag> = {
    web: 'basic', bureautique: 'work', office: 'work',
    etudes: 'student', school: 'student',
    video: 'creative', creation: 'creative', creative: 'creative',
    gaming: 'gaming',
  }
  const targetProfiles = (aiResponse.usage_detected || []).map(u => usageMap[u]).filter(Boolean)

  // Keyword matching from AI specs
  const specKeywords: string[] = []
  if (aiResponse.specs.cpu) specKeywords.push(...aiResponse.specs.cpu.toLowerCase().split(/[\s,/()]+/).filter(w => w.length > 2))
  if (aiResponse.specs.gpu) specKeywords.push(...aiResponse.specs.gpu.toLowerCase().split(/[\s,/()]+/).filter(w => w.length > 2))
  if (aiResponse.specs.ram) specKeywords.push(...aiResponse.specs.ram.toLowerCase().match(/\d+/g) || [])

  const needsGpu = (aiResponse.usage_detected || []).some(u => ['gaming', 'video', 'creation', 'creative'].includes(u))

  for (const p of products) {
    let score = 0

    // Budget proximity (0-35)
    if (budgetMin > 0 || budgetMax < Infinity) {
      if (p.price >= budgetMin * 0.8 && p.price <= budgetMax * 1.2) score += 35
      else if (p.price >= budgetMin * 0.5 && p.price <= budgetMax * 1.5) score += 15
    } else {
      score += 20 // neutral
    }

    // Profile match (0-25)
    if (targetProfiles.length > 0) {
      const matches = targetProfiles.filter(tp => p.profiles.includes(tp)).length
      score += Math.round((matches / targetProfiles.length) * 25)
    } else {
      score += 12
    }

    // GPU match (0-15)
    if (needsGpu && p.specs.gpu && !p.specs.gpu.toLowerCase().includes('intégré') && !p.specs.gpu.toLowerCase().includes('integrated')) score += 15
    else if (!needsGpu) score += 8

    // Spec keyword match (0-15)
    if (specKeywords.length > 0) {
      const haystack = `${p.specs.cpu} ${p.specs.ram} ${p.specs.gpu || ''} ${p.specs.storage} ${p.specs.display || ''}`.toLowerCase()
      const hits = specKeywords.filter(kw => haystack.includes(kw)).length
      score += Math.min(15, Math.round((hits / specKeywords.length) * 15))
    }

    // Base AI score bonus (0-10)
    score += Math.round((p.aiScore / 100) * 10)

    scores.set(p.id, score)
  }

  return scores
}

/* ── Natural language search parser ─────────────────────────────── */
type SearchIntent = {
  category: Category | null
  budget: BudgetTier | null
  profile: ProfileTag | null
  keywords: string[]
  feedback: string
}

function parseSearchQuery(query: string, isFr: boolean): SearchIntent {
  const q = query.toLowerCase().trim()
  let category: Category | null = null
  let budget: BudgetTier | null = null
  let profile: ProfileTag | null = null
  const feedbackParts: string[] = []
  const usedWords = new Set<string>()

  // ── Category detection ──
  const categoryMap: [RegExp, Category, string, string][] = [
    [/\b(portable|laptop|portatif|notebook)\b/, 'laptop', 'Portables', 'Laptops'],
    [/\b(bureau|desktop|tour|fixe)\b/, 'desktop', 'Ordinateurs de bureau', 'Desktops'],
    [/\b(mac|macbook|apple|imac)\b/, 'apple', 'Apple (Mac)', 'Apple (Mac)'],
    [/\b(chromebook)\b/, 'chromebook', 'Chromebooks', 'Chromebooks'],
    [/\b(moniteur|écran|screen|monitor|display)\b/, 'monitor', 'Moniteurs', 'Monitors'],
    [/\b(dock|station|hub)\b/, 'dock', 'Docks & Stations', 'Docks & Stations'],
  ]
  for (const [re, cat, labelFr, labelEn] of categoryMap) {
    if (re.test(q)) {
      category = cat
      feedbackParts.push(isFr ? `Catégorie : ${labelFr}` : `Category: ${labelEn}`)
      q.match(re)?.[0] && usedWords.add(q.match(re)![0])
      break
    }
  }

  // ── Budget detection ──
  const budgetPatterns: [RegExp, BudgetTier, string, string][] = [
    [/\b(pas cher|cheap|économique|budget|entrée de gamme|entry.?level|abordable|affordable)\b/, 'under500', 'Moins de 500 $', 'Under $500'],
    [/\b(moins de 500|under.?500)\b/, 'under500', 'Moins de 500 $', 'Under $500'],
    [/\b(500.{0,5}(à|to|-)?.{0,5}900|milieu de gamme|mid.?range)\b/, '500to900', '500 $ à 900 $', '$500 to $900'],
    [/\b(900.{0,5}(à|to|-)?.{0,5}1500|haut de gamme|high.?end)\b/, '900to1500', '900 $ à 1 500 $', '$900 to $1,500'],
    [/\b(plus de 1500|over.?1500|premium|pro|performance)\b/, 'over1500', 'Plus de 1 500 $', 'Over $1,500'],
    [/\b(cher|expensive|puissant|powerful|bête de course|beast)\b/, 'over1500', 'Plus de 1 500 $', 'Over $1,500'],
  ]
  for (const [re, tier, labelFr, labelEn] of budgetPatterns) {
    if (re.test(q)) {
      budget = tier
      feedbackParts.push(isFr ? `Budget : ${labelFr}` : `Budget: ${labelEn}`)
      break
    }
  }

  // ── Profile detection ──
  const profilePatterns: [RegExp, ProfileTag, string, string][] = [
    [/\b(jeu|jeux|gaming|gamer|jouer|fortnite|valorant|steam)\b/, 'gaming', 'Pour jouer', 'For gaming'],
    [/\b(travail|bureau|office|work|professionnel|business|zoom|excel)\b/, 'work', 'Pour travailler', 'For work'],
    [/\b(étud|school|student|cours|université|cégep|college)\b/, 'student', 'Pour les études', 'For school'],
    [/\b(créat|montage|design|photo|vidéo|video|editing|photoshop|creative)\b/, 'creative', 'Pour créer', 'For creative work'],
    [/\b(simple|basic|courriel|email|facebook|youtube|navigation|browsing|débuter|beginner)\b/, 'basic', 'Pour débuter', 'For basics'],
  ]
  for (const [re, prof, labelFr, labelEn] of profilePatterns) {
    if (re.test(q)) {
      profile = prof
      feedbackParts.push(isFr ? `Profil : ${labelFr}` : `Profile: ${labelEn}`)
      break
    }
  }

  // ── Extract remaining keywords (brands, specs) ──
  const brandPatterns = /\b(dell|hp|lenovo|asus|acer|microsoft|surface|samsung|msi|razer|intel|amd|ryzen|i5|i7|i9|m[1-5]|16.?go|32.?go|16.?gb|32.?gb|1.?to|2.?to|1.?tb|2.?tb|rtx|geforce|radeon|oled|4k)\b/gi
  const brandMatches = q.match(brandPatterns) || []
  const keywords = brandMatches.filter(w => !usedWords.has(w.toLowerCase()))

  if (keywords.length > 0) {
    feedbackParts.push(isFr
      ? `Mots-clés : ${keywords.join(', ')}`
      : `Keywords: ${keywords.join(', ')}`)
  }

  // ── Build feedback message ──
  let feedback: string
  if (feedbackParts.length === 0) {
    feedback = isFr
      ? `Je cherche dans les noms, marques et specs pour "${query}"...`
      : `Searching names, brands and specs for "${query}"...`
    // Use the full query as keyword search
    keywords.push(...q.split(/\s+/).filter(w => w.length > 2))
  } else {
    feedback = isFr
      ? `J'ai compris ! ${feedbackParts.join(' · ')}. Voici ce que j'ai trouvé.`
      : `Got it! ${feedbackParts.join(' · ')}. Here's what I found.`
  }

  return { category, budget, profile, keywords, feedback }
}

/* ── Build contextual Compy message ──────────────────────────────── */
function buildCompySummary(
  filters: FilterState,
  count: number,
  total: number,
  isFr: boolean,
): string {
  if (!filters.profile && !filters.budget && !filters.category) {
    return isFr
      ? `${total} ordinateurs dans le catalogue. Utilise les filtres pour affiner ta recherche !`
      : `${total} computers in the catalogue. Use the filters to narrow your search!`
  }

  const parts: string[] = []

  if (filters.profile) {
    const label = PROFILE_LABELS[filters.profile]?.label
    parts.push(isFr ? `profil « ${label} »` : `"${label}" profile`)
  }
  if (filters.budget) {
    const label = BUDGET_LABELS[filters.budget]
    parts.push(isFr ? `budget ${label}` : `${label} budget`)
  }
  if (filters.category) {
    const label = CATEGORY_LABELS[filters.category]
    parts.push(isFr ? `catégorie ${label}` : `${label} category`)
  }

  const filterText = parts.join(isFr ? ' + ' : ' + ')

  if (count === 0) {
    return isFr
      ? `Aucun résultat pour ${filterText}. Essaie d'élargir tes critères.`
      : `No results for ${filterText}. Try broadening your criteria.`
  }

  if (count <= 3) {
    return isFr
      ? `${count} résultat${count > 1 ? 's' : ''} pour ${filterText}. Belle sélection ciblée !`
      : `${count} result${count > 1 ? 's' : ''} for ${filterText}. Nice targeted selection!`
  }

  return isFr
    ? `${count} ordis correspondent à ${filterText}. Tu peux affiner avec un autre filtre.`
    : `${count} computers match ${filterText}. You can refine with another filter.`
}
