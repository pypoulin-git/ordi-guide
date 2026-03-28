import type { Metadata } from 'next'
import ComparateurClient from './ComparateurClient'
import { BASE_URL } from '@/lib/constants'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'

  const title = isFr
    ? 'Quel ordinateur choisir ? Comparateur interactif'
    : 'Which computer to choose? Interactive comparator'

  const description = isFr
    ? 'Reponds a 5 questions simples et obtiens une recommandation personnalisee en moins de 2 minutes. Gratuit, sans inscription.'
    : 'Answer 5 simple questions and get a personalized recommendation in under 2 minutes. Free, no sign-up required.'

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
      canonical: `${BASE_URL}/${locale}/comparateur`,
      languages: {
        'fr-CA': `${BASE_URL}/fr/comparateur`,
        'en-CA': `${BASE_URL}/en/comparateur`,
      },
    },
  }
}

export default function ComparateurPage() {
  return <ComparateurClient />
}
