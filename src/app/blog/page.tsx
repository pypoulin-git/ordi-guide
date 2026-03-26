import Link from 'next/link'
import { articles } from '@/content/articles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Le Décodeur — Blog tech sans jargon | Shop Compy',
  description: 'Articles simples et honnêtes pour comprendre la technologie. Processeur, RAM, SSD, écran… expliqués avec des analogies que tout le monde comprend.',
}

export default function BlogPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #ecfeff 0%, #f8fafc 60%, #eff6ff 100%)' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            style={{ background: '#ecfeff', color: '#0891b2', border: '1px solid #a5f3fc' }}>
            📰 Le Décodeur · La tech expliquée simplement
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#0f172a' }}>
            Le Décodeur
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
            Des articles courts et clairs pour comprendre la technologie sans
            avoir besoin d&apos;un diplôme en informatique. Promis, zéro jargon non expliqué.
          </p>
        </div>
      </section>

      {/* ── Article grid ────────────────────────────────────────── */}
      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <div className="space-y-5">
            {articles.map(article => (
              <Link key={article.slug} href={`/blog/${article.slug}`}
                className="card block hover:no-underline group transition-shadow hover:shadow-md"
                style={{ padding: '1.5rem' }}>
                <div className="flex items-start gap-4">
                  <span className="text-4xl shrink-0">{article.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: article.categoryColor + '15', color: article.categoryColor }}>
                        {article.category}
                      </span>
                      <span className="text-xs" style={{ color: '#94a3b8' }}>
                        {article.readTime}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold mb-1 group-hover:text-[--accent] transition-colors"
                      style={{ color: '#0f172a' }}>
                      {article.title}
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
                      {article.description}
                    </p>
                    <span className="inline-block mt-3 text-sm font-semibold" style={{ color: '#2563eb' }}>
                      Lire l&apos;article →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#0f172a' }}>
            Envie de passer à l&apos;action ?
          </h2>
          <p className="mb-6" style={{ color: '#475569' }}>
            Maintenant que tu comprends les bases, trouvons l&apos;ordinateur qui te correspond.
          </p>
          <Link href="/comparateur" className="btn-primary">
            🎯 M&apos;aider à choisir →
          </Link>
        </div>
      </section>
    </>
  )
}
