import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import HeroBackground from "./HeroBackground"
import BeforeAfterSlider from "./BeforeAfterSlider"
import { siteContent } from "../../data/siteContent"
import { useReducedMotion } from "../../hooks/usePerf"

const EASE = [0.25, 0.46, 0.45, 0.94]
const EASE_SPRING = [0.34, 1.4, 0.64, 1]

/* ── Slide variants — only opacity + translateX (GPU safe) ── */
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? "5%" : "-5%", opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.42, ease: EASE } },
  exit:  (dir) => ({ x: dir > 0 ? "-5%" : "5%", opacity: 0, transition: { duration: 0.28, ease: EASE } }),
}

/* ── Word reveal — simple fade, no per-word stagger ── */
function WordReveal({ text }) {
  return <span>{text}</span>
}

/* ── Scroll arrow ── */
function ScrollArrow() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 1.0, ease: "easeOut" }}
      style={{ willChange: "transform, opacity" }}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Scroll</span>
      <motion.div
        className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 pt-1.5"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform" }}
      >
        <div className="h-2 w-0.5 rounded-full bg-novaderm-gold" />
      </motion.div>
    </motion.div>
  )
}

/* ── Badge ── */
function Badge({ text, reduced }) {
  return (
    <motion.div
      className="mb-5 inline-flex items-center gap-2"
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: EASE }}
    >
      <span
        className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
        style={{ borderColor: "rgba(193,154,107,0.40)", background: "rgba(193,154,107,0.09)", color: "#C69459" }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: "#C69459" }} />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "#C69459" }} />
        </span>
        {text}
      </span>
    </motion.div>
  )
}

/* ── CTA Buttons ── */
function CTAButton({ text, href }) {
  return (
    <motion.a
      href={href}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-white"
      style={{ background: "linear-gradient(135deg, #C69459 0%, #a8825a 100%)", willChange: "transform" }}
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.32, delay: 0.32, ease: EASE_SPRING }}
      whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(198,148,89,0.40)" }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span
        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/14"
        whileHover={{ translateX: "200%" }}
        transition={{ duration: 0.45 }}
      />
      {text}
      <svg className="h-4 w-4 transition-transform duration-250 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
      </svg>
    </motion.a>
  )
}

function SecondaryButton({ text, href }) {
  return (
    <motion.a
      href={href}
      className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white/80 transition-colors duration-250 hover:border-novaderm-gold/55 hover:text-white"
      style={{ borderColor: "rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.04)", willChange: "transform" }}
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.32, delay: 0.4, ease: EASE_SPRING }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {text}
    </motion.a>
  )
}

/* ── Stats strip ── */
const STATS = [
  { value: "3,500+", label: "Happy Patients" },
  { value: "12+",    label: "Years Experience" },
  { value: "4.9★",   label: "Avg. Rating" },
  { value: "98%",    label: "Success Rate" },
]

function StatsStrip({ reduced }) {
  return (
    <motion.div
      className="mt-6 flex flex-wrap items-center gap-4 sm:gap-7"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: 0.62, ease: EASE }}
      style={{ willChange: "transform, opacity" }}
    >
      {STATS.map((s, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <span className="font-serif text-xl font-bold leading-none" style={{ color: "#C69459" }}>{s.value}</span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-white/42">{s.label}</span>
        </div>
      ))}
    </motion.div>
  )
}

/* ── Slide dots ── */
function SlideDots({ count, current, onSelect }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} onClick={() => onSelect(i)} aria-label={`Go to slide ${i + 1}`} className="relative flex items-center justify-center">
          <motion.span
            className="block rounded-full"
            animate={{ width: i === current ? 26 : 8, height: 8, background: i === current ? "#C69459" : "rgba(255,255,255,0.28)" }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{ willChange: "transform" }}
          />
        </button>
      ))}
    </div>
  )
}

