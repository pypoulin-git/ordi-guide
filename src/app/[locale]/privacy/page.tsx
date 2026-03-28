import type { Metadata } from 'next'
import PrivacyClient from './PrivacyClient'
import { BASE_URL } from '@/lib/constants'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'

  const title = isFr
    ? 'Politique de confidentialité'
    : 'Privacy Policy'

  const description = isFr
    ? 'Découvrez comment Shop Compy protège vos données personnelles et respecte votre vie privée.'
    : 'Learn how Shop Compy protects your personal data and respects your privacy.'

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
      canonical: `${BASE_URL}/${locale}/privacy`,
      languages: {
        'fr-CA': `${BASE_URL}/fr/privacy`,
        'en-CA': `${BASE_URL}/en/privacy`,
      },
    },
  }
}

export default function PrivacyPage() {
  return <PrivacyClient />
}
