'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type AnalogyMode = 'body' | 'car'

interface Analogy {
  name: string
  icon: string
  short: string
}

export const ANALOGIES: Record<string, Record<AnalogyMode, Analogy>> = {
  cpu: {
    body: { name: 'Le cerveau', icon: '🧠', short: 'la capacité de décision' },
    car:  { name: 'Le moteur', icon: '🏎️', short: 'la cylindrée' },
  },
  ram: {
    body: { name: 'Les poumons', icon: '🫁', short: 'le débit pour travailler' },
    car:  { name: 'La transmission', icon: '⚙️', short: 'la fluidité des rapports' },
  },
  ssd: {
    body: { name: 'La mémoire long terme', icon: '🧬', short: 'où tu ranges tes souvenirs' },
    car:  { name: 'Le coffre', icon: '🧳', short: 'la capacité de rangement' },
  },
  gpu: {
    body: { name: 'Le cortex visuel', icon: '👁️', short: 'les réflexes visuels' },
    car:  { name: 'Le turbo', icon: '💨', short: 'l\'accélération brute' },
  },
  battery: {
    body: { name: 'L\'endurance physique', icon: '🏃', short: 'combien de temps tu tiens' },
    car:  { name: 'Le réservoir', icon: '⛽', short: 'l\'autonomie en route' },
  },
  screen: {
    body: { name: 'Les yeux', icon: '👀', short: 'ce que tu vois' },
    car:  { name: 'Le pare-brise', icon: '🪟', short: 'la visibilité' },
  },
}

interface AnalogyCtx {
  mode: AnalogyMode
  setMode: (m: AnalogyMode) => void
  a: (component: string) => Analogy
  modeLabel: string
  modeIcon: string
}

const Ctx = createContext<AnalogyCtx>({
  mode: 'body',
  setMode: () => {},
  a: (c) => ANALOGIES[c]?.body ?? { name: c, icon: '❓', short: '' },
  modeLabel: 'Corps humain',
  modeIcon: '🧠',
})

export function AnalogyProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AnalogyMode>('body')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('shopcompy-analogy') as AnalogyMode | null
    if (stored === 'body' || stored === 'car') setModeState(stored)
    setLoaded(true)
  }, [])

  function setMode(m: AnalogyMode) {
    setModeState(m)
    localStorage.setItem('shopcompy-analogy', m)
  }

  function a(component: string): Analogy {
    return ANALOGIES[component]?.[mode] ?? { name: component, icon: '❓', short: '' }
  }

  const modeLabel = mode === 'body' ? 'Corps humain' : 'Automobile'
  const modeIcon = mode === 'body' ? '🧠' : '🚗'

  // Avoid hydration mismatch by rendering children only after loading localStorage
  if (!loaded) {
    return <>{children}</>
  }

  return (
    <Ctx.Provider value={{ mode, setMode, a, modeLabel, modeIcon }}>
      {children}
    </Ctx.Provider>
  )
}

export function useAnalogy() {
  return useContext(Ctx)
}
