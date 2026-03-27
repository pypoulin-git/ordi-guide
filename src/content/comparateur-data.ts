// ---------------------------------------------------------------------------
// Comparateur quiz data — locale-aware (fr / en)
// ---------------------------------------------------------------------------

export type Step = {
  id: string
  question: string
  hint?: string
  options: { value: string; label: string }[]
}

export type Archetype = 'minimalist' | 'athlete' | 'geek' | 'douchebag'

export type ArchetypeInfo = {
  label: string
  desc: string
  color: string
}

export type Recommendation = {
  archetype: Archetype
  title: string
  summary: string
  specs: string[]
  note: string
  link: string
}

// ---------------------------------------------------------------------------
// Steps
// ---------------------------------------------------------------------------

const stepsFr: Step[] = [
  {
    id: 'usage',
    question: 'Comment vas-tu utiliser ton ordinateur ?',
    hint: "Choisis l'usage principal",
    options: [
      { value: 'basic', label: 'Navigation, courriels, réseaux sociaux' },
      { value: 'work', label: 'Travail de bureau (Word, Excel, Zoom)' },
      { value: 'creative', label: 'Montage photo, vidéo ou graphisme' },
      { value: 'gaming', label: 'Jeux vidéo' },
      { value: 'student', label: 'Études (cours, recherche, présentations)' },
    ],
  },
  {
    id: 'budget',
    question: 'Quel est ton budget ?',
    hint: 'Sois honnête : ça nous aide à te faire la meilleure recommandation',
    options: [
      { value: 'low', label: 'Moins de 500 $' },
      { value: 'mid', label: '500 $ à 900 $' },
      { value: 'high', label: '900 $ à 1 500 $' },
      { value: 'premium', label: 'Plus de 1 500 $' },
    ],
  },
  {
    id: 'mobility',
    question: 'Vas-tu te déplacer avec ton ordinateur ?',
    options: [
      { value: 'yes', label: 'Oui, souvent — je me déplace ou je travaille de plusieurs endroits' },
      { value: 'sometimes', label: "Parfois — surtout à la maison, mais il m'arrive de sortir" },
      { value: 'no', label: 'Non — il restera toujours au même endroit' },
    ],
  },
  {
    id: 'brand',
    question: 'As-tu une préférence de marque ou de système ?',
    options: [
      { value: 'mac', label: "Mac (Apple) — j'ai un iPhone ou un iPad, ou j'aime l'écosystème Apple" },
      { value: 'windows', label: "Windows — je connais Windows et j'y tiens" },
      { value: 'nopreference', label: 'Aucune préférence — je veux ce qui est le mieux pour moi' },
    ],
  },
  {
    id: 'level',
    question: 'Comment te décrirais-tu avec la technologie ?',
    options: [
      { value: 'beginner', label: "Débutant — j'ai besoin que ça soit simple et intuitif" },
      { value: 'intermediate', label: 'Intermédiaire — je me débrouille bien' },
      { value: 'advanced', label: "Avancé — je suis à l'aise et j'aime personnaliser" },
    ],
  },
]

const stepsEn: Step[] = [
  {
    id: 'usage',
    question: 'How are you going to use your computer?',
    hint: 'Pick your main use case',
    options: [
      { value: 'basic', label: 'Browsing, email, social media' },
      { value: 'work', label: 'Office work (Word, Excel, Zoom)' },
      { value: 'creative', label: 'Photo editing, video or graphic design' },
      { value: 'gaming', label: 'Video games' },
      { value: 'student', label: 'School (classes, research, presentations)' },
    ],
  },
  {
    id: 'budget',
    question: "What's your budget?",
    hint: 'Be honest — it helps us give you the best recommendation',
    options: [
      { value: 'low', label: 'Under $500' },
      { value: 'mid', label: '$500 to $900' },
      { value: 'high', label: '$900 to $1,500' },
      { value: 'premium', label: 'Over $1,500' },
    ],
  },
  {
    id: 'mobility',
    question: 'Are you going to carry your computer around?',
    options: [
      { value: 'yes', label: "Yes, often — I move around or work from different places" },
      { value: 'sometimes', label: "Sometimes — mostly at home, but I take it out once in a while" },
      { value: 'no', label: "No — it'll always stay in the same spot" },
    ],
  },
  {
    id: 'brand',
    question: 'Do you have a brand or system preference?',
    options: [
      { value: 'mac', label: "Mac (Apple) — I have an iPhone or iPad, or I like the Apple ecosystem" },
      { value: 'windows', label: "Windows — I know Windows and I'm sticking with it" },
      { value: 'nopreference', label: "No preference — I just want what's best for me" },
    ],
  },
  {
    id: 'level',
    question: 'How would you describe yourself with technology?',
    options: [
      { value: 'beginner', label: "Beginner — I need things to be simple and intuitive" },
      { value: 'intermediate', label: "Intermediate — I get by pretty well" },
      { value: 'advanced', label: "Advanced — I'm comfortable and I like to customize" },
    ],
  },
]

