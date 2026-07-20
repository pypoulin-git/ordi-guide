import type { Metadata } from 'next'
import CookiesClient from './CookiesClient'
import { BASE_URL } from '@/lib/constants'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'

  const title = isFr ? 'Politique relative aux témoins (cookies)' : 'Cookie Policy'

  const description = isFr
    ? 'Quels témoins (cookies) Shop Compy utilise, leur finalité, leur durée, et comment gérer votre consentement.'
    : 'Which cookies Shop Compy uses, their purpose, duration, and how to manage your consent.'

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
      canonical: `${BASE_URL}/${locale}/cookies`,
      languages: {
        'fr-CA': `${BASE_URL}/fr/cookies`,
        'en-CA': `${BASE_URL}/en/cookies`,
      },
    },
  }
}

export default function CookiesPage() {
  return <CookiesClient />
}
