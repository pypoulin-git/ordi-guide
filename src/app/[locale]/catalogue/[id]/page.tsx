import Link from 'next/link'
import Image from 'next/image'
import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { CatalogueData, CatalogueProduct } from '@/types/catalogue'
import { SOURCE_LABELS, PROFILE_LABELS, CATEGORY_LABELS, BUDGET_LABELS } from '@/types/catalogue'
import JsonLd from '@/components/JsonLd'
import SpecTooltip from '@/components/SpecTooltip'
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import { buildAffiliateUrl, getAffiliateRel } from '@/lib/affiliate'
import SponsoredSpot from '@/components/SponsoredSpot'
import DonationBox from '@/components/DonationBox'
import ActionCTA from '@/components/ActionCTA'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'

async function getCatalogue(): Promise<CatalogueData> {
  const filePath = path.join(process.cwd(), 'data', 'catalogue.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

export async function generateStaticParams() {
  const catalogue = await getCatalogue()
  return catalogue.products.map(p => ({ id: p.id }))
}

type Props = { params: Promise<{ id: string; locale: string }> }

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

function ScoreBadge({ score, label }: { score: number; label: string }) {
  const color = score >= 85 ? '#059669' : score >= 70 ? '#d97706' : '#64748b'
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-12 h-12">
        <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--border)" strokeWidth="3" />
          <circle cx="18" cy="18" r="15.5" fill="none" stroke={color} strokeWidth="3"
            strokeDasharray={`${(score / 100) * 97.4} 97.4`} strokeLinecap="round" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold" style={{ color }}>
          {score}
        </span>
      </div>
      <span className="text-sm font-medium text-[var(--text-muted)]">{label}</span>
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

export default async function ProductPage({ params }: Props) {
  const { id, locale } = await params
  const catalogue = await getCatalogue()
  const product = catalogue.products.find(p => p.id === id)
  if (!product) notFound()

  const t = await getDictionary(locale as Locale)
  const pt = t.product
  const source = SOURCE_LABELS[product.source]
  const similar = getSimilar(catalogue.products, product)

  const siteUrl = 'https://shopcompy.ca'

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.brand} ${product.name}`,
    brand: { '@type': 'Brand', name: product.brand },
    description: product.aiRationale,
    ...(product.imageUrl ? { image: product.imageUrl } : {}),
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'CAD',
      availability: 'https://schema.org/InStock',
      url: product.url,
      seller: { '@type': 'Organization', name: source.label },
    },
    ...(product.aiScore ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: (product.aiScore / 20).toFixed(1),
        bestRating: '5',
        worstRating: '1',
        ratingCount: '1',
      },
    } : {}),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: pt.breadcrumbHome,
        item: `${siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pt.breadcrumbCatalogue,
        item: `${siteUrl}/${locale}/catalogue`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `${siteUrl}/${locale}/catalogue/${product.id}`,
      },
    ],
  }

  const buyUrl = product.isGiftPick ? product.url : buildAffiliateUrl(product.url, product.source)
  const buyRel = getAffiliateRel(product.isGiftPick)

  const specs = [
    { label: pt.cpuLabel, key: 'cpu', value: product.specs.cpu },
    { label: pt.ramLabel, key: 'ram', value: product.specs.ram },
    { label: pt.storageLabel, key: 'storage', value: product.specs.storage },
    { label: pt.gpuLabel, key: 'gpu', value: product.specs.gpu },
    { label: pt.displayLabel, key: 'display', value: product.specs.display },
    { label: pt.batteryLabel, key: 'battery', value: product.specs.battery },
  ].filter(s => s.value)

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />

      <AffiliateDisclosure />

      {/* Breadcrumb */}
      <div className="bg-[var(--bg-subtle)] border-b border-[var(--border)]">
        <div className="container max-w-4xl mx-auto py-3">
          <nav className="flex items-center gap-2 text-base text-[var(--text-muted)]" aria-label="Breadcrumb">
            <Link href={`/${locale}`} className="hover:underline text-[var(--accent)]">{pt.breadcrumbHome}</Link>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="shrink-0 opacity-50"><path d="M5.646 3.354a.5.5 0 01.708-.708l5 5a.5.5 0 010 .708l-5 5a.5.5 0 01-.708-.708L10.293 8 5.646 3.354z"/></svg>
            <Link href={`/${locale}/catalogue`} className="hover:underline text-[var(--accent)]">{pt.breadcrumbCatalogue}</Link>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="shrink-0 opacity-50"><path d="M5.646 3.354a.5.5 0 01.708-.708l5 5a.5.5 0 010 .708l-5 5a.5.5 0 01-.708-.708L10.293 8 5.646 3.354z"/></svg>
            <span className="text-[var(--text-subtle)] truncate">{product.brand} {product.name.slice(0, 40)}{product.name.length > 40 ? '...' : ''}</span>
          </nav>
        </div>
      </div>

      {/* Sticky price bar (appears on scroll) */}
      <div
        className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg-card)] hidden lg:block"
        style={{ backdropFilter: 'blur(12px)' }}
      >
        <div className="container max-w-4xl mx-auto py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-sm font-medium text-[var(--text-muted)] shrink-0">{product.brand}</span>
            <h2 className="text-sm font-bold text-[var(--text)] truncate">{product.name}</h2>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-lg font-bold text-[var(--text)]">
              {product.price.toLocaleString('fr-CA')} $
            </span>
            <a
              href={buyUrl}
              target="_blank"
              rel={buyRel}
              className="btn-primary text-sm"
              style={{ padding: '0.5rem 1rem' }}
            >
              {pt.viewAt.replace('{source}', source.label)}
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="section">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left: details */}
            <div className="lg:col-span-2 space-y-6">

              {/* Product image — 480px height area with hover zoom */}
              {product.imageUrl && (
                <div
                  className="rounded-xl overflow-hidden bg-[var(--bg-subtle)] border border-[var(--border)] group"
                  style={{ height: '480px' }}
                >
                  <div className="w-full h-full relative transition-transform duration-300 ease-out group-hover:scale-110 origin-center">
                    <Image
                      src={product.imageUrl}
                      alt={`${product.brand} ${product.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 640px"
                      className="object-contain p-6"
                      priority
                    />
                  </div>
                </div>
              )}

              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-sm font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: source.color + '15', color: source.color }}>
                    {source.label}
                  </span>
                  <span className="text-sm px-2.5 py-1 rounded-full bg-[var(--bg-card)] text-[var(--text-subtle)]">
                    {CATEGORY_LABELS[product.category]}
                  </span>
                  {product.isOnSale && product.originalPrice && (
                    <span className="text-sm font-bold px-2.5 py-1 rounded-full text-white bg-blue-600">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)} %
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium mb-1 text-[var(--text-muted)]">{product.brand}</p>
                <h1 className="text-2xl font-bold leading-tight text-[var(--text)]">
                  {product.name}
                </h1>
              </div>

              {/* AI Rationale */}
              <div className="p-5 rounded-xl bg-[var(--accent-bg)]" style={{ borderLeft: '4px solid var(--success)' }}>
                <p className="text-xs font-bold uppercase tracking-wide mb-2 text-[var(--success)]">
                  {pt.aiOpinion}
                </p>
                <p className="leading-relaxed text-[var(--text-subtle)]">
                  {product.aiRationale}
                </p>
              </div>

              {/* Specs table with alternating row backgrounds */}
              <div>
                <h2 className="font-bold mb-4 text-[var(--text)]" style={{ fontSize: '1.125rem' }}>
                  {pt.specifications}
                </h2>
                <div className="rounded-xl overflow-hidden border border-[var(--border)]">
                  {specs.map((s, i) => (
                    <div
                      key={s.label}
                      className="flex items-center py-3.5 px-4 gap-4"
                      style={{
                        backgroundColor: i % 2 === 0 ? 'var(--bg-subtle)' : 'transparent',
                        borderBottom: i < specs.length - 1 ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      <span className="text-sm font-medium shrink-0 inline-flex items-center gap-1.5 text-[var(--text)]" style={{ minWidth: '8rem' }}>
                        {s.label} <SpecTooltip specKey={s.key} />
                      </span>
                      <span className="text-sm text-[var(--text-subtle)]">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profiles */}
              <div>
                <h2 className="font-bold mb-3 text-[var(--text)]" style={{ fontSize: '1.125rem' }}>
                  {pt.idealFor}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.profiles.map(p => (
                    <div key={p} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--accent-bg)]"
                      style={{ border: '1px solid var(--border)' }}>
                      <span className="text-sm font-semibold text-[var(--accent)]">
                        {PROFILE_LABELS[p].label}
                      </span>
                      <span className="text-sm text-[var(--text-muted)]">
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
                <ScoreBadge score={product.aiScore} label={pt.aiScore} />

                <div className="mt-5 mb-5">
                  <span className="text-3xl font-bold text-[var(--text)]">
                    {product.price.toLocaleString('fr-CA')} $
                  </span>
                  {product.isOnSale && product.originalPrice && (
                    <span className="ml-2 text-base line-through text-[var(--text-muted)]">
                      {product.originalPrice.toLocaleString('fr-CA')} $
                    </span>
                  )}
                  <p className="text-sm mt-1 text-[var(--text-muted)]">
                    {BUDGET_LABELS[product.budgetTier]}
                  </p>
                </div>

                <a href={buyUrl}
                  target="_blank" rel={buyRel}
                  className="btn-primary w-full justify-center mb-3"
                  style={{ padding: '0.875rem 1.5rem', fontSize: '1rem' }}>
                  {pt.viewAt.replace('{source}', source.label)}
                </a>

                {product.isGiftPick ? (
                  <p className="text-sm text-center text-[var(--text-muted)]">
                    {pt.giftPickNote || 'Trouvaille Compy — cette référence est offerte sans revenu pour nous'}
                  </p>
                ) : (
                  <p className="text-sm text-center text-[var(--text-muted)]">
                    {pt.affiliateNote}
                  </p>
                )}

                <div className="mt-5 pt-5 border-t border-[var(--border)]">
                  <Link href={`/${locale}/comparateur`}
                    className="btn-outline w-full justify-center text-sm">
                    {pt.notSure}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation box for gift picks */}
      {product.isGiftPick && (
        <section className="section">
          <div className="container max-w-4xl mx-auto">
            <DonationBox />
          </div>
        </section>
      )}

      {/* Expert help inline CTA */}
      <div className="container max-w-4xl mx-auto pb-4">
        <ActionCTA variant="inline" />
      </div>

      {/* Sponsored ad spot — between content and similar products */}
      <section className="section">
        <div className="container max-w-4xl mx-auto">
          <SponsoredSpot />
        </div>
      </section>

      {/* Similar products */}
      {similar.length > 0 && (
        <section className="section bg-[var(--bg-subtle)] border-t border-[var(--border)]">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-6 text-[var(--text)]">
              {pt.similarProducts}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {similar.map(p => {
                const s = SOURCE_LABELS[p.source]
                return (
                  <Link key={p.id} href={`/${locale}/catalogue/${p.id}`}
                    className="card transition-all hover:-translate-y-0.5 hover:shadow-md"
                    style={{ padding: '1.25rem', textDecoration: 'none' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: s.color + '15', color: s.color }}>
                        {s.label}
                      </span>
                      <span className="text-sm font-bold text-[var(--warn)]">{p.aiScore}/100</span>
                    </div>
                    <p className="text-sm mb-0.5 text-[var(--text-muted)]">{p.brand}</p>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-[var(--text)]" style={{ lineHeight: 1.4 }}>
                      {p.name}
                    </h3>
                    <span className="text-lg font-bold text-[var(--text)]">
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
