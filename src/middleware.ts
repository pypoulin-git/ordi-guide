import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/i18n/config'

// ── Security headers applied to EVERY response ──
const SECURITY_HEADERS: Record<string, string> = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://cdn.vercel-insights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://generativelanguage.googleapis.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join('; '),
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

  if (pathnameHasLocale) return applySecurityHeaders(NextResponse.next())

  // Detect preferred locale from Accept-Language header
  const acceptLang = request.headers.get('accept-language') ?? ''
  const preferredLocale = acceptLang.includes('en') && !acceptLang.includes('fr')
    ? 'en'
    : defaultLocale

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale}${pathname}`
  return applySecurityHeaders(NextResponse.redirect(url))
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
