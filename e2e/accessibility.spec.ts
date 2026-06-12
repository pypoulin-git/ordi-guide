import { test, expect } from '@playwright/test'

/**
 * Basic accessibility checks — critical because the site targets
 * older users, daltoniens, and accessibility-conscious audience.
 */

test('home has a lang attribute on html', async ({ page }) => {
  await page.goto('/fr')
  const lang = await page.getAttribute('html', 'lang')
  expect(lang).toBeTruthy()
})

test('all images have alt text', async ({ page }) => {
  await page.goto('/fr')
  await page.waitForLoadState('networkidle')

  const imagesWithoutAlt = await page.$$eval(
    'img',
    (imgs) => imgs.filter((img) => !img.getAttribute('alt') && !img.getAttribute('aria-hidden')).length,
  )
  expect(imagesWithoutAlt).toBe(0)
})

test('main landmarks exist', async ({ page }) => {
  await page.goto('/fr')
  await expect(page.locator('main')).toBeVisible()
  await expect(page.locator('header, [role="banner"]').first()).toBeVisible()
})

test('has a single H1 on home', async ({ page }) => {
  await page.goto('/fr')
  const h1Count = await page.locator('h1').count()
  expect(h1Count).toBe(1)
})
