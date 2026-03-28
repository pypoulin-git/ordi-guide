'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function Footer() {
  const { t, locale } = useTranslation()
  const isFr = locale === 'fr'

  const navLinks = [
    { href: `/${locale}/guide`,       label: t.footer.guideComplete },
    { href: `/${locale}/comparateur`, label: t.nav.comparator },
    { href: `/${locale}/blog`,        label: t.nav.blog },
    { href: `/${locale}/catalogue`,   label: t.nav.catalogue },
    { href: `/${locale}/about`,       label: t.nav.about },
  ]

  const legalLinks = [
    { href: `/${locale}/privacy`,  label: t.footer.privacy },
    { href: `/${locale}/terms`,    label: t.footer.terms },
    { href: `/${locale}/support`,  label: t.footer.support },
  ]

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-subtle)] mt-auto">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">

          {/* ── Brand ── */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 font-bold text-lg text-[var(--text)] mb-3">
              <Image src="/images/compy-logo.png" alt="Shop Compy" width={32} height={32} className="compy-logo" />
              Shop Compy
            </div>
            <p className="text-sm text-[var(--text-subtle)] leading-relaxed">
              {t.footer.tagline}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-3">
              shopcompy.ca
            </p>
          </div>

          {/* ── Navigation ── */}
          <div>
            <p className="font-semibold text-[var(--text)] mb-4 text-sm uppercase tracking-wider">
              {t.footer.explore}
            </p>
            <ul className="space-y-2">
              {navLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[var(--text-subtle)] hover:text-[var(--accent)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Legal ── */}
          <div>
            <p className="font-semibold text-[var(--text)] mb-4 text-sm uppercase tracking-wider">
              {isFr ? 'Légal' : 'Legal'}
            </p>
            <ul className="space-y-2">
              {legalLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[var(--text-subtle)] hover:text-[var(--accent)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Transparency ── */}
          <div>
            <p className="font-semibold text-[var(--text)] mb-4 text-sm uppercase tracking-wider">
              {t.footer.aboutTitle}
            </p>
            <p className="text-sm text-[var(--text-subtle)] leading-relaxed">
              {t.footer.affiliateDisclosure}
            </p>
          </div>
        </div>

        {/* ── Copyright ── */}
        <div className="border-t border-[var(--border)] mt-10 pt-6 text-xs text-[var(--text-muted)] text-center">
          &copy; {new Date().getFullYear()} Shop Compy. {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}
