import type { Metadata } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import type { CatalogueData } from '@/types/catalogue'
import CatalogueLayout from '@/components/CatalogueLayout'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'
  return {
    title: isFr
      ? 'Catalogue ordinateurs, laptops et moniteurs au Canada — Shop Compy'
      : 'Computer, Laptop & Monitor Catalogue in Canada — Shop Compy',
    description: isFr
      ? 'Comparez les meilleurs ordinateurs portables, desktops, Chromebooks et moniteurs au Canada. Prix vérifiés, évaluation IA et liens directs vers les détaillants.'
      : 'Compare the best laptops, desktops, Chromebooks and monitors in Canada. Verified prices, AI scoring and direct retailer links.',
    alternates: {
      canonical: `https://shopcompy.ca/${locale}/catalogue`,
      languages: { fr: '/fr/catalogue', en: '/en/catalogue' },
    },
    openGraph: {
      title: isFr ? 'Catalogue — Shop Compy' : 'Catalogue — Shop Compy',
      description: isFr
        ? 'Les meilleurs ordis au Canada, évalués par IA.'
        : 'The best computers in Canada, AI-scored.',
      url: `https://shopcompy.ca/${locale}/catalogue`,
    },
  }
}

async function getCatalogue(): Promise<CatalogueData> {
  const filePath = path.join(process.cwd(), 'data', 'catalogue.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

export default async function CataloguePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  const cat = t.catalogue

  const catalogue = await getCatalogue()
  const products = catalogue.products.sort((a, b) => b.aiScore - a.aiScore)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'fr' ? 'Accueil' : 'Home', item: `https://shopcompy.ca/${locale}` },
      { '@type': 'ListItem', position: 2, name: locale === 'fr' ? 'Catalogue' : 'Catalogue', item: `https://shopcompy.ca/${locale}/catalogue` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Compact hero header */}
      <section
        className="border-b border-[var(--border)]"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #059669 60%, #34d399 100%)',
          padding: '1.25rem 0 1.5rem',
        }}
      >
        <div className="container">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{cat.heroTitle}</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {cat.heroSubtitleTemplate.replace('{count}', String(products.length))}
          </p>
        </div>
      </section>

      <AffiliateDisclosure />

      {/* Sidebar + Grid layout */}
      <section className="section" style={{ paddingTop: '1.5rem' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <CatalogueLayout products={products} />
        </div>
      </section>
    </>
  )
}
