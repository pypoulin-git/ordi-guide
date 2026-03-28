'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/i18n/DictionaryContext'

interface BlogAnswer {
  answer: string
  matchedArticles: { slug: string; title: string; relevance: string }[]
  isImprovised: boolean
}

export default function CompyBlogBar() {
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
          <h3 className="text-base font-bold text-[--text]">{c.title}</h3>
          <p className="text-sm text-[--text-muted]">{c.subtitle}</p>
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
            className="w-full px-4 py-3 rounded-xl text-sm bg-[--bg] border border-[--border] text-[--text] placeholder:text-[--text-muted] focus:outline-none focus:border-[--accent] transition-colors"
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
              className="text-xs px-3 py-1.5 rounded-lg border border-[--border] text-[--text-muted] hover:border-[--accent] hover:text-[--accent] transition-colors">
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
        <div className="mt-4 flex items-center gap-3 text-sm text-[--text-muted]">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-[--accent] animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-[--accent] animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-[--accent] animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          {c.thinking}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-4 p-5 rounded-xl border border-[--border] bg-[--bg]">
          <p className="text-sm leading-relaxed text-[--text] whitespace-pre-line">
            {result.answer}
          </p>

          {/* Matched articles */}
          {result.matchedArticles.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[--border]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[--text-muted] mb-2">
                {c.relatedArticles}
              </p>
              <div className="space-y-2">
                {result.matchedArticles.map(a => (
                  <Link key={a.slug} href={`/${locale}/blog/${a.slug}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-[--bg-card] transition-colors group">
                    <div>
                      <span className="text-sm font-medium text-[--text] group-hover:text-[--accent] transition-colors">
                        {a.title}
                      </span>
                      <span className="text-xs text-[--text-muted] ml-2">{a.relevance}</span>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--accent)" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <path d="M5.646 3.354a.5.5 0 01.708-.708l5 5a.5.5 0 010 .708l-5 5a.5.5 0 01-.708-.708L10.293 8 5.646 3.354z" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {result.isImprovised && (
            <p className="mt-3 text-xs text-[--text-muted] italic">
              {c.improvisedNote}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
