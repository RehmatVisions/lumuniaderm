import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback, useRef } from "react"
import HeroBackground from "./HeroBackground"
import HeroPageReveal from "./HeroPageReveal"
import BeforeAfterSlider from "./BeforeAfterSlider"
import { siteContent } from "../../data/siteContent"
import { useReducedMotion } from "../../hooks/usePerf"

const EASE        = [0.25, 0.46, 0.45, 0.94]
const EASE_EXPO   = [0.16, 1,    0.3,  1   ]
const EASE_SPRING = [0.34, 1.4,  0.64, 1   ]

/* ── Slide variants ── */
const slideV = {
  enter:  (d) => ({ x: d > 0 ? "4%" : "-4%", opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: EASE } },
  exit:   (d) => ({ x: d > 0 ? "-4%" : "4%", opacity: 0, transition: { duration: 0.28, ease: EASE } }),
}

/* ── Floating badge ── */
function Badge({ text }) {
  return (
    <motion.div
      className="mb-5 inline-flex"
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: EASE }}
    >
      <span className="inline-flex items-center gap-2.5 rounded-full border px-5 py-2 text-[11px] font-bold uppercase tracking-[0.20em]"
        style={{ borderColor: "rgba(193,154,107,0.38)", background: "rgba(193,154,107,0.08)", color: "#C69459" }}>
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-65" style={{ background: "#C69459" }} />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "#C69459" }} />
        </span>
        {text}
      </span>
    </motion.div>
  )
}

/* ── Gold CTA ── */
function CTAButton({ text, href }) {
  return (
    <motion.a href={href}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.10em] text-white sm:px-6 sm:py-3 sm:text-xs"
      style={{ background: "linear-gradient(135deg, #C69459 0%, #a8825a 100%)" }}
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: 0.3, ease: EASE_SPRING }}
      whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(198,148,89,0.45)" }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/16"
        whileHover={{ translateX: "200%" }} transition={{ duration: 0.48 }} />
      {text}
      <svg className="h-3 w-3 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
      </svg>
    </motion.a>
  )
}

/* ── Ghost CTA ── */
function GhostButton({ text, href }) {
  return (
    <motion.a href={href}
      className="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.10em] text-white/70 hover:text-white sm:px-5 sm:text-xs"
      style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.04)" }}
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: 0.4, ease: EASE_SPRING }}
      whileHover={{ scale: 1.03, borderColor: "rgba(193,154,107,0.55)", background: "rgba(193,154,107,0.08)" }}
      whileTap={{ scale: 0.97 }}
    >
      {text}
    </motion.a>
  )
}

/* ── Stats strip with hover lift ── */
const STATS = [
  { target: 3500, suffix: "+",  label: "Happy Patients"  },
  { target: 12,   suffix: "+",  label: "Years Experience" },
  { target: 4.9,  suffix: "★",  label: "Avg. Rating",  decimals: 1 },
  { target: 98,   suffix: "%",  label: "Success Rate"      },
]

function CountUpStat({ target, suffix, decimals = 0, delay = 0 }) {
  const [display, setDisplay] = useState("0")
  const rafRef  = useRef(null)

  useEffect(() => {
    // small delay so animation fires after the strip fades in
    const timeout = setTimeout(() => {
      const duration = 1200          // ms — fast but readable
      const startTs  = performance.now()

      const tick = (now) => {
        const elapsed  = now - startTs
        const progress = Math.min(elapsed / duration, 1)
        // ease-out-expo feel
        const eased    = 1 - Math.pow(1 - progress, 4)
        const current  = eased * target

        if (decimals > 0) {
          setDisplay(current.toFixed(decimals))
        } else {
          // show comma-formatted integers
          setDisplay(Math.floor(current).toLocaleString())
        }

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          // snap to exact final value
          setDisplay(decimals > 0 ? target.toFixed(decimals) : target.toLocaleString())
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, decimals, delay])

  return (
    <span>
      {display}{suffix}
    </span>
  )
}

function StatsStrip() {
  return (
    <motion.div className="mt-6 flex flex-wrap gap-5 sm:gap-8"
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.62, ease: EASE }}>
      {STATS.map((s, i) => (
        <motion.div key={i} className="flex flex-col gap-1" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
          <span
            style={{
              fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
              fontSize: "1.35rem",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#c19a6b",
              filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.85))",
            }}
          >
            <CountUpStat
              target={s.target}
              suffix={s.suffix}
              decimals={s.decimals}
              delay={700 + i * 80}
            />
          </span>
          <span
            style={{
              fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
              fontSize: "0.62rem",
              fontWeight: 600,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.82)",
              textShadow: "0 1px 3px rgba(0,0,0,0.8)",
            }}
          >
            {s.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}

/* ── Slide dots ── */
function SlideDots({ count, current, onSelect }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <motion.button key={i} onClick={() => onSelect(i)} aria-label={`Slide ${i + 1}`}>
          <motion.span className="block rounded-full"
            animate={{ width: i === current ? 28 : 8, height: 8, background: i === current ? "#C69459" : "rgba(255,255,255,0.25)" }}
            transition={{ duration: 0.3, ease: EASE }} />
        </motion.button>
      ))}
    </div>
  )
}

