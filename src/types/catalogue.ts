export type ProfileTag = 'basic' | 'work' | 'student' | 'creative' | 'gaming'
export type Category = 'laptop' | 'desktop' | 'apple' | 'chromebook'
export type BudgetTier = 'under500' | '500to900' | '900to1500' | 'over1500'
export type Source = 'bestbuy' | 'amazon' | 'costco' | 'staples'

export interface ProductSpecs {
  cpu: string
  ram: string
  storage: string
  display?: string
  gpu?: string
  battery?: string
}

export interface CatalogueProduct {
  id: string
  name: string
  brand: string
  category: Category
  profiles: ProfileTag[]
  budgetTier: BudgetTier
  price: number
  originalPrice?: number
  url: string
  source: Source
  imageUrl?: string
  specs: ProductSpecs
  aiScore: number
  aiRationale: string
  addedAt: string
  lastVerified: string
  isOnSale: boolean
}

export interface AgentRunInfo {
  startedAt: string
  completedAt: string
  productsScanned: number
  productsKept: number
  productsReplaced: number
  errors: string[]
}

export interface CatalogueData {
  version: number
  lastUpdated: string
  agentRun: AgentRunInfo
  products: CatalogueProduct[]
}

export const PROFILE_LABELS: Record<ProfileTag, { label: string; desc: string }> = {
  basic:    { label: 'Pour débuter',    desc: 'Navigation, courriels, photos et vidéos' },
  work:     { label: 'Pour travailler', desc: 'Word, Excel, Zoom, courriels professionnels' },
  student:  { label: 'Pour les études', desc: 'Cours, recherche, présentations' },
  creative: { label: 'Pour créer',      desc: 'Montage photo, vidéo, design graphique' },
  gaming:   { label: 'Pour jouer',      desc: 'Jeux vidéo récents et exigeants' },
}

export const CATEGORY_LABELS: Record<Category, string> = {
  laptop:     'Portables',
  desktop:    'Ordinateurs de bureau',
  apple:      'Apple (Mac)',
  chromebook: 'Chromebooks',
}

export const BUDGET_LABELS: Record<BudgetTier, string> = {
  under500:   'Moins de 500 $',
  '500to900': '500 $ à 900 $',
  '900to1500':'900 $ à 1 500 $',
  over1500:   'Plus de 1 500 $',
}

export const SOURCE_LABELS: Record<Source, { label: string; color: string }> = {
  bestbuy: { label: 'Best Buy', color: '#0046be' },
  amazon:  { label: 'Amazon',   color: '#ff9900' },
  costco:  { label: 'Costco',   color: '#e31837' },
  staples: { label: 'Bureau en Gros', color: '#cc0000' },
}
