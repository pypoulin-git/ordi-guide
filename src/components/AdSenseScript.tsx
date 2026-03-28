'use client'

import { useEffect, useState } from 'react'

/**
 * Loads the AdSense script ONLY after the user has given cookie consent.
 * Loi 25 (Québec) requires opt-in before any non-essential cookies/tracking.
 */
export default function AdSenseScript() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    // Check consent on mount
    const consent = localStorage.getItem('cookie_consent')
    if (consent === 'accepted') {
      setConsented(true)
      return
    }

    // Listen for consent changes (from CookieConsent banner)
    function onStorage(e: StorageEvent) {
      if (e.key === 'cookie_consent' && e.newValue === 'accepted') {
        setConsented(true)
      }
    }
    window.addEventListener('storage', onStorage)

    // Also poll for same-tab changes (storage event only fires cross-tab)
    const interval = setInterval(() => {
      if (localStorage.getItem('cookie_consent') === 'accepted') {
        setConsented(true)
        clearInterval(interval)
      }
    }, 1000)

    return () => {
      window.removeEventListener('storage', onStorage)
      clearInterval(interval)
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
