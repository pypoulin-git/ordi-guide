import type { MetadataRoute } from 'next'
import { articles } from '@/content/articles'
import { promises as fs } from 'fs'
import path from 'path'
import type { CatalogueData } from '@/types/catalogue'

const BASE = 'https://ordi-guide.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/comparateur`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/catalogue`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/glossaire`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ]

  const blogPages: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${BASE}/blog/${a.slug}`,
    lastModified: new Date(a.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  let productPages: MetadataRoute.Sitemap = []
  try {
    const catRaw = await fs.readFile(path.join(process.cwd(), 'data', 'catalogue.json'), 'utf-8')
    const catalogue: CatalogueData = JSON.parse(catRaw)
    productPages = catalogue.products.map(p => ({
      url: `${BASE}/catalogue/${p.id}`,
      lastModified: p.lastVerified || now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch { /* catalogue unavailable — skip */ }

  return [...staticPages, ...blogPages, ...productPages]
}
