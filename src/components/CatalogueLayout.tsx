'use client'

import React, { useState, useCallback } from 'react'
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
}

export default function CatalogueLayout({ products }: { products: CatalogueProduct[] }) {
  const [filters, setFilters] = useState<FilterState>({
    profile: null, budget: null, category: null,
  })
  const [filterHistory, setFilterHistory] = useState<string[]>([])
  const { t, locale } = useTranslation()
  const cat = t.catalogue
  const isFr = locale === 'fr'

  const toggle = useCallback(<K extends keyof FilterState>(key: K, val: FilterState[K]) => {
    setFilters(prev => {
      const next = prev[key] === val ? null : val
      // Track filter changes for Compy summary
      if (next !== null) {
        const label = key === 'profile'
          ? PROFILE_LABELS[val as ProfileTag]?.label
          : key === 'budget'
            ? BUDGET_LABELS[val as BudgetTier]
            : CATEGORY_LABELS[val as Category]
        if (label) {
          setFilterHistory(h => {
            const entry = `${key}: ${label}`
            if (h.includes(entry)) return h
            return [...h.slice(-4), entry] // keep last 5
          })
        }
      }
      return { ...prev, [key]: next }
    })
  }, [])

  const filtered = products.filter(p => {
    if (filters.profile && !p.profiles.includes(filters.profile)) return false
    if (filters.budget && p.budgetTier !== filters.budget) return false
    if (filters.category && p.category !== filters.category) return false
    return true
  })

  const reset = () => setFilters({ profile: null, budget: null, category: null })
  const hasFilters = filters.profile || filters.budget || filters.category

  // Build Compy summary message
  const compySummary = buildCompySummary(filters, filtered.length, products.length, isFr)

  return (
    <div className="flex gap-6 items-start overflow-hidden">

      {/* ── Left sidebar (sticky) ────────────────────────────── */}
      <aside
        className="hidden lg:block shrink-0 sticky"
        style={{ top: '5rem', width: '240px', maxHeight: 'calc(100vh - 6rem)', overflowY: 'auto' }}
      >
        <div className="space-y-5">

          {/* Profile filter */}
          <FilterGroup
            label={cat.profileLabel}
            options={Object.keys(PROFILE_LABELS) as ProfileTag[]}
            active={filters.profile}
            getLabel={(k) => PROFILE_LABELS[k].label}
            onToggle={(k) => toggle('profile', k)}
          />

          {/* Budget filter */}
          <FilterGroup
            label={cat.budgetLabel}
            options={Object.keys(BUDGET_LABELS) as BudgetTier[]}
            active={filters.budget}
            getLabel={(k) => BUDGET_LABELS[k]}
            onToggle={(k) => toggle('budget', k)}
          />

          {/* Category filter */}
          <FilterGroup
            label={cat.categoryLabel}
            options={Object.keys(CATEGORY_LABELS) as Category[]}
            active={filters.category}
            getLabel={(k) => CATEGORY_LABELS[k]}
            onToggle={(k) => toggle('category', k)}
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

        {/* Mobile filters (visible on smaller screens) */}
        <div className="lg:hidden mb-6 space-y-4">
          <FilterGroup
            label={cat.profileLabel}
            options={Object.keys(PROFILE_LABELS) as ProfileTag[]}
            active={filters.profile}
            getLabel={(k) => PROFILE_LABELS[k].label}
            onToggle={(k) => toggle('profile', k)}
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
          <FilterGroup
            label={cat.categoryLabel}
            options={Object.keys(CATEGORY_LABELS) as Category[]}
            active={filters.category}
            getLabel={(k) => CATEGORY_LABELS[k]}
            onToggle={(k) => toggle('category', k)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 md:gap-7">
            {filtered.map((p, i) => (
              <React.Fragment key={p.id}>
                <ProductCard product={p} />
                {i === 5 && filtered.length > 6 && (
                  <div className="col-span-full">
                    <AdBanner slot="6409853100" format="in-feed" />
                  </div>
                )}
              </React.Fragment>
            ))}
            {filtered.length <= 6 && filtered.length > 0 && (
              <div className="col-span-full">
                <AdBanner slot="6409853100" format="in-feed" />
              </div>
            )}
          </div>
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
