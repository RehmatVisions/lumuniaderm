import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { siteContent } from "../../data/siteContent"
import beforeImg    from "../../assets/hero-images/beforeherobackround.png"
import afterImg     from "../../assets/hero-images/afterherobackround.png"
import beforeMobImg from "../../assets/hero-images/mobilebefore.png"
import afterMobImg  from "../../assets/hero-images/mobileafter.png"
import logoImg      from "../../assets/novalogo.png"

// Standard easing curves used across all animations in this file
const EASE      = [0.25, 0.46, 0.45, 0.94]
const EASE_EXPO = [0.16, 1, 0.3, 1]

// Shared orchestration keeps the opening calm and cohesive instead of making
// every element feel like a separate animation.
const HERO_REVEAL = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.09,
    },
  },
}

const LUXURY_REVEAL = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE_EXPO },
  },
}

const SOFT_REVEAL = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_EXPO },
  },
}

/* ══════════════════════════════════════════════════════════
   BEFORE / AFTER BACKGROUND SLIDER  — rebuilt from scratch
   ─────────────────────────────────────────────────────────
   Strategy: Pointer Events API + setPointerCapture.
   • pointerdown  → capture pointer on the handle element
   • pointermove  → fires on the handle even when the finger
                    moves anywhere on screen (capture does this)
   • pointerup    → release capture, stop drag
   Pointer capture makes touch-move work exactly like mouse-
   drag with zero extra document listeners and no passive/
   active listener conflict. Works on iOS Safari ≥ 13,
   Android Chrome, and all desktop browsers.
══════════════════════════════════════════════════════════ */
function BackgroundSlider() {
  const containerRef = useRef(null)   // the full-bleed wrapper div
  const thumbRef     = useRef(null)   // the draggable handle element
  const activePtr    = useRef(null)   // pointerId being tracked, null when idle

  const [pct,    setPct]    = useState(50)   // divider position 0–100
  const [active, setActive] = useState(false) // true while dragging (for thumb animation)
  const [hinted, setHinted] = useState(false) // intro sweep played?
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  const reduceMotion = useReducedMotion()

  // Parallax on scroll
  const { scrollY } = useScroll()
  const rawPar  = useTransform(scrollY, [0, 800], [0, reduceMotion ? 0 : -72])
  const parallaxY = useSpring(rawPar, { stiffness: 80, damping: 20, mass: 0.5 })

  // Track mobile breakpoint
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const bgBefore = isMobile ? beforeMobImg : beforeImg
  const bgAfter  = isMobile ? afterMobImg  : afterImg

  // Convert clientX into a clamped 0–100 percentage inside the container
  const toPct = (clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return pct
    const raw = ((clientX - rect.left) / rect.width) * 100
    return Math.min(Math.max(raw, 1), 99)
  }

  // ── Pointer handlers — attached directly to the thumb via JSX ────────────
  // The key insight: we call thumb.setPointerCapture(e.pointerId) on pointerdown.
  // After capture, ALL pointermove / pointerup events for that pointer are
  // delivered to the thumb regardless of where the finger moves on screen.
  // This replaces every document-level listener hack from the old code.
  const onPointerDown = (e) => {
    // Capture this pointer to the thumb element
    e.currentTarget.setPointerCapture(e.pointerId)
    activePtr.current = e.pointerId
    setActive(true)
    setHinted(true)
    setPct(toPct(e.clientX))
  }

  const onPointerMove = (e) => {
    // Only process the captured pointer
    if (activePtr.current !== e.pointerId) return
    setPct(toPct(e.clientX))
  }

  const onPointerUp = (e) => {
    if (activePtr.current !== e.pointerId) return
    activePtr.current = null
    setActive(false)
    // Release is implicit when the pointer is captured, but explicit is cleaner
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  // Intro sweep — animates the handle left/right once on load
  useEffect(() => {
    if (hinted || reduceMotion) return
    const t = setTimeout(() => {
      const steps = [50, 40, 32, 42, 60, 68, 56, 50]
      let i = 0
      const tick = () => {
        if (i >= steps.length) return
        setPct(steps[i++])
        setTimeout(tick, 220)
      }
      tick()
    }, 1600)
    return () => clearTimeout(t)
  }, [hinted, reduceMotion])

  return (
    <motion.div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        // Extend slightly beyond section edges so parallax never shows gaps
        top: "-8%", bottom: "-8%", left: 0, right: 0,
        zIndex: 0,
        userSelect: "none",
        WebkitUserSelect: "none",
        // pan-y: the image area scrolls the page normally on mobile.
        // The thumb overrides this because setPointerCapture() suppresses
        // the browser's default scroll-gesture handling for that pointer.
        touchAction: "pan-y",
      }}
      initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: EASE_EXPO }}
    >

      {/* ── AFTER image (full width, behind the clip) ── */}
      <motion.img
        src={bgAfter}
        alt="" aria-hidden="true" draggable={false}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center top",
          pointerEvents: "none", userSelect: "none",
          y: parallaxY,
        }}
        loading="eager" decoding="async" fetchPriority="high"
      />

      {/* ── BEFORE image (clipped to left of divider) ── */}
      <div
        style={{
          position: "absolute", inset: 0,
          width: `${pct}%`,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <motion.img
          src={bgBefore}
          alt="" aria-hidden="true" draggable={false}
          style={{
            position: "absolute", inset: 0,
            // Fix pixel width so image doesn't stretch when container is clipped
            width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100vw",
            height: "100%",
            maxWidth: "none",
            objectFit: "cover", objectPosition: "center top",
            pointerEvents: "none", userSelect: "none",
            y: parallaxY,
          }}
          loading="eager" decoding="async" fetchPriority="high"
        />
      </div>

      {/* ── Divider line ── */}
      <div
        style={{
          position: "absolute", top: 0, bottom: 0,
          left: `${pct}%`,
          width: 2,
          transform: "translateX(-50%)",
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, transparent 2%, rgba(255,255,255,0.80) 10%, rgba(255,255,255,0.80) 90%, transparent 98%)",
        }}
      />

      {/* ── Thumb ─────────────────────────────────────────────────────────────
          Outer div: 80×80px invisible hit area — generous for fat fingers.
          Inner visual: 48×48 styled circle with chevron arrows.
          All pointer handlers live on the outer div.
          touch-action:none on the outer div tells the browser this element
          handles its own touch — combined with pointer capture this is the
          complete, correct solution. No passive hacks needed.
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        ref={thumbRef}
        data-handle="true"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          position: "absolute",
          top: "50%",
          left: `${pct}%`,
          width: 80,
          height: 80,
          transform: "translate(-50%, -50%)",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // touchAction:none — tells the browser this element owns its touch.
          // Combined with setPointerCapture this fully suppresses scroll-gesture
          // hijacking on Android Chrome and iOS Safari.
          touchAction: "none",
          cursor: active ? "grabbing" : "ew-resize",
          WebkitTouchCallout: "none",
          // will-change keeps this element on a composited GPU layer.
          // The index.css mobile rule strips will-change from all elements
          // EXCEPT [data-handle], so this hint survives on mobile.
          willChange: "transform",
        }}
      >
        {/* Visual circle */}
        <motion.div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            // Glassmorphism style: dark tinted with frosted ring
            background: active
              ? "rgba(196,97,74,0.92)"
              : "rgba(15,8,4,0.78)",
            border: active
              ? "2px solid rgba(255,255,255,0.55)"
              : "2px solid rgba(255,255,255,0.28)",
            boxShadow: active
              ? "0 0 0 6px rgba(196,97,74,0.22), 0 6px 28px rgba(0,0,0,0.55)"
              : "0 4px 24px rgba(0,0,0,0.50)",
            pointerEvents: "none",  // parent div owns all events
            transition: "background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease",
          }}
          animate={{ scale: active ? 1.14 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
          {/* Pulse ring — visible only when idle */}
          {!active && !reduceMotion && (
            <motion.div
              style={{
                position: "absolute", inset: -2,
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.35)",
                pointerEvents: "none",
              }}
              animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          {/* Left-right chevron icon */}
          <svg
            viewBox="0 0 24 24" fill="none"
            width={20} height={20}
            stroke="white" strokeWidth="2.4"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <path d="M9 18l-6-6 6-6" />
            <path d="M15 6l6 6-6 6" />
          </svg>
        </motion.div>
      </div>

      {/* ── BEFORE label (bottom-left) ── */}
      <div
        style={{
          position: "absolute", left: 18, bottom: 28,
          display: "flex", alignItems: "center", gap: 6,
          padding: "5px 12px",
          borderRadius: 99,
          background: "rgba(15,8,4,0.55)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          pointerEvents: "none",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.55)", flexShrink: 0 }} />
        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.80)" }}>
          Before
        </span>
      </div>

      {/* ── AFTER label (bottom-right) ── */}
      <div
        style={{
          position: "absolute", right: 18, bottom: 28,
          display: "flex", alignItems: "center", gap: 6,
          padding: "5px 12px",
          borderRadius: 99,
          background: "rgba(196,97,74,0.82)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          pointerEvents: "none",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.85)", flexShrink: 0 }} />
        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "white" }}>
          After
        </span>
      </div>

    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════
   NAVBAR
   Single component handles both desktop and mobile layouts.
   Desktop: horizontal links + CTA + Instagram icon
   Mobile:  hamburger button + slide-down menu
