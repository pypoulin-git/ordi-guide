'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/i18n/DictionaryContext'

interface MatchedArticle {
  slug: string
  title: string
  relevance: string
  isTopMatch?: boolean
}

interface BlogAnswer {
  answer: string
  matchedArticles: MatchedArticle[]
  isImprovised: boolean
}

export default function CompyBlogBar({ compact }: { compact?: boolean }) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<BlogAnswer | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { t, locale } = useTranslation()
  const c = t.compy

  const EXAMPLES = [c.example1, c.example2, c.example3]

  async function ask(q?: string) {
    const text = q || query
    if (!text.trim() || text.trim().length < 3) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/blog-ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text.trim(), locale }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch {
      setError(c.errorGeneric)
    } finally {
      setLoading(false)
    }
  }

  // ── Compact mode (sidebar) ─────────────────────────────────────
  if (compact) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #2563eb, #0891b2)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <span className="text-xs font-bold text-[var(--text)]">{c.title}</span>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && ask()}
          placeholder={locale === 'fr' ? 'Pose ta question...' : 'Ask a question...'}
          maxLength={200}
          className="w-full px-3 py-2 rounded-lg text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none mb-2"
        />
        <button
          onClick={() => ask()}
          disabled={loading || query.trim().length < 3}
          className="w-full py-1.5 rounded-lg text-xs font-semibold text-white transition-all disabled:opacity-40"
          style={{ background: '#2563eb' }}>
          {loading ? (
            <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : c.askButton}
        </button>
        {result && (
          <div className="mt-2 p-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)]">
            <p className="text-xs leading-relaxed text-[var(--text)] line-clamp-6">{result.answer}</p>
            {result.matchedArticles.length > 0 && (
              <div className="mt-2 pt-2 border-t border-[var(--border)] space-y-1">
                {result.matchedArticles.slice(0, 2).map(a => (
                  <Link key={a.slug} href={`/${locale}/blog/${a.slug}`}
                    className="block text-xs font-medium text-[var(--accent)] hover:underline truncate">
                    {a.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>
    )
  }

  // ── Full mode ─────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {/* Compy avatar */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #2563eb, #0891b2)', boxShadow: '0 2px 8px rgba(37,99,235,0.3)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-bold text-[var(--text)]">{c.title}</h3>
          <p className="text-sm text-[var(--text-muted)]">{c.subtitle}</p>
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && ask()}
            placeholder={c.placeholder}
            maxLength={200}
            className="w-full px-4 py-3 rounded-xl text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors"
          />
        </div>
        <button
          onClick={() => ask()}
          disabled={loading || query.trim().length < 3}
          className="px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40"
          style={{ background: '#2563eb' }}>
          {loading ? (
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            c.askButton
          )}
        </button>
      </div>

      {/* Example questions */}
      {!result && !loading && !error && (
        <div className="flex flex-wrap gap-2 mt-3">
          {EXAMPLES.map((ex, i) => (
            <button key={i}
              onClick={() => { setQuery(ex); ask(ex) }}
              className="text-sm px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
              {ex}
            </button>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-4 flex items-center gap-3">
          <img
            src="/images/VideoGIFCompySearching.gif"
            alt="Compy searching"
            width={48}
            height={48}
            className="rounded-lg"
          />
          <span className="text-sm font-medium text-[var(--text-muted)] animate-pulse">{c.thinking}</span>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-4 p-5 rounded-xl border border-[var(--border)] bg-[var(--bg)]">
          <p className="text-sm leading-relaxed text-[var(--text)] whitespace-pre-line">
            {result.answer}
          </p>

          {/* Matched articles */}
          {result.matchedArticles.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                {c.relatedArticles}
              </p>
              <div className="space-y-2">
                {result.matchedArticles.map(a => (
                  <Link key={a.slug} href={`/${locale}/blog/${a.slug}`}
                    className={`flex items-center justify-between rounded-lg transition-colors group ${
                      a.isTopMatch
                        ? 'p-4 border-2 border-[var(--accent)] bg-[var(--accent-bg)] hover:shadow-md'
                        : 'p-3 hover:bg-[var(--bg-card)]'
                    }`}>
                    <div className="flex-1 min-w-0">
                      <span className={`font-medium group-hover:text-[var(--accent)] transition-colors ${
                        a.isTopMatch ? 'text-base text-[var(--accent)]' : 'text-sm text-[var(--text)]'
                      }`}>
                        {a.title}
                      </span>
                    </div>
                    {a.isTopMatch ? (
                      <span className="shrink-0 ml-3 px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                        style={{ background: '#2563eb' }}>
                        {a.relevance}
                      </span>
                    ) : (
                      <span className="shrink-0 ml-3 text-xs text-[var(--text-muted)]">{a.relevance}</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {result.isImprovised && (
            <p className="mt-3 text-sm text-[var(--text-muted)] italic">
              {c.improvisedNote}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
