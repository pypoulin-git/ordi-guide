'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/i18n/DictionaryContext'
import { getSteps, getArchetypeInfo, getRecommendation } from '@/content/comparateur-data'

type Answers = Record<string, string>

export default function ComparateurPage() {
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
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#0f172a' }}>{c.resultTitle}</h1>
            <p style={{ color: '#475569' }}>{c.resultSubtitle}</p>
          </div>

          <div className="card mb-6" style={{ border: '2px solid #2563eb' }}>
            {rec.archetype && ARCHETYPE_INFO[rec.archetype] && (() => {
              const arch = ARCHETYPE_INFO[rec.archetype]
              return (
                <div className="mb-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold"
                    style={{ background: arch.color + '15', color: arch.color }}>
                    {c.profile} : {arch.label}
                  </div>
                  <p className="text-xs mt-1.5" style={{ color: arch.color + 'cc' }}>{arch.desc}</p>
                </div>
              )
            })()}
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#0f172a' }}>{rec.title}</h2>
            <p className="mb-4" style={{ color: '#475569' }}>{rec.summary}</p>
            <ul className="space-y-2 mb-4">
              {rec.specs.map(s => (
                <li key={s} className="flex items-start gap-2">
                  <span style={{ color: '#0891b2', fontWeight: 700, flexShrink: 0 }}>·</span>
                  <span style={{ color: '#0f172a', fontSize: '1rem' }}>{s}</span>
                </li>
              ))}
            </ul>
            {rec.note && (
              <div className="p-4 rounded-lg" style={{ background: '#eff6ff', borderLeft: '4px solid #2563eb' }}>
                <p className="font-semibold text-xs uppercase tracking-wide mb-1" style={{ color: '#2563eb' }}>{c.noteLabel}</p>
                <p style={{ color: '#1d4ed8', fontSize: '0.9375rem' }}>{rec.note}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={rec.link} className="btn-primary flex-1 justify-center">
              {c.learnMore}
            </Link>
            <button onClick={reset} className="btn-outline flex-1 justify-center">
              {c.restart}
            </button>
          </div>

          <p className="text-center text-sm mt-6" style={{ color: '#94a3b8' }}>
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
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#0f172a' }}>{c.pageTitle}</h1>
          <p style={{ color: '#475569' }}>
            {c.pageSubtitle.replace('{count}', String(steps.length))}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2" style={{ color: '#94a3b8' }}>
            <span>
              {c.questionOf
                .replace('{current}', String(step + 1))
                .replace('{total}', String(steps.length))}
            </span>
            <span>{Math.round(progress)} %</span>
          </div>
          <div className="h-2 rounded-full" style={{ background: '#e2e8f0' }}>
            <div className="h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: '#2563eb' }} />
          </div>
        </div>

        {/* Question */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-1" style={{ color: '#0f172a' }}>{currentStep.question}</h2>
          {currentStep.hint && (
            <p className="text-sm mb-4" style={{ color: '#94a3b8' }}>{currentStep.hint}</p>
          )}
          <div className="space-y-3 mt-4">
            {currentStep.options.map(opt => (
              <button key={opt.value} onClick={() => choose(opt.value)}
                className="w-full text-left flex items-center gap-3 p-4 rounded-xl border-2 transition-all hover:border-[#2563eb] hover:bg-[#eff6ff]"
                style={{ border: '2px solid #e2e8f0', background: 'white' }}>
                <span style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 500 }}>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Back */}
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)}
            className="text-sm" style={{ color: '#94a3b8' }}>
            {c.back}
          </button>
        )}
      </div>
    </div>
  )
}
