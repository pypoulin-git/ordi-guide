import type { Article } from './articles'

export const articles: Article[] = [
  {
    slug: 'processeur-cerveau-moteur-ordinateur',
    title: 'Le processeur : le cerveau (ou le moteur) de ton ordinateur',
    description: 'Comprends enfin ce qu\'est un processeur, pourquoi c\'est important, et comment choisir sans te faire avoir.',
    date: '2026-03-26',
    readTime: '6 min',
    category: 'Les bases',
    categoryColor: '#2563eb',
    icon: '🧠',
    tags: ['processeur'],
    featured: true,
    coverGradient: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #0891b2 100%)',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80&auto=format',
    gist: 'Le processeur (CPU), c\'est ce qui fait \"réfléchir\" ton ordinateur. Pour la plupart des gens, un Intel Core i5 ou AMD Ryzen 5 récent suffit amplement. Ne te laisse pas impressionner par les gros chiffres — un modèle récent de milieu de gamme bat souvent un haut de gamme d\'il y a 3 ans.',
    sections: [
      {
        title: 'C\'est quoi, un processeur ?',
        paragraphs: [
          'Si ton ordinateur était un corps humain, le processeur serait le cerveau. C\'est lui qui prend toutes les décisions, qui exécute chaque instruction, qui fait \"tourner\" chaque programme. Quand tu cliques sur un lien, ouvres une photo ou tapes du texte — c\'est le processeur qui gère tout ça.',
          'Si tu préfères l\'analogie automobile : le processeur, c\'est le moteur. C\'est la puissance brute qui fait avancer la machine. Un petit moteur 4 cylindres fera le travail pour la ville (naviguer sur le web), mais pour tracter une remorque (montage vidéo), il te faut quelque chose de plus costaud.',
          'Dans les deux cas, le principe est le même : plus le processeur est performant, plus l\'ordinateur réagit vite. Mais attention — \"plus performant\" ne veut pas toujours dire \"le plus cher\".',
        ],
      },
      {
        title: 'Intel ou AMD ? Et Apple dans tout ça ?',
        paragraphs: [
          'Deux grandes marques se partagent le marché : Intel et AMD. Les deux fabriquent d\'excellents processeurs, et la rivalité entre les deux a fait baisser les prix et monter la qualité. Aucun n\'est objectivement \"meilleur\" — ça dépend du modèle précis.',
          'Intel utilise des noms comme Core i3, i5, i7 et i9. AMD utilise Ryzen 3, 5, 7 et 9. Dans les deux cas, le chiffre après le nom indique le \"tier\" de puissance : 3 = entrée de gamme, 5 = milieu de gamme (le sweet spot), 7 = haut de gamme, 9 = enthousiastes.',
          'Apple fabrique ses propres puces depuis 2020 : les M1, M2, M3 et M4. Elles sont connues pour leur efficacité énergétique exceptionnelle — ton MacBook dure toute la journée sur une charge. Par contre, elles ne fonctionnent que dans les Mac.',
        ],
      },
      {
        title: 'Alors, lequel choisir ?',
        paragraphs: [
          'Pour la navigation web, les courriels et la bureautique : n\'importe quel processeur récent suffit. Un Intel Core i3 ou AMD Ryzen 3 fait très bien le travail. C\'est comme une voiture économique pour la ville — pas besoin d\'un V8.',
          'Pour le travail de bureau, les études et le multitâche léger : un Core i5 ou Ryzen 5. C\'est le choix idéal pour 80 % des gens. C\'est le cerveau bien reposé qui gère tout sans transpirer.',
          'Pour le montage vidéo, le graphisme ou le jeu : un Core i7/Ryzen 7 ou supérieur. C\'est le cerveau du chirurgien — précis, rapide, capable de gérer le stress. Ou si tu préfères : le moteur V6 turbo qui ne flanche pas en côte.',
          'Le piège classique : acheter un i7 ou i9 \"par sécurité\" alors que tu n\'en as pas besoin. C\'est comme acheter un pick-up F-150 pour aller à l\'épicerie. Ça marche, mais tu paies le prix fort pour rien.',
        ],
      },
      {
        title: 'Le truc que personne ne dit : la génération compte plus que le tier',
        paragraphs: [
          'Un Intel Core i5 de 2024 (14e génération) est plus rapide qu\'un Core i7 de 2020 (10e génération). Pourquoi ? Parce que chaque année, les processeurs deviennent plus efficaces. C\'est comme comparer un athlète de 25 ans à un athlète de 45 ans — l\'expérience ne compense pas toujours la jeunesse.',
          'Quand tu magasines, regarde la génération (le premier ou les deux premiers chiffres du numéro de modèle). Un i5-1340P est de 13e génération. Un i5-1440P est de 14e. Plus le chiffre est élevé, plus c\'est récent. Simple.',
          'Pour les puces Apple, c\'est encore plus simple : M4 > M3 > M2 > M1. Prends le plus récent que ton budget permet.',
        ],
      },
    ],
    ctaText: 'Tu sais maintenant quoi chercher côté processeur. Envie de savoir quel ordi te correspond ?',
  },
  {
    slug: 'ram-memoire-vive-poumons-transmission',
    title: 'La RAM : les poumons (ou la transmission) de ton ordi',
    description: '8, 16, 32 Go… C\'est quoi la RAM et combien t\'en faut vraiment ? On démystifie sans jargon.',
    date: '2026-03-26',
    readTime: '5 min',
    category: 'Les bases',
    categoryColor: '#2563eb',
    icon: '🫁',
    tags: ['ram'],
    coverImage: 'https://images.unsplash.com/photo-1591799265444-d66432b91588?w=800&q=80&auto=format',
    gist: 'La RAM, c\'est l\'espace de travail actif de ton ordinateur — pas le stockage permanent. 8 Go suffit pour les tâches de base, 16 Go est le standard recommandé en 2026, et 32 Go est réservé aux pros. Plus de RAM ≠ automatiquement plus rapide.',
    sections: [
      {
        title: 'La RAM, c\'est quoi exactement ?',
        paragraphs: [
          'La mémoire vive (RAM) est souvent confondue avec le stockage (disque dur/SSD). Pourtant, c\'est complètement différent. Le stockage, c\'est ton armoire — c\'est là que tes fichiers sont rangés quand l\'ordi est éteint. La RAM, c\'est ton bureau de travail — c\'est l\'espace où tu poses les choses sur lesquelles tu travailles en ce moment.',
          'En mode corps humain : la RAM, ce sont tes poumons. Plus ils sont grands, plus tu peux soutenir d\'efforts simultanés sans t\'essouffler. Avec 20 onglets Chrome ouverts, un fichier Excel, et Zoom en arrière-plan, il te faut du souffle.',
          'En mode automobile : la RAM, c\'est la transmission. Elle gère le flux entre le moteur (processeur) et les roues (tes programmes). Une transmission fluide à 6 rapports te permet de passer d\'une tâche à l\'autre sans à-coup. Une vieille boîte 3 vitesses ? Ça accroche à chaque changement.',
        ],
      },
      {
        title: 'Le grand mythe : \"plus de RAM = plus rapide\"',
        paragraphs: [
          'C\'est la croyance la plus répandue, et elle est à moitié fausse. Passer de 4 Go à 8 Go, ou de 8 Go à 16 Go, ça fait une vraie différence si tu manquais d\'espace. Mais passer de 16 Go à 32 Go quand tu ne fais que du web et du courriel ? Aucune différence perceptible.',
          'C\'est comme les poumons : un marathonien a besoin de poumons gigantesques. Mais pour marcher jusqu\'au dépanneur, tes poumons normaux suffisent amplement. Mettre des poumons de marathonien dans un marcheur ne le fera pas marcher plus vite.',
          'Pareil en mode auto : installer une transmission séquentielle à double embrayage dans une voiture qui ne dépasse jamais 50 km/h en ville, c\'est gaspiller de l\'argent.',
        ],
      },
      {
        title: 'Alors, combien de RAM pour toi ?',
        paragraphs: [
          '4 Go : le strict minimum. On n\'en recommande plus — c\'est trop juste même pour la navigation web moderne. Chrome à lui seul peut utiliser 3-4 Go avec quelques onglets. C\'est courir un marathon avec des poumons de fumeur.',
          '8 Go : suffisant pour un usage léger (navigation, courriels, Netflix, un document à la fois). C\'est le minimum acceptable en 2026, mais ça commence à serrer si tu ouvres beaucoup de choses.',
          '16 Go : le sweet spot. C\'est ce qu\'on recommande à tout le monde. Ça te donne de la marge pour le multitâche, les navigateurs gourmands, et les mises à jour qui consomment de plus en plus. C\'est le marathon confortable.',
          '32 Go et plus : uniquement si tu fais du montage vidéo 4K, de la modélisation 3D, du développement lourd ou du jeu exigeant. C\'est la catégorie athlète olympique.',
        ],
      },
      {
        title: 'Un détail important : la RAM se remplace rarement',
        paragraphs: [
          'Sur la plupart des portables modernes, la RAM est soudée à la carte mère. Ça veut dire que tu ne peux pas en ajouter après l\'achat. Si tu achètes un portable avec 8 Go, tu es bloqué à 8 Go pour toujours.',
          'Les ordinateurs de bureau sont plus flexibles — tu peux souvent ajouter ou remplacer les barrettes de RAM facilement.',
          'Le conseil : si tu hésites entre 8 et 16 Go sur un portable, choisis 16 Go. La différence de prix (souvent 50-100 $) vaut la tranquillité d\'esprit pour les 5 prochaines années. C\'est un investissement dans ta capacité pulmonaire numérique — ou si tu préfères, dans une transmission qui ne grincera pas.',
        ],
      },
    ],
    ctaText: 'Maintenant que tu comprends la RAM, envie de découvrir quel ordi est fait pour toi ?',
  },
  {
    slug: 'ssd-vs-hdd-stockage-ordinateur',
    title: 'SSD vs HDD : pourquoi ton vieux ordi est lent (et comment le sauver)',
    description: 'La différence entre un SSD et un disque dur classique, et pourquoi c\'est le changement le plus rentable que tu puisses faire.',
    date: '2026-03-26',
    readTime: '5 min',
    category: 'Achat malin',
    categoryColor: '#059669',
    icon: '💾',
    tags: ['stockage'],
    coverImage: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&q=80&auto=format',
    gist: 'Si ton ordinateur met 2 minutes à démarrer, c\'est probablement à cause du disque dur (HDD). Le remplacer par un SSD est le meilleur investissement possible — ton ordi démarrera en 15 secondes et tout sera plus rapide. Un SSD de 512 Go coûte environ 50-70 $.',
    sections: [
      {
        title: 'Le responsable n°1 de la lenteur : le disque dur classique',
        paragraphs: [
          'Tu connais cette frustration : tu allumes ton ordinateur, et tu dois attendre 2-3 minutes avant de pouvoir faire quoi que ce soit. Tu cliques sur Chrome et il met 30 secondes à s\'ouvrir. Tout est lent, tout rame. La plupart des gens pensent que leur ordinateur est \"vieux\" ou \"foutu\".',
          'La vraie cause dans 80 % des cas ? Le disque dur classique (HDD). C\'est un disque physique qui tourne à l\'intérieur de ton ordinateur, comme un vieux vinyle. Et comme un vieux tourne-disque, il a ses limites de vitesse.',
          'En mode corps humain : le HDD, c\'est une mémoire long terme qui fonctionne comme une vieille bibliothèque municipale. Pour retrouver un livre, il faut aller à la bonne étagère, au bon rayon, chercher par ordre alphabétique… Le SSD, c\'est une mémoire photographique — tu penses au fichier et il est là, instantanément.',
          'En mode automobile : le HDD, c\'est un coffre avec une seule petite trappe. Pour sortir les courses, tu dois tout passer une par une par cette ouverture étroite. Le SSD, c\'est un hayon à ouverture intégrale avec des compartiments organisés — tu accèdes à tout en un clin d\'œil.',
        ],
      },
      {
        title: 'Les chiffres qui parlent',
        paragraphs: [
          'Un disque dur classique (HDD) lit les données à environ 100 Mo par seconde. Un SSD standard lit à 500-550 Mo par seconde. Un SSD NVMe (la version premium) lit à 3 500-7 000 Mo par seconde.',
          'En termes concrets : le démarrage de Windows passe de 2 minutes (HDD) à 15 secondes (SSD). L\'ouverture d\'un programme passe de 30 secondes à 2-3 secondes. Le transfert d\'un gros dossier de photos passe de 10 minutes à 30 secondes.',
          'C\'est la différence la plus spectaculaire que tu puisses ressentir sur un ordinateur. Plus que le processeur, plus que la RAM — le passage au SSD est le changement qui transforme l\'expérience au quotidien.',
        ],
      },
      {
        title: 'Le meilleur investissement informatique : 60 $ qui changent tout',
        paragraphs: [
          'Voici le secret que les vendeurs ne te disent pas assez : si ton ordinateur a 3-5 ans et qu\'il est lent, tu n\'as probablement PAS besoin d\'un nouvel ordinateur. Tu as besoin d\'un SSD.',
          'Un SSD de 500 Go coûte entre 50 et 70 $ canadiens. L\'installation prend environ 30 minutes (ou 50-80 $ chez un technicien si tu préfères ne pas le faire toi-même). Et le résultat ? Ton vieil ordi se comporte comme un neuf.',
          'C\'est comme changer les pneus usés d\'une voiture en parfait état mécanique. Le moteur (processeur) et la transmission (RAM) sont encore bons — c\'est juste les pneus (le stockage) qui freinaient tout.',
          'Attention : cette astuce fonctionne sur les ordinateurs de bureau et certains portables plus anciens. Les portables récents ont déjà un SSD de série. Vérifie avant d\'acheter !',
        ],
      },
      {
        title: 'Quelle taille de SSD choisir ?',
        paragraphs: [
          '256 Go : le minimum vital. Ça suffit pour Windows, tes programmes et quelques documents. Mais si tu as beaucoup de photos, vidéos ou jeux, ça va se remplir vite. C\'est un petit coffre de citadine — parfait si tu voyages léger.',
          '512 Go : le choix recommandé. C\'est la taille idéale pour la plupart des gens. Tu as de la place pour tes programmes, tes photos, quelques films, et il te reste de la marge. C\'est le coffre d\'une berline — confortable pour le quotidien.',
          '1 To (1 000 Go) : pour ceux qui stockent beaucoup. Photos de famille, bibliothèque musicale, films, jeux vidéo. C\'est le coffre du SUV familial.',
          'Astuce : tu peux aussi utiliser le stockage en nuage (Google Drive, OneDrive, iCloud) pour décharger tes vieux fichiers et garder ton SSD léger. C\'est comme avoir un garage en plus de ton coffre.',
        ],
      },
      {
        title: 'SSD ou SSD NVMe ?',
        paragraphs: [
          'Il existe deux types de SSD. Le SSD SATA (le standard) se branche avec un câble classique et va à ~550 Mo/s. Le SSD NVMe se branche directement sur la carte mère et va à 3 500+ Mo/s.',
          'Pour un usage normal, la différence est imperceptible au quotidien. Tu ne sentiras pas la différence entre 550 Mo/s et 3 500 Mo/s en ouvrant Chrome. Là où le NVMe brille, c\'est pour le transfert de très gros fichiers (vidéo 4K, bases de données).',
          'Si tu remplaces le disque dur d\'un vieux PC : prends un SSD SATA — c\'est compatible avec tout et ça coûte moins cher. Si tu achètes un ordinateur neuf : il aura probablement un NVMe de série, et c\'est très bien.',
        ],
      },
    ],
    ctaText: 'Tu comprends maintenant pourquoi le SSD change tout. Prêt à trouver l\'ordi qui te correspond ?',
  },
  {
    slug: 'mac-vs-pc-lequel-choisir',
    title: 'Mac vs PC : lequel est fait pour toi ?',
    description: 'Le grand débat expliqué sans fanatisme. On compare honnêtement les forces et faiblesses de chaque camp pour t\'aider à choisir.',
    date: '2026-03-26',
    readTime: '7 min',
    category: 'Comparatifs',
    categoryColor: '#7c3aed',
    icon: '⚖️',
    tags: ['chromebook'],
    featured: false,
    coverGradient: 'linear-gradient(135deg, #1a1a2e 0%, #7c3aed 50%, #0f172a 100%)',
    coverImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80&auto=format',
    gist: 'Il n\'y a pas de \"meilleur\" — il y a celui qui correspond à TA vie. Mac si tu veux de la simplicité, de l\'autonomie et un écosystème Apple intégré. PC si tu veux du choix, des prix variés et la compatibilité avec tout. Les deux font le même travail pour 90 % des gens.',
    sections: [
      {
        title: 'Oublie les guerres de religion',
        paragraphs: [
          'Sur Internet, le débat Mac vs PC ressemble souvent à une guerre de religion. Les fans d\'Apple jurent que tout le reste est de la camelote. Les fans de PC trouvent qu\'Apple est hors de prix pour ce que c\'est. La vérité ? Les deux camps ont raison… et tort.',
          'Un Mac et un PC font exactement les mêmes choses pour la majorité des utilisateurs : naviguer sur le web, envoyer des courriels, regarder Netflix, travailler sur des documents, faire des appels vidéo. La différence est dans le comment, pas dans le quoi.',
          'C\'est comme comparer Toyota et Honda. Les deux te mènent du point A au point B de manière fiable. La question c\'est : lequel correspond mieux à ton style de conduite, ton budget, et tes besoins spécifiques ?',
        ],
      },
      {
        title: 'Les forces du Mac',
        paragraphs: [
          'La simplicité d\'utilisation. macOS est conçu pour être intuitif. Il y a moins de paramètres à configurer, moins de choix complexes à faire, moins de messages d\'erreur cryptiques. Si tu ne veux pas te casser la tête avec la technologie, le Mac réduit les frictions.',
          'L\'autonomie de la batterie. Depuis les puces Apple Silicon (M1 à M4), les MacBook ont une autonomie spectaculaire — 12 à 18 heures réelles pour la plupart des modèles. C\'est le marathon complet sans recharge. Les portables PC s\'en approchent, mais peu égalent ça.',
          'L\'écosystème Apple. Si tu as déjà un iPhone, des AirPods ou un iPad, tout communique ensemble automatiquement. Tu copies un texte sur ton iPhone et tu le colles sur ton Mac. Tu reçois tes iMessages sur l\'ordinateur. C\'est un confort réel au quotidien.',
          'La durabilité et la revente. Les Mac gardent leur valeur beaucoup plus longtemps. Un MacBook de 4 ans se revend encore à un bon prix, alors qu\'un portable PC du même âge vaut presque rien. C\'est comme une voiture qui ne déprécie presque pas.',
        ],
      },
      {
        title: 'Les forces du PC',
        paragraphs: [
          'Le choix. Il existe des milliers de modèles PC à tous les prix : 400 $, 800 $, 1 500 $, 3 000 $. Des portables ultra-légers aux tours de jeu monstrueuses. C\'est le marché le plus vaste — tu peux trouver exactement ce qui te convient.',
          'Le prix d\'entrée. Un bon portable PC pour le quotidien coûte 500-700 $. Le MacBook le moins cher est à 1 299 $. Si ton budget est serré, le PC est mathématiquement plus accessible. C\'est la différence entre acheter neuf et acheter haut de gamme.',
          'La compatibilité logicielle. Windows fait tourner pratiquement tous les logiciels du marché. Certains outils professionnels (comptabilité, ingénierie, certains jeux) n\'existent que sur Windows. Si ton employeur ou ton école utilise des logiciels spécifiques, vérifie la compatibilité Mac avant d\'acheter.',
          'La réparabilité. Sur beaucoup de portables et tous les PC de bureau, tu peux remplacer la RAM, le SSD, la batterie. Sur un Mac, presque tout est soudé — si quelque chose brise après la garantie, la facture est salée. Le PC est la voiture que ton mécanicien de quartier peut réparer.',
        ],
      },
      {
        title: 'Le vrai critère : ton écosystème et ton budget',
        paragraphs: [
          'Si tu es déjà dans l\'univers Apple (iPhone, iPad, AirPods) et que ton budget le permet : le Mac est probablement le meilleur choix pour toi. L\'intégration entre les appareils est un confort quotidien difficile à reproduire.',
          'Si tu utilises un téléphone Android, si ton budget est limité, ou si tu as besoin de logiciels spécifiques à Windows : un PC est le choix logique. Tu auras plus de choix et tu paieras moins pour des performances équivalentes.',
          'Si tu es étudiant : regarde les rabais éducation. Apple offre 10-15 % de rabais aux étudiants, et beaucoup de fabricants PC font pareil. Un MacBook Air M3 à prix étudiant reste un excellent investissement sur 5 ans.',
          'Dans tous les cas, ne te laisse pas influencer par le prestige de la marque. Un PC à 800 $ qui répond parfaitement à tes besoins est un meilleur achat qu\'un MacBook Pro à 2 500 $ dont tu n\'utilises que 20 % des capacités.',
        ],
      },
    ],
    ctaText: 'Tu sais maintenant ce qui te convient le mieux. On t\'aide à trouver le modèle parfait ?',
  },
  {
    slug: 'comprendre-processeurs-intel-amd-generations',
    title: 'Intel Core Ultra, AMD Ryzen : comprendre les générations de processeurs en 2026',
    description: 'Intel a tout changé avec les Core Ultra. AMD pousse avec les Ryzen AI. On t\'explique comment décoder les noms et choisir sans te perdre.',
    date: '2026-03-26',
    readTime: '8 min',
    category: 'Tendances',
    categoryColor: '#d97706',
    icon: '⚡',
    tags: ['processeur'],
    featured: false,
    coverGradient: 'linear-gradient(135deg, #d97706 0%, #1e293b 50%, #0891b2 100%)',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80&auto=format',
    gist: 'Intel a abandonné les vieux noms (Core i5, i7) pour les Core Ultra 5, Ultra 7 et Ultra 9 avec NPU intégré pour l\'IA. AMD a renommé ses Ryzen avec des suffixes comme HX, HS, U. Le truc à retenir : regarde la génération (plus récent = mieux) et le tier (5 = milieu de gamme parfait). Le reste, c\'est du marketing.',
    sections: [
      {
        title: 'Pourquoi c\'est devenu si compliqué ?',
        paragraphs: [
          'Pendant des années, c\'était simple : Intel Core i3, i5, i7, i9. Plus le chiffre est gros, plus c\'est puissant. Mais en 2024, Intel a décidé de tout chambouler avec une nouvelle gamme appelée Core Ultra. Et AMD n\'est pas en reste avec ses propres changements de noms.',
          'Le résultat ? Quand tu magasines un ordinateur en 2026, tu tombes sur des noms comme « Intel Core Ultra 7 268V » ou « AMD Ryzen AI 9 HX 370 ». Ça fait peur. Mais pas de panique — derrière le jargon, la logique est simple.',
          'Pense aux générations de processeurs comme aux modèles d\'auto. Une Civic 2026 est meilleure qu\'une Civic 2020, même si elles portent le même nom. Pour les processeurs, c\'est pareil : la génération (l\'année) compte plus que le tier (le niveau).',
        ],
      },
      {
        title: 'Intel Core Ultra : la nouvelle ère',
        paragraphs: [
          'Intel a remplacé ses Core i3/i5/i7/i9 par les Core Ultra 5, Ultra 7 et Ultra 9. Le changement n\'est pas juste cosmétique — les Core Ultra ont une architecture complètement repensée avec trois types de cœurs : des cœurs de performance (P-cores), des cœurs d\'efficacité (E-cores), et des cœurs basse consommation (LP E-cores).',
          'La grande nouveauté : le NPU (Neural Processing Unit). C\'est une puce dédiée à l\'intelligence artificielle intégrée directement dans le processeur. Elle accélère les tâches IA comme la suppression de bruit en visioconférence, la retouche photo automatique, ou les fonctions Copilot de Windows.',
          'Pour décoder le nom : Core Ultra 7 268V → Ultra 7 = tier haut de gamme, 2 = 2e génération de Core Ultra (Lunar Lake), 68 = variante du modèle, V = très basse consommation (pour les ultrabooks). La série 200 est la génération actuelle en 2026.',
          'Ce qu\'il faut retenir : Core Ultra 5 = excellent pour 80 % des gens. Core Ultra 7 = multitâche intensif et créatifs. Core Ultra 9 = enthousiastes et pros. Les « anciens » Core i5/i7 existent encore dans les PC de bureau et certains portables budget — ils restent de bons processeurs.',
        ],
      },
      {
        title: 'AMD Ryzen : la riposte intelligente',
        paragraphs: [
          'AMD a aussi modernisé sa gamme. Les Ryzen 7000 et 8000 pour les portables utilisent maintenant des suffixes précis : U = ultra basse consommation (ultrabooks), HS = performance équilibrée, HX = performance maximale (gaming/création), C = Chromebooks.',
          'AMD a aussi lancé les « Ryzen AI » — sa propre gamme avec NPU intégré. Les Ryzen AI 9 HX 370 ou Ryzen AI 7 350 sont les équivalents directs des Core Ultra d\'Intel, avec des capacités IA similaires.',
          'L\'avantage historique d\'AMD : un excellent rapport qualité-prix. Un Ryzen 7 coûte souvent le même prix qu\'un Core i5/Ultra 5 pour des performances similaires ou supérieures. C\'est le Honda Civic qui offre plus d\'équipements de série que la Toyota Corolla au même prix.',
          'Pour les PC de bureau, AMD domine avec les Ryzen 9000 (architecture Zen 5). En portable, la bataille est serrée — les deux marques sont excellentes et le choix se fait souvent sur le modèle d\'ordinateur lui-même plutôt que sur la marque du processeur.',
        ],
      },
      {
        title: 'Le guide pratique : comment choisir en 2026',
        paragraphs: [
          'Règle n°1 : la génération d\'abord. Un Core Ultra 5 de 2026 bat un Core i7 de 2022. Un Ryzen 5 8600 bat un Ryzen 7 5800 dans la plupart des tâches. Toujours prioriser le plus récent dans ton budget.',
          'Règle n°2 : le tier ensuite. Ultra 5 / Ryzen 5 = le sweet spot pour la majorité. Ultra 7 / Ryzen 7 = si tu fais du multitâche lourd, de la création de contenu ou du jeu. Ultra 9 / Ryzen 9 = seulement si tu sais exactement pourquoi tu en as besoin.',
          'Règle n°3 : ignore le NPU (pour l\'instant). Les fonctions IA sur PC sont encore à leurs débuts en 2026. Le NPU est un bonus sympa, pas un critère d\'achat déterminant. Ne paie pas plus cher juste pour « l\'IA intégrée » — ça viendra naturellement avec les processeurs récents.',
          'Règle n°4 : compare les benchmarks, pas les noms. Des sites comme Notebookcheck, PassMark ou UserBenchmark te donnent des scores de performance réels. Un processeur avec un nom impressionnant peut être dépassé par un modèle au nom plus modeste. C\'est la puissance réelle du moteur qui compte, pas le logo sur le capot.',
        ],
      },
    ],
    ctaText: 'Les processeurs n\'ont plus de secret pour toi. On trouve ensemble l\'ordi parfait ?',
  },
  {
    slug: 'ports-usb-c-thunderbolt-guide-complet',
    title: 'USB-C, Thunderbolt, HDMI : le guide complet des ports de ton ordi',
    description: 'Tous les ports se ressemblent mais ne font pas la même chose. On t\'explique lesquels sont essentiels et pourquoi l\'USB-C change tout.',
    date: '2026-03-26',
    readTime: '7 min',
    category: 'Connectique',
    categoryColor: '#0891b2',
    icon: '🔌',
    tags: [],
    featured: false,
    coverGradient: 'linear-gradient(135deg, #0891b2 0%, #1e293b 50%, #2563eb 100%)',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80&auto=format',
    gist: 'L\'USB-C est LE port universel de 2026 — il fait tout : données, vidéo ET charge de ton portable avec un seul câble. Thunderbolt 4/5 est la version premium de l\'USB-C (même forme, plus rapide). Vérifie toujours si ton USB-C peut charger ton portable (Power Delivery) et combien de watts il supporte.',
    sections: [
      {
        title: 'Pourquoi les ports sont importants',
        paragraphs: [
          'Les ports, ce sont les prises sur les côtés de ton ordinateur. C\'est par là que tu branches tout : clé USB, écran externe, chargeur, souris, casque, imprimante. Plus tu as de ports (et les bons types), plus ton ordi est polyvalent.',
          'Le problème : les fabricants réduisent le nombre de ports pour rendre les portables plus minces. Un MacBook Air n\'a que 2 ports USB-C. Certains portables ultra-fins n\'ont même plus de prise HDMI. C\'est frustrant quand tu veux brancher un écran, un clavier et une souris en même temps.',
          'En mode automobile : les ports, c\'est comme les prises 12V, les ports USB et les fixations ISOFIX dans une voiture. Si ta voiture n\'a qu\'une seule prise USB à l\'avant, bonne chance pour charger 3 téléphones en road trip. Les bons ports au bon endroit changent ton quotidien.',
        ],
      },
      {
        title: 'Le roi : USB-C (et pourquoi il change tout)',
        paragraphs: [
          'L\'USB-C est le port le plus important à comprendre en 2026. C\'est le petit port ovale et réversible (tu peux le brancher dans les deux sens, fini le syndrome du \"j\'ai le mauvais côté\"). Il remplace progressivement TOUS les autres ports.',
          'Ce qui rend l\'USB-C révolutionnaire, c\'est qu\'un seul port peut tout faire : transférer des données (fichiers, clé USB), envoyer une image vidéo (brancher un écran), ET charger ton portable. Un câble, trois fonctions. C\'est comme si ta prise électrique à la maison pouvait aussi faire passer l\'eau et Internet.',
          'Le piège : tous les ports USB-C ne sont pas égaux. Un USB-C \"basique\" ne transfère que des données à 480 Mb/s. Un USB-C 3.2 va jusqu\'à 20 Gb/s. Un Thunderbolt 4 (même forme USB-C) va à 40 Gb/s. Et tous ne supportent pas la charge ou la vidéo. La forme est identique, mais les capacités varient énormément.',
          'L\'analogie : c\'est comme les autoroutes. Une route de campagne et une autoroute à 6 voies se ressemblent (c\'est du bitume avec des lignes), mais la capacité de trafic est très différente. Le logo à côté du port (un petit éclair ⚡ pour Thunderbolt) t\'indique la \"taille de l\'autoroute\".',
        ],
      },
      {
        title: 'La charge par USB-C : un seul câble pour tout',
        paragraphs: [
          'La technologie USB Power Delivery (USB PD) permet de charger ton portable par USB-C. C\'est un changement majeur : fini les chargeurs propriétaires différents pour chaque marque. Un seul chargeur USB-C universel peut alimenter ton portable, ton téléphone, ta tablette et même certains moniteurs.',
          'Les watts comptent. Un téléphone se charge à 20-30W. Un ultrabook léger a besoin de 45-65W. Un portable de performance demande 100-140W. Un portable de gaming peut exiger 180-240W. Ton chargeur doit fournir assez de watts, sinon ton portable charge trop lentement ou pas du tout.',
          'Le gros avantage : quand tu voyages, tu n\'as besoin que d\'un seul chargeur GaN compact (un petit cube de la taille d\'un deck de cartes) pour alimenter tous tes appareils. Certains modèles à 100W ont même 2-3 ports pour tout charger en même temps.',
          'L\'Union européenne a rendu l\'USB-C obligatoire sur tous les appareils portables depuis 2024. Le Canada suit la tendance. Résultat : d\'ici quelques années, tu n\'auras plus qu\'un type de câble dans ta maison. Un rêve devenu réalité.',
        ],
      },
      {
        title: 'Les autres ports à connaître',
        paragraphs: [
          'HDMI : le port vidéo classique pour brancher un écran ou un téléviseur. Toujours utile si tu fais des présentations ou si tu veux un deuxième écran. HDMI 2.1 supporte le 4K à 120 Hz — largement suffisant pour tout le monde.',
          'USB-A : le gros port USB rectangulaire \"classique\" qu\'on connaît depuis 20 ans. Encore utile pour les clés USB, souris filaires, et vieux périphériques. Il disparaît progressivement des portables neufs, mais un adaptateur USB-C vers USB-A coûte 10 $ et résout le problème.',
          'Prise casque 3.5 mm : le bon vieux jack audio. Encore présent sur la plupart des portables (même Apple l\'a gardé). Indispensable si tu utilises un casque filaire ou un micro pour les appels.',
          'Lecteur de carte SD : pratique pour les photographes et vidéastes. Absent des portables les plus fins, mais disponible via un petit adaptateur USB-C.',
          'Thunderbolt 4/5 : ressemble à un USB-C (c\'est la même prise), mais beaucoup plus rapide et polyvalent. C\'est le port premium qui permet de brancher un dock et faire passer données + vidéo + charge sur un seul câble. Identifiable par le petit logo ⚡ à côté du port.',
        ],
      },
      {
        title: 'Combien de ports te faut-il ?',
        paragraphs: [
          'Usage nomade (café, école, réunions) : 2 USB-C suffisent. Tu branches ton chargeur d\'un côté et c\'est parti. Pour le reste, le WiFi et le Bluetooth font le travail.',
          'Bureau à la maison / télétravail : 1 USB-C (ou Thunderbolt) + 1 HDMI + 2 USB-A est l\'idéal. Ça te permet un écran externe, un clavier, une souris, et une clé USB sans adaptateur. Ou mieux encore : un seul port Thunderbolt + un dock (on en parle dans un prochain article).',
          'Création / pro : vérifie que ton portable a au moins 1 Thunderbolt 4, 1 HDMI, un lecteur SD, et un port casque. Les créatifs transfèrent beaucoup de fichiers lourds — le Thunderbolt fait une vraie différence.',
          'Le conseil : si le portable de tes rêves manque d\'un port, ne le disqualifie pas. Un petit hub USB-C à 30-50 $ ajoute 4-6 ports et se glisse dans ton sac. C\'est moins élégant, mais ça résout le problème.',
        ],
      },
    ],
    ctaText: 'Tu sais maintenant quoi chercher côté connectique. On trouve l\'ordi parfait pour toi ?',
  },
  {
    slug: 'dock-usb-c-thunderbolt-tout-en-un-cable',
    title: 'Les docks : tout brancher avec un seul câble (le guide sans jargon)',
    description: 'Un dock transforme ton portable en vrai poste de travail. On t\'explique comment ça marche, ce qui compte, et les pièges à éviter.',
    date: '2026-03-26',
    readTime: '7 min',
    category: 'Connectique',
    categoryColor: '#0891b2',
    icon: '🖥️',
    tags: [],
    featured: false,
    coverGradient: 'linear-gradient(135deg, #334155 0%, #0891b2 50%, #1e293b 100%)',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format',
    gist: 'Un dock USB-C ou Thunderbolt te permet de brancher écrans, clavier, souris, casque et charge sur UN seul câble. Tu arrives, tu branches, tu travailles. Les 3 choses à vérifier : 1) la puissance de charge en watts (65W minimum), 2) le nombre d\'écrans supportés, 3) la compatibilité avec ton portable (Thunderbolt vs USB-C).',
    sections: [
      {
        title: 'C\'est quoi un dock et pourquoi tu en veux un',
        paragraphs: [
          'Un dock (ou station d\'accueil), c\'est un boîtier qui multiplie les ports de ton portable. Tu le branches avec un seul câble USB-C ou Thunderbolt, et soudainement ton portable a accès à : 2 écrans, un clavier, une souris, un micro, des haut-parleurs, un disque externe, une connexion réseau filaire, ET il se charge en même temps.',
          'L\'avantage ultime : tu arrives à ton bureau, tu branches UN câble, et tout est connecté. Tu repars ? Tu débranches le même câble et tu pars avec ton portable. C\'est le passage de « je dois rebrancher 6 fils à chaque fois » à « un geste et c\'est fait ».',
          'En mode automobile : le dock, c\'est comme un attelage rapide pour remorque. Au lieu de brancher les freins, les clignotants, les feux et l\'alimentation séparément, tu clipses un connecteur et tout est relié. Le dock fait pareil pour ton portable.',
        ],
      },
      {
        title: 'Puissance de charge : le critère n°1',
        paragraphs: [
          'La première chose à vérifier : combien de watts le dock fournit à ton portable via le câble. Si ton portable a besoin de 65W pour se charger et que le dock n\'en fournit que 45W, ton ordi va charger lentement, voire se décharger pendant l\'utilisation intensive.',
          'Les recommandations : 60-65W pour un ultrabook léger (MacBook Air, Dell XPS 13). 90-100W pour un portable de performance (MacBook Pro 14\", ThinkPad). 140W+ pour les portables de gaming ou de création lourde.',
          'Attention au piège classique : certains docks affichent « 100W » mais c\'est la puissance totale de l\'adaptateur. Le dock lui-même consomme 10-15W pour fonctionner, donc ton portable ne reçoit que 85W. Lis les specs de charge « Power Delivery to host laptop » pour le vrai chiffre.',
          'Astuce : la plupart des bons docks viennent avec leur propre bloc d\'alimentation. Ton chargeur de portable devient un chargeur de rechange pour les déplacements. C\'est un bonus non négligeable.',
        ],
      },
      {
        title: 'Combien d\'écrans ? La question piège',
        paragraphs: [
          'C\'est souvent LA raison d\'acheter un dock : brancher un ou deux écrans externes pour avoir plus d\'espace de travail. Mais c\'est aussi là que les choses se compliquent.',
          'Thunderbolt 4 supporte nativement 2 écrans 4K à 60 Hz. Un dock Thunderbolt peut donc facilement alimenter un double setup d\'écrans. C\'est la solution la plus fiable et la plus simple.',
          'USB-C standard est plus limité : un seul flux vidéo en mode DisplayPort Alt. Pour un deuxième écran, le dock utilise une technologie appelée DisplayLink (compression logicielle) qui fonctionne mais ajoute un léger délai et utilise du processeur. Pour de la bureautique c\'est correct, mais pour du graphisme précis ou du jeu, c\'est insuffisant.',
          'Le piège MacBook : les MacBook avec puces M1 et M2 standard ne supportent qu\'un seul écran externe nativement, même avec Thunderbolt. Les M3, M4 et les versions Pro/Max gèrent 2 écrans ou plus. Vérifie les specs de TON modèle avant d\'acheter un dock dual-screen.',
          'Bref, si tu veux 2+ écrans de manière fiable, assure-toi d\'avoir un port Thunderbolt 4 et un dock Thunderbolt. C\'est le combo garanti.',
        ],
      },
      {
        title: 'Thunderbolt vs USB-C : lequel prendre ?',
        paragraphs: [
          'Un dock Thunderbolt coûte plus cher (150-350 $) mais offre : des débits plus élevés (40 Gb/s), le support de 2 écrans 4K natif, et la compatibilité avec les accessoires professionnels. C\'est le choix premium.',
          'Un dock USB-C est plus abordable (50-150 $) et fait très bien le travail pour un écran + clavier + souris + charge. Si tu n\'as pas besoin de double écran, c\'est suffisant et tu économises.',
          'La compatibilité est importante : un dock Thunderbolt fonctionne sur un port USB-C standard, mais en mode dégradé (vitesses USB-C, pas Thunderbolt). Un dock USB-C fonctionne sur un port Thunderbolt sans problème. En cas de doute, vérifie le logo ⚡ (Thunderbolt) à côté du port de ton portable.',
          'Notre recommandation : si ton portable a du Thunderbolt 4 et que tu veux un setup bureau avec double écran, investis dans un dock Thunderbolt. Pour tout le reste, un bon dock USB-C à 80-120 $ fait le travail parfaitement.',
        ],
      },
      {
        title: 'Les 5 points à vérifier avant d\'acheter',
        paragraphs: [
          '1. Puissance de charge (Power Delivery) : combien de watts ? Au minimum 60W, idéalement 85-100W. Vérifie que c\'est assez pour TON portable.',
          '2. Nombre d\'écrans supportés : 1 ou 2 ? Natif (Thunderbolt/DP Alt Mode) ou via DisplayLink ? Quelle résolution et quel taux de rafraîchissement ?',
          '3. Ports disponibles : au minimum tu veux 2-3 USB-A (pour les vieux périphériques), 1 port Ethernet (réseau filaire, plus stable que le WiFi), et 1 prise casque. Un lecteur SD est un bonus sympa.',
          '4. Compatibilité avec ton portable : vérifie que ton port USB-C supporte le mode DisplayPort Alt (pour la vidéo) et le Power Delivery (pour la charge). Les portables récents (2022+) supportent généralement les deux.',
          '5. Longueur du câble : certains docks ont un câble de 20 cm — trop court si ton bureau n\'est pas parfaitement organisé. Cherche un câble d\'au moins 50 cm, ou un modèle avec câble détachable pour le remplacer par un plus long si besoin.',
        ],
      },
    ],
    ctaText: 'Un dock, c\'est le secret d\'un setup de travail propre et efficace. On t\'aide à choisir l\'ordi qui va avec ?',
  },
  {
    slug: 'ecran-portable-resolution-hz-dalle-guide',
    title: 'L\'écran de ton portable : résolution, Hz et dalles expliqués',
    description: 'IPS, OLED, 1080p, 4K, 60 Hz, 120 Hz, nits… On traduit tout ça en français normal pour que tu choisisses le bon écran.',
    date: '2026-03-27',
    readTime: '7 min',
    category: 'Les bases',
    categoryColor: '#2563eb',
    icon: '🖥️',
    tags: ['ecran'],
    coverImage: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80&auto=format',
    gist: 'Pour la majorité des gens, un écran IPS Full HD (1920×1080) à 60 Hz est parfait. Si tu veux du premium, vise un OLED ou un IPS 2K (2560×1440). La luminosité (300+ nits) compte plus qu\'on pense — surtout si tu travailles près d\'une fenêtre. Le 4K sur un portable de 14 pouces, c\'est du gaspillage.',
    sections: [
      {
        title: 'La résolution : combien de pixels sur ton écran',
        paragraphs: [
          'La résolution, c\'est le nombre de petits points (pixels) qui composent l\'image. Plus il y en a, plus l\'image est nette et détaillée. Les résolutions courantes sur les portables : HD (1366×768) — le strict minimum, on voit les pixels. Full HD / 1080p (1920×1080) — le standard, net et agréable. 2K / QHD (2560×1440) — excellent, texte ultra-net. 4K / UHD (3840×2160) — le maximum, magnifique mais gourmand en batterie.',
          'En mode automobile : la résolution, c\'est la qualité du pare-brise. Un pare-brise sale et rayé (HD), tu vois la route mais c\'est flou. Un pare-brise propre (Full HD), tout est clair. Un pare-brise teinté haute qualité (2K), c\'est le luxe. Un pare-brise en cristal (4K)… c\'est beau mais est-ce que ça change vraiment ta conduite ?',
          'Le conseil pratique : sur un écran de 13-14 pouces, le Full HD est amplement suffisant — tes yeux ne verront pas la différence avec du 4K à distance normale. Le 2K est le sweet spot sur les 15-16 pouces. Le 4K n\'a de sens que sur un écran de 27 pouces et plus (donc un moniteur externe, pas un portable).',
        ],
      },
      {
        title: 'Le taux de rafraîchissement : les Hz',
        paragraphs: [
          'Les Hz (Hertz) mesurent combien de fois par seconde l\'écran redessine l\'image. 60 Hz = 60 images par seconde. 120 Hz = 120 images par seconde. Plus c\'est élevé, plus les mouvements sont fluides — le scroll dans une page web, le curseur de ta souris, les vidéos.',
          'Pour la bureautique, les courriels, et le web : 60 Hz est parfait. Tu ne remarqueras aucune différence avec du 120 Hz en lisant un document Word. C\'est comme la différence entre conduire à 100 km/h et 102 km/h — techniquement mesurable, pratiquement imperceptible.',
          'Pour le gaming et la création vidéo : 120 Hz et plus fait une vraie différence. Les mouvements rapides sont beaucoup plus fluides, les jeux sont plus réactifs. Si tu joues régulièrement, cherche un 120 Hz minimum.',
          'Le compromis batterie : un écran 120 Hz consomme plus d\'énergie qu\'un 60 Hz. Beaucoup de portables modernes proposent un mode adaptatif qui passe automatiquement de 60 à 120 Hz selon ce que tu fais. C\'est la meilleure option si disponible.',
        ],
      },
      {
        title: 'Les types de dalles : IPS, OLED, TN et VA',
        paragraphs: [
          'La dalle, c\'est la technologie utilisée pour fabriquer l\'écran. Chaque type a ses forces. IPS (In-Plane Switching) : les couleurs restent fidèles même quand tu regardes l\'écran de côté. C\'est le standard sur 80 % des portables modernes, et c\'est un excellent choix pour tout.',
          'OLED : chaque pixel produit sa propre lumière, ce qui donne des noirs parfaitement noirs et des couleurs éclatantes. C\'est le même type d\'écran que sur les téléphones Samsung Galaxy haut de gamme. Magnifique pour les films et la création, mais plus cher et légèrement plus fragile dans le temps (risque de marquage).',
          'TN (Twisted Nematic) : les couleurs se dégradent dès que tu bouges la tête. C\'est le type d\'écran le moins cher, encore présent sur les portables d\'entrée de gamme à 400 $. À éviter si possible — c\'est le pare-brise rayé.',
          'VA (Vertical Alignment) : bon contraste, mais rare sur les portables. On le trouve surtout sur les moniteurs de bureau. Un bon compromis entre IPS et OLED pour les écrans fixes.',
        ],
      },
      {
        title: 'La luminosité : le critère sous-estimé',
        paragraphs: [
          'La luminosité se mesure en nits (ou cd/m²). Un écran à 250 nits est sombre — difficile à lire près d\'une fenêtre en plein jour. Un écran à 300-400 nits est confortable dans la plupart des situations. Un écran à 500+ nits est excellent, même en terrasse.',
          'Si tu travailles souvent en déplacement, dans des cafés éclairés, ou près de fenêtres : vise 300 nits minimum. En dessous, tu vas plisser des yeux et monter la luminosité à fond, ce qui dévore ta batterie.',
          'Les écrans OLED sont souvent mesurés avec une luminosité de pointe (HDR) impressionnante (800-1000 nits) mais leur luminosité soutenue (en continu) est souvent inférieure à un bon IPS. Regarde la luminosité "typique" ou "soutenue" dans les specs, pas le pic HDR.',
        ],
      },
      {
        title: 'Le résumé pratique',
        paragraphs: [
          'Usage quotidien (web, courriels, bureautique) : IPS, Full HD (1080p), 60 Hz, 300 nits. C\'est le combo fiable et abordable. Tu ne manqueras de rien.',
          'Étudiant ou télétravail : IPS, Full HD ou 2K, 60-120 Hz, 300+ nits. Le 2K est un vrai confort pour travailler sur des documents et des tableurs — plus de texte visible à l\'écran sans plisser des yeux.',
          'Création et multimédia : OLED ou IPS de qualité, 2K minimum, 120 Hz, 400+ nits. Les couleurs précises comptent pour la retouche photo et le montage vidéo.',
          'Gaming : IPS rapide ou OLED, Full HD ou 2K, 120-165 Hz, 300+ nits. Le taux de rafraîchissement est le critère n°1 pour les joueurs — passe au 120 Hz et tu ne voudras jamais revenir en arrière.',
        ],
      },
    ],
    ctaText: 'Tu sais maintenant décoder les specs d\'un écran. Prêt à trouver le portable avec l\'écran parfait ?',
  },
  {
    slug: 'wifi-6e-wifi-7-pourquoi-internet-lent',
    title: 'Wi-Fi 6E et Wi-Fi 7 : pourquoi ton Internet est lent (et ce n\'est pas ton fournisseur)',
    description: 'Ton forfait est rapide mais ta connexion rame ? Le problème est probablement entre ton routeur et ton ordinateur. On t\'explique.',
    date: '2026-03-27',
    readTime: '6 min',
    category: 'Les bases',
    categoryColor: '#2563eb',
    icon: '📶',
    tags: [],
    coverImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80&auto=format',
    gist: 'Ton Internet dépend de DEUX maillons : le forfait de ton fournisseur ET ton réseau local (routeur + appareils). Si ton routeur date de 2018 ou si ton portable n\'a que le Wi-Fi 5, tu n\'obtiendras jamais la vitesse payée. Wi-Fi 6 est le minimum en 2026, Wi-Fi 6E est l\'idéal, Wi-Fi 7 est le futur.',
    sections: [
      {
        title: 'Le maillon faible de ta connexion',
        paragraphs: [
          'Tu paies pour Internet 500 Mbps chez Vidéotron ou Bell, mais quand tu fais un test de vitesse sur ton portable, tu obtiens 80 Mbps. Tu appelles ton fournisseur, ils testent la ligne, tout est normal de leur côté. Alors c\'est quoi le problème ?',
          'Le problème est presque toujours entre ton routeur et tes appareils — le réseau Wi-Fi local. C\'est comme avoir une autoroute à 6 voies (ton forfait) qui se transforme en route de gravier à une voie (ton vieux routeur) avant d\'arriver chez toi.',
          'Deux choses doivent être à jour pour que ta connexion soit rapide : le routeur (la boîte qui distribue le signal) ET la carte Wi-Fi dans ton ordinateur. Si l\'un des deux est ancien, c\'est le maillon faible qui dicte ta vitesse réelle.',
        ],
      },
      {
        title: 'Les générations de Wi-Fi expliquées',
        paragraphs: [
          'Wi-Fi 5 (802.11ac) — sorti en 2014. Vitesse max théorique : ~1.3 Gbps. Utilise les bandes 2.4 GHz et 5 GHz. C\'est ce qu\'on trouve encore dans beaucoup de routeurs fournis par les compagnies de câble. Correct, mais ça commence à dater.',
          'Wi-Fi 6 (802.11ax) — sorti en 2020. Vitesse max : ~9.6 Gbps. La grande amélioration : il gère mieux les environnements avec beaucoup d\'appareils connectés (téléphones, tablettes, smart TV, thermostats, ampoules). C\'est le minimum recommandé en 2026.',
          'Wi-Fi 6E — même technologie que le Wi-Fi 6, mais avec accès à la bande 6 GHz. Cette bande est moins encombrée (moins de voisins dessus) et offre des vitesses plus stables. C\'est le sweet spot actuel — rapide, fiable, et les équipements sont abordables.',
          'Wi-Fi 7 (802.11be) — la dernière génération. Vitesse max théorique : ~46 Gbps. Peut utiliser les 3 bandes simultanément (2.4 + 5 + 6 GHz). Excellent mais les routeurs et appareils compatibles sont encore chers. C\'est la voiture de 2027 — impressionnante, mais pas nécessaire tout de suite.',
        ],
      },
      {
        title: 'Les bandes : 2.4 GHz, 5 GHz et 6 GHz',
        paragraphs: [
          'Le Wi-Fi utilise des fréquences radio (comme la radio FM, mais pour Internet). Chaque bande a ses forces. 2.4 GHz : traverse bien les murs, longue portée, mais plus lente et encombrée (tes voisins, le micro-ondes et les appareils Bluetooth sont tous dessus). Idéale pour les appareils éloignés du routeur.',
          '5 GHz : plus rapide, moins encombrée, mais moins bonne à traverser les murs et les planchers. Idéale quand tu es dans la même pièce ou à un mur de distance du routeur.',
          '6 GHz (Wi-Fi 6E et 7) : la plus rapide, la moins encombrée (très peu d\'appareils l\'utilisent encore), mais portée plus courte. Idéale pour les appareils récents proches du routeur — streaming 4K, visioconférence, gaming.',
          'En mode auto : 2.4 GHz c\'est la route de campagne — tu vas loin mais pas vite. 5 GHz c\'est l\'autoroute — rapide mais elle ne passe pas partout. 6 GHz c\'est le circuit de F1 — ultra-rapide, mais réservé à ceux qui ont l\'équipement compatible.',
        ],
      },
      {
        title: 'Que faire pour améliorer ta connexion',
        paragraphs: [
          'Étape 1 : vérifie ton routeur. Retourne-le et regarde le modèle. S\'il dit Wi-Fi 5, AC, ou s\'il date d\'avant 2020, c\'est ton goulot d\'étranglement. Contacte ton fournisseur pour le remplacer (souvent gratuit) ou achète un routeur Wi-Fi 6E pour 100-200 $.',
          'Étape 2 : vérifie ton portable. Dans Windows, tape "Gestionnaire de périphériques" → "Cartes réseau" et regarde le nom de ta carte Wi-Fi. Si elle dit "Wi-Fi 5" ou "802.11ac", c\'est ton deuxième goulot. Les portables de 2022+ ont généralement le Wi-Fi 6.',
          'Étape 3 : le placement du routeur. Mets-le en hauteur, au centre de ton logement, loin du micro-ondes et du téléphone sans fil. Un routeur dans un placard au sous-sol ne couvrira jamais bien le 2e étage.',
          'Étape 4 : si ta maison est grande ou a des murs épais (béton, brique), investis dans un système mesh (comme TP-Link Deco ou Google Nest WiFi). Ce sont 2-3 bornes qui créent un réseau uniforme dans toute la maison. C\'est le système de relais — chaque borne amplifie le signal pour la suivante.',
        ],
      },
    ],
    ctaText: 'Le Wi-Fi n\'a plus de secret pour toi. On t\'aide à choisir l\'ordi qui exploitera ta connexion au max ?',
  },
  {
    slug: 'windows-11-reglages-premier-jour',
    title: 'Windows 11 : les 10 réglages à changer dès le premier jour',
    description: 'Ton nouveau PC est plein de pubs, de notifications inutiles et de réglages par défaut douteux. Voici comment le nettoyer en 15 minutes.',
    date: '2026-03-27',
    readTime: '8 min',
    category: 'Achat malin',
    categoryColor: '#059669',
    icon: '⚙️',
    tags: [],
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80&auto=format',
    gist: 'Windows 11 est livré avec des publicités, des applis inutiles et des paramètres de confidentialité douteux. En 15 minutes, tu peux désactiver les pubs du menu Démarrer, virer les bloatwares, optimiser la batterie, et configurer les mises à jour pour qu\'elles ne te dérangent plus. Fais-le le jour 1, tu me remercieras.',
    sections: [
      {
        title: 'Pourquoi Windows 11 a besoin d\'un ménage',
        paragraphs: [
          'Microsoft a pris l\'habitude d\'ajouter des publicités dans son propre système d\'exploitation. Des suggestions d\'apps dans le menu Démarrer, des notifications pour OneDrive et Microsoft 365, des jeux préinstallés que personne n\'a demandés (Candy Crush, vraiment ?). C\'est frustrant, surtout quand tu viens de payer 800 $ pour un ordinateur.',
          'Les fabricants (Dell, HP, Lenovo, ASUS) ajoutent aussi leur couche : antivirus d\'essai de 30 jours, utilitaires maison, logiciels partenaires. Tout ça ralentit ton PC dès le premier jour.',
          'La bonne nouvelle : 15 minutes de nettoyage suffisent pour transformer l\'expérience. C\'est comme acheter une voiture neuve et retirer les autocollants du concessionnaire et le parfum de sapin accroché au rétroviseur.',
        ],
      },
      {
        title: 'Réglages 1 à 4 : virer les pubs et le bruit',
        paragraphs: [
          '1. Nettoyer le menu Démarrer. Clic droit sur chaque tuile publicitaire (jeux, apps Microsoft promues) → Désépingler. Ensuite, Paramètres → Personnalisation → Démarrer → désactive "Afficher les suggestions" et "Afficher les applications les plus utilisées" si tu préfères un menu propre.',
          '2. Désactiver les notifications inutiles. Paramètres → Système → Notifications. Désactive les notifications pour les apps que tu n\'utilises pas (conseils Windows, suggestions, Microsoft Store). Garde celles de tes vrais outils (courriels, Teams, calendrier).',
          '3. Désinstaller les bloatwares. Paramètres → Applications → Applications installées. Trie par date d\'installation et désinstalle tout ce que tu n\'as pas choisi : antivirus d\'essai (McAfee, Norton), jeux préinstallés, outils du fabricant que tu n\'utiliseras jamais. Windows Defender est suffisant comme antivirus — pas besoin de payer pour un autre.',
          '4. Nettoyer la barre des tâches. Clic droit sur la barre des tâches → Paramètres de la barre des tâches. Désactive les Widgets (la météo et les nouvelles à gauche), masque le bouton Chat (Teams), et le bouton Recherche si tu préfères utiliser la touche Windows pour chercher.',
        ],
      },
      {
        title: 'Réglages 5 à 7 : confidentialité et performances',
        paragraphs: [
          '5. Reprendre le contrôle de ta vie privée. Paramètres → Confidentialité et sécurité. Désactive : "Identifiant de publicité" (Microsoft suit ce que tu fais pour te cibler), "Contenu suggéré dans Paramètres", "Envoyer les données de diagnostic facultatives". Tu n\'as rien à perdre en coupant ces options.',
          '6. Optimiser la batterie (portables). Paramètres → Système → Alimentation et batterie. Mets le mode d\'alimentation sur "Meilleure efficacité" quand tu es sur batterie. Active "Économiseur de batterie" à 30 %. Désactive les apps d\'arrière-plan inutiles (Paramètres → Applications → Applications installées → clic sur chaque app → Autorisations d\'application en arrière-plan → Jamais).',
          '7. Choisir ton navigateur par défaut. Windows pousse Edge partout. Si tu préfères Chrome ou Firefox : installe-le, ouvre Paramètres → Applications → Applications par défaut → cherche ton navigateur et clique "Définir par défaut". Il faudra peut-être le définir pour chaque type de lien (HTTP, HTTPS, HTML) individuellement — oui, Microsoft rend ça volontairement compliqué.',
        ],
      },
      {
        title: 'Réglages 8 à 10 : mises à jour, raccourcis et sécurité',
        paragraphs: [
          '8. Configurer les mises à jour. Paramètres → Windows Update → Options avancées. Active "Heures d\'activité" et définis ta plage de travail (ex : 8h-23h) pour que Windows ne redémarre jamais pendant que tu travailles. Les mises à jour sont essentielles pour la sécurité — ne les désactive pas, mais contrôle QUAND elles s\'installent.',
          '9. Apprendre 5 raccourcis essentiels. Windows + E : ouvrir l\'Explorateur de fichiers. Windows + L : verrouiller ton PC (quand tu quittes ton bureau). Windows + V : historique du presse-papiers (copier/coller avancé). Windows + Shift + S : capture d\'écran d\'une zone. Ctrl + Shift + Esc : ouvrir le Gestionnaire de tâches directement (pour voir ce qui ralentit ton PC).',
          '10. Activer la sauvegarde automatique. Active OneDrive ou Google Drive pour sauvegarder tes documents, photos et bureau automatiquement. Si ton disque dur meurt ou si tu te fais voler ton portable, tes fichiers importants sont en sécurité dans le cloud. C\'est gratuit jusqu\'à 5 Go (OneDrive) ou 15 Go (Google Drive).',
          'Bonus : vérifie que Windows Hello est configuré (reconnaissance faciale ou empreinte digitale si ton portable le supporte). C\'est plus rapide et plus sécuritaire qu\'un mot de passe classique pour déverrouiller ton PC.',
        ],
      },
    ],
    ctaText: 'Ton Windows est maintenant optimisé. Envie de découvrir quel ordi est fait pour toi ?',
  },
  {
    slug: 'duree-vie-ordinateur-quand-remplacer',
    title: 'Combien d\'années dure un ordinateur ? Le vrai guide de longévité',
    description: 'Ton ordi a 4 ans et il ralentit. Faut-il le remplacer ou le sauver ? Voici comment savoir (et comment prolonger sa vie).',
    date: '2026-03-27',
    readTime: '6 min',
    category: 'Achat malin',
    categoryColor: '#059669',
    icon: '⏳',
    tags: ['budget'],
    coverImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80&auto=format',
    gist: 'Un portable dure 4-6 ans, un PC de bureau 6-8 ans. Les signes de fin de vie : lenteur persistante malgré un SSD, batterie qui dure moins d\'une heure, programmes qui plantent régulièrement. Avant de remplacer, essaie : ajouter un SSD (60 $), reformater Windows, ou remplacer la batterie (80-120 $).',
    sections: [
      {
        title: 'La durée de vie réaliste',
        paragraphs: [
          'Un portable bien entretenu dure 4 à 6 ans pour un usage normal. Les MacBook et les ThinkPad haut de gamme peuvent pousser jusqu\'à 7-8 ans. Les portables d\'entrée de gamme (300-500 $) montrent des signes de fatigue après 3-4 ans.',
          'Un PC de bureau dure plus longtemps — 6 à 8 ans facilement — parce qu\'il chauffe moins, qu\'il a plus d\'espace pour refroidir ses composants, et que tu peux remplacer les pièces individuellement (RAM, SSD, carte graphique).',
          'En mode automobile : un portable, c\'est comme une voiture compacte. Au bout de 150 000 km, elle roule encore, mais les petits problèmes s\'accumulent. Un PC de bureau, c\'est comme un camion — construit pour durer, et tu peux remplacer les pièces plus facilement.',
        ],
      },
      {
        title: 'Les vrais signes de fin de vie',
        paragraphs: [
          'Lenteur persistante. Si ton ordi est lent ET qu\'il a déjà un SSD et assez de RAM (16 Go), le processeur n\'arrive probablement plus à suivre les logiciels modernes. Si tu n\'as pas de SSD, commence par là — c\'est souvent la vraie cause de la lenteur (voir notre article sur les SSD).',
          'Batterie morte. Si ton portable ne tient plus qu\'une heure sur batterie, tu es essentiellement coincé sur secteur. Le remplacement de batterie coûte 80-120 $ (parfois faisable soi-même avec un guide YouTube, sinon chez un technicien). Si la batterie est soudée et que le remplacement coûte 300 $, c\'est peut-être le moment de passer à un neuf.',
          'Incompatibilité logicielle. Quand Windows ou macOS arrête de supporter ton matériel (plus de mises à jour de sécurité), c\'est un signal clair. Un ordi sans mises à jour de sécurité est vulnérable — c\'est comme rouler avec des pneus lisses en hiver.',
          'Problèmes physiques récurrents. Écran qui clignote, charnière cassée, clavier qui perd des touches, ventilateur qui hurle en permanence. Quand les réparations s\'accumulent, le coût total dépasse vite celui d\'un neuf.',
        ],
      },
      {
        title: 'Comment prolonger la vie de ton ordi',
        paragraphs: [
          'Ajouter un SSD (si tu as encore un disque dur). C\'est la mise à niveau la plus rentable — 50-70 $ pour un SSD de 500 Go qui transforme ton ordi. On en a parlé en détail dans notre article dédié.',
          'Reformater Windows. Après 3-4 ans, Windows accumule des fichiers temporaires, des restes de logiciels désinstallés, et des processus fantômes. Une réinstallation propre de Windows (en gardant tes fichiers) peut redonner une seconde jeunesse à ton PC. C\'est la vidange complète de ta voiture.',
          'Nettoyer physiquement. La poussière s\'accumule dans les ventilateurs et bloque le refroidissement. Ton ordi chauffe plus, donc il ralentit pour se protéger (c\'est le throttling). Un coup d\'air comprimé dans les grilles de ventilation tous les 6 mois fait des merveilles.',
          'Surveiller les programmes au démarrage. Ctrl + Shift + Esc → onglet Démarrage. Désactive tout ce qui n\'est pas essentiel. Spotify, Discord, OneDrive, Adobe, Teams — tous ces programmes se lancent au démarrage et ralentissent ta machine. Lance-les quand tu en as besoin, pas à chaque fois que tu allumes ton PC.',
        ],
      },
      {
        title: 'Réparer ou remplacer ? Le calcul simple',
        paragraphs: [
          'La règle du 50 % : si la réparation coûte plus de 50 % du prix d\'un ordi neuf équivalent, remplace. Par exemple, si un écran de remplacement coûte 400 $ et qu\'un portable neuf coûte 700 $, remplace.',
          'Si ton ordi a moins de 3 ans et qu\'il n\'a qu\'un seul problème (batterie, SSD, écran) : répare. C\'est presque toujours plus rentable.',
          'Si ton ordi a plus de 5 ans et qu\'il accumule les problèmes : remplace. Même si chaque réparation est petite, l\'ensemble finit par coûter cher et tu restes avec un ordi qui devient de plus en plus incompatible.',
          'Pense aussi à la valeur de ton temps. Si tu perds 15 minutes par jour à attendre que ton vieux PC charge, ça fait 90 heures par an. Combien vaut ton temps ? Un ordi neuf à 700 $ qui te sauve 90 heures, c\'est un investissement, pas une dépense.',
        ],
      },
    ],
    ctaText: 'Tu sais maintenant si c\'est le temps de changer. On t\'aide à trouver le bon ordi pour les prochaines années ?',
  },
  {
    slug: 'cloud-google-drive-onedrive-icloud-guide',
    title: 'Le cloud : Google Drive, OneDrive, iCloud — lequel choisir ?',
    description: 'Le cloud remplace la clé USB. On t\'explique lequel utiliser, combien ça coûte, et pourquoi c\'est ton meilleur filet de sécurité.',
    date: '2026-03-27',
    readTime: '6 min',
    category: 'Les bases',
    categoryColor: '#2563eb',
    icon: '☁️',
    tags: [],
    coverImage: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=800&q=80&auto=format',
    gist: 'Le cloud, c\'est un disque dur en ligne accessible partout. Google Drive (15 Go gratuits) est le plus généreux. OneDrive (5 Go gratuits) s\'intègre parfaitement à Windows. iCloud (5 Go gratuits) est le choix naturel pour les utilisateurs Apple. Pour la plupart des gens, le forfait gratuit suffit — et c\'est ton meilleur backup contre les pannes.',
    sections: [
      {
        title: 'Le cloud, c\'est quoi exactement ?',
        paragraphs: [
          'Le cloud (nuage en français), c\'est simplement un disque dur qui se trouve sur Internet au lieu d\'être dans ton ordinateur. Quand tu mets une photo sur Google Drive, elle est stockée sur les serveurs de Google quelque part dans le monde. Tu peux y accéder depuis n\'importe quel appareil — ton ordi, ton téléphone, un autre ordi chez un ami.',
          'En mode automobile : le cloud, c\'est comme un garage de stockage en ville. Au lieu de tout entasser dans le coffre de ta voiture (ton disque dur), tu loues un espace sécurisé accessible 24/7 avec ta clé (ton mot de passe). Si ta voiture est volée, tes affaires sont en sécurité au garage.',
          'Le cloud remplace progressivement la clé USB. Au lieu de transporter un petit bâton de plastique qui se perd et se brise, tes fichiers sont synchronisés automatiquement entre tous tes appareils. Tu modifies un document sur ton portable au travail, et les changements apparaissent sur ton ordi à la maison.',
        ],
      },
      {
        title: 'Les trois géants comparés',
        paragraphs: [
          'Google Drive — 15 Go gratuits (le plus généreux). Fonctionne sur tout : Windows, Mac, iPhone, Android. Inclut Google Docs, Sheets, Slides (l\'alternative gratuite à Microsoft Office). Si tu as un compte Gmail, tu as déjà Google Drive. Forfaits payants : 2,79 $/mois pour 100 Go, 13,99 $/mois pour 2 To.',
          'OneDrive (Microsoft) — 5 Go gratuits. Intégré directement dans Windows 11 — tes dossiers Documents, Images et Bureau peuvent se synchroniser automatiquement. Inclus avec Microsoft 365 (13,99 $/mois) qui te donne 1 To de stockage + Word, Excel, PowerPoint. Le choix naturel si tu utilises Windows et Office.',
          'iCloud (Apple) — 5 Go gratuits (insuffisant en pratique). S\'intègre parfaitement à l\'écosystème Apple : iPhone, iPad, Mac. Tes photos, contacts, mots de passe et documents se synchronisent automatiquement entre tous tes appareils Apple. Forfaits : 1,29 $/mois pour 50 Go, 3,99 $/mois pour 200 Go, 12,99 $/mois pour 2 To.',
          'Dropbox — le pionnier, mais moins compétitif en 2026. 2 Go gratuits seulement. Toujours populaire en entreprise, mais pour un usage personnel, Google Drive offre plus pour moins cher.',
        ],
      },
      {
        title: 'Le vrai avantage : la sauvegarde automatique',
        paragraphs: [
          'La raison n°1 d\'utiliser le cloud, ce n\'est pas le partage ni la synchronisation — c\'est la protection contre les catastrophes. Un disque dur qui meurt, un portable volé, un café renversé sur le clavier, un virus ransomware : sans backup, tes photos de famille, tes documents importants et ton mémoire de fin d\'études disparaissent.',
          'Avec le cloud activé, tes fichiers sont automatiquement copiés en ligne. Ton ordi peut prendre feu — tu rachètes un nouveau, tu te connectes, et tout est là. C\'est la police d\'assurance la plus simple et la moins chère qui existe.',
          'Le conseil : active la synchronisation automatique de tes dossiers Documents et Images. Sur Windows : OneDrive → Paramètres → Sauvegarde → Gérer la sauvegarde. Sur Mac : Préférences Système → iCloud → iCloud Drive → Documents et Bureau. Ça prend 2 minutes et ça peut te sauver des années de souvenirs.',
        ],
      },
      {
        title: 'Lequel choisir ? Le guide simple',
        paragraphs: [
          'Tu es sur Windows + Android : Google Drive. Les 15 Go gratuits sont les plus généreux, et Google Docs est gratuit. Si tu as besoin d\'Office (Word, Excel), prends Microsoft 365 qui inclut 1 To d\'OneDrive.',
          'Tu es sur Windows + iPhone : OneDrive ou Google Drive. Les deux fonctionnent bien sur iPhone. Si tu paies déjà Microsoft 365, utilise OneDrive. Sinon, Google Drive est plus généreux.',
          'Tu es 100 % Apple (Mac + iPhone + iPad) : iCloud. L\'intégration est transparente — tout se synchronise sans effort. Prends le forfait 200 Go à 3,99 $/mois pour ne jamais manquer de place.',
          'Tu veux tout combiner : rien ne t\'empêche d\'utiliser Google Drive pour les documents et iCloud pour les photos. Ou OneDrive pour le travail et Google Drive pour le personnel. Le cloud, c\'est flexible — adapte-le à ta vie.',
        ],
      },
    ],
    ctaText: 'Tes fichiers sont maintenant en sécurité. On t\'aide à trouver l\'ordi parfait pour toi ?',
  },
  {
    slug: 'arnaques-informatiques-courantes-comment-eviter',
    title: 'Les arnaques informatiques les plus courantes (et comment les éviter)',
    description: 'Phishing, faux support Microsoft, pop-ups "votre PC est infecté" — on t\'apprend à reconnaître les pièges avant de tomber dedans.',
    date: '2026-03-27',
    readTime: '7 min',
    category: 'Achat malin',
    categoryColor: '#059669',
    icon: '🛡️',
    tags: ['securite'],
    coverImage: 'https://images.unsplash.com/photo-1544099858-75feeb57f01b?w=800&q=80&auto=format',
    gist: 'Les arnaques informatiques exploitent la peur et l\'urgence. Règle d\'or : Microsoft, Apple et ta banque ne t\'appelleront JAMAIS pour te dire que ton ordi est infecté. Ne clique jamais sur un lien dans un courriel urgent, ne donne jamais le contrôle de ton ordi à un inconnu, et ne paie jamais en cartes-cadeaux. En cas de doute, ferme tout et appelle toi-même le vrai numéro.',
    sections: [
      {
        title: 'Pourquoi ça marche encore en 2026',
        paragraphs: [
          'Les arnaques informatiques ne ciblent pas les experts — elles ciblent les gens normaux, occupés, stressés. Un courriel qui dit "Votre compte sera fermé dans 24h" te met en mode panique. Un appel d\'un "technicien Microsoft" avec un accent convaincant et un jargon technique impressionne. Une pop-up rouge clignotante qui dit "VIRUS DÉTECTÉ" fait peur.',
          'Les arnaqueurs ne piratent pas ton ordinateur — ils piratent ta psychologie. Ils utilisent l\'urgence (agis maintenant !), l\'autorité (je suis de Microsoft), et la peur (ton ordi est infecté) pour court-circuiter ton jugement.',
          'La bonne nouvelle : 95 % des arnaques suivent les mêmes schémas. Une fois que tu les connais, tu les repères en 3 secondes. C\'est comme apprendre à reconnaître les faux billets — une fois que tu sais quoi regarder, c\'est évident.',
        ],
      },
      {
        title: 'Arnaque n°1 : le phishing (hameçonnage)',
        paragraphs: [
          'Tu reçois un courriel de "Netflix", "Amazon", "Desjardins" ou "Postes Canada" qui dit que ton compte a un problème et que tu dois cliquer sur un lien pour le résoudre. Le lien mène vers un faux site qui ressemble au vrai, où on te demande tes identifiants et ton numéro de carte.',
          'Comment le repérer : regarde l\'adresse de l\'expéditeur (pas le nom affiché, l\'adresse réelle). "support@netflix-billing-secure.com" n\'est PAS Netflix. Le vrai serait "info@netflix.com". Survole le lien SANS cliquer pour voir où il mène réellement. Si l\'URL est bizarre, c\'est une arnaque.',
          'La règle : ne clique JAMAIS sur un lien dans un courriel pour résoudre un "problème de compte". Ouvre toi-même ton navigateur, tape l\'adresse du site (netflix.com), et connecte-toi directement. Si le problème est réel, tu le verras dans ton compte.',
        ],
      },
      {
        title: 'Arnaque n°2 : le faux support technique',
        paragraphs: [
          'Tu reçois un appel : "Bonjour, ici le support technique de Microsoft/Apple. Nos systèmes ont détecté un virus sur votre ordinateur. Je vais vous aider à le supprimer." La personne te demande d\'installer un logiciel de contrôle à distance (AnyDesk, TeamViewer), puis prend le contrôle de ton ordi.',
          'La réalité : Microsoft, Apple, Google et ta banque ne t\'appelleront JAMAIS pour te signaler un virus. Jamais. Ils ne savent même pas si ton ordi a un virus. Si quelqu\'un t\'appelle en prétendant ça, c\'est une arnaque à 100 %. Raccroche immédiatement.',
          'Ce qui se passe si tu les laisses faire : ils "trouvent" des faux problèmes (des fichiers système normaux qu\'ils présentent comme des virus), puis te demandent 200-500 $ pour "réparer". Parfois, ils installent un vrai malware ou volent tes données bancaires pendant qu\'ils ont le contrôle.',
        ],
      },
      {
        title: 'Arnaque n°3 : les pop-ups "VIRUS DÉTECTÉ"',
        paragraphs: [
          'Tu navigues sur le web et soudain, une page rouge/bleue apparaît avec des alertes sonores : "VOTRE ORDINATEUR EST INFECTÉ — APPELEZ CE NUMÉRO IMMÉDIATEMENT". Le numéro mène au même type d\'arnaqueur que l\'arnaque n°2.',
          'La réalité : c\'est juste une page web. Ton navigateur ne peut PAS détecter un virus sur ton ordinateur. Aucun site web légitime n\'affiche ce genre d\'alerte. C\'est l\'équivalent d\'un panneau "VOTRE MOTEUR VA EXPLOSER" collé sur un poteau en bord de route.',
          'Que faire : ferme l\'onglet (Ctrl + W) ou, si la pop-up bloque tout, ferme le navigateur (Alt + F4). Si ça ne marche pas, ouvre le Gestionnaire de tâches (Ctrl + Shift + Esc) et force la fermeture du navigateur. Ça ne peut pas endommager ton ordi — c\'est juste une page web agressive.',
        ],
      },
      {
        title: 'Les 5 réflexes anti-arnaque',
        paragraphs: [
          '1. Personne ne t\'appelle pour un virus. Jamais. Raccroche et bloque le numéro.',
          '2. Vérifie l\'expéditeur. Un courriel de ta banque vient de @desjardins.com, pas de @desjardins-secure-verify.com. En cas de doute, appelle toi-même ta banque avec le numéro sur ta carte.',
          '3. Ne paie jamais en cartes-cadeaux. Aucune entreprise légitime ne demande un paiement en cartes iTunes ou Amazon. Si quelqu\'un te demande ça, c\'est une arnaque — point final.',
          '4. Active l\'authentification à deux facteurs (2FA) partout. Courriels, banque, réseaux sociaux. Même si un arnaqueur obtient ton mot de passe, il ne pourra pas se connecter sans le code envoyé à ton téléphone.',
          '5. En cas de doute, ne fais rien. Ferme tout, prends une grande respiration, et rappelle toi-même l\'organisme concerné avec un numéro que TU as trouvé (pas celui dans le courriel ou la pop-up). Mieux vaut perdre 5 minutes à vérifier que perdre 5 000 $ à une arnaque.',
        ],
      },
    ],
    ctaText: 'Maintenant que tu sais te protéger, on t\'aide à trouver l\'ordi parfait en toute confiance ?',
  },
  {
    slug: 'chromebook-portable-300-dollars-pour-qui',
    title: 'Chromebook : le portable à 300 $ est-il fait pour toi ?',
    description: 'Un ordi neuf à 300 $ qui fait tout ce dont tu as besoin ? Peut-être. On t\'explique les forces, les limites, et pour qui c\'est le choix parfait.',
    date: '2026-03-27',
    readTime: '6 min',
    category: 'Comparatifs',
    categoryColor: '#7c3aed',
    icon: '💻',
    tags: ['chromebook', 'budget'],
    coverImage: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&q=80&auto=format',
    gist: 'Un Chromebook est un portable léger qui fait tourner ChromeOS (basé sur Chrome). Parfait pour le web, les courriels, Netflix, Google Docs et les études. Pas fait pour : Photoshop, jeux PC, logiciels Windows spécifiques. Si 90 % de ton temps est dans un navigateur, le Chromebook à 300 $ est probablement le meilleur rapport qualité-prix du marché.',
    sections: [
      {
        title: 'ChromeOS : un système pensé pour le web',
        paragraphs: [
          'Un Chromebook n\'utilise pas Windows. Il utilise ChromeOS, un système d\'exploitation créé par Google. En pratique, ChromeOS c\'est essentiellement le navigateur Chrome en plein écran, avec la possibilité de faire tourner des applications Android (Google Play Store) et certaines apps Linux.',
          'L\'avantage : ChromeOS est ultra-léger. Il démarre en 5-8 secondes, ne ralentit pas avec le temps, reçoit des mises à jour automatiques silencieuses, et est pratiquement immunisé aux virus Windows. C\'est la voiture électrique de l\'informatique — simple, fiable, pas de vidange à faire.',
          'La limite : tu ne peux pas installer de logiciels Windows. Pas de Photoshop, pas de Microsoft Office en version bureau (mais Word, Excel et PowerPoint fonctionnent très bien dans le navigateur via Office Online ou Google Docs). Pas de jeux PC non plus.',
        ],
      },
      {
        title: 'Pour qui le Chromebook est parfait',
        paragraphs: [
          'Les étudiants. Prise de notes dans Google Docs, recherches web, présentations, courriels, Zoom pour les cours en ligne. Un Chromebook fait tout ça impeccablement pour un tiers du prix d\'un portable Windows. Beaucoup d\'écoles et de cégeps utilisent déjà Google Workspace — le Chromebook est leur outil naturel.',
          'Les parents ou grands-parents. Si la personne utilise l\'ordi pour Facebook, courriels, YouTube, Netflix et les appels vidéo : le Chromebook est idéal. Pas de virus à craindre, pas de mises à jour Windows qui prennent 45 minutes, pas de bloatware. Tu l\'allumes et ça marche.',
          'Les travailleurs nomades légers. Si ton travail se passe dans Gmail, Google Drive, Slack et un CRM en ligne : le Chromebook suffit. Il est léger (souvent 1.2-1.5 kg), la batterie dure 10-12 heures, et il coûte assez peu pour ne pas paniquer si tu le perds en voyage.',
          'Les deuxièmes ordinateurs. Tu as un PC de bureau pour le travail lourd et tu veux un portable léger pour le sofa, les voyages ou le café ? Un Chromebook à 250-350 $ est le compagnon parfait.',
        ],
      },
      {
        title: 'Les vraies limites à connaître',
        paragraphs: [
          'Pas de logiciels Windows. Si ton école ou ton employeur exige un logiciel qui ne tourne que sur Windows (certains logiciels de comptabilité, AutoCAD, logiciels médicaux), le Chromebook ne fonctionnera pas. Vérifie AVANT d\'acheter.',
          'Le stockage est limité. La plupart des Chromebook ont 64-128 Go de stockage interne — c\'est peu. L\'idée est de stocker tes fichiers dans Google Drive (cloud). Si tu as besoin de garder beaucoup de fichiers hors-ligne, c\'est frustrant.',
          'Le hors-ligne est limité. ChromeOS fonctionne beaucoup mieux avec une connexion Internet. Sans Internet, tu peux quand même écrire dans Google Docs (synchronisation au retour en ligne), regarder des films téléchargés et utiliser certaines apps Android, mais l\'expérience est réduite.',
          'Les apps Android ne sont pas toutes parfaites. Certaines apps mobiles fonctionnent bien sur l\'écran du Chromebook, d\'autres sont mal adaptées (interface trop petite, bugs d\'affichage). C\'est acceptable mais pas parfait.',
        ],
      },
      {
        title: 'Quel Chromebook acheter ?',
        paragraphs: [
          'Budget serré (200-300 $) : Acer Chromebook 314, Lenovo IdeaPad 3 Chromebook. Écran 14 pouces, suffisant pour le quotidien. Ne t\'attends pas à un écran magnifique ni à des finitions premium — mais ça fait le travail.',
          'Meilleur rapport qualité (350-500 $) : Acer Chromebook Plus 515, HP Chromebook Plus x360. Meilleur écran (IPS, plus lumineux), plus de RAM (8 Go), parfois un écran tactile. C\'est le sweet spot.',
          'Premium (500-700 $) : Google Pixelbook, ASUS Chromebook Plus CX34 Flip. À ce prix, tu te rapproches des portables Windows d\'entrée de gamme — la question se pose si ChromeOS est toujours le bon choix ou si un portable Windows offrirait plus de flexibilité.',
          'Le conseil : reste sous 400 $. L\'intérêt du Chromebook, c\'est le prix. Au-delà de 500 $, un portable Windows en solde offre plus de possibilités pour le même budget.',
        ],
      },
    ],
    ctaText: 'Le Chromebook te parle ? Ou tu préfères plus de flexibilité ? On t\'aide à choisir.',
  },
  {
    slug: 'carte-graphique-gpu-besoin-ou-pas',
    title: 'Carte graphique (GPU) : en as-tu vraiment besoin ?',
    description: 'GPU intégré, GPU dédié, NVIDIA, AMD… On démystifie la carte graphique et on t\'explique si tu dois en tenir compte dans ton achat.',
    date: '2026-03-27',
    readTime: '7 min',
    category: 'Les bases',
    categoryColor: '#2563eb',
    icon: '🎮',
    tags: ['gpu'],
    coverImage: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=800&q=80&auto=format',
    gist: 'La carte graphique (GPU) gère tout ce qui est visuel : affichage, vidéo, jeux, 3D. Pour la bureautique et le web, le GPU intégré dans ton processeur suffit largement. Tu as besoin d\'un GPU dédié (NVIDIA/AMD) seulement pour le gaming, le montage vidéo 4K, la modélisation 3D ou l\'IA. Ne paie pas pour un GPU dont tu n\'as pas besoin.',
    sections: [
      {
        title: 'GPU intégré vs GPU dédié : la différence fondamentale',
        paragraphs: [
          'Chaque ordinateur a un GPU (Graphics Processing Unit). C\'est la puce qui calcule tout ce que tu vois à l\'écran : l\'affichage des fenêtres, le décodage des vidéos YouTube, le scroll dans tes pages web. Sans GPU, ton écran resterait noir.',
          'Le GPU intégré est directement dans le processeur (Intel UHD, Intel Iris Xe, AMD Radeon intégré, Apple GPU dans les puces M). Il partage la mémoire RAM de l\'ordi et consomme peu d\'énergie. Pour 80 % des gens, c\'est amplement suffisant.',
          'Le GPU dédié est une puce séparée avec sa propre mémoire (VRAM). C\'est une deuxième usine de calcul visuel qui s\'ajoute au processeur. Les marques : NVIDIA GeForce (RTX 4060, RTX 4070…) et AMD Radeon (RX 7600, RX 7700…). Plus puissant, mais plus cher et plus énergivore.',
          'En mode automobile : le GPU intégré, c\'est le moteur de ta voiture qui fait aussi tourner la climatisation — ça suffit pour la clim normale. Le GPU dédié, c\'est un compresseur de clim séparé — indispensable si tu veux refroidir un autobus en plein été, inutile pour ta Civic.',
        ],
      },
      {
        title: 'Qui a besoin d\'un GPU dédié ?',
        paragraphs: [
          'Les gamers. Si tu veux jouer à des jeux récents (Cyberpunk, Fortnite, Hogwarts Legacy) avec de beaux graphismes, tu as besoin d\'un GPU dédié. Un RTX 4060 est le sweet spot pour jouer en 1080p avec de bons réglages. Le RTX 4070 et plus pour le 1440p ou le 4K.',
          'Les créateurs vidéo et 3D. Le montage vidéo 4K, les effets spéciaux dans DaVinci Resolve ou Premiere Pro, la modélisation 3D dans Blender — tout ça utilise le GPU intensivement. Un GPU dédié réduit le temps de rendu de plusieurs heures à quelques minutes.',
          'Les professionnels de l\'IA et du machine learning. L\'entraînement de modèles IA repose massivement sur les GPU NVIDIA (grâce à CUDA). Si tu fais de la data science sérieuse, le GPU est ton outil principal.',
          'Les utilisateurs de multi-écrans 4K. Si tu veux brancher 2-3 écrans 4K à ton ordinateur et travailler dessus simultanément, un GPU dédié d\'entrée de gamme rend l\'expérience plus fluide — surtout si tu travailles avec des fichiers lourds (photos, design).',
        ],
      },
      {
        title: 'Qui n\'en a PAS besoin ?',
        paragraphs: [
          'La bureautique. Word, Excel, courriels, navigation web, Zoom — le GPU intégré gère tout ça sans transpirer. Acheter un GPU dédié pour ces usages, c\'est acheter un tracteur pour tondre ta pelouse.',
          'Le streaming vidéo. Netflix en 4K, YouTube, Disney+ — le GPU intégré des processeurs récents décode la vidéo 4K nativement. Tu n\'as rien besoin de plus.',
          'La retouche photo légère. Lightroom, Canva, et même Photoshop pour de la retouche photo standard fonctionnent très bien avec un GPU intégré récent (Intel Iris Xe ou Apple GPU). C\'est le montage vidéo lourd qui nécessite un GPU dédié, pas la retouche photo.',
          'La programmation (sauf IA). Le développement web, les apps, les bases de données — tout ça repose sur le processeur et la RAM, pas le GPU. Un développeur full-stack peut très bien coder sur un MacBook Air sans GPU dédié.',
        ],
      },
      {
        title: 'Comment décoder les noms NVIDIA et AMD',
        paragraphs: [
          'NVIDIA GeForce RTX : la série grand public. RTX 4050 = entrée de gamme (jeux en 1080p réglages moyens). RTX 4060 = milieu de gamme (le sweet spot, jeux en 1080p réglages hauts). RTX 4070 = haut de gamme (1440p fluide). RTX 4080/4090 = enthousiastes (4K maxé, créatifs pro).',
          'AMD Radeon RX : l\'alternative souvent moins chère. RX 7600 ≈ RTX 4060 en performances. RX 7700 XT ≈ RTX 4070. AMD offre généralement un meilleur rapport qualité-prix, mais NVIDIA a l\'avantage en ray tracing et en applications IA (CUDA).',
          'Sur les portables, attention aux versions "Laptop" : un RTX 4070 Laptop est significativement moins puissant qu\'un RTX 4070 de bureau. C\'est le même nom mais avec un moteur bridé pour gérer la chaleur dans un espace confiné. Regarde les benchmarks, pas juste le nom.',
          'Le chiffre de VRAM (4 Go, 6 Go, 8 Go, 12 Go) est la mémoire dédiée du GPU. Pour le gaming en 2026 : 6 Go est le minimum, 8 Go est confortable, 12 Go+ est nécessaire pour le 4K et les textures haute résolution.',
        ],
      },
    ],
    ctaText: 'Tu sais maintenant si tu as besoin d\'un GPU. On t\'aide à trouver l\'ordi parfait ?',
  },
  {
    slug: 'acheter-ordinateur-reconditionne-bonne-affaire',
    title: 'Acheter un ordi reconditionné : bonne affaire ou piège ?',
    description: 'Un MacBook Pro à moitié prix, ça semble trop beau. On t\'explique comment acheter reconditionné en confiance (et les erreurs à éviter).',
    date: '2026-03-27',
    readTime: '6 min',
    category: 'Achat malin',
    categoryColor: '#059669',
    icon: '♻️',
    tags: ['budget'],
    coverImage: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&q=80&auto=format',
    gist: 'Un ordinateur reconditionné certifié est testé, nettoyé et garanti — ce n\'est PAS un ordi usagé Kijiji. Tu peux économiser 30-50 % sur un MacBook ou un ThinkPad quasiment neuf. Achète chez Apple Refurbished, des revendeurs certifiés ou les programmes constructeur. Évite Marketplace, Kijiji et les vendeurs sans garantie.',
    sections: [
      {
        title: 'Reconditionné ≠ usagé',
        paragraphs: [
          'La confusion la plus courante : un ordinateur reconditionné (refurbished) n\'est pas un ordi usagé vendu sur Kijiji. Un appareil reconditionné est un produit retourné en magasin, un modèle d\'exposition, ou un appareil avec un défaut mineur qui a été réparé. Il est ensuite testé, nettoyé, parfois remis à neuf (nouvelle batterie, nouveau SSD), et vendu avec une garantie.',
          'C\'est comme acheter une voiture de démonstration chez un concessionnaire. Elle a 2 000 km au compteur, mais elle est inspectée, garantie, et vendue 20-30 % moins cher qu\'une neuve. Pas la même chose qu\'acheter la voiture d\'un inconnu sur Marketplace.',
          'Les grades de reconditionnement varient : Grade A = quasi neuf (aucune marque visible). Grade B = légers signes d\'usure cosmétique (micro-rayures). Grade C = usure visible mais fonctionnel. Pour un portable, vise Grade A ou B — la différence de prix avec le C est souvent faible.',
        ],
      },
      {
        title: 'Où acheter en confiance',
        paragraphs: [
          'Apple Refurbished (apple.com/ca/fr/shop/refurbished) : la référence. Apple reconditionne elle-même ses produits avec des pièces neuves (dont la batterie), inclut la garantie standard d\'un an, et permet d\'ajouter AppleCare. Économies typiques : 15-20 %. C\'est littéralement un Mac neuf dans une boîte blanche au lieu d\'une boîte grise.',
          'Programmes constructeur : Dell Outlet, Lenovo Outlet, HP Renew. Les fabricants vendent directement leurs retours et invendus reconditionnés avec garantie. Économies : 20-40 %. Idéal pour les ThinkPad et les XPS.',
          'Revendeurs certifiés : Back Market, Ordivert (Québec), Insertech (Montréal). Ces entreprises se spécialisent dans le reconditionnement avec des standards de qualité. Garantie 6-12 mois minimum. Back Market offre une garantie de 12 mois et un retour gratuit de 30 jours.',
          'À éviter : Marketplace Facebook, Kijiji, et les sites inconnus sans politique de retour. Pas de garantie, pas de test standardisé, pas de recours si le produit a un problème. Économiser 50 $ pour se retrouver sans garantie ni recours, c\'est un mauvais calcul.',
        ],
      },
      {
        title: 'Quoi vérifier avant d\'acheter',
        paragraphs: [
          'La garantie. Minimum 6 mois, idéalement 12 mois. Si le vendeur n\'offre aucune garantie, passe ton chemin. La garantie est la preuve que le vendeur a confiance dans son produit.',
          'La batterie. C\'est le composant qui vieillit le plus vite. Demande le nombre de cycles de batterie (sur Mac : menu Pomme → Informations système → Alimentation). Moins de 300 cycles = excellent. Plus de 500 = la batterie commence à fatiguer. Certains reconditionneurs remplacent la batterie par une neuve — c\'est un gros plus.',
          'L\'âge du processeur. Ne remonte pas plus loin que 3-4 ans. Un processeur de 2022 est encore très performant en 2026. Un processeur de 2019, même haut de gamme, commence à montrer ses limites avec les logiciels actuels.',
          'Le stockage. Assure-toi que c\'est un SSD (pas un vieux disque dur HDD). Si c\'est un HDD, demande si le vendeur peut le remplacer par un SSD, ou prévois de le faire toi-même (50-70 $).',
        ],
      },
      {
        title: 'Les meilleures affaires en reconditionné',
        paragraphs: [
          'MacBook Air / Pro (1-2 ans d\'âge). Les Mac gardent leurs performances très longtemps grâce aux puces Apple Silicon. Un MacBook Air M2 reconditionné à 850 $ au lieu de 1 299 $ neuf est probablement la meilleure affaire du marché en 2026.',
          'Lenovo ThinkPad (X1 Carbon, T14s). Les ThinkPad sont des machines d\'entreprise construites comme des tanks. Quand les entreprises renouvellent leur parc informatique, des milliers de ThinkPad quasi neufs arrivent sur le marché reconditionné à 400-700 $.',
          'Dell XPS et Latitude. Mêmes conditions que les ThinkPad — les entreprises revendent en masse, les prix chutent. Un Dell XPS 13 reconditionné offre un rapport qualité-prix imbattable.',
          'Le piège à éviter : les portables gaming reconditionnés. Ils ont souvent été poussés à fond (chaleur, ventilateurs à plein régime pendant des heures), et la batterie est souvent dégradée. Pour le gaming, le neuf est plus sûr.',
        ],
      },
    ],
    ctaText: 'Tu sais maintenant comment acheter malin. On t\'aide à trouver l\'ordi parfait, neuf ou reconditionné ?',
  },
  {
    slug: 'batterie-portable-mythes-realite-preservation',
    title: 'La batterie de ton portable : mythes, réalité et comment la préserver',
    description: 'Faut-il la laisser branchée ? Charger à 80 % ? On démêle le vrai du faux avec des conseils basés sur la science des batteries lithium-ion.',
    date: '2026-03-27',
    readTime: '6 min',
    category: 'Achat malin',
    categoryColor: '#059669',
    icon: '🔋',
    tags: [],
    coverImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80&auto=format',
    gist: 'Tu peux laisser ton portable branché sans le détruire — les portables modernes gèrent ça automatiquement. Pour maximiser la longévité : garde la charge entre 20-80 % quand possible, évite la chaleur extrême, et active le mode "optimisation de batterie" dans les paramètres. La batterie perdra environ 20 % de sa capacité après 2-3 ans, c\'est normal.',
    sections: [
      {
        title: 'Comment fonctionne une batterie lithium-ion',
        paragraphs: [
          'Ton portable utilise une batterie lithium-ion (Li-ion) — la même technologie que ton téléphone, ta tablette et les voitures électriques. Ces batteries se dégradent naturellement avec le temps et les cycles de charge, peu importe ce que tu fais. La question n\'est pas "comment empêcher la dégradation" mais "comment la ralentir".',
          'Un cycle de charge, c\'est quand tu utilises 100 % de la capacité de la batterie (pas forcément en une seule fois). Utiliser 50 % puis recharger, puis utiliser 50 % à nouveau = 1 cycle. La plupart des batteries sont conçues pour 500-1000 cycles avant de perdre 20 % de leur capacité.',
          'En mode automobile : la batterie, c\'est comme les pneus. Ils s\'usent à chaque kilomètre, peu importe ta conduite. Mais une conduite agressive (accélération, freinage) les use plus vite qu\'une conduite douce. Pour la batterie, c\'est pareil : certaines habitudes l\'usent plus vite que d\'autres.',
        ],
      },
      {
        title: 'Mythe n°1 : "Ne laisse jamais ton portable branché"',
        paragraphs: [
          'C\'est le mythe le plus tenace. La vérité : les portables modernes (2018+) ont des circuits de protection qui arrêtent la charge quand la batterie atteint 100 %. Ton portable ne "surcharge" pas. Une fois à 100 %, il fonctionne sur secteur et la batterie reste en veille.',
          'Cela dit, garder la batterie constamment à 100 % accélère légèrement sa dégradation chimique (c\'est le stress de voltage élevé). C\'est pourquoi Apple, Lenovo et Dell ont tous ajouté des options de limite de charge.',
          'Le conseil réaliste : si ton portable est branché 90 % du temps sur un bureau, active la limite de charge à 80 % (voir section suivante). Si tu utilises ton portable en mode nomade, ne t\'en fais pas — branche et débranche naturellement sans y penser.',
        ],
      },
      {
        title: 'Mythe n°2 : "Décharge complètement avant de recharger"',
        paragraphs: [
          'C\'était vrai pour les anciennes batteries nickel-cadmium (NiCd) des années 90, qui avaient un "effet mémoire". Les batteries lithium-ion modernes n\'ont PAS ce problème. Au contraire, les décharges profondes (en dessous de 10 %) sont plus stressantes pour la batterie que les décharges partielles.',
          'La zone idéale pour une batterie Li-ion est entre 20 % et 80 %. C\'est dans cette plage que le stress chimique est minimal. Mais ne deviens pas obsédé — utiliser ta batterie entre 10 % et 100 % ne va pas la détruire. Les fabricants ont prévu ça.',
          'L\'analogie : c\'est comme un muscle. L\'utiliser régulièrement dans sa zone de confort (20-80 %) le garde en forme. Le pousser à l\'extrême (0 % ou 100 % constant) l\'use plus vite. Mais un sprint occasionnel ne va pas te blesser.',
        ],
      },
      {
        title: 'Les vrais ennemis de ta batterie',
        paragraphs: [
          'La chaleur. C\'est l\'ennemi n°1. Une batterie à 35°C se dégrade deux fois plus vite qu\'une batterie à 25°C. Ne laisse pas ton portable en plein soleil, sur un coussin qui bloque la ventilation, ou dans une voiture en été. La chaleur fait plus de dégâts qu\'un mauvais cycle de charge.',
          'Les cycles inutiles. Chaque cycle use un peu la batterie. Si tu es à ton bureau avec une prise à côté, branche ton portable. Utiliser la batterie "pour la faire travailler" n\'a aucun bénéfice — tu accumules des cycles pour rien.',
          'Le stockage à 100 % ou 0 %. Si tu ranges un portable pour plusieurs semaines, laisse la batterie entre 40 et 60 %. Une batterie stockée à 100 % se dégrade plus vite. Une batterie stockée à 0 % peut tomber si bas qu\'elle refuse de se rallumer.',
          'Le froid extrême. En hiver canadien, ne laisse pas ton portable dans la voiture toute la nuit. Le froid réduit temporairement la capacité (ta batterie semble vide alors qu\'elle ne l\'est pas) et peut endommager les cellules si la température descend sous -20°C.',
        ],
      },
      {
        title: 'Les réglages à activer maintenant',
        paragraphs: [
          'Sur Mac : Paramètres → Batterie → Santé de la batterie → Recharge optimisée. Le Mac apprend tes habitudes et retarde la charge au-delà de 80 % jusqu\'à ce que tu en aies besoin. Si tu veux être plus strict, des apps comme AlDente permettent de fixer la limite à exactement 80 %.',
          'Sur Windows (Lenovo) : Lenovo Vantage → Batterie → Mode Conservation. Limite la charge à ~60 %. Sur Dell : Dell Power Manager → Charge principalement AC. Sur ASUS : MyASUS → Batterie → Mode longévité (60 %) ou équilibré (80 %).',
          'Sur Windows (générique) : certains BIOS offrent une option de limite de charge. Appuie sur F2 ou Del au démarrage pour accéder au BIOS et cherche "Battery Charge Limit" ou "Conservation Mode".',
          'Le résumé en 3 règles : 1) Active la limite de charge à 80 % si ton portable est souvent branché. 2) Évite la chaleur — garde les grilles de ventilation dégagées. 3) Ne stresse pas — la batterie est un consommable conçu pour être utilisé. Profite de ton portable.',
        ],
      },
    ],
    ctaText: 'Ta batterie te remerciera. Prêt à trouver le portable parfait pour les prochaines années ?',
  },
  {
    slug: 'comment-on-finance-shop-compy',
    title: 'Comment on finance Shop Compy',
    description: 'Zéro bullshit : on t\'explique exactement comment le site paye ses factures, et pourquoi ça ne change rien à nos recommandations.',
    date: '2026-03-28',
    readTime: '5 min',
    category: 'Achat malin',
    categoryColor: '#059669',
    icon: '💰',
    tags: ['financement', 'transparence', 'affilié'],
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format',
    gist: 'Shop Compy est gratuit et le restera. On se finance par des liens affiliés (qui ne changent rien au prix ni aux recommandations), un espace pub identifié, des trouvailles Compy, et du support expert à 5 $. Pas de paywall, pas de tracking invasif, pas de recommandations biaisées.',
    sections: [
      {
        title: 'Gratuit, et ça va rester comme ça',
        paragraphs: [
          'On va être directs : Shop Compy est gratuit. Le comparateur, les guides, les articles — tout. Et ça va rester gratuit. Pas de plan \"premium\" caché, pas de version payante qui débloque les \"vraies\" recommandations. Ce que tu vois, c\'est ce que tout le monde voit.',
          'Pourquoi on insiste là-dessus ? Parce que trop de sites d\'avis tech te donnent des recommandations médiocres gratuitement, puis te poussent vers un abonnement pour les \"vraies\" réponses. Chez nous, la meilleure recommandation est toujours celle qui est affichée.',
        ],
      },
      {
        title: 'Oui, ça coûte de l\'argent pour vrai',
        paragraphs: [
          'Faire tourner Shop Compy, c\'est pas gratuit de notre côté. L\'IA (Gemini) qui analyse les produits et personnalise les recommandations, ça coûte de l\'argent à chaque requête. L\'hébergement sur Vercel, le développement continu, la recherche sur les produits — tout ça s\'additionne.',
          'On aurait pu mettre un paywall et régler la question. Mais on croit que tout le monde mérite des recommandations honnêtes, pas juste ceux qui peuvent payer un abonnement mensuel. Faque on a trouvé d\'autres moyens.',
        ],
      },
      {
        title: 'Nos 4 sources de revenus (en toute transparence)',
        paragraphs: [
          '1. Liens affiliés. Quand tu cliques sur un lien vers un détaillant (Amazon, Best Buy, etc.) et que tu achètes quelque chose, on reçoit une petite commission du détaillant. Ça te coûte exactement le même prix — pas une cenne de plus. Et surtout : les commissions n\'influencent JAMAIS nos recommandations. Si un produit est meilleur pour toi, c\'est celui qu\'on recommande, point.',
          '2. Un espace publicitaire identifié. Sur les pages produit, tu vas voir un seul espace pub, clairement marqué comme tel. Pas de pop-up, pas de pub déguisée en contenu, pas de \"article sponsorisé\" qui ressemble à un vrai guide. Une pub, identifiée, c\'est tout.',
          '3. Trouvailles Compy. On déniche des deals exceptionnels qu\'on partage gratuitement, sans commission. Si une trouvaille t\'a fait économiser gros, on te propose un don volontaire. Zéro obligation, zéro culpabilité.',
          '4. Support expert. Tu as une question précise sur ton achat ? Pour 5 $, tu nous envoies ta question et on te répond en 24 h avec une recommandation personnalisée. Pas un chatbot, pas un template — une vraie réponse de quelqu\'un qui connaît ça.',
        ],
      },
      {
        title: 'Pourquoi c\'est nécessaire',
        paragraphs: [
          'Chaque fois que le comparateur analyse un ordinateur pour toi, ça consomme des ressources d\'IA. Chaque page que tu charges, c\'est de la bande passante. Chaque nouveau guide qu\'on écrit, c\'est du temps de recherche et de développement.',
          'Sans revenus, le site ferme. C\'est aussi simple que ça. Mais au lieu de te faire payer directement, on a choisi des sources de revenus qui restent alignées avec ta réalité : tu ne paies jamais plus cher, et nos recommandations restent indépendantes.',
        ],
      },
      {
        title: 'Ce qu\'on ne fera JAMAIS',
        paragraphs: [
          'Pas de paywall. Tout le contenu reste gratuit. Pas de \"connecte-toi pour voir la suite\", pas de \"abonne-toi pour débloquer le comparateur\".',
          'Pas de tracking invasif. On n\'installe pas de trackers tiers sur ton navigateur. On n\'a pas besoin de savoir ce que tu fais sur d\'autres sites pour te recommander un bon ordinateur.',
          'Pas de recommandations biaisées. Si un produit nous rapporte plus de commission mais qu\'un autre est meilleur pour toi, c\'est le meilleur qu\'on recommande. Toujours. Notre réputation vaut plus que n\'importe quelle commission.',
        ],
      },
      {
        title: 'Notre promesse',
        paragraphs: [
          'Des recommandations accessibles et honnêtes. C\'est ça, Shop Compy. On croit qu\'acheter un ordinateur ne devrait pas être compliqué, stressant, ou réservé à ceux qui parlent le jargon tech. Et on croit que la transparence, ça se prouve avec des actes, pas juste des belles paroles.',
          'T\'es ici, tu lis cet article — c\'est la preuve qu\'on joue cartes sur table. Merci de nous faire confiance.',
        ],
      },
    ],
    ctaText: 'Maintenant que tu sais comment on fonctionne, laisse-nous t\'aider à trouver ton prochain ordi.',
  },
  {
    slug: 'choisir-moniteur',
    title: 'Choisir son moniteur : résolution, Hz, panneau — ce qui compte vraiment',
    description: 'IPS ou VA, 1080p ou 4K, 60 Hz ou 144 Hz ? Un guide clair pour choisir un écran qui te convient, sans payer pour du flash inutile.',
    date: '2026-04-16',
    readTime: '8 min',
    category: 'Comparatifs',
    categoryColor: '#7c3aed',
    icon: '🖥️',
    tags: ['moniteur', 'écran', 'résolution', 'panneau', 'gaming', 'bureautique'],
    coverGradient: 'linear-gradient(135deg, #3b0764 0%, #7c3aed 50%, #0891b2 100%)',
    gist: 'Un bon moniteur, c\'est celui qui correspond à ton usage. Pour la bureautique : un 27" 1440p IPS à 75 Hz. Pour le gaming : 24"-27" 1080p/1440p avec 144 Hz minimum. Pour la création : IPS avec sRGB 99 %. Le reste — 240 Hz, HDR1000, 4K à 32" — c\'est rarement justifié. Et oui, la connectique compte autant que le panneau.',
    sections: [
      {
        title: 'Taille et résolution : le duo qu\'on confond tout le temps',
        paragraphs: [
          'La taille, c\'est la diagonale de l\'écran en pouces. La résolution, c\'est le nombre de pixels (ex. 1920×1080 = Full HD, 2560×1440 = QHD, 3840×2160 = 4K). Les deux doivent être choisies ensemble, parce que c\'est leur rapport qui donne la densité de pixels (le "piqué" de l\'image).',
          'La bonne règle : 24" en 1080p, 27" en 1440p, 32" en 4K. Si tu mets du 4K sur un 24", tu ne verras pas la différence (tes yeux ne distinguent plus les pixels individuels à cette densité). Si tu mets du 1080p sur un 32", tu verras chaque pixel comme une petite brique Lego — l\'image sera floue.',
          'Les ultra-wide (21:9, souvent 34") changent la donne : ils remplacent deux moniteurs côte à côte par un seul. Pour la productivité et le cinéma, c\'est un vrai plus. Pour le gaming, attention — certains jeux ne supportent pas bien ce ratio.',
        ],
      },
      {
        title: 'Taux de rafraîchissement (Hz) : 60, 75, 120, 144, 240 ?',
        paragraphs: [
          'Le Hz, c\'est le nombre d\'images affichées par seconde. Un moniteur à 60 Hz affiche 60 images/seconde. À 144 Hz, c\'est 144. Plus c\'est élevé, plus le mouvement est fluide — surtout en gaming.',
          'Pour la bureautique, le web et la vidéo : 60-75 Hz suffisent largement. Tu ne verras pas de différence notable en lisant des courriels ou en regardant Netflix.',
          'Pour le gaming casual (jeux solo, RPG, stratégie) : 120-144 Hz est un cap confortable. Au-delà, la différence devient marginale pour la majorité des joueurs.',
          'Pour le gaming compétitif (FPS, esports) : 144 Hz minimum, 240 Hz si ton budget le permet et que ta carte graphique peut suivre. Un écran à 240 Hz piloté par un PC qui pousse 60 fps, ça ne sert à rien.',
        ],
      },
      {
        title: 'Type de panneau : IPS, VA ou TN ?',
        paragraphs: [
          'IPS (In-Plane Switching) : les meilleures couleurs, les meilleurs angles de vision. Un peu plus cher, temps de réponse historiquement plus lent (mais les IPS récents sont excellents). C\'est le choix par défaut pour 90 % des gens — bureautique, création, gaming mixte.',
          'VA (Vertical Alignment) : les meilleurs contrastes (noirs profonds), parfait pour le cinéma et les jeux narratifs. Les couleurs sont moins précises qu\'un IPS, et les angles de vision moins bons. À considérer si tu regardes beaucoup de films dans un salon sombre.',
          'TN (Twisted Nematic) : le temps de réponse le plus rapide, le moins cher. Mais couleurs médiocres et angles de vision catastrophiques. Historiquement prisé par les joueurs compétitifs pour le 1 ms — aujourd\'hui, les IPS et VA rapides l\'ont remplacé. À éviter sauf budget très serré.',
          'OLED : couleurs sublimes, noirs parfaits, temps de réponse instantané. Par contre, risque de brûlure d\'image si tu affiches des éléments statiques (barre des tâches, bords de fenêtres) pendant des heures — un vrai enjeu pour le moniteur bureautique. À réserver au divertissement.',
        ],
      },
      {
        title: 'HDR : marketing ou vraie valeur ajoutée ?',
        paragraphs: [
          'HDR (High Dynamic Range), en théorie, c\'est une image plus lumineuse et avec plus de nuances dans les zones claires et sombres. En pratique, ça dépend complètement de l\'implémentation.',
          'HDR400 (ou "HDR basique") : c\'est du marketing. Le moniteur n\'est pas assez lumineux pour faire du vrai HDR. Ignore ce logo.',
          'HDR600 : c\'est acceptable pour commencer. Tu auras un léger gain de contraste sur les contenus HDR bien mastérisés (films 4K Blu-ray, jeux HDR).',
          'HDR1000 et plus : c\'est là que ça devient intéressant. Mais ces moniteurs coûtent 800 $ et plus. Pour la majorité des usages, le HDR est un "nice to have", pas un critère décisif.',
        ],
      },
      {
        title: 'Connectique : le détail qui gâche tout si on l\'oublie',
        paragraphs: [
          'HDMI 2.0 : supporte 4K à 60 Hz. Parfait pour 95 % des usages. La plupart des ordinateurs en sont équipés.',
          'HDMI 2.1 : requis pour 4K à 120 Hz ou plus. Essentiel si tu vises du gaming haut de gamme (RTX 4070+, Radeon RX 7800+) ou une console nouvelle génération (PS5, Xbox Series X).',
          'DisplayPort 1.4 : équivalent à HDMI 2.1 pour le PC, souvent avec moins de compromis. Standard sur les cartes graphiques récentes.',
          'USB-C avec Power Delivery : un seul câble qui fait tout — image, données, charge de ton laptop. Génial pour les MacBook et les PC portables récents. Vérifie la puissance de charge (65 W minimum pour un portable moderne).',
          'Le piège : acheter un écran 4K 144 Hz puis réaliser que ton PC n\'a qu\'un HDMI 2.0 qui plafonne à 60 Hz en 4K. Vérifie toujours les ports des deux côtés avant d\'acheter.',
        ],
      },
      {
        title: 'Scénarios courants : le bon choix par profil',
        paragraphs: [
          'Bureautique et télétravail (400-600 $) : 27" 1440p IPS à 75 Hz, avec USB-C si tu as un portable récent. Tu gagnes de la place pour ouvrir plusieurs fenêtres côte à côte, et le piqué est impeccable pour lire du texte toute la journée.',
          'Gaming polyvalent (450-750 $) : 27" 1440p IPS à 144-165 Hz, HDMI 2.1. Bon équilibre entre immersion et fluidité. FreeSync ou G-Sync sont un bonus bienvenu pour éliminer les déchirures d\'image.',
          'Gaming compétitif (400-700 $) : 24"-27" 1080p ou 1440p à 240 Hz, IPS rapide ou TN moderne. Priorité au temps de réponse et au taux de rafraîchissement, au détriment de la taille et de la résolution.',
          'Création (photo/vidéo/design, 600-1200 $) : 27" 1440p ou 32" 4K, IPS avec couverture sRGB 99 % minimum (DCI-P3 90 % si tu fais de la photo/vidéo pro). La précision des couleurs prime sur la fréquence.',
          'Cinéma/divertissement (500-900 $) : 32-34" ultra-wide VA ou OLED, 120 Hz minimum, HDR600 ou +. Le contraste et l\'immersion comptent plus que la précision des couleurs.',
        ],
      },
      {
        title: 'Les pièges marketing à éviter',
        paragraphs: [
          '"1 ms de temps de réponse" (GtG) : presque tous les moniteurs annoncent ça aujourd\'hui. Regarde plutôt les tests indépendants (Rtings, TFT Central) pour voir le temps réel.',
          '"Curved" (incurvé) : pour un ultra-wide, ça améliore l\'immersion. Pour un 24" ou 27" plat, c\'est un gadget qui n\'apporte rien.',
          '"Gaming monitor" : ce n\'est pas un label technique. Vérifie les vraies specs (Hz, type de panneau, temps de réponse).',
          '"4K" sans HDMI 2.1 ni DisplayPort récent : tu seras limité à 60 Hz. Parfait pour bureau, mais pas pour le gaming fluide.',
          'Les moniteurs "no-name" à 40 % moins cher que la marque : souvent des panneaux recyclés avec contrôle qualité minimal. Tu économises 150 $ mais tu joues à la loterie. Reste sur LG, Dell, ASUS, MSI, AOC ou Samsung.',
        ],
      },
    ],
    ctaText: 'Tu as une idée plus claire de ce que tu cherches ? On peut te proposer des moniteurs concrets adaptés à ton budget et ton usage.',
  },
]
