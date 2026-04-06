import Link from 'next/link'
import Image from 'next/image'

export default function RootNotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      padding: '2rem',
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
      }}>
        {/* Mascot */}
        <div style={{
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '96px',
            height: '96px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #2563eb 0%, #4338ca 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(37, 99, 235, 0.2)',
          }}>
            <Image
              src="/compy-icon.svg"
              alt="Compy"
              width={56}
              height={56}
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

        {/* FR message */}
        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          color: 'var(--text)',
          marginBottom: '0.5rem',
          lineHeight: 1.3,
        }}>
          Page introuvable
        </h1>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '1.0625rem',
          lineHeight: 1.6,
          marginBottom: '2rem',
        }}>
          On dirait que cette page n&apos;existe pas ou a été déplacée.
        </p>

        {/* EN message */}
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '0.9375rem',
          lineHeight: 1.6,
          marginBottom: '2.5rem',
          fontStyle: 'italic',
        }}>
          It looks like this page doesn&apos;t exist or has been moved.
        </p>

        {/* CTA */}
        <Link
          href="/fr"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.875rem 2rem',
            borderRadius: '0.75rem',
            background: '#2563eb',
            color: 'white',
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
        >
          Retour à l&apos;accueil / Back to home
        </Link>
      </div>
    </div>
  )
}
