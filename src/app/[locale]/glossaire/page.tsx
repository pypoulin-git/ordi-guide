import type { Metadata } from 'next'
import GlossaireClient from './GlossaireClient'
import { BASE_URL } from '@/lib/constants'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'

  const title = isFr
    ? 'Glossaire informatique — Termes expliques simplement'
    : 'Computer Glossary — Terms Explained Simply'

  const description = isFr
    ? 'Lexique complet des termes informatiques : CPU, RAM, SSD, GPU et plus. Chaque terme explique en francais simple avec des exemples concrets.'
    : 'Complete lexicon of computer terms: CPU, RAM, SSD, GPU and more. Every term explained in plain language with real-world examples.'

  return {
    title,
    description,
    openGraph: {
      title: `${title} — Shop Compy`,
      description,
      type: 'website',
      locale: isFr ? 'fr_CA' : 'en_CA',
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/glossaire`,
      languages: {
        'fr-CA': `${BASE_URL}/fr/glossaire`,
        'en-CA': `${BASE_URL}/en/glossaire`,
      },
    },
  }
}

export default function GlossairePage() {
  return <GlossaireClient />
}
