import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { I18nProvider } from '@/i18n/DictionaryContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import CookieConsent from '@/components/CookieConsent'
import FundingToast from '@/components/FundingToast'
import { AnalogyProvider } from '@/contexts/AnalogyContext'
import { CompareProvider } from '@/contexts/CompareContext'
import CompareDrawer from '@/components/CompareDrawer'
import { BASE_URL } from '@/lib/constants'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: isFr
        ? 'Shop Compy — Guide simple pour choisir ton ordinateur'
        : 'Shop Compy — Simple Guide to Choose Your Computer',
      template: '%s — Shop Compy',
    },
    description: isFr
      ? 'Choisir un ordinateur n\'est pas compliqué. On t\'explique tout simplement pour que tu puisses magasiner en confiance. Recommandations accessibles et honnêtes.'
      : 'Choosing a computer isn\'t complicated. We explain everything simply so you can shop with confidence. Accessible and honest recommendations.',
    openGraph: {
      type: 'website',
      locale: isFr ? 'fr_CA' : 'en_CA',
      url: BASE_URL,
      siteName: 'Shop Compy',
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'fr-CA': `${BASE_URL}/fr`,
        'en-CA': `${BASE_URL}/en`,
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const dictionary = await getDictionary(locale as Locale)

  return (
    <I18nProvider dictionary={dictionary} locale={locale as Locale}>
      <AnalogyProvider>
        <CompareProvider>
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
          <FundingToast />
          <ScrollToTop />
          <CompareDrawer />
        </CompareProvider>
      </AnalogyProvider>
    </I18nProvider>
  )
}
