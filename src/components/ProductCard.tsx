import type { CatalogueProduct } from '@/types/catalogue'
import { SOURCE_LABELS, PROFILE_LABELS } from '@/types/catalogue'

export default function ProductCard({ product }: { product: CatalogueProduct }) {
  const source = SOURCE_LABELS[product.source]

  return (
    <div className="card flex flex-col" style={{ padding: 0, overflow: 'hidden' }}>

      {/* Header : badge rabais + source */}
      <div className="flex items-center justify-between px-5 pt-4 pb-0">
        <div className="flex items-center gap-2">
          {product.isOnSale && product.originalPrice && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style={{ background: '#2563eb' }}>
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)} %
            </span>
          )}
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: source.color + '15', color: source.color }}>
            {source.label}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold" style={{ color: '#d97706' }}>
            {product.aiScore}/100
          </span>
        </div>
      </div>

      {/* Corps */}
      <div className="px-5 pt-3 pb-4 flex-1 flex flex-col">

        {/* Nom et marque */}
        <p className="text-xs font-medium mb-1" style={{ color: '#94a3b8' }}>{product.brand}</p>
        <h3 className="font-bold mb-3" style={{ color: '#0f172a', fontSize: '1.0625rem', lineHeight: 1.3 }}>
          {product.name}
        </h3>

        {/* Specs */}
        <div className="space-y-1 mb-4">
          {product.specs.cpu && (
            <div className="flex items-start gap-2 text-sm">
              <span className="shrink-0 font-medium" style={{ color: '#0f172a', minWidth: '4rem' }}>CPU</span>
              <span style={{ color: '#64748b' }}>{product.specs.cpu}</span>
            </div>
          )}
          {product.specs.ram && (
            <div className="flex items-start gap-2 text-sm">
              <span className="shrink-0 font-medium" style={{ color: '#0f172a', minWidth: '4rem' }}>RAM</span>
              <span style={{ color: '#64748b' }}>{product.specs.ram}</span>
            </div>
          )}
          {product.specs.storage && (
            <div className="flex items-start gap-2 text-sm">
              <span className="shrink-0 font-medium" style={{ color: '#0f172a', minWidth: '4rem' }}>Stockage</span>
              <span style={{ color: '#64748b' }}>{product.specs.storage}</span>
            </div>
          )}
          {product.specs.gpu && !product.specs.gpu.toLowerCase().includes('intégré') && (
            <div className="flex items-start gap-2 text-sm">
              <span className="shrink-0 font-medium" style={{ color: '#0f172a', minWidth: '4rem' }}>GPU</span>
              <span style={{ color: '#64748b' }}>{product.specs.gpu}</span>
            </div>
          )}
          {product.specs.display && (
            <div className="flex items-start gap-2 text-sm">
              <span className="shrink-0 font-medium" style={{ color: '#0f172a', minWidth: '4rem' }}>Écran</span>
              <span style={{ color: '#64748b' }}>{product.specs.display}</span>
            </div>
          )}
        </div>

        {/* Avis IA */}
        <div className="p-3 rounded-lg mb-4" style={{ background: '#f8fafc', borderLeft: '3px solid #2563eb' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
            {product.aiRationale}
          </p>
        </div>

        {/* Profils */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.profiles.map(p => (
            <span key={p} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: '#eff6ff', color: '#2563eb' }}>
              {PROFILE_LABELS[p].label}
            </span>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Prix + CTA */}
        <div className="flex items-end justify-between pt-2" style={{ borderTop: '1px solid #f1f5f9' }}>
          <div>
            <span className="text-2xl font-bold" style={{ color: '#0f172a' }}>
              {product.price.toLocaleString('fr-CA')} $
            </span>
            {product.isOnSale && product.originalPrice && (
              <span className="ml-2 text-sm line-through" style={{ color: '#94a3b8' }}>
                {product.originalPrice.toLocaleString('fr-CA')} $
              </span>
            )}
          </div>
          <a href={product.url} target="_blank" rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}>
            Voir le prix →
          </a>
        </div>
      </div>
    </div>
  )
}
