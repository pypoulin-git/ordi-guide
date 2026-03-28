import type { Metadata } from 'next'
import GuideClient from './GuideClient'
import { BASE_URL } from '@/lib/constants'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'

  const title = isFr
    ? 'Guide des composants informatiques'
    : 'Computer Components Guide'

  const description = isFr
    ? 'Comprends facilement les composants d\'un ordinateur : processeur, RAM, stockage, carte graphique et plus. Explications simples, sans jargon technique.'
    : 'Easily understand computer components: processor, RAM, storage, graphics card and more. Simple explanations, no technical jargon.'

  return {
    title,
    description,
    openGraph: {
      title: `${title} — Shop Compy`,
      description,
      type: 'article',
      locale: isFr ? 'fr_CA' : 'en_CA',
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/guide`,
      languages: {
        'fr-CA': `${BASE_URL}/fr/guide`,
        'en-CA': `${BASE_URL}/en/guide`,
      },
    },
  }
}

export default function GuidePage() {
  return <GuideClient />
}
