'use client'
import { useState, useEffect, useRef } from 'react'
import { useAnalogy, type AnalogyMode } from '@/contexts/AnalogyContext'

interface Props {
  /** 'pill' = compact inline toggle, 'card' = large card with descriptions */
  variant?: 'pill' | 'card'
}

const TOAST_LABELS: Record<AnalogyMode, string> = {
  body: 'Toutes les explications seront basées sur l\u2019analogie du corps humain',
  car: 'Toutes les explications seront basées sur l\u2019analogie de l\u2019automobile',
}

export default function AnalogyToggle({ variant = 'pill' }: Props) {
  const { mode, setMode } = useAnalogy()
  const [toast, setToast] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isFirstRender = useRef(true)

  // Show toast on mode change (not on first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setToast(TOAST_LABELS[mode])
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setToast(null), 5000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [mode])

  if (variant === 'card') {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setMode('body')}
          className="flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all"
          style={{
            borderColor: mode === 'body' ? '#2563eb' : '#e2e8f0',
            background: mode === 'body' ? '#eff6ff' : 'white',
          }}
        >
          <span className="text-3xl">🧠</span>
          <span className="font-semibold" style={{ color: '#0f172a' }}>Corps humain</span>
        </button>
        <button
          onClick={() => setMode('car')}
          className="flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all"
          style={{
            borderColor: mode === 'car' ? '#2563eb' : '#e2e8f0',
            background: mode === 'car' ? '#eff6ff' : 'white',
          }}
        >
          <span className="text-3xl">🚗</span>
          <span className="font-semibold" style={{ color: '#0f172a' }}>Automobile</span>
        </button>
      </div>
    )
  }

  // Pill variant (compact for header)
  const bodyActive = mode === 'body'

  return (
    <div className="inline-flex items-center gap-2">
      <div className="relative inline-flex items-center rounded-full p-0.5" style={{ background: '#e2e8f0' }}>
        {/* Sliding highlight */}
        <div
          className="absolute top-0.5 bottom-0.5 rounded-full"
          style={{
            width: 'calc(50% - 2px)',
            left: bodyActive ? '2px' : 'calc(50%)',
            background: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        <button
          onClick={() => setMode('body')}
          className="relative z-10 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
          style={{
            color: bodyActive ? '#2563eb' : '#64748b',
            transition: 'color 0.2s ease',
            background: 'transparent',
          }}
          title="Explications avec analogies du corps humain"
        >
          🧠 <span className="hidden sm:inline">Corps</span>
        </button>
        <button
          onClick={() => setMode('car')}
          className="relative z-10 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
          style={{
            color: !bodyActive ? '#2563eb' : '#64748b',
            transition: 'color 0.2s ease',
            background: 'transparent',
          }}
          title="Explications avec analogies automobiles"
        >
          🚗 <span className="hidden sm:inline">Auto</span>
        </button>
      </div>

      {/* Toast message */}
      <span
        className="text-xs whitespace-nowrap overflow-hidden"
        style={{
          color: '#64748b',
          maxWidth: toast ? '24rem' : '0',
          opacity: toast ? 1 : 0,
          transition: 'opacity 0.3s ease, max-width 0.3s ease',
        }}
      >
        {toast}
      </span>
    </div>
  )
}
