import { useEffect, useRef } from "react"
import heroUpImg from "../../assets/herotwo.jpg"

export default function HeroBackground() {
  const bgRef  = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const el = bgRef.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const mobile  = window.innerWidth < 768
    if (reduced || mobile) return

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      rafRef.current = requestAnimationFrame(() => {
        el.style.transform = `translate3d(0, ${window.scrollY * 0.28}px, 0)`
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

      {/* ── Parallax image ── */}
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
          backgroundPosition: "center 30%",
          backgroundRepeat:   "no-repeat",
          willChange:         "transform",
          transform:          "translate3d(0,0,0)",
        }}
      />

      {/* ── Dark base — subtle, NOT a whitening veil ── */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: "radial-gradient(ellipse 140% 110% at 50% 50%, rgba(8,6,4,0.10) 0%, rgba(8,6,4,0.52) 55%, rgba(5,4,2,0.88) 100%)",
      }} />

      {/* ── Directional fade — softer top, leaves image visible ── */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: "linear-gradient(to bottom, rgba(5,4,2,0.38) 0%, transparent 22%, transparent 58%, rgba(5,4,2,0.82) 100%)",
      }} />

      {/* ── Warm left-edge tint ── */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: "linear-gradient(100deg, rgba(193,154,107,0.07) 0%, transparent 42%)",
      }} />

      {/* ── Mobile: slightly stronger bottom fade to keep text readable ── */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: "linear-gradient(to top, rgba(5,4,2,0.55) 0%, transparent 45%)",
      }} />

      {/* ── Ambient gold orb A ── */}
      <div style={{
        position:     "absolute",
        top:          "8%",
        left:         "-6%",
        width:        460,
        height:       460,
        borderRadius: "9999px",
        background:   "radial-gradient(circle, rgba(193,154,107,0.11) 0%, transparent 68%)",
        animation:    "orbPulseA 9s ease-in-out infinite",
        willChange:   "opacity",
      }} />

      {/* ── Ambient gold orb B ── */}
      <div style={{
        position:     "absolute",
        bottom:       "6%",
        right:        "-8%",
        width:        520,
        height:       520,
        borderRadius: "9999px",
        background:   "radial-gradient(circle, rgba(193,154,107,0.07) 0%, transparent 65%)",
        animation:    "orbPulseB 12s ease-in-out infinite",
        willChange:   "opacity",
      }} />

      {/* ── Fine grid texture ── */}
      <div style={{
        position:        "absolute",
        inset:           0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)",
        backgroundSize:  "72px 72px",
        maskImage:       "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
      }} />

      <style>{`
        @keyframes orbPulseA { 0%,100%{opacity:.55} 50%{opacity:.90} }
        @keyframes orbPulseB { 0%,100%{opacity:.38} 50%{opacity:.72} }
        @media(prefers-reduced-motion:reduce){
          @keyframes orbPulseA{0%,100%{opacity:.55}}
          @keyframes orbPulseB{0%,100%{opacity:.38}}
        }
      `}</style>
    </div>
  )
}
