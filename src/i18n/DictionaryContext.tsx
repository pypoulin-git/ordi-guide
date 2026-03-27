'use client'
import { createContext, useContext } from 'react'
import type { Dictionary } from './dictionaries/fr'
import type { Locale } from './config'

type I18nContextValue = {
  t: Dictionary
  locale: Locale
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children, dictionary, locale }: {
  children: React.ReactNode
  dictionary: Dictionary
  locale: Locale
}) {
  return (
    <I18nContext.Provider value={{ t: dictionary, locale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useTranslation must be used within I18nProvider')
  return ctx
}
