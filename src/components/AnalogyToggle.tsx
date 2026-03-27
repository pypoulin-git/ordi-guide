'use client'
import { useState, useEffect, useRef } from 'react'
import { useAnalogy, type AnalogyMode } from '@/contexts/AnalogyContext'
import { useTranslation } from '@/i18n/DictionaryContext'

interface Props {
  /** 'pill' = compact inline toggle, 'card' = large card with descriptions */
  variant?: 'pill' | 'card'
}

/* ── SVG illustration for body mode ──────────────────────────── */
function BodyIllustration({ size = 64 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" style={{ width: size, height: size }}>
      {/* Head silhouette */}
      <ellipse cx="40" cy="26" rx="14" ry="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      {/* Brain */}
      <path d="M32 22 Q34 16 40 16 Q46 16 48 22" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M33 26 Q36 20 40 22 Q44 20 47 26" stroke="#3b82f6" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M34 30 Q37 26 40 28 Q43 26 46 30" stroke="#93c5fd" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Pulse waves from brain */}
      <circle cx="40" cy="24" r="8" stroke="#2563eb" strokeWidth="0.6" opacity="0.2" />
      <circle cx="40" cy="24" r="12" stroke="#2563eb" strokeWidth="0.4" opacity="0.1" />
      {/* Body */}
      <path d="M40 42 L40 58" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 48 L30 54" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 48 L50 54" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 58 L33 70" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 58 L47 70" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      {/* Heart beat */}
      <circle cx="40" cy="50" r="2.5" fill="#ef4444" opacity="0.6" />
      <circle cx="40" cy="50" r="4" stroke="#ef4444" strokeWidth="0.5" opacity="0.3" />
      {/* Neural connections */}
      <circle cx="30" cy="20" r="1.2" fill="#60a5fa" />
      <circle cx="50" cy="20" r="1.2" fill="#60a5fa" />
      <circle cx="34" cy="32" r="1" fill="#93c5fd" />
      <circle cx="46" cy="32" r="1" fill="#93c5fd" />
    </svg>
  )
}

/* ── SVG illustration for car mode ───────────────────────────── */
function CarIllustration({ size = 64 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" style={{ width: size, height: size }}>
      {/* Car body */}
      <path d="M12 50 L18 36 Q22 30 30 28 L50 28 Q58 30 62 36 L68 50 Z"
        fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Roof / windshield */}
      <path d="M24 36 L30 24 L50 24 L56 36"
        fill="#fde68a" stroke="#d97706" strokeWidth="1.2" strokeLinejoin="round" />
      {/* Windshield glass */}
      <path d="M28 35 L32 26 L48 26 L52 35" fill="#bfdbfe" opacity="0.5" />
      {/* Body bottom */}
      <rect x="10" y="50" width="60" height="8" rx="3" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
      {/* Wheels */}
      <circle cx="24" cy="58" r="8" fill="#374151" stroke="#1f2937" strokeWidth="1.5" />
      <circle cx="24" cy="58" r="4" fill="#6b7280" />
      <circle cx="24" cy="58" r="1.5" fill="#9ca3af" />
      <circle cx="56" cy="58" r="8" fill="#374151" stroke="#1f2937" strokeWidth="1.5" />
      <circle cx="56" cy="58" r="4" fill="#6b7280" />
      <circle cx="56" cy="58" r="1.5" fill="#9ca3af" />
      {/* Headlight */}
      <ellipse cx="66" cy="46" rx="3" ry="2.5" fill="#fbbf24" opacity="0.8" />
      {/* Speed lines */}
      <line x1="2" y1="42" x2="10" y2="42" stroke="#d97706" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <line x1="4" y1="46" x2="10" y2="46" stroke="#d97706" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <line x1="2" y1="50" x2="8" y2="50" stroke="#d97706" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
      {/* Engine detail */}
      <rect x="56" y="38" width="8" height="4" rx="1" fill="#d97706" opacity="0.3" />
    </svg>
  )
}

/* ── Small inline SVG for pill toggle ────────────────────────── */
function BodyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16 }}>
      <ellipse cx="10" cy="7" rx="4.5" ry="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.2" />
      <path d="M8 6 Q9 4 10 4.5 Q11 4 12 6" stroke="#3b82f6" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M8.5 8 Q9.5 6.5 10 7 Q10.5 6.5 11.5 8" stroke="#93c5fd" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <line x1="10" y1="12" x2="10" y2="16" stroke="#2563eb" strokeWidth="1" strokeLinecap="round" />
      <line x1="10" y1="14" x2="7.5" y2="16" stroke="#2563eb" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="10" y1="14" x2="12.5" y2="16" stroke="#2563eb" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  )
}

function CarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16 }}>
      <path d="M3 12 L5 8 Q6 6 8 6 L12 6 Q14 6 15 8 L17 12 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="0.8" />
      <rect x="3" y="12" width="14" height="3" rx="1" fill="#f59e0b" stroke="#d97706" strokeWidth="0.6" />
      <circle cx="6.5" cy="15" r="2" fill="#374151" />
      <circle cx="6.5" cy="15" r="0.8" fill="#9ca3af" />
      <circle cx="13.5" cy="15" r="2" fill="#374151" />
      <circle cx="13.5" cy="15" r="0.8" fill="#9ca3af" />
      <path d="M7 11 L8.5 7.5 L11.5 7.5 L13 11" fill="#bfdbfe" opacity="0.4" />
    </svg>
  )
}

