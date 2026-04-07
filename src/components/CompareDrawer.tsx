'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useCompare } from '@/contexts/CompareContext'
import { SOURCE_LABELS } from '@/types/catalogue'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function CompareDrawer() {
  const [open, setOpen] = useState(false)
  const { items, removeItem, clearItems } = useCompare()
  const { t } = useTranslation()
  const c = t.compare

  if (items.length === 0) return null

  return (
    <>
      {/* Floating compare button — bottom-left */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg font-semibold text-sm text-white transition-transform hover:scale-105"
        style={{ background: 'var(--accent)' }}
        aria-label={c.button}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
        </svg>
        {c.button}
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold bg-white text-[var(--accent)]">
          {items.length}
        </span>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer — slides up from bottom */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[70] bg-[var(--bg-card)] border-t border-[var(--border)] shadow-2xl transition-transform duration-300 ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '85vh', borderRadius: '1rem 1rem 0 0' }}
        role="dialog"
        aria-modal="true"
        aria-label={c.title}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <h2 className="text-lg font-bold text-[var(--text)]">{c.title}</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={clearItems}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--warn)] transition-colors"
            >
              {c.clear}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] transition-colors"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Comparison table */}
        <div className="overflow-auto p-5" style={{ maxHeight: 'calc(85vh - 4rem)' }}>
          {items.length === 0 ? (
            <p className="text-center text-[var(--text-muted)] py-12">{c.empty}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse" style={{ minWidth: items.length > 1 ? '600px' : '300px' }}>
                <thead>
                  <tr>
                    <th className="text-left py-2 px-3 font-semibold text-[var(--text-muted)] w-28" />
                    {items.map(p => (
                      <th key={p.id} className="py-2 px-3 text-center" style={{ minWidth: '200px' }}>
                        <button
                          onClick={() => removeItem(p.id)}
                          className="text-xs text-[var(--warn)] hover:underline mb-1"
                        >
                          {c.remove}
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Image row */}
                  <tr className="border-t border-[var(--border)]">
                    <td className="py-3 px-3 font-medium text-[var(--text-muted)]">{c.labelImage}</td>
                    {items.map(p => (
                      <td key={p.id} className="py-3 px-3 text-center">
                        {p.imageUrl ? (
                          <div className="relative w-24 h-16 mx-auto">
                            <Image
                              src={p.imageUrl}
                              alt={`${p.brand} ${p.name}`}
                              fill
                              sizes="96px"
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-24 h-16 mx-auto bg-[var(--bg-subtle)] rounded flex items-center justify-center text-[var(--text-muted)] text-xs">
                            {p.brand}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Data rows */}
                  {([
                    { key: 'name', label: c.labelName, getValue: (p: typeof items[0]) => p.name },
                    { key: 'brand', label: c.labelBrand, getValue: (p: typeof items[0]) => p.brand },
                    { key: 'price', label: c.labelPrice, getValue: (p: typeof items[0]) => `${p.price.toLocaleString('fr-CA')} $` },
                    { key: 'cpu', label: c.labelCpu, getValue: (p: typeof items[0]) => p.specs.cpu },
                    { key: 'ram', label: c.labelRam, getValue: (p: typeof items[0]) => p.specs.ram },
                    { key: 'storage', label: c.labelStorage, getValue: (p: typeof items[0]) => p.specs.storage },
                    { key: 'gpu', label: c.labelGpu, getValue: (p: typeof items[0]) => p.specs.gpu || '—' },
                    { key: 'display', label: c.labelDisplay, getValue: (p: typeof items[0]) => p.specs.display || '—' },
                    { key: 'aiScore', label: c.labelAiScore, getValue: (p: typeof items[0]) => `${p.aiScore}/100` },
                    { key: 'source', label: c.labelSource, getValue: (p: typeof items[0]) => SOURCE_LABELS[p.source]?.label || p.source },
                    { key: 'link', label: c.labelLink, getValue: () => '' },
                  ] as const).map((row, i) => (
                    <tr key={row.key} className={i % 2 === 0 ? 'bg-[var(--bg-subtle)]' : ''}>
                      <td className="py-2.5 px-3 font-medium text-[var(--text-muted)] border-t border-[var(--border)]">
                        {row.label}
                      </td>
                      {items.map(p => (
                        <td key={p.id} className="py-2.5 px-3 text-center text-[var(--text)] border-t border-[var(--border)]">
                          {row.key === 'link' ? (
                            <a
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--accent)] hover:underline text-sm font-medium"
                            >
                              {SOURCE_LABELS[p.source]?.label || c.labelLink}
                            </a>
                          ) : row.key === 'aiScore' ? (
                            <span className="font-semibold text-[var(--warn)]">{row.getValue(p)}</span>
                          ) : row.key === 'price' ? (
                            <span className="font-bold">{row.getValue(p)}</span>
                          ) : (
                            row.getValue(p)
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
