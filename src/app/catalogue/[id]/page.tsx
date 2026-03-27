import Link from 'next/link'
import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { use } from 'react'
import type { Metadata } from 'next'
import type { CatalogueData, CatalogueProduct } from '@/types/catalogue'
import { SOURCE_LABELS, PROFILE_LABELS, CATEGORY_LABELS, BUDGET_LABELS } from '@/types/catalogue'
import JsonLd from '@/components/JsonLd'

async function getCatalogue(): Promise<CatalogueData> {
  const filePath = path.join(process.cwd(), 'data', 'catalogue.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

export async function generateStaticParams() {
  const catalogue = await getCatalogue()
  return catalogue.products.map(p => ({ id: p.id }))
}

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const catalogue = await getCatalogue()
  const product = catalogue.products.find(p => p.id === id)
  if (!product) return {}
  return {
    title: `${product.name} — ${product.price.toLocaleString('fr-CA')} $`,
    description: product.aiRationale,
  }
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 85 ? '#059669' : score >= 70 ? '#d97706' : '#64748b'
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-12 h-12">
        <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" strokeWidth="3" />
          <circle cx="18" cy="18" r="15.5" fill="none" stroke={color} strokeWidth="3"
            strokeDasharray={`${(score / 100) * 97.4} 97.4`} strokeLinecap="round" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold" style={{ color }}>
          {score}
        </span>
      </div>
      <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>Score IA</span>
    </div>
  )
}

function getSimilar(products: CatalogueProduct[], current: CatalogueProduct): CatalogueProduct[] {
  return products
    .filter(p => p.id !== current.id)
    .map(p => {
      let score = 0
      if (p.budgetTier === current.budgetTier) score += 3
      score += p.profiles.filter(pr => current.profiles.includes(pr)).length
      if (p.category === current.category) score += 2
      return { p, score }
    })
    .sort((a, b) => b.score - a.score || b.p.aiScore - a.p.aiScore)
    .slice(0, 3)
    .map(x => x.p)
}

