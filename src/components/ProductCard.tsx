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
    <Link href={`/${locale}/catalogue/${product.id}`} className="card flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ padding: 0, overflow: 'hidden', textDecoration: 'none', color: 'inherit' }}>

      {/* Header : badge rabais + source */}
      <div className="flex items-center justify-between px-5 pt-4 pb-0">
        <div className="flex items-center gap-2">
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
      <div className="px-5 pt-3 pb-4 flex-1 flex flex-col">

        {/* Nom et marque */}
        <p className="text-sm font-medium mb-1 text-[var(--text-muted)]">{product.brand}</p>
        <h3 className="font-bold mb-3 text-[var(--text)]" style={{ fontSize: '1.0625rem', lineHeight: 1.3 }}>
          {product.name}
        </h3>

        {/* Specs */}
        <div className="space-y-1 mb-4">
          {([
            { key: 'cpu', label: 'CPU', value: product.specs.cpu },
            { key: 'ram', label: 'RAM', value: product.specs.ram },
            { key: 'storage', label: cat.storageLabel, value: product.specs.storage },
            { key: 'gpu', label: 'GPU', value: product.specs.gpu?.toLowerCase().includes('intégré') ? undefined : product.specs.gpu },
            { key: 'display', label: cat.displayLabel, value: product.specs.display },
          ] as const).filter(s => s.value).map(s => (
            <div key={s.key} className="flex items-start gap-2 text-sm">
              <span className="shrink-0 font-medium inline-flex items-center gap-1 text-[var(--text)]" style={{ minWidth: '4rem' }}>
                {s.label} <SpecTooltip specKey={s.key} />
              </span>
              <span className="text-[var(--text-muted)]">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Avis IA */}
        <div className="p-3 rounded-lg mb-4 bg-[var(--bg-subtle)]" style={{ borderLeft: '3px solid var(--accent)' }}>
          <p className="text-sm leading-relaxed text-[var(--text-subtle)]">
            {product.aiRationale}
          </p>
        </div>

        {/* Profils */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.profiles.map(p => (
            <span key={p} className="text-sm px-2.5 py-1 rounded-full bg-[var(--accent-bg)] text-[var(--accent)]">
              {PROFILE_LABELS[p].label}
            </span>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Prix + CTA */}
        <div className="flex items-end justify-between pt-2 border-t border-[var(--border)]">
          <div>
            <span className="text-2xl font-bold text-[var(--text)]">
              {product.price.toLocaleString(locale === 'fr' ? 'fr-CA' : 'en-CA')} $
            </span>
            {product.isOnSale && product.originalPrice && (
              <span className="ml-2 text-sm line-through text-[var(--text-muted)]">
                {product.originalPrice.toLocaleString(locale === 'fr' ? 'fr-CA' : 'en-CA')} $
              </span>
            )}
          </div>
          <span className="btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}>
            {cat.viewDetails}
          </span>
        </div>
      </div>
    </Link>
  )
}
