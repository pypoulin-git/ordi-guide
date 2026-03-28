'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '@/i18n/DictionaryContext'
import ActionCTA from '@/components/ActionCTA'

export default function Footer() {
  const { t, locale } = useTranslation()

  const links = [
    { href: `/${locale}/guide`,       label: t.footer.guideComplete },
    { href: `/${locale}/comparateur`, label: t.nav.comparator },
    { href: `/${locale}/blog`,        label: t.nav.blog },
    { href: `/${locale}/catalogue`,   label: t.nav.catalogue },
    { href: `/${locale}/about`,       label: t.nav.about },
    { href: `/${locale}/privacy`,    label: t.footer.privacy },
    { href: `/${locale}/support`,    label: t.footer.support },
  ]

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-subtle)] mt-auto">
      {/* Safety net section for lost users */}
      <div className="border-b border-[var(--border)] bg-[var(--accent-bg)]">
        <div className="container py-12 md:py-20 text-center">
          <p className="text-lg font-semibold text-[var(--text)] mb-6">
            {t.footer.helpTitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`/${locale}/comparateur`}
              className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
              {t.footer.helpComparator}
            </Link>
            <Link href={`/${locale}/guide`}
              className="btn-outline" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
              {t.footer.helpGuide}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Expert + Donation CTAs ── */}
      <div className="border-b border-[var(--border)]">
        <div className="container py-10 md:py-14 max-w-2xl mx-auto">
          <ActionCTA variant="full" />
        </div>
      </div>

      <div className="container py-16 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <div>
            <div className="flex items-center gap-2.5 font-bold text-lg text-[var(--text)] mb-3">
              <Image src="/images/compy-logo.png" alt="Shop Compy" width={36} height={36} className="compy-logo" />
              Shop Compy
            </div>
            <p className="text-base text-[var(--text-subtle)] leading-relaxed">
              {t.footer.tagline}
            </p>
            <p className="text-sm text-[var(--text-muted)] mt-2">
              shopcompy.ca
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--text)] mb-5 text-base uppercase tracking-wider">{t.footer.explore}</h3>
            <ul className="space-y-2">
              {links.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-base text-[var(--text-subtle)] hover:text-[var(--accent)] transition-colors inline-block py-2">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--text)] mb-4 text-base uppercase tracking-wider">{t.footer.aboutTitle}</h3>
            <p className="text-base text-[var(--text-subtle)] leading-relaxed">
              {t.footer.affiliateDisclosure}
            </p>
          </div>
        </div>
        <div className="border-t border-[var(--border)] mt-12 pt-8 md:mt-16 md:pt-10 text-sm text-[var(--text-muted)] text-center">
          &copy; {new Date().getFullYear()} Shop Compy. {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}
