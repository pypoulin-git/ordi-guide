'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/i18n/DictionaryContext'
import { getSteps, getArchetypeInfo, getRecommendation } from '@/content/comparateur-data'

type Answers = Record<string, string>

/* ── Inline SVG illustrations per question ─────────────────────────── */
function StepIllustration({ stepId }: { stepId: string }) {
  const s = { width: '100%', height: 'auto', maxWidth: 120, maxHeight: 120 } as const

  switch (stepId) {
    case 'usage':
      return (
        <svg viewBox="0 0 120 120" fill="none" style={s}>
          {/* Monitor */}
          <rect x="20" y="15" width="80" height="55" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <rect x="26" y="21" width="68" height="43" rx="3" fill="#eff6ff" />
          {/* Screen content */}
          <rect x="32" y="28" width="24" height="3" rx="1.5" fill="#93c5fd" />
          <rect x="32" y="34" width="40" height="2" rx="1" fill="#bfdbfe" />
          <rect x="32" y="39" width="35" height="2" rx="1" fill="#bfdbfe" />
          <rect x="32" y="44" width="38" height="2" rx="1" fill="#bfdbfe" />
          <rect x="32" y="51" width="18" height="6" rx="3" fill="#2563eb" />
          {/* Stand */}
          <rect x="50" y="70" width="20" height="6" rx="1" fill="#93c5fd" />
          <rect x="42" y="76" width="36" height="4" rx="2" fill="#bfdbfe" />
          {/* Keyboard */}
          <rect x="28" y="86" width="64" height="18" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
          {[32, 40, 48, 56, 64, 72, 80].map(x => (
            <rect key={x} x={x} y="90" width="5" height="4" rx="1" fill="#93c5fd" />
          ))}
          {[36, 44, 52, 60, 68, 76].map(x => (
            <rect key={x} x={x} y="97" width="5" height="4" rx="1" fill="#93c5fd" />
          ))}
        </svg>
      )

    case 'budget':
      return (
        <svg viewBox="0 0 120 120" fill="none" style={s}>
          {/* Wallet */}
          <rect x="22" y="30" width="76" height="55" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <rect x="22" y="30" width="76" height="18" rx="8" fill="#2563eb" />
          {/* Clasp */}
          <rect x="70" y="42" width="24" height="16" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <circle cx="82" cy="50" r="4" fill="#2563eb" />
          {/* Dollar signs */}
          <text x="42" y="68" fontSize="16" fontWeight="bold" fill="#2563eb" fontFamily="sans-serif">$</text>
          <text x="55" y="62" fontSize="12" fill="#93c5fd" fontFamily="sans-serif">$</text>
          {/* Coins */}
          <circle cx="38" cy="98" r="10" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1" />
          <circle cx="55" cy="100" r="8" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
          <text x="34" y="102" fontSize="10" fontWeight="bold" fill="#2563eb" fontFamily="sans-serif">$</text>
        </svg>
      )

    case 'mobility':
      return (
        <svg viewBox="0 0 120 120" fill="none" style={s}>
          {/* Laptop (angled) */}
          <g transform="rotate(-5 60 60)">
            <rect x="25" y="20" width="60" height="42" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
            <rect x="30" y="25" width="50" height="32" rx="2" fill="#eff6ff" />
            <path d="M20 62 L25 62 L85 62 L90 62 L92 70 L18 70 Z" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1" />
          </g>
          {/* Arrow / movement lines */}
          <path d="M85 45 L100 45" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
          <path d="M95 40 L100 45 L95 50" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="82" y1="52" x2="92" y2="52" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="84" y1="38" x2="94" y2="38" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
          {/* Bag strap hint */}
          <path d="M30 80 Q60 95 90 80" stroke="#bfdbfe" strokeWidth="3" strokeLinecap="round" fill="none" />
          <rect x="35" y="82" width="50" height="22" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
        </svg>
      )

    case 'screensize':
      return (
        <svg viewBox="0 0 120 120" fill="none" style={s}>
          {/* Small screen */}
          <rect x="10" y="50" width="30" height="22" rx="3" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
          <text x="20" y="65" fontSize="8" fill="#93c5fd" fontFamily="sans-serif">13"</text>
          {/* Medium screen */}
          <rect x="42" y="35" width="36" height="28" rx="3" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x="52" y="53" fontSize="9" fill="#2563eb" fontFamily="sans-serif">15"</text>
          {/* Large screen */}
          <rect x="82" y="20" width="30" height="34" rx="3" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <text x="90" y="42" fontSize="8" fill="#2563eb" fontFamily="sans-serif">17"</text>
          {/* Ruler */}
          <line x1="15" y1="90" x2="105" y2="90" stroke="#bfdbfe" strokeWidth="2" strokeLinecap="round" />
          {[25, 40, 55, 70, 85, 100].map(x => (
            <line key={x} x1={x} y1="87" x2={x} y2="93" stroke="#93c5fd" strokeWidth="1" />
          ))}
        </svg>
      )

    case 'brand':
      return (
        <svg viewBox="0 0 120 120" fill="none" style={s}>
          {/* Apple-style screen */}
          <rect x="12" y="25" width="42" height="35" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <circle cx="33" cy="42" r="7" fill="none" stroke="#2563eb" strokeWidth="1.5" />
          <path d="M33 37 Q36 35 36 38" stroke="#2563eb" strokeWidth="1" />
          {/* Windows-style screen */}
          <rect x="66" y="25" width="42" height="35" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <g transform="translate(79 35)">
            <rect x="0" y="0" width="6" height="6" fill="#2563eb" rx="1" />
            <rect x="8" y="0" width="6" height="6" fill="#93c5fd" rx="1" />
            <rect x="0" y="8" width="6" height="6" fill="#93c5fd" rx="1" />
            <rect x="8" y="8" width="6" height="6" fill="#2563eb" rx="1" />
          </g>
          {/* VS divider */}
          <text x="52" y="78" fontSize="14" fontWeight="bold" fill="#93c5fd" textAnchor="middle" fontFamily="sans-serif">vs</text>
          {/* Question mark */}
          <circle cx="60" cy="100" r="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
          <text x="60" y="105" fontSize="14" fontWeight="bold" fill="#2563eb" textAnchor="middle" fontFamily="sans-serif">?</text>
        </svg>
      )

    case 'durability':
      return (
        <svg viewBox="0 0 120 120" fill="none" style={s}>
          {/* Shield */}
          <path d="M60 15 L90 30 L90 65 Q90 90 60 105 Q30 90 30 65 L30 30 Z"
            fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <path d="M60 25 L82 37 L82 63 Q82 82 60 95 Q38 82 38 63 L38 37 Z" fill="#eff6ff" />
          {/* Checkmark */}
          <path d="M48 60 L56 68 L74 48" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Years label */}
          <text x="60" y="82" fontSize="9" fontWeight="bold" fill="#2563eb" textAnchor="middle" fontFamily="sans-serif">6+</text>
        </svg>
      )

    case 'priority':
      return (
        <svg viewBox="0 0 120 120" fill="none" style={s}>
          {/* Target / crosshair */}
          <circle cx="60" cy="55" r="35" fill="none" stroke="#bfdbfe" strokeWidth="2" />
          <circle cx="60" cy="55" r="25" fill="none" stroke="#93c5fd" strokeWidth="2" />
          <circle cx="60" cy="55" r="15" fill="none" stroke="#2563eb" strokeWidth="2" />
          <circle cx="60" cy="55" r="5" fill="#2563eb" />
          {/* Crosshair lines */}
          <line x1="60" y1="12" x2="60" y2="30" stroke="#bfdbfe" strokeWidth="1.5" />
          <line x1="60" y1="80" x2="60" y2="98" stroke="#bfdbfe" strokeWidth="1.5" />
          <line x1="17" y1="55" x2="35" y2="55" stroke="#bfdbfe" strokeWidth="1.5" />
          <line x1="85" y1="55" x2="103" y2="55" stroke="#bfdbfe" strokeWidth="1.5" />
          {/* Star accent */}
          <path d="M95 100 L97 95 L100 100 L97 97 Z" fill="#93c5fd" />
        </svg>
      )

    case 'level':
      return (
        <svg viewBox="0 0 120 120" fill="none" style={s}>
          {/* Skill bar background */}
          <rect x="20" y="30" width="80" height="12" rx="6" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
          <rect x="20" y="55" width="80" height="12" rx="6" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
          <rect x="20" y="80" width="80" height="12" rx="6" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
          {/* Skill bar fills */}
          <rect x="20" y="30" width="25" height="12" rx="6" fill="#bfdbfe" />
          <rect x="20" y="55" width="55" height="12" rx="6" fill="#93c5fd" />
          <rect x="20" y="80" width="80" height="12" rx="6" fill="#2563eb" />
          {/* Labels */}
          <circle cx="14" cy="36" r="4" fill="#bfdbfe" />
          <circle cx="14" cy="61" r="4" fill="#93c5fd" />
          <circle cx="14" cy="86" r="4" fill="#2563eb" />
        </svg>
      )

    default:
      return null
  }
}

