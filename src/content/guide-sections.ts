export type AnalogyMode = 'body' | 'car'

export type ContentBlock = { subtitle: string; text: string }
export type DualContent = { subtitle: string; body: string; car: string }

export type Section = {
  id: string
  component?: string
  title: Record<AnalogyMode, string>
  content: (ContentBlock | DualContent)[]
  tip: Record<AnalogyMode, string>
}

/* ── French sections ─────────────────────────────────────────────── */

const sectionsFR: Section[] = [
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
      body: 'Le stockage, mémoire à long terme',
      car: 'Le stockage, coffre de l\'ordinateur',
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
      body: 'L\'écran, ta fenêtre sur le monde numérique',
      car: 'L\'écran, le pare-brise de l\'ordinateur',
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
  {
    id: 'portable-vs-bureau',
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
  {
    id: 'processeur',
    component: 'cpu',
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
        text: '8 GB: enough for basic use (browsing, email, streaming). 16 GB: comfortable for everyone, recommended in 2024. 32 GB and up: only if you do video editing, demanding gaming, or technical work.',
      },
    ],
    tip: {
      body: '16 GB of digital lung capacity is the new standard. Avoid new computers with only 4 GB — you\'ll be gasping for air in no time.',
      car: '16 GB is like a smooth 6-speed automatic transmission — fluid and comfortable. 4 GB is a clunky old 3-speed that jerks at every shift. Avoid it.',
    },
  },
  {
    id: 'stockage',
    component: 'ssd',
    title: {
      body: 'Storage, long-term memory',
      car: 'Storage, the computer\'s trunk',
    },
    content: [
      {
        subtitle: 'SSD vs traditional hard drive',
        body: 'The old hard drive (HDD) is like a dusty old library: it takes forever to find a book. An SSD is like a photographic memory — you recall everything instantly. In 2024, every new computer should have an SSD.',
        car: 'The old hard drive (HDD) is a car trunk with a single narrow opening — everything comes out slowly. An SSD is a full-opening trunk with organized compartments — you find everything in the blink of an eye. In 2024, there\'s no excuse for still rolling with an HDD.',
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
    title: {
      body: 'The display, your window to the digital world',
      car: 'The display, the computer\'s windshield',
    },
    content: [
      {
        subtitle: 'Size',
        body: 'Your eyes spend hours in front of the screen — it\'s your interface with all your content. For a laptop: 13-14 inches for portability, 15-16 inches for comfort. For a fixed setup, an external monitor of 24-27 inches is ideal — it\'s like having wide-angle vision.',
        car: 'Your car\'s windshield is what shows you the road. The wider and clearer it is, the better you drive. For a laptop: 13-14 inches for a compact ride, 15-16 inches for comfort. For a fixed setup, an external monitor of 24-27 inches — that\'s the full panoramic view.',
      },
      {
        subtitle: 'Resolution',
        text: 'Full HD (1920x1080): the standard, good enough for most people. 2K / 4K: sharper image, useful for larger screens or if you work with photos/videos. For a 24-inch screen or smaller, Full HD is perfectly fine.',
      },
    ],
    tip: {
      body: 'If you spend long hours in front of a screen, invest in a good external monitor — it makes the biggest difference for your eye comfort.',
      car: 'If you spend hours driving, invest in a great windshield. A quality external monitor is the equivalent of a heads-up display — it changes everything.',
    },
  },
  {
    id: 'budget',
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
