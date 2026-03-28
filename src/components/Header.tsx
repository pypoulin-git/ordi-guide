'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import AnalogyToggle from './AnalogyToggle'
import ThemeToggle from './ThemeToggle'
import { useTranslation } from '@/i18n/DictionaryContext'
import LanguageSwitcher from './LanguageSwitcher'
import GlassTooltip from './GlassTooltip'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { t, locale } = useTranslation()
  const pathname = usePathname()
  const burgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const NAV = [
    { href: `/${locale}/guide`,       label: t.nav.guide },
    { href: `/${locale}/comparateur`, label: t.nav.comparator },
    { href: `/${locale}/blog`,        label: t.nav.blog },
    { href: `/${locale}/catalogue`,   label: t.nav.catalogue },
    { href: `/${locale}/about`,       label: t.nav.about },
  ]

  const closeMenu = useCallback(() => {
    setOpen(false)
    burgerRef.current?.focus()
  }, [])

  // Escape key closes the menu
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeMenu()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, closeMenu])

  // Focus trap: Tab cycles within the menu panel
  useEffect(() => {
    if (!open) return
    const panel = menuRef.current
    if (!panel) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Move focus into the menu when it opens
  useEffect(() => {
    if (!open) return
    const panel = menuRef.current
    if (!panel) return
    const first = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
    first?.focus()
  }, [open])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 shadow-sm bg-[var(--bg)] dark:shadow-md">

      {/* -- Ligne 1 : Logo + navigation principale -- */}
      <div className="border-b border-[var(--border)]">
        <div className="container">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <Link href={`/${locale}`}
              className="flex items-center gap-2 font-bold text-lg hover:text-[var(--accent)] transition-colors text-[var(--text)]"
              style={{ whiteSpace: 'nowrap' }}>
              <Image src="/images/compy-logo.png" alt="" width={32} height={32} className="shrink-0 compy-logo" />
              Shop Compy
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {NAV.map(n => (
                <Link key={n.href} href={n.href}
                  className="px-3 py-2 rounded-lg font-medium transition-colors hover:text-[var(--accent)] hover:bg-[var(--accent-bg)] text-[var(--text-subtle)]"
                  style={{ fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                  {n.label}
                </Link>
              ))}
              <LanguageSwitcher />
              <ThemeToggle />
            </nav>

            {/* Burger mobile + theme toggle */}
            <div className="md:hidden flex items-center gap-1">
              <ThemeToggle />
              <button
                ref={burgerRef}
                className="p-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors"
                onClick={() => (open ? closeMenu() : setOpen(true))}
                aria-label="Menu"
                aria-expanded={open}
                aria-controls="mobile-menu-panel"
              >
                <div className="space-y-1.5">
                  <span className={`block h-0.5 w-6 bg-[var(--text)] transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block h-0.5 w-6 bg-[var(--text)] transition-opacity ${open ? 'opacity-0' : ''}`} />
                  <span className={`block h-0.5 w-6 bg-[var(--text)] transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* -- Ligne 2 : Sous-menu -- Toggle + CTA (desktop uniquement) -- */}
      <div className="hidden md:block relative bg-[var(--bg-subtle)] border-b border-[var(--border)]" style={{ overflow: 'visible' }}>
        <div className="container" style={{ overflow: 'visible' }}>
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center gap-2">
              <GlassTooltip label={t.nav.analogyHelp}>
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold cursor-help"
                  style={{ background: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                  aria-label={t.nav.analogyHelp}
                >
                  ?
                </span>
              </GlassTooltip>
              <span className="text-sm font-medium text-[var(--text-muted)]">
                {t.nav.explanationMode}
              </span>
              <AnalogyToggle variant="pill" />
            </div>
            <Link href={`/${locale}/comparateur`}
              className="btn-primary"
              style={{ padding: '0.35rem 1rem', fontSize: '0.8125rem' }}>
              {t.nav.start}
            </Link>
          </div>
        </div>
      </div>

      {/* -- Menu mobile deroulant -- */}
      {open && (
        <div
          ref={menuRef}
          id="mobile-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="border-t border-[var(--border)] bg-[var(--bg)]"
        >
          <nav className="container py-2">
            {NAV.map((n, i) => {
              const isActive = pathname === n.href || pathname.startsWith(n.href + '/')
              return (
                <div key={n.href}>
                  <Link href={n.href} onClick={closeMenu}
                    className={`block px-4 py-4 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'text-[var(--accent)] bg-[var(--accent-bg)]'
                        : 'text-[var(--text-subtle)] hover:text-[var(--accent)] hover:bg-[var(--accent-bg)]'
                    }`}>
                    {n.label}
                  </Link>
                  {i < NAV.length - 1 && (
                    <div className="border-b border-[var(--border)] mx-4" />
                  )}
                </div>
              )
            })}
            <div className="flex items-center justify-between px-4 pt-4 mt-2 border-t border-[var(--border)]">
              <div className="flex items-center gap-3">
                <AnalogyToggle variant="pill" />
                <LanguageSwitcher />
              </div>
              <Link href={`/${locale}/comparateur`} onClick={closeMenu}
                className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
                {t.nav.start}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
