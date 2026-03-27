'use client'
import { useState } from 'react'
import Link from 'next/link'

type Step = {
  id: string
  question: string
  hint?: string
  options: { value: string; label: string }[]
}

const steps: Step[] = [
  {
    id: 'usage',
    question: 'Comment vas-tu utiliser ton ordinateur ?',
    hint: 'Choisis l\'usage principal',
    options: [
      { value: 'basic',   label: 'Navigation, courriels, réseaux sociaux' },
      { value: 'work',    label: 'Travail de bureau (Word, Excel, Zoom)' },
      { value: 'creative',label: 'Montage photo, vidéo ou graphisme' },
      { value: 'gaming',  label: 'Jeux vidéo' },
      { value: 'student', label: 'Études (cours, recherche, présentations)' },
    ],
  },
  {
    id: 'budget',
    question: 'Quel est ton budget ?',
    hint: 'Sois honnête : ça nous aide à te faire la meilleure recommandation',
    options: [
      { value: 'low',     label: 'Moins de 500 $' },
      { value: 'mid',     label: '500 $ à 900 $' },
      { value: 'high',    label: '900 $ à 1 500 $' },
      { value: 'premium', label: 'Plus de 1 500 $' },
    ],
  },
  {
    id: 'mobility',
    question: 'Vas-tu te déplacer avec ton ordinateur ?',
    options: [
      { value: 'yes',       label: 'Oui, souvent — je me déplace ou je travaille de plusieurs endroits' },
      { value: 'sometimes', label: 'Parfois — surtout à la maison, mais il m\'arrive de sortir' },
      { value: 'no',        label: 'Non — il restera toujours au même endroit' },
    ],
  },
  {
    id: 'brand',
    question: 'As-tu une préférence de marque ou de système ?',
    options: [
      { value: 'mac',          label: 'Mac (Apple) — j\'ai un iPhone ou un iPad, ou j\'aime l\'écosystème Apple' },
      { value: 'windows',      label: 'Windows — je connais Windows et j\'y tiens' },
      { value: 'nopreference', label: 'Aucune préférence — je veux ce qui est le mieux pour moi' },
    ],
  },
  {
    id: 'level',
    question: 'Comment te décrirais-tu avec la technologie ?',
    options: [
      { value: 'beginner',     label: 'Débutant — j\'ai besoin que ça soit simple et intuitif' },
      { value: 'intermediate', label: 'Intermédiaire — je me débrouille bien' },
      { value: 'advanced',     label: 'Avancé — je suis à l\'aise et j\'aime personnaliser' },
    ],
  },
]

type Answers = Record<string, string>

