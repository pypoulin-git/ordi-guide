import type { MetadataRoute } from 'next'
import { articles } from '@/content/articles'
import { promises as fs } from 'fs'
import path from 'path'
import type { CatalogueData } from '@/types/catalogue'
import { locales } from '@/i18n/config'
import { BASE_URL as BASE } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  const pages = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/guide', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/comparateur', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/catalogue', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/glossaire', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/about', changeFrequency: 'yearly' as const, priority: 0.4 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/support', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.4 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const staticPages: MetadataRoute.Sitemap = locales.flatMap(locale =>
    pages.map(p => ({
      url: `${BASE}/${locale}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    }))
  )

  const blogPages: MetadataRoute.Sitemap = locales.flatMap(locale =>
    articles.map(a => ({
      url: `${BASE}/${locale}/blog/${a.slug}`,
      lastModified: new Date(a.date).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  let productPages: MetadataRoute.Sitemap = []
  try {
    const catRaw = await fs.readFile(path.join(process.cwd(), 'data', 'catalogue.json'), 'utf-8')
    const catalogue: CatalogueData = JSON.parse(catRaw)
    productPages = locales.flatMap(locale =>
      catalogue.products.map(p => ({
        url: `${BASE}/${locale}/catalogue/${p.id}`,
        lastModified: p.lastVerified || now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    )
  } catch { /* catalogue unavailable — skip */ }

  return [...staticPages, ...blogPages, ...productPages]
}
