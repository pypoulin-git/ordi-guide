'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { SOURCE_LABELS, PROFILE_LABELS } from '@/types/catalogue'
import type { CatalogueProduct } from '@/types/catalogue'

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
  recommended_product?: CatalogueProduct
  error?: string
}

const ARCHETYPE_LABELS: Record<string, { label: string; color: string; desc: string }> = {
  minimalist: { label: 'Le Minimaliste', color: '#7c3aed', desc: 'Léger et efficace pour les tâches de base' },
  athlete:    { label: 'Le Performant',  color: '#0891b2', desc: 'Équilibre parfait entre puissance et polyvalence' },
  geek:       { label: 'Le Passionné',   color: '#1e40af', desc: 'Puissance de calcul brute pour les pros' },
  douchebag:  { label: 'Le Frimeur',     color: '#d97706', desc: 'Attention : specs déséquilibrées — gros GPU mais le reste ne suit pas' },
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
      {/* Search input */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && search()}
          placeholder="Décris ton besoin en une phrase…"
          className="flex-1 px-4 py-3 rounded-xl border-2 outline-none transition-colors"
          style={{ borderColor: '#e2e8f0', background: 'white', color: '#0f172a', fontSize: '1rem' }}
          disabled={loading}
        />
        <button
          onClick={() => search()}
          disabled={loading || query.trim().length < 3}
          className="btn-primary shrink-0 disabled:opacity-50"
        >
          {loading ? 'Analyse…' : 'Chercher'}
        </button>
      </div>

      {/* Examples */}
      {!result && !loading && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-sm" style={{ color: '#94a3b8' }}>Essaie :</span>
          {EXAMPLES.map(ex => (
            <button key={ex} onClick={() => useExample(ex)}
              className="text-sm px-3 py-1 rounded-full transition-colors hover:bg-[--accent-bg]"
              style={{ background: '#f1f5f9', color: '#475569' }}>
              {ex}
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-6 text-center">
          <p style={{ color: '#64748b' }}>Notre assistant analyse ta demande…</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 p-4 rounded-xl" style={{ background: '#fef3c7', color: '#92400e', borderLeft: '4px solid #d97706' }}>
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6 space-y-4">
          {/* Answer */}
          <div className="card" style={{ border: '2px solid #2563eb', padding: '1.5rem' }}>
            {arch && (
              <div className="mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold"
                  style={{ background: arch.color + '15', color: arch.color }}>
                  Profil : {arch.label}
                </div>
                <p className="text-xs mt-1.5" style={{ color: arch.color + 'cc' }}>{arch.desc}</p>
              </div>
            )}
            <p style={{ color: '#0f172a', fontSize: '1rem', lineHeight: 1.7 }}>
              {result.answer}
            </p>
          </div>

          {/* Specs */}
          {result.specs && (
            <div className="card" style={{ padding: '1.25rem' }}>
              <h3 className="font-semibold mb-3" style={{ color: '#0f172a' }}>
                Spécifications recommandées
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(result.specs).map(([key, val]) => (
                  <div key={key} className="flex items-start gap-2">
                    <span style={{ color: '#0891b2', fontWeight: 700, flexShrink: 0 }}>·</span>
                    <div>
                      <span className="font-semibold" style={{ color: '#0f172a' }}>
                        {key === 'cpu' ? 'Processeur' : key === 'ram' ? 'RAM' : key === 'ssd' ? 'Stockage' : key === 'gpu' ? 'Graphique' : 'Budget'}
                      </span>
                      <span style={{ color: '#64748b' }}> : {val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended product */}
          {result.recommended_product && (() => {
            const p = result.recommended_product!
            const source = SOURCE_LABELS[p.source]
            return (
              <div className="card" style={{ padding: 0, overflow: 'hidden', border: '2px solid #0891b2' }}>
                <div className="px-5 pt-4 pb-1 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wide" style={{ color: '#0891b2' }}>
                    Produit recommandé
                  </span>
                  <div className="flex items-center gap-2">
                    {p.isOnSale && p.originalPrice && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ background: '#2563eb' }}>
                        -{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)} %
                      </span>
                    )}
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: source.color + '15', color: source.color }}>
                      {source.label}
                    </span>
                  </div>
                </div>
                <div className="px-5 pt-2 pb-4">
                  <p className="text-xs font-medium mb-0.5" style={{ color: '#94a3b8' }}>{p.brand}</p>
                  <h4 className="font-bold mb-3" style={{ color: '#0f172a', fontSize: '1rem', lineHeight: 1.3 }}>
                    {p.name}
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3 text-sm">
                    {p.specs.cpu && <div><span className="font-medium" style={{ color: '#0f172a' }}>CPU</span> <span style={{ color: '#64748b' }}>{p.specs.cpu}</span></div>}
                    {p.specs.ram && <div><span className="font-medium" style={{ color: '#0f172a' }}>RAM</span> <span style={{ color: '#64748b' }}>{p.specs.ram}</span></div>}
                    {p.specs.storage && <div><span className="font-medium" style={{ color: '#0f172a' }}>Stockage</span> <span style={{ color: '#64748b' }}>{p.specs.storage}</span></div>}
                    {p.specs.gpu && <div><span className="font-medium" style={{ color: '#0f172a' }}>GPU</span> <span style={{ color: '#64748b' }}>{p.specs.gpu}</span></div>}
                  </div>
                  <div className="p-3 rounded-lg mb-3" style={{ background: '#f0fdfa', borderLeft: '3px solid #0891b2' }}>
                    <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{p.aiRationale}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.profiles.map(pr => (
                      <span key={pr} className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: '#eff6ff', color: '#2563eb' }}>
                        {PROFILE_LABELS[pr].label}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-end justify-between pt-2" style={{ borderTop: '1px solid #f1f5f9' }}>
                    <div>
                      <span className="text-2xl font-bold" style={{ color: '#0f172a' }}>
                        {p.price.toLocaleString('fr-CA')} $
                      </span>
                      {p.isOnSale && p.originalPrice && (
                        <span className="ml-2 text-sm line-through" style={{ color: '#94a3b8' }}>
                          {p.originalPrice.toLocaleString('fr-CA')} $
                        </span>
                      )}
                    </div>
                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}>
                      Voir le prix →
                    </a>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/comparateur" className="btn-primary flex-1 justify-center">
              Questionnaire complet →
            </Link>
            <Link href="/guide" className="btn-outline flex-1 justify-center">
              En savoir plus dans le guide
            </Link>
          </div>

          <p className="text-center text-sm" style={{ color: '#94a3b8' }}>
            Réponse générée par intelligence artificielle · À titre indicatif
          </p>
        </div>
      )}
    </div>
  )
}
