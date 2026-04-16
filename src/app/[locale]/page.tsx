import type { Metadata } from 'next'
import { BASE_URL, SITE_NAME } from '@/lib/constants'
import HomeClient from './HomeClient'

// ── SEO metadata for the home page ────────────────────────────
// Home-specific metadata (title/description/openGraph/twitter).
// Inherits `metadataBase` and `alternates` from the [locale]/layout.tsx.
// Refactored to Server Component wrapper so generateMetadata is supported
// (metadata API is only available in Server Components per Next.js 16).
export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'

  const title = isFr
    ? 'Shop Compy — Guide simple pour choisir ton ordinateur'
    : 'Shop Compy — Simple Guide to Choose Your Computer'

  const description = isFr
    ? 'Choisir un ordinateur sans stress. Comparateur guidé, glossaire sans jargon, recommandations honnêtes du Québec. 100% gratuit.'
    : 'Choose a computer without stress. Guided comparator, jargon-free glossary, honest recommendations from Quebec. 100% free.'

  const ogImage = `${BASE_URL}/images/compy-logo.png`

  return {
    title: { absolute: title },
    description,
    keywords: isFr
      ? ['ordinateur', 'laptop', 'PC', 'Mac', 'guide achat', 'comparateur', 'Québec', 'conseil informatique']
      : ['computer', 'laptop', 'PC', 'Mac', 'buying guide', 'comparator', 'Quebec', 'tech advice'],
    openGraph: {
      type: 'website',
      locale: isFr ? 'fr_CA' : 'en_CA',
      url: `${BASE_URL}/${locale}`,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function Page() {
  return <HomeClient />
}
