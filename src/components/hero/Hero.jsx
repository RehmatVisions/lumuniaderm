import {
  motion,
  useMotionValue,
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
   BEFORE / AFTER BACKGROUND SLIDER
   ───────────────────────────────────────────────────────
   DESKTOP  – pointer capture drag on the full container.
              Grab anywhere on the image and slide.
   MOBILE   – zero drag, zero scroll conflict.
              A tap-toggle pill button at bottom-center
              switches between Before and After with a
              spring-animated wipe. onClick only.
══════════════════════════════════════════════════════════ */
function BackgroundSlider() {
  const containerRef = useRef(null)
  const capturedPtr  = useRef(null)   // active pointerId during desktop drag

  // Desktop: free 0-100 position. Mobile: snaps to 5 (After) or 95 (Before).
  const [pct,       setPct]       = useState(50)
  const [showAfter, setShowAfter] = useState(true)   // mobile toggle state
  const [dragging,  setDragging]  = useState(false)
  const [hinted,    setHinted]    = useState(false)
  const [isMobile,  setIsMobile]  = useState(() => window.innerWidth < 768)
  const reduceMotion = useReducedMotion()

  // Parallax
  const { scrollY } = useScroll()
  const rawPar    = useTransform(scrollY, [0, 800], [0, reduceMotion ? 0 : -72])
  const parallaxY = useSpring(rawPar, { stiffness: 80, damping: 20, mass: 0.5 })

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const bgBefore = isMobile ? beforeMobImg : beforeImg
  const bgAfter  = isMobile ? afterMobImg  : afterImg

  // Motion value drives the spring — declared before the useEffect that uses it
  const dividerMV     = useMotionValue(50)
  const dividerSpring = useSpring(dividerMV, { stiffness: 260, damping: 28, mass: 0.6 })
  const dividerLeft   = useTransform(dividerSpring, v => `${v}%`)

  // Sync motion value whenever state changes.
  // During drag, jump() bypasses the spring (instant tracking).
  // On mobile toggle, set() lets the spring animate smoothly.
  useEffect(() => {
    const target = isMobile ? (showAfter ? 5 : 95) : pct
    if (dragging) { dividerMV.jump(target) } else { dividerMV.set(target) }
  }, [pct, isMobile, showAfter, dragging]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Desktop drag helpers ──────────────────────────────────────────────────
  const clientXtoPct = (clientX) => {
    const r = containerRef.current?.getBoundingClientRect()
    if (!r || r.width === 0) return pct
    return Math.min(Math.max(((clientX - r.left) / r.width) * 100, 1), 99)
  }

  const onPtrDown = (e) => {
    if (isMobile) return
    e.currentTarget.setPointerCapture(e.pointerId)
    capturedPtr.current = e.pointerId
    setDragging(true)
    setHinted(true)
    setPct(clientXtoPct(e.clientX))
  }
  const onPtrMove = (e) => {
    if (capturedPtr.current !== e.pointerId) return
    setPct(clientXtoPct(e.clientX))
  }
  const onPtrUp = (e) => {
    if (capturedPtr.current !== e.pointerId) return
    capturedPtr.current = null
    setDragging(false)
    e.currentTarget.releasePointerCapture?.(e.pointerId)
  }

  // Desktop intro sweep
  useEffect(() => {
    if (isMobile || hinted || reduceMotion) return
    const t = setTimeout(() => {
      const steps = [50, 38, 28, 40, 62, 72, 58, 50]
      let i = 0
      const tick = () => {
        if (i < steps.length) { setPct(steps[i++]); setTimeout(tick, 210) }
      }
      tick()
    }, 1500)
    return () => clearTimeout(t)
  }, [isMobile, hinted, reduceMotion]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* ── Image layer ───────────────────────────────────────────────────── */}
      <motion.div
        ref={containerRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-8%", bottom: "-8%", left: 0, right: 0,
          zIndex: 0,
          userSelect: "none", WebkitUserSelect: "none",
          // Desktop: none so the whole container is draggable.
          // Mobile: pan-y so vertical scroll works freely; the button
          //         is onClick-only so it never conflicts with scroll.
          touchAction: isMobile ? "pan-y" : "none",
          cursor: isMobile ? "default" : (dragging ? "grabbing" : "ew-resize"),
        }}
        onPointerDown={onPtrDown}
        onPointerMove={onPtrMove}
        onPointerUp={onPtrUp}
        onPointerCancel={onPtrUp}
        initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE_EXPO }}
      >
        {/* AFTER — base layer, always full width */}
        <motion.img
          src={bgAfter} alt="" aria-hidden="true" draggable={false}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center top",
            pointerEvents: "none", userSelect: "none",
            y: parallaxY,
          }}
          loading="eager" decoding="async" fetchPriority="high"
        />

        {/* BEFORE — clipped to dividerLeft width, spring-animated */}
        <motion.div
          style={{
            position: "absolute", inset: 0,
            overflow: "hidden", pointerEvents: "none",
            width: dividerLeft,
          }}
        >
          <div style={{
            position: "absolute", inset: 0,
            width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100vw",
            overflow: "hidden",
          }}>
            <motion.img
              src={bgBefore} alt="" aria-hidden="true" draggable={false}
              style={{
                position: "absolute", inset: 0,
                width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100vw",
                height: "100%", maxWidth: "none",
                objectFit: "cover", objectPosition: "center top",
                pointerEvents: "none", userSelect: "none",
                y: parallaxY,
              }}
              loading="eager" decoding="async" fetchPriority="high"
            />
          </div>
        </motion.div>

        {/* Divider line — desktop only */}
        {!isMobile && (
          <motion.div
            style={{
              position: "absolute", top: 0, bottom: 0,
              left: dividerLeft,
              x: "-50%",
              width: 2,
              pointerEvents: "none",
              background: "linear-gradient(to bottom,transparent 2%,rgba(255,255,255,0.85) 10%,rgba(255,255,255,0.85) 90%,transparent 98%)",
            }}
          />
        )}

        {/* Desktop drag handle */}
        {!isMobile && (
          <motion.div
            data-handle="true"
            style={{
              position: "absolute",
              top: "50%", left: dividerLeft,
              width: 72, height: 72,
              x: "-50%", y: "-50%",
              zIndex: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <motion.div
              style={{
                width: 48, height: 48, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
                background: dragging ? "rgba(196,97,74,0.92)" : "rgba(12,6,2,0.80)",
                border: dragging ? "2px solid rgba(255,255,255,0.6)" : "2px solid rgba(255,255,255,0.30)",
                boxShadow: dragging
                  ? "0 0 0 7px rgba(196,97,74,0.20),0 8px 32px rgba(0,0,0,0.6)"
                  : "0 4px 22px rgba(0,0,0,0.55)",
                transition: "background .18s,border-color .18s,box-shadow .18s",
              }}
              animate={{ scale: dragging ? 1.15 : 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 26 }}
            >
              {!dragging && !reduceMotion && (
                <motion.div
                  style={{
                    position: "absolute", inset: -3, borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.32)",
                    pointerEvents: "none",
                  }}
                  animate={{ scale: [1, 1.75], opacity: [0.55, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <svg viewBox="0 0 24 24" fill="none" width={20} height={20}
                stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l-6-6 6-6"/><path d="M15 6l6 6-6 6"/>
              </svg>
            </motion.div>
          </motion.div>
        )}

        {/* Desktop corner labels */}
        {!isMobile && (
          <>
            <div style={{
              position: "absolute", left: 18, bottom: 28,
              display: "flex", alignItems: "center", gap: 6,
              padding: "5px 12px", borderRadius: 99,
              background: "rgba(10,5,2,0.55)", pointerEvents: "none",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.5)" }} />
              <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.78)" }}>Before</span>
            </div>
            <div style={{
              position: "absolute", right: 18, bottom: 28,
              display: "flex", alignItems: "center", gap: 6,
              padding: "5px 12px", borderRadius: 99,
              background: "rgba(196,97,74,0.82)", pointerEvents: "none",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.85)" }} />
              <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "white" }}>After</span>
            </div>
          </>
        )}
      </motion.div>

      {/* ── Mobile tap-toggle button ───────────────────────────────────────
          Positioned just above the hero bottom edge.
          Pure onClick — absolutely no touch drag events attached.
          touchAction:"manipulation" removes the 300ms tap delay without
          enabling any gesture that could conflict with page scroll.
      ─────────────────────────────────────────────────────────────────── */}
      {isMobile && (
        <button
          onClick={() => setShowAfter(v => !v)}
          aria-label={showAfter ? "Show Before" : "Show After"}
          style={{
            position: "absolute",
            bottom: 32, left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            display: "flex", alignItems: "center", gap: 10,
            padding: "9px 18px",
            borderRadius: 99,
            border: "1.5px solid rgba(255,255,255,0.28)",
            background: "rgba(8,4,1,0.60)",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
            touchAction: "manipulation",
            outline: "none",
          }}
        >
          {/* "Before" label */}
          <span style={{
            fontSize: 10, fontWeight: 800, letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: !showAfter ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.38)",
            transition: "color 0.28s",
          }}>Before</span>

          {/* Toggle pill track */}
          <span style={{
            position: "relative", width: 40, height: 22,
            borderRadius: 99, flexShrink: 0,
            background: showAfter ? "rgba(196,97,74,0.88)" : "rgba(255,255,255,0.22)",
            transition: "background 0.28s",
            display: "flex", alignItems: "center",
          }}>
            <motion.span
              style={{
                position: "absolute",
                width: 16, height: 16,
                borderRadius: "50%",
                background: "white",
                boxShadow: "0 1px 5px rgba(0,0,0,0.45)",
                top: 3,
              }}
              animate={{ left: showAfter ? 21 : 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </span>

          {/* "After" label */}
          <span style={{
            fontSize: 10, fontWeight: 800, letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: showAfter ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.38)",
            transition: "color 0.28s",
          }}>After</span>
        </button>
      )}
    </>
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
              style={{ background: "#c4614a" }}
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