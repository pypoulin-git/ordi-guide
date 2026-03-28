'use client'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label={t.nav.backToTop}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-full shadow-lg transition-all duration-300"
      style={{
        width: '48px',
        height: '48px',
        background: 'var(--accent)',
        color: 'white',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
      }}
    >
      <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 3.5a.5.5 0 01.354.146l4 4a.5.5 0 01-.708.708L8 4.707 4.354 8.354a.5.5 0 11-.708-.708l4-4A.5.5 0 018 3.5z"/>
      </svg>
    </button>
  )
}
