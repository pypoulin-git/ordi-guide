import { Metadata } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import type { CatalogueData } from '@/types/catalogue'
import CatalogueLayout from '@/components/CatalogueLayout'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'

export const metadata: Metadata = {
  title: 'Catalogue — Shop Compy',
  description: 'Our curated selection of computers, organized by profile and budget.',
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

  return (
    <>
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
