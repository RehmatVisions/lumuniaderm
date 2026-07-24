import { useEffect, useRef } from "react"

/**
 * useReveal — attaches IntersectionObserver to a container ref.
 * Any child with className "reveal" gets "is-visible" added once
 * it enters the viewport. Pure CSS drives the animation — zero JS
 * animation loop, no layout thrash, no lag.
 *
 * @param {object} options
 * @param {string}  options.rootMargin  - e.g. "-80px 0px" (default)
 * @param {number}  options.threshold   - 0–1 (default 0.12)
 * @param {boolean} options.once        - remove observer after trigger (default true)
 */
export function useReveal({
  rootMargin = "-60px 0px",
  threshold  = 0.10,
  once       = true,
} = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    // Respect user's motion preference at the JS level too
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const container = containerRef.current
    if (!container) return

    const targets = container.querySelectorAll(".reveal")
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            if (once) observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin, threshold }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [rootMargin, threshold, once])

  return containerRef
}

/**
 * Standalone hook for a single element ref.
 */
export function useRevealEl({
  rootMargin = "-60px 0px",
  threshold  = 0.12,
  once       = true,
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible")
          if (once) observer.disconnect()
        }
      },
      { rootMargin, threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold, once])

  return ref
}
