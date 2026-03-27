'use client'

import { useState, useCallback } from 'react'
import type { ProfileTag, BudgetTier, Category } from '@/types/catalogue'
import { PROFILE_LABELS, BUDGET_LABELS, CATEGORY_LABELS } from '@/types/catalogue'
import ProductCard from './ProductCard'
import type { CatalogueProduct } from '@/types/catalogue'

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
          <p className="text-sm font-semibold mb-2" style={{ color: '#0f172a' }}>Profil</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PROFILE_LABELS) as ProfileTag[]).map(key => (
              <button key={key} onClick={() => toggle('profile', key)}
                className="text-sm px-3 py-1.5 rounded-full font-medium transition-colors"
                style={filters.profile === key
                  ? { background: '#2563eb', color: 'white' }
                  : { background: '#f1f5f9', color: '#475569' }
                }>
                {PROFILE_LABELS[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <p className="text-sm font-semibold mb-2" style={{ color: '#0f172a' }}>Budget</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(BUDGET_LABELS) as BudgetTier[]).map(key => (
              <button key={key} onClick={() => toggle('budget', key)}
                className="text-sm px-3 py-1.5 rounded-full font-medium transition-colors"
                style={filters.budget === key
                  ? { background: '#2563eb', color: 'white' }
                  : { background: '#f1f5f9', color: '#475569' }
                }>
                {BUDGET_LABELS[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Catégorie */}
        <div>
          <p className="text-sm font-semibold mb-2" style={{ color: '#0f172a' }}>Catégorie</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(CATEGORY_LABELS) as Category[]).map(key => (
              <button key={key} onClick={() => toggle('category', key)}
                className="text-sm px-3 py-1.5 rounded-full font-medium transition-colors"
                style={filters.category === key
                  ? { background: '#2563eb', color: 'white' }
                  : { background: '#f1f5f9', color: '#475569' }
                }>
                {CATEGORY_LABELS[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Reset */}
        {hasFilters && (
          <button onClick={reset}
            className="text-sm font-medium transition-colors"
            style={{ color: '#2563eb' }}>
            Effacer les filtres
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm mb-5" style={{ color: '#94a3b8' }}>
        {filtered.length} {filtered.length > 1 ? 'produits' : 'produit'}
        {hasFilters ? ' correspondants' : ' au total'}
      </p>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <p className="text-lg font-semibold mb-2" style={{ color: '#0f172a' }}>
            Aucun produit trouvé
          </p>
          <p style={{ color: '#64748b' }}>
            Essaie d&apos;ajuster tes filtres pour voir plus de résultats.
          </p>
          <button onClick={reset}
            className="btn-primary mt-4"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
            Voir tous les produits
          </button>
        </div>
      )}
    </>
  )
}
