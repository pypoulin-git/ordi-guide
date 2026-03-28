'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function LocaleNotFound() {
  const { t, locale } = useTranslation()

  const links = [
    { href: `/${locale}`, label: t.notFound.goHome, primary: true },
    { href: `/${locale}/guide`, label: t.notFound.goGuide, primary: false },
    { href: `/${locale}/comparateur`, label: t.notFound.goComparator, primary: false },
  ]

  return (
    <section style={{
      minHeight: 'calc(100vh - 200px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      padding: '3rem 1.5rem',
    }}>
      <div style={{
        maxWidth: '520px',
        width: '100%',
        textAlign: 'center',
      }}>
        {/* Mascot icon */}
        <div style={{
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '88px',
            height: '88px',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, #2563eb 0%, #4338ca 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(37, 99, 235, 0.2)',
          }}>
            <Image
              src="/compy-icon.svg"
              alt="Compy"
              width={52}
              height={52}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        </div>

        {/* 404 badge */}
        <div style={{
          display: 'inline-block',
          padding: '0.375rem 1rem',
          borderRadius: '9999px',
          background: 'var(--accent-bg)',
          color: 'var(--accent)',
          fontWeight: 700,
          fontSize: '0.875rem',
          letterSpacing: '0.05em',
          marginBottom: '1.5rem',
        }}>
          404
        </div>

        {/* Title & subtitle */}
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 800,
          color: 'var(--text)',
          marginBottom: '0.75rem',
          lineHeight: 1.3,
        }}>
          {t.notFound.title}
        </h1>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '1.0625rem',
          lineHeight: 1.6,
          marginBottom: '2.5rem',
          maxWidth: '380px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          {t.notFound.subtitle}
        </p>

        {/* Navigation links */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: link.primary ? '0.875rem 2rem' : '0.625rem 1.5rem',
                borderRadius: '0.75rem',
                background: link.primary ? '#2563eb' : 'transparent',
                color: link.primary ? 'white' : 'var(--accent)',
                fontWeight: link.primary ? 700 : 600,
                fontSize: link.primary ? '1rem' : '0.9375rem',
                textDecoration: 'none',
                boxShadow: link.primary ? '0 4px 16px rgba(37, 99, 235, 0.3)' : 'none',
                border: link.primary ? 'none' : '1.5px solid var(--border)',
                transition: 'transform 0.15s, box-shadow 0.15s',
                width: link.primary ? 'auto' : 'auto',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
