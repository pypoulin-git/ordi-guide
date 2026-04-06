'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function Footer() {
  const { t, locale } = useTranslation()
  const isFr = locale === 'fr'

  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      const existing = JSON.parse(localStorage.getItem('newsletter_emails') || '[]')
      if (!existing.includes(email)) {
        existing.push(email)
        localStorage.setItem('newsletter_emails', JSON.stringify(existing))
      }
    } catch {
      localStorage.setItem('newsletter_emails', JSON.stringify([email]))
    }
    setSubscribed(true)
    setEmail('')
  }

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
    { href: `/${locale}/contact`,  label: t.footer.contact },
  ]

  return (
    <footer className="mt-auto">
      {/* Wave SVG separator */}
      <div aria-hidden="true" className="bg-[var(--bg)]">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-12 block">
          <path
            d="M0,0 L0,24 Q360,48 720,24 Q1080,0 1440,24 L1440,48 L0,48 Z"
            className="fill-[var(--bg-subtle)]"
          />
        </svg>
      </div>

      <div className="border-t border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="container pt-16 pb-12 md:pt-20 md:pb-16">
          <nav aria-label="Footer navigation">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">

              {/* -- Brand -- */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2.5 font-bold text-lg text-[var(--text)] mb-3">
                  <Image src="/compy-icon.svg" alt="Shop Compy" width={32} height={32} className="compy-logo" />
                  Shop Compy
                </div>
                <p className="text-sm text-[var(--text-subtle)] leading-relaxed">
                  {t.footer.tagline}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-3">
                  shopcompy.ca
                </p>
              </div>

              {/* -- Navigation -- */}
              <div>
                <p className="font-semibold text-[var(--text)] mb-4 text-sm uppercase tracking-wider">
                  {t.footer.explore}
                </p>
                <ul className="space-y-2">
                  {navLinks.map(l => (
                    <li key={l.href}>
                      <Link href={l.href} className="link-underline text-sm text-[var(--text-subtle)] hover:text-[var(--accent)] transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* -- Legal -- */}
              <div>
                <p className="font-semibold text-[var(--text)] mb-4 text-sm uppercase tracking-wider">
                  {isFr ? 'Legal' : 'Legal'}
                </p>
                <ul className="space-y-2">
                  {legalLinks.map(l => (
                    <li key={l.href}>
                      <Link href={l.href} className="link-underline text-sm text-[var(--text-subtle)] hover:text-[var(--accent)] transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new Event('manage-cookies'))}
                      className="link-underline text-sm text-[var(--text-subtle)] hover:text-[var(--accent)] transition-colors bg-transparent border-none cursor-pointer p-0"
                    >
                      {t.footer.manageCookies}
                    </button>
                  </li>
                </ul>
              </div>

              {/* -- Transparency -- */}
              <div>
                <p className="font-semibold text-[var(--text)] mb-4 text-sm uppercase tracking-wider">
                  {t.footer.aboutTitle}
                </p>
                {(() => {
                  const text = t.footer.affiliateDisclosure
                  const splitPoint = text.indexOf(isFr ? 'On affiche' : 'We also')
                  if (splitPoint > 0) {
                    return (
                      <>
                        <p className="text-sm text-[var(--text-subtle)] leading-relaxed mb-3">
                          {text.slice(0, splitPoint).trim()}
                        </p>
                        <p className="text-sm text-[var(--text-subtle)] leading-relaxed">
                          {text.slice(splitPoint).trim()}
                        </p>
                      </>
                    )
                  }
                  return <p className="text-sm text-[var(--text-subtle)] leading-relaxed">{text}</p>
                })()}
              </div>
            </div>
          </nav>

          {/* -- Newsletter + Social row -- */}
          <div className="mt-12 pt-8 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Newsletter */}
            <div>
              <p className="font-semibold text-[var(--text)] mb-1 text-sm uppercase tracking-wider">
                {t.footer.newsletter}
              </p>
              <p className="text-sm text-[var(--text-muted)] mb-3">
                {t.footer.newsletterDesc}
              </p>
              {subscribed ? (
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  {t.footer.newsletterSuccess}
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t.footer.newsletterPlaceholder}
                    className="flex-1 px-3 py-2 rounded-lg text-sm bg-white dark:bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--accent)] text-white hover:opacity-90 transition-opacity shrink-0"
                  >
                    {t.footer.newsletterButton}
                  </button>
                </form>
              )}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 md:justify-end">
              <a
                href="https://github.com/pypoulin-git/ordi-guide"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-subtle)] hover:text-[var(--accent)] transition-colors"
                aria-label={t.footer.socialGithub}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                {t.footer.socialGithub}
              </a>
            </div>
          </div>

          {/* -- Copyright with gradient divider -- */}
          <div className="mt-10 pt-6 text-xs text-[var(--text-muted)] text-center">
            <div className="h-px mb-6 mx-auto max-w-xs" style={{
              background: 'linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)',
              opacity: 0.4,
            }} />
            &copy; {new Date().getFullYear()} Shop Compy. {t.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  )
}
