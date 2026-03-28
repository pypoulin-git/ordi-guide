'use client'

import { useState, useCallback } from 'react'
import type { ProfileTag, BudgetTier, Category } from '@/types/catalogue'
import { PROFILE_LABELS, BUDGET_LABELS, CATEGORY_LABELS } from '@/types/catalogue'
import ProductCard from './ProductCard'
import type { CatalogueProduct } from '@/types/catalogue'
import { useTranslation } from '@/i18n/DictionaryContext'

type FilterState = {
  profile: ProfileTag | null
  budget: BudgetTier | null
  category: Category | null
}

export default function CatalogueFilters({ products }: { products: CatalogueProduct[] }) {
  const [filters, setFilters] = useState<FilterState>({
    profile: null,
    budget: null,
    category: null,
  })
  const { t } = useTranslation()
  const cat = t.catalogue

  const toggle = useCallback(<K extends keyof FilterState>(key: K, val: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: prev[key] === val ? null : val }))
  }, [])

  const filtered = products.filter(p => {
    if (filters.profile && !p.profiles.includes(filters.profile)) return false
    if (filters.budget && p.budgetTier !== filters.budget) return false
    if (filters.category && p.category !== filters.category) return false
    return true
  })

  const reset = () => setFilters({ profile: null, budget: null, category: null })
  const hasFilters = filters.profile || filters.budget || filters.category

  return (
    <>
      {/* Filters */}
      <div className="space-y-5 mb-8">

        {/* Profil */}
        <div>
          <p className="text-base font-bold mb-2 text-[var(--text)]">{cat.profileLabel}</p>
          <div className="flex flex-wrap gap-2.5">
            {(Object.keys(PROFILE_LABELS) as ProfileTag[]).map(key => (
              <button key={key} onClick={() => toggle('profile', key)}
                className="text-base px-4 py-2.5 rounded-full font-medium transition-colors"
                style={{
                  minHeight: '44px',
                  ...(filters.profile === key
                    ? { background: 'var(--accent)', color: 'white' }
                    : { background: 'var(--bg-card)', color: 'var(--text-subtle)' }),
                }}>
                {PROFILE_LABELS[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <p className="text-base font-bold mb-2 text-[var(--text)]">{cat.budgetLabel}</p>
          <div className="flex flex-wrap gap-2.5">
            {(Object.keys(BUDGET_LABELS) as BudgetTier[]).map(key => (
              <button key={key} onClick={() => toggle('budget', key)}
                className="text-base px-4 py-2.5 rounded-full font-medium transition-colors"
                style={{
                  minHeight: '44px',
                  ...(filters.budget === key
                    ? { background: 'var(--accent)', color: 'white' }
                    : { background: 'var(--bg-card)', color: 'var(--text-subtle)' }),
                }}>
                {BUDGET_LABELS[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Categorie */}
        <div>
          <p className="text-base font-bold mb-2 text-[var(--text)]">{cat.categoryLabel}</p>
          <div className="flex flex-wrap gap-2.5">
            {(Object.keys(CATEGORY_LABELS) as Category[]).map(key => (
              <button key={key} onClick={() => toggle('category', key)}
                className="text-base px-4 py-2.5 rounded-full font-medium transition-colors"
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

        {/* Reset */}
        {hasFilters && (
          <button onClick={reset}
            className="text-base font-medium transition-colors text-[var(--accent)] underline">
            {cat.clearFilters}
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-base mb-5 text-[var(--text-muted)]">
        {filtered.length} {filtered.length > 1 ? cat.productPlural : cat.productSingular}
        {hasFilters ? ` ${cat.matching}` : ` ${cat.total}`}
      </p>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
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
    </>
  )
}
