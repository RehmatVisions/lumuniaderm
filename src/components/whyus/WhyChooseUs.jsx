import { motion, AnimatePresence, useInView } from "framer-motion"
import { useState, useRef } from "react"
import { siteContent } from "../../data/siteContent"
import ArrowUpRight from "../ui/ArrowUpRight"
import { useReveal } from "../../hooks/useReveal"

const EASE = [0.25, 0.46, 0.45, 0.94]

/* ─── Diagonal clip helper — top-left & bottom-right curved corners ── */
const imageCornerStyle = {
  borderRadius: "2rem 0.5rem 2rem 0.5rem",
}

/* ────────────────────────────────────────────────────────────
   IMAGE STACK — redesigned so images never clip into each other
──────────────────────────────────────────────────────────── */
function ImageStack({ images, ctaText, ctaHref }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} className="relative w-full" style={{ height: 560 }}>

      {/* ── BACK image — top-right quadrant, stays in its zone ── */}
      <motion.div
        className="absolute overflow-hidden shadow-2xl"
        style={{
          top:    0,
          right:  0,
          width:  "58%",
          height: "52%",
          ...imageCornerStyle,
          willChange: "transform, opacity",
        }}
        initial={{ opacity: 0, x: 60, y: -30, rotate: 5 }}
        animate={inView ? { opacity: 1, x: 0, y: 0, rotate: 1.5 } : {}}
        transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -8, rotate: 0, transition: { duration: 0.35, ease: EASE } }}
      >
        <motion.img
          src={images.secondary}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.65, ease: EASE }}
        />
        {/* subtle gold tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-bl from-novaderm-gold/15 to-transparent" />
      </motion.div>

      {/* ── FRONT main image — lower-left, occupies 60% height ── */}
      <motion.div
        className="absolute overflow-hidden"
        style={{
          bottom: 0,
          left:   0,
          width:  "62%",
          height: "70%",
          ...imageCornerStyle,
          boxShadow:  "0 32px 80px rgba(0,0,0,0.26)",
          willChange: "transform, opacity",
        }}
        initial={{ opacity: 0, x: -60, y: 50, rotate: -3 }}
        animate={inView ? { opacity: 1, x: 0, y: 0, rotate: 0 } : {}}
        transition={{ duration: 0.88, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -8, boxShadow: "0 44px 100px rgba(0,0,0,0.34)", transition: { duration: 0.35, ease: EASE } }}
      >
        <motion.img
          src={images.main}
          alt="Skin specialist"
          className="h-full w-full object-cover object-top"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.65, ease: EASE }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-novaderm-brown/55 via-transparent to-transparent" />

        {/* Experience badge — bottom-left of main image */}
        <motion.div
          className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-novaderm-brown/85 px-4 py-3 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.75 }}
          whileHover={{ scale: 1.06, transition: { duration: 0.25 } }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-novaderm-gold/20">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-novaderm-gold" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="text-lg font-bold leading-none text-white">12+</p>
            <p className="text-[10px] uppercase tracking-wider text-white/60">Years of Excellence</p>
          </div>
        </motion.div>
      </motion.div>

      {/* ── SMALL tertiary image — right side, middle height, no overlap ── */}
      <motion.div
        className="absolute overflow-hidden shadow-xl"
        style={{
          bottom: "12%",
          right:  0,
          width:  "35%",
          height: "32%",
          ...imageCornerStyle,
          willChange: "transform, opacity",
        }}
        initial={{ opacity: 0, x: 40, y: 40, rotate: 4 }}
        animate={inView ? { opacity: 1, x: 0, y: 0, rotate: 0 } : {}}
        transition={{ duration: 0.82, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6, scale: 1.04, transition: { duration: 0.3, ease: EASE } }}
      >
        <motion.img
          src={images.tertiary}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.6, ease: EASE }}
        />
        <div className="absolute inset-0 bg-novaderm-brown/15" />
      </motion.div>

      {/* ── Floating rating pill — sits between the two right-side images ── */}
      <motion.div
        className="absolute z-10 flex items-center gap-2.5 rounded-full border border-novaderm-gold/30 bg-[#FDFBF7] px-4 py-2 shadow-lg"
        style={{ right: "2%", top: "50%", transform: "translateY(-50%)" }}
        initial={{ opacity: 0, scale: 0.5, x: 20 }}
        animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
        transition={{ duration: 0.52, delay: 0.65, type: "spring", bounce: 0.38 }}
        whileHover={{ scale: 1.1, boxShadow: "0 8px 28px rgba(193,154,107,0.30)", transition: { duration: 0.25 } }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-novaderm-gold" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
        </svg>
        <span className="text-sm font-bold text-novaderm-brown">4.9</span>
        <span className="text-xs text-novaderm-brown/50">/ 5.0</span>
      </motion.div>

      {/* ── Circular CTA — floats over the gap between images ── */}
      <motion.a
        href={ctaHref}
        aria-label={ctaText}
        className="group absolute z-20 flex h-[88px] w-[88px] items-center justify-center sm:h-[96px] sm:w-[96px]"
        style={{ left: "57%", top: "46%", transform: "translate(-50%, -50%)" }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.65, delay: 0.55, type: "spring", bounce: 0.42 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.93 }}
      >
        {/* Rotating ring */}
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full border border-dashed border-novaderm-gold/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
        <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-novaderm-gold shadow-lg shadow-novaderm-gold/30 transition-all duration-300 group-hover:bg-novaderm-gold-dark group-hover:shadow-novaderm-gold/55">
          <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:rotate-45" />
        </span>
        {/* Pulse ring on hover */}
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full border border-novaderm-gold/35"
          initial={{ scale: 1, opacity: 0 }}
          whileHover={{ scale: 1.55, opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        />
      </motion.a>

      {/* ── Decorative dot grid — left side ── */}
      <motion.div
        className="pointer-events-none absolute -left-3 top-1/4 hidden lg:grid"
        style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.0 }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            className="h-1 w-1 rounded-full bg-novaderm-gold/35"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 1.0 + i * 0.04 }}
          />
        ))}
      </motion.div>

      {/* ── Gold glow behind front image ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 rounded-3xl blur-3xl"
        style={{ width: "62%", height: "30%", background: "rgba(193,154,107,0.09)", zIndex: -1 }}
      />
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   ACCORDION ITEM
──────────────────────────────────────────────────────────── */
function AccordionItem({ item, isOpen, onToggle, index }) {
  return (
    <motion.div
      className={`overflow-hidden rounded-2xl transition-all duration-300 ${
        isOpen
          ? "bg-novaderm-brown shadow-lg shadow-novaderm-brown/20"
          : "bg-[#F4EFEA] hover:bg-[#EDE8E2]"
      }`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
      whileHover={!isOpen ? { x: 3, transition: { duration: 0.2 } } : {}}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        {/* Number badge */}
        <motion.span
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
            isOpen ? "bg-novaderm-gold text-white" : "bg-novaderm-gold/12 text-novaderm-gold"
          }`}
          animate={{ scale: isOpen ? 1.1 : 1 }}
          transition={{ duration: 0.25 }}
        >
          {item.number}
        </motion.span>

        <span className={`flex-1 text-sm font-semibold transition-colors duration-200 sm:text-[0.95rem] ${
          isOpen ? "text-white" : "text-novaderm-brown"
        }`}>
          {item.title}
        </span>

        <motion.span
          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen ? "border-white/20 text-white" : "border-novaderm-gold/30 text-novaderm-gold"
          }`}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.28 }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 pt-1 font-sans text-[0.85rem] font-light leading-[1.75] tracking-[0.01em] text-white/65">
              {item.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────
   MAIN SECTION
──────────────────────────────────────────────────────────── */
export default function WhyChooseUs() {
  const { badge, headline, description, images, ctaText, ctaHref, accordion } = siteContent.whyUs
  const [openIndex, setOpenIndex] = useState(1)
  const headerRef = useReveal({ rootMargin: "-40px 0px" })

  return (
    <section id="why-us" className="relative overflow-hidden py-20 lg:py-28" style={{ background: "#F9F6F0" }}>

      {/* Static orbs — no blur filter (removed GPU layer) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(193,154,107,0.06) 0%, transparent 70%)" }} />
        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(61,46,36,0.05) 0%, transparent 70%)" }} />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">

        {/* ── Section header ── */}
        <div ref={headerRef} className="mb-14 flex flex-col items-center gap-3 text-center lg:mb-18">
          <span className="reveal reveal-up reveal-duration-500 reveal-delay-0 inline-flex items-center gap-2 rounded-full border border-novaderm-gold/35 bg-novaderm-gold/10 px-4 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-novaderm-gold opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-novaderm-gold" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-novaderm-gold">{badge}</span>
          </span>

          <h2 className="reveal reveal-up reveal-duration-600 reveal-delay-1 max-w-2xl font-serif text-[1.9rem] font-semibold leading-[1.18] tracking-[-0.01em] text-novaderm-brown sm:text-[2.3rem] lg:text-[2.65rem] lg:leading-[1.14]">
            {headline}
          </h2>

          <motion.div
            className="reveal reveal-fade reveal-duration-700 reveal-delay-2 h-[2px] w-16 rounded-full bg-gradient-to-r from-novaderm-gold to-novaderm-gold/20"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.18 }}
            style={{ transformOrigin: "center" }}
          />

          <p className="reveal reveal-up reveal-duration-600 reveal-delay-2 max-w-xl font-sans text-[0.9rem] font-light leading-[1.75] tracking-[0.015em] text-novaderm-brown/58 sm:text-[0.95rem]">
            {description}
          </p>
        </div>

        {/* ── Two-column grid ── */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left — image stack */}
          <motion.div
            initial={{ opacity: 0, x: -44 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <ImageStack images={images} ctaText={ctaText} ctaHref={ctaHref} />
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 44 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            {accordion.map((item, i) => (
              <AccordionItem
                key={item.number}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}

            {/* Bottom CTA strip */}
            <motion.a
              href={ctaHref}
              className="group mt-2 flex items-center justify-between rounded-2xl border border-novaderm-gold/25 bg-novaderm-gold/8 px-5 py-4 transition-all duration-300 hover:border-novaderm-gold/60 hover:bg-novaderm-gold/15"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.5 }}
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <div>
                <p className="text-sm font-semibold text-novaderm-brown">Ready to start your journey?</p>
                <p className="text-xs text-novaderm-brown/55">Book a free consultation today</p>
              </div>
              <motion.span
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-novaderm-gold text-white shadow-md transition-all duration-300 group-hover:shadow-novaderm-gold/30"
                whileHover={{ rotate: 45, scale: 1.1 }}
                transition={{ duration: 0.25 }}
              >
                <ArrowUpRight className="h-4 w-4" />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
