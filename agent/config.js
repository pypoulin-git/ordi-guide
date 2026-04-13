// ─── Catalogue Agent — Configuration ──────────────────────────────

export const CATEGORIES = ['laptop', 'desktop', 'apple', 'chromebook', 'monitor', 'dock']
export const PROFILES = ['basic', 'work', 'student', 'creative', 'gaming']
export const BUDGET_TIERS = ['under500', '500to900', '900to1500', 'over1500']

// ── Sources actives ─────────────────────────────────────────────
// Seules les sources avec prix vérifiables OU affiliate actif sont gardées.
// BestBuy, Costco, Staples retirés : 80-94% prix AI, aucun affiliate payant.
export const SOURCES = ['amazon', 'newegg', 'lenovo', 'dell', 'hp', 'walmart', 'canadacomputers', 'microsoft', 'apple']

// Sources retirées — ne pas scanner, ne pas garder dans le catalogue
export const BLOCKED_SOURCES = ['bestbuy', 'costco', 'staples']

// Distribution cible : ~200 produits max
export const MAX_PRODUCTS = 200
export const MIN_PRODUCTS = 30

// Minimum par catégorie pour garder une bonne distribution
// (abaissé car on a retiré 3 sources)
export const MIN_PER_CATEGORY = {
  laptop: 8, desktop: 3, apple: 0, chromebook: 1,
  monitor: 5, dock: 3,
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
  // Add back when affiliate accounts are approved:
  // newegg:  { param: 'utm_source', value: '' },
  // lenovo:  { param: 'clickid', value: '' },
  // dell:    { param: 'dgc', value: '' },
  // hp:      { param: 'jumpid', value: '' },
  // walmart: { param: 'utm_source', value: '' },
  // canadacomputers: { param: 'ref', value: '' },
}

// ── Règles d'audit (Phase 3) ────────────────────────────────────
export const AUDIT_RULES = {
  maxPrice: 5000,
  minPrice: 50,
  minRamGB: 8,
  minStorageGB: 256,
  minPerCategory: { laptop: 8, desktop: 3, apple: 0, chromebook: 1, monitor: 5, dock: 3 },
  minTotalProducts: 25,  // abaissé (moins de sources)
  maxDeadUrlPercent: 35,
  maxAiPricePercent: 40,
  staleDaysPage: 14,
  staleDaysAi: 7,
}

// ── Price sanity rules — min/max par type de produit ────────────
// Appliquées à TOUS les produits (page ET ai), auto-retire les outliers
export const PRICE_SANITY_RULES = [
  { match: /macbook air/i,                          min: 999,  max: 2200, label: 'MacBook Air' },
  { match: /macbook pro/i,                          min: 1499, max: 4500, label: 'MacBook Pro' },
  { match: /chromebook/i,                           min: 149,  max: 1200, label: 'Chromebook' },
  { match: /dock|adapter|hub|station d.accueil|concentrateur/i, min: 20, max: 500, label: 'Dock/Adapter' },
  { match: /monitor|écran|display|27"|32"|24"/i,    min: 80,   max: 3500, label: 'Monitor' },
  { match: /desktop|bureau|tour|strix.*g1[0-9]/i,   min: 300,  max: 4000, label: 'Desktop' },
  { match: /laptop|portable|notebook|zenbook|thinkpad|yoga|vivobook|pavilion|victus|legion|galaxy book|omnibook/i, min: 250, max: 4500, label: 'Laptop' },
]

// ── CPU generation price caps ───────────────────────────────────
// Max price by CPU generation — old chips should NOT cost premium
// Applied AFTER sanity rules, specifically targets overpriced old hardware
export const CPU_PRICE_CAPS = [
  // Intel old gen (12th, 13th) — max $1000
  { match: /i[3579]-(12\d{2}|13\d{2})/i,            max: 1000, label: 'Intel 12th/13th gen' },
  // Intel 14th gen — max $1200 (still decent but not premium)
  { match: /i[3579]-14\d{2}/i,                       max: 1200, label: 'Intel 14th gen' },
  // Intel Core 3/5 new naming (budget) — max $1200
  { match: /core\s*[35]\s*[12]\d{2}/i,               max: 1200, label: 'Intel Core 3/5 (budget)' },
  // AMD Ryzen 5000/6000 — max $1000
  { match: /ryzen\s*[3579]\s*[56]\d{3}/i,            max: 1000, label: 'AMD Ryzen 5000/6000' },
  // AMD Ryzen 7000 — max $1200
  { match: /ryzen\s*[3579]\s*7\d{3}/i,               max: 1200, label: 'AMD Ryzen 7000' },
  // Apple M2 (base, not Pro/Max) — max $1500
  { match: /\bm2\b(?!\s*(pro|max|ultra))/i,          max: 1500, label: 'Apple M2 (base)' },
  // Apple M3 (base) — max $2000
  { match: /\bm3\b(?!\s*(pro|max|ultra))/i,          max: 2000, label: 'Apple M3 (base)' },
  // Current gen: Intel 15th/Ultra, Core 7, Ryzen 8000+/AI, M4+, Snapdragon → no cap (use sanity rules)
]

// ── Discord webhook pour alertes audit ──────────────────────────
// Lazy getter — ESM imports hoist above .env.local loading in catalogue-agent.js
export function getDiscordWebhookUrl() {
  return process.env.DISCORD_CATALOGUE_WEBHOOK || ''
}

// ── Concurrence page fetching ───────────────────────────────────
export const PAGE_FETCH_CONCURRENCY = 3
export const PAGE_FETCH_TIMEOUT = 10000
