'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

/**
 * Gates Vercel Analytics + SpeedInsights behind the user's analytics consent.
 * Loi 25 (Québec) requires opt-in before any non-essential tracking.
 *
 * The cookie_consent key in localStorage is a JSON object of shape:
 *   { essential: true, analytics: boolean, advertising: boolean }
 * We only mount the trackers when analytics === true.
 */
function hasAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem('cookie_consent')
    if (!raw) return false
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' && parsed.analytics === true
  } catch {
    return false
  }
}

export default function AnalyticsGate() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    if (hasAnalyticsConsent()) {
      setConsented(true)
      return
    }

    function onConsentUpdate(e: Event) {
      const detail = (e as CustomEvent).detail
      if (detail && detail.analytics === true) {
        setConsented(true)
      }
    }
    window.addEventListener('cookie-consent-update', onConsentUpdate)

    function onStorage(e: StorageEvent) {
      if (e.key === 'cookie_consent' && hasAnalyticsConsent()) {
        setConsented(true)
      }
    }
    window.addEventListener('storage', onStorage)

    return () => {
      window.removeEventListener('cookie-consent-update', onConsentUpdate)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  if (!consented) return null

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
