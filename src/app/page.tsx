'use client'
import Link from 'next/link'
import AnalogyToggle from '@/components/AnalogyToggle'
import SearchBar from '@/components/SearchBar'
import { useAnalogy } from '@/contexts/AnalogyContext'

const COMP_LABELS: Record<string, string> = {
  cpu:     'Processeur',
  ram:     'Mémoire vive',
  ssd:     'Stockage',
  gpu:     'Carte graphique',
  battery: 'Batterie',
  screen:  'Écran',
}

const features = [
  {
    href: '/guide',
    title: 'Le guide complet',
    desc: 'Comprends les bases en 10 minutes. Processeur, mémoire, stockage, expliqués sans jargon.',
    cta: 'Lire le guide →',
    color: '#2563eb',
    bg: '#eff6ff',
  },
  {
    href: '/comparateur',
    title: 'M\'aider à choisir',
    desc: 'Réponds à 5 questions simples et reçois une recommandation personnalisée selon ton usage et ton budget.',
    cta: 'Commencer →',
    color: '#0891b2',
    bg: '#ecfeff',
  },
  {
    href: '/glossaire',
    title: 'Lexique des termes',
    desc: 'Tu as vu "SSD NVMe" ou "RAM DDR5" et tu ne sais pas ce que ça veut dire ? On t\'explique.',
    cta: 'Explorer le lexique →',
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
]

const reassurances = [
  { label: 'Explications simples', desc: 'Pas de jargon, pas de condescendance' },
  { label: 'Rapide à lire', desc: 'L\'essentiel en moins de 10 min' },
  { label: 'Zéro publicité', desc: 'Aucun partenariat, aucune commission' },
  { label: 'Pour tous', desc: 'Que tu aies 15 ou 75 ans' },
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
    a: 'Les deux font très bien le travail. Windows offre plus de choix de modèles et de prix. Mac est apprécié pour sa simplicité, sa durabilité et son intégration avec iPhone/iPad. Le choix se fait souvent selon l\'habitude et l\'usage, notre guide t\'aide à y voir plus clair.',
  },
  {
    q: 'C\'est quoi la différence entre RAM et stockage ?',
    a: 'La RAM, c\'est comme le bureau de travail : plus elle est grande, plus tu peux avoir de choses ouvertes en même temps. Le stockage (disque dur / SSD), c\'est l\'armoire où tu ranges tout. Un bureau encombré ralentit, une grande armoire bien rangée ne ralentit pas.',
  },
]

