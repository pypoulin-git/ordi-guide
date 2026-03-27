import { Metadata } from 'next'
import Link from 'next/link'
import { promises as fs } from 'fs'
import path from 'path'
import type { CatalogueData } from '@/types/catalogue'
import CatalogueFilters from '@/components/CatalogueFilters'

export const metadata: Metadata = {
  title: 'Catalogue — Shop Compy',
  description: 'Notre sélection d\'ordinateurs triés sur le volet, organisés par profil et budget.',
}

async function getCatalogue(): Promise<CatalogueData> {
  const filePath = path.join(process.cwd(), 'data', 'catalogue.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

export default async function CataloguePage() {
  const catalogue = await getCatalogue()
  const products = catalogue.products.sort((a, b) => b.aiScore - a.aiScore)

  return (
    <>
      {/* Hero */}
      <section className="section" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#0f172a' }}>
            Nos recommandations
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: '#475569', maxWidth: '40rem', margin: '0 auto' }}>
            {products.length} ordinateurs sélectionnés et notés par notre IA.
            Filtre par profil, budget ou catégorie pour trouver le tien.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="section">
        <div className="container">
          <CatalogueFilters products={products} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container max-w-3xl mx-auto">
          <div className="card text-center" style={{ padding: '2.5rem', border: '1.5px solid #bfdbfe' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#0f172a' }}>
              Pas certain de ton choix ?
            </h2>
            <p className="mb-6" style={{ color: '#475569' }}>
              Notre outil comparateur te donne une recommandation personnalisée
              en moins de deux minutes. Réponds à 5 questions simples.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/comparateur" className="btn-primary">M&apos;aider à choisir →</Link>
              <Link href="/guide" className="btn-outline">Lire le guide</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
