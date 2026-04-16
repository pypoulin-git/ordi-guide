import { ImageResponse } from 'next/og'
import { getArticleBySlug, getArticles } from '@/content/articles'
import type { Locale } from '@/i18n/config'

// Route segment config
export const alt = 'Shop Compy — Le Décodeur'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Pre-generate images for all articles (same slugs in FR and EN)
export function generateStaticParams() {
  return getArticles('fr').map(a => ({ slug: a.slug }))
}

// Default export: image generation per slug + locale
export default async function OgImage(
  { params }: { params: Promise<{ slug: string; locale: string }> }
) {
  const { slug, locale } = await params
  const article = getArticleBySlug(slug, locale as Locale)

  const title = article?.title ?? (locale === 'fr' ? 'Shop Compy — Le Décodeur' : 'Shop Compy — The Decoder')
  const category = article?.category ?? (locale === 'fr' ? 'Blog' : 'Blog')
  const categoryColor = article?.categoryColor ?? '#2563eb'
  const tagline = locale === 'fr'
    ? 'Guide simple pour choisir ton ordinateur'
    : 'Simple guide to choose your computer'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #4338ca 100%)',
          padding: '80px',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        {/* Top bar: Shop Compy brand */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '32px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'white',
                color: '#2563eb',
                fontSize: '28px',
                fontWeight: 900,
              }}
            >
              C
            </span>
            <span>Shop Compy</span>
          </div>
          {/* Category chip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 22px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.14)',
              border: `2px solid ${categoryColor}`,
              fontSize: '22px',
              fontWeight: 600,
              color: 'white',
            }}
          >
            {category}
          </div>
        </div>

        {/* Middle: article title */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            marginTop: '40px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 70 ? '56px' : '68px',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              textShadow: '0 2px 20px rgba(0,0,0,0.25)',
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom bar: tagline + URL */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid rgba(255,255,255,0.2)',
            paddingTop: '24px',
            fontSize: '22px',
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          <div style={{ display: 'flex' }}>{tagline}</div>
          <div style={{ display: 'flex', fontWeight: 600 }}>shopcompy.ca</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
