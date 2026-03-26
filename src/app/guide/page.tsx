'use client'
import Link from 'next/link'
import { useAnalogy, type AnalogyMode } from '@/contexts/AnalogyContext'
import AnalogyToggle from '@/components/AnalogyToggle'

/* ── Section data with dual analogies ─────────────────────────── */

type ContentBlock = {
  subtitle: string
  text: string
}
type DualContent = {
  subtitle: string
  body: string
  car: string
}

type Section = {
  id: string
  component?: string  // maps to analogy key (cpu, ram, ssd, etc.)
  title: Record<AnalogyMode, string>
  content: (ContentBlock | DualContent)[]
  tip: Record<AnalogyMode, string>
}

function isDual(c: ContentBlock | DualContent): c is DualContent {
  return 'body' in c && 'car' in c
}

const sections: Section[] = [
  {
    id: 'portable-vs-bureau',
    title: {
      body: 'Portable ou ordinateur de bureau ?',
      car: 'Portable ou ordinateur de bureau ?',
    },
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
    tip: {
      body: 'Si tu hésites encore : la majorité des gens choisissent le portable. La flexibilité vaut souvent la légère différence de performance.',
      car: 'C\'est comme choisir entre une berline (bureau) et un SUV compact (portable). La berline roule mieux, le SUV va partout. La plupart des gens préfèrent le SUV.',
    },
  },
  {
    id: 'processeur',
    component: 'cpu',
    title: {
      body: 'Le processeur (CPU) — le cerveau de l\'ordi',
      car: 'Le processeur (CPU) — le moteur de l\'ordi',
    },
    content: [
      {
        subtitle: 'C\'est quoi ?',
        body: 'Le processeur, c\'est le cerveau de ton ordinateur. C\'est lui qui réfléchit, qui prend les décisions, qui exécute chaque instruction. Comme un cerveau humain : plus il est vif, plus tout va vite.',
        car: 'Le processeur, c\'est le moteur de ton ordinateur. C\'est lui qui fait avancer la machine, qui exécute toutes les instructions. Comme un moteur de voiture : plus il a de cylindrée, plus il a de puissance pour tout faire tourner.',
      },
      {
        subtitle: 'Ce qu\'il faut savoir',
        text: 'Pour un usage courant (internet, courriels, bureautique), n\'importe quel processeur récent suffit. Les deux grandes marques sont Intel (Core i3/i5/i7/i9) et AMD (Ryzen 3/5/7/9). Apple fabrique aussi ses propres puces (M1, M2, M3, M4) réputées très efficaces. Pour la plupart des gens, un Core i5 ou Ryzen 5 est plus que suffisant.',
      },
    ],
    tip: {
      body: 'Ne te laisse pas impressionner par les chiffres. Un cerveau plus récent (i5 d\'aujourd\'hui) est souvent plus rapide qu\'un cerveau plus « gros » mais vieux (i7 d\'il y a 5 ans).',
      car: 'Ne te laisse pas impressionner par les chiffres. Un moteur plus récent (i5 d\'aujourd\'hui) est souvent plus efficace qu\'un moteur avec plus de cylindrée mais vieux (i7 d\'il y a 5 ans).',
    },
  },
  {
    id: 'ram',
    component: 'ram',
    title: {
      body: 'La mémoire vive (RAM) — les poumons de l\'ordi',
      car: 'La mémoire vive (RAM) — la transmission de l\'ordi',
    },
    content: [
      {
        subtitle: 'L\'analogie',
        body: 'Imagine tes poumons. La RAM, c\'est ta capacité respiratoire : le débit d\'air disponible pour travailler. Plus tes poumons sont grands, plus tu peux soutenir d\'efforts en même temps sans t\'essouffler. Un ordinateur avec peu de RAM, c\'est comme courir avec un petit souffle — dès que tu ouvres trop de programmes, ça ralentit.',
        car: 'Imagine la transmission de ta voiture. La RAM, c\'est la boîte de vitesses : elle gère le flux entre le moteur (processeur) et les roues (tes programmes). Plus elle est fluide et performante, plus ta machine passe d\'une tâche à l\'autre sans à-coup. Peu de RAM, c\'est comme rouler en première sur l\'autoroute — le moteur tourne mais rien n\'avance.',
      },
      {
        subtitle: 'Combien en faut-il ?',
        text: '8 Go : suffisant pour un usage de base (navigation, courriels, films). 16 Go : confortable pour tout le monde, recommandé en 2024. 32 Go et plus : uniquement si tu fais de la vidéo, du jeu exigeant ou du travail technique.',
      },
    ],
    tip: {
      body: '16 Go de capacité pulmonaire numérique, c\'est le nouveau standard. Évite les ordinateurs neufs avec seulement 4 Go — tu vas t\'essouffler très vite.',
      car: '16 Go, c\'est la transmission automatique 6 vitesses — fluide et confortable. 4 Go, c\'est un vieux 3 vitesses qui accroche à chaque passage. Évite.',
    },
  },
  {
    id: 'stockage',
    component: 'ssd',
    title: {
      body: 'Le stockage — la mémoire long terme',
      car: 'Le stockage — le coffre de l\'ordi',
    },
    content: [
      {
        subtitle: 'SSD vs disque dur classique',
        body: 'L\'ancien disque dur (HDD), c\'est comme une vieille bibliothèque poussiéreuse : il faut chercher longtemps pour retrouver un livre. Le SSD, c\'est une mémoire photographique — tu retrouves tout instantanément. En 2024, tout ordinateur neuf devrait avoir un SSD.',
        car: 'L\'ancien disque dur (HDD), c\'est un coffre de voiture avec une seule ouverture étroite — tout sort lentement. Le SSD, c\'est un coffre à ouverture intégrale avec compartiments organisés — tu trouves tout en un clin d\'œil. En 2024, plus d\'excuse pour rouler avec un HDD.',
      },
      {
        subtitle: 'Quelle capacité ?',
        text: '256 Go : minimum. Attention, ça se remplit vite si tu as beaucoup de photos et vidéos. 512 Go : recommandé pour la plupart des gens. 1 To (1 000 Go) : si tu stockes beaucoup de médias. Le stockage en nuage (OneDrive, iCloud, Google Drive) peut compléter si nécessaire.',
      },
    ],
    tip: {
      body: 'Un SSD de 512 Go vaut mieux qu\'un disque dur de 1 To. C\'est comme avoir une mémoire vive et nette plutôt qu\'un grenier immense mais bordélique.',
      car: 'Un SSD de 512 Go vaut mieux qu\'un HDD de 1 To. C\'est comme avoir un coffre de 400 L bien organisé plutôt qu\'une remorque de 800 L où tu ne trouves jamais rien.',
    },
  },
  {
    id: 'ecran',
    component: 'screen',
    title: {
      body: 'L\'écran — tes yeux sur le monde numérique',
      car: 'L\'écran — le pare-brise de l\'ordi',
    },
    content: [
      {
        subtitle: 'La taille',
        body: 'Tes yeux passent des heures devant l\'écran — c\'est ton interface avec tout le contenu. Pour un portable : 13-14 pouces pour la mobilité, 15-16 pouces pour le confort. Pour un usage fixe, un écran externe de 24-27 pouces est idéal — c\'est comme avoir une vision grand angle.',
        car: 'Le pare-brise de ta voiture, c\'est ce qui te montre la route. Plus il est large et net, mieux tu conduis. Pour un portable : 13-14 pouces pour la compacte, 15-16 pouces pour le confort. Pour un usage fixe, un écran externe de 24-27 pouces — c\'est le panoramique intégral.',
      },
      {
        subtitle: 'La résolution',
        text: 'Full HD (1920×1080) : standard, suffisant pour la majorité. 2K / 4K : image plus nette, utile pour les grandes tailles d\'écran ou si tu travailles sur des photos/vidéos. Pour un écran de 24 pouces ou moins, le Full HD est tout à fait bien.',
      },
    ],
    tip: {
      body: 'Si tu travailles longtemps devant l\'écran, investis dans un bon écran externe — c\'est ce qui fait la plus grande différence pour le confort de tes yeux.',
      car: 'Si tu passes des heures à conduire, investis dans un bon pare-brise. Un écran externe de qualité, c\'est l\'équivalent d\'un affichage tête haute — tout change.',
    },
  },
  {
    id: 'budget',
    title: {
      body: 'Le budget — combien prévoir ?',
      car: 'Le budget — combien prévoir ?',
    },
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
    tip: {
      body: 'Mieux vaut acheter un peu plus cher et garder l\'ordinateur 5-7 ans que de racheter un bas de gamme tous les 2-3 ans. C\'est comme investir dans sa santé à long terme.',
      car: 'Mieux vaut acheter un peu plus cher et garder l\'ordinateur 5-7 ans que de racheter un bas de gamme tous les 2-3 ans. C\'est comme acheter une voiture fiable qu\'on garde 10 ans plutôt qu\'un citron qu\'on change tous les 2 ans.',
    },
  },
]

