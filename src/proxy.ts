import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/i18n/config'
import { SECURITY_HEADERS } from '@/lib/security-headers'

function applySecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value)
  }
  return response
}

export function proxy(request: NextRequest) {
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
