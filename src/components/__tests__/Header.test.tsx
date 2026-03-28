import React from 'react'
import { render, screen } from '@/__mocks__/test-utils'
import userEvent from '@testing-library/user-event'
import Header from '../Header'

// Mock next modules
jest.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [k: string]: unknown }) => (
      <a href={href} {...rest}>{children}</a>
    ),
  }
})

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => <img {...props} />,
}))

// Mock localStorage for AnalogyProvider
beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  })
})

describe('Header', () => {
  it('renders the logo text', () => {
    render(<Header />)
    expect(screen.getByText('Shop Compy')).toBeInTheDocument()
  })

  it('renders all desktop navigation links', () => {
    render(<Header />)
    // French dictionary nav labels
    expect(screen.getAllByText('Le guide').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("M'aider à choisir").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Le Décodeur').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Catalogue').length).toBeGreaterThanOrEqual(1)
  })

  it('toggles mobile menu when burger button is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const burgerButton = screen.getByLabelText('Menu')
    expect(burgerButton).toBeInTheDocument()

    // Mobile menu should not be visible initially (nav links appear in desktop nav but not in mobile dropdown)
    // Click to open
    await user.click(burgerButton)

    // After opening, the mobile nav should be rendered — check for the "start" CTA duplicated in mobile
    const startLinks = screen.getAllByText('Commencer →')
    expect(startLinks.length).toBeGreaterThanOrEqual(2) // desktop + mobile

    // Click again to close
    await user.click(burgerButton)
    // Mobile dropdown should close — only desktop "Commencer" remains
    const startLinksAfter = screen.getAllByText('Commencer →')
    expect(startLinksAfter.length).toBe(1)
  })

  it('renders the analogy toggle in the sub-header', () => {
    render(<Header />)
    // The analogy toggle should have "Corps" and "Auto" labels (hidden on sm but still in DOM)
    expect(screen.getAllByText('Corps').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Auto').length).toBeGreaterThanOrEqual(1)
  })
})
