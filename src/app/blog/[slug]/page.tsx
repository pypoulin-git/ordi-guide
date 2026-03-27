import Link from 'next/link'
import { articles, getArticleBySlug } from '@/content/articles'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { use } from 'react'
import JsonLd from '@/components/JsonLd'
import TechIllustration from '@/components/TechIllustration'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: `${article.title} | Le Décodeur — Shop Compy`,
    description: article.description,
  }
}

export default function ArticlePage({ params }: Props) {
  const { slug } = use(params)
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'Shop Compy' },
    publisher: { '@type': 'Organization', name: 'Shop Compy', url: 'https://ordi-guide.vercel.app' },
    mainEntityOfPage: `https://ordi-guide.vercel.app/blog/${article.slug}`,
    articleSection: article.category,
    inLanguage: 'fr-CA',
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(135deg, ${article.categoryColor}18 0%, #f8fafc 100%)`,
        padding: '2.5rem 0 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative shapes */}
        <div aria-hidden style={{
          position: 'absolute', top: '-40px', right: '-20px',
          width: '200px', height: '200px', borderRadius: '50%',
          background: `${article.categoryColor}08`,
        }} />
        <div aria-hidden style={{
          position: 'absolute', bottom: '-30px', left: '5%',
          width: '140px', height: '140px', borderRadius: '50%',
          background: `${article.categoryColor}05`,
        }} />
        {/* Circuit pattern */}
        <div aria-hidden style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          paddingRight: '1rem', color: article.categoryColor,
        }}>
          <TechIllustration variant="circuit-pattern" size={200} style={{ opacity: 0.035 }} />
        </div>

        <div className="container max-w-3xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm mb-5 hover:underline"
            style={{ color: '#2563eb' }}>
            ← Retour au Décodeur
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: article.categoryColor + '18', color: article.categoryColor, border: `1px solid ${article.categoryColor}30` }}>
              {article.category}
            </span>
            <span className="text-xs" style={{ color: '#94a3b8' }}>
              {article.readTime} · {new Date(article.date).toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: '#0f172a' }}>
            <span className="mr-2">{article.icon}</span>{article.title}
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
            {article.description}
          </p>
        </div>

        {/* Subtle wave */}
        <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '20px' }}>
          <svg viewBox="0 0 1440 20" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path d="M0,20 L0,10 Q360,0 720,10 Q1080,20 1440,10 L1440,20 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── TL;DR ────────────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
        <div className="container max-w-3xl mx-auto">
          <div className="p-5 rounded-xl" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <div className="flex items-center gap-2 font-semibold text-base mb-2" style={{ color: '#1d4ed8' }}>
              ⚡ TL;DR — L&apos;essentiel en 30 secondes
            </div>
            <p className="text-base leading-relaxed" style={{ color: '#1e40af' }}>
              {article.tldr}
            </p>
          </div>
        </div>
      </section>

      {/* ── Article body ─────────────────────────────────────────── */}
      <div className="container max-w-3xl mx-auto pb-12">
        <div className="space-y-10">
          {article.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#0f172a' }}>
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-base leading-relaxed" style={{ color: '#475569' }}>
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <p className="mb-4" style={{ color: '#475569' }}>
            {article.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/comparateur" className="btn-primary">
              M&apos;aider à choisir →
            </Link>
            <Link href="/blog" className="btn-outline">
              Lire d&apos;autres articles
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
