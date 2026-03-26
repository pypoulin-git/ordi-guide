import Link from 'next/link'

const sections = [
  {
    id: 'portable-vs-bureau',
    icon: '💼',
    title: 'Portable ou ordinateur de bureau ?',
    content: [
      {
        subtitle: 'Le portable',
        text: 'Il se transporte partout, fonctionne sur batterie et prend peu de place. Idéal si tu travailles dans plusieurs pièces, si tu voyages souvent, ou si ton espace est limité. Inconvénient : pour le même budget, il est un peu moins puissant qu\'un bureau, et la batterie finit par s\'user avec les années.',
      },
      {
        subtitle: 'L\'ordinateur de bureau',
        text: 'Plus puissant pour le même prix, plus facile à réparer et à faire évoluer. Reste à la maison, branché sur secteur. Idéal si tu as un espace dédié et que tu n\'as pas besoin de te déplacer. Pour la même somme, un bureau aura généralement plus de puissance et durera plus longtemps.',
      },
    ],
    tip: 'Si tu hésites encore : la majorité des gens choisissent le portable. La flexibilité vaut souvent la légère différence de performance.',
  },
  {
    id: 'processeur',
    icon: '🧠',
    title: 'Le processeur (CPU) — le cerveau de l\'ordi',
    content: [
      {
        subtitle: 'C\'est quoi ?',
        text: 'Le processeur exécute toutes les instructions. C\'est lui qui calcule, qui gère les programmes, qui fait "tourner" l\'ordinateur. Plus il est rapide, plus tout va vite.',
      },
      {
        subtitle: 'Ce qu\'il faut savoir',
        text: 'Pour un usage courant (internet, courriels, bureautique), n\'importe quel processeur récent suffit. Les deux grandes marques sont Intel (Core i3/i5/i7/i9) et AMD (Ryzen 3/5/7/9). Apple fabrique aussi ses propres puces (M1, M2, M3, M4) réputées très efficaces. Pour la plupart des gens, un Core i5 ou Ryzen 5 est plus que suffisant.',
      },
    ],
    tip: 'Ne te laisse pas impressionner par les chiffres. Un i5 récent est souvent plus rapide qu\'un i7 d\'il y a 5 ans.',
  },
  {
    id: 'ram',
    icon: '📋',
    title: 'La mémoire vive (RAM) — le bureau de travail',
    content: [
      {
        subtitle: 'L\'analogie parfaite',
        text: 'Imagine ton bureau de travail. La RAM, c\'est la surface disponible pour poser tes dossiers en cours. Plus ta surface est grande, plus tu peux avoir de choses ouvertes en même temps sans que ça ralentisse.',
      },
      {
        subtitle: 'Combien en faut-il ?',
        text: '8 Go : suffisant pour un usage de base (navigation, courriels, films). 16 Go : confortable pour tout le monde, recommandé en 2024. 32 Go et plus : uniquement si tu fais de la vidéo, du jeu exigeant ou du travail technique.',
      },
    ],
    tip: '16 Go est devenu le nouveau standard. Évite les ordinateurs neufs vendus avec seulement 4 Go — c\'est trop peu.',
  },
  {
    id: 'stockage',
    icon: '🗄️',
    title: 'Le stockage — l\'armoire à fichiers',
    content: [
      {
        subtitle: 'SSD vs disque dur classique',
        text: 'L\'ancien disque dur (HDD) est lent mais peu coûteux. Le SSD (disque à état solide) est beaucoup plus rapide — l\'ordinateur démarre en quelques secondes, les programmes s\'ouvrent presque instantanément. En 2024, tout ordinateur neuf devrait avoir un SSD.',
      },
      {
        subtitle: 'Quelle capacité ?',
        text: '256 Go : minimum. Attention, ça se remplit vite si tu as beaucoup de photos et vidéos. 512 Go : recommandé pour la plupart des gens. 1 To (1 000 Go) : si tu stockes beaucoup de médias. Le stockage en nuage (OneDrive, iCloud, Google Drive) peut compléter si nécessaire.',
      },
    ],
    tip: 'Un SSD de 512 Go vaut mieux qu\'un disque dur de 1 To. La vitesse change tout au quotidien.',
  },
  {
    id: 'ecran',
    icon: '🖥️',
    title: 'L\'écran — ce que tu vois toute la journée',
    content: [
      {
        subtitle: 'La taille',
        text: 'Pour un portable : 13-14 pouces pour la mobilité, 15-16 pouces pour le confort. Pour un usage fixe à la maison, un écran externe de 24-27 pouces est idéal. La taille se mesure en diagonale.',
      },
      {
        subtitle: 'La résolution',
        text: 'Full HD (1920×1080) : standard, suffisant pour la majorité. 2K / 4K : image plus nette, utile pour les grandes tailles d\'écran ou si tu travailles sur des photos/vidéos. Pour un écran de 24 pouces ou moins, le Full HD est tout à fait bien.',
      },
    ],
    tip: 'Si tu travailles longtemps devant l\'écran, investis dans un bon écran externe — c\'est ce qui fait la plus grande différence pour ton confort.',
  },
  {
    id: 'budget',
    icon: '💰',
    title: 'Le budget — combien prévoir ?',
    content: [
      {
        subtitle: 'Les grandes catégories',
        text: '300–500 $ : entrée de gamme. Convient pour une utilisation très légère (navigation, courriels, visionnage). Attention aux modèles trop limités. 500–900 $ : milieu de gamme. La zone idéale pour la plupart des gens. Bonne performance, bon confort, bonne durabilité. 900–1 500 $ : haut de gamme. Pour les professionnels, les créatifs ou ceux qui veulent le meilleur confort. 1 500 $ et plus : spécialisé (jeu intensif, montage vidéo professionnel, design 3D).',
      },
      {
        subtitle: 'Les pièges à éviter',
        text: 'Évite les soldes de fin de série avec de très vieilles composantes. Méfie-toi des offres trop belles pour être vraies. Un bon vendeur t\'expliquera les specs — s\'il ne peut pas, cherche ailleurs.',
      },
    ],
    tip: 'Mieux vaut acheter un peu plus cher et garder l\'ordinateur 5-7 ans que de racheter un bas de gamme tous les 2-3 ans.',
  },
]