function getRecommendation(answers: Answers) {
  const { usage, budget, mobility, brand } = answers
  const isPortable = mobility === 'yes' || mobility === 'sometimes'
  const isMac = brand === 'mac'
  const isWindows = brand === 'windows'

  if (usage === 'gaming') {
    if (budget === 'low') return {
      title: 'PC de bureau gaming entrée de gamme',
      summary: 'Pour jouer à petit budget, un PC de bureau Windows est la meilleure option.',
      specs: ['Processeur : AMD Ryzen 5 ou Intel Core i5', 'RAM : 16 Go', 'Stockage : SSD 512 Go', 'Carte graphique : NVIDIA RTX 3060 ou AMD RX 6600'],
      note: 'Avec moins de 500 $, les options de jeu sont limitées. Considère d\'attendre quelques mois pour économiser un peu plus.',
      link: '/guide#budget',
    }
    return {
      title: 'PC de bureau gaming',
      summary: 'Pour le jeu vidéo, un PC de bureau Windows offre le meilleur rapport performance/prix.',
      specs: ['Processeur : Intel Core i5/i7 ou AMD Ryzen 5/7', 'RAM : 16 à 32 Go', 'Stockage : SSD NVMe 1 To', 'Carte graphique : NVIDIA RTX 4070 ou supérieur'],
      note: 'Les PC portables gaming existent mais coûtent plus cher et chauffent davantage. Un bureau reste préférable.',
      link: '/guide#budget',
    }
  }

  if (usage === 'creative') {
    if (isMac || !isWindows) return {
      title: 'MacBook Pro ou Mac Studio',
      summary: 'Pour la création professionnelle, les Mac avec puce M sont exceptionnels.',
      specs: ['Puce Apple M3 Pro ou M4 Pro', 'RAM : 18 à 36 Go', 'Stockage : SSD 512 Go à 1 To', 'Écran Retina haute résolution'],
      note: 'Les puces Apple M surpassent souvent la concurrence pour le montage vidéo et la photo, tout en restant silencieuses.',
      link: '/guide#processeur',
    }
    return {
      title: 'PC haute performance pour la création',
      summary: 'Pour le montage et le graphisme, il te faut un PC bien équipé.',
      specs: ['Processeur : Intel Core i7 ou AMD Ryzen 7', 'RAM : 32 Go', 'Stockage : SSD NVMe 1 To', 'Carte graphique dédiée recommandée'],
      note: 'Pour le montage vidéo 4K, assure-toi d\'avoir une carte graphique dédiée (NVIDIA ou AMD).',
      link: '/guide#processeur',
    }
  }

  if (usage === 'basic' && budget === 'low') {
    if (isMac) return {
      title: 'MacBook Air M1 reconditionné',
      summary: 'Un MacBook Air M1 d\'occasion reste une excellente option pour un usage basique.',
      specs: ['Puce Apple M1', 'RAM : 8 Go', 'Stockage : SSD 256 Go', 'Autonomie exceptionnelle (15 à 18 h)'],
      note: 'Un modèle reconditionné certifié d\'Apple ou d\'un revendeur reconnu peut entrer dans ton budget.',
      link: '/guide#portable-vs-bureau',
    }
    return {
      title: 'PC portable entrée de gamme Windows',
      summary: 'Pour la navigation et les courriels, un PC simple fera très bien le travail.',
      specs: ['Processeur : Intel Core i3 ou AMD Ryzen 3', 'RAM : 8 Go minimum', 'Stockage : SSD 256 Go', 'Écran : 15 pouces Full HD'],
      note: 'Évite les modèles avec seulement 4 Go de RAM, c\'est trop peu en 2024.',
      link: '/guide#ram',
    }
  }

  if ((isMac || !isWindows) && isPortable && (budget === 'mid' || budget === 'high')) return {
    title: 'MacBook Air M3',
    summary: 'Le MacBook Air M3 est la référence pour la mobilité et la polyvalence.',
    specs: ['Puce Apple M3', 'RAM : 8 à 16 Go', 'Stockage : SSD 256 à 512 Go', 'Écran Liquid Retina 13" ou 15"', 'Autonomie : 15 à 18 heures'],
    note: 'Idéal pour les étudiants, les professionnels nomades et ceux qui cherchent simplicité et durabilité.',
    link: '/guide#ecran',
  }

  if (isPortable && !isMac) return {
    title: 'PC portable Windows polyvalent',
    summary: 'Un bon portable Windows milieu de gamme couvre parfaitement le travail et les études.',
    specs: ['Processeur : Intel Core i5 ou AMD Ryzen 5', 'RAM : 16 Go', 'Stockage : SSD 512 Go', 'Écran : 14 à 15 pouces Full HD', 'Marques recommandées : Dell, Lenovo, HP, ASUS'],
    note: 'Cherche des modèles avec au moins 16 Go de RAM et un SSD. Évite les disques durs classiques.',
    link: '/guide#stockage',
  }

  return {
    title: 'Ordinateur de bureau Windows',
    summary: 'Tu n\'as pas besoin de mobilité ? Un bureau te donnera plus de puissance pour le même prix.',
    specs: ['Processeur : Intel Core i5 ou AMD Ryzen 5', 'RAM : 16 Go', 'Stockage : SSD 512 Go + HDD optionnel', 'Écran externe : 24 à 27 pouces Full HD recommandé'],
    note: 'N\'oublie pas de budgéter l\'écran, le clavier et la souris si tu n\'en as pas encore.',
    link: '/guide#portable-vs-bureau',
  }
}