/* ── Arrow buttons ── */
function NavArrow({ dir, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={dir === "next" ? "Next slide" : "Previous slide"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/18 text-white/65 transition-colors duration-200 hover:border-novaderm-gold/55 hover:bg-novaderm-gold/12 hover:text-white"
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
      style={{ willChange: "transform" }}
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className={`h-4 w-4 ${dir === "prev" ? "rotate-180" : ""}`}>
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
      </svg>
    </motion.button>
  )
}

/* ── CurtainReveal removed — was causing full-screen GPU overlay paint ── */

/* ── MAIN HERO ── */
export default function Hero() {
  const { slides } = siteContent.hero
  const [index, setIndex]         = useState(0)
  const [direction, setDirection] = useState(1)
  const reduced = useReducedMotion()

  const goTo = useCallback((next) => {
    setDirection(next > index ? 1 : -1)
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
    <>
      <section style={{ position: "relative", height: "calc(100vh - 30px)", minHeight: 560, display: "flex", flexDirection: "column", paddingTop: 80, margin: "15px", borderRadius: "16px", overflow: "hidden" }}>

          <HeroBackground />

          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: 1 }}>
            <div className="flex flex-1 items-center px-5 sm:px-8 lg:px-12">
              <div className="grid w-full max-w-[1400px] mx-auto items-center gap-10 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]">

                {/* LEFT — text content */}
                <div className="flex flex-col">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={index}
                      custom={direction}
                      variants={reduced ? {} : slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="flex flex-col"
                      style={{ willChange: "transform, opacity" }}
                    >
                      <Badge text={slide.badge} reduced={reduced} />

                      <h1 className="font-serif font-semibold leading-[1.08] tracking-tight text-white"
                        style={{ fontSize: "clamp(1.65rem, 4.2vw, 2.85rem)" }}>
                        <WordReveal text={slide.headline} />
                      </h1>

                      {/* Gold underline — scaleX only */}
                      <motion.div
                        className="mt-4 h-[2px] rounded-full"
                        style={{ width: "40%", background: "linear-gradient(to right, #C69459, transparent)", transformOrigin: "left", willChange: "transform" }}
                        initial={reduced ? false : { scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />

                      <motion.p
                        className="mt-3 max-w-md font-sans font-light leading-[1.65] text-white/58"
                        style={{ fontSize: "clamp(0.78rem, 1.2vw, 0.88rem)", willChange: "transform, opacity" }}
                        initial={reduced ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.36, delay: 0.25, ease: EASE }}
                      >
                        {slide.description}
                      </motion.p>

                      <div className="mt-5 flex flex-wrap items-center gap-3.5">
                        <CTAButton text={slide.primaryCta.text}   href={slide.primaryCta.href} />
                        <SecondaryButton text={slide.secondaryCta.text} href={slide.secondaryCta.href} />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <StatsStrip reduced={reduced} />

                  <motion.div
                    className="mt-5 flex items-center gap-4"
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.38, delay: 0.9 }}
                  >
                    <NavArrow dir="prev" onClick={prev} />
                    <SlideDots count={slides.length} current={index} onSelect={goTo} />
                    <NavArrow dir="next" onClick={next} />
                  </motion.div>
                </div>

                {/* RIGHT — Before/After card */}
                <motion.div
                  className="hidden lg:block"
                  initial={reduced ? false : { opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <div style={{ borderRadius: 24, padding: 1, background: "linear-gradient(145deg, rgba(198,148,89,0.50) 0%, rgba(255,255,255,0.05) 50%, rgba(198,148,89,0.20) 100%)", boxShadow: "0 0 48px rgba(198,148,89,0.10), 0 24px 56px rgba(0,0,0,0.45)" }}>
                    <div style={{ borderRadius: 23, padding: 12, background: "rgba(30,26,20,0.88)" }}>
                      <BeforeAfterSlider />
                      <div style={{ marginTop: 10, paddingInline: 6, paddingBottom: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 7, height: 7, borderRadius: "9999px", background: "#C69459", boxShadow: "0 0 8px rgba(198,148,89,0.85)" }} />
                          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)" }}>Real Patient Results</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, borderRadius: "9999px", padding: "4px 10px", border: "1px solid rgba(198,148,89,0.28)", background: "rgba(198,148,89,0.07)" }}>
                          <svg style={{ width: 10, height: 10, color: "#C69459" }} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C69459" }}>Clinically Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>

            <ScrollArrow />
          </div>
        </section>
    </>
  )
}
