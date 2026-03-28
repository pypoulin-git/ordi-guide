'use client'
import TechIllustration from './TechIllustration'

interface Props {
  title: string
  subtitle: string
  badge?: string
  gradient?: string        // CSS gradient
  badgeColor?: string
  badgeBg?: string
  badgeBorder?: string
  accentColor?: string     // for circuit pattern color
  children?: React.ReactNode
}

/**
 * PageHero — Dense, graphical hero section with decorative SVG elements
 * Matches the visual density of the home page hero
 */
export default function PageHero({
  title, subtitle, badge, gradient,
  badgeColor = '#2563eb', badgeBg = '#eff6ff', badgeBorder = '#bfdbfe',
  accentColor = '#2563eb',
  children,
}: Props) {
  const bg = gradient ?? 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)'
  const isDark = !gradient || gradient.includes('#1e3a8a') || gradient.includes('#0f172a') || gradient.includes('#1e293b') || gradient.includes('#312e81')
  const textColor = isDark ? 'white' : '#0f172a'
  const subtitleColor = isDark ? 'rgba(255,255,255,0.7)' : '#475569'

  return (
    <section style={{
      background: bg,
      padding: '3rem 0 3.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative shapes */}
      <div aria-hidden style={{
        position: 'absolute', top: '-60px', right: '-40px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.04)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', bottom: '-40px', left: '5%',
        width: '200px', height: '200px', borderRadius: '50%',
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(37,99,235,0.03)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', top: '20%', right: '8%',
        width: '80px', height: '80px', borderRadius: '50%',
        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(37,99,235,0.05)',
      }} />

      {/* Circuit pattern decoration */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, right: 0, bottom: 0,
        width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        paddingRight: '2rem',
        color: isDark ? 'white' : accentColor,
      }}>
        <TechIllustration variant="circuit-pattern" size={280} style={{ opacity: isDark ? 0.06 : 0.04 }} />
      </div>

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="max-w-3xl mx-auto text-center">
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{
                background: isDark ? 'rgba(255,255,255,0.1)' : badgeBg,
                color: isDark ? 'rgba(255,255,255,0.9)' : badgeColor,
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : badgeBorder}`,
                backdropFilter: isDark ? 'blur(8px)' : 'none',
              }}>
              {badge}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight"
            style={{ color: textColor }}>
            {title}
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: subtitleColor }}>
            {subtitle}
          </p>
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>

      {/* Wave transition */}
      <div aria-hidden style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '32px',
      }}>
        <svg viewBox="0 0 1440 32" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
          <path d="M0,32 L0,16 Q360,0 720,16 Q1080,32 1440,16 L1440,32 Z" style={{ fill: 'var(--bg)' }} />
        </svg>
      </div>
    </section>
  )
}
