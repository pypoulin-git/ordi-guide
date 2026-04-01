'use client'
import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from '@/i18n/DictionaryContext'

export type CookieConsentState = {
  essential: true
  analytics: boolean
  advertising: boolean
}

const STORAGE_KEY = 'cookie_consent'

export function getConsent(): CookieConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed === 'object' && parsed !== null && 'essential' in parsed) {
      return parsed as CookieConsentState
    }
    return null
  } catch {
    return null
  }
}

function Toggle({ checked, onChange, disabled, id }: {
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
  id: string
}) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className="relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
      style={{
        backgroundColor: checked ? 'var(--accent)' : 'var(--border)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <span
        className="inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200"
        style={{ transform: checked ? 'translateX(1.25rem)' : 'translateX(0)' }}
      />
    </button>
  )
}

export default function CookieConsent() {
  const { t } = useTranslation()
  const c = t.cookie
  const [visible, setVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [advertising, setAdvertising] = useState(true)

  useEffect(() => {
    const existing = getConsent()
    if (!existing) {
      setVisible(true)
    }
  }, [])

  const saveConsent = useCallback((consent: CookieConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    setVisible(false)
    setShowSettings(false)
    window.dispatchEvent(new CustomEvent('cookie-consent-update', { detail: consent }))
  }, [])

  function handleAcceptAll() {
    saveConsent({ essential: true, analytics: true, advertising: true })
  }

  function handleRefuseAll() {
    saveConsent({ essential: true, analytics: false, advertising: false })
  }

  function handleSavePreferences() {
    saveConsent({ essential: true, analytics, advertising })
  }

  function handleManageOpen() {
    const existing = getConsent()
    if (existing) {
      setAnalytics(existing.analytics)
      setAdvertising(existing.advertising)
    }
    setShowSettings(true)
    setVisible(true)
  }

  // Manage link (always rendered, even when banner is hidden)
  const manageLink = (
    <button
      onClick={handleManageOpen}
      className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] underline transition-colors"
      aria-label={c.cookieManage}
    >
      {c.cookieManage}
    </button>
  )

  if (!visible) {
    return (
      <div className="fixed bottom-3 right-4 z-40">
        {manageLink}
      </div>
    )
  }

  return (
    <div
      role="dialog"
      aria-label={c.cookieSettings}
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--bg-card)]"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <div className="container py-4">
        {!showSettings ? (
          /* Simple banner */
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm text-[var(--text-subtle)] flex-1">
              {c.cookieMessage}
            </p>
            <div className="flex gap-3 shrink-0 items-center">
              <button
                onClick={() => setShowSettings(true)}
                className="text-sm font-medium text-[var(--accent)] underline hover:opacity-80 transition-opacity"
                style={{ minHeight: '44px' }}
              >
                {c.cookieSettings}
              </button>
              <button
                onClick={handleRefuseAll}
                className="px-4 py-2 rounded-lg border-2 border-[var(--accent)] text-sm font-medium text-[var(--accent)] hover:bg-[var(--bg-subtle)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                style={{ minHeight: '44px' }}
              >
                {c.cookieRefuse}
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 rounded-lg border-2 border-[var(--accent)] bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white"
                style={{ minHeight: '44px' }}
              >
                {c.cookieAccept}
              </button>
            </div>
          </div>
        ) : (
          /* Granular settings panel */
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-sm text-[var(--text-subtle)]">{c.cookieMessage}</p>

            {/* Essential */}
            <div className="flex items-center justify-between gap-4 py-3 border-b border-[var(--border)]">
              <div className="flex-1">
                <label htmlFor="toggle-essential" className="text-sm font-semibold text-[var(--text)]">
                  {c.cookieEssential}
                </label>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{c.cookieEssentialDesc}</p>
              </div>
              <Toggle id="toggle-essential" checked={true} onChange={() => {}} disabled />
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between gap-4 py-3 border-b border-[var(--border)]">
              <div className="flex-1">
                <label htmlFor="toggle-analytics" className="text-sm font-semibold text-[var(--text)]">
                  {c.cookieAnalytics}
                </label>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{c.cookieAnalyticsDesc}</p>
              </div>
              <Toggle id="toggle-analytics" checked={analytics} onChange={setAnalytics} />
            </div>

            {/* Advertising */}
            <div className="flex items-center justify-between gap-4 py-3 border-b border-[var(--border)]">
              <div className="flex-1">
                <label htmlFor="toggle-advertising" className="text-sm font-semibold text-[var(--text)]">
                  {c.cookieAdvertising}
                </label>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{c.cookieAdvertisingDesc}</p>
              </div>
              <Toggle id="toggle-advertising" checked={advertising} onChange={setAdvertising} />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleRefuseAll}
                className="px-4 py-2 rounded-lg border-2 border-[var(--border)] text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                style={{ minHeight: '44px' }}
              >
                {c.cookieRefuse}
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 rounded-lg border-2 border-[var(--accent)] text-sm font-medium text-[var(--accent)] hover:bg-[var(--bg-subtle)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                style={{ minHeight: '44px' }}
              >
                {c.cookieManage}
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 rounded-lg border-2 border-[var(--accent)] bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white"
                style={{ minHeight: '44px' }}
              >
                {c.cookieAccept}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
