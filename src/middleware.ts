import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/i18n/config'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files, api routes, _next
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static files (.svg, .ico, etc.)
  ) {
    return NextResponse.next()
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Detect preferred locale from Accept-Language header
  const acceptLang = request.headers.get('accept-language') ?? ''
  const preferredLocale = acceptLang.includes('en') && !acceptLang.includes('fr')
    ? 'en'
    : defaultLocale

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
