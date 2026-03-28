import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE_URL } from '@/lib/constants'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'

  return {
    title: isFr ? 'Merci — Shop Compy' : 'Thank You — Shop Compy',
    description: isFr
      ? 'Votre question a été reçue. Nous vous répondons dans les 24h.'
      : 'Your question has been received. We\'ll respond within 24h.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/support/merci`,
      languages: {
        'fr-CA': `${BASE_URL}/fr/support/merci`,
        'en-CA': `${BASE_URL}/en/support/merci`,
      },
    },
  }
}

export default async function MerciPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  return (
    <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container max-w-lg mx-auto text-center">
        <div className="text-5xl mb-6" aria-hidden="true">
          &#10003;
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-4">
          {isFr ? 'Merci !' : 'Thank you!'}
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-subtle)] leading-relaxed mb-8">
          {isFr
            ? 'Ta question a été reçue. On te répond dans les 24h.'
            : 'Your question has been received. We\'ll get back to you within 24h.'}
        </p>
        <Link href={`/${locale}`} className="btn-primary">
          {isFr ? 'Retour à l\'accueil' : 'Back to home'}
        </Link>
      </div>
    </section>
  )
}
