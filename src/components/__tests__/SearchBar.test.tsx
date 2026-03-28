import React from 'react'
import { render, screen, waitFor } from '@/__mocks__/test-utils'
import userEvent from '@testing-library/user-event'
import SearchBar from '../SearchBar'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [k: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: { getItem: jest.fn(() => null), setItem: jest.fn(), removeItem: jest.fn(), clear: jest.fn() },
    writable: true,
  })
})

describe('SearchBar', () => {
  it('renders the input and submit button', () => {
    render(<SearchBar />)
    expect(screen.getByPlaceholderText('Décris ton besoin en une phrase…')).toBeInTheDocument()
    expect(screen.getByText('Chercher')).toBeInTheDocument()
  })

  it('updates input value on typing', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)

    const input = screen.getByPlaceholderText('Décris ton besoin en une phrase…')
    await user.type(input, 'un portable pour travailler')

    expect(input).toHaveValue('un portable pour travailler')
  })

  it('disables the submit button when query is too short', () => {
    render(<SearchBar />)
    const button = screen.getByText('Chercher')
    // Initially empty — button should be disabled
    expect(button).toBeDisabled()
  })

  it('shows example suggestion buttons when no result', () => {
    render(<SearchBar />)
    expect(screen.getByText('Essaie :')).toBeInTheDocument()
    // Check that at least one example is rendered
    expect(screen.getByText(/Un ordi pour ma mère/)).toBeInTheDocument()
  })

  it('calls fetch and shows loading state on search', async () => {
    const user = userEvent.setup()
    // Mock fetch to return a delayed response
    global.fetch = jest.fn(() =>
      new Promise((resolve) =>
        setTimeout(() => resolve({
          json: () => Promise.resolve({
            answer: 'Test answer',
            specs: { cpu: 'i5', ram: '8GB', ssd: '512GB', gpu: 'Iris Xe', budget: '700$' },
            archetype: 'minimalist',
            usage_detected: ['email'],
          }),
        } as Response), 100)
      )
    )

    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Décris ton besoin en une phrase…')
    await user.type(input, 'un ordi pour le courriel')

    const button = screen.getByText('Chercher')
    await user.click(button)

    // Should show loading text
    expect(screen.getByText('Notre assistant analyse ta demande…')).toBeInTheDocument()

    // Wait for result
    await waitFor(() => {
      expect(screen.getByText('Test answer')).toBeInTheDocument()
    })

    // Examples should be hidden when result is shown
    expect(screen.queryByText('Essaie :')).not.toBeInTheDocument()
  })

  it('shows error message on fetch failure', async () => {
    const user = userEvent.setup()
    global.fetch = jest.fn(() => Promise.reject(new Error('network error')))

    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Décris ton besoin en une phrase…')
    await user.type(input, 'un ordi pour le courriel')

    const button = screen.getByText('Chercher')
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText('Erreur de connexion. Réessaie dans un instant.')).toBeInTheDocument()
    })
  })
})
