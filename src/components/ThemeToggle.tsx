'use client'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/i18n/DictionaryContext'
import GlassTooltip from './GlassTooltip'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    // On mount, read current state from the <html> element
    const isDark = document.documentElement.classList.contains('dark')
    setDark(isDark)
    setMounted(true)
  }, [])

  function toggle() {
    const html = document.documentElement
    // Enable smooth transition
    html.classList.add('theme-transition')
    const next = !dark
    if (next) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    setDark(next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch { /* localStorage unavailable */ }
    // Remove transition class after animation completes
    setTimeout(() => html.classList.remove('theme-transition'), 350)
  }

  // Before mount, render a placeholder to prevent layout shift
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg transition-colors"
        style={{ color: 'var(--text-muted)', width: 34, height: 34 }}
        aria-label="Toggle theme"
        disabled
      />
    )
  }

  return (
    <GlassTooltip label={dark ? t.nav.themeLight : t.nav.themeDark}>
      <button
        onClick={toggle}
        className="p-2 rounded-lg transition-colors hover:bg-[var(--accent-bg)]"
        style={{ color: dark ? '#fbbf24' : '#64748b' }}
        aria-label={dark ? t.nav.themeLight : t.nav.themeDark}
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </button>
    </GlassTooltip>
  )
}
