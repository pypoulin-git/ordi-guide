'use client'
import { useState, useRef, useCallback, type ReactNode } from 'react'

interface Props {
  label: string
  children: ReactNode
  /** Position relative to the trigger element */
  position?: 'top' | 'bottom'
}

export default function GlassTooltip({ label, children, position = 'bottom' }: Props) {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setMounted(true)
    // Small delay for CSS transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
  }, [])

  const hide = useCallback(() => {
    setVisible(false)
    timerRef.current = setTimeout(() => setMounted(false), 300)
  }, [])

  const posStyle = position === 'top'
    ? { bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' } as const
    : { top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' } as const

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {mounted && (
        <span
          role="tooltip"
          className="absolute z-[9999] rounded-xl px-4 py-2 text-xs font-medium pointer-events-none"
          style={{
            ...posStyle,
            maxWidth: 'min(280px, 90vw)',
            whiteSpace: 'normal',
            textAlign: 'center',
            color: 'var(--text)',
            background: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.4)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          {label}
        </span>
      )}
    </span>
  )
}