export default function HomePage() {
  const { a, mode, modeLabel, modeIcon } = useAnalogy()

  return (
    <>
      {/* ── HERO BANNIÈRE PLEINE LARGEUR ── */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 45%, #4338ca 100%)',
        padding: '5rem 0 6rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Formes décoratives */}
        <div aria-hidden style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
        }} />
        <div aria-hidden style={{
          position: 'absolute', bottom: '-60px', left: '10%',
          width: '260px', height: '260px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
        }} />

        <div className="container" style={{ position: 'relative' }}>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-bold text-white mb-5 leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}>
              Besoin d&apos;aide pour choisir<br />ton prochain ordinateur&nbsp;?
            </h1>
            <p className="text-white/80 leading-relaxed mb-10"
              style={{ fontSize: '1.25rem', maxWidth: '36rem', margin: '0 auto 2.5rem' }}>
              On t&apos;explique tout sans jargon, sans pression et sans publicité.
              Un guide honnête pour magasiner en confiance, que tu sois débutant ou pas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/comparateur"
                className="inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all hover:-translate-y-0.5"
                style={{
                  background: 'white', color: '#1e3a8a',
                  padding: '1rem 2.25rem', fontSize: '1.0625rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                }}>
                M&apos;aider à choisir
              </Link>
              <Link href="/guide"
                className="inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:bg-white/10"
                style={{
                  background: 'transparent', color: 'white',
                  border: '2px solid rgba(255,255,255,0.6)',
                  padding: '1rem 2.25rem', fontSize: '1.0625rem',
                }}>
                Lire le guide
              </Link>
            </div>
          </div>
        </div>

        {/* Vague de transition */}
        <div aria-hidden style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '48px',
        }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path d="M0,48 L0,24 Q360,0 720,24 Q1080,48 1440,24 L1440,48 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── BARRE DE RECHERCHE ── */}
      <section style={{ background: 'white', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: '#0f172a' }}>
            Décris ton besoin, on s&apos;occupe du reste
          </h2>
          <p className="text-center mb-6" style={{ color: '#64748b' }}>
            Notre assistant analyse ta demande et te donne une recommandation instantanée
          </p>
          <SearchBar />
        </div>
      </section>

      {/* ── SECTION ANALOGIES ENCADRÉE ── */}
      <section style={{ background: '#f8fafc', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid #e2e8f0', background: 'white' }}>

            {/* En-tête de la section */}
            <div className="px-8 py-5" style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <h2 className="text-xl font-bold" style={{ color: '#0f172a' }}>
                Ou tu veux qu&apos;on t&apos;explique ?
              </h2>
              <p className="text-sm mt-1" style={{ color: '#64748b' }}>
                Choisis comment les explications s&apos;adaptent à toi sur tout le site
              </p>
            </div>

            {/* Corps 2 colonnes */}
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: '280px' }}>

              {/* Colonne gauche : toggle */}
              <div className="flex flex-col justify-center px-8 py-8"
                style={{ borderRight: '1px solid #e2e8f0' }}>
                <p className="font-semibold mb-1" style={{ color: '#0f172a' }}>Ton style d&apos;analogies</p>
                <p className="text-sm mb-5" style={{ color: '#64748b' }}>
                  Chaque composante d&apos;un ordinateur sera expliquée selon ton univers préféré
                </p>
                <AnalogyToggle variant="card" />
                <p className="text-xs mt-4" style={{ color: '#94a3b8' }}>
                  Accessible depuis le menu en tout temps
                </p>
              </div>

              {/* Colonne droite : 6 dimensions verticales */}
              <div className="px-8 py-6">
                <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: '#94a3b8' }}>
                  {modeIcon} Mode {modeLabel}
                </p>
                <ul className="space-y-5">
                  {(['cpu', 'ram', 'ssd', 'gpu', 'battery', 'screen'] as const).map(comp => {
                    const analogy = a(comp)
                    return (
                      <li key={comp} className="flex items-start gap-3">
                        <span className="text-2xl w-8 text-center shrink-0 mt-0.5">{analogy.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold" style={{ color: '#0f172a', fontSize: '0.9375rem' }}>
                            {analogy.name}
                          </div>
                          <div className="text-sm" style={{ color: '#64748b', lineHeight: 1.4 }}>
                            {analogy.short}
                          </div>
                        </div>
                        <span className="shrink-0 text-xs px-2 py-0.5 rounded-full mt-0.5"
                          style={{ background: '#f1f5f9', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                          {COMP_LABELS[comp]}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURE CARDS ── */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: '#0f172a' }}>Par où commencer ?</h2>
          <p className="text-center mb-10" style={{ color: '#475569' }}>Trois outils simples pour t&apos;accompagner dans ton achat</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(f => (
              <Link key={f.href} href={f.href} className="card block hover:no-underline"
                style={{ background: f.bg, borderColor: f.color + '30' }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0f172a' }}>{f.title}</h3>
                <p className="leading-relaxed mb-5" style={{ color: '#475569' }}>{f.desc}</p>
                <span className="font-semibold" style={{ color: f.color }}>{f.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RÉASSURANCES ── */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {reassurances.map(r => (
              <div key={r.label} className="text-center">
                <div className="font-semibold mb-1" style={{ color: '#0f172a' }}>{r.label}</div>
                <div className="text-sm" style={{ color: '#94a3b8' }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: '#0f172a' }}>Questions fréquentes</h2>
          <p className="text-center mb-10" style={{ color: '#475569' }}>Les vraies questions que tout le monde se pose</p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="card cursor-pointer" style={{ padding: '1.25rem 1.5rem' }}>
                <summary className="font-semibold list-none flex items-center justify-between gap-4"
                  style={{ color: '#0f172a', fontSize: '1.0625rem' }}>
                  {faq.q}
                  <span className="text-xl shrink-0" style={{ color: '#2563eb' }}>+</span>
                </summary>
                <p className="mt-3 leading-relaxed" style={{ color: '#475569' }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="section" style={{ background: '#2563eb' }}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Prêt à trouver ton ordi idéal ?</h2>
          <p className="text-lg mb-8 text-white/80">
            Réponds à 5 questions et reçois une recommandation personnalisée gratuite.
          </p>
          <Link href="/comparateur"
            className="inline-flex items-center gap-2 bg-white font-bold py-3 px-8 rounded-xl text-base transition-transform hover:-translate-y-0.5"
            style={{ color: '#2563eb', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
            Commencer, c&apos;est gratuit →
          </Link>
        </div>
      </section>
    </>
  )
}
