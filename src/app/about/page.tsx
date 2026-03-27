import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos — Shop Compy',
  description: 'L\'histoire derrière Shop Compy : deux ans chez Dell, une analogie du corps humain, et une mission simple — rendre l\'informatique accessible à tout le monde.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#0f172a' }}>
            L&apos;humain derrière la machine
          </h1>
          <p className="text-xl leading-relaxed" style={{ color: '#475569' }}>
            Shop Compy n&apos;est pas une grande entreprise. C&apos;est une idée née derrière un comptoir,
            avec des gens ordinaires qui méritaient de meilleures explications.
          </p>
        </div>
      </section>

      {/* Histoire 1 : Dell */}
      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <div className="card" style={{ padding: '2.5rem', borderLeft: '4px solid #2563eb' }}>
            <p className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#2563eb' }}>
              Le point de départ
            </p>
            <blockquote className="text-xl leading-relaxed mb-0" style={{ color: '#0f172a', fontStyle: 'italic' }}>
              &laquo;&nbsp;Il y a quelques années, j&apos;ai passé deux ans comme conseiller chez Dell.
              Ma partie préférée du travail&nbsp;? Ce n&apos;était pas de réciter des fiches techniques,
              c&apos;était de voir le visage de &laquo;&nbsp;monsieur et madame tout le monde&nbsp;&raquo;
              s&apos;éclairer quand ils comprenaient enfin ce qu&apos;ils achetaient.&nbsp;&raquo;
            </blockquote>
          </div>

          <div className="mt-6" style={{ color: '#475569' }}>
            <p className="leading-relaxed mb-5">
              C&apos;est là qu&apos;est née ma fameuse analogie du corps humain. Expliquer qu&apos;un processeur
              est un cerveau, que la RAM est un poumon, ça change tout. Soudainement, l&apos;informatique
              n&apos;est plus une langue étrangère — c&apos;est une question de bon sens.
            </p>
            <p className="leading-relaxed">
              Les clients partaient avec un ordinateur qui leur ressemblait vraiment, pas avec celui
              que le vendeur avait intérêt à écouler. Ce détail faisait toute la différence.
            </p>
          </div>
        </div>
      </section>

      {/* Histoire 2 : aujourd'hui */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container max-w-3xl mx-auto">
          <div className="card" style={{ padding: '2.5rem', borderLeft: '4px solid #7c3aed' }}>
            <p className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#7c3aed' }}>
              Aujourd&apos;hui
            </p>
            <blockquote className="text-xl leading-relaxed mb-0" style={{ color: '#0f172a', fontStyle: 'italic' }}>
              &laquo;&nbsp;Ma carrière m&apos;a amené ailleurs, mais je reste &laquo;&nbsp;le gars de service&nbsp;&raquo;
              pour mes parents, mes cousins et mes voisins. Soyons honnêtes&nbsp;: le marché informatique
              en 2026 est une jungle. À peine commence-t-on à maîtriser un concept qu&apos;une nouvelle puce IA
              vient tout révolutionner.&nbsp;&raquo;
            </blockquote>
          </div>

          <div className="mt-6" style={{ color: '#475569' }}>
            <p className="leading-relaxed">
              Il est devenu impossible pour une personne ordinaire de suivre la cadence sans y passer ses nuits.
              Pourtant, les décisions à prendre restent les mêmes : quel ordinateur acheter, pour quel budget,
              pour quel usage. Les questions n&apos;ont pas changé. Ce qui a changé, c&apos;est la complexité de
              trouver une réponse claire.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#0f172a' }}>La solution : l&apos;IA au service de la simplicité</h2>
          <p className="leading-relaxed mb-8" style={{ color: '#475569' }}>
            C&apos;est pour cette raison que j&apos;ai créé ce site. L&apos;idée était de combiner
            l&apos;intelligence artificielle — capable d&apos;analyser les milliers de specs qui changent chaque jour —
            avec une approche humaine, accessible et sans condescendance.
          </p>

          <div className="space-y-4">
            <div className="card flex gap-5 items-start" style={{ padding: '1.5rem 2rem' }}>
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: '#2563eb', fontSize: '1rem' }}>1</div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: '#0f172a', fontSize: '1.0625rem' }}>Vulgariser</h3>
                <p style={{ color: '#475569', fontSize: '0.9375rem' }}>
                  Vous expliquer la technologie avec des mots et des analogies — corps humain ou automobile —
                  que vous comprenez vraiment, sans jargon inutile.
                </p>
              </div>
            </div>

            <div className="card flex gap-5 items-start" style={{ padding: '1.5rem 2rem' }}>
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: '#7c3aed', fontSize: '1rem' }}>2</div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: '#0f172a', fontSize: '1.0625rem' }}>Sécuriser</h3>
                <p style={{ color: '#475569', fontSize: '0.9375rem' }}>
                  Vous diriger vers des commerces reconnus et fiables au Canada pour que votre achat
                  se fasse en toute confiance.
                </p>
              </div>
            </div>

            <div className="card flex gap-5 items-start" style={{ padding: '1.5rem 2rem' }}>
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: '#0891b2', fontSize: '1rem' }}>3</div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: '#0f172a', fontSize: '1.0625rem' }}>Simplifier</h3>
                <p style={{ color: '#475569', fontSize: '0.9375rem' }}>
                  Vous aider à trouver le compagnon numérique parfait pour vos besoins réels —
                  pas pour ceux du vendeur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Citation finale */}
      <section className="section" style={{ background: '#1e3a8a' }}>
        <div className="container max-w-2xl mx-auto text-center">
          <p className="text-2xl leading-relaxed text-white/90 mb-6" style={{ fontStyle: 'italic' }}>
            &laquo;&nbsp;L&apos;informatique ne devrait pas être une langue étrangère.
            Pour tout le monde, elle devrait être une question de bon sens.&nbsp;&raquo;
          </p>
          <p className="font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Le fondateur de Shop Compy
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#0f172a' }}>
            Prêt à commencer ?
          </h2>
          <p className="mb-6" style={{ color: '#475569' }}>
            Laisse-nous t&apos;aider à faire le bon choix — simplement, honnêtement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/comparateur" className="btn-primary">M&apos;aider à choisir →</Link>
            <Link href="/guide" className="btn-outline">Lire le guide</Link>
          </div>
        </div>
      </section>
    </>
  )
}
