import { Metadata } from 'next'
import Link from 'next/link'
import { promises as fs } from 'fs'
import path from 'path'
import type { CatalogueData } from '@/types/catalogue'
import CatalogueFilters from '@/components/CatalogueFilters'
import PageHero from '@/components/PageHero'
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

  const isFr = locale === 'fr'

  return (
    <>
      {/* Hero */}
      <PageHero
        title={cat.heroTitle}
        subtitle={cat.heroSubtitleTemplate.replace('{count}', String(products.length))}
        gradient="linear-gradient(135deg, #064e3b 0%, #059669 50%, #34d399 100%)"
        accentColor="#059669"
      />

      {/* Filters + Grid */}
      <section className="section">
        <div className="container">
          <CatalogueFilters products={products} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section bg-[--bg-subtle] border-t border-[--border]">
        <div className="container max-w-3xl mx-auto">
          <div className="card text-center" style={{ padding: '2.5rem' }}>
            <h2 className="text-xl font-bold mb-3 text-[--text]">
              {isFr ? 'Pas certain de ton choix ?' : 'Not sure which one to pick?'}
            </h2>
            <p className="mb-6 text-[--text-subtle]">
              {isFr
                ? 'Notre outil comparateur te donne une recommandation personnalisée en moins de deux minutes. Réponds à 5 questions simples.'
                : 'Our recommendation tool gives you a personalized suggestion in under two minutes. Answer 5 simple questions.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/comparateur`} className="btn-primary">
                {isFr ? 'M\'aider à choisir →' : 'Help me choose →'}
              </Link>
              <Link href={`/${locale}/guide`} className="btn-outline">
                {isFr ? 'Lire le guide' : 'Read the guide'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
