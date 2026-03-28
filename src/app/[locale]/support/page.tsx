import type { Metadata } from 'next'
import SupportClient from './SupportClient'
import { BASE_URL } from '@/lib/constants'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'

  const title = isFr
    ? 'Support expert — Shop Compy'
    : 'Expert Support — Shop Compy'

  const description = isFr
    ? 'Pose ta question à un expert. Réponse personnalisée garantie en 24h.'
    : 'Ask an expert your question. Personalized response guaranteed within 24h.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isFr ? 'fr_CA' : 'en_CA',
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/support`,
      languages: {
        'fr-CA': `${BASE_URL}/fr/support`,
        'en-CA': `${BASE_URL}/en/support`,
      },
    },
  }
}

export default function SupportPage() {
  return <SupportClient />
}
