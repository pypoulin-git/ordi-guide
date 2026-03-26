export interface ArticleSection {
  title: string
  paragraphs: string[]
}

export interface Article {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  category: string
  categoryColor: string
  icon: string
  tldr: string
  sections: ArticleSection[]
  ctaText: string
}

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
    tldr: 'Le processeur (CPU), c\'est ce qui fait \"réfléchir\" ton ordinateur. Pour la plupart des gens, un Intel Core i5 ou AMD Ryzen 5 récent suffit amplement. Ne te laisse pas impressionner par les gros chiffres — un modèle récent de milieu de gamme bat souvent un haut de gamme d\'il y a 3 ans.',
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
    tldr: 'La RAM, c\'est l\'espace de travail actif de ton ordinateur — pas le stockage permanent. 8 Go suffit pour les tâches de base, 16 Go est le standard recommandé en 2026, et 32 Go est réservé aux pros. Plus de RAM ≠ automatiquement plus rapide.',
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
    category: 'Astuces',
    categoryColor: '#0891b2',
    icon: '💾',
    tldr: 'Si ton ordinateur met 2 minutes à démarrer, c\'est probablement à cause du disque dur (HDD). Le remplacer par un SSD est le meilleur investissement possible — ton ordi démarrera en 15 secondes et tout sera plus rapide. Un SSD de 512 Go coûte environ 50-70 $.',
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
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}
