import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[--border] bg-[--bg-subtle] mt-auto">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-[--text] mb-3">
              <span className="text-xl">🖥️</span> Shop Compy
            </div>
            <p className="text-sm text-[--text-subtle] leading-relaxed">
              Un guide simple et honnête pour t&apos;aider à choisir ton prochain ordinateur, sans jargon inutile.
            </p>
            <p className="text-xs text-[--text-muted] mt-2">
              shopcompy.ca
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[--text] mb-3 text-sm uppercase tracking-wider">Explorer</h3>
            <ul className="space-y-2">
              {[
                { href: '/guide', label: 'Le guide complet' },
                { href: '/comparateur', label: 'M\'aider à choisir' },
                { href: '/glossaire', label: 'Lexique des termes' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[--text-subtle] hover:text-[--accent] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[--text] mb-3 text-sm uppercase tracking-wider">À propos</h3>
            <p className="text-sm text-[--text-subtle]">
              Ce site est indépendant et sans publicité. Les recommandations sont basées sur la valeur pour l&apos;utilisateur, pas sur des commissions.
            </p>
          </div>
        </div>
        <div className="border-t border-[--border] mt-8 pt-6 text-xs text-[--text-muted] text-center">
          © {new Date().getFullYear()} Shop Compy — Tous droits réservés
        </div>
      </div>
    </footer>
  )
}
