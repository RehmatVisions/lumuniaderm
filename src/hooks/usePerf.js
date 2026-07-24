/**
 * Performance utilities shared across all components.
 *
 * useReducedMotion  — respects OS/browser "prefers-reduced-motion"
 * useIsMobile       — true on screens < 768 px (no tilt, no parallax)
 * usePrefersTouch   — true when primary input is touch (disable cursor/tilt)
 * FAST              — short animation preset for low-end devices
 * NORMAL            — standard animation preset
 */
import { useEffect, useState } from "react"

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

export function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  )
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < breakpoint)
    window.addEventListener("resize", handler, { passive: true })
    return () => window.removeEventListener("resize", handler)
  }, [breakpoint])
  return mobile
}

export function usePrefersTouch() {
  return typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
}

/** Viewport config that fires ONCE and uses a low threshold — safe for all devices */
export const VP_ONCE = { once: true, amount: 0.15 }

/** Duration presets — keep everything under 0.4 s for snappy feel on low-end */
export const DUR = {
  fast:   0.28,
  normal: 0.38,
  slow:   0.50,
}

/** Standard easing */
export const EASE = [0.25, 0.46, 0.45, 0.94]

/** GPU-safe entrance: only opacity + translateY (no blur, no scale on mobile) */
export function fadeUp(delay = 0, distance = 22) {
  return {
    initial:     { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport:    VP_ONCE,
    transition:  { duration: DUR.normal, delay, ease: EASE },
  }
}
