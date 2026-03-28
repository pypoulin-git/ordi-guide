import type { Locale } from '@/i18n/config'

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
  tags: string[]
  featured?: boolean
  coverGradient?: string
  coverImage?: string
}

export const CATEGORIES = [
  { id: 'all',         label: 'Tout',          color: '#475569', icon: 'grid' },
  { id: 'Les bases',   label: 'Les bases',     color: '#2563eb', icon: 'book' },
  { id: 'Comparatifs', label: 'Comparatifs',   color: '#7c3aed', icon: 'scale' },
  { id: 'Connectique', label: 'Connectique',   color: '#0891b2', icon: 'plug' },
  { id: 'Tendances',   label: 'Tendances',     color: '#d97706', icon: 'trend' },
  { id: 'Achat malin', label: 'Achat malin',   color: '#059669', icon: 'tag' },
]

// Category icon → SVG path mapping (16x16 viewBox)
export const CATEGORY_ICONS: Record<string, string> = {
  grid:  'M3 3h4v4H3V3zm6 0h4v4H9V3zM3 9h4v4H3V9zm6 0h4v4H9V9z',
  book:  'M2 2a1 1 0 011-1h4.586a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0110.414 1H15a1 1 0 011 1v12a1 1 0 01-1 1h-4.586a1 1 0 01-.707-.293L9 13.414l-.707.293A1 1 0 017.586 14H3a1 1 0 01-1-1V2zm6 1.414V12l.707-.707a1 1 0 011.414 0l.293.293V2h-3.586L8 3.414zM7 3.414L5.586 2H3v10.586l.293-.293a1 1 0 011.414 0L7 12V3.414z',
  scale: 'M8 1a.5.5 0 01.47.33l3 8.5a.5.5 0 01-.94.34L8 3.28 5.47 10.17a.5.5 0 01-.94-.34l3-8.5A.5.5 0 018 1zM3.5 11a2.5 2.5 0 005 0h-5zm4 0a2.5 2.5 0 005 0h-5z',
  plug:  'M6 1v3H5a1 1 0 00-1 1v2a4 4 0 003 3.87V14h2v-3.13A4 4 0 0012 7V5a1 1 0 00-1-1H10V1H8v3H6z',
  trend: 'M2 13.5a.5.5 0 01.146-.354l4-4a.5.5 0 01.708 0L9 11.293l4.146-4.147a.5.5 0 01.708.708l-4.5 4.5a.5.5 0 01-.708 0L6.5 10.207l-3.646 3.647A.5.5 0 012 13.5zM13 5h-3V3h5v5h-2V5z',
  tag:   'M2.5 1A1.5 1.5 0 001 2.5v4.586a1.5 1.5 0 00.44 1.06l6.414 6.415a1.5 1.5 0 002.122 0l4.585-4.585a1.5 1.5 0 000-2.122L8.146 1.44A1.5 1.5 0 007.086 1H2.5zM4 4.5a.5.5 0 111 0 .5.5 0 01-1 0z',
}

export function getAllTags(articlesList: Article[]): string[] {
  const set = new Set<string>()
  articlesList.forEach(a => a.tags.forEach(t => set.add(t)))
  return Array.from(set).sort()
}

// Lazy-load articles by locale
import { articles as articlesFr } from './articles.fr'

let articlesEnCache: Article[] | null = null

export function getArticles(locale: Locale = 'fr'): Article[] {
  if (locale === 'fr') return articlesFr

  // Lazy-load English articles, fallback to French if not available
  if (!articlesEnCache) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mod = require('./articles.en')
      articlesEnCache = mod.articles
    } catch {
      articlesEnCache = articlesFr
    }
  }
  return articlesEnCache!
}

// Default export for backwards compatibility (French)
export const articles = articlesFr

export function getArticleBySlug(slug: string, locale: Locale = 'fr'): Article | undefined {
  return getArticles(locale).find(a => a.slug === slug)
}
