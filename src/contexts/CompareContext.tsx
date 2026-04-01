'use client'
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { CatalogueProduct } from '@/types/catalogue'

const MAX_COMPARE = 3
const STORAGE_KEY = 'compare_ids'

interface CompareContextValue {
  items: CatalogueProduct[]
  addItem: (product: CatalogueProduct) => void
  removeItem: (id: string) => void
  clearItems: () => void
  isInCompare: (id: string) => boolean
}

const CompareContext = createContext<CompareContextValue | null>(null)

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CatalogueProduct[]>([])

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as CatalogueProduct[]
        if (Array.isArray(parsed)) {
          setItems(parsed.slice(0, MAX_COMPARE))
        }
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore storage errors
    }
  }, [items])

  const addItem = useCallback((product: CatalogueProduct) => {
    setItems(prev => {
      if (prev.length >= MAX_COMPARE) return prev
      if (prev.some(p => p.id === product.id)) return prev
      return [...prev, product]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(p => p.id !== id))
  }, [])

  const clearItems = useCallback(() => {
    setItems([])
  }, [])

  const isInCompare = useCallback((id: string) => {
    return items.some(p => p.id === id)
  }, [items])

  return (
    <CompareContext.Provider value={{ items, addItem, removeItem, clearItems, isInCompare }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be used within CompareProvider')
  return ctx
}
