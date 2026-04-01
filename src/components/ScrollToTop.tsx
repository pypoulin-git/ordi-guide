'use client'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const { t } = useTranslation()

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const circumference = 2 * Math.PI * 18

  return (
    <button
      onClick={scrollToTop}
      aria-label={t.nav.backToTop}
      className="scroll-to-top fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-full shadow-lg"
      style={{
        width: '48px',
        height: '48px',
        background: 'var(--accent)',
        color: 'white',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {/* Circular progress ring */}
      <svg width="48" height="48" viewBox="0 0 48 48" className="absolute inset-0" aria-hidden="true">
        <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="18" fill="none" stroke="white" strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          strokeLinecap="round"
          transform="rotate(-90 24 24)"
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
        />
      </svg>
      <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="relative">
        <path d="M8 3.5a.5.5 0 01.354.146l4 4a.5.5 0 01-.708.708L8 4.707 4.354 8.354a.5.5 0 11-.708-.708l4-4A.5.5 0 018 3.5z"/>
      </svg>
    </button>
  )
}
