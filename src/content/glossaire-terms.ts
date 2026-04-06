export type GlossaryCategory = 'processor' | 'memory' | 'storage' | 'display' | 'connectivity' | 'ai' | 'power';

export type GlossaryTerm = {
  term: string;
  full: string;
  fr: string;
  def: string;
  example: string;
  category?: GlossaryCategory;
};

const termsFr: GlossaryTerm[] = [
  // ─── Processeurs ───────────────────────────────────────────
  {
    term: "CPU",
    full: "Central Processing Unit",
    fr: "Processeur",
    def: "Le cerveau de l'ordinateur. Il exécute toutes les instructions des programmes. Plus il est rapide (mesuré en GHz) et plus il a de « cœurs », plus l'ordinateur peut faire de choses à la fois rapidement.",
    example: "Intel Core i5-1335U, AMD Ryzen 5 7530U, Apple M3",
    category: "processor",
  },
  {
    term: "Core i3 / i5 / i7 / i9",
    full: "Intel Core i3, i5, i7, i9",
    fr: "Gammes de processeurs Intel",
    def: "Les quatre gammes de processeurs Intel. L'i3 est l'entrée de gamme (bureautique, navigation), l'i5 le milieu de gamme (excellent rapport qualité/prix pour la majorité), l'i7 le haut de gamme (multitâche intensif, création de contenu), l'i9 le sommet (stations de travail, usage professionnel). Le numéro après (ex : i5-1335U) indique la génération — plus c'est récent, mieux c'est. Depuis 2024, Intel propose aussi la gamme Core Ultra qui remplace progressivement les Core classiques.",
    example: "Core i3-1315U (bureau), Core i5-1345U (polyvalent), Core i7-13700H (création), Core i9-14900HX (pro)",
    category: "processor",
  },
  {
    term: "Core Ultra",
    full: "Intel Core Ultra (Meteor Lake / Arrow Lake)",
    fr: "Nouvelle gamme Intel avec NPU",
    def: "La nouvelle architecture de processeurs Intel lancée en 2024. Elle combine des cœurs de performance (P-cores), des cœurs efficaces (E-cores) et un NPU intégré pour l'intelligence artificielle. Disponible en Core Ultra 5, 7 et 9. Les Core Ultra consomment moins d'énergie que les anciens Core i, offrant une meilleure autonomie sur portable.",
    example: "Core Ultra 7 155H, Core Ultra 5 125U, Core Ultra 9 185H",
    category: "processor",
  },
  {
    term: "Ryzen",
    full: "AMD Ryzen",
    fr: "Gamme de processeurs AMD",
    def: "La gamme de processeurs d'AMD, concurrent direct d'Intel. Ryzen 3 = entrée de gamme, Ryzen 5 = milieu de gamme, Ryzen 7 = haut de gamme, Ryzen 9 = professionnel. AMD offre souvent un meilleur rapport performance/prix qu'Intel. Depuis 2024, la gamme Ryzen AI intègre un NPU dédié pour les tâches d'intelligence artificielle, avec des modèles comme le Ryzen AI 9 HX 370.",
    example: "Ryzen 5 7530U, Ryzen 7 7840U, Ryzen AI 9 HX 370",
    category: "processor",
  },
  {
    term: "Ryzen AI",
    full: "AMD Ryzen AI Series",
    fr: "Processeurs AMD avec IA intégrée",
    def: "La gamme de processeurs AMD équipée d'un NPU (Neural Processing Unit) intégré pour accélérer les tâches d'intelligence artificielle directement sur l'appareil, sans connexion internet. Disponible en Ryzen AI 5, 7 et 9. Ces processeurs répondent aux exigences Copilot+ PC de Microsoft avec plus de 40 TOPS de puissance IA.",
    example: "Ryzen AI 7 350, Ryzen AI 9 HX 370, Ryzen AI 9 365",
    category: "processor",
  },
  {
    term: "M1 / M2 / M3 / M4",
    full: "Apple Silicon M-series",
    fr: "Puces Apple Silicon",
    def: "Les processeurs conçus par Apple pour ses Mac. Remarquables pour leur efficacité énergétique (longue autonomie), leur performance et leur silence. Chaque nouvelle génération apporte des améliorations significatives. Chaque puce existe en version de base, Pro, Max et Ultra (du moins au plus puissant). Le M4 (2024-2025) intègre un NPU 16 cœurs compatible Apple Intelligence pour la génération de texte et d'images directement sur l'appareil.",
    example: "MacBook Air M3, MacBook Pro M4 Pro, Mac Studio M4 Max",
    category: "processor",
  },
  {
    term: "Celeron / Pentium",
    full: "Intel Celeron, Pentium (maintenant Intel Processor N-series)",
    fr: "Processeurs Intel d'entrée de gamme",
    def: "Les processeurs les plus abordables d'Intel, destinés aux usages légers : navigation web, bureautique, courriel. Depuis 2023, Intel les a renommés « Intel Processor » (série N) — par exemple Intel Processor N100. Suffisants pour un Chromebook ou un ordinateur scolaire, mais déconseillés pour le multitâche ou les logiciels exigeants.",
    example: "Intel Processor N100, Intel Processor N200, Celeron N5100",
    category: "processor",
  },
  {
    term: "NPU",
    full: "Neural Processing Unit",
    fr: "Unité de traitement neuronal",
    def: "Une puce dédiée à l'intelligence artificielle, intégrée directement dans les processeurs modernes. Le NPU accélère les tâches comme la reconnaissance vocale, le flou d'arrière-plan en visioconférence, la génération de texte et le traitement d'images — le tout localement, sans envoyer de données dans le cloud. Mesuré en TOPS (Trillions d'Opérations Par Seconde). Un PC Copilot+ nécessite au minimum 40 TOPS.",
    example: "NPU 16 cœurs (Apple M4), NPU à 50 TOPS (Ryzen AI 9)",
    category: "ai",
  },
  {
    term: "GHz",
    full: "Gigahertz",
    fr: "Gigahertz",
    def: "L'unité de mesure de la vitesse d'un processeur. Un processeur à 3,5 GHz effectue 3,5 milliards d'opérations par seconde. Plus le chiffre est élevé, plus le processeur est rapide — mais la génération et le nombre de cœurs comptent aussi beaucoup.",
    example: "2,4 GHz, 3,5 GHz, 5,0 GHz",
    category: "processor",
  },

  // ─── Mémoire ───────────────────────────────────────────────
  {
    term: "RAM",
    full: "Random Access Memory",
    fr: "Mémoire vive",
    def: "La mémoire de travail de l'ordinateur. Elle stocke temporairement les données des programmes en cours d'utilisation. Quand tu fermes un programme, les données disparaissent de la RAM. Plus tu en as, plus tu peux ouvrir de programmes en même temps. En 2025, 16 Go est le minimum recommandé pour un usage confortable.",
    example: "8 Go, 16 Go, 32 Go",
    category: "memory",
  },
  {
    term: "DDR4 / DDR5",
    full: "Double Data Rate 4 / 5",
    fr: "Générations de mémoire vive",
    def: "Les deux générations actuelles de mémoire RAM. DDR4 est le standard depuis 2015, fiable et abordable. DDR5, apparu en 2022, est plus rapide (jusqu'à 2× la bande passante) et plus efficace en énergie. Les processeurs récents (Intel 13e gen+, Ryzen 7000+) supportent DDR5. Les deux ne sont pas compatibles entre elles — il faut vérifier ce que la carte mère accepte.",
    example: "DDR4-3200 MHz, DDR5-5600 MHz",
    category: "memory",
  },
  {
    term: "LPDDR5",
    full: "Low Power DDR5",
    fr: "Mémoire vive basse consommation",
    def: "Une variante de DDR5 conçue spécialement pour les portables. Elle consomme moins d'énergie, ce qui prolonge l'autonomie de la batterie. Souvent soudée à la carte mère (non remplaçable). On la retrouve dans la plupart des ultrabooks et des MacBook. Les performances sont comparables à la DDR5 standard.",
    example: "LPDDR5-6400 (MacBook Air M3), LPDDR5X-7467",
    category: "memory",
  },

  // ─── Stockage ──────────────────────────────────────────────
  {
    term: "SSD",
    full: "Solid State Drive",
    fr: "Disque à état solide",
    def: "Un disque de stockage sans pièce mobile, beaucoup plus rapide qu'un disque dur classique. Ton ordinateur démarre en secondes, les programmes s'ouvrent presque instantanément. En 2025-2026, c'est la norme — on recommande au minimum un SSD de 512 Go. Les SSD NVMe sont encore plus rapides que les SSD SATA.",
    example: "SSD 512 Go, SSD NVMe 1 To",
    category: "storage",
  },
  {
    term: "HDD",
    full: "Hard Disk Drive",
    fr: "Disque dur",
    def: "L'ancien type de stockage utilisant un plateau magnétique qui tourne mécaniquement à 5 400 ou 7 200 tours/minute. Une tête de lecture se déplace au-dessus pour lire et écrire les données. Moins cher que le SSD pour la même capacité, mais beaucoup plus lent, fragile aux chocs et bruyant. On le retrouve encore dans certains ordinateurs de bureau pour stocker de grandes quantités de données à moindre coût.",
    example: "HDD 1 To, HDD 2 To",
    category: "storage",
  },
  {
    term: "NVMe",
    full: "Non-Volatile Memory Express",
    fr: "Interface de stockage rapide",
    def: "Un type de connexion pour les SSD qui les rend encore plus rapides. Un SSD NVMe est 5 à 7 fois plus rapide qu'un SSD classique (SATA). C'est la norme sur les ordinateurs récents de milieu et haut de gamme. Les SSD NVMe utilisent le format M.2, une petite carte qui se branche directement sur la carte mère.",
    example: "SSD NVMe M.2 512 Go",
    category: "storage",
  },
  {
    term: "SATA",
    full: "Serial Advanced Technology Attachment",
    fr: "Interface de connexion de stockage",
    def: "L'ancienne interface de connexion pour les disques de stockage (SSD et HDD). Un SSD SATA atteint au maximum 550 Mo/s en lecture — c'est rapide comparé à un HDD, mais lent comparé au NVMe (jusqu'à 7 000 Mo/s). Si ton ordinateur a un port M.2, privilégie un SSD NVMe plutôt que SATA.",
    example: "SSD SATA 2,5\" 500 Go, câble SATA III",
    category: "storage",
  },
  {
    term: "M.2",
    full: "Format M.2 (anciennement NGFF)",
    fr: "Format compact de SSD",
    def: "Un format physique de SSD : une petite carte rectangulaire (environ la taille d'un bâton de gomme) qui se branche directement sur la carte mère, sans câble. Attention : un SSD M.2 peut utiliser l'interface SATA ou NVMe — c'est l'interface NVMe qui donne les meilleures performances. Le format M.2 est standard dans les portables modernes.",
    example: "SSD M.2 NVMe 1 To, M.2 2280 (22 mm × 80 mm)",
    category: "storage",
  },
  {
    term: "PCIe Gen 4 / Gen 5",
    full: "PCI Express Generation 4 / 5",
    fr: "Versions de bus rapide",
    def: "Les versions de l'interface PCIe déterminent la vitesse maximale des SSD NVMe et des cartes graphiques. PCIe Gen 4 (standard en 2024) offre jusqu'à 7 Go/s pour un SSD. PCIe Gen 5 (2025+) double cette vitesse à environ 14 Go/s. En pratique, la différence se sent surtout pour les transferts de très gros fichiers — pour un usage courant, Gen 4 est amplement suffisant.",
    example: "SSD NVMe PCIe Gen 4 × 4, carte graphique PCIe Gen 5",
    category: "storage",
  },

  // ─── Affichage ─────────────────────────────────────────────
  {
    term: "Full HD",
    full: "1920 × 1080 pixels",
    fr: "Haute définition complète",
    def: "Une résolution d'écran standard offrant 1920 pixels en largeur et 1080 en hauteur (aussi appelé 1080p). C'est la résolution minimale recommandée pour un ordinateur en 2025. Suffisant pour les écrans jusqu'à 24-27 pouces.",
    example: "Écran 15\" Full HD, moniteur 24\" 1080p",
    category: "display",
  },
  {
    term: "4K",
    full: "3840 × 2160 pixels",
    fr: "Ultra haute définition",
    def: "Une résolution 4 fois plus précise que le Full HD. L'image est très nette, particulièrement sur les grands écrans (27\" et plus). Utile pour les photographes, les monteurs vidéo et ceux qui veulent le plus bel affichage possible.",
    example: "Moniteur 27\" 4K, MacBook Pro Retina",
    category: "display",
  },
  {
    term: "OLED",
    full: "Organic Light-Emitting Diode",
    fr: "Diode électroluminescente organique",
    def: "Une technologie d'écran où chaque pixel produit sa propre lumière. Résultat : des noirs parfaits (le pixel s'éteint complètement), un contraste infini et des couleurs éclatantes. On retrouve les écrans OLED sur les portables haut de gamme. Inconvénients : plus cher, risque de marquage (burn-in) avec des images fixes sur de longues périodes, et luminosité parfois inférieure aux LED classiques.",
    example: "ASUS ZenBook OLED, MacBook Pro avec écran OLED (futur)",
    category: "display",
  },
  {
    term: "IPS",
    full: "In-Plane Switching",
    fr: "Dalle IPS",
    def: "Le type de dalle le plus courant sur les ordinateurs de milieu et haut de gamme. Les écrans IPS offrent de bons angles de vision (l'image reste belle même vue de côté), des couleurs fidèles et un bon rendu général. C'est le meilleur choix polyvalent pour la bureautique, la création et l'usage quotidien.",
    example: "Moniteur IPS 27\" Full HD, portable avec dalle IPS",
    category: "display",
  },
  {
    term: "VA",
    full: "Vertical Alignment",
    fr: "Dalle VA",
    def: "Un type de dalle d'écran offrant un meilleur contraste que l'IPS (noirs plus profonds), mais avec des angles de vision plus étroits. Populaire pour les moniteurs de gaming et le visionnement multimédia. Un bon compromis entre IPS et les dalles TN si le contraste est ta priorité.",
    example: "Moniteur gaming VA 32\" 1440p, écran incurvé VA",
    category: "display",
  },
  {
    term: "TN",
    full: "Twisted Nematic",
    fr: "Dalle TN",
    def: "L'ancien type de dalle, avec un temps de réponse très rapide (1 ms), ce qui plaît aux joueurs compétitifs. Cependant, les couleurs sont ternes et les angles de vision très étroits. En 2025, les dalles IPS rapides ont largement rattrapé le TN en temps de réponse, rendant le TN de moins en moins pertinent.",
    example: "Moniteur TN 24\" 240 Hz (esport)",
    category: "display",
  },
  {
    term: "Mini-LED",
    full: "Mini Light-Emitting Diode",
    fr: "Rétro-éclairage Mini-LED",
    def: "Une technologie de rétro-éclairage utilisant des milliers de petites LED regroupées en zones de gradation locale. Cela permet un contraste élevé (proche de l'OLED) avec une luminosité supérieure, sans risque de marquage. On la retrouve sur les écrans premium comme le MacBook Pro 14\"/16\" ou certains moniteurs haut de gamme.",
    example: "MacBook Pro 16\" Mini-LED, iPad Pro Mini-LED",
    category: "display",
  },
  {
    term: "Taux de rafraîchissement (Hz)",
    full: "Refresh Rate (Hertz)",
    fr: "Fréquence de rafraîchissement",
    def: "Le nombre de fois par seconde que l'écran met à jour son image. 60 Hz = 60 images/s (standard), 120 Hz = 120 images/s (fluide), 144-165 Hz = gaming compétitif. Un taux élevé rend le défilement, les animations et les jeux plus fluides. Pour la bureautique, 60 Hz suffit. Pour les jeux ou si tu apprécies la fluidité, 120 Hz minimum est recommandé.",
    example: "60 Hz (standard), 120 Hz (ProMotion), 165 Hz (gaming)",
    category: "display",
  },

  // ─── GPU ───────────────────────────────────────────────────
  {
    term: "GPU",
    full: "Graphics Processing Unit",
    fr: "Processeur graphique / Carte graphique",
    def: "Le composant qui gère l'affichage, les graphismes et les vidéos. Pour un usage courant, le GPU intégré au processeur suffit. Pour les jeux vidéo ou le montage vidéo professionnel, une carte graphique dédiée est recommandée. La VRAM (mémoire vidéo) est dédiée au GPU : 4 Go minimum pour du gaming léger, 8 Go+ pour du gaming sérieux ou du montage 4K. La génération de la carte compte autant que la quantité de VRAM.",
    example: "NVIDIA GeForce RTX 4060 (8 Go VRAM), AMD Radeon RX 7600",
    category: "display",
  },

  // ─── Connectivité ──────────────────────────────────────────
  {
    term: "Wi-Fi 6 / 6E / 7",
    full: "IEEE 802.11ax / 802.11be",
    fr: "Normes Wi-Fi modernes",
    def: "Les générations récentes de Wi-Fi. Wi-Fi 6 (2020) est plus rapide et plus stable, surtout avec beaucoup d'appareils connectés. Wi-Fi 6E (2021) ajoute la bande 6 GHz pour moins d'interférences. Wi-Fi 7 (2024) introduit le multi-link (connexion simultanée sur plusieurs bandes) et atteint théoriquement 46 Gbit/s. Pour la plupart des gens, Wi-Fi 6 ou 6E est amplement suffisant.",
    example: "Wi-Fi 6 (802.11ax), Wi-Fi 6E, Wi-Fi 7 (802.11be)",
    category: "connectivity",
  },
  {
    term: "USB-C",
    full: "Universal Serial Bus Type-C",
    fr: "Port USB-C",
    def: "Un connecteur moderne, petit et réversible (tu ne peux pas te tromper de sens !). Il peut transférer des données, charger l'appareil et envoyer un signal vidéo vers un écran externe — tout par le même câble. De plus en plus standard sur les portables récents.",
    example: "Thunderbolt 4, USB 3.2 Gen 2",
    category: "connectivity",
  },
  {
    term: "Thunderbolt 4 / 5",
    full: "Thunderbolt (Intel)",
    fr: "Thunderbolt",
    def: "Un port USB-C avec des capacités supérieures. Thunderbolt 4 (2020) offre 40 Gbit/s, la connexion à deux écrans 4K et la charge rapide. Thunderbolt 5 (2024) double la vitesse à 80 Gbit/s (120 Gbit/s en mode asymétrique) et supporte un écran 8K ou trois écrans 4K. Développé par Intel en partenariat avec Apple. Identifié par un logo éclair ⚡.",
    example: "Thunderbolt 4 (40 Gbit/s), Thunderbolt 5 (80 Gbit/s)",
    category: "connectivity",
  },
  {
    term: "HDMI 2.1",
    full: "High-Definition Multimedia Interface 2.1",
    fr: "Port vidéo HDMI",
    def: "Le port vidéo le plus courant pour connecter un ordinateur à un moniteur, un projecteur ou une télévision. La version 2.1 supporte la 4K à 120 Hz, la 8K à 60 Hz, le VRR (taux de rafraîchissement variable pour les jeux) et l'eARC (son surround haute qualité). Les versions plus anciennes (HDMI 2.0) sont limitées à la 4K à 60 Hz.",
    example: "HDMI 2.1 (4K@120Hz), HDMI 2.0 (4K@60Hz)",
    category: "connectivity",
  },
  {
    term: "DisplayPort",
    full: "DisplayPort 1.4 / 2.1",
    fr: "Port d'affichage",
    def: "Un port vidéo alternatif au HDMI, souvent utilisé sur les moniteurs de bureau et les cartes graphiques. DisplayPort 1.4 supporte la 4K à 120 Hz et la 8K à 30 Hz. Il permet le daisy-chain (relier plusieurs écrans en série avec un seul câble depuis le PC). Disponible aussi en version USB-C (DisplayPort Alt Mode).",
    example: "DisplayPort 1.4 (moniteur gaming), DP 2.1 (8K)",
    category: "connectivity",
  },
  {
    term: "Bluetooth 5.3",
    full: "Bluetooth 5.3",
    fr: "Bluetooth",
    def: "La norme sans fil pour connecter des accessoires à courte portée : casques audio, claviers, souris, manettes. La version 5.3 (2023+) offre une connexion plus stable, une latence réduite et une meilleure autonomie pour les appareils connectés. Pratiquement tous les portables modernes incluent au minimum Bluetooth 5.0.",
    example: "Bluetooth 5.3 (AirPods Pro), Bluetooth 5.0 (casque gaming)",
    category: "connectivity",
  },

  // ─── IA ────────────────────────────────────────────────────
  {
    term: "Copilot+ PC",
    full: "Microsoft Copilot+ PC",
    fr: "PC compatible Copilot+",
    def: "Un label de Microsoft désignant les PC portables équipés d'un NPU offrant au moins 40 TOPS de puissance IA. Ces ordinateurs peuvent exécuter des fonctions d'IA avancées localement (sans internet) : sous-titres en temps réel, effets de visioconférence, génération d'images, recherche intelligente dans les fichiers. Requiert un processeur récent comme Snapdragon X Elite, Intel Core Ultra ou AMD Ryzen AI.",
    example: "Surface Laptop 7 (Copilot+ PC), Lenovo Yoga Slim 7x",
    category: "ai",
  },
  {
    term: "Apple Intelligence",
    full: "Apple Intelligence",
    fr: "Suite IA d'Apple",
    def: "La suite de fonctionnalités d'intelligence artificielle intégrée aux appareils Apple équipés d'une puce M1 ou plus récente (M4 recommandé). Inclut la génération de texte, la création d'images, le résumé automatique, les notifications intelligentes et Siri amélioré — le tout traité localement sur l'appareil pour protéger la vie privée. Disponible depuis macOS Sequoia et iOS 18.1.",
    example: "Résumé de courriels (M3), Génération d'images (M4)",
    category: "ai",
  },

  // ─── Unités ────────────────────────────────────────────────
  {
    term: "Go",
    full: "Gigaoctet",
    fr: "Gigaoctet",
    def: "Unité de mesure de la mémoire et du stockage. 1 Go = 1 milliard d'octets. Une chanson MP3 prend environ 5 Mo (0,005 Go), un film en HD environ 4 Go, une photo 3-10 Mo. Ne pas confondre avec Gb (gigabit) qui est 8 fois moins.",
    example: "16 Go de RAM, 512 Go de stockage",
  },
  {
    term: "To",
    full: "Téraoctet",
    fr: "Téraoctet",
    def: "1 To = 1 000 Go. Les disques durs de grande capacité se mesurent souvent en téraoctets. Un To peut contenir environ 250 000 photos, 250 heures de vidéo HD ou 200 000 chansons.",
    example: "SSD 1 To, HDD 2 To",
  },

  // ─── Système ───────────────────────────────────────────────
  {
    term: "OS",
    full: "Operating System",
    fr: "Système d'exploitation",
    def: "Le logiciel de base qui fait fonctionner l'ordinateur et permet d'utiliser tous les autres programmes. Les trois principaux sont Windows (Microsoft), macOS (Apple) et Linux (gratuit et open source).",
    example: "Windows 11, macOS Sonoma, Ubuntu",
  },

  // ─── Batterie ──────────────────────────────────────────────
  {
    term: "mAh / Wh",
    full: "Milliampère-heure / Watt-heure",
    fr: "Capacité de batterie",
    def: "Unités qui mesurent la capacité d'une batterie. Plus le chiffre est élevé, plus la batterie dure longtemps en théorie. Les Wh sont plus précis pour comparer des batteries. Une bonne batterie de portable offre 50-70 Wh.",
    example: "70 Wh, 6000 mAh",
    category: "power",
  },
];

