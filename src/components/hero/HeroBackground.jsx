/**
 * HeroBackground — Performance-optimised
 * • Parallax via passive scroll listener + single RAF (no Framer spring)
 * • Only animates `transform: translate3d` — GPU composited, zero layout
 * • Blur filters removed; replaced with pure CSS gradient overlays
 * • Ambient orbs: opacity-only animation (cheapest possible)
 * • Parallax disabled when prefers-reduced-motion is set
 */
import { useEffect, useRef } from "react"

import heroUpImg from "../../assets/herotwo.jpg"

export default function HeroBackground() {
  const bgRef  = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const el = bgRef.current
    if (!el) return

    // Disable parallax for reduced-motion or mobile
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const mobile  = window.innerWidth < 768
    if (reduced || mobile) return

    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      rafRef.current = requestAnimationFrame(() => {
        const offset = window.scrollY
        // Move bg at 28% scroll speed — classic parallax
        el.style.transform = `translate3d(0, ${offset * 0.28}px, 0)`
        ticking = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>

      {/* Parallax image — translate3d only, GPU composited */}
      <div
        ref={bgRef}
        style={{
          position:           "absolute",
          inset:              0,
          width:              "100%",
          height:             "130%",
          top:                "-15%",
          backgroundImage:    `url(${heroUpImg})`,
          backgroundSize:     "cover",
          backgroundPosition: "center center",
          backgroundRepeat:   "no-repeat",
          willChange:         "transform",
          transform:          "translate3d(0,0,0)",
        }}
      />

      {/* Dark radial vignette — pure CSS, zero GPU cost */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: "radial-gradient(ellipse 130% 110% at 50% 50%, rgba(15,13,10,0.18) 0%, rgba(15,13,10,0.62) 52%, rgba(8,7,5,0.94) 100%)",
      }} />

      {/* Top + bottom fade — navbar clearance & content blend */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: "linear-gradient(to bottom, rgba(8,7,5,0.70) 0%, transparent 20%, transparent 62%, rgba(8,7,5,0.86) 100%)",
      }} />

      {/* Warm left-edge tint */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: "linear-gradient(100deg, rgba(193,154,107,0.06) 0%, transparent 38%)",
      }} />

      {/* Ambient gold orb — opacity animation only (cheapest GPU path) */}
      <div
        style={{
          position:     "absolute",
          top:          "10%",
          left:         "-8%",
          width:        460,
          height:       460,
          borderRadius: "9999px",
          background:   "radial-gradient(circle, rgba(193,154,107,0.10) 0%, transparent 68%)",
          animation:    "orbPulseA 9s ease-in-out infinite",
          willChange:   "opacity",
        }}
      />
      <div
        style={{
          position:     "absolute",
          bottom:       "8%",
          right:        "-10%",
          width:        520,
          height:       520,
          borderRadius: "9999px",
          background:   "radial-gradient(circle, rgba(193,154,107,0.07) 0%, transparent 65%)",
          animation:    "orbPulseB 12s ease-in-out infinite",
          willChange:   "opacity",
        }}
      />

      {/* Fine grid texture — pure CSS background, zero paint cost */}
      <div style={{
        position:        "absolute",
        inset:           0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
        backgroundSize:  "72px 72px",
        maskImage:       "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
      }} />

      {/* Inline keyframes for the orbs — opacity-only, no transform jank */}
      <style>{`
        @keyframes orbPulseA { 0%,100%{opacity:.55} 50%{opacity:.9} }
        @keyframes orbPulseB { 0%,100%{opacity:.38} 50%{opacity:.72} }
        @media(prefers-reduced-motion:reduce){
          @keyframes orbPulseA{0%,100%{opacity:.55}}
          @keyframes orbPulseB{0%,100%{opacity:.38}}
        }
      `}</style>
    </div>
  )
}
