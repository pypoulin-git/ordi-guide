'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function Footer() {
  const { t, locale } = useTranslation()

  const links = [
    { href: `/${locale}/guide`,       label: t.footer.guideComplete },
    { href: `/${locale}/comparateur`, label: t.nav.comparator },
    { href: `/${locale}/blog`,        label: t.nav.blog },
    { href: `/${locale}/catalogue`,   label: t.nav.catalogue },
    { href: `/${locale}/about`,       label: t.nav.about },
  ]

  return (
    <footer className="border-t border-[--border] bg-[--bg-subtle] mt-auto">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2.5 font-bold text-[--text] mb-3">
              <Image src="/logo-compy.svg" alt="Shop Compy" width={36} height={36} />
              Shop Compy
            </div>
            <p className="text-sm text-[--text-subtle] leading-relaxed">
              {t.footer.tagline}
            </p>
            <p className="text-xs text-[--text-muted] mt-2">
              shopcompy.ca
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[--text] mb-3 text-sm uppercase tracking-wider">{t.footer.explore}</h3>
            <ul className="space-y-2">
              {links.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[--text-subtle] hover:text-[--accent] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[--text] mb-3 text-sm uppercase tracking-wider">{t.footer.aboutTitle}</h3>
            <p className="text-sm text-[--text-subtle]">
              {t.footer.affiliateDisclosure}
            </p>
          </div>
        </div>
        <div className="border-t border-[--border] mt-10 pt-8 text-xs text-[--text-muted] text-center">
          © {new Date().getFullYear()} Shop Compy. {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}
