/**
 * Site-wide constants.
 *
 * BASE_URL is the canonical production domain.
 * Using a single source of truth avoids scattered hardcoded URLs.
 *
 * If you ever move domains again, only this line needs to change.
 */
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shopcompy.ca'

export const SITE_NAME = 'Shop Compy'
