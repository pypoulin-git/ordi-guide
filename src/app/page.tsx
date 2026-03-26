'use client'
import Link from 'next/link'
import AnalogyToggle from '@/components/AnalogyToggle'
import SearchBar from '@/components/SearchBar'
import { useAnalogy } from '@/contexts/AnalogyContext'

const features = [
  {
    href: '/guide',
    icon: '📖',
    title: 'Le guide complet',
    desc: 'Comprends les bases en 10 minutes. Processeur, mémoire, stockage… expliqués sans jargon.',
    cta: 'Lire le guide →',
    color: '#2563eb',
    bg: '#eff6ff',
  },
  {
    href: '/comparateur',
    icon: '🎯',
    title: 'M\'aider à choisir',
    desc: 'Réponds à 5 questions simples et reçois une recommandation personnalisée selon ton usage et ton budget.',
    cta: 'Commencer →',
    color: '#0891b2',
    bg: '#ecfeff',
  },
  {
    href: '/glossaire',
    icon: '📚',
    title: 'Lexique des termes',
    desc: 'Tu as vu "SSD NVMe" ou "RAM DDR5" et tu ne sais pas ce que ça veut dire ? On t\'explique.',
    cta: 'Explorer le lexique →',
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
]

const reassurances = [
  { icon: '✅', label: 'Explications simples', desc: 'Pas de jargon, pas de condescendance' },
  { icon: '⚡', label: 'Rapide à lire', desc: 'L\'essentiel en moins de 10 min' },
  { icon: '🚫', label: 'Zéro publicité', desc: 'Aucun partenariat, aucune commission' },
  { icon: '👨‍👩‍👧‍👦', label: 'Pour tous', desc: 'Que tu aies 15 ou 75 ans' },
]

const faqs = [
  {
    q: 'Combien dois-je dépenser pour un bon ordinateur ?',
    a: 'Pour la plupart des usages courants (navigation, courriels, photos, vidéos), un budget de 500 à 800 $ suffit amplement. Il n\'est pas nécessaire de dépenser 1 500 $ sauf si tu fais de la vidéo 4K, du jeu vidéo exigeant, ou du travail professionnel spécialisé.',
  },
  {
    q: 'Portable ou ordinateur de bureau ?',
    a: 'Un portable te suit partout mais coûte un peu plus cher pour les mêmes performances. Un ordinateur de bureau est plus puissant pour le même prix et plus facile à réparer, mais reste à la maison. Si tu te déplaces souvent ou travailles dans différentes pièces, le portable est idéal.',
  },
  {
    q: 'Mac ou Windows ?',
    a: 'Les deux font très bien le travail. Windows offre plus de choix de modèles et de prix. Mac est apprécié pour sa simplicité, sa durabilité et son intégration avec iPhone/iPad. Le choix se fait souvent selon l\'habitude et l\'usage — notre guide t\'aide à y voir plus clair.',
  },
  {
    q: 'C\'est quoi la différence entre RAM et stockage ?',
    a: 'La RAM, c\'est comme le bureau de travail : plus elle est grande, plus tu peux avoir de choses ouvertes en même temps. Le stockage (disque dur / SSD), c\'est l\'armoire où tu ranges tout. Un bureau encombré ralentit, une grande armoire bien rangée ne ralentit pas.',
  },
]

export default function HomePage() {
  const { a, mode } = useAnalogy()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 60%, #ecfeff 100%)' }}>
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}>
            🖥️ Guide indépendant · Zéro pub · Vraiment simple
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#0f172a' }}>
            Besoin d&apos;aide pour<br />
            <span style={{ color: '#2563eb' }}>choisir ton prochain ordi ?</span>
          </h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: '#475569' }}>
            On t&apos;explique tout sans jargon, sans pression et sans publicité.
            Un guide honnête pour magasiner en confiance — que tu sois débutant ou pas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/comparateur" className="btn-primary text-base py-3 px-8">
              🎯 M&apos;aider à choisir
            </Link>
            <Link href="/guide" className="btn-outline text-base py-3 px-8">
              📖 Lire le guide
            </Link>
          </div>
        </div>
      </section>

      {/* ── Analogy chooser ────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '2rem', background: '#f8fafc' }}>
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="text-lg font-bold mb-1" style={{ color: '#0f172a' }}>Comment veux-tu qu&apos;on t&apos;explique ?</h2>
          <p className="text-sm mb-4" style={{ color: '#64748b' }}>
            Choisis ton style d&apos;analogies — ça change les explications sur tout le site
          </p>
          <AnalogyToggle variant="card" />
          <p className="text-xs mt-3" style={{ color: '#94a3b8' }}>
            Tu peux changer à tout moment via le toggle dans le menu
          </p>
        </div>
      </section>

      {/* ── Analogy preview (clin d'oeil) ───────────────────────────── */}
      <section className="section" style={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
        <div className="container max-w-3xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(['cpu', 'ram', 'ssd', 'gpu', 'battery', 'screen'] as const).map(comp => {
              const analogy = a(comp)
              return (
                <div key={comp} className="card text-center" style={{ padding: '1rem' }}>
                  <div className="text-2xl mb-1">{analogy.icon}</div>
                  <div className="font-semibold text-xs" style={{ color: '#0f172a' }}>{analogy.name}</div>
                  <div className="text-xs" style={{ color: '#64748b' }}>{analogy.short}</div>
                  <div className="text-[10px] uppercase tracking-wider mt-1" style={{ color: '#94a3b8' }}>
                    {comp === 'ssd' ? 'Stockage' : comp === 'battery' ? 'Batterie' : comp === 'screen' ? 'Écran' : comp.toUpperCase()}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── AI Search ─────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: '#0f172a' }}>
            🔍 Décris ton besoin, on s&apos;occupe du reste
          </h2>
          <p className="text-center text-sm mb-6" style={{ color: '#64748b' }}>
            Dis-nous ce que tu cherches en une phrase — notre IA te donne une recommandation instantanée
          </p>
          <SearchBar />
        </div>
      </section>

      {/* ── Feature cards ────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: '#0f172a' }}>Par où commencer ?</h2>
          <p className="text-center mb-10" style={{ color: '#475569' }}>Trois outils simples pour t&apos;accompagner dans ton achat</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(f => (
              <Link key={f.href} href={f.href} className="card block hover:no-underline group">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#0f172a' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569' }}>{f.desc}</p>
                <span className="text-sm font-semibold" style={{ color: f.color }}>{f.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reassurance strip ────────────────────────────────────── */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {reassurances.map(r => (
              <div key={r.label} className="text-center">
                <div className="text-3xl mb-2">{r.icon}</div>
                <div className="font-semibold text-sm mb-1" style={{ color: '#0f172a' }}>{r.label}</div>
                <div className="text-xs" style={{ color: '#94a3b8' }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: '#0f172a' }}>Questions fréquentes</h2>
          <p className="text-center mb-10" style={{ color: '#475569' }}>Les vraies questions que tout le monde se pose</p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="card cursor-pointer" style={{ padding: '1.25rem 1.5rem' }}>
                <summary className="font-semibold text-base list-none flex items-center justify-between gap-4"
                  style={{ color: '#0f172a' }}>
                  {faq.q}
                  <span className="text-xl shrink-0" style={{ color: '#2563eb' }}>+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: '#475569' }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="section" style={{ background: '#2563eb' }}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Prêt à trouver ton ordi idéal ?</h2>
          <p className="text-lg mb-8 text-white/80">
            Réponds à 5 questions et reçois une recommandation personnalisée gratuite.
          </p>
          <Link href="/comparateur"
            className="inline-flex items-center gap-2 bg-white font-semibold py-3 px-8 rounded-xl text-base transition-transform hover:-translate-y-0.5"
            style={{ color: '#2563eb' }}>
            Commencer — c&apos;est gratuit →
          </Link>
        </div>
      </section>
    </>
  )
}
