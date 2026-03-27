import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos — Shop Compy',
  description: 'Shop Compy est un guide indépendant et sans publicité pour t\'aider à choisir ton ordinateur. Découvre notre mission et nos valeurs.',
}

const valeurs = [
  {
    titre: 'Indépendant',
    texte: 'Aucun partenariat avec les fabricants ou les détaillants. Nos recommandations sont basées uniquement sur ce qui est bon pour toi, pas sur ce qui nous rapporte de l\'argent.',
  },
  {
    titre: 'Sans publicité',
    texte: 'Pas de bannières, pas de liens affiliés, pas de contenu sponsorisé. Ce que tu lis ici n\'est influencé par personne d\'autre que toi.',
  },
  {
    titre: 'Accessible à tous',
    texte: 'On écrit pour tout le monde : les débutants complets, les parents qui achètent pour leurs enfants, les aînés qui veulent comprendre avant d\'acheter. Pas de jargon, pas de condescendance.',
  },
  {
    titre: 'Honnête sur nos limites',
    texte: 'On ne prétend pas tout savoir. Les prix changent, les modèles évoluent. On te donne les bases pour que tu puisses juger par toi-même.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#0f172a' }}>
            À propos de Shop Compy
          </h1>
          <p className="text-xl leading-relaxed" style={{ color: '#475569' }}>
            Un guide créé pour les gens ordinaires qui veulent faire un achat éclairé,
            sans avoir besoin d&apos;un diplôme en informatique.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <div className="card" style={{ padding: '2.5rem' }}>
            <h2 className="text-2xl font-bold mb-5" style={{ color: '#0f172a' }}>Notre mission</h2>
            <p className="leading-relaxed mb-5" style={{ color: '#475569' }}>
              Chaque année, des milliers de personnes achètent un ordinateur qui ne leur convient pas.
              Soit parce qu&apos;elles ont payé trop cher pour des fonctions dont elles n&apos;avaient pas besoin,
              soit parce qu&apos;elles ont économisé au mauvais endroit et se retrouvent avec une machine
              qui ralentit au bout de deux ans.
            </p>
            <p className="leading-relaxed mb-5" style={{ color: '#475569' }}>
              Shop Compy existe pour changer ça. On croit qu&apos;avec les bonnes explications,
              n&apos;importe qui peut comprendre ce qu&apos;il achète et faire le bon choix pour son budget
              et ses besoins réels.
            </p>
            <p className="leading-relaxed" style={{ color: '#475569' }}>
              On ne vend rien. On n&apos;a pas d&apos;intérêt à te pousser vers un produit plutôt qu&apos;un autre.
              Notre seul objectif, c&apos;est que tu ressortes d&apos;ici avec les connaissances pour magasiner en confiance.
            </p>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#0f172a' }}>Nos valeurs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {valeurs.map(v => (
              <div key={v.titre} className="card">
                <h3 className="font-bold mb-2" style={{ color: '#2563eb', fontSize: '1.0625rem' }}>{v.titre}</h3>
                <p className="leading-relaxed" style={{ color: '#475569', fontSize: '0.9375rem' }}>{v.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approche */}
      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-5" style={{ color: '#0f172a' }}>Comment on travaille</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
                style={{ background: '#2563eb', marginTop: '2px' }}>1</div>
              <div>
                <p className="font-semibold mb-1" style={{ color: '#0f172a' }}>On part du besoin, pas de la technologie</p>
                <p style={{ color: '#475569', fontSize: '0.9375rem' }}>
                  Avant de parler de processeurs ou de RAM, on te demande ce que tu veux faire avec ton ordinateur.
                  C&apos;est ça qui devrait guider ton achat.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
                style={{ background: '#2563eb', marginTop: '2px' }}>2</div>
              <div>
                <p className="font-semibold mb-1" style={{ color: '#0f172a' }}>On explique avec des analogies</p>
                <p style={{ color: '#475569', fontSize: '0.9375rem' }}>
                  Comprendre la RAM devient facile quand on la compare aux poumons ou à la boîte de vitesses d&apos;une voiture.
                  On a développé deux univers d&apos;analogies que tu peux choisir selon ce qui te parle le mieux.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
                style={{ background: '#2563eb', marginTop: '2px' }}>3</div>
              <div>
                <p className="font-semibold mb-1" style={{ color: '#0f172a' }}>On te donne une recommandation personnalisée</p>
                <p style={{ color: '#475569', fontSize: '0.9375rem' }}>
                  Notre outil comparateur pose 5 questions simples et te propose une recommandation concrète,
                  adaptée à ton usage et à ton budget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#0f172a' }}>
            Prêt à trouver ton ordinateur ?
          </h2>
          <p className="mb-6" style={{ color: '#475569' }}>
            Commence par le guide ou réponds à nos 5 questions pour une recommandation personnalisée.
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
