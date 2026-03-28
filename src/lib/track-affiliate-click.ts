import { track } from '@vercel/analytics'
import type { Source } from '@/types/catalogue'

/**
 * Fires a custom Vercel Analytics event when a user clicks an affiliate link.
 * No GA4 or GTM needed — Vercel Analytics handles it natively.
 */
export function trackAffiliateClick(productId: string, source: Source, price: number) {
  try {
    track('affiliate_click', {
      productId,
      source,
      price: String(price),
    })
  } catch {
    // Analytics failure should never break UX
  }
}

/**
 * Fires when a user clicks a donation button on a gift pick product.
 */
export function trackDonationClick(amount: number) {
  try {
    track('donation_click', {
      amount: String(amount),
    })
  } catch {
    // Silent fail
  }
}
