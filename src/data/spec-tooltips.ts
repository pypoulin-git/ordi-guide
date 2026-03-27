/**
 * Short definitions for spec labels, used in tooltips throughout the site.
 * Sourced from the glossaire — kept concise for hover display.
 */
const SPEC_TOOLTIPS: Record<string, { label: string; tip: string }> = {
  cpu: {
    label: 'Processeur (CPU)',
    tip: 'Le cerveau de l\u2019ordinateur. Il exécute toutes les instructions. Plus il est rapide et récent, plus tout va vite. Ex : Intel Core i5, AMD Ryzen 5, Apple M4.',
  },
  ram: {
    label: 'Mémoire vive (RAM)',
    tip: 'La mémoire de travail. Plus tu en as, plus tu peux ouvrir de programmes en même temps sans ralentir. 16 Go est le standard recommandé en 2024.',
  },
  storage: {
    label: 'Stockage (SSD)',
    tip: 'Là où sont enregistrés tes fichiers, photos et programmes. Un SSD est beaucoup plus rapide qu\u2019un disque dur classique. 512 Go est un bon minimum.',
  },
  gpu: {
    label: 'Carte graphique (GPU)',
    tip: 'Gère l\u2019affichage et les graphismes. Pour un usage courant, le GPU intégré suffit. Pour les jeux ou le montage vidéo, une carte dédiée est recommandée.',
  },
  display: {
    label: 'Écran',
    tip: 'La taille (en pouces) et la résolution de l\u2019écran. Full HD (1920×1080) est le standard. Plus l\u2019écran est grand et net, plus c\u2019est confortable.',
  },
  battery: {
    label: 'Batterie',
    tip: 'L\u2019autonomie du portable loin d\u2019une prise. Mesurée en Wh ou en heures. Une bonne batterie offre 10-18h selon l\u2019usage.',
  },
}

export default SPEC_TOOLTIPS

/** Map spec keys from various sources to our tooltip keys */
export function resolveSpecKey(key: string): string | null {
  const k = key.toLowerCase().trim()
  if (k === 'cpu' || k === 'processeur') return 'cpu'
  if (k === 'ram' || k === 'mémoire vive' || k === 'mémoire') return 'ram'
  if (k === 'ssd' || k === 'stockage' || k === 'storage') return 'storage'
  if (k === 'gpu' || k === 'graphique' || k === 'carte graphique') return 'gpu'
  if (k === 'display' || k === 'écran' || k === 'screen') return 'display'
  if (k === 'battery' || k === 'batterie' || k === 'autonomie') return 'battery'
  return null
}