export default function ComparateurClient() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [done, setDone] = useState(false)
  const { t, locale } = useTranslation()
  const c = t.comparator

  const allSteps = getSteps(locale)
  const ARCHETYPE_INFO = getArchetypeInfo(locale)

  // Filter steps based on showIf conditions
  const visibleSteps = useMemo(() => {
    return allSteps.filter(s => !s.showIf || s.showIf(answers))
  }, [allSteps, answers])

  const currentStep = visibleSteps[currentIndex]
  const totalSteps = visibleSteps.length
  const progress = (currentIndex / totalSteps) * 100

  function choose(value: string) {
    const newAnswers = { ...answers, [currentStep.id]: value }
    setAnswers(newAnswers)

    // Recalculate visible steps with the new answers
    const nextVisible = allSteps.filter(s => !s.showIf || s.showIf(newAnswers))

    if (currentIndex < nextVisible.length - 1) {
      setCurrentIndex(i => i + 1)
    } else {
      setDone(true)
    }
  }

  function goBack() {
    if (currentIndex > 0) {
      // Remove current step's answer when going back
      const prev = visibleSteps[currentIndex - 1]
      const cleaned = { ...answers }
      delete cleaned[currentStep.id]
      setAnswers(cleaned)
      setCurrentIndex(i => i - 1)
    }
  }

  function reset() {
    setCurrentIndex(0)
    setAnswers({})
    setDone(false)
  }

  if (done) {
    const rec = getRecommendation(locale, answers)
    return (
      <div className="section">
        <div className="container max-w-2xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-[var(--text)]">{c.resultTitle}</h1>
            <p className="text-[var(--text-subtle)]">{c.resultSubtitle}</p>
          </div>

          <div className="card mb-6" style={{ border: '2px solid var(--accent)', overflowWrap: 'anywhere' }}>
            {rec.archetype && ARCHETYPE_INFO[rec.archetype] && (() => {
              const arch = ARCHETYPE_INFO[rec.archetype]
              return (
                <div className="mb-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold"
                    style={{ background: arch.color + '15', color: arch.color }}>
                    {c.profile} : {arch.label}
                  </div>
                  <p className="text-sm mt-1.5" style={{ color: arch.color + 'cc' }}>{arch.desc}</p>
                </div>
              )
            })()}
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-[var(--text)]">{rec.title}</h2>
            <p className="mb-4 text-[var(--text-subtle)]">{rec.summary}</p>
            <ul className="space-y-2 mb-4">
              {rec.specs.map(s => (
                <li key={s} className="flex items-start gap-2">
                  <span className="text-[var(--success)]" style={{ fontWeight: 700, flexShrink: 0 }}>·</span>
                  <span className="text-[var(--text)]" style={{ fontSize: '1rem' }}>{s}</span>
                </li>
              ))}
            </ul>
            {rec.note && (
              <div className="p-4 rounded-lg bg-[var(--accent-bg)]" style={{ borderLeft: '4px solid var(--accent)' }}>
                <p className="font-semibold text-xs uppercase tracking-wide mb-1 text-[var(--accent)]">{c.noteLabel}</p>
                <p className="text-[var(--text-subtle)]" style={{ fontSize: '0.9375rem' }}>{rec.note}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}${rec.link}`} className="btn-primary flex-1 justify-center">
              {c.learnMore}
            </Link>
            <button onClick={reset} className="btn-outline flex-1 justify-center">
              {c.restart}
            </button>
          </div>

          <p className="text-center text-sm mt-6 text-[var(--text-muted)]">
            {c.disclaimer}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="container max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-[var(--text)]">{c.pageTitle}</h1>
          <p className="text-[var(--text-subtle)]">
            {c.pageSubtitle.replace('{count}', String(totalSteps))}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between text-sm mb-2 text-[var(--text-muted)]">
            <span>
              {c.questionOf
                .replace('{current}', String(currentIndex + 1))
                .replace('{total}', String(totalSteps))}
            </span>
            <span>{Math.round(progress)} %</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--border)]">
            <div className="h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'var(--accent)' }} />
          </div>
        </div>

        {/* Question card */}
        <div className="card mb-6">
          {/* Illustration */}
          <div className="flex justify-center mb-4 opacity-80 w-20 h-20 sm:w-[120px] sm:h-[120px] mx-auto">
            <StepIllustration stepId={currentStep.id} />
          </div>

          <h2 className="text-xl font-bold mb-1 text-[var(--text)]">{currentStep.question}</h2>
          {currentStep.hint && (
            <p className="text-sm mb-4 text-[var(--text-muted)]">{currentStep.hint}</p>
          )}
          <div className="space-y-3 mt-4">
            {currentStep.options.map(opt => (
              <button key={opt.value} onClick={() => choose(opt.value)}
                className="w-full text-left flex items-start gap-3 p-3 sm:p-4 rounded-xl border-2 transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-bg)]"
                style={{ borderColor: 'var(--border)', background: 'var(--input-bg)', minHeight: '48px' }}>
                {opt.emoji && (
                  <span className="text-xl shrink-0 mt-0.5">{opt.emoji}</span>
                )}
                <div className="flex-1 min-w-0">
                  <span className="block text-[var(--text)]" style={{ fontSize: '1rem', fontWeight: 500 }}>
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
            className="inline-flex items-center gap-2 text-base font-medium px-4 sm:px-5 py-3 rounded-xl border-2 border-[var(--border)] bg-[var(--bg)] text-[var(--text-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-bg)] transition-all mb-4"
            style={{ minHeight: '48px' }}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M10.354 3.354a.5.5 0 00-.708-.708l-5 5a.5.5 0 000 .708l5 5a.5.5 0 00.708-.708L5.707 8l4.647-4.646z"/></svg>
            {c.back}
          </button>
        )}
      </div>
    </div>
  )
}
