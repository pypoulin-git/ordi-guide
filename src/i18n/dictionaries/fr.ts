const fr = {
  // ── Nav & Layout ─────────────────────────────────────────
  nav: {
    guide: 'Le guide',
    comparator: 'M\'aider à choisir',
    blog: 'Le Décodeur',
    catalogue: 'Catalogue',
    about: 'À propos',
    start: 'Commencer →',
    explanationMode: 'Mode d\'explication',
  },

  // ── Footer ───────────────────────────────────────────────
  footer: {
    tagline: 'Un guide simple et honnête pour t\'aider à choisir ton prochain ordinateur, sans jargon inutile.',
    explore: 'Explorer',
    guideComplete: 'Le guide complet',
    aboutTitle: 'À propos',
    affiliateDisclosure: 'Certains liens vers des détaillants sont des liens affiliés : si tu achètes via ces liens, on reçoit une petite commission, sans frais supplémentaires pour toi. Nos recommandations restent basées sur la qualité et tes besoins, jamais sur les commissions.',
    rights: 'Tous droits réservés.',
  },

  // ── Home ─────────────────────────────────────────────────
  home: {
    heroTitle: 'Besoin d\'aide pour choisir\nton prochain ordinateur ?',
    heroSubtitle: 'On t\'explique tout sans jargon et sans pression.\nUn guide honnête pour magasiner en confiance, que tu sois débutant ou pas.',
    heroCta: 'M\'aider à choisir',
    heroCtaGuide: 'Lire le guide',

    searchTitle: 'Décris ton besoin, on s\'occupe du reste',
    searchSubtitle: 'Notre assistant analyse ta demande et te donne une recommandation instantanée',

    analogyTitle: 'Ou tu veux qu\'on t\'explique ?',
    analogySubtitle: 'Choisis comment les explications s\'adaptent à toi sur tout le site',
    analogyStyle: 'Ton style d\'analogies',
    analogyDesc: 'Chaque composante sera expliquée selon ton univers préféré',
    analogyChangeAnytime: 'Modifiable en tout temps dans le menu',
    analogyMode: 'Mode',

    featuresTitle: 'Par où commencer ?',
    featuresSubtitle: 'Trois outils simples pour t\'accompagner dans ton achat',

    featureGuideTitle: 'Le guide complet',
    featureGuideDesc: 'Comprends les bases en 10 minutes. Processeur, mémoire, stockage, expliqués sans jargon.',
    featureGuideCta: 'Lire le guide →',

    featureComparatorTitle: 'M\'aider à choisir',
    featureComparatorDesc: 'Réponds à 5 questions simples et reçois une recommandation personnalisée selon ton usage et ton budget.',
    featureComparatorCta: 'Commencer →',

    featureGlossaryTitle: 'Lexique des termes',
    featureGlossaryDesc: 'Tu as vu "SSD NVMe" ou "RAM DDR5" et tu ne sais pas ce que ça veut dire ? On t\'explique.',
    featureGlossaryCta: 'Explorer le lexique →',

    reassurance1: 'Explications simples',
    reassurance1Desc: 'Pas de jargon, pas de condescendance',
    reassurance2: 'Rapide à lire',
    reassurance2Desc: 'L\'essentiel en moins de 10 min',
    reassurance3: 'Transparent',
    reassurance3Desc: 'Liens affiliés identifiés, conseils impartiaux',
    reassurance4: 'Pour tous',
    reassurance4Desc: 'Que tu aies 15 ou 75 ans',

    faqTitle: 'Questions fréquentes',
    faqSubtitle: 'Les vraies questions que tout le monde se pose',

    faq1Q: 'Combien dois-je dépenser pour un bon ordinateur ?',
    faq1A: 'Pour la plupart des usages courants (navigation, courriels, photos, vidéos), un budget de 500 à 800 $ suffit amplement. Il n\'est pas nécessaire de dépenser 1 500 $ sauf si tu fais de la vidéo 4K, du jeu vidéo exigeant, ou du travail professionnel spécialisé.',

    faq2Q: 'Portable ou ordinateur de bureau ?',
    faq2A: 'Un portable te suit partout mais coûte un peu plus cher pour les mêmes performances. Un ordinateur de bureau est plus puissant pour le même prix et plus facile à réparer, mais reste à la maison. Si tu te déplaces souvent ou travailles dans différentes pièces, le portable est idéal.',

    faq3Q: 'Mac ou Windows ?',
    faq3A: 'Les deux font très bien le travail. Windows offre plus de choix de modèles et de prix. Mac est apprécié pour sa simplicité, sa durabilité et son intégration avec iPhone/iPad. Le choix se fait souvent selon l\'habitude et l\'usage, notre guide t\'aide à y voir plus clair.',

    faq4Q: 'C\'est quoi la différence entre RAM et stockage ?',
    faq4A: 'La RAM, c\'est comme le bureau de travail : plus elle est grande, plus tu peux avoir de choses ouvertes en même temps. Le stockage (disque dur / SSD), c\'est l\'armoire où tu ranges tout. Un bureau encombré ralentit, une grande armoire bien rangée ne ralentit pas.',

    faqGlossaryHint: 'Perdu dans le jargon ? Consulte notre',
    faqGlossaryLink: 'lexique des termes informatiques',
    faqGlossaryEnd: 'pour tout comprendre en langage simple.',

    bottomCtaTitle: 'Prêt à trouver ton ordi idéal ?',
    bottomCtaSubtitle: 'Réponds à 5 questions et reçois une recommandation personnalisée gratuite.',
    bottomCtaButton: 'Commencer, c\'est gratuit →',
  },

  // ── Components ───────────────────────────────────────────
  comp: {
    cpu: 'Processeur',
    ram: 'Mémoire vive',
    ssd: 'Stockage',
    gpu: 'Carte graphique',
    battery: 'Batterie',
    screen: 'Écran',
  },
} satisfies Record<string, Record<string, string>>

export default fr

// Use a widened type so en.ts can have different string values
export type Dictionary = { [K in keyof typeof fr]: { [K2 in keyof (typeof fr)[K]]: string } }
