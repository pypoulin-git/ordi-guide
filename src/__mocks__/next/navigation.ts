export const useRouter = () => ({
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
})

export const usePathname = () => '/fr'
export const useSearchParams = () => new URLSearchParams()
export const useParams = () => ({ locale: 'fr' })
