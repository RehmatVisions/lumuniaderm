/**
 * HeroPageReveal v2 — Luxury entrance animation
 *
 * Sequence (total ~1.8s, feels instant but polished):
 *
 * 1. Background fades + scales in from a very slight blur (cinematic focus-pull)
 * 2. A single horizontal gold light-streak sweeps left → right across the full
 *    viewport — like a camera flash / lens flare on a luxury product ad
 * 3. Hero content blocks slide up from 60px with opacity, staggered 60ms apart
 * 4. A thin gold border traces the hero card outline (clip-path reveal)
 * 5. Everything self-destructs from DOM after completion — zero ongoing cost
 *
 * No heavy overlays. No curtains. Clean, editorial, premium.
 */

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function HeroPageReveal({ bgRef }) {
  const streakRef  = useRef(null)
  const traceRef   = useRef(null)
  const wrapRef    = useRef(null)

  useEffect(() => {
    const streak = streakRef.current
    const trace  = traceRef.current
    const wrap   = wrapRef.current
    if (!streak || !trace || !wrap) return

    // ── collect content elements ───────────────────────────────────
    const revealEls = Array.from(document.querySelectorAll("[data-hero-reveal]"))

    // ── initial states ─────────────────────────────────────────────
    // Content: hidden below — no blur filter (GPU expensive, causes lag)
    gsap.set(revealEls, {
      y:       52,
      opacity: 0,
    })

    // Background: very slight scale for focus-pull effect — no blur
    if (bgRef?.current) {
      gsap.set(bgRef.current, {
        scale:  1.05,
        transformOrigin: "center center",
      })
    }

    // Streak: starts off-screen left, full height of viewport
    gsap.set(streak, {
      x:       "-110vw",
      opacity: 1,
      skewX:   "-18deg",
    })

    // Trace border: hidden
    gsap.set(trace, { opacity: 0 })

    // ── master timeline ────────────────────────────────────────────
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => wrap.remove(),
    })

    tl
      // 0.0 — bg scales in (no blur — keeps GPU load low)
      .to(bgRef?.current ?? {}, {
        scale:    1,
        duration: 1.2,
        ease:     "power2.out",
      }, 0)

      // 0.15 — gold light-streak sweeps right
      .to(streak, {
        x:        "120vw",
        duration: 0.60,
        ease:     "power2.inOut",
      }, 0.15)

      // 0.22 — fade streak out as it exits
      .to(streak, {
        opacity:  0,
        duration: 0.18,
        ease:     "power1.in",
      }, 0.57)

      // 0.28 — hero content staggers up, no blur
      .to(revealEls, {
        y:        0,
        opacity:  1,
        duration: 0.65,
        stagger:  0.055,
        ease:     "power4.out",
      }, 0.26)

      // 0.55 — gold border trace flashes in then out
      .to(trace, {
        opacity:  0.55,
        duration: 0.25,
        ease:     "power1.out",
      }, 0.55)
      .to(trace, {
        opacity:  0,
        duration: 0.45,
        ease:     "power1.in",
      }, 0.85)

    return () => { tl.kill() }
  }, [bgRef])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position:      "absolute",
        inset:         0,
        zIndex:        90,
        pointerEvents: "none",
        overflow:      "hidden",
      }}
    >
      {/*
       * Gold light-streak — a tall narrow rectangle with a radial glow,
       * skewed and blurred to look like a studio light sweep
       */}
      <div
        ref={streakRef}
        style={{
          position:   "absolute",
          top:        "-20%",
          left:       0,
          width:      "28vw",
          height:     "140%",
          background: "linear-gradient(90deg, transparent 0%, rgba(245,166,35,0.07) 30%, rgba(245,166,35,0.22) 50%, rgba(245,166,35,0.07) 70%, transparent 100%)",
          filter:     "blur(18px)",
          willChange: "transform",
        }}
      />

      {/*
       * Hero border trace — a 1px gold outline that flashes on the hero area
       * to frame the content, then fades. Purely cosmetic / cinematic.
       */}
      <div
        ref={traceRef}
        style={{
          position:     "absolute",
          inset:        "12px",
          borderRadius: "inherit",
          border:       "1px solid rgba(198,148,89,0.55)",
          boxShadow:    "inset 0 0 40px rgba(198,148,89,0.04), 0 0 60px rgba(198,148,89,0.06)",
        }}
      />
    </div>
  )
}
