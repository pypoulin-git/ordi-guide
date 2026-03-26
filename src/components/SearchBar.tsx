'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'

interface SearchResult {
  answer: string
  specs: {
    cpu: string
    ram: string
    ssd: string
    gpu: string
    budget: string
  }
  archetype: string
  usage_detected: string[]
  error?: string
}

const ARCHETYPE_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  minimalist: { label: 'Le Minimaliste', icon: '🧘', color: '#7c3aed' },
  athlete:    { label: 'L\'Athlète',     icon: '🏃', color: '#0891b2' },
  geek:       { label: 'Le Geek',        icon: '🤓', color: '#1e40af' },
}

const EXAMPLES = [
  'Un ordi pour ma mère qui fait du Zoom et du courriel',
  'Je veux un portable léger pour l\'université',
  'Un PC pour jouer à des jeux récents sans me ruiner',
  'Je fais du montage vidéo 4K, qu\'est-ce qu\'il me faut ?',
]

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<SearchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function search(q?: string) {
    const text = q || query
    if (!text.trim() || text.trim().length < 3) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text.trim() }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch {
      setError('Erreur de connexion. Réessaie dans un instant.')
    } finally {
      setLoading(false)
    }
  }

  function useExample(ex: string) {
    setQuery(ex)
    search(ex)
  }

  const arch = result?.archetype ? ARCHETYPE_LABELS[result.archetype] : null

  return (
    <div>
      {/* ── Search input ─────────────────────────────────────── */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && search()}
            placeholder="Décris ton besoin en une phrase…"
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors"
            style={{ borderColor: '#e2e8f0', background: 'white', color: '#0f172a' }}
            disabled={loading}
          />
        </div>
        <button
          onClick={() => search()}
          disabled={loading || query.trim().length < 3}
          className="btn-primary px-6 py-3 text-sm shrink-0 disabled:opacity-50"
        >
          {loading ? '⏳' : 'Chercher'}
        </button>
      </div>

      {/* ── Examples ─────────────────────────────────────────── */}
      {!result && !loading && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs" style={{ color: '#94a3b8' }}>Essaie :</span>
          {EXAMPLES.map(ex => (
            <button key={ex} onClick={() => useExample(ex)}
              className="text-xs px-3 py-1 rounded-full transition-colors hover:bg-[--accent-bg]"
              style={{ background: '#f1f5f9', color: '#475569' }}>
              {ex}
            </button>
          ))}
        </div>
      )}

      {/* ── Loading ──────────────────────────────────────────── */}
      {loading && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-sm" style={{ color: '#64748b' }}>
            <span className="animate-spin text-lg">⚙️</span>
            Notre assistant analyse ta demande…
          </div>
        </div>
      )}

      {/* ── Error ────────────────────────────────────────────── */}
      {error && (
        <div className="mt-4 p-4 rounded-xl text-sm" style={{ background: '#fef3c7', color: '#92400e' }}>
          ⚠️ {error}
        </div>
      )}

      {/* ── Result ───────────────────────────────────────────── */}
      {result && (
        <div className="mt-6 space-y-4">
          {/* Answer */}
          <div className="card" style={{ border: '2px solid #2563eb', padding: '1.5rem' }}>
            {arch && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
                style={{ background: arch.color + '15', color: arch.color }}>
                {arch.icon} Profil : {arch.label}
              </div>
            )}
            <p className="text-sm leading-relaxed" style={{ color: '#0f172a' }}>
              {result.answer}
            </p>
          </div>

          {/* Specs */}
          {result.specs && (
            <div className="card" style={{ padding: '1.25rem' }}>
              <h3 className="font-semibold text-sm mb-3" style={{ color: '#0f172a' }}>
                📋 Spécifications recommandées
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(result.specs).map(([key, val]) => (
                  <div key={key} className="flex items-start gap-2 text-sm">
                    <span style={{ color: '#0891b2' }}>✓</span>
                    <div>
                      <span className="font-medium" style={{ color: '#0f172a' }}>
                        {key === 'cpu' ? 'Processeur' : key === 'ram' ? 'RAM' : key === 'ssd' ? 'Stockage' : key === 'gpu' ? 'Graphique' : 'Budget'}
                      </span>
                      <span style={{ color: '#64748b' }}> — {val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/comparateur" className="btn-primary flex-1 justify-center text-sm">
              🎯 Questionnaire complet →
            </Link>
            <Link href="/guide" className="btn-outline flex-1 justify-center text-sm">
              📖 En savoir plus dans le guide
            </Link>
          </div>

          <p className="text-center text-xs" style={{ color: '#94a3b8' }}>
            🤖 Réponse générée par IA · Les recommandations sont à titre indicatif
          </p>
        </div>
      )}
    </div>
  )
}
