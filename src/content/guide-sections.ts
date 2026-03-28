export type AnalogyMode = 'body' | 'car'

export type ContentBlock = { subtitle: string; text: string }
export type DualContent = { subtitle: string; body: string; car: string }

export type SectionCategory = 'intro' | 'analogy' | 'conclusion'

export type Section = {
  id: string
  component?: string
  category: SectionCategory
  title: Record<AnalogyMode, string>
  content: (ContentBlock | DualContent)[]
  tip: Record<AnalogyMode, string>
}

/* ── French sections ─────────────────────────────────────────────── */

const sectionsFR: Section[] = [
  /* ─── INTRO : tronc commun (pas d'analogie) ─────────────────── */
  {
    id: 'portable-vs-bureau',
    category: 'intro',
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

  /* ─── ANALOGIE : les composants expliqués ───────────────────── */
  {
    id: 'carte-mere',
    component: 'motherboard',
    category: 'analogy',
    title: {
      body: 'La carte mère, système nerveux de l\'ordinateur',
      car: 'La carte mère, châssis de l\'ordinateur',
    },
    content: [
      {
        subtitle: 'C\'est quoi ?',
        body: 'La carte mère, c\'est le système nerveux central de ton ordinateur. Comme ta colonne vertébrale et tes nerfs qui relient le cerveau à chaque partie du corps, la carte mère connecte tous les composants entre eux. Sans elle, le cerveau (processeur) ne pourrait pas communiquer avec les poumons (RAM) ni avec la mémoire (stockage). C\'est elle qui fait circuler l\'information partout.',
        car: 'La carte mère, c\'est le châssis de ta voiture — la structure sur laquelle tout est monté. Le moteur, la transmission, les roues, le tableau de bord : tout est boulonné dessus. Un bon châssis assure que toutes les pièces travaillent ensemble sans vibration ni perte. Pas de châssis solide, pas de voiture fiable.',
      },
      {
        subtitle: 'Ce qu\'il faut savoir',
        text: 'En général, tu n\'as pas à choisir la carte mère toi-même — elle vient avec l\'ordinateur. Mais c\'est bon de savoir qu\'elle détermine quelles composantes sont compatibles et combien tu peux en ajouter plus tard (plus de RAM, un meilleur SSD, etc.). Sur un portable, elle est fixe et non remplaçable. Sur un bureau, tu as plus de flexibilité.',
      },
    ],
    tip: {
      body: 'Tu n\'as pas besoin de connaître le modèle exact de ta carte mère. Retiens juste que c\'est la colonne vertébrale : si elle est solide, tout le reste fonctionne bien ensemble.',
      car: 'Pas besoin de connaître le modèle de ton châssis. Retiens juste qu\'un bon châssis = des composantes bien supportées. C\'est la fondation invisible de la machine.',
    },
  },
  {
    id: 'processeur',
    component: 'cpu',
    category: 'analogy',
    title: {
      body: 'Le processeur (CPU), cerveau de l\'ordinateur',
      car: 'Le processeur (CPU), moteur de l\'ordinateur',
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
    category: 'analogy',
    title: {
      body: 'La mémoire vive (RAM), espace de travail de l\'ordinateur',
      car: 'La mémoire vive (RAM), transmission de l\'ordinateur',
    },
    content: [
      {
        subtitle: 'L\'analogie',
        body: 'Imagine tes poumons. La RAM, c\'est ta capacité respiratoire : le débit d\'air disponible pour travailler. Plus tes poumons sont grands, plus tu peux soutenir d\'efforts en même temps sans t\'essouffler. Un ordinateur avec peu de RAM, c\'est comme courir avec un petit souffle — dès que tu ouvres trop de programmes, ça ralentit.',
        car: 'Imagine la transmission de ta voiture. La RAM, c\'est la boîte de vitesses : elle gère le flux entre le moteur (processeur) et les roues (tes programmes). Plus elle est fluide et performante, plus ta machine passe d\'une tâche à l\'autre sans à-coup. Peu de RAM, c\'est comme rouler en première sur l\'autoroute — le moteur tourne mais rien n\'avance.',
      },
      {
        subtitle: 'Combien en faut-il ?',
        text: '8 Go : suffisant pour un usage de base (navigation, courriels, films). 16 Go : confortable pour tout le monde, recommandé en 2026. 32 Go et plus : uniquement si tu fais de la vidéo, du jeu exigeant ou du travail technique.',
      },
    ],
    tip: {
      body: '16 Go de capacité pulmonaire numérique, c\'est le nouveau standard. Évite les ordinateurs neufs avec seulement 4 Go — tu vas t\'essouffler très vite.',
      car: '16 Go, c\'est la transmission automatique 6 vitesses — fluide et confortable. 4 Go, c\'est un vieux 3 vitesses qui accroche à chaque passage. Évite.',
    },
  },
  {
    id: 'gpu',
    component: 'gpu',
    category: 'analogy',
    title: {
      body: 'La carte graphique (GPU), cortex visuel de l\'ordinateur',
      car: 'La carte graphique (GPU), turbo de l\'ordinateur',
    },
    content: [
      {
        subtitle: 'C\'est quoi ?',
        body: 'La carte graphique, c\'est le cortex visuel de ton ordinateur — la partie du cerveau qui traite les images, les couleurs et le mouvement. Comme tes réflexes visuels : plus ils sont aiguisés, plus tu perçois les détails rapidement. Un bon GPU, c\'est la différence entre voir le monde en HD ou à travers un brouillard.',
        car: 'La carte graphique, c\'est le turbo de ta voiture. Le moteur (processeur) fait avancer la machine, mais le turbo lui donne un coup de boost quand il faut accélérer fort. Pour afficher des images, de la vidéo ou des jeux en haute définition, c\'est le GPU qui prend le relais et pousse la puissance visuelle.',
      },
      {
        subtitle: 'Ce qu\'il faut savoir',
        text: 'Pour la navigation web, les courriels et la bureautique, la puce graphique intégrée au processeur suffit amplement — pas besoin de carte dédiée. Si tu fais du montage vidéo, du design graphique ou du jeu vidéo, là ça vaut la peine d\'investir. Les marques principales : NVIDIA (GeForce RTX) et AMD (Radeon). Apple intègre le GPU directement dans ses puces M1/M2/M3/M4.',
      },
    ],
    tip: {
      body: 'Si tu ne joues pas à des jeux vidéo et que tu ne fais pas de montage, le GPU intégré est parfait. C\'est comme tes yeux naturels : pour la vie de tous les jours, ils sont bien suffisants.',
      car: 'Si tu ne fais pas de course, pas besoin de turbo. Le moteur de base suffit pour la route. Un GPU dédié, c\'est un investissement utile seulement si tu pousses la machine à fond.',
    },
  },
  {
    id: 'stockage',
    component: 'ssd',
    category: 'analogy',
    title: {
      body: 'Le stockage, mémoire à long terme',
      car: 'Le stockage, coffre de l\'ordinateur',
    },
    content: [
      {
        subtitle: 'SSD vs disque dur classique',
        body: 'L\'ancien disque dur (HDD), c\'est comme une vieille bibliothèque poussiéreuse : il faut chercher longtemps pour retrouver un livre. Le SSD, c\'est une mémoire photographique — tu retrouves tout instantanément. En 2026, tout ordinateur neuf devrait avoir un SSD.',
        car: 'L\'ancien disque dur (HDD), c\'est un coffre de voiture avec une seule ouverture étroite — tout sort lentement. Le SSD, c\'est un coffre à ouverture intégrale avec compartiments organisés — tu trouves tout en un clin d\'œil. En 2026, plus d\'excuse pour rouler avec un HDD.',
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
    category: 'analogy',
    title: {
      body: 'L\'écran, les yeux de l\'ordinateur',
      car: 'L\'écran, pare-brise et tableau de bord',
    },
    content: [
      {
        subtitle: 'L\'analogie',
        body: 'L\'écran, ce sont les yeux de ton ordinateur — et par extension, les tiens. C\'est à travers lui que tu vois tout : textes, images, vidéos. La qualité de ton écran, c\'est la clarté de ta vue. Un bon écran, c\'est une vision 20/20 : tout est net, les couleurs sont fidèles, tes yeux ne fatiguent pas. Un écran médiocre, c\'est comme avoir besoin de lunettes et ne pas les porter.',
        car: 'L\'écran, c\'est à la fois le pare-brise et le tableau de bord de ta voiture. Le pare-brise te montre la route (le contenu), et le tableau de bord t\'affiche les informations essentielles. Plus ils sont larges, nets et bien éclairés, mieux tu conduis. Un bon écran, c\'est un panoramique intégral avec affichage tête haute.',
      },
      {
        subtitle: 'La taille',
        text: 'Pour un portable : 13-14 pouces pour la mobilité, 15-16 pouces pour le confort visuel. Pour un usage fixe, un écran externe de 24-27 pouces est idéal. C\'est le composant qui a le plus d\'impact sur ton confort au quotidien.',
      },
      {
        subtitle: 'La résolution',
        text: 'Full HD (1920×1080) : standard, suffisant pour la majorité. 2K / 4K : image plus nette, utile pour les grandes tailles d\'écran ou si tu travailles sur des photos/vidéos. Pour un écran de 24 pouces ou moins, le Full HD est tout à fait bien.',
      },
    ],
    tip: {
      body: 'Si tu travailles longtemps devant l\'écran, investis dans un bon moniteur externe — c\'est l\'équivalent de s\'offrir une meilleure vue. Tes yeux te remercieront.',
      car: 'Si tu passes des heures à conduire, investis dans un bon pare-brise. Un écran externe de qualité, c\'est l\'équivalent d\'un affichage tête haute — tout change.',
    },
  },

  /* ─── CONCLUSION : tronc commun ─────────────────────────────── */
  {
    id: 'budget',
    category: 'conclusion',
    title: {
      body: 'Le budget : combien prévoir ?',
      car: 'Le budget : combien prévoir ?',
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

/* ── English sections ────────────────────────────────────────────── */

const sectionsEN: Section[] = [
  /* ─── INTRO ─────────────────────────────────────────────────── */
  {
    id: 'portable-vs-bureau',
    category: 'intro',
    title: {
      body: 'Laptop or desktop computer?',
      car: 'Laptop or desktop computer?',
    },
    content: [
      {
        subtitle: 'The laptop',
        text: 'You can take it anywhere, it runs on battery, and it barely takes up space. Perfect if you work in different rooms, travel often, or have limited space. The downside: for the same budget, it\'s slightly less powerful than a desktop, and the battery wears out over the years.',
      },
      {
        subtitle: 'The desktop computer',
        text: 'More powerful for the same price, easier to repair and upgrade. It stays at home, plugged into the wall. Great if you have a dedicated workspace and don\'t need to move around. For the same money, a desktop will generally pack more power and last longer.',
      },
    ],
    tip: {
      body: 'Still on the fence? Most people go with a laptop. The flexibility is usually worth the slight performance trade-off.',
      car: 'It\'s like choosing between a sedan (desktop) and a compact SUV (laptop). The sedan drives smoother, the SUV goes everywhere. Most people pick the SUV.',
    },
  },

  /* ─── ANALOGY ───────────────────────────────────────────────── */
  {
    id: 'carte-mere',
    component: 'motherboard',
    category: 'analogy',
    title: {
      body: 'The motherboard, the nervous system of the computer',
      car: 'The motherboard, the chassis of the computer',
    },
    content: [
      {
        subtitle: 'What is it?',
        body: 'The motherboard is the central nervous system of your computer. Like your spine and nerves connecting the brain to every part of the body, the motherboard links all the components together. Without it, the brain (processor) couldn\'t communicate with the lungs (RAM) or the memory (storage). It\'s what makes information flow everywhere.',
        car: 'The motherboard is the chassis of your car — the frame everything is mounted on. The engine, the transmission, the wheels, the dashboard: it\'s all bolted to it. A solid chassis ensures all the parts work together without vibration or loss. No solid chassis, no reliable car.',
      },
      {
        subtitle: 'What you need to know',
        text: 'You generally don\'t need to choose the motherboard yourself — it comes with the computer. But it\'s good to know that it determines which components are compatible and how many you can add later (more RAM, a better SSD, etc.). On a laptop, it\'s fixed and non-replaceable. On a desktop, you have more flexibility.',
      },
    ],
    tip: {
      body: 'You don\'t need to know the exact model of your motherboard. Just remember it\'s the backbone: if it\'s solid, everything else works well together.',
      car: 'No need to know your chassis model. Just remember: good chassis = well-supported components. It\'s the invisible foundation of the machine.',
    },
  },
  {
    id: 'processeur',
    component: 'cpu',
    category: 'analogy',
    title: {
      body: 'The processor (CPU), the brain of the computer',
      car: 'The processor (CPU), the engine of the computer',
    },
    content: [
      {
        subtitle: 'What is it?',
        body: 'The processor is the brain of your computer. It\'s the part that thinks, makes decisions, and executes every instruction. Like a human brain: the sharper it is, the faster everything runs.',
        car: 'The processor is the engine of your computer. It\'s what drives the machine forward and executes every instruction. Like a car engine: the more displacement it has, the more power it delivers.',
      },
      {
        subtitle: 'What you need to know',
        text: 'For everyday use (browsing, email, office work), any recent processor will do. The two big brands are Intel (Core i3/i5/i7/i9) and AMD (Ryzen 3/5/7/9). Apple also makes its own chips (M1, M2, M3, M4) known for being very efficient. For most people, a Core i5 or Ryzen 5 is more than enough.',
      },
    ],
    tip: {
      body: 'Don\'t be impressed by big numbers. A newer brain (today\'s i5) is often faster than a "bigger" but older one (an i7 from 5 years ago).',
      car: 'Don\'t be impressed by big numbers. A newer engine (today\'s i5) is often more efficient than one with more displacement but older (an i7 from 5 years ago).',
    },
  },
  {
    id: 'ram',
    component: 'ram',
    category: 'analogy',
    title: {
      body: 'RAM, the computer\'s workspace',
      car: 'RAM, the computer\'s transmission',
    },
    content: [
      {
        subtitle: 'The analogy',
        body: 'Think of your lungs. RAM is your breathing capacity: the airflow available to do work. The bigger your lungs, the more effort you can sustain at once without running out of breath. A computer with too little RAM is like running with tiny lungs — as soon as you open too many programs, everything slows down.',
        car: 'Think of your car\'s transmission. RAM is the gearbox: it manages the flow between the engine (processor) and the wheels (your programs). The smoother and more capable it is, the better your machine shifts between tasks. Too little RAM is like driving on the highway in first gear — the engine\'s running but nothing\'s moving.',
      },
      {
        subtitle: 'How much do you need?',
        text: '8 GB: enough for basic use (browsing, email, streaming). 16 GB: comfortable for everyone, recommended in 2026. 32 GB and up: only if you do video editing, demanding gaming, or technical work.',
      },
    ],
    tip: {
      body: '16 GB of digital lung capacity is the new standard. Avoid new computers with only 4 GB — you\'ll be gasping for air in no time.',
      car: '16 GB is like a smooth 6-speed automatic transmission — fluid and comfortable. 4 GB is a clunky old 3-speed that jerks at every shift. Avoid it.',
    },
  },
  {
    id: 'gpu',
    component: 'gpu',
    category: 'analogy',
    title: {
      body: 'The graphics card (GPU), the visual cortex of the computer',
      car: 'The graphics card (GPU), the turbo of the computer',
    },
    content: [
      {
        subtitle: 'What is it?',
        body: 'The graphics card is the visual cortex of your computer — the part of the brain that processes images, colors, and motion. Like your visual reflexes: the sharper they are, the faster you perceive details. A good GPU is the difference between seeing the world in HD or through a fog.',
        car: 'The graphics card is the turbo of your car. The engine (processor) moves the machine forward, but the turbo gives it a power boost when you need to accelerate hard. For displaying images, video, or games in high definition, the GPU takes over and pushes the visual power.',
      },
      {
        subtitle: 'What you need to know',
        text: 'For web browsing, email, and office work, the graphics chip built into the processor is more than enough — no dedicated card needed. If you do video editing, graphic design, or gaming, then it\'s worth investing. The main brands: NVIDIA (GeForce RTX) and AMD (Radeon). Apple integrates the GPU directly into its M1/M2/M3/M4 chips.',
      },
    ],
    tip: {
      body: 'If you don\'t play video games and don\'t do editing, the integrated GPU is perfect. It\'s like your natural eyes: for everyday life, they\'re more than enough.',
      car: 'If you\'re not racing, you don\'t need a turbo. The base engine is fine for the road. A dedicated GPU is only worth the investment if you\'re pushing the machine to its limits.',
    },
  },
  {
    id: 'stockage',
    component: 'ssd',
    category: 'analogy',
    title: {
      body: 'Storage, long-term memory',
      car: 'Storage, the computer\'s trunk',
    },
    content: [
      {
        subtitle: 'SSD vs traditional hard drive',
        body: 'The old hard drive (HDD) is like a dusty old library: it takes forever to find a book. An SSD is like a photographic memory — you recall everything instantly. In 2026, every new computer should have an SSD.',
        car: 'The old hard drive (HDD) is a car trunk with a single narrow opening — everything comes out slowly. An SSD is a full-opening trunk with organized compartments — you find everything in the blink of an eye. In 2026, there\'s no excuse for still rolling with an HDD.',
      },
      {
        subtitle: 'How much capacity?',
        text: '256 GB: the bare minimum. Be careful, it fills up fast if you have lots of photos and videos. 512 GB: recommended for most people. 1 TB (1,000 GB): if you store a lot of media. Cloud storage (OneDrive, iCloud, Google Drive) can supplement if needed.',
      },
    ],
    tip: {
      body: 'A 512 GB SSD beats a 1 TB hard drive. It\'s like having a sharp, clear memory rather than a huge but messy attic.',
      car: 'A 512 GB SSD beats a 1 TB HDD. It\'s like having a well-organized 400 L trunk rather than an 800 L trailer where you can never find anything.',
    },
  },
  {
    id: 'ecran',
    component: 'screen',
    category: 'analogy',
    title: {
      body: 'The display, the eyes of the computer',
      car: 'The display, windshield and dashboard',
    },
    content: [
      {
        subtitle: 'The analogy',
        body: 'The screen is the eyes of your computer — and by extension, yours too. It\'s through the display that you see everything: text, images, video. The quality of your screen is the clarity of your vision. A good screen is 20/20 vision: everything\'s crisp, colors are accurate, your eyes don\'t get tired. A mediocre screen is like needing glasses and not wearing them.',
        car: 'The screen is both the windshield and the dashboard of your car. The windshield shows you the road (your content), and the dashboard displays the essential information. The wider, sharper, and better-lit they are, the better you drive. A good screen is a full panoramic view with a heads-up display.',
      },
      {
        subtitle: 'Size',
        text: 'For a laptop: 13-14 inches for portability, 15-16 inches for visual comfort. For a fixed setup, an external monitor of 24-27 inches is ideal. This is the component that has the most impact on your daily comfort.',
      },
      {
        subtitle: 'Resolution',
        text: 'Full HD (1920x1080): the standard, good enough for most people. 2K / 4K: sharper image, useful for larger screens or if you work with photos/videos. For a 24-inch screen or smaller, Full HD is perfectly fine.',
      },
    ],
    tip: {
      body: 'If you spend long hours in front of a screen, invest in a good external monitor — it\'s like giving yourself better eyesight. Your eyes will thank you.',
      car: 'If you spend hours driving, invest in a great windshield. A quality external monitor is the equivalent of a heads-up display — it changes everything.',
    },
  },

  /* ─── CONCLUSION ────────────────────────────────────────────── */
  {
    id: 'budget',
    category: 'conclusion',
    title: {
      body: 'Budget: how much should you plan?',
      car: 'Budget: how much should you plan?',
    },
    content: [
      {
        subtitle: 'The main categories',
        text: '$300–500: entry level. Fine for very light use (browsing, email, streaming). Watch out for overly limited models. $500–900: mid-range. The sweet spot for most people. Good performance, good comfort, good durability. $900–1,500: high-end. For professionals, creatives, or those who want the best experience. $1,500 and up: specialized (intensive gaming, professional video editing, 3D design).',
      },
      {
        subtitle: 'Pitfalls to avoid',
        text: 'Avoid clearance sales with very old components. Be wary of deals that seem too good to be true. A good salesperson will explain the specs — if they can\'t, shop elsewhere.',
      },
    ],
    tip: {
      body: 'It\'s better to spend a bit more and keep the computer for 5-7 years than to buy a cheap one every 2-3 years. Think of it as investing in your long-term health.',
      car: 'It\'s better to spend a bit more and keep the computer for 5-7 years than to buy a cheap one every 2-3 years. It\'s like buying a reliable car you keep for 10 years rather than a lemon you replace every 2.',
    },
  },
]

/* ── Locale-aware export ─────────────────────────────────────────── */

export function getGuideSections(locale: string): Section[] {
  return locale === 'en' ? sectionsEN : sectionsFR
}
