'use client'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/i18n/DictionaryContext'
import { getSteps, getArchetypeInfo, getRecommendation } from '@/content/comparateur-data'
import { buildAffiliateUrl, getAffiliateRel } from '@/lib/affiliate'
import ActionCTA from '@/components/ActionCTA'
import type { CatalogueProduct, ProfileTag } from '@/types/catalogue'
import { SOURCE_LABELS } from '@/types/catalogue'

type Answers = Record<string, string>

/* ── Inline SVG illustrations per question ─────────────────────────── */
function StepIllustration({ stepId }: { stepId: string }) {
  const s = { width: '100%', height: 'auto', maxWidth: 80, maxHeight: 80 } as const

  switch (stepId) {
    case 'usage':
      return (
        <svg viewBox="0 0 120 120" fill="none" style={s}>
          <rect x="20" y="15" width="80" height="55" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <rect x="26" y="21" width="68" height="43" rx="3" fill="#eff6ff" />
          <rect x="32" y="28" width="24" height="3" rx="1.5" fill="#93c5fd" />
          <rect x="32" y="34" width="40" height="2" rx="1" fill="#bfdbfe" />
          <rect x="32" y="39" width="35" height="2" rx="1" fill="#bfdbfe" />
          <rect x="32" y="51" width="18" height="6" rx="3" fill="#2563eb" />
          <rect x="50" y="70" width="20" height="6" rx="1" fill="#93c5fd" />
          <rect x="42" y="76" width="36" height="4" rx="2" fill="#bfdbfe" />
          <rect x="28" y="86" width="64" height="18" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
          {[32, 40, 48, 56, 64, 72, 80].map(x => (
            <rect key={x} x={x} y="90" width="5" height="4" rx="1" fill="#93c5fd" />
          ))}
        </svg>
      )
    case 'budget':
      return (
        <svg viewBox="0 0 120 120" fill="none" style={s}>
          <rect x="22" y="30" width="76" height="55" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <rect x="22" y="30" width="76" height="18" rx="8" fill="#2563eb" />
          <rect x="70" y="42" width="24" height="16" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <circle cx="82" cy="50" r="4" fill="#2563eb" />
          <text x="42" y="68" fontSize="16" fontWeight="bold" fill="#2563eb" fontFamily="sans-serif">$</text>
          <circle cx="38" cy="98" r="10" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1" />
          <text x="34" y="102" fontSize="10" fontWeight="bold" fill="#2563eb" fontFamily="sans-serif">$</text>
        </svg>
      )
    case 'mobility':
      return (
        <svg viewBox="0 0 120 120" fill="none" style={s}>
          <g transform="rotate(-5 60 60)">
            <rect x="25" y="20" width="60" height="42" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
            <rect x="30" y="25" width="50" height="32" rx="2" fill="#eff6ff" />
            <path d="M20 62 L25 62 L85 62 L90 62 L92 70 L18 70 Z" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1" />
          </g>
          <path d="M85 45 L100 45" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
          <path d="M95 40 L100 45 L95 50" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'screensize':
      return (
        <svg viewBox="0 0 120 120" fill="none" style={s}>
          <rect x="10" y="50" width="30" height="22" rx="3" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
          <text x="20" y="65" fontSize="8" fill="#93c5fd" fontFamily="sans-serif">13&quot;</text>
          <rect x="42" y="35" width="36" height="28" rx="3" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x="52" y="53" fontSize="9" fill="#2563eb" fontFamily="sans-serif">15&quot;</text>
          <rect x="82" y="20" width="30" height="34" rx="3" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <text x="90" y="42" fontSize="8" fill="#2563eb" fontFamily="sans-serif">17&quot;</text>
        </svg>
      )
    case 'brand':
      return (
        <svg viewBox="0 0 120 120" fill="none" style={s}>
          <rect x="12" y="25" width="42" height="35" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <circle cx="33" cy="42" r="7" fill="none" stroke="#2563eb" strokeWidth="1.5" />
          <rect x="66" y="25" width="42" height="35" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <g transform="translate(79 35)">
            <rect x="0" y="0" width="6" height="6" fill="#2563eb" rx="1" />
            <rect x="8" y="0" width="6" height="6" fill="#93c5fd" rx="1" />
            <rect x="0" y="8" width="6" height="6" fill="#93c5fd" rx="1" />
            <rect x="8" y="8" width="6" height="6" fill="#2563eb" rx="1" />
          </g>
          <text x="52" y="78" fontSize="14" fontWeight="bold" fill="#93c5fd" textAnchor="middle" fontFamily="sans-serif">vs</text>
        </svg>
      )
    case 'durability':
      return (
        <svg viewBox="0 0 120 120" fill="none" style={s}>
          <path d="M60 15 L90 30 L90 65 Q90 90 60 105 Q30 90 30 65 L30 30 Z" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <path d="M48 60 L56 68 L74 48" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'priority':
      return (
        <svg viewBox="0 0 120 120" fill="none" style={s}>
          <circle cx="60" cy="55" r="35" fill="none" stroke="#bfdbfe" strokeWidth="2" />
          <circle cx="60" cy="55" r="25" fill="none" stroke="#93c5fd" strokeWidth="2" />
          <circle cx="60" cy="55" r="15" fill="none" stroke="#2563eb" strokeWidth="2" />
          <circle cx="60" cy="55" r="5" fill="#2563eb" />
        </svg>
      )
    case 'level':
      return (
        <svg viewBox="0 0 120 120" fill="none" style={s}>
          <rect x="20" y="30" width="80" height="12" rx="6" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
          <rect x="20" y="55" width="80" height="12" rx="6" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
          <rect x="20" y="80" width="80" height="12" rx="6" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
          <rect x="20" y="30" width="25" height="12" rx="6" fill="#bfdbfe" />
          <rect x="20" y="55" width="55" height="12" rx="6" fill="#93c5fd" />
          <rect x="20" y="80" width="80" height="12" rx="6" fill="#2563eb" />
        </svg>
      )
    default:
      return null
  }
}

/* ── Spec explanation helpers ──────────────────────────────────────── */
function getSpecExplanation(specLine: string, locale: string): { label: string; value: string; why: string } {
  const isFr = locale === 'fr'
  const lower = specLine.toLowerCase()

  if (lower.includes('processeur') || lower.includes('processor') || lower.includes('cpu') || lower.includes('puce')) {
    const value = specLine.split(':').slice(1).join(':').trim() || specLine
    return {
      label: isFr ? '🧠 Processeur' : '🧠 Processor',
      value,
      why: isFr ? 'Le cerveau de ton ordi — détermine la vitesse globale' : 'The brain of your computer — determines overall speed',
    }
  }
  if (lower.includes('ram') || lower.includes('mémoire vive')) {
    const value = specLine.split(':').slice(1).join(':').trim() || specLine
    return {
      label: isFr ? '⚡ Mémoire RAM' : '⚡ RAM',
      value,
      why: isFr ? 'Plus de RAM = plus d\'apps ouvertes en même temps sans ralentir' : 'More RAM = more apps open at once without slowing down',
    }
  }
  if (lower.includes('stockage') || lower.includes('storage') || lower.includes('ssd') || lower.includes('disque')) {
    const value = specLine.split(':').slice(1).join(':').trim() || specLine
    return {
      label: isFr ? '💾 Stockage' : '💾 Storage',
      value,
      why: isFr ? 'Espace pour tes fichiers — SSD = démarrage ultra rapide' : 'Space for your files — SSD = ultra-fast startup',
    }
  }
  if (lower.includes('carte graphique') || lower.includes('graphics') || lower.includes('gpu')) {
    const value = specLine.split(':').slice(1).join(':').trim() || specLine
    return {
      label: isFr ? '🎮 Carte graphique' : '🎮 Graphics card',
      value,
      why: isFr ? 'Gère les images et jeux — essentiel pour le gaming et la création' : 'Handles visuals and games — essential for gaming and creative work',
    }
  }
  if (lower.includes('écran') || lower.includes('display') || lower.includes('screen')) {
    const value = specLine.split(':').slice(1).join(':').trim() || specLine
    return {
      label: isFr ? '🖥️ Écran' : '🖥️ Display',
      value,
      why: isFr ? 'Ce que tu regardes toute la journée — la qualité compte !' : 'What you look at all day — quality matters!',
    }
  }
  if (lower.includes('batterie') || lower.includes('battery') || lower.includes('autonomie')) {
    const value = specLine.split(':').slice(1).join(':').trim() || specLine
    return {
      label: isFr ? '🔋 Autonomie' : '🔋 Battery',
      value,
      why: isFr ? 'Combien de temps sans recharger' : 'How long without plugging in',
    }
  }

  // Generic fallback
  return {
    label: '📋',
    value: specLine,
    why: '',
  }
}

/* ── Best match from catalogue ─────────────────────────────────────── */
function useBestMatch(answers: Answers, done: boolean) {
  const [match, setMatch] = useState<CatalogueProduct | null>(null)
  const [alternatives, setAlternatives] = useState<CatalogueProduct[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!done) return
    setLoading(true)

    fetch('/api/catalogue')
      .then(r => r.ok ? r.json() : null)
      .catch(() => null)
      .then(data => {
        if (!data?.products?.length) { setLoading(false); return }
        const products: CatalogueProduct[] = data.products

        // Simple scoring based on answers
        const usage = answers.usage || 'basic'
        const budgetRaw = answers.budget || '500to900'
        const brand = answers.brand || 'nopreference'

        const profileMap: Record<string, ProfileTag> = {
          basic: 'basic', work: 'work', creative: 'creative', gaming: 'gaming', student: 'student',
        }
        const targetProfile: ProfileTag = profileMap[usage] || 'basic'

        // Map quiz budget values to price ranges
        const budgetRanges: Record<string, [number, number]> = {
          low:       [0, 500],
          'mid-low': [500, 800],
          mid:       [800, 1200],
          high:      [1200, 1800],
          premium:   [1800, 2500],
        }
        const [budgetMin, budgetMax] = budgetRanges[budgetRaw] || [0, 5000]

        const scored = products
          .filter(p => {
            // Filter by brand preference
            if (brand === 'mac' && p.category !== 'apple') return false
            if (brand === 'windows' && p.category === 'apple') return false
            // Only match computers (not accessories/monitors)
            if (!['laptop', 'desktop', 'apple', 'chromebook'].includes(p.category)) return false
            return true
          })
          .map(p => {
            let score = p.aiScore || 0
            // Boost if matches profile
            if (p.profiles?.includes(targetProfile)) score += 15
            // Boost if on sale
            if (p.isOnSale) score += 5
            // Price scoring — strong preference for products within budget range
            if (p.price >= budgetMin && p.price <= budgetMax) {
              score += 20 // Perfect match
            } else if (p.price <= budgetMax * 1.15 && p.price >= budgetMin * 0.85) {
              score += 10 // Close enough (15% tolerance)
            } else if (p.price > budgetMax * 1.3 || p.price < budgetMin * 0.5) {
              score -= 30 // Way out of range
            } else {
              score -= 10 // Somewhat out of range
            }
            return { p, score }
          })
          .sort((a, b) => b.score - a.score)

        setMatch(scored[0]?.p || null)
        // Next best 4 alternatives with brand de-duplication for variety
        const seenBrands = new Set<string>()
        if (scored[0]?.p.brand) seenBrands.add(scored[0].p.brand)
        const alts: CatalogueProduct[] = []
        for (let i = 1; i < scored.length && alts.length < 4; i++) {
          const candidate = scored[i].p
          if (seenBrands.has(candidate.brand) && alts.length >= 2) continue
          seenBrands.add(candidate.brand)
          alts.push(candidate)
        }
        setAlternatives(alts)
        setLoading(false)
      })
  }, [done, answers])

  return { match, alternatives, loading }
}

