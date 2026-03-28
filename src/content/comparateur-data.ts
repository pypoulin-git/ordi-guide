// ---------------------------------------------------------------------------
// Comparateur quiz data — locale-aware (fr / en)
// ---------------------------------------------------------------------------

export type Step = {
  id: string
  question: string
  hint?: string
  /** If set, this step is only shown when the condition is met */
  showIf?: (answers: Record<string, string>) => boolean
  options: { value: string; label: string; desc?: string; emoji?: string }[]
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
      { value: 'basic', emoji: '🌐', label: 'Navigation et courriels', desc: 'Facebook, YouTube, nouvelles, Zoom avec la famille' },
      { value: 'work', emoji: '💼', label: 'Travail de bureau', desc: 'Word, Excel, Outlook, visioconférence quotidienne' },
      { value: 'creative', emoji: '🎨', label: 'Création et montage', desc: 'Photoshop, Premiere, Canva, design graphique' },
      { value: 'gaming', emoji: '🎮', label: 'Jeux vidéo', desc: 'Fortnite, Valorant, jeux AAA, Steam' },
      { value: 'student', emoji: '📚', label: 'Études', desc: 'Recherches, rédaction, présentations, cours en ligne' },
    ],
  },
  {
    id: 'budget',
    question: 'Quel est ton budget ?',
    hint: 'Sois honnête : ça nous aide à te faire la meilleure recommandation',
    options: [
      { value: 'low', label: 'Moins de 500 $', desc: 'Entrée de gamme, usage léger' },
      { value: 'mid-low', label: '500 $ à 800 $', desc: 'Bon rapport qualité-prix' },
      { value: 'mid', label: '800 $ à 1 200 $', desc: 'Le sweet spot pour la majorité' },
      { value: 'high', label: '1 200 $ à 1 800 $', desc: 'Haut de gamme, pour durer longtemps' },
      { value: 'premium', label: '1 800 $ à 2 500 $', desc: 'Pro ou passionné' },
      { value: 'ultra', label: 'Plus de 2 500 $', desc: 'Performance maximale, aucun compromis' },
    ],
  },
  {
    id: 'mobility',
    question: 'Vas-tu te déplacer avec ton ordinateur ?',
    options: [
      { value: 'yes', label: 'Oui, souvent', desc: 'Café, bureau, école — toujours dans mon sac' },
      { value: 'sometimes', label: 'Parfois', desc: 'Surtout à la maison, mais parfois en déplacement' },
      { value: 'no', label: 'Non, jamais', desc: 'Il reste sur mon bureau, point final' },
    ],
  },
  {
    id: 'screensize',
    question: 'Quelle taille d\'écran te conviendrait ?',
    hint: 'Pour ton portable',
    showIf: (a) => a.mobility !== 'no',
    options: [
      { value: 'compact', label: 'Compact (13-14 pouces)', desc: 'Léger, facile à transporter' },
      { value: 'standard', label: 'Standard (15-16 pouces)', desc: 'Bon compromis confort et portabilité' },
      { value: 'large', label: 'Grand (17 pouces+)', desc: 'Confort visuel maximal, moins facile à déplacer' },
      { value: 'any', label: 'Pas important', desc: 'Je ferai avec' },
    ],
  },
  {
    id: 'brand',
    question: 'As-tu une préférence d\'environnement ?',
    hint: 'Ça influence les options qu\'on va te proposer',
    options: [
      { value: 'mac', label: 'Apple', desc: 'J\'ai déjà un iPhone/iPad, ou j\'aime l\'écosystème' },
      { value: 'windows', label: 'Windows', desc: 'Je connais bien, pas envie de changer' },
      { value: 'nopreference', label: 'Aucune préférence', desc: 'Le meilleur choix pour moi, peu importe' },
    ],
  },
  {
    id: 'durability',
    question: 'Tu comptes garder cet ordinateur combien de temps ?',
    options: [
      { value: 'short', label: '2-3 ans', desc: 'Je changerai quand ça ralentira' },
      { value: 'medium', label: '4-5 ans', desc: 'Je veux quelque chose de fiable moyen terme' },
      { value: 'long', label: '6 ans et plus', desc: 'C\'est un investissement, je veux que ça dure' },
    ],
  },
  {
    id: 'priority',
    question: 'Si tu devais choisir UNE seule priorité ?',
    hint: 'Ça nous aide à départager les meilleurs choix pour toi',
    options: [
      { value: 'speed', label: 'La vitesse', desc: 'Que tout s\'ouvre vite, zéro attente' },
      { value: 'battery', label: 'L\'autonomie', desc: 'Pouvoir travailler longtemps sans charger' },
      { value: 'price', label: 'Le prix', desc: 'Le meilleur deal possible' },
      { value: 'display', label: 'La qualité de l\'écran', desc: 'Confort visuel, couleurs fidèles' },
      { value: 'silent', label: 'Le silence', desc: 'Pas de ventilateur bruyant' },
    ],
  },
  {
    id: 'level',
    question: 'Comment te décrirais-tu avec la technologie ?',
    options: [
      { value: 'beginner', label: 'J\'ai besoin de simple', desc: 'Que ça marche tout seul, pas de surprises' },
      { value: 'intermediate', label: 'Je me débrouille', desc: 'Je sais installer une app et résoudre les petits soucis' },
      { value: 'advanced', label: 'Je suis à l\'aise', desc: 'J\'aime configurer et personnaliser' },
    ],
  },
]

