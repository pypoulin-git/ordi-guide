import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { headers } from 'next/headers'
import './globals.css'
import JsonLd from '@/components/JsonLd'
import AdSenseScript from '@/components/AdSenseScript'
import { BASE_URL, SITE_NAME } from '@/lib/constants'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const hdrs = await headers()
  const locale = hdrs.get('x-locale') || 'fr'
  const isFr = locale === 'fr'

  return (
    <html lang={locale} className={`${inter.variable} h-full`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_NAME,
          url: BASE_URL,
          description: isFr
            ? 'Guide simple pour choisir ton ordinateur. Recommandations accessibles et honnêtes.'
            : 'Simple guide to choose your computer. Accessible and honest recommendations.',
          inLanguage: isFr ? 'fr-CA' : 'en-CA',
          potentialAction: {
            '@type': 'SearchAction',
            target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/?q={search_term_string}` },
            'query-input': 'required name=search_term_string',
          },
        }} />
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: SITE_NAME,
          url: BASE_URL,
          logo: `${BASE_URL}/images/compy-logo.png`,
          description: isFr
            ? 'Plateforme québécoise d\'aide à l\'achat informatique.'
            : 'Quebec-based computer buying guide platform.',
        }} />
        <AdSenseScript />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--accent)] focus:text-white focus:font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)]"
        >
          {isFr ? 'Aller au contenu' : 'Skip to content'}
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