/* ── Arrow ── */
function NavArrow({ dir, onClick }) {
  return (
    <motion.button onClick={onClick} aria-label={dir}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/55 hover:border-novaderm-gold/55 hover:bg-novaderm-gold/12 hover:text-white"
      whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}>
      <svg viewBox="0 0 20 20" fill="currentColor" className={`h-4 w-4 ${dir === "prev" ? "rotate-180" : ""}`}>
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
      </svg>
    </motion.button>
  )
}

/* ── Scroll cue ── */
function ScrollCue() {
  return (
    <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }}>
      <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-white/60">Scroll</span>
      <motion.div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/18 pt-1.5"
        animate={{ y: [0, 5, 0] }} transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}>
        <div className="h-2 w-0.5 rounded-full bg-novaderm-gold" />
      </motion.div>
    </motion.div>
  )
}

/* ── Before/After wrapper ── */
function BeforeAfterCard({ mobile = false }) {
  return (
    <div style={{
      borderRadius: 26, padding: 1.5,
      background: "linear-gradient(145deg, rgba(198,148,89,0.55) 0%, rgba(255,255,255,0.04) 50%, rgba(198,148,89,0.22) 100%)",
      boxShadow: "0 0 60px rgba(198,148,89,0.12), 0 28px 64px rgba(0,0,0,0.50)",
      maxWidth: mobile ? 420 : "none", margin: mobile ? "0 auto" : 0,
    }}>
      <div style={{ borderRadius: 24.5, padding: mobile ? 8 : 14, background: "rgba(22,19,14,0.92)" }}>
        <BeforeAfterSlider compact={mobile} />
        <div style={{ marginTop: 10, paddingInline: 6, paddingBottom: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 7, height: 7, borderRadius: "9999px", background: "#C69459", boxShadow: "0 0 9px rgba(198,148,89,0.9)" }} />
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.17em", textTransform: "uppercase", color: "rgba(255,255,255,0.80)", textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>Real Patient Results</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, borderRadius: "9999px", padding: "4px 11px", border: "1px solid rgba(198,148,89,0.28)", background: "rgba(198,148,89,0.08)" }}>
            <svg style={{ width: 9, height: 9, color: "#C69459" }} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C69459" }}>Clinically Verified</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── MAIN HERO ── */
export default function Hero() {
  const { slides } = siteContent.hero
  const [index, setIndex]     = useState(0)
  const [dir, setDir]         = useState(1)
  const reduced = useReducedMotion()
  const bgRef   = useRef(null)   // passed to HeroBackground & HeroPageReveal

  const goTo = useCallback((next) => {
    setDir(next > index ? 1 : -1)
    setIndex(next)
  }, [index])

  const next = useCallback(() => goTo((index + 1) % slides.length), [goTo, index, slides.length])
  const prev = useCallback(() => goTo((index - 1 + slides.length) % slides.length), [goTo, index, slides.length])

  useEffect(() => {
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [next])

  const slide = slides[index]

  return (
    <section
      className="hero-section"
      style={{
        position: "relative", minHeight: "calc(100vh - 30px)", display: "flex",
        flexDirection: "column", paddingTop: 80, overflow: "hidden",
      }}
    >
      <HeroBackground bgRef={bgRef} />

      {/* GSAP page-open curtain — self-destructs after animation */}
      {!reduced && <HeroPageReveal bgRef={bgRef} />}

      {/* Decorative top-left corner accent */}
      <div className="pointer-events-none absolute left-6 top-6 z-10 hidden lg:block">
        <div className="h-10 w-10 rounded-tl-2xl border-l-2 border-t-2" style={{ borderColor: "rgba(193,154,107,0.35)" }} />
      </div>
      {/* Decorative bottom-right corner accent */}
      <div className="pointer-events-none absolute bottom-12 right-6 z-10 hidden lg:block">
        <div className="h-10 w-10 rounded-br-2xl border-b-2 border-r-2" style={{ borderColor: "rgba(193,154,107,0.22)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: 1 }}>
        <div className="flex flex-1 items-center px-5 py-8 sm:px-10 sm:py-0 lg:px-14">
          <div className="grid w-full max-w-[1440px] mx-auto items-center gap-10 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px]">

            {/* ── LEFT — content ── */}
            <div className="flex flex-col">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div key={index} custom={dir}
                  variants={reduced ? {} : slideV}
                  initial="enter" animate="center" exit="exit"
                  className="flex flex-col"
                  style={{ willChange: "transform, opacity" }}
                >
                  {/* data-hero-reveal — GSAP targets these on page open */}
                  <div data-hero-reveal>
                    <Badge text={slide.badge} />
                  </div>

                  {/* Headline */}
                  <h1 data-hero-reveal
                    className="font-serif font-semibold leading-[1.08] tracking-tight text-white"
                    style={{ fontSize: "clamp(1.4rem, 3.2vw, 2.2rem)" }}>
                    {slide.headline}
                  </h1>

                  {/* Animated underline */}
                  <motion.div data-hero-reveal
                    className="mt-3 h-[2px] rounded-full"
                    style={{ width: "36%", background: "linear-gradient(to right, #C69459, rgba(198,148,89,0.10))", transformOrigin: "left" }}
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.28, ease: EASE_EXPO }} />

                  <motion.p
                    data-hero-reveal
                    className="mt-3 max-w-xs font-sans font-light leading-[1.65]"
                    style={{
                      fontSize: "clamp(0.75rem, 1.1vw, 0.85rem)",
                      color: "rgba(255,255,255,0.92)",
                      textShadow: "0 1px 4px rgba(0,0,0,0.85)",
                    }}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.22, ease: EASE }}>
                    {slide.description}
                  </motion.p>

                  <div data-hero-reveal className="mt-5 flex flex-wrap items-center gap-2.5">
                    <CTAButton   text={slide.primaryCta.text}   href={slide.primaryCta.href} />
                    <GhostButton text={slide.secondaryCta.text} href={slide.secondaryCta.href} />
                  </div>
                </motion.div>
              </AnimatePresence>

              <div data-hero-reveal>
                <StatsStrip />
              </div>

              {/* Divider */}
              <motion.div data-hero-reveal
                className="my-5 h-px w-full max-w-[340px]"
                style={{ background: "linear-gradient(to right, rgba(193,154,107,0.25), transparent)" }}
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.9, ease: EASE }} />

              {/* Nav controls */}
              <motion.div data-hero-reveal
                className="flex items-center gap-3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.95 }}>
                <NavArrow dir="prev" onClick={prev} />
                <SlideDots count={slides.length} current={index} onSelect={goTo} />
                <NavArrow dir="next" onClick={next} />
                <span className="ml-2 text-[11px] font-semibold tabular-nums text-white/60">
                  {String(index + 1).padStart(2,"0")} / {String(slides.length).padStart(2,"0")}
                </span>
              </motion.div>
            </div>

            {/* ── RIGHT — desktop card ── */}
            <motion.div data-hero-reveal
              className="hidden lg:block"
              initial={{ opacity: 0, x: 44, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.42, ease: EASE_EXPO }}>
              <BeforeAfterCard />
            </motion.div>
          </div>
        </div>

        {/* ── Mobile card ── */}
        <motion.div data-hero-reveal
          className="block lg:hidden px-5 pb-10 sm:px-10"
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5, ease: EASE }}>
          <BeforeAfterCard mobile />
        </motion.div>

        <ScrollCue />
      </div>
    </section>
  )
}