export default function ComparateurPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [done, setDone] = useState(false)

  const currentStep = steps[step]
  const progress = (step / steps.length) * 100

  function choose(value: string) {
    const newAnswers = { ...answers, [currentStep.id]: value }
    setAnswers(newAnswers)
    if (step < steps.length - 1) {
      setStep(s => s + 1)
    } else {
      setDone(true)
    }
  }

  function reset() {
    setStep(0)
    setAnswers({})
    setDone(false)
  }

  if (done) {
    const rec = getRecommendation(answers)
    return (
      <div className="section">
        <div className="container max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#0f172a' }}>Ta recommandation</h1>
            <p style={{ color: '#475569' }}>Basée sur tes réponses, voici ce qui te correspond le mieux.</p>
          </div>

          <div className="card mb-6" style={{ border: '2px solid #2563eb' }}>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#0f172a' }}>{rec.title}</h2>
            <p className="mb-4" style={{ color: '#475569' }}>{rec.summary}</p>
            <ul className="space-y-2 mb-4">
              {rec.specs.map(s => (
                <li key={s} className="flex items-start gap-2">
                  <span style={{ color: '#0891b2', fontWeight: 700, flexShrink: 0 }}>·</span>
                  <span style={{ color: '#0f172a', fontSize: '1rem' }}>{s}</span>
                </li>
              ))}
            </ul>
            {rec.note && (
              <div className="p-4 rounded-lg" style={{ background: '#eff6ff', borderLeft: '4px solid #2563eb' }}>
                <p className="font-semibold text-xs uppercase tracking-wide mb-1" style={{ color: '#2563eb' }}>À savoir</p>
                <p style={{ color: '#1d4ed8', fontSize: '0.9375rem' }}>{rec.note}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={rec.link} className="btn-primary flex-1 justify-center">
              En savoir plus dans le guide
            </Link>
            <button onClick={reset} className="btn-outline flex-1 justify-center">
              Recommencer
            </button>
          </div>

          <p className="text-center text-sm mt-6" style={{ color: '#94a3b8' }}>
            Ce guide est indépendant et sans commission. Les recommandations sont basées uniquement sur tes besoins.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="container max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#0f172a' }}>M&apos;aider à choisir</h1>
          <p style={{ color: '#475569' }}>Réponds à {steps.length} questions pour recevoir ta recommandation personnalisée</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2" style={{ color: '#94a3b8' }}>
            <span>Question {step + 1} sur {steps.length}</span>
            <span>{Math.round(progress)} %</span>
          </div>
          <div className="h-2 rounded-full" style={{ background: '#e2e8f0' }}>
            <div className="h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: '#2563eb' }} />
          </div>
        </div>

        {/* Question */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-1" style={{ color: '#0f172a' }}>{currentStep.question}</h2>
          {currentStep.hint && (
            <p className="text-sm mb-4" style={{ color: '#94a3b8' }}>{currentStep.hint}</p>
          )}
          <div className="space-y-3 mt-4">
            {currentStep.options.map(opt => (
              <button key={opt.value} onClick={() => choose(opt.value)}
                className="w-full text-left flex items-center gap-3 p-4 rounded-xl border-2 transition-all hover:border-[#2563eb] hover:bg-[#eff6ff]"
                style={{ border: '2px solid #e2e8f0', background: 'white' }}>
                <span style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 500 }}>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Back */}
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)}
            className="text-sm" style={{ color: '#94a3b8' }}>
            ← Revenir à la question précédente
          </button>
        )}
      </div>
    </div>
  )
}
