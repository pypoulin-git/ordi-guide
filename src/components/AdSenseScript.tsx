'use client'

import { useEffect, useState } from 'react'

/**
 * Loads the AdSense script ONLY after the user has opted in to advertising cookies.
 * Loi 25 (Québec) requires opt-in before any non-essential cookies/tracking.
 *
 * The cookie_consent key in localStorage is a JSON object of shape:
 *   { essential: true, analytics: boolean, advertising: boolean }
 * We only activate AdSense when advertising === true.
 */
function hasAdConsent(): boolean {
  try {
    const raw = localStorage.getItem('cookie_consent')
    if (!raw) return false
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' && parsed.advertising === true
  } catch {
    return false
  }
}

export default function AdSenseScript() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    // Check consent on mount
    if (hasAdConsent()) {
      setConsented(true)
      return
    }

    // Listen for same-tab consent updates (dispatched by CookieConsent.tsx)
    function onConsentUpdate(e: Event) {
      const detail = (e as CustomEvent).detail
      if (detail && detail.advertising === true) {
        setConsented(true)
      }
    }
    window.addEventListener('cookie-consent-update', onConsentUpdate)

    // Listen for cross-tab changes via storage event
    function onStorage(e: StorageEvent) {
      if (e.key === 'cookie_consent' && hasAdConsent()) {
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

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_ID || ''
  if (!clientId) return null

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId.trim()}`}
      crossOrigin="anonymous"
    />
  )
}
