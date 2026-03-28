'use client'
import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'
import { getArticles, CATEGORIES, CATEGORY_ICONS, getAllTags } from '@/content/articles'
import type { Article } from '@/content/articles'
import TechIllustration from '@/components/TechIllustration'
import CompyBlogBar from '@/components/CompyBlogBar'
import { useTranslation } from '@/i18n/DictionaryContext'

// Map category IDs to translation keys
const CAT_LABEL_KEYS: Record<string, string> = {
  'all': 'catAll',
  'Les bases': 'catBasics',
  'Comparatifs': 'catComparisons',
  'Connectique': 'catConnectors',
  'Tendances': 'catTrends',
  'Achat malin': 'catSmart',
}

// Category icon SVG component
function CatIcon({ icon, size = 16, color }: { icon: string; size?: number; color?: string }) {
  const d = CATEGORY_ICONS[icon]
  if (!d) return null
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color || 'currentColor'} aria-hidden>
      <path d={d} />
    </svg>
  )
}

// Article card gradient based on category color
function articleGradient(color: string) {
  return `linear-gradient(135deg, ${color}18 0%, ${color}08 50%, transparent 100%)`
}

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const { t, locale } = useTranslation()
  const b = t.blog
  const articles = getArticles(locale)
  const allTags = getAllTags(articles)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const filtered = articles.filter(a => {
    if (activeCategory !== 'all' && a.category !== activeCategory) return false
    if (activeTag && !a.tags.includes(activeTag)) return false
    return true
  })

  // Latest 3 articles as featured
  const featured = filtered.slice(0, 3)
  const rest = filtered.slice(3)

  function clearFilters() {
    setActiveCategory('all')
    setActiveTag(null)
  }

  const updateScrollButtons = useCallback(() => {
    const el = carouselRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    updateScrollButtons()
    el.addEventListener('scroll', updateScrollButtons, { passive: true })
    return () => el.removeEventListener('scroll', updateScrollButtons)
  }, [rest.length, updateScrollButtons])

  function scrollCarousel(dir: 'left' | 'right') {
    const el = carouselRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <>
      {/* -- Hero -- */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #334155 100%)',
        padding: '3rem 0 3.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', top: '-50px', right: '-30px',
          width: '250px', height: '250px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
        }} />
        <div aria-hidden style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width: '35%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          paddingRight: '2rem', color: 'white',
        }}>
          <TechIllustration variant="circuit-pattern" size={240} style={{ opacity: 0.05 }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {b.articleCount.replace('{count}', String(articles.length))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {b.heroTitle}
              </h1>
              <p className="text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
                {b.heroSubtitle}
              </p>
            </div>
          </div>
        </div>

        <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '28px' }}>
          <svg viewBox="0 0 1440 28" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path d="M0,28 L0,14 Q360,0 720,14 Q1080,28 1440,14 L1440,28 Z" className="fill-[--bg-subtle]" />
          </svg>
        </div>
      </section>

      {/* -- Category filters -- */}
      <section className="bg-[--bg-subtle] border-b border-[--border]" style={{ padding: '1.25rem 0' }}>
        <div className="container">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id
              const labelKey = CAT_LABEL_KEYS[cat.id]
              const label = labelKey ? (b as Record<string, string>)[labelKey] ?? cat.label : cat.label
              return (
                <button key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setActiveTag(null) }}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all shrink-0"
                  style={{
                    background: isActive ? cat.color : 'var(--bg)',
                    color: isActive ? 'white' : cat.color,
                    border: `1.5px solid ${isActive ? cat.color : 'var(--border)'}`,
                    boxShadow: isActive ? `0 2px 8px ${cat.color}30` : 'none',
                  }}>
                  <CatIcon icon={cat.icon} size={14} color={isActive ? 'white' : cat.color} />
                  {label}
                </button>
              )
            })}
          </div>

          {/* -- Tag pills -- */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs uppercase tracking-wider font-semibold shrink-0 text-[--text-muted]">
              {b.tags}
            </span>
            {allTags.map(tag => {
              const isActive = activeTag === tag
              return (
                <button key={tag}
                  onClick={() => setActiveTag(isActive ? null : tag)}
                  className="px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0"
                  style={{
                    background: isActive ? 'var(--text)' : 'var(--bg-card)',
                    color: isActive ? 'var(--bg)' : 'var(--text-muted)',
                  }}>
                  #{tag}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* -- Active filter indicator -- */}
      {(activeCategory !== 'all' || activeTag) && (
        <div className="container" style={{ padding: '0.75rem 0 0' }}>
          <div className="flex items-center gap-2 text-sm text-[--text-muted]">
            <span>
              {b.found
                .replace('{count}', String(filtered.length))
                .replace(/\{plural\}/g, filtered.length > 1 ? 's' : '')}
            </span>
            <button onClick={clearFilters}
              className="underline hover:text-[--accent]">
              {b.reset}
            </button>
          </div>
        </div>
      )}

      {/* -- Featured articles (latest 3, big cards) -- */}
      <section className="section" style={{ paddingBottom: '1.5rem' }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <svg width="48" height="48" viewBox="0 0 16 16" fill="var(--text-muted)" className="mx-auto mb-4">
                <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85zm-5.242.156a5 5 0 110-10 5 5 0 010 10z" />
              </svg>
              <p className="text-lg font-semibold text-[--text]">{b.noResults}</p>
              <p className="text-base mt-1 text-[--text-muted]">{b.noResultsHint}</p>
              <button onClick={clearFilters} className="btn-outline mt-4">
                {b.viewAll}
              </button>
            </div>
          ) : (
            <>
              {/* Featured grid: 1 large + 2 medium */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Main featured article */}
                {featured[0] && (
                  <FeaturedCard article={featured[0]} locale={locale} readLabel={b.read} size="large" />
                )}

                {/* Two secondary featured */}
                <div className="grid grid-cols-1 gap-5">
                  {featured[1] && (
                    <FeaturedCard article={featured[1]} locale={locale} readLabel={b.read} size="medium" />
                  )}
                  {featured[2] && (
                    <FeaturedCard article={featured[2]} locale={locale} readLabel={b.read} size="medium" />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* -- Compy AI bar -- */}
      <section className="bg-[--bg-subtle] border-y border-[--border]" style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <CompyBlogBar />
        </div>
      </section>

      {/* -- Carousel: remaining articles -- */}
      {rest.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[--text]">
                {b.otherArticles}
              </h2>
              {rest.length > 3 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => scrollCarousel('left')}
                    disabled={!canScrollLeft}
                    className="w-9 h-9 rounded-full border border-[--border] flex items-center justify-center transition-all hover:border-[--accent] hover:text-[--accent] disabled:opacity-30 disabled:cursor-default"
                    aria-label="Previous">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M10.354 3.354a.5.5 0 00-.708-.708l-5 5a.5.5 0 000 .708l5 5a.5.5 0 00.708-.708L5.707 8l4.647-4.646z"/></svg>
                  </button>
                  <button
                    onClick={() => scrollCarousel('right')}
                    disabled={!canScrollRight}
                    className="w-9 h-9 rounded-full border border-[--border] flex items-center justify-center transition-all hover:border-[--accent] hover:text-[--accent] disabled:opacity-30 disabled:cursor-default"
                    aria-label="Next">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M5.646 3.354a.5.5 0 01.708-.708l5 5a.5.5 0 010 .708l-5 5a.5.5 0 01-.708-.708L10.293 8 5.646 3.354z"/></svg>
                  </button>
                </div>
              )}
            </div>

            <div
              ref={carouselRef}
              className="flex gap-5 overflow-x-auto pb-4 scrollbar-none"
              style={{ scrollSnapType: 'x mandatory' }}>
              {rest.map(article => (
                <CarouselCard key={article.slug} article={article} locale={locale} readLabel={b.read} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -- Bottom CTA -- */}
      <section style={{ background: '#0f172a', padding: '3.5rem 0' }}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            {b.ctaTitle}
          </h2>
          <p className="mb-6 text-white/70 text-base max-w-md mx-auto">
            {b.ctaSubtitle}
          </p>
          <Link href={`/${locale}/comparateur`}
            className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-semibold py-3.5 px-8 rounded-xl text-base transition-transform hover:-translate-y-0.5">
            {b.ctaButton}
          </Link>
        </div>
      </section>
    </>
  )
}

// ── Featured card (large or medium) ──────────────────────────────
function FeaturedCard({ article, locale, readLabel, size }: {
  article: Article; locale: string; readLabel: string; size: 'large' | 'medium'
}) {
  const isLarge = size === 'large'
  return (
    <Link href={`/${locale}/blog/${article.slug}`}
      className={`group block rounded-2xl overflow-hidden transition-all hover:shadow-xl ${isLarge ? 'lg:row-span-2' : ''}`}
      style={{ background: '#0f172a' }}>
      {/* Cover area with category gradient */}
      <div className={`relative flex items-end p-6 ${isLarge ? 'h-full min-h-[280px]' : 'h-48'}`}
        style={{
          background: article.coverGradient || `linear-gradient(135deg, ${article.categoryColor}40 0%, #1e293b 60%, #334155 100%)`,
        }}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />

        {/* Decorative geometric shape */}
        <div aria-hidden className="absolute top-4 right-6 opacity-10">
          <svg width={isLarge ? 120 : 80} height={isLarge ? 120 : 80} viewBox="0 0 120 120" fill="none" stroke="white" strokeWidth="1">
            <circle cx="60" cy="60" r="50" />
            <circle cx="60" cy="60" r="35" />
            <line x1="10" y1="60" x2="110" y2="60" />
            <line x1="60" y1="10" x2="60" y2="110" />
          </svg>
        </div>

        <div className="relative z-10 w-full">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', backdropFilter: 'blur(4px)' }}>
              {article.category}
            </span>
            <span className="text-xs text-white/60">
              {article.readTime}
            </span>
            <span className="text-xs text-white/40">
              {new Date(article.date).toLocaleDateString('fr-CA', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <h2 className={`font-bold text-white leading-snug group-hover:text-blue-300 transition-colors ${isLarge ? 'text-2xl md:text-3xl mb-3' : 'text-lg md:text-xl mb-2'}`}>
            {article.title}
          </h2>
          {isLarge && (
            <p className="text-sm leading-relaxed text-white/60 mb-3 line-clamp-2">
              {article.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {article.tags.slice(0, 3).map(t => (
                <span key={t} className="text-xs px-2.5 py-0.5 rounded"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}>
                  #{t}
                </span>
              ))}
            </div>
            <span className="text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
              {readLabel}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Carousel card (compact horizontal scroll) ────────────────────
function CarouselCard({ article, locale, readLabel }: {
  article: Article; locale: string; readLabel: string
}) {
  return (
    <Link href={`/${locale}/blog/${article.slug}`}
      className="group block rounded-xl border border-[--border] bg-[--bg] transition-all hover:border-[--accent] hover:shadow-md shrink-0"
      style={{ width: '300px', scrollSnapAlign: 'start' }}>
      {/* Mini gradient header */}
      <div className="h-2 rounded-t-xl" style={{
        background: `linear-gradient(90deg, ${article.categoryColor}, ${article.categoryColor}60)`,
      }} />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
            style={{ background: article.categoryColor + '12', color: article.categoryColor }}>
            {article.category}
          </span>
          <span className="text-xs text-[--text-muted]">
            {article.readTime}
          </span>
        </div>
        <h3 className="text-base font-bold leading-snug group-hover:text-[--accent] transition-colors text-[--text] mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm leading-relaxed line-clamp-2 text-[--text-muted] mb-3">
          {article.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {article.tags.slice(0, 2).map(t => (
              <span key={t} className="text-xs px-2 py-0.5 rounded bg-[--bg-card] text-[--text-muted]">
                #{t}
              </span>
            ))}
          </div>
          <span className="text-sm font-semibold text-[--accent] opacity-0 group-hover:opacity-100 transition-opacity">
            {readLabel}
          </span>
        </div>
      </div>
    </Link>
  )
}
