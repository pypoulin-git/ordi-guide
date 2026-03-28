'use client'

/**
 * TechIllustration — Inline SVG illustrations for Shop Compy
 * Lightweight, no external images, fully responsive
 */

type Variant =
  | 'cpu' | 'ram' | 'ssd' | 'gpu' | 'battery' | 'screen' | 'motherboard'  // component icons (body mode)
  | 'engine' | 'transmission' | 'trunk' | 'turbo' | 'fuel' | 'windshield' | 'chassis'  // component icons (car mode)
  | 'hero-guide' | 'hero-glossaire' | 'hero-about' | 'hero-catalogue' | 'hero-blog'  // page decorations
  | 'circuit-pattern'  // background pattern

interface Props {
  variant: Variant
  size?: number
  className?: string
  style?: React.CSSProperties
}

export default function TechIllustration({ variant, size = 48, className = '', style }: Props) {
  const s = { width: size, height: size, ...style }

  switch (variant) {

    /* ── Body mode component icons ──────────────────────────── */
    case 'cpu':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} style={s}>
          <rect x="16" y="16" width="32" height="32" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <rect x="24" y="24" width="16" height="16" rx="2" fill="#2563eb" />
          <circle cx="32" cy="32" r="4" fill="#dbeafe" />
          {/* Pins top */}
          {[22, 28, 34, 40].map(x => <rect key={`t${x}`} x={x} y="8" width="2" height="8" rx="1" fill="#93c5fd" />)}
          {/* Pins bottom */}
          {[22, 28, 34, 40].map(x => <rect key={`b${x}`} x={x} y="48" width="2" height="8" rx="1" fill="#93c5fd" />)}
          {/* Pins left */}
          {[22, 28, 34, 40].map(y => <rect key={`l${y}`} x="8" y={y} width="8" height="2" rx="1" fill="#93c5fd" />)}
          {/* Pins right */}
          {[22, 28, 34, 40].map(y => <rect key={`r${y}`} x="48" y={y} width="8" height="2" rx="1" fill="#93c5fd" />)}
          {/* Pulse rings */}
          <circle cx="32" cy="32" r="10" stroke="#2563eb" strokeWidth="0.5" opacity="0.3" />
          <circle cx="32" cy="32" r="14" stroke="#2563eb" strokeWidth="0.3" opacity="0.15" />
        </svg>
      )

    case 'ram':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} style={s}>
          <rect x="6" y="20" width="52" height="24" rx="3" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          {/* Chips */}
          {[12, 22, 32, 42].map(x => (
            <g key={x}>
              <rect x={x} y="26" width="8" height="12" rx="1.5" fill="#2563eb" />
              <line x1={x + 2} y1="29" x2={x + 6} y2="29" stroke="#93c5fd" strokeWidth="0.8" />
              <line x1={x + 2} y1="32" x2={x + 6} y2="32" stroke="#93c5fd" strokeWidth="0.8" />
              <line x1={x + 2} y1="35" x2={x + 6} y2="35" stroke="#93c5fd" strokeWidth="0.8" />
            </g>
          ))}
          {/* Notch */}
          <rect x="28" y="44" width="8" height="4" rx="1" fill="white" stroke="#2563eb" strokeWidth="1" />
          {/* Bottom contacts */}
          {[10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50].map(x => (
            <rect key={x} x={x} y="44" width="2" height="5" rx="0.5" fill="#93c5fd" />
          ))}
          {/* Data flow dots */}
          <circle cx="16" cy="17" r="1.5" fill="#60a5fa" opacity="0.6" />
          <circle cx="32" cy="17" r="1.5" fill="#60a5fa" opacity="0.4" />
          <circle cx="48" cy="17" r="1.5" fill="#60a5fa" opacity="0.6" />
        </svg>
      )

    case 'ssd':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} style={s}>
          <rect x="10" y="14" width="44" height="36" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          {/* Drive label */}
          <rect x="16" y="20" width="20" height="10" rx="2" fill="#2563eb" />
          <text x="26" y="28" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="monospace">SSD</text>
          {/* Connector */}
          <rect x="38" y="22" width="10" height="6" rx="1" fill="#93c5fd" stroke="#2563eb" strokeWidth="0.5" />
          {/* Speed lines */}
          <line x1="16" y1="36" x2="48" y2="36" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="16" y1="40" x2="48" y2="40" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="16" y1="44" x2="48" y2="44" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 2" />
          {/* Lightning bolt = speed */}
          <path d="M46 14 L42 22 L46 22 L42 30" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    case 'gpu':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} style={s}>
          <rect x="8" y="18" width="48" height="28" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          {/* Fan 1 */}
          <circle cx="24" cy="32" r="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
          <circle cx="24" cy="32" r="3" fill="#2563eb" />
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            return <line key={i} x1={24 + Math.cos(rad) * 3} y1={32 + Math.sin(rad) * 3} x2={24 + Math.cos(rad) * 9} y2={32 + Math.sin(rad) * 9} stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
          })}
          {/* Fan 2 */}
          <circle cx="44" cy="32" r="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
          <circle cx="44" cy="32" r="2.5" fill="#2563eb" />
          {[36, 108, 180, 252, 324].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            return <line key={i} x1={44 + Math.cos(rad) * 2.5} y1={32 + Math.sin(rad) * 2.5} x2={44 + Math.cos(rad) * 7} y2={32 + Math.sin(rad) * 7} stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
          })}
          {/* Connector */}
          <rect x="8" y="46" width="6" height="6" rx="1" fill="#93c5fd" />
          <rect x="18" y="46" width="6" height="6" rx="1" fill="#93c5fd" />
        </svg>
      )

    case 'battery':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} style={s}>
          <rect x="10" y="18" width="40" height="28" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <rect x="50" y="26" width="6" height="12" rx="2" fill="#93c5fd" />
          {/* Charge level */}
          <rect x="14" y="22" width="24" height="20" rx="2" fill="#2563eb" opacity="0.8" />
          <rect x="14" y="22" width="16" height="20" rx="2" fill="#2563eb" />
          {/* Lightning bolt */}
          <path d="M30 24 L26 32 L30 32 L26 40" stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* Bars */}
          {[14, 20, 26, 32].map((x, i) => (
            <rect key={x} x={x + 1} y="23" width="4" height="18" rx="1" fill="none" stroke="#93c5fd" strokeWidth="0.5" opacity={i < 3 ? 1 : 0.3} />
          ))}
        </svg>
      )

    case 'screen':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} style={s}>
          {/* Monitor */}
          <rect x="8" y="10" width="48" height="34" rx="3" fill="#1e293b" stroke="#2563eb" strokeWidth="1.5" />
          <rect x="12" y="14" width="40" height="26" rx="1" fill="#dbeafe" />
          {/* Screen content lines */}
          <rect x="16" y="18" width="20" height="2" rx="1" fill="#2563eb" opacity="0.6" />
          <rect x="16" y="23" width="32" height="1.5" rx="0.75" fill="#93c5fd" opacity="0.5" />
          <rect x="16" y="27" width="28" height="1.5" rx="0.75" fill="#93c5fd" opacity="0.4" />
          <rect x="16" y="31" width="24" height="1.5" rx="0.75" fill="#93c5fd" opacity="0.3" />
          {/* Color dots */}
          <circle cx="42" cy="18" r="2" fill="#2563eb" />
          <circle cx="48" cy="18" r="2" fill="#60a5fa" />
          {/* Stand */}
          <rect x="26" y="44" width="12" height="4" rx="1" fill="#94a3b8" />
          <rect x="22" y="48" width="20" height="3" rx="1.5" fill="#cbd5e1" />
        </svg>
      )

    case 'motherboard':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} style={s}>
          {/* Central spine */}
          <line x1="40" y1="8" x2="40" y2="72" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
          {/* Main nerve branches left */}
          <path d="M40 18 L18 12" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40 28 L12 24" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40 38 L14 36" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M40 48 L10 50" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M40 58 L16 62" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40 66 L20 72" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
          {/* Main nerve branches right */}
          <path d="M40 18 L62 12" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40 28 L68 24" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40 38 L66 36" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M40 48 L70 50" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M40 58 L64 62" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40 66 L60 72" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
          {/* Secondary branches (finer) */}
          <path d="M18 12 L10 8" stroke="#93c5fd" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M12 24 L6 20" stroke="#93c5fd" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M62 12 L70 8" stroke="#93c5fd" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M68 24 L74 20" stroke="#93c5fd" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M10 50 L4 54" stroke="#93c5fd" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M70 50 L76 54" stroke="#93c5fd" strokeWidth="0.8" strokeLinecap="round" />
          {/* Nerve nodes along spine */}
          {[18, 28, 38, 48, 58, 66].map(y => (
            <circle key={y} cx={40} cy={y} r="2.5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
          ))}
          {/* Brain node at top */}
          <ellipse cx="40" cy="8" rx="6" ry="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <ellipse cx="40" cy="8" rx="3" ry="2" fill="#2563eb" opacity="0.4" />
          {/* Pulse rings on spine */}
          <circle cx="40" cy="38" r="6" stroke="#2563eb" strokeWidth="0.5" opacity="0.25" />
          <circle cx="40" cy="38" r="10" stroke="#2563eb" strokeWidth="0.3" opacity="0.12" />
        </svg>
      )

    /* ── Car mode component icons ───────────────────────────── */
    case 'engine':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} style={s}>
          <rect x="14" y="18" width="36" height="28" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          {/* Pistons */}
          {[22, 32, 42].map(x => (
            <g key={x}>
              <rect x={x - 3} y="22" width="6" height="16" rx="1" fill="#d97706" opacity="0.7" />
              <rect x={x - 2} y="18" width="4" height="6" rx="1" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
            </g>
          ))}
          {/* Exhaust */}
          <path d="M50 28 Q56 26 58 22" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M50 32 Q56 30 60 26" stroke="#94a3b8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
          {/* Belt */}
          <ellipse cx="14" cy="38" rx="4" ry="4" fill="none" stroke="#d97706" strokeWidth="1.5" />
          <ellipse cx="50" cy="38" rx="4" ry="4" fill="none" stroke="#d97706" strokeWidth="1.5" />
          <line x1="14" y1="42" x2="50" y2="42" stroke="#d97706" strokeWidth="1" />
        </svg>
      )

    case 'transmission':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} style={s}>
          {/* Gear 1 */}
          <circle cx="24" cy="32" r="12" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <circle cx="24" cy="32" r="5" fill="#d97706" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
            const rad = (angle * Math.PI) / 180
            return <rect key={angle} x={24 + Math.cos(rad) * 10 - 2} y={32 + Math.sin(rad) * 10 - 2} width="4" height="4" rx="1" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" transform={`rotate(${angle} ${24 + Math.cos(rad) * 10} ${32 + Math.sin(rad) * 10})`} />
          })}
          {/* Gear 2 */}
          <circle cx="44" cy="28" r="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <circle cx="44" cy="28" r="3" fill="#d97706" />
          {[0, 60, 120, 180, 240, 300].map(angle => {
            const rad = (angle * Math.PI) / 180
            return <rect key={angle} x={44 + Math.cos(rad) * 7 - 1.5} y={28 + Math.sin(rad) * 7 - 1.5} width="3" height="3" rx="0.5" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
          })}
          {/* Shaft */}
          <line x1="24" y1="44" x2="24" y2="56" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )

    case 'trunk':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} style={s}>
          <rect x="10" y="20" width="44" height="28" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <rect x="10" y="20" width="44" height="8" rx="4" fill="#d97706" opacity="0.2" />
          {/* Handle */}
          <rect x="26" y="18" width="12" height="4" rx="2" fill="#d97706" />
          {/* Items inside */}
          <rect x="14" y="32" width="10" height="12" rx="2" fill="#fbbf24" opacity="0.6" />
          <rect x="26" y="34" width="8" height="10" rx="2" fill="#fbbf24" opacity="0.4" />
          <rect x="36" y="30" width="14" height="14" rx="2" fill="#fbbf24" opacity="0.5" />
          {/* Label */}
          <text x="32" y="26" textAnchor="middle" fill="#92400e" fontSize="5" fontWeight="bold" fontFamily="monospace">512 Go</text>
        </svg>
      )

    case 'turbo':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} style={s}>
          <circle cx="32" cy="32" r="20" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="12" fill="none" stroke="#d97706" strokeWidth="1" />
          <circle cx="32" cy="32" r="6" fill="#d97706" />
          {/* Blades */}
          {[0, 40, 80, 120, 160, 200, 240, 280, 320].map(angle => {
            const rad = (angle * Math.PI) / 180
            const rad2 = ((angle + 30) * Math.PI) / 180
            return <path key={angle} d={`M${32 + Math.cos(rad) * 6} ${32 + Math.sin(rad) * 6} Q${32 + Math.cos((rad + rad2) / 2) * 14} ${32 + Math.sin((rad + rad2) / 2) * 14} ${32 + Math.cos(rad2) * 18} ${32 + Math.sin(rad2) * 18}`} stroke="#fbbf24" strokeWidth="2" fill="none" />
          })}
          {/* Speed lines */}
          <path d="M54 28 L60 26" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M54 32 L62 32" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M54 36 L60 38" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      )

    case 'fuel':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} style={s}>
          <rect x="14" y="16" width="28" height="36" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          {/* Fuel level */}
          <rect x="18" y="28" width="20" height="20" rx="2" fill="#fbbf24" opacity="0.6" />
          {/* Gauge */}
          <circle cx="28" cy="24" r="5" fill="none" stroke="#d97706" strokeWidth="1" />
          <line x1="28" y1="24" x2="31" y2="21" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
          {/* Pump handle */}
          <path d="M42 20 L48 20 L48 32 L44 32" stroke="#d97706" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="48" cy="34" r="2" fill="#d97706" />
          {/* Nozzle */}
          <path d="M48 36 L52 42 L48 42" stroke="#d97706" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      )

    case 'windshield':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} style={s}>
          {/* Windshield shape */}
          <path d="M10 44 L18 14 Q32 10 46 14 L54 44 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          {/* Reflection */}
          <path d="M20 38 L24 20 Q32 18 38 20" stroke="white" strokeWidth="2" opacity="0.6" strokeLinecap="round" fill="none" />
          {/* Road view */}
          <line x1="32" y1="24" x2="32" y2="40" stroke="#d97706" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.3" />
          <line x1="24" y1="38" x2="22" y2="42" stroke="#d97706" strokeWidth="0.5" opacity="0.3" />
          <line x1="40" y1="38" x2="42" y2="42" stroke="#d97706" strokeWidth="0.5" opacity="0.3" />
          {/* Frame */}
          <rect x="8" y="44" width="48" height="6" rx="2" fill="#d97706" opacity="0.3" />
        </svg>
      )

    case 'chassis':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} style={s}>
          {/* Main frame rails */}
          <path d="M12 30 L12 58 Q12 62 16 62 L64 62 Q68 62 68 58 L68 30 Q68 26 64 26 L16 26 Q12 26 12 30 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          {/* Cross members */}
          <line x1="12" y1="36" x2="68" y2="36" stroke="#d97706" strokeWidth="1" opacity="0.5" />
          <line x1="12" y1="44" x2="68" y2="44" stroke="#d97706" strokeWidth="1" opacity="0.5" />
          <line x1="12" y1="52" x2="68" y2="52" stroke="#d97706" strokeWidth="1" opacity="0.5" />
          {/* Center tunnel */}
          <rect x="34" y="26" width="12" height="36" rx="2" fill="#d97706" opacity="0.15" stroke="#d97706" strokeWidth="0.8" />
          {/* Front axle */}
          <line x1="8" y1="32" x2="72" y2="32" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          {/* Rear axle */}
          <line x1="8" y1="56" x2="72" y2="56" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          {/* Suspension points - front */}
          <circle cx="14" cy="32" r="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <circle cx="66" cy="32" r="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          {/* Suspension points - rear */}
          <circle cx="14" cy="56" r="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <circle cx="66" cy="56" r="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          {/* Suspension springs - front left */}
          <path d="M8 28 L6 30 L10 32 L6 34 L8 36" stroke="#d97706" strokeWidth="1" fill="none" strokeLinecap="round" />
          {/* Suspension springs - front right */}
          <path d="M72 28 L74 30 L70 32 L74 34 L72 36" stroke="#d97706" strokeWidth="1" fill="none" strokeLinecap="round" />
          {/* Suspension springs - rear left */}
          <path d="M8 52 L6 54 L10 56 L6 58 L8 60" stroke="#d97706" strokeWidth="1" fill="none" strokeLinecap="round" />
          {/* Suspension springs - rear right */}
          <path d="M72 52 L74 54 L70 56 L74 58 L72 60" stroke="#d97706" strokeWidth="1" fill="none" strokeLinecap="round" />
          {/* Wheel hubs */}
          <circle cx="8" cy="32" r="1.5" fill="#d97706" />
          <circle cx="72" cy="32" r="1.5" fill="#d97706" />
          <circle cx="8" cy="56" r="1.5" fill="#d97706" />
          <circle cx="72" cy="56" r="1.5" fill="#d97706" />
          {/* Steering column hint */}
          <line x1="40" y1="18" x2="40" y2="26" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="40" cy="16" r="3" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
        </svg>
      )

    /* ── Background circuit pattern ─────────────────────────── */
    case 'circuit-pattern':
      return (
        <svg viewBox="0 0 200 200" fill="none" className={className} style={{ ...s, opacity: 0.06 }}>
          {/* Traces */}
          <path d="M20 40 H80 V80 H120 V40 H180" stroke="currentColor" strokeWidth="1.5" />
          <path d="M40 20 V60 H100 V100 H160 V60" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 120 H60 V160 H140 V120 H180" stroke="currentColor" strokeWidth="1.5" />
          <path d="M80 140 V180" stroke="currentColor" strokeWidth="1.5" />
          <path d="M120 120 V180" stroke="currentColor" strokeWidth="1.5" />
          {/* Nodes */}
          {[[20, 40], [80, 80], [120, 40], [180, 40], [40, 20], [100, 100], [160, 60], [60, 160], [140, 120], [80, 140], [120, 180]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="currentColor" />
          ))}
        </svg>
      )

    default:
      return null
  }
}

/* ── Analogy icon helper ────────────────────────────────────── */
const BODY_VARIANTS: Record<string, Variant> = {
  cpu: 'cpu', ram: 'ram', ssd: 'ssd', gpu: 'gpu', battery: 'battery', screen: 'screen', motherboard: 'motherboard',
}
const CAR_VARIANTS: Record<string, Variant> = {
  cpu: 'engine', ram: 'transmission', ssd: 'trunk', gpu: 'turbo', battery: 'fuel', screen: 'windshield', motherboard: 'chassis',
}

export function getAnalogyVariant(component: string, mode: 'body' | 'car'): Variant | null {
  const map = mode === 'body' ? BODY_VARIANTS : CAR_VARIANTS
  return map[component] ?? null
}
