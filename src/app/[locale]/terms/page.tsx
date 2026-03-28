import type { Metadata } from 'next'
import TermsClient from './TermsClient'
import { BASE_URL } from '@/lib/constants'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'

  const title = isFr
    ? 'Conditions d\u2019utilisation'
    : 'Terms of Service'

  const description = isFr
    ? 'Conditions d\u2019utilisation du site Shop Compy \u2014 guide d\u2019achat informatique gratuit.'
    : 'Terms of Service for Shop Compy \u2014 a free computer buying guide.'

  return {
    title,
    description,
    openGraph: {
      title: `${title} \u2014 Shop Compy`,
      description,
      type: 'website',
      locale: isFr ? 'fr_CA' : 'en_CA',
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/terms`,
      languages: {
        'fr-CA': `${BASE_URL}/fr/terms`,
        'en-CA': `${BASE_URL}/en/terms`,
      },
    },
  }
}

export default function TermsPage() {
  return <TermsClient />
}
