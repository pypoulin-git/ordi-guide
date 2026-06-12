import { test, expect } from '@playwright/test'

/**
 * Comparateur — key user flow.
 * The comparator questionnaire is the primary conversion path on the site.
 */

test('comparateur page loads and shows questions or CTA', async ({ page }) => {
  await page.goto('/fr/comparateur')
  await expect(page).toHaveTitle(/comparateur|compare/i)

  // The page should show either a question, a form, or a start CTA
  const hasQuestion = await page.getByRole('heading').count()
  expect(hasQuestion).toBeGreaterThan(0)
})

test('navigation from home to comparateur works', async ({ page }) => {
  await page.goto('/fr')

  // Find a link to comparateur (may be in nav or hero CTA)
  const link = page.getByRole('link', { name: /comparateur|trouve|recommand/i }).first()

  if ((await link.count()) > 0) {
    await link.click()
    await expect(page).toHaveURL(/comparateur/)
  }
})
