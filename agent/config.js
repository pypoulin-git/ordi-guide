// ─── Catalogue Agent — Configuration ──────────────────────────────

export const CATEGORIES = ['laptop', 'desktop', 'apple', 'chromebook']
export const PROFILES = ['basic', 'work', 'student', 'creative', 'gaming']
export const BUDGET_TIERS = ['under500', '500to900', '900to1500', 'over1500']
export const SOURCES = ['bestbuy', 'amazon', 'costco', 'staples']

// Distribution cible : ~50-60 produits max
export const MAX_PRODUCTS = 60
export const MIN_PRODUCTS = 40

// Minimum par catégorie pour garder une bonne distribution
export const MIN_PER_CATEGORY = {
  laptop: 15,
  desktop: 8,
  apple: 8,
  chromebook: 5,
}

// Score IA minimum pour garder un produit
export const MIN_AI_SCORE = 65

// SearXNG (WSL)
export const SEARXNG_URL = 'http://localhost:8888'

// Gemini 2.0 Flash — via API directe (moins cher que Grok 3)
export const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || ''

// Paths
export const CATALOGUE_PATH = new URL('../data/catalogue.json', import.meta.url).pathname
  .replace(/^\/([A-Z]:)/, '$1') // Fix Windows paths from file:// URLs

// Retry config
export const MAX_RETRIES = 2
export const RETRY_DELAY_MS = 3000