export function getSteps(locale: string): Step[] {
  return locale === 'en' ? stepsEn : stepsFr
}

// ---------------------------------------------------------------------------
// Archetypes
// ---------------------------------------------------------------------------

const archetypesFr: Record<Archetype, ArchetypeInfo> = {
  minimalist: { label: 'Le Minimaliste', desc: 'Léger et efficace pour les tâches de base', color: '#7c3aed' },
  athlete: { label: 'Le Performant', desc: 'Équilibre parfait entre puissance et polyvalence', color: '#0891b2' },
  geek: { label: 'Le Passionné', desc: 'Puissance de calcul brute pour les pros', color: '#1e40af' },
  douchebag: { label: 'Le Frimeur', desc: 'Specs déséquilibrées — gros GPU mais le reste ne suit pas', color: '#d97706' },
}

const archetypesEn: Record<Archetype, ArchetypeInfo> = {
  minimalist: { label: 'The Minimalist', desc: 'Light and efficient for everyday tasks', color: '#7c3aed' },
  athlete: { label: 'The Performer', desc: 'Perfect balance of power and versatility', color: '#0891b2' },
  geek: { label: 'The Enthusiast', desc: 'Raw computing power for the pros', color: '#1e40af' },
  douchebag: { label: 'The Show-Off', desc: 'Unbalanced specs — big GPU but the rest can\'t keep up', color: '#d97706' },
}

export function getArchetypeInfo(locale: string): Record<Archetype, ArchetypeInfo> {
  return locale === 'en' ? archetypesEn : archetypesFr
}

// ---------------------------------------------------------------------------
// Recommendation engine
// ---------------------------------------------------------------------------

type Answers = Record<string, string>

