import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Catalogue — Shop Compy',
  description: 'Notre catalogue de recommandations d\'ordinateurs par profil et budget. Bientôt disponible.',
}

const profils = [
  {
    titre: 'Pour débuter',
    desc: 'Navigation, courriels, photos et vidéos. Ce qu\'il faut pour les usages du quotidien sans dépenser trop.',
    budget: 'Moins de 600 $',
  },
  {
    titre: 'Pour travailler',
    desc: 'Word, Excel, Zoom, courriel. Fiable, rapide et confortable pour une journée complète de travail.',
    budget: '600 $ à 1 000 $',
  },
  {
    titre: 'Pour les études',
    desc: 'Léger, portable, autonomie longue. L\'essentiel pour suivre les cours et faire ses travaux.',
    budget: '500 $ à 900 $',
  },
  {
    titre: 'Pour créer',
    desc: 'Montage photo et vidéo, design graphique. La puissance nécessaire sans surpayer.',
    budget: '1 200 $ et plus',
  },
]

export default function CataloguePage() {
  return (
    <>
      {/* Hero */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #ecfeff 0%, #f8fafc 100%)' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            style={{ background: '#ecfeff', color: '#0891b2', border: '1px solid #a5f3fc' }}>
            Bientôt disponible
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#0f172a' }}>
            Catalogue de recommandations
          </h1>
          <p className="text-xl leading-relaxed" style={{ color: '#475569' }}>
            Des sélections d&apos;ordinateurs triées sur le volet, organisées par profil et budget.
            On travaille à le préparer pour toi.
          </p>
        </div>
      </section>

      {/* Aperçu des profils */}
      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#0f172a' }}>Ce qui arrive bientôt</h2>
          <p className="mb-8" style={{ color: '#475569' }}>
            Le catalogue sera organisé par profil d&apos;utilisateur. Pour chaque profil,
            on proposera une sélection de modèles vérifiés avec une explication claire
            de pourquoi ils ont été retenus.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {profils.map(p => (
              <div key={p.titre} className="card" style={{ opacity: 0.7 }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-bold" style={{ color: '#0f172a', fontSize: '1.0625rem' }}>{p.titre}</h3>
                  <span className="text-sm shrink-0 px-2 py-0.5 rounded-full"
                    style={{ background: '#f1f5f9', color: '#64748b', whiteSpace: 'nowrap' }}>
                    {p.budget}
                  </span>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>{p.desc}</p>
                <p className="text-sm mt-4 font-medium" style={{ color: '#0891b2' }}>En préparation…</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* En attendant */}
      <section className="section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container max-w-3xl mx-auto">
          <div className="card text-center" style={{ padding: '2.5rem', border: '1.5px solid #bfdbfe' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#0f172a' }}>
              En attendant le catalogue
            </h2>
            <p className="mb-6" style={{ color: '#475569' }}>
              Notre outil comparateur peut déjà te donner une recommandation personnalisée
              en moins de deux minutes. Réponds à 5 questions simples et reçois un profil
              adapté à ton budget et tes besoins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/comparateur" className="btn-primary">M&apos;aider à choisir →</Link>
              <Link href="/guide" className="btn-outline">Lire le guide</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