const SESSION_KEY = 'comparateur_progress'

function saveProgress(answers: Answers, index: number) {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ answers, index })) } catch { /* ignore */ }
}

function clearProgress() {
  try { sessionStorage.removeItem(SESSION_KEY) } catch { /* ignore */ }
}

function loadProgress(): { answers: Answers; index: number } | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed.answers === 'object' && typeof parsed.index === 'number') return parsed
  } catch { /* ignore */ }
  return null
}

export default function ComparateurClient() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [done, setDone] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const { t, locale } = useTranslation()
  const c = t.comparator

  const isFr = locale === 'fr'
  const allSteps = getSteps(locale)
  const ARCHETYPE_INFO = getArchetypeInfo(locale)
  const { match, alternatives, loading } = useBestMatch(answers, done)

  // Restore progress from sessionStorage on mount
  useEffect(() => {
    const saved = loadProgress()
    if (saved && Object.keys(saved.answers).length > 0) {
      setShowResume(true)
    }
  }, [])

  const visibleSteps = useMemo(() => {
    return allSteps.filter(s => !s.showIf || s.showIf(answers))
  }, [allSteps, answers])

  const currentStep = visibleSteps[currentIndex]
  const totalSteps = visibleSteps.length
  const progress = (currentIndex / totalSteps) * 100

  function choose(value: string) {
    const newAnswers = { ...answers, [currentStep.id]: value }
    setAnswers(newAnswers)
    const nextVisible = allSteps.filter(s => !s.showIf || s.showIf(newAnswers))
    if (currentIndex < nextVisible.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      saveProgress(newAnswers, nextIndex)
    } else {
      setDone(true)
      clearProgress()
    }
  }

  function goBack() {
    if (currentIndex > 0) {
      const cleaned = { ...answers }
      delete cleaned[currentStep.id]
      setAnswers(cleaned)
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      saveProgress(cleaned, prevIndex)
    }
  }

  function reset() {
    setCurrentIndex(0)
    setAnswers({})
    setDone(false)
    setShowResume(false)
    clearProgress()
  }

  function resumeProgress() {
    const saved = loadProgress()
    if (saved) {
      setAnswers(saved.answers)
      setCurrentIndex(saved.index)
      setShowResume(false)
    }
  }

  function dismissResume() {
    setShowResume(false)
    clearProgress()
  }

  /* ── RESULTS PAGE ──────────────────────────────────────────────── */
  if (done) {
    const rec = getRecommendation(locale, answers)
    return (
      <div className="section">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-[var(--text)]">{c.resultTitle}</h1>
            <p className="text-[var(--text-subtle)]">{c.resultSubtitle}</p>
          </div>

          {/* Archetype badge */}
          {rec.archetype && ARCHETYPE_INFO[rec.archetype] && (() => {
            const arch = ARCHETYPE_INFO[rec.archetype]
            return (
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold"
                  style={{ background: arch.color + '15', color: arch.color }}>
                  {c.profile} : {arch.label}
                </span>
                <p className="text-sm mt-1.5" style={{ color: arch.color + 'cc' }}>{arch.desc}</p>
                {arch.humorHint && (
                  <p className="text-xs mt-1.5 italic text-[var(--text-muted)]"
                    style={{ maxWidth: '42ch', margin: '0.375rem auto 0' }}>
                    {arch.humorHint}
                  </p>
                )}
              </div>
            )
          })()}

          {/* Recommendation card */}
          <div className="card mb-6" style={{ border: '2px solid var(--accent)' }}>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-[var(--text)]">{rec.title}</h2>
            <p className="mb-5 text-[var(--text-subtle)]">{rec.summary}</p>

            {/* Specs with explanations */}
            <div className="space-y-3 mb-5">
              {rec.specs.map(specLine => {
                const info = getSpecExplanation(specLine, locale)
                return (
                  <div key={specLine} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-subtle)]">
                    <span className="text-lg shrink-0">{info.label.split(' ')[0]}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--text)]">
                        {info.label.includes(' ') ? info.label.split(' ').slice(1).join(' ') : ''} — {info.value}
                      </p>
                      {info.why && (
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{info.why}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {rec.note && (
              <div className="p-4 rounded-lg bg-[var(--accent-bg)]" style={{ borderLeft: '4px solid var(--accent)' }}>
                <p className="font-semibold text-xs uppercase tracking-wide mb-1 text-[var(--accent)]">{c.noteLabel}</p>
                <p className="text-[var(--text-subtle)]" style={{ fontSize: '0.9375rem' }}>{rec.note}</p>
              </div>
            )}
          </div>

          {/* ── Best match from catalogue ── */}
          {loading && (
            <div className="card mb-6 text-center" style={{ padding: '2rem' }}>
              <p className="text-sm text-[var(--text-muted)]">
                {isFr ? 'Recherche du meilleur deal pour toi...' : 'Finding the best deal for you...'}
              </p>
            </div>
          )}

          {match && !loading && (
            <div className="card mb-6" style={{ border: '2px solid var(--success)', padding: '1.5rem' }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-3 text-[var(--success)]">
                {isFr ? '🎯 Meilleur deal selon ton profil' : '🎯 Best deal for your profile'}
              </p>

              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--text-muted)]">{match.brand}</p>
                  <h3 className="font-bold text-[var(--text)] leading-tight">{match.name}</h3>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-bold text-[var(--text)]">{match.price.toLocaleString('fr-CA')} $</p>
                  {match.isOnSale && match.originalPrice ? (
                    <p className="text-sm line-through text-[var(--text-muted)]">{match.originalPrice.toLocaleString('fr-CA')} $</p>
                  ) : null}
                </div>
              </div>

              {/* Quick specs */}
              <div className="flex flex-wrap gap-2 mb-3">
                {match.specs.cpu && match.specs.cpu !== 'N/A' && (
                  <span className="text-xs px-2 py-1 rounded bg-[var(--bg-subtle)] text-[var(--text-subtle)]">
                    {match.specs.cpu}
                  </span>
                )}
                {match.specs.ram && match.specs.ram !== 'N/A' && (
                  <span className="text-xs px-2 py-1 rounded bg-[var(--bg-subtle)] text-[var(--text-subtle)]">
                    {match.specs.ram}
                  </span>
                )}
                {match.specs.storage && match.specs.storage !== 'N/A' && (
                  <span className="text-xs px-2 py-1 rounded bg-[var(--bg-subtle)] text-[var(--text-subtle)]">
                    {match.specs.storage}
                  </span>
                )}
              </div>

              <p className="text-sm text-[var(--text-subtle)] mb-4">{match.aiRationale}</p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={buildAffiliateUrl(match.url, match.source)}
                  target="_blank"
                  rel={getAffiliateRel(match.isGiftPick)}
                  className="btn-primary flex-1 justify-center"
                  style={{ fontSize: '1rem' }}
                >
                  {isFr
                    ? `Voir le deal chez ${SOURCE_LABELS[match.source]?.label || match.source}`
                    : `See deal at ${SOURCE_LABELS[match.source]?.label || match.source}`}
                  {' →'}
                </a>
                <Link
                  href={`/${locale}/catalogue/${match.id}`}
                  className="btn-outline flex-1 justify-center text-sm"
                >
                  {isFr ? 'Voir la fiche complète' : 'See full details'}
                </Link>
              </div>

              <p className="text-xs text-center text-[var(--text-muted)] mt-3">
                {match.isGiftPick
                  ? (isFr ? 'Trouvaille Compy — cette référence est offerte sans revenu pour nous' : 'Compy Find — this referral earns us no revenue')
                  : (isFr ? 'Lien affilié — sans frais pour toi' : 'Affiliate link — no extra cost for you')}
              </p>
            </div>
          )}

          {/* ── Alternatives (2-4 autres produits filtrés par archetype) ── */}
          {alternatives.length > 0 && !loading && (
            <div className="mb-6">
              <h2 className="text-base font-bold mb-3 text-[var(--text)]">
                {isFr ? 'Autres options qui correspondent à ton profil' : 'Other picks matching your profile'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {alternatives.map(alt => (
                  <Link
                    key={alt.id}
                    href={`/${locale}/catalogue/${alt.id}`}
                    className="card hover:border-[var(--accent)] transition-colors"
                    style={{ padding: '1rem', display: 'block' }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[var(--text-muted)]">{alt.brand}</p>
                        <p className="font-semibold text-sm text-[var(--text)] leading-tight line-clamp-2">{alt.name}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-[var(--text)]">{alt.price.toLocaleString(isFr ? 'fr-CA' : 'en-CA')} $</p>
                        {alt.isOnSale && alt.originalPrice ? (
                          <p className="text-xs line-through text-[var(--text-muted)]">{alt.originalPrice.toLocaleString(isFr ? 'fr-CA' : 'en-CA')} $</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {alt.specs.cpu && alt.specs.cpu !== 'N/A' && (
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-subtle)]">
                          {alt.specs.cpu}
                        </span>
                      )}
                      {alt.specs.ram && alt.specs.ram !== 'N/A' && (
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-subtle)]">
                          {alt.specs.ram}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--accent)] mt-2 font-medium">
                      {isFr ? 'Voir la fiche →' : 'See details →'}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── Action buttons ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <Link href={`/${locale}/catalogue`} className="btn-primary justify-center text-center">
              {isFr ? '📦 Explorer le catalogue' : '📦 Browse catalogue'}
            </Link>
            <Link href={`/${locale}/guide`} className="btn-outline justify-center text-center">
              {isFr ? '📖 Lire le guide 101' : '📖 Read the 101 guide'}
            </Link>
            <button onClick={reset} className="btn-outline justify-center text-center">
              {c.restart}
            </button>
          </div>

          {/* ── Expert + Don ── */}
          <ActionCTA variant="compact" className="mb-6" />

          <p className="text-center text-sm text-[var(--text-muted)]">
            {c.disclaimer}
          </p>
        </div>
      </div>
    )
  }

  /* ── QUESTIONNAIRE ─────────────────────────────────────────────── */
  return (
    <div className="section">
      <div className="container max-w-2xl mx-auto">
        {/* Compact header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-[var(--text)]">{c.pageTitle}</h1>
          <p className="text-sm text-[var(--text-subtle)]">
            {c.pageSubtitle.replace('{count}', String(totalSteps))}
          </p>
        </div>

        {/* Resume banner */}
        {showResume && !done && (
          <div className="card mb-5 flex flex-col sm:flex-row items-center gap-3" style={{ border: '2px solid var(--accent)', background: 'var(--accent-bg)' }}>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[var(--text)]">
                {isFr ? 'Tu avais commencé le questionnaire.' : 'You started the questionnaire earlier.'}
              </p>
              <p className="text-sm text-[var(--text-subtle)]">
                {isFr ? 'Reprendre où tu en étais ?' : 'Pick up where you left off?'}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={resumeProgress} className="btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}>
                {isFr ? 'Reprendre' : 'Resume'}
              </button>
              <button onClick={dismissResume} className="btn-outline" style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}>
                {isFr ? 'Recommencer' : 'Start over'}
              </button>
            </div>
          </div>
        )}

        {/* Progress */}
        <div className="mb-5">
          <div className="flex justify-between text-sm mb-1.5 text-[var(--text-muted)]">
            <span aria-live="polite" aria-atomic="true">
              {c.questionOf
                .replace('{current}', String(currentIndex + 1))
                .replace('{total}', String(totalSteps))}
            </span>
            <span>{Math.round(progress)} %</span>
          </div>
          <div
            className="h-2 rounded-full bg-[var(--border)]"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={c.questionOf
              .replace('{current}', String(currentIndex + 1))
              .replace('{total}', String(totalSteps))}
          >
            <div className="h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'var(--accent)' }} />
          </div>
        </div>

        {/* Question card — illustration beside text */}
        <div className="card mb-5">
          <div className="flex items-start gap-4">
            {/* Illustration — left side, compact */}
            <div className="shrink-0 opacity-80 w-16 h-16 sm:w-20 sm:h-20 hidden sm:block">
              <StepIllustration stepId={currentStep.id} />
            </div>

            <div className="flex-1 min-w-0">
              <h2 id="quiz-question" className="text-lg sm:text-xl font-bold mb-0.5 text-[var(--text)]">{currentStep.question}</h2>
              {currentStep.hint && (
                <p className="text-sm text-[var(--text-muted)]">{currentStep.hint}</p>
              )}
            </div>
          </div>

          <div className="space-y-2.5 mt-4" role="group" aria-labelledby="quiz-question">
            {currentStep.options.map(opt => (
              <button key={opt.value} onClick={() => choose(opt.value)}
                className="w-full text-left flex items-start gap-3 p-3 rounded-xl border-2 transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                style={{ borderColor: 'var(--border)', background: 'var(--input-bg)', minHeight: '44px' }}>
                {opt.emoji && (
                  <span className="text-lg shrink-0 mt-0.5">{opt.emoji}</span>
                )}
                <div className="flex-1 min-w-0">
                  <span className="block text-[var(--text)]" style={{ fontSize: '0.9375rem', fontWeight: 500 }}>
                    {opt.label}
                  </span>
                  {opt.desc && (
                    <span className="block text-sm mt-0.5 text-[var(--text-muted)]">
                      {opt.desc}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Back */}
        {currentIndex > 0 && (
          <button onClick={goBack}
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border-2 border-[var(--border)] bg-[var(--bg)] text-[var(--text-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-bg)] transition-all"
            style={{ minHeight: '44px' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M10.354 3.354a.5.5 0 00-.708-.708l-5 5a.5.5 0 000 .708l5 5a.5.5 0 00.708-.708L5.707 8l4.647-4.646z"/></svg>
            {c.back}
          </button>
        )}
      </div>
    </div>
  )
}
