'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useTranslation } from '@/i18n/DictionaryContext'

export type AnalogyMode = 'body' | 'car'

interface Analogy {
  name: string
  icon: string
  short: string
}

const ICONS: Record<string, Record<AnalogyMode, string>> = {
  cpu:     { body: '🧠', car: '🏎️' },
  ram:     { body: '🫁', car: '⚙️' },
  ssd:     { body: '🧬', car: '🧳' },
  gpu:     { body: '👁️', car: '💨' },
  battery: { body: '🏃', car: '⛽' },
  screen:  { body: '👀', car: '🪟' },
}

/* Build ANALOGIES from dictionary translations */
function buildAnalogies(t: ReturnType<typeof useTranslation>['t']): Record<string, Record<AnalogyMode, Analogy>> {
  const ta = t.analogy
  return {
    cpu: {
      body: { name: ta.cpuBody, icon: '🧠', short: ta.cpuBodyShort },
      car:  { name: ta.cpuCar, icon: '🏎️', short: ta.cpuCarShort },
    },
    ram: {
      body: { name: ta.ramBody, icon: '🫁', short: ta.ramBodyShort },
      car:  { name: ta.ramCar, icon: '⚙️', short: ta.ramCarShort },
    },
    ssd: {
      body: { name: ta.ssdBody, icon: '🧬', short: ta.ssdBodyShort },
      car:  { name: ta.ssdCar, icon: '🧳', short: ta.ssdCarShort },
    },
    gpu: {
      body: { name: ta.gpuBody, icon: '👁️', short: ta.gpuBodyShort },
      car:  { name: ta.gpuCar, icon: '💨', short: ta.gpuCarShort },
    },
    battery: {
      body: { name: ta.batteryBody, icon: '🏃', short: ta.batteryBodyShort },
      car:  { name: ta.batteryCar, icon: '⛽', short: ta.batteryCarShort },
    },
    screen: {
      body: { name: ta.screenBody, icon: '👀', short: ta.screenBodyShort },
      car:  { name: ta.screenCar, icon: '🪟', short: ta.screenCarShort },
    },
  }
}

/* Keep a static ANALOGIES export for backwards compat (French fallback) */
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
  const { t } = useTranslation()

  const analogies = buildAnalogies(t)

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
    return analogies[component]?.[mode] ?? { name: component, icon: '❓', short: '' }
  }

  const modeLabel = mode === 'body' ? t.analogy.bodyLabel : t.analogy.carLabel
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
