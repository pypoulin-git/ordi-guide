// ─── Catalogue Agent — Configuration ──────────────────────────────

export const CATEGORIES = ['laptop', 'desktop', 'apple', 'chromebook', 'monitor', 'dock']
export const PROFILES = ['basic', 'work', 'student', 'creative', 'gaming']
export const BUDGET_TIERS = ['under500', '500to900', '900to1500', 'over1500']
export const SOURCES = ['bestbuy', 'amazon', 'costco', 'staples', 'newegg', 'lenovo', 'dell', 'hp', 'walmart', 'canadacomputers', 'microsoft']

// Distribution cible : ~200 produits max
export const MAX_PRODUCTS = 200
export const MIN_PRODUCTS = 30

// Minimum par catégorie pour garder une bonne distribution
export const MIN_PER_CATEGORY = {
  laptop: 15, desktop: 8, apple: 8, chromebook: 3,
  monitor: 8, dock: 5,
}

// Score IA minimum pour garder un produit
export const MIN_AI_SCORE = 65

// SearXNG (WSL)
export const SEARXNG_URL = 'http://localhost:8888'

// Gemini 2.5 Flash — via API directe
export const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'
// Lazy getter — env may be loaded after module init (e.g. .env.local in catalogue-agent.js)
export function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || ''
}

// Paths
function fixWinPath(p) { return p.replace(/^\/([A-Z]:)/, '$1') }
export const CATALOGUE_PATH = fixWinPath(new URL('../data/catalogue.json', import.meta.url).pathname)
export const SCAN_RESULTS_PATH = fixWinPath(new URL('../data/scan-results.json', import.meta.url).pathname)

// Retry config
export const MAX_RETRIES = 2
export const RETRY_DELAY_MS = 3000

// ── CPU Whitelist — 2 dernières générations uniquement ──────────
// Tout CPU qui ne match pas = rejeté du catalogue
export const CPU_WHITELIST = [
  /intel.*(core\s*ultra|[ui][3579]-1[2-5]\d{2,})/i,  // Intel 12th+ (i5-12xxx, i7-13xxx, Core Ultra)
  /intel\s*core\s*[357]\s*\d{3}/i,                     // Intel Core 3/5/7 (new naming, e.g. Core 5 225U)
  /intel.*1[2-5][4-9]\d{2}/i,                          // Intel 14th gen (14400, 14700, etc.)
  /ryzen\s*[3579]\s*[5-9]\d{3}/i,                      // AMD Ryzen 5000+ series
  /ryzen\s*(ai|pro)\s*\d/i,                             // AMD Ryzen AI / PRO
  /apple\s*m[2-9]/i,                                    // Apple M2, M3, M4+
  /snapdragon\s*x/i,                                    // Qualcomm Snapdragon X
  /m[2-4]\s*(pro|max|ultra)/i,                          // Apple M2 Pro, M3 Max, etc.
  /rtx\s*(40[5-9]0|50[5-9]0)/i,                        // Si on voit un GPU récent, le CPU l'est probablement aussi
]

// ── Liens affiliés ──────────────────────────────────────────────
export const AFFILIATE_TAGS = {
  amazon:  { param: 'tag', value: 'shopcompy-20' },
  bestbuy: { param: 'ref', value: 'shopcompy' },
  // Add back when affiliate accounts are approved:
  // newegg:  { param: 'utm_source', value: '' },
  // lenovo:  { param: 'clickid', value: '' },
  // dell:    { param: 'dgc', value: '' },
  // hp:      { param: 'jumpid', value: '' },
  // walmart: { param: 'utm_source', value: '' },
  // canadacomputers: { param: 'ref', value: '' },
  // costco, staples, microsoft: pas de programme affilié pour l'instant
}

// ── Règles d'audit (Phase 3) ────────────────────────────────────
export const AUDIT_RULES = {
  maxPrice: 5000,
  minPrice: 50,
  minRamGB: 8,
  minStorageGB: 256,
  minPerCategory: { laptop: 10, desktop: 5, apple: 5, chromebook: 3, monitor: 5, dock: 5 },
  minTotalProducts: 35,
  maxDeadUrlPercent: 20, // si plus de 20% de liens morts, audit échoue
}

// ── Discord webhook pour alertes audit ──────────────────────────
export const DISCORD_WEBHOOK_URL = process.env.DISCORD_CATALOGUE_WEBHOOK || ''

// ── Concurrence page fetching ───────────────────────────────────
export const PAGE_FETCH_CONCURRENCY = 3
export const PAGE_FETCH_TIMEOUT = 10000
