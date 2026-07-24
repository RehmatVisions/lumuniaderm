/**
 * useScrollReveal — shared scroll-triggered animation presets
 * Used site-wide to keep reveal behaviour consistent.
 */

export const EASE_OUT  = [0.25, 0.46, 0.45, 0.94]
export const EASE_EXPO = [0.16, 1,    0.3,  1    ]
export const VP_ONCE   = { once: true, margin: "-60px" }

/** Fade + slide up — most common reveal */
export const revealUp = (delay = 0, distance = 28) => ({
  initial:     { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0        },
  viewport:    VP_ONCE,
  transition:  { duration: 0.6, delay, ease: EASE_EXPO },
})

/** Fade + slide from left */
export const revealLeft = (delay = 0) => ({
  initial:     { opacity: 0, x: -48 },
  whileInView: { opacity: 1, x: 0   },
  viewport:    VP_ONCE,
  transition:  { duration: 0.65, delay, ease: EASE_OUT },
})

/** Fade + slide from right */
export const revealRight = (delay = 0) => ({
  initial:     { opacity: 0, x: 48 },
  whileInView: { opacity: 1, x: 0  },
  viewport:    VP_ONCE,
  transition:  { duration: 0.65, delay, ease: EASE_OUT },
})

/** Scale in — for badges, pills, icons */
export const revealScale = (delay = 0) => ({
  initial:     { opacity: 0, scale: 0.7 },
  whileInView: { opacity: 1, scale: 1   },
  viewport:    VP_ONCE,
  transition:  { duration: 0.5, delay, type: "spring", bounce: 0.35 },
})

/** Stagger container — wrap a list of children */
export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  initial:     {},
  whileInView: {},
  viewport:    VP_ONCE,
  transition:  { staggerChildren: stagger, delayChildren },
})

/** Child variant used with staggerContainer */
export const staggerChild = {
  initial:  { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: EASE_EXPO },
}

/**
 * imageCornerStyle — top-left & bottom-right rounded, opposite corners sharp.
 * Creates the distinctive diagonal "angled" look across all section images.
 */
export const imageCornerStyle = {
  borderRadius: "2rem 0.5rem 2rem 0.5rem",
}
