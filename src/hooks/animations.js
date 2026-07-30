/**
 * animations.js — Shared animation helpers used across the site.
 *
 * This file replaces usePerf.js and useScrollReveal.js.
 * It exports:
 *   - useReducedMotion  — returns true if the user prefers reduced motion
 *   - useIsMobile       — returns true on screens narrower than 768px
 *   - useReveal (from useReveal.js, re-exported for convenience)
 *   - VP_ONCE           — shared viewport config: fire once, low threshold
 *   - EASE              — standard easing curve
 *   - EASE_EXPO         — expo easing curve
 *   - fadeUp()          — fade + slide-up animation props
 *   - revealUp()        — same as fadeUp, alias used in older components
 *   - revealLeft()      — fade + slide from left
 *   - revealRight()     — fade + slide from right
 *   - revealScale()     — scale-in with spring
 *   - staggerContainer()— framer-motion stagger wrapper
 *   - staggerChild      — child variant used with staggerContainer
 */
import { useEffect, useState } from "react"

// ─── Viewport config ─────────────────────────────────────────
// Use this in framer-motion's viewport prop for scroll-triggered animations.
// once:true means the animation only plays the first time the element enters view.
export const VP_ONCE = { once: true, amount: 0.15 }

// ─── Easing curves ───────────────────────────────────────────
export const EASE      = [0.25, 0.46, 0.45, 0.94]
export const EASE_EXPO = [0.16, 1,    0.3,  1    ]

// ─── Hooks ───────────────────────────────────────────────────

/**
 * useReducedMotion — returns true if the OS/browser has
 * "prefers-reduced-motion: reduce" enabled. Use this to
 * skip or simplify animations for accessibility.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  )
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return reduced
}

/**
 * useIsMobile — returns true when the viewport is narrower than
 * the given breakpoint (default 768px). Updates on resize.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  )
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener("resize", handler, { passive: true })
    return () => window.removeEventListener("resize", handler)
  }, [breakpoint])
  return isMobile
}

// ─── Animation preset functions ──────────────────────────────
// These return a props object you can spread directly onto a
// framer-motion element: <motion.div {...fadeUp(0.2)} />

/**
 * fadeUp — fades in and slides up from below.
 * Most common reveal animation used site-wide.
 */
export function fadeUp(delay = 0, distance = 28) {
  return {
    initial:     { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport:    VP_ONCE,
    transition:  { duration: 0.6, delay, ease: EASE_EXPO },
  }
}

// Alias — some older components use revealUp
export const revealUp = fadeUp

/**
 * revealLeft — fades in and slides in from the left.
 */
export function revealLeft(delay = 0) {
  return {
    initial:     { opacity: 0, x: -48 },
    whileInView: { opacity: 1, x: 0   },
    viewport:    VP_ONCE,
    transition:  { duration: 0.65, delay, ease: EASE },
  }
}

/**
 * revealRight — fades in and slides in from the right.
 */
export function revealRight(delay = 0) {
  return {
    initial:     { opacity: 0, x: 48 },
    whileInView: { opacity: 1, x: 0  },
    viewport:    VP_ONCE,
    transition:  { duration: 0.65, delay, ease: EASE },
  }
}

/**
 * revealScale — scales in from slightly smaller.
 * Good for badges, pills, and icon elements.
 */
export function revealScale(delay = 0) {
  return {
    initial:     { opacity: 0, scale: 0.7 },
    whileInView: { opacity: 1, scale: 1   },
    viewport:    VP_ONCE,
    transition:  { duration: 0.5, delay, type: "spring", bounce: 0.35 },
  }
}

/**
 * staggerContainer — wraps a list of motion children to stagger
 * their animations. Use with staggerChild on each child.
 */
export function staggerContainer(stagger = 0.08, delayChildren = 0) {
  return {
    initial:     {},
    whileInView: {},
    viewport:    VP_ONCE,
    transition:  { staggerChildren: stagger, delayChildren },
  }
}

/**
 * staggerChild — variant for children of a staggerContainer.
 * Fades up with a slight delay between each item.
 */
export const staggerChild = {
  initial:     { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  transition:  { duration: 0.55, ease: EASE_EXPO },
}
