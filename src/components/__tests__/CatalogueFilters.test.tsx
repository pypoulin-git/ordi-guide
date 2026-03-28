import React from 'react'
import { render, screen } from '@/__mocks__/test-utils'
import userEvent from '@testing-library/user-event'
import CatalogueFilters from '../CatalogueFilters'
import type { CatalogueProduct } from '@/types/catalogue'

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

function makeProduct(overrides: Partial<CatalogueProduct> = {}): CatalogueProduct {
  return {
    id: 'p1',
    name: 'Test Laptop',
    brand: 'TestBrand',
    category: 'laptop',
    profiles: ['basic'],
    budgetTier: 'under500',
    price: 450,
    url: 'https://example.com',
    source: 'bestbuy',
    specs: { cpu: 'i3', ram: '4GB', storage: '256GB SSD' },
    aiScore: 70,
    aiRationale: 'Good for basics.',
    addedAt: '2026-03-20',
    lastVerified: '2026-03-27',
    isOnSale: false,
    ...overrides,
  }
}

const products = [
  makeProduct({ id: 'p1', name: 'Budget Basic', profiles: ['basic'], budgetTier: 'under500', category: 'laptop' }),
  makeProduct({ id: 'p2', name: 'Pro Workstation', profiles: ['work'], budgetTier: '900to1500', category: 'desktop' }),
  makeProduct({ id: 'p3', name: 'Gaming Beast', profiles: ['gaming'], budgetTier: 'over1500', category: 'laptop' }),
]

describe('CatalogueFilters', () => {
  it('renders filter section labels', () => {
    render(<CatalogueFilters products={products} />)
    expect(screen.getByText('Profil')).toBeInTheDocument()
    expect(screen.getByText('Budget')).toBeInTheDocument()
    expect(screen.getByText('Catégorie')).toBeInTheDocument()
  })

  it('shows total product count when no filter is active', () => {
    render(<CatalogueFilters products={products} />)
    expect(screen.getByText(/3 produits/)).toBeInTheDocument()
    expect(screen.getByText(/au total/)).toBeInTheDocument()
  })

  it('filters products by profile when a profile button is clicked', async () => {
    const user = userEvent.setup()
    render(<CatalogueFilters products={products} />)

    // Click "Pour jouer" filter button (not the badge span in ProductCard)
    const gamingButtons = screen.getAllByText('Pour jouer')
    const gamingButton = gamingButtons.find(el => el.tagName === 'BUTTON')!
    await user.click(gamingButton)

    // Should show 1 product matching
    expect(screen.getByText(/1 produit/)).toBeInTheDocument()
    expect(screen.getByText(/correspondants/)).toBeInTheDocument()
    expect(screen.getByText('Gaming Beast')).toBeInTheDocument()
    expect(screen.queryByText('Budget Basic')).not.toBeInTheDocument()
  })

  it('toggles off filter when the same button is clicked again', async () => {
    const user = userEvent.setup()
    render(<CatalogueFilters products={products} />)

    const gamingButton = screen.getAllByText('Pour jouer').find(el => el.tagName === 'BUTTON')!
    await user.click(gamingButton) // activate
    expect(screen.getByText(/1 produit/)).toBeInTheDocument()

    // After filtering, the button is still there — click it again
    const gamingButtonAfter = screen.getAllByText('Pour jouer').find(el => el.tagName === 'BUTTON')!
    await user.click(gamingButtonAfter) // deactivate
    expect(screen.getByText(/3 produits/)).toBeInTheDocument()
  })

  it('shows clear filters button when a filter is active', async () => {
    const user = userEvent.setup()
    render(<CatalogueFilters products={products} />)

    // No clear button initially
    expect(screen.queryByText('Effacer les filtres')).not.toBeInTheDocument()

    const gamingButton = screen.getAllByText('Pour jouer').find(el => el.tagName === 'BUTTON')!
    await user.click(gamingButton)
    expect(screen.getByText('Effacer les filtres')).toBeInTheDocument()
  })

  it('shows empty state when no products match filters', async () => {
    const user = userEvent.setup()
    // Only basic products, but we'll filter for creative
    render(<CatalogueFilters products={products} />)

    await user.click(screen.getByText('Pour créer'))
    expect(screen.getByText('Aucun produit trouvé')).toBeInTheDocument()
  })
})
