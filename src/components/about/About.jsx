import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { siteContent } from "../../data/siteContent"
import { useReducedMotion, VP_ONCE } from "../../hooks/animations"
// Note: sectionBg background is set by App.jsx on the parent wrapper — no need to import it here
import TextReveal from "../ui/TextReveal"
import SectionBadge from "../ui/SectionBadge"

// ─── Shared constants ─────────────────────────────────────────
const EASE = [0.25, 0.46, 0.45, 0.94]

// top-left + bottom-right rounded, opposite corners sharp
const IMG_CORNERS = { borderRadius: "2rem 0.5rem 2rem 0.5rem" }

// Reusable fade-up animation props
const fadeUp = (delay = 0, y = 20) => ({
  initial:     { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport:    VP_ONCE,
  transition:  { duration: 0.55, delay, ease: EASE },
})

// ─── ABOUT IMAGE COLLAGE ─────────────────────────────────────
// Shows two stacked images + rating card + specialist counter
function AboutImageCollage() {
  const { images, reviewScore, reviewLabel, experience, specialists } = siteContent.about

  return (
    <div className="relative flex items-end gap-2 sm:gap-4 lg:gap-5">

      {/* Main tall image */}
      <motion.div
        className="relative w-[58%] overflow-hidden shadow-2xl img-shine"
        style={IMG_CORNERS}
        {...fadeUp(0.1, 0)}
        whileHover={{ y: -6, transition: { duration: 0.35, ease: EASE } }}
      >
        <motion.img
          src={images.main}
          alt="Lumina Derm treatment"
          className="h-[340px] sm:h-[500px] w-full object-cover lg:h-[580px] about-main-img"
          style={{ objectPosition: "20% center" }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        {/* Gold corner accent */}
        <div className="pointer-events-none absolute left-0 top-0 h-16 w-16">
          <div className="absolute left-3 top-3 h-8 w-8 rounded-tl-2xl border-l-2 border-t-2 border-novaderm-gold/50" />
        </div>

        {/* Experience badge */}
        <motion.div
          className="absolute bottom-5 left-5 rounded-2xl bg-novaderm-brown/88 px-4 py-3 backdrop-blur-md border border-white/10 shadow-xl"
          {...fadeUp(0.6, 12)}
          whileHover={{ scale: 1.07, transition: { duration: 0.25 } }}
        >
          <p className="text-2xl font-bold text-novaderm-gold">{experience.years}</p>
          <p className="text-xs text-white/95 font-semibold">{experience.label}</p>
        </motion.div>
      </motion.div>

      {/* Right column */}
      <div className="flex w-[42%] flex-col gap-4">

        {/* Rating card */}
        <motion.div
          className="relative overflow-hidden px-3 py-4 sm:px-5 sm:py-6 text-center shadow-xl"
          style={{ background: "linear-gradient(135deg, #c19a6b 0%, #a8825a 100%)", ...IMG_CORNERS }}
          {...fadeUp(0.2, 0)}
          whileHover={{ scale: 1.04, y: -4, transition: { duration: 0.28 } }}
        >
          <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10" />
          <div className="absolute -bottom-4 -left-4 h-14 w-14 rounded-full bg-white/10" />
          <motion.div
            className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/22 to-transparent"
            initial={{ x: "-120%" }}
            whileInView={{ x: "220%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeInOut" }}
          />
          <p className="relative text-2xl sm:text-4xl font-bold text-white">
            {reviewScore}{" "}
            <svg viewBox="0 0 24 24" className="inline h-5 w-5 fill-white align-middle" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
            </svg>
          </p>
          <p className="relative mt-1 text-sm font-medium text-white/90">{reviewLabel}</p>
        </motion.div>

        {/* Secondary image */}
        <motion.div
          className="overflow-hidden shadow-lg img-shine"
          style={IMG_CORNERS}
          {...fadeUp(0.35, 0)}
          whileHover={{ y: -5, transition: { duration: 0.3, ease: EASE } }}
        >
          <motion.img
            src={images.secondary}
            alt="Novaderm specialist"
            className="h-[160px] sm:h-[240px] w-full object-cover lg:h-[275px]"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            loading="lazy"
            decoding="async"
          />
          <div className="pointer-events-none absolute bottom-0 right-0 h-12 w-12">
            <div className="absolute bottom-3 right-3 h-6 w-6 rounded-br-xl border-b-2 border-r-2 border-novaderm-gold/55" />
          </div>
        </motion.div>

        {/* Specialists counter */}
        <motion.div
          className="rounded-2xl px-4 py-3.5 shadow-md"
          style={{ background: "#FDFBF7", border: "1px solid rgba(193,154,107,0.25)", ...IMG_CORNERS }}
          {...fadeUp(0.5, 0)}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 28px rgba(193,154,107,0.22)", transition: { duration: 0.25 } }}
        >
          <p className="text-2xl font-bold text-novaderm-gold">{specialists.count}</p>
          <p className="text-xs font-semibold text-novaderm-brown/90">{specialists.label}</p>
        </motion.div>
      </div>

      {/* Botanical decoration */}
      <motion.div
        className="pointer-events-none absolute -bottom-8 left-[52%] text-novaderm-gold/25"
        initial={{ opacity: 0, rotate: -15 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.9 }}
      >
        <svg viewBox="0 0 120 120" className="h-24 w-24" fill="none" aria-hidden="true">
          <path d="M60 10 Q80 40 60 60 Q40 40 60 10Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M60 60 Q85 80 75 110"               stroke="currentColor" strokeWidth="1.2" />
          <path d="M60 60 Q35 80 45 110"               stroke="currentColor" strokeWidth="1.2" />
          <circle cx="60" cy="60" r="3" fill="currentColor" opacity="0.5" />
        </svg>
      </motion.div>
    </div>
  )
}

// ─── ABOUT CONTENT (text + features + stats) ─────────────────
// Feature icon — renders the right SVG based on the icon type string
function FeatureIcon({ type }) {
  const cls = "h-5 w-5 text-novaderm-gold"
  if (type === "treatment")
    return <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true"><path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  if (type === "health")
    return <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  if (type === "certified")
    return <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  // default: technology icon
  return <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true"><path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

// Animated progress bar — animates width when scrolled into view
function ProgressBar({ label, value, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-novaderm-brown">{label}</span>
        <motion.span
          className="text-sm font-semibold text-novaderm-gold"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.6 }}
        >
          {value}%
        </motion.span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-novaderm-gold/12">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-novaderm-gold to-novaderm-gold-light"
          style={{ willChange: "transform" }}
          initial={{ scaleX: 0, originX: "left" }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, delay, ease: EASE }}
        />
      </div>
    </div>
  )
}

