'use client'
import { useState } from 'react'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function ContactClient() {
  const { t, locale } = useTranslation()
  const c = t.contact

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function validate() {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = c.required
    if (!form.email.trim()) {
      errs.email = c.required
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = c.emailInvalid
    }
    if (!form.message.trim()) errs.message = c.required
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject,
          message: form.message.trim(),
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const subjectOptions = [
    { value: 'general', label: c.subjectGeneral },
    { value: 'partnership', label: c.subjectPartnership },
    { value: 'bug', label: c.subjectBug },
    { value: 'other', label: c.subjectOther },
  ]

  const faqs = [
    { q: c.faqQ1, a: c.faqA1 },
    { q: c.faqQ2, a: c.faqA2 },
    { q: c.faqQ3, a: c.faqA3 },
    { q: c.faqQ4, a: c.faqA4 },
  ]

  return (
    <>
      <PageHero
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        gradient="linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #334155 100%)"
      />

      <section className="section">
        <div className="container max-w-3xl mx-auto">

          {/* ── Contact form ─────────────────────────────── */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2.5rem)' }}>
            <h2 className="text-xl font-bold mb-6 text-[var(--text)]">
              {c.formTitle}
            </h2>

            {status === 'success' ? (
              <div
                className="text-center py-8"
                role="status"
                aria-live="polite"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
                  style={{ background: '#dbeafe', color: '#2563eb' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-[var(--text)]">{c.successTitle}</h3>
                <p className="text-[var(--text-muted)]">{c.successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="mb-4">
                  <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5 text-[var(--text)]">
                    {c.nameLabel} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    className="input-field w-full"
                    placeholder={c.namePlaceholder}
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'err-name' : undefined}
                  />
                  {errors.name && (
                    <p id="err-name" className="text-sm mt-1" style={{ color: '#ea580c' }} role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5 text-[var(--text)]">
                    {c.emailLabel} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    className="input-field w-full"
                    placeholder={c.emailPlaceholder}
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'err-email' : undefined}
                  />
                  {errors.email && (
                    <p id="err-email" className="text-sm mt-1" style={{ color: '#ea580c' }} role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="mb-4">
                  <label htmlFor="contact-subject" className="block text-sm font-medium mb-1.5 text-[var(--text)]">
                    {c.subjectLabel}
                  </label>
                  <select
                    id="contact-subject"
                    className="input-field w-full"
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  >
                    {subjectOptions.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5 text-[var(--text)]">
                    {c.messageLabel} <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    className="input-field w-full"
                    placeholder={c.messagePlaceholder}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'err-message' : undefined}
                  />
                  {errors.message && (
                    <p id="err-message" className="text-sm mt-1" style={{ color: '#ea580c' }} role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Error banner */}
                {status === 'error' && (
                  <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: '#fff7ed', color: '#ea580c', border: '1px solid #fed7aa' }} role="alert">
                    {c.errorMessage}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={status === 'sending'}
                  aria-busy={status === 'sending'}
                >
                  {status === 'sending' ? c.sending : c.submit}
                </button>
              </form>
            )}
          </div>

          {/* ── Alternative contact ───────────────────────── */}
          <div className="card mt-6" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-lg font-bold mb-4 text-[var(--text)]">{c.altTitle}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: '#dbeafe', color: '#2563eb' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-muted)]">{c.altEmail}</p>
                  <a href="mailto:info@shopcompy.ca" className="text-sm font-semibold text-[var(--accent)] hover:underline">
                    {c.altEmailValue}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: '#dbeafe', color: '#2563eb' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-muted)]">{c.altResponse}</p>
                  <p className="text-sm font-semibold text-[var(--text)]">{c.altResponseValue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── FAQ ──────────────────────────────────────── */}
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6 text-[var(--text)]">{c.faqTitle}</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="card group" style={{ padding: 0 }}>
                  <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-[var(--text)] font-medium select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                    style={{ listStyle: 'none' }}>
                    <span>{faq.q}</span>
                    <svg className="w-5 h-5 flex-shrink-0 transition-transform group-open:rotate-180 text-[var(--text-muted)]"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-[var(--text-muted)] leading-relaxed">
                    {faq.a}
                    {i === 1 && (
                      <>
                        {' '}
                        <Link href={`/${locale}/about`} className="text-[var(--accent)] hover:underline font-medium">
                          {locale === 'fr' ? 'A propos' : 'About'} &rarr;
                        </Link>
                      </>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
