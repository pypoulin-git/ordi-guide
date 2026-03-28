import React from 'react'
import { render, screen } from '@/__mocks__/test-utils'
import ProductCard from '../ProductCard'
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

const mockProduct: CatalogueProduct = {
  id: 'test-product-1',
  name: 'Lenovo IdeaPad 3',
  brand: 'Lenovo',
  category: 'laptop',
  profiles: ['basic', 'student'],
  budgetTier: '500to900',
  price: 649,
  originalPrice: 799,
  url: 'https://example.com/lenovo',
  source: 'bestbuy',
  specs: {
    cpu: 'Intel Core i5-1235U',
    ram: '8 Go DDR4',
    storage: '512 Go SSD NVMe',
    display: '15.6" FHD IPS',
    gpu: 'Intel Iris Xe',
  },
  aiScore: 82,
  aiRationale: 'Excellent rapport qualite-prix pour etudiants.',
  addedAt: '2026-03-20',
  lastVerified: '2026-03-27',
  isOnSale: true,
}

describe('ProductCard', () => {
  it('renders the product name and brand', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Lenovo IdeaPad 3')).toBeInTheDocument()
    expect(screen.getByText('Lenovo')).toBeInTheDocument()
  })

  it('renders the price and original price when on sale', () => {
    render(<ProductCard product={mockProduct} />)
    // Price displayed
    expect(screen.getByText(/649/)).toBeInTheDocument()
    // Original price with line-through
    expect(screen.getByText(/799/)).toBeInTheDocument()
    // Discount badge
    expect(screen.getByText(/-19 %/)).toBeInTheDocument()
  })

  it('renders the AI score', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('82/100')).toBeInTheDocument()
  })

  it('renders spec lines for CPU and RAM', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Intel Core i5-1235U')).toBeInTheDocument()
    expect(screen.getByText('8 Go DDR4')).toBeInTheDocument()
  })

  it('links to the product detail page', () => {
    render(<ProductCard product={mockProduct} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/fr/catalogue/test-product-1')
  })

  it('renders profile badges', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Pour débuter')).toBeInTheDocument()
    expect(screen.getByText('Pour les études')).toBeInTheDocument()
  })
})
