'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function LanguageSwitcher() {
  const { locale } = useTranslation()
  const pathname = usePathname()

  const otherLocale = locale === 'fr' ? 'en' : 'fr'
  const label = locale === 'fr' ? 'EN' : 'FR'

  // Replace /fr/... with /en/... or vice versa
  const switchedPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  return (
    <Link
      href={switchedPath}
      className="ml-2 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide transition-colors hover:bg-[var(--accent-bg)]"
      style={{
        color: 'var(--accent)',
        border: '1.5px solid var(--accent)',
      }}
      title={locale === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      {label}
    </Link>
  )
}
