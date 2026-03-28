// ─── Blog Agent — Configuration ──────────────────────────────────

// SearXNG (WSL)
export const SEARXNG_URL = 'http://localhost:8888'

// Gemini 2.5 Flash
export const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || ''

// Paths
function fixWinPath(p) { return p.replace(/^\/([A-Z]:)/, '$1') }
export const ARTICLES_FR_PATH = fixWinPath(new URL('../src/content/articles.fr.ts', import.meta.url).pathname)
export const ARTICLES_EN_PATH = fixWinPath(new URL('../src/content/articles.en.ts', import.meta.url).pathname)
export const BACKLOG_PATH = fixWinPath(new URL('../data/article-backlog.json', import.meta.url).pathname)

// Discord webhook for alerts
export const DISCORD_WEBHOOK_URL = process.env.DISCORD_BLOG_WEBHOOK || process.env.DISCORD_CATALOGUE_WEBHOOK || ''

// Research config
export const MAX_SEARCH_RESULTS = 20
export const MAX_SOURCES_PER_ARTICLE = 8

// Article config
export const CATEGORIES = ['Les bases', 'Comparatifs', 'Connectique', 'Tendances', 'Achat malin']
export const CATEGORY_COLORS = {
  'Les bases': '#2563eb',
  'Comparatifs': '#7c3aed',
  'Connectique': '#0891b2',
  'Tendances': '#d97706',
  'Achat malin': '#059669',
}

// Topics to search for trends (NOVA-style)
export const TREND_QUERIES = [
  'meilleur ordinateur portable 2026 Canada',
  'tendance processeur Intel AMD 2026',
  'Apple M4 nouveautés',
  'laptop étudiant pas cher Canada 2026',
  'Chromebook vs Windows laptop 2026',
  'AI PC Copilot+ Snapdragon X',
  'SSD NVMe Gen 5 comparatif',
  'écran OLED laptop 2026',
  'meilleur rapport qualité prix ordinateur',
  'sécurité ordinateur personnel conseils',
]

// Retry config
export const MAX_RETRIES = 2
export const RETRY_DELAY_MS = 3000
