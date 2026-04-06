'use client'
import { useCallback, useEffect, useRef } from 'react'

/**
 * Hook that adds scroll-reveal animations via IntersectionObserver.
 * Adds `data-revealed="true"` when the element enters the viewport.
 * Respects `prefers-reduced-motion` — reveals instantly if enabled.
 * Zero dependencies, CSS-driven transitions.
 *
 * Usage:
 *   const revealRef = useScrollReveal()
 *   <div ref={revealRef} className="reveal"> ... </div>
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string }
) {
  const elementsRef = useRef<Set<T>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Check reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      // Instantly reveal everything
      elementsRef.current.forEach(el => {
        el.setAttribute('data-revealed', 'true')
      })
      return
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', 'true')
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? '0px 0px -40px 0px',
      }
    )

    // Observe all registered elements
    elementsRef.current.forEach(el => {
      observerRef.current?.observe(el)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Callback ref — registers/unregisters elements
  const ref = useCallback((node: T | null) => {
    if (node) {
      elementsRef.current.add(node)
      // If observer is ready, observe immediately
      observerRef.current?.observe(node)
      // Check reduced motion for late-registered elements
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        node.setAttribute('data-revealed', 'true')
      }
    }
  }, [])

  return ref
}
