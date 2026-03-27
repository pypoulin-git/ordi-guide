import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Lexique informatique — Termes expliqués simplement',
  description: 'CPU, GPU, RAM, SSD, GHz... Tous les termes techniques expliqués en langage simple pour choisir ton ordinateur en toute confiance.',
}

const terms = [
  {
    term: 'CPU',
    full: 'Central Processing Unit',
    fr: 'Processeur',
    def: 'Le cerveau de l\'ordinateur. Il exécute toutes les instructions des programmes. Plus il est rapide (mesuré en GHz) et plus il a de "cœurs", plus l\'ordinateur peut faire de choses à la fois rapidement.',
    example: 'Intel Core i5-1335U, AMD Ryzen 5 7530U, Apple M3',
  },
  {
    term: 'RAM',
    full: 'Random Access Memory',
    fr: 'Mémoire vive',
    def: 'La mémoire de travail de l\'ordinateur. Elle stocke temporairement les données des programmes en cours d\'utilisation. Quand tu fermes un programme, les données disparaissent de la RAM. Plus tu en as, plus tu peux ouvrir de programmes en même temps.',
    example: '8 Go, 16 Go, 32 Go',
  },
  {
    term: 'SSD',
    full: 'Solid State Drive',
    fr: 'Disque à état solide',
    def: 'Un disque de stockage sans pièce mobile, beaucoup plus rapide qu\'un disque dur classique. Ton ordinateur démarre en secondes, les programmes s\'ouvrent presque instantanément. Recommandé pour tout ordinateur acheté en 2024.',
    example: 'SSD 512 Go, SSD NVMe 1 To',
  },
  {
    term: 'HDD',
    full: 'Hard Disk Drive',
    fr: 'Disque dur',
    def: 'L\'ancien type de stockage avec un plateau qui tourne mécaniquement. Moins cher que le SSD pour la même capacité, mais beaucoup plus lent. On le retrouve encore dans certains ordinateurs de bureau pour stocker de grandes quantités de données.',
    example: 'HDD 1 To, HDD 2 To',
  },
  {
    term: 'GPU',
    full: 'Graphics Processing Unit',
    fr: 'Processeur graphique / Carte graphique',
    def: 'Le composant qui gère l\'affichage, les graphismes et les vidéos. Pour un usage courant, le GPU intégré au processeur suffit. Pour les jeux vidéo ou le montage vidéo professionnel, une carte graphique dédiée est recommandée.',
    example: 'NVIDIA GeForce RTX 4060, AMD Radeon RX 7600',
  },
  {
    term: 'GHz',
    full: 'Gigahertz',
    fr: 'Gigahertz',
    def: 'L\'unité de mesure de la vitesse d\'un processeur. Un processeur à 3,5 GHz effectue 3,5 milliards d\'opérations par seconde. Plus le chiffre est élevé, plus le processeur est rapide — mais la génération compte aussi beaucoup.',
    example: '2,4 GHz, 3,5 GHz, 5,0 GHz',
  },
  {
    term: 'Go',
    full: 'Gigaoctet',
    fr: 'Gigaoctet',
    def: 'Unité de mesure de la mémoire et du stockage. 1 Go = 1 milliard d\'octets. Une chanson MP3 prend environ 5 Mo (0,005 Go), un film en HD environ 4 Go, une photo 3-10 Mo. Ne pas confondre avec Gb (gigabit) qui est 8 fois moins.',
    example: '16 Go de RAM, 512 Go de stockage',
  },
  {
    term: 'To',
    full: 'Téraoctet',
    fr: 'Téraoctet',
    def: '1 To = 1 000 Go. Les disques durs de grande capacité se mesurent souvent en téraoctets. Un To peut contenir environ 250 000 photos, 250 heures de vidéo HD ou 200 000 chansons.',
    example: 'SSD 1 To, HDD 2 To',
  },
  {
    term: 'NVMe',
    full: 'Non-Volatile Memory Express',
    fr: 'Interface de stockage rapide',
    def: 'Un type de connexion pour les SSD qui les rend encore plus rapides. Un SSD NVMe est 5 à 7 fois plus rapide qu\'un SSD classique (SATA). C\'est la norme sur les ordinateurs récents de milieu et haut de gamme.',
    example: 'SSD NVMe M.2 512 Go',
  },
  {
    term: 'OS',
    full: 'Operating System',
    fr: 'Système d\'exploitation',
    def: 'Le logiciel de base qui fait fonctionner l\'ordinateur et permet d\'utiliser tous les autres programmes. Les trois principaux sont Windows (Microsoft), macOS (Apple) et Linux (gratuit et open source).',
    example: 'Windows 11, macOS Sonoma, Ubuntu',
  },
  {
    term: 'Full HD',
    full: '1920 × 1080 pixels',
    fr: 'Haute définition complète',
    def: 'Une résolution d\'écran standard offrant 1920 pixels en largeur et 1080 en hauteur (aussi appelé 1080p). C\'est la résolution minimale recommandée pour un ordinateur en 2024. Suffisant pour les écrans jusqu\'à 24-27 pouces.',
    example: 'Écran 15" Full HD, moniteur 24" 1080p',
  },
  {
    term: '4K',
    full: '3840 × 2160 pixels',
    fr: 'Ultra haute définition',
    def: 'Une résolution 4 fois plus précise que le Full HD. L\'image est très nette, particulièrement sur les grands écrans (27" et plus). Utile pour les photographes, les monteurs vidéo et ceux qui veulent le plus bel affichage possible.',
    example: 'Moniteur 27" 4K, MacBook Pro Retina',
  },
  {
    term: 'Core i5 / i7',
    full: 'Intel Core i5, Core i7',
    fr: 'Gammes de processeurs Intel',
    def: 'Les gammes de processeurs d\'Intel. L\'i3 est entrée de gamme, l\'i5 milieu de gamme (excellent rapport qualité/prix), l\'i7 haut de gamme pour les usages exigeants, l\'i9 pour les professionnels. Le numéro après (ex: i5-1235U) indique la génération.',
    example: 'Intel Core i5-1335U, Core i7-1355U',
  },
  {
    term: 'Ryzen',
    full: 'AMD Ryzen',
    fr: 'Gamme de processeurs AMD',
    def: 'La gamme de processeurs d\'AMD, concurrent direct d\'Intel. Ryzen 3 = entrée de gamme, Ryzen 5 = milieu de gamme, Ryzen 7 = haut de gamme, Ryzen 9 = professionnel. Souvent plus avantageux en rapport performance/prix.',
    example: 'AMD Ryzen 5 7530U, Ryzen 7 7735U',
  },
  {
    term: 'M1 / M2 / M3 / M4',
    full: 'Apple Silicon M-series',
    fr: 'Puces Apple Silicon',
    def: 'Les processeurs conçus par Apple pour ses Mac. Remarquables pour leur efficacité énergétique (longue autonomie), leur performance et leur silence. Chaque nouvelle génération (M1, M2, M3, M4) apporte des améliorations significatives.',
    example: 'MacBook Air M3, MacBook Pro M4 Pro',
  },
  {
    term: 'Wi-Fi 6',
    full: 'IEEE 802.11ax',
    fr: 'Wi-Fi 6e génération',
    def: 'La dernière génération de Wi-Fi, plus rapide et plus stable, particulièrement dans les environnements avec beaucoup d\'appareils connectés. La plupart des ordinateurs récents l\'incluent. Wi-Fi 6E ajoute la bande 6 GHz pour encore plus de performance.',
    example: 'Wi-Fi 6 (802.11ax), Wi-Fi 6E',
  },
  {
    term: 'USB-C',
    full: 'Universal Serial Bus Type-C',
    fr: 'Port USB-C',
    def: 'Un connecteur moderne, petit et réversible (tu ne peux pas te tromper de sens !). Il peut transférer des données, charger l\'appareil et envoyer un signal vidéo vers un écran externe — tout par le même câble. De plus en plus standard sur les portables récents.',
    example: 'Thunderbolt 4, USB 3.2 Gen 2',
  },
  {
    term: 'Thunderbolt',
    full: 'Thunderbolt 3 / 4 / 5',
    fr: 'Thunderbolt',
    def: 'Un port USB-C avec des capacités supplémentaires : transfert de données très rapide, connexion à plusieurs écrans 4K, charge rapide. Développé par Intel en partenariat avec Apple. Tous les MacBook récents l\'ont. Identifié par un logo éclair.',
    example: 'Thunderbolt 4, identifié par ⚡',
  },
  {
    term: 'mAh / Wh',
    full: 'Milliampère-heure / Watt-heure',
    fr: 'Capacité de batterie',
    def: 'Unités qui mesurent la capacité d\'une batterie. Plus le chiffre est élevé, plus la batterie dure longtemps en théorie. Les Wh sont plus précis pour comparer des batteries. Une bonne batterie de portable offre 50-70 Wh.',
    example: '70 Wh, 6000 mAh',
  },
]

