'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import SPEC_TOOLTIPS, { resolveSpecKey } from '@/data/spec-tooltips'
import { useTranslation } from '@/i18n/DictionaryContext'

interface Props {
  /** The spec key: cpu, ram, storage, gpu, display, battery — or a label like "Processeur" */
  specKey: string
}

export default function SpecTooltip({ specKey }: Props) {
  const resolved = resolveSpecKey(specKey)
  if (!resolved) return null
  const data = SPEC_TOOLTIPS[resolved]
  if (!data) return null

  return <TooltipBubble label={data.label} tip={data.tip} />
}

function TooltipBubble({ label, tip }: { label: string; tip: string }) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState<{ top: number; left: number; above: boolean } | null>(null)
  const triggerRef = useRef<HTMLSpanElement>(null)
  const [mounted, setMounted] = useState(false)
  const { t, locale } = useTranslation()

  useEffect(() => { setMounted(true) }, [])

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const above = rect.top > 220
    setCoords({
      left: rect.left + rect.width / 2,
      top: above ? rect.top - 8 : rect.bottom + 8,
      above,
    })
  }, [])

  const handleOpen = useCallback(() => {
    updatePosition()
    setOpen(true)
  }, [updatePosition])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <span
      ref={triggerRef}
      className="inline-flex items-center"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onClick={() => { if (open) handleClose(); else handleOpen() }}
    >
      <span
        className="inline-flex items-center justify-center rounded-full cursor-help"
        style={{
          width: '1rem',
          height: '1rem',
          fontSize: '0.6rem',
          fontWeight: 700,
          background: 'var(--bg-subtle)',
          color: 'var(--text-muted)',
          lineHeight: 1,
          flexShrink: 0,
        }}
        aria-label={`Info : ${label}`}
      >
        ?
      </span>

      {open && coords && mounted && createPortal(
        <div
          className="fixed z-[9999]"
          style={{
            left: coords.left,
            top: coords.above ? coords.top : coords.top,
            transform: coords.above
              ? 'translate(-50%, -100%)'
              : 'translate(-50%, 0)',
            pointerEvents: 'auto',
          }}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          <div
            className="rounded-xl shadow-xl text-left"
            style={{
              width: '18rem',
              padding: '0.875rem 1rem',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
              animation: 'tooltipIn 0.15s ease-out',
            }}
          >
            {/* Arrow */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                ...(coords.above
                  ? { bottom: '-5px', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid var(--bg)' }
                  : { top: '-5px', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '6px solid var(--bg)' }),
                width: 0,
                height: 0,
                filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.08))',
              }}
            />
            <span className="block text-xs font-bold mb-1" style={{ color: 'var(--accent)' }}>
              {label}
            </span>
            <span className="block text-xs leading-relaxed" style={{ color: 'var(--text-subtle)' }}>
              {tip}
            </span>
            <span className="block text-xs mt-1.5">
              <a href={`/${locale}/glossaire`} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                {t.tooltip.glossaryLink}
              </a>
            </span>
          </div>
        </div>,
        document.body
      )}
    </span>
  )
}