function buildRecommendation(locale: string, answers: Answers): Recommendation {
  const { usage, budget, mobility, brand } = answers
  const isMac = brand === 'mac'
  const isWindows = brand === 'windows'
  const noPreference = brand === 'nopreference'
  const portable = mobility === 'yes' || mobility === 'sometimes'

  // --- GAMING ---
  if (usage === 'gaming') {
    if (budget === 'low') {
      return locale === 'en'
        ? {
            archetype: 'douchebag',
            title: 'Entry-level gaming desktop',
            summary: 'To game on a tight budget, a Windows desktop is your best bet.',
            specs: [
              'Processor: AMD Ryzen 5 or Intel Core i5',
              'RAM: 16 GB',
              'Storage: 512 GB SSD',
              'Graphics card: NVIDIA RTX 3060 or AMD RX 6600',
            ],
            note: "Under $500, gaming options are pretty limited. You might want to wait a few months and save up a bit more.",
            link: '/guide#budget',
          }
        : {
            archetype: 'douchebag',
            title: 'PC de bureau gaming entrée de gamme',
            summary: 'Pour jouer à petit budget, un PC de bureau Windows est la meilleure option.',
            specs: [
              'Processeur : AMD Ryzen 5 ou Intel Core i5',
              'RAM : 16 Go',
              'Stockage : SSD 512 Go',
              'Carte graphique : NVIDIA RTX 3060 ou AMD RX 6600',
            ],
            note: "Avec moins de 500 $, les options de jeu sont limitées. Considère d'attendre quelques mois pour économiser un peu plus.",
            link: '/guide#budget',
          }
    }

    return locale === 'en'
      ? {
          archetype: 'geek',
          title: 'Gaming desktop PC',
          summary: 'For gaming, a Windows desktop gives you the best bang for your buck.',
          specs: [
            'Processor: Intel Core i5/i7 or AMD Ryzen 5/7',
            'RAM: 16 to 32 GB',
            'Storage: 1 TB NVMe SSD',
            'Graphics card: NVIDIA RTX 4070 or higher',
          ],
          note: "Gaming laptops exist but they cost more and run hotter. A desktop is still the way to go.",
          link: '/guide#processeur',
        }
      : {
          archetype: 'geek',
          title: 'PC de bureau gaming',
          summary: 'Pour le jeu vidéo, un PC de bureau Windows offre le meilleur rapport performance/prix.',
          specs: [
            'Processeur : Intel Core i5/i7 ou AMD Ryzen 5/7',
            'RAM : 16 à 32 Go',
            'Stockage : SSD NVMe 1 To',
            'Carte graphique : NVIDIA RTX 4070 ou supérieur',
          ],
          note: 'Les PC portables gaming existent mais coûtent plus cher et chauffent davantage. Un bureau reste préférable.',
          link: '/guide#processeur',
        }
  }

  // --- CREATIVE ---
  if (usage === 'creative') {
    if (isMac || noPreference) {
      return locale === 'en'
        ? {
            archetype: 'geek',
            title: 'MacBook Pro or Mac Studio',
            summary: 'For professional creative work, Macs with M-series chips are outstanding.',
            specs: [
              'Apple M3 Pro or M4 Pro chip',
              'RAM: 18 to 36 GB',
              'Storage: 512 GB to 1 TB SSD',
              'High-resolution Retina display',
            ],
            note: "Apple M chips often outperform the competition for video editing and photography, while staying dead quiet.",
            link: '/guide#processeur',
          }
        : {
            archetype: 'geek',
            title: 'MacBook Pro ou Mac Studio',
            summary: 'Pour la création professionnelle, les Mac avec puce M sont exceptionnels.',
            specs: [
              'Puce Apple M3 Pro ou M4 Pro',
              'RAM : 18 à 36 Go',
              'Stockage : SSD 512 Go à 1 To',
              'Écran Retina haute résolution',
            ],
            note: 'Les puces Apple M surpassent souvent la concurrence pour le montage vidéo et la photo, tout en restant silencieuses.',
            link: '/guide#processeur',
          }
    }

    // creative + windows
    return locale === 'en'
      ? {
          archetype: 'geek',
          title: 'High-performance PC for creative work',
          summary: 'For editing and design, you need a well-equipped PC.',
          specs: [
            'Processor: Intel Core i7 or AMD Ryzen 7',
            'RAM: 32 GB',
            'Storage: 1 TB NVMe SSD',
            'Dedicated graphics card recommended',
          ],
          note: "For 4K video editing, make sure you have a dedicated GPU (NVIDIA or AMD).",
          link: '/guide#processeur',
        }
      : {
          archetype: 'geek',
          title: 'PC haute performance pour la création',
          summary: 'Pour le montage et le graphisme, il te faut un PC bien équipé.',
          specs: [
            'Processeur : Intel Core i7 ou AMD Ryzen 7',
            'RAM : 32 Go',
            'Stockage : SSD NVMe 1 To',
            'Carte graphique dédiée recommandée',
          ],
          note: "Pour le montage vidéo 4K, assure-toi d'avoir une carte graphique dédiée (NVIDIA ou AMD).",
          link: '/guide#processeur',
        }
  }

  // --- BASIC + LOW BUDGET ---
  if (usage === 'basic' && budget === 'low') {
    if (isMac) {
      return locale === 'en'
        ? {
            archetype: 'minimalist',
            title: 'Refurbished MacBook Air M1',
            summary: 'A used MacBook Air M1 is still an excellent pick for basic tasks.',
            specs: [
              'Apple M1 chip',
              'RAM: 8 GB',
              'Storage: 256 GB SSD',
              'Outstanding battery life (15 to 18 hrs)',
            ],
            note: "A certified refurbished model from Apple or a trusted reseller can fit within your budget.",
            link: '/guide#portable-vs-bureau',
          }
        : {
            archetype: 'minimalist',
            title: 'MacBook Air M1 reconditionné',
            summary: "Un MacBook Air M1 d'occasion reste une excellente option pour un usage basique.",
            specs: [
              'Puce Apple M1',
              'RAM : 8 Go',
              'Stockage : SSD 256 Go',
              'Autonomie exceptionnelle (15 à 18 h)',
            ],
            note: "Un modèle reconditionné certifié d'Apple ou d'un revendeur reconnu peut entrer dans ton budget.",
            link: '/guide#portable-vs-bureau',
          }
    }

    // basic + low + windows or no pref
    return locale === 'en'
      ? {
          archetype: 'minimalist',
          title: 'Entry-level Windows laptop',
          summary: 'For browsing and email, a simple PC will do the job just fine.',
          specs: [
            'Processor: Intel Core i3 or AMD Ryzen 3',
            'RAM: 8 GB minimum',
            'Storage: 256 GB SSD',
            'Screen: 15-inch Full HD',
          ],
          note: "Avoid models with only 4 GB of RAM — that's just not enough anymore.",
          link: '/guide#ram',
        }
      : {
          archetype: 'minimalist',
          title: 'PC portable entrée de gamme Windows',
          summary: 'Pour la navigation et les courriels, un PC simple fera très bien le travail.',
          specs: [
            'Processeur : Intel Core i3 ou AMD Ryzen 3',
            'RAM : 8 Go minimum',
            'Stockage : SSD 256 Go',
            'Écran : 15 pouces Full HD',
          ],
          note: "Évite les modèles avec seulement 4 Go de RAM, c'est trop peu en 2024.",
          link: '/guide#ram',
        }
  }

  // --- MAC / NO PREF + PORTABLE + MID/HIGH ---
  if ((isMac || noPreference) && portable && (budget === 'mid' || budget === 'high')) {
    return locale === 'en'
      ? {
          archetype: 'athlete',
          title: 'MacBook Air M3',
          summary: 'The MacBook Air M3 is the gold standard for portability and versatility.',
          specs: [
            'Apple M3 chip',
            'RAM: 8 to 16 GB',
            'Storage: 256 to 512 GB SSD',
            'Liquid Retina 13" or 15" display',
            'Battery life: 15 to 18 hours',
          ],
          note: "Perfect for students, on-the-go professionals, and anyone looking for simplicity and durability.",
          link: '/guide#portable-vs-bureau',
        }
      : {
          archetype: 'athlete',
          title: 'MacBook Air M3',
          summary: 'Le MacBook Air M3 est la référence pour la mobilité et la polyvalence.',
          specs: [
            'Puce Apple M3',
            'RAM : 8 à 16 Go',
            'Stockage : SSD 256 à 512 Go',
            'Écran Liquid Retina 13" ou 15"',
            'Autonomie : 15 à 18 heures',
          ],
          note: 'Idéal pour les étudiants, les professionnels nomades et ceux qui cherchent simplicité et durabilité.',
          link: '/guide#portable-vs-bureau',
        }
  }

  // --- PORTABLE + NOT MAC ---
  if (portable && !isMac) {
    return locale === 'en'
      ? {
          archetype: 'athlete',
          title: 'Versatile Windows laptop',
          summary: 'A solid mid-range Windows laptop covers work and school perfectly.',
          specs: [
            'Processor: Intel Core i5 or AMD Ryzen 5',
            'RAM: 16 GB',
            'Storage: 512 GB SSD',
            'Screen: 14 to 15-inch Full HD',
            'Recommended brands: Dell, Lenovo, HP, ASUS',
          ],
          note: "Look for models with at least 16 GB of RAM and an SSD. Skip the old-school hard drives.",
          link: '/guide#stockage',
        }
      : {
          archetype: 'athlete',
          title: 'PC portable Windows polyvalent',
          summary: 'Un bon portable Windows milieu de gamme couvre parfaitement le travail et les études.',
          specs: [
            'Processeur : Intel Core i5 ou AMD Ryzen 5',
            'RAM : 16 Go',
            'Stockage : SSD 512 Go',
            'Écran : 14 à 15 pouces Full HD',
            'Marques recommandées : Dell, Lenovo, HP, ASUS',
          ],
          note: "Cherche des modèles avec au moins 16 Go de RAM et un SSD. Évite les disques durs classiques.",
          link: '/guide#stockage',
        }
  }

  // --- DEFAULT: DESKTOP ---
  return locale === 'en'
    ? {
        archetype: 'athlete',
        title: 'Windows desktop computer',
        summary: "You don't need portability? A desktop gives you more power for the same price.",
        specs: [
          'Processor: Intel Core i5 or AMD Ryzen 5',
          'RAM: 16 GB',
          'Storage: 512 GB SSD + optional HDD',
          'External monitor: 24 to 27-inch Full HD recommended',
        ],
        note: "Don't forget to budget for a monitor, keyboard, and mouse if you don't already have them.",
        link: '/guide#ecran',
      }
    : {
        archetype: 'athlete',
        title: 'Ordinateur de bureau Windows',
        summary: "Tu n'as pas besoin de mobilité ? Un bureau te donnera plus de puissance pour le même prix.",
        specs: [
          'Processeur : Intel Core i5 ou AMD Ryzen 5',
          'RAM : 16 Go',
          'Stockage : SSD 512 Go + HDD optionnel',
          'Écran externe : 24 à 27 pouces Full HD recommandé',
        ],
        note: "N'oublie pas de budgéter l'écran, le clavier et la souris si tu n'en as pas encore.",
        link: '/guide#ecran',
      }
}

export function getRecommendation(
  locale: string,
  answers: Record<string, string>,
): Recommendation {
  return buildRecommendation(locale, answers)
}
