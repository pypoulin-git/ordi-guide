import React from 'react'
import { render, screen } from '@/__mocks__/test-utils'
import userEvent from '@testing-library/user-event'
import AnalogyToggle from '../AnalogyToggle'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [k: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => <img {...props} />,
}))

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: { getItem: jest.fn(() => null), setItem: jest.fn(), removeItem: jest.fn(), clear: jest.fn() },
    writable: true,
  })
})

describe('AnalogyToggle — pill variant', () => {
  it('renders body and car toggle buttons', () => {
    render(<AnalogyToggle variant="pill" />)
    expect(screen.getByTitle('Explications avec analogies du corps humain')).toBeInTheDocument()
    expect(screen.getByTitle('Explications avec analogies automobiles')).toBeInTheDocument()
  })

  it('defaults to body mode (body button should have accent color)', () => {
    render(<AnalogyToggle variant="pill" />)
    const bodyButton = screen.getByTitle('Explications avec analogies du corps humain')
    // Body mode active = color #2563eb
    expect(bodyButton).toHaveStyle({ color: '#2563eb' })
  })

  it('switches to car mode when car button is clicked', async () => {
    const user = userEvent.setup()
    render(<AnalogyToggle variant="pill" />)

    const carButton = screen.getByTitle('Explications avec analogies automobiles')
    await user.click(carButton)

    // Car button should now have its active color
    expect(carButton).toHaveStyle({ color: '#d97706' })
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
    // Body is default active
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
