'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/i18n/DictionaryContext'
import { getSteps, getArchetypeInfo, getRecommendation } from '@/content/comparateur-data'

type Answers = Record<string, string>

export default function ComparateurClient() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [done, setDone] = useState(false)
  const { t, locale } = useTranslation()
  const c = t.comparator

  const steps = getSteps(locale)
  const ARCHETYPE_INFO = getArchetypeInfo(locale)

  const currentStep = steps[step]
  const progress = (step / steps.length) * 100

  function choose(value: string) {
    const newAnswers = { ...answers, [currentStep.id]: value }
    setAnswers(newAnswers)
    if (step < steps.length - 1) {
      setStep(s => s + 1)
    } else {
      setDone(true)
    }
  }

  function reset() {
    setStep(0)
    setAnswers({})
    setDone(false)
  }

  if (done) {
    const rec = getRecommendation(locale, answers)
    return (
      <div className="section">
        <div className="container max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-[--text]">{c.resultTitle}</h1>
            <p className="text-[--text-subtle]">{c.resultSubtitle}</p>
          </div>

          <div className="card mb-6" style={{ border: '2px solid var(--accent)' }}>
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
            <h2 className="text-2xl font-bold mb-3 text-[--text]">{rec.title}</h2>
            <p className="mb-4 text-[--text-subtle]">{rec.summary}</p>
            <ul className="space-y-2 mb-4">
              {rec.specs.map(s => (
                <li key={s} className="flex items-start gap-2">
                  <span className="text-[--success]" style={{ fontWeight: 700, flexShrink: 0 }}>·</span>
                  <span className="text-[--text]" style={{ fontSize: '1rem' }}>{s}</span>
                </li>
              ))}
            </ul>
            {rec.note && (
              <div className="p-4 rounded-lg bg-[--accent-bg]" style={{ borderLeft: '4px solid var(--accent)' }}>
                <p className="font-semibold text-xs uppercase tracking-wide mb-1 text-[--accent]">{c.noteLabel}</p>
                <p className="text-[--text-subtle]" style={{ fontSize: '0.9375rem' }}>{rec.note}</p>
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

          <p className="text-center text-sm mt-6 text-[--text-muted]">
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[--text]">{c.pageTitle}</h1>
          <p className="text-[--text-subtle]">
            {c.pageSubtitle.replace('{count}', String(steps.length))}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2 text-[--text-muted]">
            <span>
              {c.questionOf
                .replace('{current}', String(step + 1))
                .replace('{total}', String(steps.length))}
            </span>
            <span>{Math.round(progress)} %</span>
          </div>
          <div className="h-2 rounded-full bg-[--border]">
            <div className="h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'var(--accent)' }} />
          </div>
        </div>

        {/* Question */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-1 text-[--text]">{currentStep.question}</h2>
          {currentStep.hint && (
            <p className="text-sm mb-4 text-[--text-muted]">{currentStep.hint}</p>
          )}
          <div className="space-y-3 mt-4">
            {currentStep.options.map(opt => (
              <button key={opt.value} onClick={() => choose(opt.value)}
                className="w-full text-left flex items-center gap-3 p-4 rounded-xl border-2 transition-all hover:border-[var(--accent)] hover:bg-[--accent-bg] bg-[--bg]"
                style={{ borderColor: 'var(--border)' }}>
                <span className="text-[--text]" style={{ fontSize: '1rem', fontWeight: 500 }}>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Back */}
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)}
            className="inline-flex items-center gap-2 text-base font-medium px-5 py-3 rounded-xl border-2 border-[--border] bg-[--bg] text-[--text-subtle] hover:border-[--accent] hover:text-[--accent] hover:bg-[--accent-bg] transition-all"
            style={{ minHeight: '48px' }}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M10.354 3.354a.5.5 0 00-.708-.708l-5 5a.5.5 0 000 .708l5 5a.5.5 0 00.708-.708L5.707 8l4.647-4.646z"/></svg>
            {c.back}
          </button>
        )}
      </div>
    </div>
  )
}