export default function ProductPage({ params }: Props) {
  const { id } = use(params)
  const catalogue = use(getCatalogue())
  const product = catalogue.products.find(p => p.id === id)
  if (!product) notFound()

  const source = SOURCE_LABELS[product.source]
  const similar = getSimilar(catalogue.products, product)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    brand: { '@type': 'Brand', name: product.brand },
    description: product.aiRationale,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'CAD',
      availability: 'https://schema.org/InStock',
      url: product.url,
      seller: { '@type': 'Organization', name: source.label },
    },
  }

  return (
    <>
      <JsonLd data={productSchema} />

      {/* Breadcrumb */}
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container max-w-4xl mx-auto py-3">
          <nav className="flex items-center gap-2 text-sm" style={{ color: '#94a3b8' }}>
            <Link href="/catalogue" className="hover:underline" style={{ color: '#2563eb' }}>Catalogue</Link>
            <span>/</span>
            <span style={{ color: '#475569' }}>{product.brand} {product.name.slice(0, 40)}{product.name.length > 40 ? '…' : ''}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <section className="section">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left: details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: source.color + '15', color: source.color }}>
                    {source.label}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full"
                    style={{ background: '#f1f5f9', color: '#475569' }}>
                    {CATEGORY_LABELS[product.category]}
                  </span>
                  {product.isOnSale && product.originalPrice && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ background: '#2563eb' }}>
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)} %
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium mb-1" style={{ color: '#94a3b8' }}>{product.brand}</p>
                <h1 className="text-2xl font-bold leading-tight" style={{ color: '#0f172a' }}>
                  {product.name}
                </h1>
              </div>

              {/* AI Rationale */}
              <div className="p-5 rounded-xl" style={{ background: '#f0fdfa', borderLeft: '4px solid #0891b2' }}>
                <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#0891b2' }}>
                  Notre avis IA
                </p>
                <p className="leading-relaxed" style={{ color: '#475569' }}>
                  {product.aiRationale}
                </p>
              </div>

              {/* Specs table */}
              <div>
                <h2 className="font-bold mb-4" style={{ color: '#0f172a', fontSize: '1.125rem' }}>
                  Spécifications
                </h2>
                <div className="divide-y" style={{ borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
                  {[
                    { label: 'Processeur', value: product.specs.cpu },
                    { label: 'Mémoire vive', value: product.specs.ram },
                    { label: 'Stockage', value: product.specs.storage },
                    { label: 'Carte graphique', value: product.specs.gpu },
                    { label: 'Écran', value: product.specs.display },
                    { label: 'Batterie', value: product.specs.battery },
                  ].filter(s => s.value).map(s => (
                    <div key={s.label} className="flex items-center py-3 gap-4">
                      <span className="text-sm font-medium shrink-0" style={{ color: '#0f172a', minWidth: '8rem' }}>
                        {s.label}
                      </span>
                      <span className="text-sm" style={{ color: '#475569' }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profiles */}
              <div>
                <h2 className="font-bold mb-3" style={{ color: '#0f172a', fontSize: '1.125rem' }}>
                  Idéal pour
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.profiles.map(p => (
                    <div key={p} className="flex items-center gap-2 px-3 py-2 rounded-lg"
                      style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                      <span className="text-sm font-semibold" style={{ color: '#2563eb' }}>
                        {PROFILE_LABELS[p].label}
                      </span>
                      <span className="text-xs" style={{ color: '#64748b' }}>
                        {PROFILE_LABELS[p].desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: purchase card */}
            <div>
              <div className="card sticky top-20" style={{ padding: '1.75rem' }}>
                <ScoreBadge score={product.aiScore} />

                <div className="mt-5 mb-5">
                  <span className="text-3xl font-bold" style={{ color: '#0f172a' }}>
                    {product.price.toLocaleString('fr-CA')} $
                  </span>
                  {product.isOnSale && product.originalPrice && (
                    <span className="ml-2 text-base line-through" style={{ color: '#94a3b8' }}>
                      {product.originalPrice.toLocaleString('fr-CA')} $
                    </span>
                  )}
                  <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>
                    {BUDGET_LABELS[product.budgetTier]}
                  </p>
                </div>

                <a href={product.url} target="_blank" rel="noopener noreferrer"
                  className="btn-primary w-full justify-center mb-3"
                  style={{ padding: '0.875rem 1.5rem', fontSize: '1rem' }}>
                  Voir chez {source.label} →
                </a>

                <p className="text-xs text-center" style={{ color: '#94a3b8' }}>
                  Lien affilié — tu ne payes rien de plus
                </p>

                <div className="mt-5 pt-5" style={{ borderTop: '1px solid #e2e8f0' }}>
                  <Link href="/comparateur"
                    className="btn-outline w-full justify-center text-sm">
                    Pas sûr ? Fais le questionnaire
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar products */}
      {similar.length > 0 && (
        <section className="section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-6" style={{ color: '#0f172a' }}>
              Produits similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {similar.map(p => {
                const s = SOURCE_LABELS[p.source]
                return (
                  <Link key={p.id} href={`/catalogue/${p.id}`}
                    className="card transition-all hover:-translate-y-0.5 hover:shadow-md"
                    style={{ padding: '1.25rem', textDecoration: 'none' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: s.color + '15', color: s.color }}>
                        {s.label}
                      </span>
                      <span className="text-xs font-bold" style={{ color: '#d97706' }}>{p.aiScore}/100</span>
                    </div>
                    <p className="text-xs mb-0.5" style={{ color: '#94a3b8' }}>{p.brand}</p>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2" style={{ color: '#0f172a', lineHeight: 1.4 }}>
                      {p.name}
                    </h3>
                    <span className="text-lg font-bold" style={{ color: '#0f172a' }}>
                      {p.price.toLocaleString('fr-CA')} $
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
