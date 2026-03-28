import { isValidLocale, locales, defaultLocale } from '../config'

describe('i18n config', () => {
  it('exports fr and en as valid locales', () => {
    expect(locales).toContain('fr')
    expect(locales).toContain('en')
    expect(locales).toHaveLength(2)
  })

  it('has fr as the default locale', () => {
    expect(defaultLocale).toBe('fr')
  })

  it('isValidLocale returns true for fr and en', () => {
    expect(isValidLocale('fr')).toBe(true)
    expect(isValidLocale('en')).toBe(true)
  })

  it('isValidLocale returns false for unsupported locales', () => {
    expect(isValidLocale('es')).toBe(false)
    expect(isValidLocale('de')).toBe(false)
    expect(isValidLocale('')).toBe(false)
    expect(isValidLocale('FR')).toBe(false)
  })
})
