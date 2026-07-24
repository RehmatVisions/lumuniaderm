import { useEffect, useRef } from "react"

/**
 * CustomCursor — Performance-optimised
 * • Hidden entirely on touch/coarse-pointer devices (CSS handles this too)
 * • Single RAF loop; dot is instant DOM-direct, ring lerped, glow very lazy
 * • No React re-renders — everything is direct style mutation
 * • Glow blob is simplified: opacity-only animation, no filter on mobile
 */
export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    // Bail out completely on touch/coarse devices
    if (window.matchMedia("(pointer: coarse)").matches) return
    // Bail on prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    const glow = glowRef.current
    if (!dot || !ring || !glow) return

    let raf = null
    let mx = -300, my = -300
    let rx = -300, ry = -300
    let gx = -300, gy = -300

    const RING_LERP = 0.16
    const GLOW_LERP = 0.055

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      // Dot: instant — translate3d forces GPU layer
      dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`
    }

    const onEnter = (e) => {
      if (e.target.closest("a, button, [data-cursor]")) {
        ring.classList.add("cursor-hovered")
        dot.classList.add("cursor-dot-hovered")
        glow.style.opacity = "0.5"
        glow.style.width   = "100px"
        glow.style.height  = "100px"
      }
    }
    const onLeave = (e) => {
      if (e.target.closest("a, button, [data-cursor]")) {
        ring.classList.remove("cursor-hovered")
        dot.classList.remove("cursor-dot-hovered")
        glow.style.opacity = "0.22"
        glow.style.width   = "60px"
        glow.style.height  = "60px"
      }
    }
    const onDown = () => {
      ring.classList.add("cursor-clicked")
      dot.classList.add("cursor-dot-clicked")
    }
    const onUp = () => {
      ring.classList.remove("cursor-clicked")
      dot.classList.remove("cursor-dot-clicked")
    }
    const hide = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; glow.style.opacity = "0" }
    const show = () => { dot.style.opacity = "1"; ring.style.opacity = "1"; glow.style.opacity = "0.22" }

    const tick = () => {
      rx += (mx - rx) * RING_LERP
      ry += (my - ry) * RING_LERP
      ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`

      gx += (mx - gx) * GLOW_LERP
      gy += (my - gy) * GLOW_LERP
      glow.style.transform = `translate3d(${gx - 30}px, ${gy - 30}px, 0)`

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener("mousemove",  onMove,  { passive: true })
    window.addEventListener("mousedown",  onDown,  { passive: true })
    window.addEventListener("mouseup",    onUp,    { passive: true })
    document.addEventListener("mouseover",  onEnter, { passive: true })
    document.addEventListener("mouseout",   onLeave, { passive: true })
    document.documentElement.addEventListener("mouseleave", hide)
    document.documentElement.addEventListener("mouseenter", show)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove",  onMove)
      window.removeEventListener("mousedown",  onDown)
      window.removeEventListener("mouseup",    onUp)
      document.removeEventListener("mouseover",  onEnter)
      document.removeEventListener("mouseout",   onLeave)
      document.documentElement.removeEventListener("mouseleave", hide)
      document.documentElement.removeEventListener("mouseenter", show)
    }
  }, [])

  return (
    <>
      {/* Glow — opacity-only animation, no blur on mobile (CSS overrides) */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         60,
          height:        60,
          borderRadius:  "9999px",
          background:    "radial-gradient(circle, rgba(193,154,107,0.50) 0%, rgba(193,154,107,0) 70%)",
          pointerEvents: "none",
          zIndex:        9996,
          opacity:       0.22,
          willChange:    "transform",
          filter:        "blur(12px)",
          transition:    "width 0.35s ease, height 0.35s ease, opacity 0.35s ease",
          transform:     "translate3d(-300px,-300px,0)",
        }}
      />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
    </>
  )
}
