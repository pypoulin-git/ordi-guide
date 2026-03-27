'use client'
import Link from 'next/link'
import { useState } from 'react'
import AnalogyToggle from './AnalogyToggle'

const NAV = [
  { href: '/guide',       label: 'Le guide' },
  { href: '/comparateur', label: 'M\'aider à choisir' },
  { href: '/blog',        label: 'Le Décodeur' },
  { href: '/glossaire',   label: 'Lexique' },
  { href: '/catalogue',   label: 'Catalogue' },
  { href: '/about',       label: 'À propos' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[--border] shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[--text] hover:text-[--accent] transition-colors">
            <span>Shop Compy</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(n => (
              <Link key={n.href} href={n.href}
                className="px-4 py-2 rounded-lg text-[--text-subtle] hover:text-[--accent] hover:bg-[--accent-bg] font-medium transition-colors text-sm">
                {n.label}
              </Link>
            ))}
            <div className="ml-2 mr-2">
              <AnalogyToggle variant="pill" />
            </div>
            <Link href="/comparateur"
              className="ml-1 btn-primary text-sm py-2 px-4">
              Commencer →
            </Link>
          </nav>

          {/* Mobile burger */}
          <button className="md:hidden p-2 rounded-lg hover:bg-[--bg-card] transition-colors"
            onClick={() => setOpen(o => !o)} aria-label="Menu">
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-[--text] transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-[--text] transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-[--text] transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="md:hidden border-t border-[--border] py-3 space-y-1">
            {NAV.map(n => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-[--text-subtle] hover:text-[--accent] hover:bg-[--accent-bg] font-medium transition-colors">
                {n.label}
              </Link>
            ))}
            <div className="px-3 py-2">
              <AnalogyToggle variant="pill" />
            </div>
            <div className="pt-2">
              <Link href="/comparateur" onClick={() => setOpen(false)}
                className="btn-primary w-full justify-center text-sm">
                Commencer →
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