const termsEn: GlossaryTerm[] = [
  // ─── Processors ────────────────────────────────────────────
  {
    term: "CPU",
    full: "Central Processing Unit",
    fr: "Processor",
    def: "The brain of the computer. It executes all program instructions. The faster it is (measured in GHz) and the more cores it has, the more things the computer can do simultaneously and quickly.",
    example: "Intel Core i5-1335U, AMD Ryzen 5 7530U, Apple M3",
    category: "processor",
  },
  {
    term: "Core i3 / i5 / i7 / i9",
    full: "Intel Core i3, i5, i7, i9",
    fr: "Intel processor tiers",
    def: "Intel's four processor tiers. The i3 is entry-level (office work, browsing), the i5 is mid-range (excellent value for the majority), the i7 is high-end (heavy multitasking, content creation), and the i9 is the top tier (workstations, professional use). The number after (e.g., i5-1335U) indicates the generation — newer is better. Since 2024, Intel also offers the Core Ultra line, which is gradually replacing the classic Core series.",
    example: "Core i3-1315U (office), Core i5-1345U (all-around), Core i7-13700H (creative), Core i9-14900HX (pro)",
    category: "processor",
  },
  {
    term: "Core Ultra",
    full: "Intel Core Ultra (Meteor Lake / Arrow Lake)",
    fr: "New Intel line with NPU",
    def: "Intel's new processor architecture launched in 2024. It combines performance cores (P-cores), efficiency cores (E-cores), and a built-in NPU for artificial intelligence tasks. Available in Core Ultra 5, 7, and 9. Core Ultra processors consume less power than older Core i chips, offering better battery life on laptops.",
    example: "Core Ultra 7 155H, Core Ultra 5 125U, Core Ultra 9 185H",
    category: "processor",
  },
  {
    term: "Ryzen",
    full: "AMD Ryzen",
    fr: "AMD processor line",
    def: "AMD's processor lineup, a direct competitor to Intel. Ryzen 3 = entry-level, Ryzen 5 = mid-range, Ryzen 7 = high-end, Ryzen 9 = professional. AMD often offers better performance per dollar than Intel. Since 2024, the Ryzen AI line integrates a dedicated NPU for artificial intelligence tasks, with models like the Ryzen AI 9 HX 370.",
    example: "Ryzen 5 7530U, Ryzen 7 7840U, Ryzen AI 9 HX 370",
    category: "processor",
  },
  {
    term: "Ryzen AI",
    full: "AMD Ryzen AI Series",
    fr: "AMD processors with built-in AI",
    def: "AMD's processor line equipped with a built-in NPU (Neural Processing Unit) to accelerate AI tasks directly on the device, without an internet connection. Available in Ryzen AI 5, 7, and 9. These processors meet Microsoft's Copilot+ PC requirements with over 40 TOPS of AI processing power.",
    example: "Ryzen AI 7 350, Ryzen AI 9 HX 370, Ryzen AI 9 365",
    category: "processor",
  },
  {
    term: "M1 / M2 / M3 / M4",
    full: "Apple Silicon M-series",
    fr: "Apple Silicon chips",
    def: "Processors designed by Apple for its Mac computers. Remarkable for their energy efficiency (long battery life), performance, and quiet operation. Each new generation brings significant improvements. Each chip comes in base, Pro, Max, and Ultra variants (least to most powerful). The M4 (2024-2025) features a 16-core NPU compatible with Apple Intelligence for on-device text and image generation.",
    example: "MacBook Air M3, MacBook Pro M4 Pro, Mac Studio M4 Max",
    category: "processor",
  },
  {
    term: "Celeron / Pentium",
    full: "Intel Celeron, Pentium (now Intel Processor N-series)",
    fr: "Intel entry-level processors",
    def: "Intel's most affordable processors, designed for light use: web browsing, office work, and email. Since 2023, Intel has rebranded them as \"Intel Processor\" (N-series) — for example, Intel Processor N100. Good enough for a Chromebook or school computer, but not recommended for multitasking or demanding software.",
    example: "Intel Processor N100, Intel Processor N200, Celeron N5100",
    category: "processor",
  },
  {
    term: "NPU",
    full: "Neural Processing Unit",
    fr: "Neural processing unit",
    def: "A chip dedicated to artificial intelligence, built directly into modern processors. The NPU accelerates tasks like voice recognition, video call background blur, text generation, and image processing — all locally, without sending data to the cloud. Measured in TOPS (Trillions of Operations Per Second). A Copilot+ PC requires at least 40 TOPS.",
    example: "16-core NPU (Apple M4), 50 TOPS NPU (Ryzen AI 9)",
    category: "ai",
  },
  {
    term: "GHz",
    full: "Gigahertz",
    fr: "Gigahertz",
    def: "The unit of measurement for processor speed. A 3.5 GHz processor performs 3.5 billion operations per second. The higher the number, the faster the processor — but the generation and core count matter a lot too.",
    example: "2.4 GHz, 3.5 GHz, 5.0 GHz",
    category: "processor",
  },

  // ─── Memory ────────────────────────────────────────────────
  {
    term: "RAM",
    full: "Random Access Memory",
    fr: "Working memory",
    def: "The computer's working memory. It temporarily stores data from programs currently in use. When you close a program, the data disappears from RAM. The more you have, the more programs you can open at the same time. In 2025, 16 GB is the recommended minimum for comfortable use.",
    example: "8 GB, 16 GB, 32 GB",
    category: "memory",
  },
  {
    term: "DDR4 / DDR5",
    full: "Double Data Rate 4 / 5",
    fr: "RAM generations",
    def: "The two current generations of RAM memory. DDR4 has been the standard since 2015, reliable and affordable. DDR5, introduced in 2022, is faster (up to 2× the bandwidth) and more energy-efficient. Recent processors (Intel 13th gen+, Ryzen 7000+) support DDR5. The two are not compatible with each other — check what your motherboard accepts.",
    example: "DDR4-3200 MHz, DDR5-5600 MHz",
    category: "memory",
  },
  {
    term: "LPDDR5",
    full: "Low Power DDR5",
    fr: "Low-power RAM",
    def: "A variant of DDR5 designed specifically for laptops. It uses less power, extending battery life. Often soldered to the motherboard (not replaceable). Found in most ultrabooks and MacBooks. Performance is comparable to standard DDR5.",
    example: "LPDDR5-6400 (MacBook Air M3), LPDDR5X-7467",
    category: "memory",
  },

  // ─── Storage ───────────────────────────────────────────────
  {
    term: "SSD",
    full: "Solid State Drive",
    fr: "Solid state drive",
    def: "A storage drive with no moving parts, much faster than a traditional hard drive. Your computer boots in seconds and programs open almost instantly. In 2025-2026, SSDs are the standard — at least a 512 GB SSD is recommended. NVMe SSDs are even faster than SATA SSDs.",
    example: "SSD 512 GB, SSD NVMe 1 TB",
    category: "storage",
  },
  {
    term: "HDD",
    full: "Hard Disk Drive",
    fr: "Hard drive",
    def: "The older type of storage using a magnetic platter that spins mechanically at 5,400 or 7,200 RPM. A read/write head moves above it to access data. Cheaper than SSDs for the same capacity, but much slower, fragile to shocks, and noisy. Still found in some desktop computers for cost-effective bulk storage.",
    example: "HDD 1 TB, HDD 2 TB",
    category: "storage",
  },
  {
    term: "NVMe",
    full: "Non-Volatile Memory Express",
    fr: "Fast storage interface",
    def: "A connection type for SSDs that makes them even faster. An NVMe SSD is 5 to 7 times faster than a standard (SATA) SSD. It is the standard on recent mid-range and high-end computers. NVMe SSDs use the M.2 form factor, a small card that plugs directly into the motherboard.",
    example: "NVMe M.2 SSD 512 GB",
    category: "storage",
  },
  {
    term: "SATA",
    full: "Serial Advanced Technology Attachment",
    fr: "Storage connection interface",
    def: "The older connection interface for storage drives (SSDs and HDDs). A SATA SSD maxes out at about 550 MB/s read speed — that's fast compared to an HDD, but slow compared to NVMe (up to 7,000 MB/s). If your computer has an M.2 slot, choose an NVMe SSD over SATA.",
    example: "SATA 2.5\" SSD 500 GB, SATA III cable",
    category: "storage",
  },
  {
    term: "M.2",
    full: "M.2 form factor (formerly NGFF)",
    fr: "Compact SSD form factor",
    def: "A physical SSD form factor: a small rectangular card (about the size of a stick of gum) that plugs directly into the motherboard with no cables. Note: an M.2 SSD can use either SATA or NVMe interface — it's the NVMe interface that delivers the best performance. The M.2 form factor is standard in modern laptops.",
    example: "M.2 NVMe SSD 1 TB, M.2 2280 (22 mm × 80 mm)",
    category: "storage",
  },
  {
    term: "PCIe Gen 4 / Gen 5",
    full: "PCI Express Generation 4 / 5",
    fr: "Fast bus versions",
    def: "PCIe versions determine the maximum speed of NVMe SSDs and graphics cards. PCIe Gen 4 (standard in 2024) offers up to 7 GB/s for an SSD. PCIe Gen 5 (2025+) doubles that to about 14 GB/s. In practice, the difference is mostly felt when transferring very large files — for everyday use, Gen 4 is more than enough.",
    example: "NVMe PCIe Gen 4 × 4 SSD, PCIe Gen 5 graphics card",
    category: "storage",
  },

  // ─── Display ───────────────────────────────────────────────
  {
    term: "Full HD",
    full: "1920 × 1080 pixels",
    fr: "Full high definition",
    def: "A standard screen resolution offering 1,920 pixels in width and 1,080 in height (also called 1080p). It is the minimum recommended resolution for a computer in 2025. Sufficient for screens up to 24–27 inches.",
    example: "15\" Full HD display, 24\" 1080p monitor",
    category: "display",
  },
  {
    term: "4K",
    full: "3840 × 2160 pixels",
    fr: "Ultra high definition",
    def: "A resolution 4 times sharper than Full HD. The image is very crisp, especially on large screens (27\" and above). Useful for photographers, video editors, and anyone who wants the best possible display.",
    example: "27\" 4K monitor, MacBook Pro Retina",
    category: "display",
  },
  {
    term: "OLED",
    full: "Organic Light-Emitting Diode",
    fr: "Organic light-emitting diode",
    def: "A display technology where each pixel produces its own light. The result: perfect blacks (the pixel turns off completely), infinite contrast, and vibrant colors. Found on high-end laptops. Drawbacks: more expensive, risk of burn-in with static images over long periods, and sometimes lower brightness than traditional LED screens.",
    example: "ASUS ZenBook OLED, MacBook Pro with OLED (future)",
    category: "display",
  },
  {
    term: "IPS",
    full: "In-Plane Switching",
    fr: "IPS panel",
    def: "The most common panel type on mid-range and high-end computers. IPS screens offer wide viewing angles (the image stays clear even viewed from the side), accurate colors, and good overall rendering. The best all-around choice for office work, creative tasks, and daily use.",
    example: "27\" Full HD IPS monitor, laptop with IPS panel",
    category: "display",
  },
  {
    term: "VA",
    full: "Vertical Alignment",
    fr: "VA panel",
    def: "A display panel type offering better contrast than IPS (deeper blacks), but with narrower viewing angles. Popular for gaming monitors and multimedia viewing. A good compromise between IPS and TN panels if contrast is your priority.",
    example: "32\" 1440p VA gaming monitor, curved VA display",
    category: "display",
  },
  {
    term: "TN",
    full: "Twisted Nematic",
    fr: "TN panel",
    def: "The older panel type, with very fast response times (1 ms), which appeals to competitive gamers. However, colors are washed out and viewing angles are very narrow. In 2025, fast IPS panels have largely caught up with TN in response time, making TN increasingly irrelevant.",
    example: "24\" 240 Hz TN monitor (esports)",
    category: "display",
  },
  {
    term: "Mini-LED",
    full: "Mini Light-Emitting Diode",
    fr: "Mini-LED backlight",
    def: "A backlight technology using thousands of tiny LEDs grouped into local dimming zones. This allows high contrast (close to OLED) with superior brightness and no burn-in risk. Found on premium screens like the MacBook Pro 14\"/16\" and some high-end monitors.",
    example: "MacBook Pro 16\" Mini-LED, iPad Pro Mini-LED",
    category: "display",
  },
  {
    term: "Refresh Rate (Hz)",
    full: "Refresh Rate (Hertz)",
    fr: "Screen refresh rate",
    def: "The number of times per second the screen updates its image. 60 Hz = 60 frames/sec (standard), 120 Hz = 120 frames/sec (smooth), 144–165 Hz = competitive gaming. A higher rate makes scrolling, animations, and games feel smoother. For office work, 60 Hz is fine. For gaming or if you appreciate smoothness, 120 Hz or higher is recommended.",
    example: "60 Hz (standard), 120 Hz (ProMotion), 165 Hz (gaming)",
    category: "display",
  },

  // ─── GPU ───────────────────────────────────────────────────
  {
    term: "GPU",
    full: "Graphics Processing Unit",
    fr: "Graphics processor / Graphics card",
    def: "The component that handles display, graphics, and video. For everyday use, the GPU integrated into the processor is sufficient. For gaming or professional video editing, a dedicated graphics card is recommended. VRAM (video memory) is dedicated to the GPU: 4 GB minimum for light gaming, 8 GB+ for serious gaming or 4K editing. The card's generation matters as much as the amount of VRAM.",
    example: "NVIDIA GeForce RTX 4060 (8 GB VRAM), AMD Radeon RX 7600",
    category: "display",
  },

  // ─── Connectivity ──────────────────────────────────────────
  {
    term: "Wi-Fi 6 / 6E / 7",
    full: "IEEE 802.11ax / 802.11be",
    fr: "Modern Wi-Fi standards",
    def: "Recent Wi-Fi generations. Wi-Fi 6 (2020) is faster and more stable, especially with many connected devices. Wi-Fi 6E (2021) adds the 6 GHz band for less interference. Wi-Fi 7 (2024) introduces multi-link (simultaneous connection across multiple bands) and theoretically reaches 46 Gbps. For most people, Wi-Fi 6 or 6E is more than sufficient.",
    example: "Wi-Fi 6 (802.11ax), Wi-Fi 6E, Wi-Fi 7 (802.11be)",
    category: "connectivity",
  },
  {
    term: "USB-C",
    full: "Universal Serial Bus Type-C",
    fr: "USB-C port",
    def: "A modern, small, and reversible connector (you can't plug it in the wrong way!). It can transfer data, charge the device, and send a video signal to an external display — all through the same cable. Increasingly standard on recent laptops.",
    example: "Thunderbolt 4, USB 3.2 Gen 2",
    category: "connectivity",
  },
  {
    term: "Thunderbolt 4 / 5",
    full: "Thunderbolt (Intel)",
    fr: "Thunderbolt",
    def: "A USB-C port with superior capabilities. Thunderbolt 4 (2020) offers 40 Gbps, connection to two 4K displays, and fast charging. Thunderbolt 5 (2024) doubles the speed to 80 Gbps (120 Gbps in asymmetric mode) and supports an 8K display or three 4K displays. Developed by Intel in partnership with Apple. Identified by a lightning bolt logo ⚡.",
    example: "Thunderbolt 4 (40 Gbps), Thunderbolt 5 (80 Gbps)",
    category: "connectivity",
  },
  {
    term: "HDMI 2.1",
    full: "High-Definition Multimedia Interface 2.1",
    fr: "HDMI video port",
    def: "The most common video port for connecting a computer to a monitor, projector, or TV. Version 2.1 supports 4K at 120 Hz, 8K at 60 Hz, VRR (variable refresh rate for gaming), and eARC (high-quality surround sound). Older versions (HDMI 2.0) are limited to 4K at 60 Hz.",
    example: "HDMI 2.1 (4K@120Hz), HDMI 2.0 (4K@60Hz)",
    category: "connectivity",
  },
  {
    term: "DisplayPort",
    full: "DisplayPort 1.4 / 2.1",
    fr: "Display port",
    def: "An alternative video port to HDMI, commonly found on desktop monitors and graphics cards. DisplayPort 1.4 supports 4K at 120 Hz and 8K at 30 Hz. It allows daisy-chaining (connecting multiple monitors in series with a single cable from the PC). Also available in USB-C form (DisplayPort Alt Mode).",
    example: "DisplayPort 1.4 (gaming monitor), DP 2.1 (8K)",
    category: "connectivity",
  },
  {
    term: "Bluetooth 5.3",
    full: "Bluetooth 5.3",
    fr: "Bluetooth",
    def: "The wireless standard for connecting short-range accessories: headphones, keyboards, mice, and game controllers. Version 5.3 (2023+) offers a more stable connection, reduced latency, and better battery life for connected devices. Virtually all modern laptops include at least Bluetooth 5.0.",
    example: "Bluetooth 5.3 (AirPods Pro), Bluetooth 5.0 (gaming headset)",
    category: "connectivity",
  },

  // ─── AI ────────────────────────────────────────────────────
  {
    term: "Copilot+ PC",
    full: "Microsoft Copilot+ PC",
    fr: "Copilot+ compatible PC",
    def: "A Microsoft label for laptops equipped with an NPU offering at least 40 TOPS of AI processing power. These computers can run advanced AI features locally (without internet): real-time captions, video call effects, image generation, and smart file search. Requires a recent processor like Snapdragon X Elite, Intel Core Ultra, or AMD Ryzen AI.",
    example: "Surface Laptop 7 (Copilot+ PC), Lenovo Yoga Slim 7x",
    category: "ai",
  },
  {
    term: "Apple Intelligence",
    full: "Apple Intelligence",
    fr: "Apple AI suite",
    def: "Apple's integrated AI feature suite for devices with an M1 chip or newer (M4 recommended). Includes text generation, image creation, automatic summaries, smart notifications, and enhanced Siri — all processed locally on the device to protect privacy. Available since macOS Sequoia and iOS 18.1.",
    example: "Email summaries (M3), Image generation (M4)",
    category: "ai",
  },

  // ─── Units ─────────────────────────────────────────────────
  {
    term: "GB",
    full: "Gigabyte",
    fr: "Gigabyte",
    def: "A unit of measurement for memory and storage. 1 GB = 1 billion bytes. An MP3 song takes about 5 MB (0.005 GB), an HD movie about 4 GB, a photo 3–10 MB. Not to be confused with Gb (gigabit), which is 8 times smaller.",
    example: "16 GB of RAM, 512 GB of storage",
  },
  {
    term: "TB",
    full: "Terabyte",
    fr: "Terabyte",
    def: "1 TB = 1,000 GB. Large-capacity hard drives are often measured in terabytes. One TB can hold approximately 250,000 photos, 250 hours of HD video, or 200,000 songs.",
    example: "SSD 1 TB, HDD 2 TB",
  },

  // ─── System ────────────────────────────────────────────────
  {
    term: "OS",
    full: "Operating System",
    fr: "Operating system",
    def: "The fundamental software that runs the computer and allows you to use all other programs. The three main ones are Windows (Microsoft), macOS (Apple), and Linux (free and open source).",
    example: "Windows 11, macOS Sonoma, Ubuntu",
  },

  // ─── Battery ───────────────────────────────────────────────
  {
    term: "mAh / Wh",
    full: "Milliampere-hour / Watt-hour",
    fr: "Battery capacity",
    def: "Units that measure a battery's capacity. The higher the number, the longer the battery lasts in theory. Wh is more accurate for comparing batteries. A good laptop battery offers 50–70 Wh.",
    example: "70 Wh, 6000 mAh",
    category: "power",
  },
];

export const glossaryCategories: { id: GlossaryCategory; labelFr: string; labelEn: string }[] = [
  { id: 'processor', labelFr: 'Processeurs', labelEn: 'Processors' },
  { id: 'memory', labelFr: 'Mémoire', labelEn: 'Memory' },
  { id: 'storage', labelFr: 'Stockage', labelEn: 'Storage' },
  { id: 'display', labelFr: 'Affichage', labelEn: 'Display' },
  { id: 'connectivity', labelFr: 'Connectivité', labelEn: 'Connectivity' },
  { id: 'ai', labelFr: 'Intelligence artificielle', labelEn: 'Artificial Intelligence' },
  { id: 'power', labelFr: 'Alimentation', labelEn: 'Power' },
];

export function getGlossaryTerms(locale: string): GlossaryTerm[] {
  return locale === "fr" ? termsFr : termsEn;
}