export const metadata = {
  title: 'Guide d\'achat ordinateur — Les bases expliquées simplement',
  description: 'Comprends le processeur, la RAM, le stockage et l\'écran en 10 minutes. Un guide honnête pour choisir ton ordinateur sans te faire avoir.',
}

export default function GuidePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}>
            📖 Guide complet · Lecture ~10 min
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#0f172a' }}>
            Les bases pour bien choisir ton ordinateur
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
            Pas de jargon inutile. On t&apos;explique chaque composante en langage simple,
            avec des exemples concrets pour que tu saches exactement quoi regarder.
          </p>
        </div>
      </section>

      {/* ── Table of contents ────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container max-w-3xl mx-auto">
          <div className="card">
            <h2 className="font-semibold mb-3" style={{ color: '#0f172a' }}>Dans ce guide :</h2>
            <ol className="space-y-1">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-sm hover:underline"
                    style={{ color: '#2563eb' }}>
                    {i + 1}. {s.icon} {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Sections ─────────────────────────────────────────────── */}
      <div className="container max-w-3xl mx-auto pb-16 space-y-12">
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">{s.icon}</span>
              <h2 className="text-2xl font-bold" style={{ color: '#0f172a' }}>
                {i + 1}. {s.title}
              </h2>
            </div>
            <div className="space-y-4">
              {s.content.map(c => (
                <div key={c.subtitle} className="card">
                  <h3 className="font-semibold mb-2" style={{ color: '#0f172a' }}>{c.subtitle}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{c.text}</p>
                </div>
              ))}
              <div className="flex gap-3 p-4 rounded-xl" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                <span className="text-xl shrink-0">💡</span>
                <p className="text-sm leading-relaxed" style={{ color: '#1d4ed8' }}>{s.tip}</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#0f172a' }}>
            Maintenant, trouvons ton ordi idéal
          </h2>
          <p className="mb-6" style={{ color: '#475569' }}>
            Réponds à 5 questions et reçois une recommandation personnalisée.
          </p>
          <Link href="/comparateur" className="btn-primary">
            🎯 M&apos;aider à choisir →
          </Link>
        </div>
      </section>
    </>
  )
}
