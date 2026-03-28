import Link from 'next/link'
import { getArticles, getArticleBySlug } from '@/content/articles'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { use } from 'react'
import JsonLd from '@/components/JsonLd'
import TechIllustration from '@/components/TechIllustration'
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'

type Props = {
  params: Promise<{ slug: string; locale: string }>
}

export function generateStaticParams() {
  // Use French articles for static params (slugs are the same in both languages)
  return getArticles('fr').map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const article = getArticleBySlug(slug, locale as Locale)
  if (!article) return {}
  return {
    title: `${article.title} | ${locale === 'fr' ? 'Le Décodeur' : 'The Decoder'} — Shop Compy`,
    description: article.description,
  }
}

export default function ArticlePage({ params }: Props) {
  const { slug, locale } = use(params)
  const article = getArticleBySlug(slug, locale as Locale)
  if (!article) notFound()
  const t = use(getDictionary(locale as Locale))
  const ba = t.blogArticle

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
    inLanguage: locale === 'fr' ? 'fr-CA' : 'en-CA',
  }

  return (
    <>
      <JsonLd data={articleSchema} />

      {/* Breadcrumb */}
      <div className="bg-[--bg-subtle] border-b border-[--border]">
        <div className="container max-w-3xl mx-auto py-3">
          <nav className="flex items-center gap-2 text-base text-[--text-muted]" aria-label="Breadcrumb">
            <Link href={`/${locale}`} className="hover:underline text-[--accent]">{ba.breadcrumbHome}</Link>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="shrink-0 opacity-50"><path d="M5.646 3.354a.5.5 0 01.708-.708l5 5a.5.5 0 010 .708l-5 5a.5.5 0 01-.708-.708L10.293 8 5.646 3.354z"/></svg>
            <Link href={`/${locale}/blog`} className="hover:underline text-[--accent]">{ba.breadcrumbBlog}</Link>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="shrink-0 opacity-50"><path d="M5.646 3.354a.5.5 0 01.708-.708l5 5a.5.5 0 010 .708l-5 5a.5.5 0 01-.708-.708L10.293 8 5.646 3.354z"/></svg>
            <span className="text-[--text-subtle] truncate">{article.title.slice(0, 50)}{article.title.length > 50 ? '...' : ''}</span>
          </nav>
        </div>
      </div>

      {/* -- Hero -- */}
      <section style={{
        background: `linear-gradient(135deg, ${article.categoryColor}18 0%, var(--bg-subtle) 100%)`,
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
          <Link href={`/${locale}/blog`} className="inline-flex items-center gap-1 text-sm mb-5 hover:underline text-[--accent]">
            {ba.backToBlog}
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold px-2.5 py-1 rounded-full"
              style={{ background: article.categoryColor + '18', color: article.categoryColor, border: `1px solid ${article.categoryColor}30` }}>
              {article.category}
            </span>
            <span className="text-sm text-[--text-muted]">
              {article.readTime} · {new Date(article.date).toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-[--text]">
            {article.title}
          </h1>
          <p className="text-lg leading-relaxed text-[--text-subtle]">
            {article.description}
          </p>
        </div>

        {/* Subtle wave */}
        <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '20px' }}>
          <svg viewBox="0 0 1440 20" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path d="M0,20 L0,10 Q360,0 720,10 Q1080,20 1440,10 L1440,20 Z" className="fill-[--bg]" />
          </svg>
        </div>
      </section>

      {/* -- TL;DR -- */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
        <div className="container max-w-3xl mx-auto">
          <div className="p-5 rounded-xl bg-[--accent-bg]" style={{ border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 font-semibold text-base mb-2 text-[--accent]">
              {ba.tldr}
            </div>
            <p className="text-base leading-relaxed text-[--text-subtle]">
              {article.tldr}
            </p>
          </div>
        </div>
      </section>

      {/* -- Article body -- */}
      <div className="container max-w-3xl mx-auto pb-12">
        <div className="space-y-10">
          {article.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-2xl font-bold mb-4 text-[--text]">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-base leading-relaxed text-[--text-subtle]">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* -- Bottom CTA -- */}
      <section className="section bg-[--bg-subtle] border-t border-[--border]">
        <div className="container max-w-3xl mx-auto text-center">
          <p className="mb-4 text-[--text-subtle]">
            {article.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/comparateur`} className="btn-primary">
              {ba.helpChoose}
            </Link>
            <Link href={`/${locale}/blog`} className="btn-outline">
              {ba.readMore}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
