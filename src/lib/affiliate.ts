import type { Source } from '@/types/catalogue'

/**
 * Appends affiliate tracking parameters to a retailer URL at render time.
 * If the corresponding env var is empty/missing, the URL passes through unchanged.
 * catalogue.json keeps clean URLs — params are added only at display.
 */
export function buildAffiliateUrl(url: string, source: Source): string {
  try {
    const u = new URL(url)

    switch (source) {
      case 'amazon': {
        const tag = process.env.NEXT_PUBLIC_AMAZON_TAG
        if (tag) u.searchParams.set('tag', tag)
        break
      }
      case 'newegg': {
        const aff = process.env.NEXT_PUBLIC_NEWEGG_AFF
        if (aff) u.searchParams.set('utm_medium', 'affiliate')
        if (aff) u.searchParams.set('utm_source', aff)
        break
      }
      case 'bestbuy': {
        const ref = process.env.NEXT_PUBLIC_BESTBUY_REF
        if (ref) u.searchParams.set('ref', ref)
        break
      }
      case 'staples': {
        const id = process.env.NEXT_PUBLIC_STAPLES_ID
        if (id) u.searchParams.set('affiliateId', id)
        break
      }
      case 'lenovo': {
        const aff = process.env.NEXT_PUBLIC_LENOVO_AFF
        if (aff) u.searchParams.set('clickid', aff)
        break
      }
      case 'dell': {
        const aff = process.env.NEXT_PUBLIC_DELL_AFF
        if (aff) u.searchParams.set('dgc', aff)
        break
      }
      case 'hp': {
        const aff = process.env.NEXT_PUBLIC_HP_AFF
        if (aff) u.searchParams.set('jumpid', aff)
        break
      }
      case 'walmart': {
        const aff = process.env.NEXT_PUBLIC_WALMART_AFF
        if (aff) u.searchParams.set('utm_medium', 'affiliate')
        if (aff) u.searchParams.set('utm_source', aff)
        break
      }
      case 'canadacomputers': {
        const aff = process.env.NEXT_PUBLIC_CC_AFF
        if (aff) u.searchParams.set('ref', aff)
        break
      }
      // costco, microsoft — no affiliate program, pass through
      default:
        break
    }

    return u.toString()
  } catch {
    // Invalid URL — return as-is
    return url
  }
}

/**
 * Returns the appropriate rel attribute for an affiliate link.
 * Gift picks (no commission) don't get the "sponsored" tag.
 */
export function getAffiliateRel(isGiftPick?: boolean): string {
  return isGiftPick
    ? 'noopener noreferrer'
    : 'noopener noreferrer sponsored'
}
