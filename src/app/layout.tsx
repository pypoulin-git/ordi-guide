import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import JsonLd from '@/components/JsonLd'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const BASE_URL = 'https://ordi-guide.vercel.app'

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
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
          logo: `${BASE_URL}/logo-compy.svg`,
          description: 'Plateforme québécoise d\'aide à l\'achat informatique.',
        }} />
      </head>
      <body className="min-h-full flex flex-col bg-[--bg] text-[--text]">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