function AboutContent() {
  const { badge, headline, description, features, stats, ctaText, ctaHref } = siteContent.about

  return (
    <div className="flex flex-col justify-center gap-6">

      {/* Badge */}
      <SectionBadge text={badge} delay={0.05} />

      {/* Headline */}
      <TextReveal
        as="h2"
        className="max-w-lg font-sans text-[1.9rem] font-semibold leading-[1.18] tracking-[-0.01em] sm:text-[2.3rem] lg:text-[2.65rem] lg:leading-[1.14]"
        style={{ color: "#1a0f0a" }}
        delay={80}
        stagger={60}
      >
        {headline}
      </TextReveal>

      {/* Gold divider */}
      <motion.div
        className="h-px bg-gradient-to-r from-novaderm-gold/55 via-novaderm-gold-light/35 to-transparent"
        initial={{ scaleX: 0, originX: "left" }}
        whileInView={{ scaleX: 1 }}
        viewport={VP_ONCE}
        transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
        style={{ width: "52%", willChange: "transform" }}
      />

      {/* Description */}
      <motion.p
        className="max-w-md font-sans text-[0.88rem] font-semibold leading-relaxed tracking-wide sm:text-[0.95rem]"
        style={{ color: "#1a0f0a" }}
        {...fadeUp(0.25)}
      >
        {description}
      </motion.p>

      {/* Feature grid — 2 columns on sm+, 1 on xs */}
      <div className="grid grid-cols-2 gap-3 about-feature-grid">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            className="group flex items-start gap-3 rounded-2xl border border-novaderm-gold/18 bg-novaderm-gold/5 px-4 py-3.5 transition-colors duration-250 hover:border-novaderm-gold/45 hover:bg-novaderm-gold/10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP_ONCE}
            transition={{ duration: 0.36, delay: 0.28 + i * 0.07, ease: EASE }}
            whileHover={{ scale: 1.02 }}
            style={{ willChange: "transform, opacity" }}
          >
            <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-novaderm-gold/15 transition-colors duration-300 group-hover:bg-novaderm-gold/25">
              <FeatureIcon type={feature.icon} />
            </span>
      <span className="text-sm font-semibold leading-snug text-novaderm-brown">{feature.title}</span>
          </motion.div>
        ))}
      </div>

      {/* Progress bars + circular CTA */}
      <motion.div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-8" {...fadeUp(0.55)}>

        {/* Animated progress bars */}
        <div className="flex-1 space-y-4 rounded-2xl border border-novaderm-gold/20 bg-[#FDFBF7]/80 px-5 py-5 shadow-sm backdrop-blur-sm">
          {stats.map((stat, i) => (
            <ProgressBar key={stat.label} label={stat.label} value={stat.value} delay={0.65 + i * 0.15} />
          ))}
        </div>

        {/* Spinning circular CTA button */}
        <motion.a
          href={ctaHref}
          className="group relative mx-auto flex h-24 w-24 flex-shrink-0 items-center justify-center sm:mx-0"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={ctaText}
        >
          <svg
            viewBox="0 0 100 100"
