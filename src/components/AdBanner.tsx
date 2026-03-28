'use client'

import { useEffect, useRef } from 'react'
import { useTranslation } from '@/i18n/DictionaryContext'

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>
  }
}

type AdFormat = 'horizontal' | 'rectangle' | 'in-feed'

interface AdBannerProps {
  slot?: string
  format?: AdFormat
  className?: string
}

const FORMAT_STYLES: Record<AdFormat, React.CSSProperties> = {
  horizontal: { minHeight: '90px', maxHeight: '120px' },
  rectangle: { minHeight: '250px', maxHeight: '300px' },
  'in-feed': { minHeight: '120px', maxHeight: '160px' },
}

export default function AdBanner({ slot = '', format = 'horizontal', className = '' }: AdBannerProps) {
  const { t } = useTranslation()
  const adRef = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    try {
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({})
        pushed.current = true
      }
    } catch {
      // AdSense not loaded (dev mode, ad blocker) — fail silently
    }
  }, [])

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_ID || ''

  return (
    <div className={`ad-banner ${className}`}>
      <p
        className="text-xs uppercase tracking-widest mb-2 text-center"
        style={{ color: 'var(--text-muted)', letterSpacing: '0.08em' }}
      >
        {t.ads.label}
      </p>
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border)',
          ...FORMAT_STYLES[format],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client={clientId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
}
