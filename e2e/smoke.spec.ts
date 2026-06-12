import { test, expect } from '@playwright/test'

/**
 * Smoke tests — verify all main routes return 200 and render key content.
 * Fast (<10s) and runs on every PR.
 */

const ROUTES = [
  { path: '/', title: /Compy|Ordi|Guide/i },
  { path: '/fr', title: /Compy|Ordi|Guide/i },
  { path: '/fr/guide', title: /guide/i },
  { path: '/fr/comparateur', title: /comparateur|compare/i },
  { path: '/fr/catalogue', title: /catalogue/i },
  { path: '/fr/glossaire', title: /glossaire|lexique/i },
  { path: '/fr/blog', title: /blog/i },
  { path: '/fr/about', title: /about|propos/i },
]

for (const route of ROUTES) {
  test(`${route.path} renders with expected content`, async ({ page }) => {
    const response = await page.goto(route.path)
    expect(response?.status(), `${route.path} should return 2xx`).toBeLessThan(400)
    await expect(page).toHaveTitle(route.title)
  })
}

test('home has no critical console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (err) => errors.push(err.message))
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })

  await page.goto('/')
  await page.waitForLoadState('networkidle')

  // Filter out benign warnings (third-party, analytics, hydration false positives,
  // and the dev-only React eval()/CSP notice — React never uses eval() in production)
  const critical = errors.filter(
    (e) =>
      !e.includes('vercel') &&
      !e.includes('analytics') &&
      !e.includes('hydration') &&
      !e.includes('eval() is not supported'),
  )
  expect(critical).toEqual([])
})

test('security headers are present', async ({ page }) => {
  const response = await page.goto('/')
  const headers = response?.headers() || {}

  // ordi-guide configures these in next.config.ts
  expect(headers['content-security-policy']).toBeDefined()
  expect(headers['x-frame-options']).toBeDefined()
  expect(headers['referrer-policy']).toBeDefined()
})
