'use client'
import { useAnalogy } from '@/contexts/AnalogyContext'

interface Props {
  /** 'pill' = compact inline toggle, 'card' = large card with descriptions */
  variant?: 'pill' | 'card'
}

export default function AnalogyToggle({ variant = 'pill' }: Props) {
  const { mode, setMode } = useAnalogy()

  if (variant === 'card') {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setMode('body')}
          className="flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left"
          style={{
            borderColor: mode === 'body' ? '#2563eb' : '#e2e8f0',
            background: mode === 'body' ? '#eff6ff' : 'white',
          }}
        >
          <span className="text-3xl">🧠</span>
          <div>
            <div className="font-semibold text-sm" style={{ color: '#0f172a' }}>Corps humain</div>
            <div className="text-xs" style={{ color: '#64748b' }}>CPU = cerveau, RAM = poumons…</div>
          </div>
        </button>
        <button
          onClick={() => setMode('car')}
          className="flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left"
          style={{
            borderColor: mode === 'car' ? '#2563eb' : '#e2e8f0',
            background: mode === 'car' ? '#eff6ff' : 'white',
          }}
        >
          <span className="text-3xl">🚗</span>
          <div>
            <div className="font-semibold text-sm" style={{ color: '#0f172a' }}>Automobile</div>
            <div className="text-xs" style={{ color: '#64748b' }}>CPU = moteur, RAM = transmission…</div>
          </div>
        </button>
      </div>
    )
  }

  // Pill variant (compact for header)
  return (
    <div className="inline-flex items-center rounded-full p-0.5" style={{ background: '#e2e8f0' }}>
      <button
        onClick={() => setMode('body')}
        className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all"
        style={{
          background: mode === 'body' ? 'white' : 'transparent',
          color: mode === 'body' ? '#2563eb' : '#64748b',
          boxShadow: mode === 'body' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
        }}
        title="Explications avec analogies du corps humain"
      >
        🧠 <span className="hidden sm:inline">Corps</span>
      </button>
      <button
        onClick={() => setMode('car')}
        className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all"
        style={{
          background: mode === 'car' ? 'white' : 'transparent',
          color: mode === 'car' ? '#2563eb' : '#64748b',
          boxShadow: mode === 'car' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
        }}
        title="Explications avec analogies automobiles"
      >
        🚗 <span className="hidden sm:inline">Auto</span>
      </button>
    </div>
  )
}
