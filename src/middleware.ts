import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/i18n/config'

// ── Content-Security-Policy ──
// Each directive is commented to explain why it exists and what it allows.
// TODO: Add report-to / report-uri directive once a reporting endpoint is set up
//       (e.g. https://shopcompy.report-uri.com/r/d/csp/enforce)
// TODO: Consider Trusted Types when browser support is broader:
//       "require-trusted-types-for 'script'" — prevents DOM XSS via innerHTML etc.
const CSP_DIRECTIVES = [
  // Fallback for any resource type not explicitly listed
  "default-src 'self'",

  // Scripts: 'unsafe-inline' is required by Next.js for inline <script> tags
  // injected during SSR/hydration. Removing it would break the app.
  // Vercel analytics + insights scripts are loaded from their CDN domains.
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://cdn.vercel-insights.com",

  // Styles: 'unsafe-inline' is required for Tailwind's runtime styles and
  // Next.js style injection. Google Fonts stylesheet is loaded from googleapis.
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

  // Fonts: Google Fonts serves font files from gstatic.com
  "font-src 'self' https://fonts.gstatic.com",

  // Images: Only local images + data: URIs (used by Next.js image blur placeholders).
  // No external image domains are used — keeping this tight.
  "img-src 'self' data:",

  // XHR / fetch / WebSocket connections:
  // - Vercel Web Vitals & Analytics reporting
  // - Google Generative AI API (comparator AI features)
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://generativelanguage.googleapis.com",

  // Prevent this site from being embedded in iframes (clickjacking protection)
  "frame-ancestors 'none'",

  // Restrict <base> tag to prevent base-URI hijacking
  "base-uri 'self'",

  // Restrict form submissions to same origin
  "form-action 'self'",

  // Block <object>, <embed>, <applet> — legacy plugin vectors
  "object-src 'none'",

  // Service workers can only be loaded from same origin
  "worker-src 'self'",

  // Web app manifest can only be loaded from same origin
  "manifest-src 'self'",

  // Upgrade all HTTP requests to HTTPS automatically
  "upgrade-insecure-requests",
]

// ── Security headers applied to EVERY response ──
const SECURITY_HEADERS: Record<string, string> = {
  'Content-Security-Policy': CSP_DIRECTIVES.join('; '),
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-DNS-Prefetch-Control': 'on',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

function applySecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value)
  }
  return response
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files, api routes, _next
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static files (.svg, .ico, etc.)
  ) {
    return applySecurityHeaders(NextResponse.next())
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    // Extract locale and pass it via header so root layout can read it
    const matchedLocale = locales.find(
      l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
    ) ?? defaultLocale
    const response = applySecurityHeaders(NextResponse.next())
    response.headers.set('x-locale', matchedLocale)
    return response
  }

  // Detect preferred locale from Accept-Language header
  const acceptLang = request.headers.get('accept-language') ?? ''
  const preferredLocale = acceptLang.includes('en') && !acceptLang.includes('fr')
    ? 'en'
    : defaultLocale

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale}${pathname}`
  const redirectResponse = applySecurityHeaders(NextResponse.redirect(url))
  redirectResponse.headers.set('x-locale', preferredLocale)
  return redirectResponse
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
