'use client'
import Link from 'next/link'
import type { CatalogueProduct } from '@/types/catalogue'
import { SOURCE_LABELS, PROFILE_LABELS } from '@/types/catalogue'
import SpecTooltip from './SpecTooltip'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function ProductCard({ product }: { product: CatalogueProduct }) {
  const source = SOURCE_LABELS[product.source]
  const { t, locale } = useTranslation()
  const cat = t.catalogue

  return (
    <Link href={`/${locale}/catalogue/${product.id}`} className="card flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ padding: 0, overflow: 'hidden', textDecoration: 'none', color: 'inherit', minWidth: 0 }}>

      {/* Product image */}
      <div className="relative bg-[var(--bg-subtle)]" style={{ aspectRatio: '16 / 10' }}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={`${product.brand} ${product.name}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain p-3"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[var(--text-muted)]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span className="text-xs opacity-40">{'Photo non disponible'}</span>
          </div>
        )}
      </div>

      {/* Header : badge rabais + source */}
      <div className="flex items-center justify-between px-5 sm:px-6 pt-5 pb-0 gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-wrap">
          {product.isOnSale && product.originalPrice && (
            <span className="text-sm font-bold px-2.5 py-0.5 rounded-full text-white bg-blue-600">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)} %
            </span>
          )}
          <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full"
            style={{ background: source.color + '15', color: source.color }}>
            {source.label}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold text-[var(--warn)]">
            {product.aiScore}/100
          </span>
        </div>
      </div>

      {/* Corps */}
      <div className="px-5 sm:px-6 pt-4 pb-5 flex-1 flex flex-col min-w-0">

        {/* Nom et marque */}
        <p className="text-sm font-medium mb-1 text-[var(--text-muted)]">{product.brand}</p>
        <h3 className="font-bold mb-4 text-[var(--text)] break-words" style={{ fontSize: '1.125rem', lineHeight: 1.35 }}>
          {product.name}
        </h3>

        {/* Specs */}
        <div className="space-y-2 mb-5">
          {([
            { key: 'cpu', label: 'CPU', value: product.specs.cpu },
            { key: 'ram', label: 'RAM', value: product.specs.ram },
            { key: 'storage', label: cat.storageLabel, value: product.specs.storage },
            { key: 'gpu', label: 'GPU', value: product.specs.gpu?.toLowerCase().includes('intégré') ? undefined : product.specs.gpu },
            { key: 'display', label: cat.displayLabel, value: product.specs.display },
          ] as const).filter(s => s.value).map(s => (
            <div key={s.key} className="flex items-start gap-2 text-sm min-w-0">
              <span className="shrink-0 font-medium inline-flex items-center gap-1 text-[var(--text)]" style={{ minWidth: '3.5rem' }}>
                {s.label} <SpecTooltip specKey={s.key} />
              </span>
              <span className="text-[var(--text-muted)] break-words min-w-0">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Avis IA */}
        <div className="p-4 rounded-lg mb-5 bg-[var(--bg-subtle)]" style={{ borderLeft: '3px solid var(--accent)' }}>
          <p className="text-sm leading-relaxed text-[var(--text-subtle)]">
            {product.aiRationale}
          </p>
        </div>

        {/* Profils */}
        <div className="flex flex-wrap gap-2 mb-5">
          {product.profiles.map(p => (
            <span key={p} className="text-sm px-2.5 py-1 rounded-full bg-[var(--accent-bg)] text-[var(--accent)]">
              {PROFILE_LABELS[p].label}
            </span>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Prix + CTA */}
        <div className="flex items-end justify-between gap-3 pt-4 border-t border-[var(--border)] flex-wrap">
          <div className="min-w-0">
            <span className="text-xl sm:text-2xl font-bold text-[var(--text)]">
              {product.price.toLocaleString(locale === 'fr' ? 'fr-CA' : 'en-CA')} $
            </span>
            {product.isOnSale && product.originalPrice && (
              <span className="ml-2 text-sm line-through text-[var(--text-muted)]">
                {product.originalPrice.toLocaleString(locale === 'fr' ? 'fr-CA' : 'en-CA')} $
              </span>
            )}
          </div>
          <span className="btn-primary shrink-0"
            style={{ padding: '0.625rem 1rem', fontSize: '0.8125rem', minHeight: '44px' }}>
            {cat.viewDetails}
          </span>
        </div>
      </div>
    </Link>
  )
}
