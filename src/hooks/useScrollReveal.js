import { useEffect } from 'react'

/**
 * Adds the `isVisible` class to every `.reveal` element once it scrolls into
 * view. Gentle, one-way (it never re-hides), and it re-scans whenever `deps`
 * change so newly mounted sections get picked up too.
 */
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal:not(.isVisible)')
    if (!nodes.length) return

    // No IntersectionObserver (very old browser)? Just show everything.
    if (typeof IntersectionObserver === 'undefined') {
      nodes.forEach((n) => n.classList.add('isVisible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('isVisible')
            observer.unobserve(entry.target)
          }
        })
      },
      // Trigger a little before the element fully enters the viewport
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