// Group by first letter
const grouped = terms.reduce<Record<string, typeof terms>>((acc, t) => {
  const letter = t.term[0].toUpperCase()
  if (!acc[letter]) acc[letter] = []
  acc[letter].push(t)
  return acc
}, {})

const letters = Object.keys(grouped).sort()

export default function GlossairePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: terms.map(t => ({
      '@type': 'Question',
      name: `Qu'est-ce que ${t.term} (${t.fr}) ?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: t.def,
      },
    })),
  }

  return (
    <>
      <JsonLd data={faqSchema} />
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #f8fafc 100%)' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            style={{ background: '#f5f3ff', color: '#7c3aed', border: '1px solid #ddd6fe' }}>
            {terms.length} termes expliqués
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#0f172a' }}>
            Lexique informatique
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
            Tous les termes techniques que tu vas croiser en cherchant un ordinateur —
            expliqués en langage de tous les jours.
          </p>
        </div>
      </section>

      {/* ── Quick nav ────────────────────────────────────────────── */}
      <section style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '1rem 0' }}>
        <div className="container max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {letters.map(l => (
              <a key={l} href={`#letter-${l}`}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors hover:bg-[#7c3aed] hover:text-white"
                style={{ background: '#e9d5ff', color: '#7c3aed' }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Terms ────────────────────────────────────────────────── */}
      <div className="container max-w-3xl mx-auto py-12 space-y-10">
        {letters.map(letter => (
          <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-lg"
                style={{ background: '#f5f3ff', color: '#7c3aed' }}>
                {letter}
              </span>
              <div className="flex-1 h-px" style={{ background: '#e2e8f0' }} />
            </div>
            <div className="space-y-4">
              {grouped[letter].map(t => (
                <div key={t.term} className="card">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <span className="text-xl font-bold" style={{ color: '#0f172a' }}>{t.term}</span>
                    <span className="text-sm font-medium" style={{ color: '#7c3aed' }}>{t.full}</span>
                    <span className="text-sm" style={{ color: '#94a3b8' }}>· {t.fr}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-2" style={{ color: '#475569' }}>{t.def}</p>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>
                    <span className="font-medium">Ex :</span> {t.example}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#0f172a' }}>
            Prêt à choisir ton ordinateur ?
          </h2>
          <p className="mb-6" style={{ color: '#475569' }}>
            Utilise notre outil d&apos;aide au choix pour obtenir une recommandation personnalisée.
          </p>
          <a href="/comparateur" className="btn-primary">
            M&apos;aider à choisir →
          </a>
        </div>
      </section>
    </>
  )
}
