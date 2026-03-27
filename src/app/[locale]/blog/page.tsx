'use client'
import Link from 'next/link'
import { useState } from 'react'
import { articles, CATEGORIES, getAllTags } from '@/content/articles'
import TechIllustration from '@/components/TechIllustration'

const allTags = getAllTags(articles)

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = articles.filter(a => {
    if (activeCategory !== 'all' && a.category !== activeCategory) return false
    if (activeTag && !a.tags.includes(activeTag)) return false
    return true
  })

  const featured = filtered.find(a => a.featured) ?? filtered[0]
  const rest = filtered.filter(a => a !== featured)

  function clearFilters() {
    setActiveCategory('all')
    setActiveTag(null)
  }

  return (
    <>
      {/* ── Hero compact ──────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #334155 100%)',
        padding: '3rem 0 3.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative shapes */}
        <div aria-hidden style={{
          position: 'absolute', top: '-50px', right: '-30px',
          width: '250px', height: '250px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
        }} />
        <div aria-hidden style={{
          position: 'absolute', bottom: '-30px', left: '10%',
          width: '160px', height: '160px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.02)',
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
                {articles.length} articles · Shop Compy
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                Le Décodeur
              </h1>
              <p className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed">
                La tech expliquée simplement. Des articles courts pour comprendre
                sans diplôme en informatique.
              </p>
            </div>
          </div>
        </div>

        {/* Wave transition */}
        <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '28px' }}>
          <svg viewBox="0 0 1440 28" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path d="M0,28 L0,14 Q360,0 720,14 Q1080,28 1440,14 L1440,28 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ── Category filters ──────────────────────────────────── */}
      <section style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '1.25rem 0' }}>
        <div className="container">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id
              return (
                <button key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setActiveTag(null) }}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all shrink-0"
                  style={{
                    background: isActive ? cat.color : 'white',
                    color: isActive ? 'white' : cat.color,
                    border: `1.5px solid ${isActive ? cat.color : '#e2e8f0'}`,
                    boxShadow: isActive ? `0 2px 8px ${cat.color}30` : 'none',
                  }}>
                  <span className="text-base">{cat.icon}</span>
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* ── Tag pills ──────────────────────────────────────── */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs uppercase tracking-wider font-semibold shrink-0" style={{ color: '#94a3b8' }}>
              Tags :
            </span>
            {allTags.map(tag => {
              const isActive = activeTag === tag
              return (
                <button key={tag}
                  onClick={() => setActiveTag(isActive ? null : tag)}
                  className="px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0"
                  style={{
                    background: isActive ? '#0f172a' : '#f1f5f9',
                    color: isActive ? 'white' : '#64748b',
                  }}>
                  #{tag}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Active filter indicator ───────────────────────────── */}
      {(activeCategory !== 'all' || activeTag) && (
        <div className="container" style={{ padding: '0.75rem 0 0' }}>
          <div className="flex items-center gap-2 text-sm" style={{ color: '#64748b' }}>
            <span>{filtered.length} article{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}</span>
            <button onClick={clearFilters}
              className="underline hover:text-[--accent]">
              Réinitialiser
            </button>
          </div>
        </div>
      )}

      {/* ── Featured + list layout ────────────────────────────── */}
      <section className="section">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg font-semibold" style={{ color: '#0f172a' }}>Aucun article ne correspond</p>
              <p className="text-base mt-1" style={{ color: '#64748b' }}>Essaie une autre catégorie ou un autre tag</p>
              <button onClick={clearFilters}
                className="btn-outline mt-4">
                Voir tous les articles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* ── Featured article (left, large) ────────────── */}
              {featured && (
                <Link href={`/blog/${featured.slug}`}
                  className="lg:col-span-3 group block rounded-2xl overflow-hidden transition-shadow hover:shadow-xl"
                  style={{ background: '#0f172a' }}>
                  {/* Cover gradient area */}
                  <div className="relative h-56 md:h-72 flex items-end p-6"
                    style={{
                      background: featured.coverGradient || 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                    }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80" />
                    <div className="relative text-8xl opacity-30 absolute top-4 right-6 select-none">
                      {featured.icon}
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold px-3 py-1 rounded-full"
                          style={{ background: 'rgba(255,255,255,0.15)', color: 'white', backdropFilter: 'blur(4px)' }}>
                          {featured.category}
                        </span>
                        <span className="text-xs text-white/50">
                          {featured.readTime}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug group-hover:text-blue-300 transition-colors">
                        {featured.title}
                      </h2>
                    </div>
                  </div>
                  {/* Description area */}
                  <div className="p-6 pt-4">
                    <p className="text-base leading-relaxed text-white/60 mb-4">
                      {featured.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {featured.tags.slice(0, 3).map(t => (
                          <span key={t} className="text-xs px-2.5 py-1 rounded"
                            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
                            #{t}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                        Lire →
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* ── Other articles (right, compact list) ─────── */}
              <div className="lg:col-span-2 space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider pb-2"
                  style={{ color: '#94a3b8', borderBottom: '2px solid #e2e8f0' }}>
                  {rest.length > 0 ? 'Autres articles' : 'À venir'}
                </h3>

                {rest.length === 0 && (
                  <p className="text-base py-4" style={{ color: '#94a3b8' }}>
                    D&apos;autres articles arrivent bientôt…
                  </p>
                )}

                {rest.map(article => (
                  <Link key={article.slug} href={`/blog/${article.slug}`}
                    className="block p-4 rounded-xl border transition-all hover:border-[--accent] hover:shadow-sm group"
                    style={{ borderColor: '#e2e8f0', background: 'white' }}>
                    <div className="flex items-start gap-3">
                      <span className="text-3xl shrink-0 mt-0.5">{article.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                            style={{ background: article.categoryColor + '12', color: article.categoryColor }}>
                            {article.category}
                          </span>
                          <span className="text-xs" style={{ color: '#cbd5e1' }}>
                            {article.readTime}
                          </span>
                        </div>
                        <h3 className="text-base font-bold leading-snug group-hover:text-[--accent] transition-colors"
                          style={{ color: '#0f172a' }}>
                          {article.title}
                        </h3>
                        <p className="text-sm mt-1.5 leading-relaxed line-clamp-2" style={{ color: '#94a3b8' }}>
                          {article.description}
                        </p>
                        <div className="flex gap-1.5 mt-2">
                          {article.tags.slice(0, 3).map(t => (
                            <span key={t} className="text-xs px-2 py-0.5 rounded"
                              style={{ background: '#f1f5f9', color: '#94a3b8' }}>
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section style={{ background: '#0f172a', padding: '3.5rem 0' }}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Prêt à passer à l&apos;action ?
          </h2>
          <p className="mb-6 text-white/60 text-base max-w-md mx-auto">
            Maintenant que tu comprends les bases, trouvons l&apos;ordinateur qui te correspond.
          </p>
          <Link href="/comparateur"
            className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-semibold py-3.5 px-8 rounded-xl text-base transition-transform hover:-translate-y-0.5">
            M&apos;aider à choisir →
          </Link>
        </div>
      </section>
    </>
  )
}