/* ── Icons per section ─────────────────────────────────────────── */
function sectionIcon(s: Section, mode: AnalogyMode): string {
  if (!s.component) {
    if (s.id === 'portable-vs-bureau') return '💼'
    if (s.id === 'budget') return '💰'
    return '📌'
  }
  const { ANALOGIES } = require('@/contexts/AnalogyContext')
  return ANALOGIES[s.component]?.[mode]?.icon ?? '📌'
}

/* ── Component ─────────────────────────────────────────────────── */
export default function GuidePage() {
  const { mode, a, modeLabel, modeIcon } = useAnalogy()

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
          <p className="text-lg leading-relaxed mb-6" style={{ color: '#475569' }}>
            Pas de jargon inutile. On t&apos;explique chaque composante en langage simple,
            avec des exemples concrets pour que tu saches exactement quoi regarder.
          </p>

          {/* Mode indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
            style={{ background: '#f1f5f9', color: '#475569' }}>
            <span>{modeIcon}</span>
            <span>Mode <strong>{modeLabel}</strong> activé</span>
            <span className="text-[--text-muted]">·</span>
            <AnalogyToggle variant="pill" />
          </div>
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
                    {i + 1}. {sectionIcon(s, mode)} {s.title[mode]}
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
              <span className="text-3xl">{sectionIcon(s, mode)}</span>
              <h2 className="text-2xl font-bold" style={{ color: '#0f172a' }}>
                {i + 1}. {s.title[mode]}
              </h2>
            </div>
            <div className="space-y-4">
              {s.content.map(c => (
                <div key={c.subtitle} className="card">
                  <h3 className="font-semibold mb-2" style={{ color: '#0f172a' }}>{c.subtitle}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                    {isDual(c) ? c[mode] : c.text}
                  </p>
                </div>
              ))}
              <div className="flex gap-3 p-4 rounded-xl" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                <span className="text-xl shrink-0">💡</span>
                <p className="text-sm leading-relaxed" style={{ color: '#1d4ed8' }}>{s.tip[mode]}</p>
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
