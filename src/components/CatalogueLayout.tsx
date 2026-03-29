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
const ACCESSORY_CATEGORIES: Category[] = ['monitor', 'dock', 'peripheral', 'storage', 'accessory']

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

  const setSearch = useCallback((val: string) => {
    setFilters(prev => ({ ...prev, search: val }))
  }, [])

  const filtered = products.filter(p => {
    if (filters.profile && !p.profiles.includes(filters.profile)) return false
    if (filters.budget && p.budgetTier !== filters.budget) return false
    if (filters.category && p.category !== filters.category) return false
    if (filters.search) {
      const q = filters.search.toLowerCase()
      const haystack = `${p.name} ${p.brand} ${p.specs.cpu || ''} ${p.specs.gpu || ''} ${p.specs.ram || ''} ${p.aiRationale}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })

  // Reset pagination when filters change
  useEffect(() => { setVisibleCount(PAGE_SIZE) }, [filters.profile, filters.budget, filters.category, filters.search])

  const visibleProducts = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  // Infinite scroll
  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount(v => Math.min(v + PAGE_SIZE, filtered.length))
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [hasMore, filtered.length])

  const reset = () => setFilters({ profile: null, budget: null, category: null, search: '' })
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

        {/* Search bar */}
        <div className="relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={filters.search}
            onChange={e => setSearch(e.target.value)}
            placeholder={isFr ? 'Rechercher un produit, une marque, un CPU...' : 'Search a product, brand, CPU...'}
            className="w-full rounded-xl border border-[var(--border)] bg-white text-[var(--text)] text-sm pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
            style={{ minHeight: '48px' }}
          />
          {filters.search && (
            <button onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          )}
        </div>
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
                {isFr ? 'Accessoires & Périphériques' : 'Accessories & Peripherals'}
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
              label={isFr ? 'Accessoires' : 'Accessories'}
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
                className="text-sm font-medium text-[var(--accent)] underline">
                {cat.clearFilters}
              </button>
            )}
          </div>

          {/* Results count */}
          <p className="text-sm mb-4 text-[var(--text-muted)]">
            {filtered.length} {filtered.length > 1 ? cat.productPlural : cat.productSingular}
            {hasFilters ? ` ${cat.matching}` : ` ${cat.total}`}
          </p>

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
                      ? `Voir plus (${Math.min(PAGE_SIZE, filtered.length - visibleCount)} de plus)`
                      : `Show more (${Math.min(PAGE_SIZE, filtered.length - visibleCount)} more)`}
                  </button>
                  <p className="text-xs text-[var(--text-muted)]">
                    {visibleCount} / {filtered.length}
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
