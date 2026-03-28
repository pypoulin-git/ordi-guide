import type { Metadata } from 'next'
import BlogClient from './BlogClient'
import { BASE_URL } from '@/lib/constants'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'

  const title = isFr
    ? 'Blog — Conseils et guides informatiques'
    : 'Blog — Computer Tips and Guides'

  const description = isFr
    ? 'Articles pratiques pour mieux comprendre l\'informatique : bases, comparatifs, connectique, tendances et conseils d\'achat. Simples et accessibles.'
    : 'Practical articles to better understand computers: basics, comparisons, connectivity, trends and buying tips. Simple and accessible.'

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
      canonical: `${BASE_URL}/${locale}/blog`,
      languages: {
        'fr-CA': `${BASE_URL}/fr/blog`,
        'en-CA': `${BASE_URL}/en/blog`,
      },
    },
  }
}

export default function BlogPage() {
  return <BlogClient />
}
