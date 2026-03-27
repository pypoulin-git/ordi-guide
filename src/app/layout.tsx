import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import { AnalogyProvider } from '@/contexts/AnalogyContext'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const BASE_URL = 'https://ordi-guide.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Shop Compy — Guide simple pour choisir ton ordinateur',
    template: '%s — Shop Compy',
  },
  description: 'Choisir un ordinateur n\'est pas compliqué. On t\'explique tout simplement pour que tu puisses magasiner en confiance. Zéro jargon, zéro pub.',
  keywords: 'ordinateur, achat, guide, aide, portable, bureau, budget, comparateur, Shop Compy',
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: BASE_URL,
    siteName: 'Shop Compy',
    title: 'Shop Compy — Guide simple pour choisir ton ordinateur',
    description: 'Choisir un ordinateur n\'est pas compliqué. On t\'explique tout simplement pour que tu puisses magasiner en confiance.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop Compy — Guide simple pour choisir ton ordinateur',
    description: 'Choisir un ordinateur n\'est pas compliqué. On t\'explique tout simplement.',
  },
  alternates: {
    canonical: BASE_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} h-full`}>
      <head>
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Shop Compy',
          url: BASE_URL,
          description: 'Guide simple pour choisir ton ordinateur. Zéro jargon, zéro pub.',
          inLanguage: 'fr-CA',
          potentialAction: {
            '@type': 'SearchAction',
            target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/?q={search_term_string}` },
            'query-input': 'required name=search_term_string',
          },
        }} />
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Shop Compy',
          url: BASE_URL,
          description: 'Plateforme québécoise d\'aide à l\'achat informatique. La technologie expliquée par l\'humain, pour l\'humain.',
        }} />
      </head>
      <body className="min-h-full flex flex-col bg-[--bg] text-[--text]">
        <AnalogyProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </AnalogyProvider>
      </body>
    </html>
  )
}
