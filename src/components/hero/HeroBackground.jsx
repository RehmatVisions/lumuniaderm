import { useEffect, useRef } from "react"
import heroUpImg      from "../../assets/herotwo.jpg"
import mobileHeroImg  from "../../assets/mobile-heroimage.jpg"

export default function HeroBackground({ bgRef }) {
  const internalRef = useRef(null)
  const ref         = bgRef ?? internalRef
  const rafRef      = useRef(null)
  const tickingRef  = useRef(false)   // ref instead of let — no stale closure

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const mobile  = window.innerWidth < 768
    if (reduced || mobile) return

    const onScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true
      rafRef.current = requestAnimationFrame(() => {
        // Lower factor (0.18) = less distance to repaint per frame = smoother
        el.style.transform = `translate3d(0, ${window.scrollY * 0.18}px, 0)`
        tickingRef.current = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [ref])

  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", contain: "strict" }}>

      {/* ── Desktop parallax image — ref shared with GSAP for zoom-out ── */}
      <div
        ref={ref}
        className="hidden sm:block"
        style={{
          position:           "absolute",
          inset:              0,
          width:              "100%",
          height:             "150%",
          top:                "-25%",
          backgroundImage:    `url(${heroUpImg})`,
          backgroundSize:     "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat:   "no-repeat",
          willChange:         "transform",
          transform:          "translate3d(0,0,0)",
        }}
      />

      {/* ── Mobile hero image — static, portrait-optimised ── */}
      <div
        className="block sm:hidden"
        style={{
          position:           "absolute",
          inset:              0,
          backgroundImage:    `url(${mobileHeroImg})`,
          backgroundSize:     "cover",
          backgroundPosition: "center top",
          backgroundRepeat:   "no-repeat",
        }}
      />

      {/* ── Primary dark overlay — ensures text contrast on all screens ── */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.48) 55%, rgba(0,0,0,0.62) 100%)",
      }} />

      {/* ── Radial depth — darkens edges, keeps centre alive ── */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: "radial-gradient(ellipse 140% 110% at 50% 50%, rgba(8,6,4,0.08) 0%, rgba(8,6,4,0.42) 55%, rgba(5,4,2,0.85) 100%)",
      }} />

      {/* ── Directional fade — darker top & bottom for text readability ── */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: "linear-gradient(to bottom, rgba(5,4,2,0.55) 0%, transparent 28%, transparent 52%, rgba(5,4,2,0.90) 100%)",
      }} />

      {/* ── Warm left-edge tint ── */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: "linear-gradient(100deg, rgba(193,154,107,0.07) 0%, transparent 42%)",
      }} />

      {/* ── Mobile: stronger overall scrim so portrait photo doesn't fight text ── */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: "linear-gradient(to top, rgba(5,4,2,0.72) 0%, transparent 50%)",
      }} />

      {/* ── Ambient gold orb A ── */}
      <div style={{
        position:     "absolute",
        top:          "8%",
        left:         "-6%",
        width:        460,
        height:       460,
        borderRadius: "9999px",
        background:   "radial-gradient(circle, rgba(193,154,107,0.10) 0%, transparent 68%)",
        pointerEvents:"none",
      }} />

      {/* ── Ambient gold orb B ── */}
      <div style={{
        position:     "absolute",
        bottom:       "6%",
        right:        "-8%",
        width:        520,
        height:       520,
        borderRadius: "9999px",
        background:   "radial-gradient(circle, rgba(193,154,107,0.06) 0%, transparent 65%)",
        pointerEvents:"none",
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
    </div>
  )
}
