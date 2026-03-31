'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect, useCallback } from 'react'
import { getArticles, CATEGORIES, CATEGORY_ICONS, getAllTags } from '@/content/articles'
import type { Article } from '@/content/articles'
import CompyBlogBar from '@/components/CompyBlogBar'
import AdBanner from '@/components/AdBanner'
import { useTranslation } from '@/i18n/DictionaryContext'

const CAT_LABEL_KEYS: Record<string, string> = {
  'all': 'catAll',
  'Les bases': 'catBasics',
  'Comparatifs': 'catComparisons',
  'Connectique': 'catConnectors',
  'Tendances': 'catTrends',
  'Achat malin': 'catSmart',
}

function CatIcon({ icon, size = 16, color }: { icon: string; size?: number; color?: string }) {
  const d = CATEGORY_ICONS[icon]
  if (!d) return null
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color || 'currentColor'} aria-hidden>
      <path d={d} />
    </svg>
  )
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
    el.scrollBy({ left: dir === 'left' ? -el.clientWidth * 0.8 : el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Compact hero ── */}
      <section
        className="border-b border-[var(--border)]"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #334155 100%)',
          padding: '1.5rem 0 1.75rem',
        }}
      >
        <div className="container">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-2"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {b.articleCount.replace('{count}', String(articles.length))}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{b.heroTitle}</h1>
          <p className="text-sm mt-1 text-white/60 max-w-lg">{b.heroSubtitle}</p>
        </div>
      </section>

      {/* ── Demande à Compy ── */}
      <section style={{ paddingTop: '1.25rem', paddingBottom: '0.75rem' }}>
        <div className="container max-w-3xl mx-auto">
          <CompyBlogBar />
        </div>
      </section>

      {/* ── Sidebar + Content layout ── */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="flex gap-6 items-start">

            {/* ── Left sidebar (sticky, desktop only) ────────── */}
            <aside
              className="hidden lg:block shrink-0 sticky"
              style={{ top: '5rem', width: '220px' }}
            >
              <div className="space-y-5">

                {/* Categories */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2 text-[var(--text-muted)]">
                    {locale === 'fr' ? 'Catégories' : 'Categories'}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {CATEGORIES.map(cat => {
                      const isActive = activeCategory === cat.id
                      const labelKey = CAT_LABEL_KEYS[cat.id]
                      const label = labelKey ? (b as Record<string, string>)[labelKey] ?? cat.label : cat.label
                      return (
                        <button key={cat.id}
                          onClick={() => { setActiveCategory(cat.id); setActiveTag(null) }}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left w-full"
                          style={{
                            background: isActive ? cat.color : 'transparent',
                            color: isActive ? 'white' : cat.color,
                            border: isActive ? 'none' : undefined,
                          }}>
                          <CatIcon icon={cat.icon} size={14} color={isActive ? 'white' : cat.color} />
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Tags */}
                {allTags.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 text-[var(--text-muted)]">
                      {b.tags.replace(' :', '')}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {allTags.map(tag => (
                        <button key={tag}
                          onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                          style={{
                            minHeight: '36px',
                            background: activeTag === tag ? 'var(--text)' : 'var(--bg-card)',
                            color: activeTag === tag ? 'var(--bg)' : 'var(--text-muted)',
                          }}>
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reset */}
                {(activeCategory !== 'all' || activeTag) && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[var(--text-muted)]">
                      {b.found.replace('{count}', String(filtered.length)).replace(/\{plural\}/g, filtered.length > 1 ? 's' : '')}
                    </span>
                    <button onClick={clearFilters} className="underline text-[var(--accent)] text-sm">{b.reset}</button>
                  </div>
                )}

                {/* CTA */}
                <div className="rounded-xl p-3.5" style={{ background: 'var(--accent-bg)', border: '1px solid var(--border)' }}>
                  <p className="text-xs mb-2 text-[var(--text-subtle)]">
                    {b.ctaSubtitle}
                  </p>
                  <Link href={`/${locale}/comparateur`} className="text-xs font-semibold text-[var(--accent)] hover:underline">
                    {b.ctaButton}
                  </Link>
                </div>
              </div>
            </aside>

            {/* ── Main content ───────────────────────────────── */}
            <div className="flex-1 min-w-0">

              {/* Mobile filters */}
              <div className="lg:hidden mb-5 space-y-3">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none px-1">
                  {CATEGORIES.map(cat => {
                    const isActive = activeCategory === cat.id
                    const labelKey = CAT_LABEL_KEYS[cat.id]
                    const label = labelKey ? (b as Record<string, string>)[labelKey] ?? cat.label : cat.label
                    return (
                      <button key={cat.id}
                        onClick={() => { setActiveCategory(cat.id); setActiveTag(null) }}
                        className="flex items-center gap-1.5 px-4 rounded-full text-sm font-semibold whitespace-nowrap transition-all shrink-0"
                        style={{
                          minHeight: '44px',
                          background: isActive ? cat.color : 'var(--bg)',
                          color: isActive ? 'white' : cat.color,
                          border: `1.5px solid ${isActive ? cat.color : 'var(--border)'}`,
                        }}>
                        <CatIcon icon={cat.icon} size={14} color={isActive ? 'white' : cat.color} />
                        {label}
                      </button>
                    )
                  })}
                </div>
                {allTags.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none px-1">
                    <span className="text-xs uppercase tracking-wider font-semibold shrink-0 text-[var(--text-muted)]">{b.tags}</span>
                    {allTags.map(tag => (
                      <button key={tag}
                        onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                        className="px-3 rounded-lg text-sm font-medium transition-all shrink-0"
                        style={{
                          minHeight: '44px',
                          background: activeTag === tag ? 'var(--text)' : 'var(--bg-card)',
                          color: activeTag === tag ? 'var(--bg)' : 'var(--text-muted)',
                        }}>
                        #{tag}
                      </button>
                    ))}
                  </div>
                )}
                {(activeCategory !== 'all' || activeTag) && (
                  <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                    <span>{b.found.replace('{count}', String(filtered.length)).replace(/\{plural\}/g, filtered.length > 1 ? 's' : '')}</span>
                    <button onClick={clearFilters} className="underline hover:text-[var(--accent)]">{b.reset}</button>
                  </div>
                )}
              </div>

              {/* Featured articles (3 big cards) */}
              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <svg width="48" height="48" viewBox="0 0 16 16" fill="var(--text-muted)" className="mx-auto mb-4">
                    <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85zm-5.242.156a5 5 0 110-10 5 5 0 010 10z" />
                  </svg>
                  <p className="text-lg font-semibold text-[var(--text)]">{b.noResults}</p>
                  <p className="text-base mt-1 text-[var(--text-muted)]">{b.noResultsHint}</p>
                  <button onClick={clearFilters} className="btn-outline mt-4">{b.viewAll}</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {featured[0] && <FeaturedCard article={featured[0]} locale={locale} readLabel={b.read} size="large" />}
                  <div className="grid grid-cols-1 gap-5" style={{ gridTemplateRows: '1fr 1fr' }}>
                    {featured[1] && <FeaturedCard article={featured[1]} locale={locale} readLabel={b.read} size="medium" />}
                    {featured[2] && <FeaturedCard article={featured[2]} locale={locale} readLabel={b.read} size="medium" />}
                  </div>
                </div>
              )}

              {/* Sponsored slot */}
              {filtered.length > 0 && (
                <div className="mt-8">
                  <div
                    className="rounded-2xl overflow-hidden border border-[var(--border)]"
                    style={{ background: 'var(--bg-card)' }}
                  >
                    <div className="flex items-center gap-2 px-5 pt-4">
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{
                          background: 'var(--bg-subtle)',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {t.ads.sponsored}
                      </span>
                    </div>
                    <div className="p-5 pt-3">
                      <AdBanner slot="1456909323" format="rectangle" />
                    </div>
                  </div>
                </div>
              )}

              {/* Carousel: remaining articles */}
              {rest.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-[var(--text)]">{b.otherArticles}</h2>
                    {rest.length > 3 && (
                      <div className="flex gap-2">
                        <button onClick={() => scrollCarousel('left')} disabled={!canScrollLeft}
                          className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-30" aria-label="Previous">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M10.354 3.354a.5.5 0 00-.708-.708l-5 5a.5.5 0 000 .708l5 5a.5.5 0 00.708-.708L5.707 8l4.647-4.646z"/></svg>
                        </button>
                        <button onClick={() => scrollCarousel('right')} disabled={!canScrollRight}
                          className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-30" aria-label="Next">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M5.646 3.354a.5.5 0 01.708-.708l5 5a.5.5 0 010 .708l-5 5a.5.5 0 01-.708-.708L10.293 8 5.646 3.354z"/></svg>
                        </button>
                      </div>
                    )}
                  </div>
                  <div ref={carouselRef} className="flex gap-5 overflow-x-auto pb-4 scrollbar-none" style={{ scrollSnapType: 'x mandatory' }}>
                    {rest.map(article => <CarouselCard key={article.slug} article={article} locale={locale} readLabel={b.read} />)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ background: '#0f172a', padding: '3rem 0' }}>
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-3 text-white">{b.ctaTitle}</h2>
          <p className="mb-5 text-white/70 text-sm max-w-md mx-auto">{b.ctaSubtitle}</p>
          <Link href={`/${locale}/comparateur`}
            className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-semibold py-3 px-6 sm:px-7 rounded-xl text-sm transition-transform hover:-translate-y-0.5"
            style={{ minHeight: '48px' }}>
            {b.ctaButton}
          </Link>
        </div>
      </section>
    </>
  )
}

// ── Featured card ────────────────────────────────────────────────
function FeaturedCard({ article, locale, readLabel, size }: {
  article: Article; locale: string; readLabel: string; size: 'large' | 'medium'
}) {
  const isLarge = size === 'large'
  return (
    <Link href={`/${locale}/blog/${article.slug}`}
      className={`group block rounded-2xl overflow-hidden transition-all hover:shadow-xl ${isLarge ? 'lg:row-span-2' : ''}`}
      style={{ background: '#0f172a' }}>
      <div className="relative flex items-end p-4 sm:p-6 h-full"
        style={{
          background: !article.coverImage ? (article.coverGradient || `linear-gradient(135deg, ${article.categoryColor}40 0%, #1e293b 60%, #334155 100%)`) : '#0f172a',
          minHeight: isLarge ? '420px' : undefined,
        }}>
        {article.coverImage && (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes={isLarge ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 1024px) 100vw, 25vw'}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={isLarge}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent" />
        <div className="relative z-10 w-full">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', backdropFilter: 'blur(4px)' }}>
              {article.category}
            </span>
            <span className="text-xs text-white/60">{article.readTime}</span>
          </div>
          <h2 className={`font-bold text-white leading-snug group-hover:text-blue-300 transition-colors ${isLarge ? 'text-2xl md:text-3xl mb-3' : 'text-base md:text-lg mb-2'}`}>
            {article.title}
          </h2>
          {isLarge && (
            <p className="text-sm leading-relaxed text-white/60 mb-3 line-clamp-2 max-w-lg">{article.description}</p>
          )}
          <span className="text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">{readLabel}</span>
        </div>
      </div>
    </Link>
  )
}

// ── Carousel card ────────────────────────────────────────────────
function CarouselCard({ article, locale, readLabel }: {
  article: Article; locale: string; readLabel: string
}) {
  return (
    <Link href={`/${locale}/blog/${article.slug}`}
      className="group block rounded-xl border border-[var(--border)] bg-[var(--bg)] transition-all hover:border-[var(--accent)] hover:shadow-md shrink-0 overflow-hidden"
      style={{ width: 'min(300px, 85vw)', scrollSnapAlign: 'start' }}>
      {article.coverImage ? (
        <div className="relative h-36 overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="300px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent opacity-30" />
        </div>
      ) : (
        <div className="rounded-t-xl" style={{ height: '6px', background: `linear-gradient(90deg, ${article.categoryColor}, ${article.categoryColor}60)` }} />
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
            style={{ background: article.categoryColor + '12', color: article.categoryColor }}>
            {article.category}
          </span>
          <span className="text-xs text-[var(--text-muted)]">{article.readTime}</span>
        </div>
        <h3 className="text-base font-bold leading-snug group-hover:text-[var(--accent)] transition-colors text-[var(--text)] mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-sm leading-relaxed line-clamp-2 text-[var(--text-muted)] mb-3">{article.description}</p>
        <span className="text-sm font-semibold text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">{readLabel}</span>
      </div>
    </Link>
  )
}
