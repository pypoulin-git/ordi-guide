'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import AnalogyToggle from './AnalogyToggle'

const NAV = [
  { href: '/guide',       label: 'Le guide' },
  { href: '/comparateur', label: 'M\'aider à choisir' },
  { href: '/blog',        label: 'Le Décodeur' },
  { href: '/catalogue',   label: 'Catalogue' },
  { href: '/about',       label: 'À propos' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 shadow-sm" style={{ background: 'white' }}>

      {/* ── Ligne 1 : Logo + navigation principale ── */}
      <div style={{ borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <Link href="/"
              className="flex items-center gap-2 font-bold text-lg hover:text-[--accent] transition-colors"
              style={{ color: '#0f172a', whiteSpace: 'nowrap' }}>
              <Image src="/logo-compy.svg" alt="" width={32} height={32} className="shrink-0" />
              Shop Compy
            </Link>

            {/* Desktop nav — tous les liens sur une ligne */}
            <nav className="hidden md:flex items-center gap-0.5">
              {NAV.map(n => (
                <Link key={n.href} href={n.href}
                  className="px-3 py-2 rounded-lg font-medium transition-colors hover:text-[--accent] hover:bg-[--accent-bg]"
                  style={{ color: '#475569', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                  {n.label}
                </Link>
              ))}
            </nav>

            {/* Burger mobile */}
            <button className="md:hidden p-2 rounded-lg hover:bg-[--bg-card] transition-colors"
              onClick={() => setOpen(o => !o)} aria-label="Menu">
              <div className="space-y-1.5">
                <span className={`block h-0.5 w-6 bg-[--text] transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 w-6 bg-[--text] transition-opacity ${open ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-6 bg-[--text] transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Ligne 2 : Sous-menu — Toggle + CTA (desktop uniquement) ── */}
      <div className="hidden md:block relative" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', overflow: 'visible' }}>
        <div className="container" style={{ overflow: 'visible' }}>
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>
                Mode d&apos;explication
              </span>
              <AnalogyToggle variant="pill" />
            </div>
            <Link href="/comparateur"
              className="btn-primary"
              style={{ padding: '0.35rem 1rem', fontSize: '0.8125rem' }}>
              Commencer →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Menu mobile déroulant ── */}
      {open && (
        <div style={{ borderTop: '1px solid #e2e8f0', background: 'white' }}>
          <nav className="container py-3 space-y-1">
            {NAV.map(n => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-lg font-medium transition-colors hover:text-[--accent] hover:bg-[--accent-bg]"
                style={{ color: '#475569' }}>
                {n.label}
              </Link>
            ))}
            <div className="flex items-center justify-between px-3 pt-3 mt-2"
              style={{ borderTop: '1px solid #f1f5f9' }}>
              <AnalogyToggle variant="pill" />
              <Link href="/comparateur" onClick={() => setOpen(false)}
                className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
                Commencer →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