className="relative flex h-12 w-12 items-center justify-center rounded-full bg-novaderm-gold text-white shadow-lg..."
            style={{ animation: "spin 14s linear infinite" }}
            aria-hidden="true"
          >
            <defs>
              <path id="about-circle" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
            </defs>
            <text fontSize="10.5" fill="currentColor" letterSpacing="3.2">
              <textPath href="#about-circle">More About Us • More About Us • </textPath>
            </text>
          </svg>
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-novaderm-gold text-white shadow-lg transition-all duration-300 group-hover:bg-novaderm-gold-dark group-hover:shadow-novaderm-gold/40">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true">
              <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </motion.a>
      </motion.div>
    </div>
  )
}

// ─── ABOUT COUNTERS ──────────────────────────────────────────
// Animates numbers from 0 to target when scrolled into view

// Rolls a number from 0 to target using framer-motion's animate()
function Counter({ target, suffix = "", duration = 1.8, delay = 0 }) {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, margin: "-60px" })
  const count   = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString())

  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => {
      const ctrl = animate(count, target, { duration, ease: [0.16, 1, 0.3, 1] })
      return ctrl.stop
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [inView, count, target, duration, delay])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

// Slides the counter in from below (slot machine style)
function SlotNumber({ target, suffix = "", delay = 0 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <div ref={ref} className="overflow-hidden leading-none">
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Counter target={target} suffix={suffix} duration={1.6} delay={delay} />
      </motion.div>
    </div>
  )
}

// Icon for each counter card
function CounterIcon({ type }) {
  const cls = "h-5 w-5 text-novaderm-gold"
  if (type === "patients")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  if (type === "experience")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  if (type === "rating")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  // default: certified/check icon
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true">
      <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function AboutCounters() {
  const { counters } = siteContent.about

  return (
    <div className="relative py-10">
      {/* Top divider */}
      <motion.div
        className="mx-auto mb-10 h-px max-w-[1400px] bg-gradient-to-r from-transparent via-novaderm-gold/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-6 lg:grid-cols-4 lg:px-10">
        {counters.map((item, i) => (
          <motion.div
            key={item.label}
            className="group flex flex-col items-center gap-2 text-center"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="mb-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-novaderm-gold/25 bg-novaderm-gold/10 transition-all duration-300 group-hover:border-novaderm-gold/60 group-hover:bg-novaderm-gold/22"
              whileHover={{ scale: 1.12, rotate: 4 }}
              transition={{ duration: 0.28 }}
            >
              <CounterIcon type={item.icon} />
            </motion.div>

            <div className="text-4xl font-bold tracking-tight text-novaderm-brown lg:text-5xl">
              <SlotNumber target={item.value} suffix={item.suffix} delay={0.2 + i * 0.1} />
            </div>

            <motion.p
              className="text-xs font-bold uppercase tracking-widest text-novaderm-brown"              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
            >
              {item.label}
            </motion.p>

            <motion.div
              className="h-0.5 rounded-full bg-novaderm-gold"
              initial={{ width: 0 }}
              whileInView={{ width: 36 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.7 + i * 0.1, ease: "easeOut" }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom divider */}
      <motion.div
        className="mx-auto mt-10 h-px max-w-[1400px] bg-gradient-to-r from-transparent via-novaderm-gold/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
    </div>
  )
}

// ─── MAIN ABOUT SECTION ──────────────────────────────────────
export default function About() {
  const reduced = useReducedMotion()

  return (
    <section id="about" className="relative overflow-hidden py-20 lg:py-28">

      {/* Decorative ring — top right corner */}
      <div className="pointer-events-none absolute right-8 top-8 hidden lg:block" style={{ zIndex: 1 }}>
        <svg viewBox="0 0 60 60" className="h-14 w-14 text-novaderm-gold/22" fill="none">
          <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 5" />
          <circle cx="30" cy="30" r="2"  fill="currentColor" opacity="0.45" />
        </svg>
      </div>

      {/* Two-column layout: image collage left, text content right */}
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10" style={{ zIndex: 1 }}>
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP_ONCE}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ willChange: "transform, opacity" }}
        >
          <AboutImageCollage />
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP_ONCE}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
          style={{ willChange: "transform, opacity" }}
        >
          <AboutContent />
        </motion.div>
      </div>

      {/* Stats row below the two columns */}
      <AboutCounters />

      <style>{`
        @media (max-width: 767px) {
          .about-main-img {
            object-fit: contain !important;
            object-position: center center !important;
            background: #f5ebe2;
          }
        }
        @media (max-width: 400px) {
          .about-main-img {
            object-fit: contain !important;
            object-position: center center !important;
          }
          .about-feature-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