export default function AnalogyToggle({ variant = 'pill' }: Props) {
  const { mode, setMode } = useAnalogy()
  const { t } = useTranslation()
  const ta = t.analogy

  const TOAST_LABELS: Record<AnalogyMode, string> = {
    body: ta.bodyToast,
    car: ta.carToast,
  }

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  if (variant === 'card') {
    return (
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Body mode button */}
        <button
          onClick={() => setMode('body')}
          className="flex-1 flex flex-col items-center gap-2 rounded-2xl transition-all"
          style={{
            padding: '1.5rem 1rem 1.25rem',
            border: `2.5px solid ${mode === 'body' ? '#2563eb' : '#e2e8f0'}`,
            background: mode === 'body'
              ? 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)'
              : 'white',
            boxShadow: mode === 'body'
              ? '0 4px 16px rgba(37,99,235,0.15), inset 0 1px 0 rgba(255,255,255,0.8)'
              : '0 1px 3px rgba(0,0,0,0.05)',
            transform: mode === 'body' ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          <BodyIllustration size={72} />
          <span className="font-bold text-base" style={{ color: mode === 'body' ? '#1e40af' : '#64748b' }}>
            {ta.bodyLabel}
          </span>
          <span className="text-xs leading-snug" style={{ color: mode === 'body' ? '#3b82f6' : '#94a3b8' }}>
            {ta.bodyDesc}
          </span>
          {mode === 'body' && (
            <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ background: '#2563eb', color: 'white' }}>
              {ta.active}
            </span>
          )}
        </button>

        {/* Car mode button */}
        <button
          onClick={() => setMode('car')}
          className="flex-1 flex flex-col items-center gap-2 rounded-2xl transition-all"
          style={{
            padding: '1.5rem 1rem 1.25rem',
            border: `2.5px solid ${mode === 'car' ? '#d97706' : '#e2e8f0'}`,
            background: mode === 'car'
              ? 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)'
              : 'white',
            boxShadow: mode === 'car'
              ? '0 4px 16px rgba(217,119,6,0.15), inset 0 1px 0 rgba(255,255,255,0.8)'
              : '0 1px 3px rgba(0,0,0,0.05)',
            transform: mode === 'car' ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          <CarIllustration size={72} />
          <span className="font-bold text-base" style={{ color: mode === 'car' ? '#92400e' : '#64748b' }}>
            {ta.carLabel}
          </span>
          <span className="text-xs leading-snug" style={{ color: mode === 'car' ? '#d97706' : '#94a3b8' }}>
            {ta.carDesc}
          </span>
          {mode === 'car' && (
            <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ background: '#d97706', color: 'white' }}>
              {ta.active}
            </span>
          )}
        </button>
      </div>
    )
  }

  // ── Pill variant (compact for header) ──────────────────────
  const bodyActive = mode === 'body'

  // Track the displayed text separately for fade-out (show old text while fading)
  const [displayedToast, setDisplayedToast] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (toast) {
      setDisplayedToast(toast)
      // Small delay to trigger CSS transition after mount
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
    } else {
      setVisible(false)
      // Keep text visible during fade-out, then clear
      const t = setTimeout(() => setDisplayedToast(null), 400)
      return () => clearTimeout(t)
    }
  }, [toast])

  return (
    <div className="relative inline-flex flex-wrap items-center gap-2">
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
          className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
          style={{
            color: bodyActive ? '#2563eb' : '#64748b',
            transition: 'color 0.2s ease',
            background: 'transparent',
          }}
          title={ta.bodyTitle}
        >
          <BodyIcon /> <span className="hidden sm:inline">{ta.bodyShort}</span>
        </button>
        <button
          onClick={() => setMode('car')}
          className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
          style={{
            color: !bodyActive ? '#d97706' : '#64748b',
            transition: 'color 0.2s ease',
            background: 'transparent',
          }}
          title={ta.carTitle}
        >
          <CarIcon /> <span className="hidden sm:inline">{ta.carShort}</span>
        </button>
      </div>

      {/* Toast — fixed top-center, portal-style, never clipped */}
      {displayedToast && (
        <div
          className="fixed left-1/2 z-[9999]"
          style={{
            top: '5rem',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
        >
          <div
            className="text-sm leading-snug whitespace-nowrap rounded-full px-4 py-2 font-medium"
            style={{
              color: mode === 'body' ? '#1e40af' : '#92400e',
              background: mode === 'body' ? '#eff6ff' : '#fffbeb',
              border: `1px solid ${mode === 'body' ? '#bfdbfe' : '#fde68a'}`,
              boxShadow: mode === 'body'
                ? '0 4px 12px rgba(37,99,235,0.15)'
                : '0 4px 12px rgba(217,119,6,0.15)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.97)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}
          >
            {mode === 'body' ? <BodyIcon /> : <CarIcon />}{' '}
            {displayedToast}
          </div>
        </div>
      )}
    </div>
  )
}
