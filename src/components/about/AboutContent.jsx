import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { siteContent } from "../../data/siteContent"
import { useReducedMotion, VP_ONCE } from "../../hooks/usePerf"
import TextReveal from "../ui/TextReveal"

const EASE = [0.25, 0.46, 0.45, 0.94]

const slideItem = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    VP_ONCE,
  transition:  { duration: 0.38, delay, ease: EASE },
})

/* ── Feature icons ── */
function FeatureIcon({ type }) {
  const cls = "h-5 w-5 text-novaderm-gold"
  if (type === "treatment")
    return <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true"><path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  if (type === "health")
    return <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  if (type === "certified")
    return <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  return <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true"><path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

/* ── Animated progress bar ── */
function ProgressBar({ label, value, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-novaderm-brown">{label}</span>
        <motion.span
          className="text-sm font-semibold text-novaderm-gold"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.6 }}
        >{value}%</motion.span>
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

export default function AboutContent() {
  const { badge, headline, description, features, stats, ctaText, ctaHref } = siteContent.about
  const reduced = useReducedMotion()

  return (
    <div className="flex flex-col justify-center gap-6">

      {/* Badge */}
      <motion.div {...slideItem(0.05)}>
        <span className="inline-flex items-center gap-2 rounded-full border border-novaderm-gold/40 bg-novaderm-gold/10 px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-novaderm-gold opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-novaderm-gold" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-novaderm-gold">{badge}</span>
        </span>
      </motion.div>

      {/* Headline */}
      <TextReveal
        as="h2"
        className="max-w-lg font-serif text-[1.9rem] font-semibold leading-[1.18] tracking-[-0.01em] text-novaderm-brown sm:text-[2.3rem] lg:text-[2.65rem] lg:leading-[1.14]"
        delay={80}
        stagger={60}
      >
        {headline}
      </TextReveal>

      {/* Gold rule */}
      <motion.div
        className="h-px bg-gradient-to-r from-novaderm-gold/55 via-novaderm-gold-light/35 to-transparent"
        initial={reduced ? false : { scaleX: 0, originX: "left" }}
        whileInView={{ scaleX: 1 }}
        viewport={VP_ONCE}
        transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
        style={{ width: "52%", willChange: "transform" }}
      />

      {/* Description */}
      <motion.p
        className="max-w-md font-sans text-[0.88rem] font-light leading-relaxed tracking-wide text-novaderm-brown/65 sm:text-[0.95rem]"
        {...slideItem(0.25)}
      >
        {description}
      </motion.p>

      {/* Feature grid */}
      <div className="grid grid-cols-2 gap-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="group flex items-start gap-3 rounded-2xl border border-novaderm-gold/18 bg-novaderm-gold/5 px-4 py-3.5 transition-colors duration-250 hover:border-novaderm-gold/45 hover:bg-novaderm-gold/10"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP_ONCE}
            transition={{ duration: 0.36, delay: 0.28 + i * 0.07, ease: EASE }}
            whileHover={{ scale: 1.02 }}
            style={{ willChange: "transform, opacity" }}
          >
            <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-novaderm-gold/15 transition-colors duration-300 group-hover:bg-novaderm-gold/25">
              <FeatureIcon type={f.icon} />
            </span>
            <span className="text-sm font-medium leading-snug text-novaderm-brown">{f.title}</span>
          </motion.div>
        ))}
      </div>

      {/* Progress bars + circular CTA */}
      <motion.div
        className="flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-8"
        {...slideItem(0.55)}
      >
        {/* Progress bars */}
        <div className="flex-1 space-y-4 rounded-2xl border border-novaderm-gold/20 bg-[#FDFBF7]/80 px-5 py-5 shadow-sm backdrop-blur-sm">
          {stats.map((s, i) => (
            <ProgressBar key={s.label} label={s.label} value={s.value} delay={0.65 + i * 0.15} />
          ))}
        </div>

        {/* Circular spinning CTA */}
        <motion.a
          href={ctaHref}
          className="group relative mx-auto flex h-24 w-24 flex-shrink-0 items-center justify-center sm:mx-0"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={ctaText}
        >
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full text-novaderm-brown/55"
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