const stepsEn: Step[] = [
  {
    id: 'usage',
    question: 'How are you going to use your computer?',
    hint: 'Pick your main use case',
    options: [
      { value: 'basic', emoji: '🌐', label: 'Browsing and email', desc: 'Facebook, YouTube, news, Zoom with family' },
      { value: 'work', emoji: '💼', label: 'Office work', desc: 'Word, Excel, Outlook, daily video calls' },
      { value: 'creative', emoji: '🎨', label: 'Creative work', desc: 'Photoshop, Premiere, Canva, graphic design' },
      { value: 'gaming', emoji: '🎮', label: 'Video games', desc: 'Fortnite, Valorant, AAA titles, Steam' },
      { value: 'student', emoji: '📚', label: 'School', desc: 'Research, writing, presentations, online courses' },
    ],
  },
  {
    id: 'budget',
    question: "What's your budget?",
    hint: 'Be honest — it helps us give you the best recommendation',
    options: [
      { value: 'low', label: 'Under $500', desc: 'Entry level, light use' },
      { value: 'mid-low', label: '$500 to $800', desc: 'Good value for the money' },
      { value: 'mid', label: '$800 to $1,200', desc: 'The sweet spot for most people' },
      { value: 'high', label: '$1,200 to $1,800', desc: 'High-end, built to last' },
      { value: 'premium', label: '$1,800 to $2,500', desc: 'Pro or enthusiast' },
      { value: 'ultra', label: 'Over $2,500', desc: 'Maximum performance, no compromises' },
    ],
  },
  {
    id: 'mobility',
    question: 'Are you going to carry your computer around?',
    options: [
      { value: 'yes', label: 'Yes, often', desc: 'Coffee shop, office, school — always in my bag' },
      { value: 'sometimes', label: 'Sometimes', desc: 'Mostly at home, but I take it out once in a while' },
      { value: 'no', label: 'No, never', desc: "It'll stay on my desk, period" },
    ],
  },
  {
    id: 'screensize',
    question: 'What screen size would suit you?',
    hint: 'For your laptop',
    showIf: (a) => a.mobility !== 'no',
    options: [
      { value: 'compact', label: 'Compact (13-14 inches)', desc: 'Light, easy to carry' },
      { value: 'standard', label: 'Standard (15-16 inches)', desc: 'Good balance of comfort and portability' },
      { value: 'large', label: 'Large (17 inches+)', desc: 'Maximum visual comfort, heavier to carry' },
      { value: 'any', label: "Doesn't matter", desc: "I'll work with whatever" },
    ],
  },
  {
    id: 'brand',
    question: 'Do you have an environment preference?',
    hint: 'This influences the options we suggest',
    options: [
      { value: 'mac', label: 'Apple', desc: 'I already have an iPhone/iPad, or I like the ecosystem' },
      { value: 'windows', label: 'Windows', desc: "I know it well, don't want to switch" },
      { value: 'nopreference', label: 'No preference', desc: "Whatever's best for me" },
    ],
  },
  {
    id: 'durability',
    question: 'How long do you plan to keep this computer?',
    options: [
      { value: 'short', label: '2-3 years', desc: "I'll upgrade when it slows down" },
      { value: 'medium', label: '4-5 years', desc: 'I want something reliable mid-term' },
      { value: 'long', label: '6 years or more', desc: "It's an investment, I want it to last" },
    ],
  },
  {
    id: 'priority',
    question: 'If you had to choose ONE priority?',
    hint: 'Helps us pick between similar options for you',
    options: [
      { value: 'speed', label: 'Speed', desc: 'Everything opens instantly, zero waiting' },
      { value: 'battery', label: 'Battery life', desc: 'Work all day without plugging in' },
      { value: 'price', label: 'Price', desc: 'The best deal possible' },
      { value: 'display', label: 'Screen quality', desc: 'Visual comfort, accurate colors' },
      { value: 'silent', label: 'Silence', desc: 'No noisy fans' },
    ],
  },
  {
    id: 'level',
    question: 'How would you describe yourself with technology?',
    options: [
      { value: 'beginner', label: 'I need things simple', desc: 'Just works, no surprises' },
      { value: 'intermediate', label: 'I get by', desc: 'I can install apps and fix small issues' },
      { value: 'advanced', label: "I'm comfortable", desc: 'I like to configure and customize' },
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

function budgetTier(budget: string): 'low' | 'mid' | 'high' | 'premium' {
  if (budget === 'low') return 'low'
  if (budget === 'mid-low' || budget === 'mid') return 'mid'
  if (budget === 'high') return 'high'
  return 'premium' // premium, ultra
}

function buildRecommendation(locale: string, answers: Answers): Recommendation {
  const { usage, brand, mobility, durability, priority } = answers
  const tier = budgetTier(answers.budget)
  const isMac = brand === 'mac'
  const isWindows = brand === 'windows'
  const noPreference = brand === 'nopreference'
  const portable = mobility === 'yes' || mobility === 'sometimes'
  const wantsLong = durability === 'long'

  // --- GAMING ---
  if (usage === 'gaming') {
    if (tier === 'low') {
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
            note: "Under $500, gaming options are pretty limited. You might want to save up a bit more for a better experience.",
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
            note: "Avec moins de 500 $, les options de jeu sont limitées. Considère d'attendre un peu pour économiser davantage.",
            link: '/guide#budget',
          }
    }

    return locale === 'en'
      ? {
          archetype: 'geek',
          title: tier === 'premium' ? 'High-end gaming PC' : 'Gaming desktop PC',
          summary: 'For gaming, a Windows desktop gives you the best bang for your buck.',
          specs: [
            'Processor: Intel Core i5/i7 or AMD Ryzen 5/7',
            `RAM: ${tier === 'premium' ? '32' : '16 to 32'} GB`,
            `Storage: ${tier === 'premium' ? '2 TB' : '1 TB'} NVMe SSD`,
            `Graphics card: ${tier === 'premium' ? 'NVIDIA RTX 4080/4090' : 'NVIDIA RTX 4070 or higher'}`,
          ],
          note: priority === 'silent'
            ? "Look for liquid-cooled models — they run much quieter than air-cooled ones."
            : "Gaming laptops exist but they cost more and run hotter. A desktop is still the way to go.",
          link: '/guide#gpu',
        }
      : {
          archetype: 'geek',
          title: tier === 'premium' ? 'PC gaming haut de gamme' : 'PC de bureau gaming',
          summary: 'Pour le jeu vidéo, un PC de bureau Windows offre le meilleur rapport performance/prix.',
          specs: [
            'Processeur : Intel Core i5/i7 ou AMD Ryzen 5/7',
            `RAM : ${tier === 'premium' ? '32' : '16 à 32'} Go`,
            `Stockage : SSD NVMe ${tier === 'premium' ? '2 To' : '1 To'}`,
            `Carte graphique : ${tier === 'premium' ? 'NVIDIA RTX 4080/4090' : 'NVIDIA RTX 4070 ou supérieur'}`,
          ],
          note: priority === 'silent'
            ? 'Cherche des modèles avec refroidissement liquide — beaucoup plus silencieux que le refroidissement par air.'
            : 'Les PC portables gaming existent mais coûtent plus cher et chauffent davantage. Un bureau reste préférable.',
          link: '/guide#gpu',
        }
  }

  // --- CREATIVE ---
  if (usage === 'creative') {
    if (isMac || noPreference) {
      return locale === 'en'
        ? {
            archetype: 'geek',
            title: portable ? 'MacBook Pro' : 'Mac Studio or iMac',
            summary: 'For professional creative work, Macs with M-series chips are outstanding.',
            specs: [
              `Apple ${tier === 'premium' ? 'M4 Pro or M4 Max' : 'M3 Pro or M4 Pro'} chip`,
              `RAM: ${tier === 'premium' ? '36 to 64' : '18 to 36'} GB`,
              'Storage: 512 GB to 1 TB SSD',
              'High-resolution Retina display',
            ],
            note: priority === 'silent'
              ? "Apple M chips run fanless or near-silent — perfect for quiet studios."
              : wantsLong
                ? "Macs hold their value and get software updates for 6-7 years. Great long-term investment."
                : "Apple M chips often outperform the competition for video editing and photography.",
            link: '/guide#processeur',
          }
        : {
            archetype: 'geek',
            title: portable ? 'MacBook Pro' : 'Mac Studio ou iMac',
            summary: 'Pour la création professionnelle, les Mac avec puce M sont exceptionnels.',
            specs: [
              `Puce Apple ${tier === 'premium' ? 'M4 Pro ou M4 Max' : 'M3 Pro ou M4 Pro'}`,
              `RAM : ${tier === 'premium' ? '36 à 64' : '18 à 36'} Go`,
              'Stockage : SSD 512 Go à 1 To',
              'Écran Retina haute résolution',
            ],
            note: priority === 'silent'
              ? 'Les puces Apple M tournent sans ventilateur ou presque — parfait pour les studios silencieux.'
              : wantsLong
                ? 'Les Mac conservent leur valeur et reçoivent les mises à jour pendant 6-7 ans. Excellent investissement.'
                : 'Les puces Apple M surpassent souvent la concurrence pour le montage vidéo et la photo.',
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
            'Dedicated graphics card (NVIDIA or AMD)',
          ],
          note: priority === 'display'
            ? "Invest in a color-accurate monitor (100% sRGB minimum). It makes a huge difference for design work."
            : "For 4K video editing, make sure you have a dedicated GPU (NVIDIA or AMD).",
          link: '/guide#gpu',
        }
      : {
          archetype: 'geek',
          title: 'PC haute performance pour la création',
          summary: 'Pour le montage et le graphisme, il te faut un PC bien équipé.',
          specs: [
            'Processeur : Intel Core i7 ou AMD Ryzen 7',
            'RAM : 32 Go',
            'Stockage : SSD NVMe 1 To',
            'Carte graphique dédiée (NVIDIA ou AMD)',
          ],
          note: priority === 'display'
            ? 'Investis dans un écran fidèle en couleurs (100% sRGB minimum). Ça fait toute la différence pour le design.'
            : "Pour le montage vidéo 4K, assure-toi d'avoir une carte graphique dédiée (NVIDIA ou AMD).",
          link: '/guide#gpu',
        }
  }

  // --- BASIC + LOW BUDGET ---
  if (usage === 'basic' && tier === 'low') {
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
          note: wantsLong
            ? "At this budget, durability is limited. Consider bumping up to $500-800 to get something that lasts."
            : "Avoid models with only 4 GB of RAM — that's just not enough anymore.",
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
          note: wantsLong
            ? 'À ce budget, la durabilité est limitée. Considère monter à 500-800 $ pour quelque chose qui dure.'
            : "Évite les modèles avec seulement 4 Go de RAM, c'est trop peu aujourd'hui.",
          link: '/guide#ram',
        }
  }

  // --- MAC / NO PREF + PORTABLE + MID/HIGH ---
  if ((isMac || noPreference) && portable && (tier === 'mid' || tier === 'high')) {
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
          note: priority === 'battery'
            ? "The MacBook Air is one of the longest-lasting laptops on the market — easily a full day of work."
            : priority === 'silent'
              ? "The Air is completely fanless. Dead silent, always."
              : "Perfect for students, on-the-go professionals, and anyone looking for simplicity and durability.",
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
          note: priority === 'battery'
            ? 'Le MacBook Air a l\'une des meilleures autonomies du marché — facilement une journée complète.'
            : priority === 'silent'
              ? 'Le Air est complètement sans ventilateur. Silence total, en permanence.'
              : 'Idéal pour les étudiants, les professionnels nomades et ceux qui cherchent simplicité et durabilité.',
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
            `Screen: ${answers.screensize === 'compact' ? '13-14' : answers.screensize === 'large' ? '17' : '15-16'}-inch Full HD`,
            'Recommended brands: Dell, Lenovo, HP, ASUS',
          ],
          note: wantsLong
            ? "For 6+ years, invest in a model with a metal build and good reviews for durability."
            : "Look for models with at least 16 GB of RAM and an SSD. Skip the old-school hard drives.",
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
            `Écran : ${answers.screensize === 'compact' ? '13-14' : answers.screensize === 'large' ? '17' : '15-16'} pouces Full HD`,
            'Marques recommandées : Dell, Lenovo, HP, ASUS',
          ],
          note: wantsLong
            ? 'Pour 6 ans+, investis dans un modèle avec boîtier métallique et de bonnes critiques sur la durabilité.'
            : "Cherche des modèles avec au moins 16 Go de RAM et un SSD. Évite les disques durs classiques.",
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
        note: priority === 'display'
          ? "Invest in a good external monitor (IPS panel, 100% sRGB). It's the biggest quality-of-life upgrade."
          : "Don't forget to budget for a monitor, keyboard, and mouse if you don't already have them.",
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
        note: priority === 'display'
          ? 'Investis dans un bon écran externe (dalle IPS, 100% sRGB). C\'est le meilleur upgrade pour le confort.'
          : "N'oublie pas de budgéter l'écran, le clavier et la souris si tu n'en as pas encore.",
        link: '/guide#ecran',
      }
}

export function getRecommendation(
  locale: string,
  answers: Record<string, string>,
): Recommendation {
  return buildRecommendation(locale, answers)
}