══════════════════════════════════════════════════════════ */

// A single nav link — highlights when active, optional chevron for dropdowns
function NavLink({ label, href, active }) {
  return (
    <a
      href={href}
className="relative flex items-center gap-0.5 text-[13px] font-semibold transition-colors duration-200 hover:text-[#C4614A]"
      style={{ color: active ? "#C4614A" : "#5a3e32", letterSpacing: "0.01em" }}
    >
      {label}
      {/* Active underline indicator */}
      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full" style={{ background: "#C4614A" }} />
      )}
    </a>
  )
}

function Navbar() {
  const { nav } = siteContent
  const instagramHref = siteContent.topBar?.social?.find(s => s.icon === "instagram")?.href || "#"
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      style={{ position: "relative", zIndex: 50 }}
      initial={reduceMotion ? false : { opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.12, ease: EASE_EXPO }}
    >

      {/* ── Desktop + tablet nav bar ── */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">

        {/* Logo */}
        <a href="#" aria-label="Novaderm home" className="flex items-center shrink-0">
          <img
            src={logoImg}
            alt="Novaderm"
            draggable={false}
            className="select-none"
 style={{ height: "clamp(72px,10vw,110px)", width: "auto", objectFit: "contain" }}
            loading="eager"
            decoding="async"
          />
        </a>

        {/* Desktop nav links — hidden on mobile */}
        <div className="hidden items-center gap-7 lg:flex">
          {nav.links.map((link) => (
            <NavLink key={link.label} label={link.label} href={link.href} active={link.label === "Home"} />
          ))}
        </div>

        {/* Desktop CTA + Instagram icon — hidden on mobile */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.a
            href={nav.ctaHref}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-wide text-white"
            style={{ background: "linear-gradient(135deg,#C4614A,#a0432e)", boxShadow: "0 4px 16px rgba(196,97,74,0.35)" }}
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.025, boxShadow: "0 8px 24px rgba(196,97,74,0.42)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 360, damping: 24 }}
          >
            {nav.ctaText}
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </motion.a>

          {/* Instagram icon link */}
         
        </div>

        {/* Mobile hamburger button — visible only on mobile */}
        <button
          className="flex flex-col gap-1.5 p-2 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-0.5 w-5 rounded-full"
              style={{ background: "#3d2e24" }}
              animate={
                menuOpen
                  ? i === 0 ? { rotate: 45, y: 8 }
                  : i === 1 ? { opacity: 0 }
                  : { rotate: -45, y: -8 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.22 }}
            />
          ))}
        </button>
      </div>

      {/* ── Mobile slide-down menu ── */}
      <motion.div
        className="overflow-hidden lg:hidden"
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: EASE }}
        style={{ background: "rgba(244,239,234,0.96)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex flex-col gap-1 px-6 pb-5 pt-2">
          {nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="py-2 text-[14px] font-semibold border-b"
              style={{ color: link.label === "Home" ? "#C4614A" : "#3d2e24", borderColor: "rgba(61,46,36,0.08)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={nav.ctaHref}
            className="mt-3 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-wide text-white"
            style={{ background: "linear-gradient(135deg,#C4614A,#a0432e)" }}
            onClick={() => setMenuOpen(false)}
          >
            {nav.ctaText}
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════
   BOTANICAL LEAF — decorative SVG on the left side of hero
══════════════════════════════════════════════════════════ */
function BotanicalLeaf() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.svg
      viewBox="0 0 180 420"
      aria-hidden="true"
      className="pointer-events-none select-none absolute"
      style={{ left: -20, top: "18%", width: "clamp(80px,11vw,155px)", opacity: 0.22, zIndex: 2 }}
      initial={reduceMotion ? false : { opacity: 0, x: -20 }}
      animate={{ opacity: 0.22, x: 0 }}
      transition={{ duration: 1.1, delay: 0.5, ease: EASE_EXPO }}
    >
      {/* Main stem */}
      <path d="M90 400 Q86 300 82 210 Q78 120 90 30" stroke="#C4614A" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      {/* Leaf pairs — one left, one right at each height */}
      {[320, 262, 204, 150].map((y, i) => (
        <g key={i}>
          <path d={`M${88-i} ${y} Q${52-i*2} ${y-20} ${38-i*2} ${y-60} Q${62} ${y-52} ${88-i} ${y-40}`}
            stroke="#C4614A" strokeWidth="1.1" fill="rgba(196,97,74,0.10)" strokeLinecap="round"/>
          <path d={`M${92+i} ${y-10} Q${128+i*2} ${y-28} ${142+i*2} ${y-68} Q${118} ${y-58} ${92+i} ${y-48}`}
            stroke="#C4614A" strokeWidth="1.1" fill="rgba(196,97,74,0.07)" strokeLinecap="round"/>
        </g>
      ))}
    </motion.svg>
  )
}

/* ══════════════════════════════════════════════════════════
   STATS BAR — 4 animated counters shown below the headline
══════════════════════════════════════════════════════════ */

// Static list of stats shown in the hero
const STATS = [
  { icon: "patients", target: 3500, suffix: "+", label: "Happy Patients",   decimals: 0 },
  { icon: "years",    target: 12,   suffix: "+", label: "Years Experience", decimals: 0 },
  { icon: "star",     target: 4.9,  suffix: "★", label: "Avg. Rating",      decimals: 1 },
  { icon: "shield",   target: 98,   suffix: "%", label: "Success Rate",     decimals: 0 },
]

// SVG icons for each stat type
const STAT_ICONS = {
  patients: (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  years: (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" strokeLinecap="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        stroke="#C4614A" strokeWidth="1.7" fill="rgba(196,97,74,0.1)"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
}

// Animates a number from 0 to `target` over ~1.1 seconds using requestAnimationFrame
function CountUp({ target, suffix, decimals = 0, delay = 0, reduceMotion = false }) {
  const [displayValue, setDisplayValue] = useState("0")
  const rafRef = useRef(null)

  useEffect(() => {
    if (reduceMotion) {
      setDisplayValue(decimals > 0 ? target.toFixed(decimals) : target.toLocaleString())
      return undefined
    }

    const startTimer = setTimeout(() => {
      const duration  = 1100
      const startTime = performance.now()

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1)
        // Ease-out curve: starts fast, slows at the end
        const eased = 1 - Math.pow(1 - progress, 4)
        const current = eased * target

        if (decimals > 0) {
          setDisplayValue(current.toFixed(decimals))
        } else {
          setDisplayValue(Math.floor(current).toLocaleString())
        }

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          // Snap to exact final value
          setDisplayValue(decimals > 0 ? target.toFixed(decimals) : target.toLocaleString())
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(startTimer)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, decimals, delay, reduceMotion])

  return <>{displayValue}{suffix}</>
}

/* ══════════════════════════════════════════════════════════
   MAIN HERO SECTION
══════════════════════════════════════════════════════════ */
export default function Hero() {
  const slide = siteContent.hero.slides[0]
  const heroRef = useRef(null)
  const reduceMotion = useReducedMotion()

  // Parallax + fade for the text content layer as user scrolls
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const rawContentY    = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -34])
  const contentY       = useSpring(rawContentY, { stiffness: 90, damping: 22, mass: 0.4 })
  const contentOpacity = useTransform(scrollYProgress, [0, 0.82], [1, reduceMotion ? 1 : 0.18])

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        position: "relative",
        // No overflow:hidden — that causes iOS Safari to steal touchmove
        // from child elements and route it to the section scroll handler.
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        // Explicitly allow vertical scroll on the section itself.
        // The thumb overrides this for its own pointer via setPointerCapture.
        touchAction: "pan-y",
      }}
    >
      {/* Layer 0 — full-screen before/after drag slider (behind everything) */}
      <BackgroundSlider />

      {/* Layer 2 — decorative botanical leaf on the left edge */}
      <BotanicalLeaf />

      {/* Layer 10 — navbar + text content (sits on top of the slider) */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", flex: 1, pointerEvents: "none" }}>

        {/* Navbar — re-enable pointer events so clicks work */}
        <div style={{ pointerEvents: "auto" }}>
          <Navbar />
        </div>

        {/* Hero text content — scrolls upward slightly with parallax */}
        <motion.div
          className="flex items-start md:items-center mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10"
          style={{
            flex: 1,
            paddingTop: "clamp(20px, 5vw, 80px)",
            
            paddingBottom: "clamp(32px, 5vw, 80px)",
            y: contentY,
            opacity: contentOpacity,
          }}
          variants={HERO_REVEAL}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
        >
          <div
            className="flex flex-col justify-start md:justify-center"
            style={{ maxWidth: 500, pointerEvents: "auto" }}
          >
            {/* Badge — small label above the headline */}
            <motion.span
              className="mb-3 inline-flex items-center gap-2"
              style={{ fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#a07060" }}
              variants={SOFT_REVEAL}
            >
              <span className="inline-block h-px w-5" style={{ background: "rgba(160,112,96,0.5)" }} />
              {slide.badge}
            </motion.span>

            {/* Headline — split on "." so each sentence gets its own line */}
            <motion.h1
              style={{ lineHeight: 1.08, letterSpacing: "-0.02em", margin: 0 }}
              variants={HERO_REVEAL}
            >
              {slide.headline.split(/\.\s*/).filter(Boolean).map((part, i) => (
                <span
                  key={i}
                  className="font-serif block"
                  style={{
                    overflow: "hidden",
                    fontSize: "clamp(1.7rem,4.2vw,3.1rem)",
                    color: i === 0 ? "#C4614A" : "#2e1f16",
                    fontWeight: 700,
                    fontStyle: i === 0 ? "italic" : "normal",
                  }}
                >
                  <motion.span
                    className="block"
                    variants={LUXURY_REVEAL}
                    style={{ willChange: "transform, opacity, filter" }}
                  >
                    {part}.
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            {/* Description paragraph */}
            <motion.p
              className="font-sans"
              style={{
                fontSize: "clamp(0.8rem,1.1vw,0.93rem)",
                color: "#7a5a4a",
                lineHeight: 1.72,
                maxWidth: 370,
                fontWeight: 400,
                marginTop: "clamp(10px,1.5vw,16px)",
              }}
              variants={SOFT_REVEAL}
            >
              {slide.description}
            </motion.p>

            {/* CTA buttons — primary (filled) + secondary (outlined) */}
            <motion.div
              className="flex flex-wrap items-center gap-3"
              style={{ marginTop: "clamp(18px,2.5vw,28px)" }}
              variants={SOFT_REVEAL}
            >
              <motion.a
                href={slide.primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-full text-white font-bold uppercase"
                style={{
                  padding: "clamp(9px,1.2vw,12px) clamp(18px,2.5vw,24px)",
                  fontSize: "clamp(0.68rem,0.85vw,0.75rem)",
                  letterSpacing: "0.07em",
                  background: "linear-gradient(135deg,#C4614A,#9a3d2a)",
                  boxShadow: "0 4px 18px rgba(196,97,74,0.42)",
                }}
                whileHover={reduceMotion ? undefined : { y: -2, scale: 1.025, boxShadow: "0 9px 28px rgba(196,97,74,0.52)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 360, damping: 24 }}
              >
                {slide.primaryCta.text}
                <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </motion.a>

              <motion.a
                href={slide.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full font-semibold"
                style={{
                  padding: "clamp(9px,1.2vw,12px) clamp(16px,2vw,20px)",
                  fontSize: "clamp(0.68rem,0.85vw,0.75rem)",
                  color: "#7a4a38",
                  background: "rgba(255,255,255,0.65)",
                  border: "1.5px solid rgba(196,97,74,0.4)",
                }}
                whileHover={reduceMotion ? undefined : { y: -2, scale: 1.018, borderColor: "#C4614A", color: "#C4614A", background: "rgba(255,255,255,0.88)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 360, damping: 24 }}
              >
                {slide.secondaryCta.text}
              </motion.a>
            </motion.div>

            {/* Stats row — animated counters */}
            <motion.div
              className="grid grid-cols-2 gap-x-4 gap-y-3 md:flex md:flex-wrap md:gap-6"
              style={{ marginTop: "clamp(20px,3vw,36px)" }}
              variants={HERO_REVEAL}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.icon}
                  className="flex items-center gap-2"
                  variants={SOFT_REVEAL}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                >
                  {/* Icon box */}
                  <div
                    className="flex shrink-0 items-center justify-center rounded-lg"
                    style={{ width: 30, height: 30, background: "rgba(255,255,255,0.60)" }}
                  >
                    {STAT_ICONS[stat.icon]}
                  </div>
                  {/* Number + label */}
                  <div className="flex flex-col leading-none gap-0.5">
                    <span
                      className="font-serif font-bold tabular-nums"
                      style={{ fontSize: "clamp(0.92rem,1.4vw,1.1rem)", color: "#2e1f16", letterSpacing: "-0.01em",
                        textShadow: "0 0 6px #fff, 0 0 12px #fff, 0 1px 4px rgba(255,255,255,0.95)" }}
                    >
                      <CountUp
                        target={stat.target}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                        delay={700 + i * 80}
                        reduceMotion={reduceMotion}
                      />
                    </span>
                    <span style={{ fontSize: "0.62rem", fontWeight: 900, letterSpacing: "0.13em", textTransform: "uppercase", color: "#2C1A14",
                      textShadow: "0 0 6px #fff, 0 0 12px #fff, 0 1px 4px rgba(255,255,255,0.95)" }}>
                      {stat.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}