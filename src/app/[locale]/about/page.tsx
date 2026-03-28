import type { Metadata } from 'next'
import AboutClient from './AboutClient'

const BASE_URL = 'https://ordi-guide.vercel.app'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'

  const title = isFr
    ? 'A propos de Shop Compy'
    : 'About Shop Compy'

  const description = isFr
    ? 'Decouvrez l\'histoire de Shop Compy : notre mission est de rendre l\'achat d\'un ordinateur simple et accessible a tous, sans jargon ni pression.'
    : 'Discover the Shop Compy story: our mission is to make buying a computer simple and accessible to everyone, without jargon or pressure.'

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
      canonical: `${BASE_URL}/${locale}/about`,
      languages: {
        'fr-CA': `${BASE_URL}/fr/about`,
        'en-CA': `${BASE_URL}/en/about`,
      },
    },
  }
}

export default function AboutPage() {
  return <AboutClient />
}
