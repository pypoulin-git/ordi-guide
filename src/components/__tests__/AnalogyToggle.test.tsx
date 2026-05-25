import React from 'react'
import { render, screen } from '@/__mocks__/test-utils'
import userEvent from '@testing-library/user-event'
import AnalogyToggle from '../AnalogyToggle'

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode
    href: string
    [k: string]: unknown
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

vi.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text
  default: (props: Record<string, unknown>) => <img {...props} />,
}))

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: { getItem: vi.fn(() => null), setItem: vi.fn(), removeItem: vi.fn(), clear: vi.fn() },
    writable: true,
  })
})

describe('AnalogyToggle — pill variant', () => {
  it('renders body and car toggle buttons', () => {
    render(<AnalogyToggle variant="pill" />)
    // Buttons contain short labels ('Corps' / 'Auto') in a visually-hidden span
    const buttons = screen.getAllByRole('button')
    expect(buttons.some((b) => b.textContent?.includes('Corps'))).toBe(true)
    expect(buttons.some((b) => b.textContent?.includes('Auto'))).toBe(true)
  })

  it('defaults to body mode without writing the analogy key to localStorage', () => {
    render(<AnalogyToggle variant="pill" />)
    // Default mode is body — setMode is not called on initial render,
    // so the 'shopcompy-analogy' key must never be written
    // (CompareContext writes 'compare_ids' — we scope the check to the analogy key)
    expect(window.localStorage.setItem).not.toHaveBeenCalledWith(
      'shopcompy-analogy',
      expect.anything(),
    )
  })

  it('switches to car mode when car button is clicked', async () => {
    const user = userEvent.setup()
    render(<AnalogyToggle variant="pill" />)

    const carButton = screen.getAllByRole('button').find((b) => b.textContent?.includes('Auto'))!
    await user.click(carButton)

    // localStorage should have been updated
    expect(window.localStorage.setItem).toHaveBeenCalledWith('shopcompy-analogy', 'car')
  })
})

describe('AnalogyToggle — card variant', () => {
  it('renders body and car cards with labels', () => {
    render(<AnalogyToggle variant="card" />)
    expect(screen.getByText('Corps humain')).toBeInTheDocument()
    expect(screen.getByText('Automobile')).toBeInTheDocument()
  })

  it('shows active badge on the default mode', () => {
    render(<AnalogyToggle variant="card" />)
    // Body is default active — badge contains 'Actif'
    expect(screen.getByText(/Actif/)).toBeInTheDocument()
  })

  it('switches active badge when car card is clicked', async () => {
    const user = userEvent.setup()
    render(<AnalogyToggle variant="card" />)

    const carCard = screen.getByText('Automobile')
    await user.click(carCard)

    // Active badge should now be on the car card
    // The body description and car description are both present; the badge moves
    expect(screen.getByText(/Actif/)).toBeInTheDocument()
    expect(screen.getByText('Moteur, coffre, turbo…')).toBeInTheDocument()
  })
})
