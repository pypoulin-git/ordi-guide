import type { Metadata } from 'next'
import ContactClient from './ContactClient'
import { BASE_URL } from '@/lib/constants'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'

  const title = isFr
    ? 'Nous joindre — Shop Compy'
    : 'Contact Us — Shop Compy'

  const description = isFr
    ? 'Une question, une suggestion ou une demande de partenariat ? Contactez l\'equipe Shop Compy. Reponse garantie en 48 h.'
    : 'Have a question, suggestion, or partnership inquiry? Contact the Shop Compy team. Response guaranteed within 48 h.'

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
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        'fr-CA': `${BASE_URL}/fr/contact`,
        'en-CA': `${BASE_URL}/en/contact`,
      },
    },
  }
}

export default function ContactPage() {
  return <ContactClient />
}
