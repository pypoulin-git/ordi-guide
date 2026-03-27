'use client'

import { useState, useRef, useEffect } from 'react'
import SPEC_TOOLTIPS, { resolveSpecKey } from '@/data/spec-tooltips'

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
  const [above, setAbove] = useState(true)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setAbove(rect.top > 200)
    }
  }, [open])

  return (
    <span
      ref={ref}
      className="relative inline-flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(o => !o)}
    >
      <span
        className="inline-flex items-center justify-center rounded-full cursor-help"
        style={{
          width: '1rem',
          height: '1rem',
          fontSize: '0.6rem',
          fontWeight: 700,
          background: '#e2e8f0',
          color: '#64748b',
          lineHeight: 1,
          flexShrink: 0,
        }}
        aria-label={`Info : ${label}`}
      >
        ?
      </span>

      {open && (
        <span
          className="absolute z-50 rounded-lg shadow-lg text-left"
          style={{
            width: '16rem',
            padding: '0.75rem 1rem',
            background: 'white',
            border: '1px solid #e2e8f0',
            left: '50%',
            transform: 'translateX(-50%)',
            ...(above
              ? { bottom: '1.5rem' }
              : { top: '1.5rem' }),
          }}
        >
          <span className="block text-xs font-bold mb-1" style={{ color: '#2563eb' }}>
            {label}
          </span>
          <span className="block text-xs leading-relaxed" style={{ color: '#475569' }}>
            {tip}
          </span>
          <span className="block text-xs mt-1.5">
            <a href="/glossaire" style={{ color: '#2563eb', textDecoration: 'underline' }}>
              Voir le lexique complet →
            </a>
          </span>
        </span>
      )}
    </span>
  )
}
