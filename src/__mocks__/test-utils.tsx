import React, { type ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { I18nProvider } from '@/i18n/DictionaryContext'
import { AnalogyProvider } from '@/contexts/AnalogyContext'
import fr from '@/i18n/dictionaries/fr'

/** Wraps children with all required providers (i18n + Analogy) */
function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider dictionary={fr} locale="fr">
      <AnalogyProvider>
        {children}
      </AnalogyProvider>
    </I18nProvider>
  )
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllProviders, ...options })
}

// Re-export everything from RTL
export * from '@testing-library/react'
export { customRender as render }
