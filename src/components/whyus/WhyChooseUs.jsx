import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { siteContent } from "../../data/siteContent"
import ArrowUpRight from "../ui/ArrowUpRight"

/* ────────────────────────────────────────────────────────────
   IMAGE STACK — convergence on scroll + hover polish
──────────────────────────────────────────────────────────── */
function ImageStack({ images, ctaText, ctaHref }) {
  return (
    <div className="relative h-[520px] w-full sm:h-[580px] lg:h-[640px]">

      {/* ── Back image — starts scattered top-right, converges in ── */}
      <motion.div
        className="absolute right-0 top-0 h-[72%] w-[62%] overflow-hidden rounded-3xl shadow-2xl"
        initial={{ opacity: 0, x: 60, y: -30, rotate: 6 }}
        whileInView={{ opacity: 1, x: 0, y: 0, rotate: 2 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6, rotate: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
        style={{ willChange: "transform, opacity" }}
      >
        <motion.img
          src={images.secondary} alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-bl from-novaderm-brown/20 to-transparent" />
      </motion.div>

      {/* ── Front main image — starts scattered bottom-left, converges ── */}
      <motion.div
        className="absolute bottom-0 left-0 h-[85%] w-[68%] overflow-hidden rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.28)]"
        initial={{ opacity: 0, x: -60, y: 50, rotate: -4 }}
        whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.88, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6, boxShadow: "0 44px 100px rgba(0,0,0,0.38)", transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
        style={{ willChange: "transform, opacity" }}
      >
        <motion.img
          src={images.main}
          alt="Skin specialist"
          className="h-full w-full object-cover object-top"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-novaderm-brown/50 via-transparent to-transparent" />

        {/* Experience badge */}
        <motion.div
          className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-novaderm-brown/80 px-4 py-3 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

      {/* ── Small third image — starts scattered bottom-right ── */}
      <motion.div
        className="absolute bottom-8 right-2 h-[30%] w-[38%] overflow-hidden rounded-2xl shadow-xl"
        initial={{ opacity: 0, x: 40, y: 40, rotate: 5 }}
        whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.82, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
        style={{ willChange: "transform, opacity" }}
      >
        <motion.img
          src={images.tertiary} alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-novaderm-brown/20" />
      </motion.div>

      {/* ── Floating rating pill — pops in after images settle ── */}
      <motion.div
        className="absolute right-4 top-[68%] z-10 flex items-center gap-2.5 rounded-full border border-novaderm-gold/30 bg-[#FDFBF7] px-4 py-2 shadow-lg"
        initial={{ opacity: 0, scale: 0.6, y: 12 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.52, delay: 0.62, type: "spring", bounce: 0.38 }}
        whileHover={{ scale: 1.08, boxShadow: "0 8px 28px rgba(193,154,107,0.28)", transition: { duration: 0.25 } }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-novaderm-gold" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
        </svg>
        <span className="text-sm font-bold text-novaderm-brown">4.9</span>
        <span className="text-xs text-novaderm-brown/50">/ 5.0</span>
      </motion.div>

      {/* ── Circular CTA ── */}
      <motion.a
        href={ctaHref}
        aria-label={ctaText}
        className="group absolute left-[55%] top-[44%] z-20 flex h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-[100px] sm:w-[100px]"
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.55, type: "spring", bounce: 0.4 }}
        whileHover={{ scale: 1.14 }}
        whileTap={{ scale: 0.93 }}
      >
        <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-novaderm-gold shadow-lg shadow-novaderm-gold/30 transition-all duration-300 group-hover:bg-novaderm-gold-dark group-hover:shadow-novaderm-gold/50">
          <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:rotate-45" />
        </span>
        {/* Ripple on hover */}
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full border border-novaderm-gold/35"
          initial={{ scale: 1, opacity: 0 }}
          whileHover={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </motion.a>

      {/* ── Decorative dots grid ── */}
      <motion.div
        className="pointer-events-none absolute -left-4 top-1/3 hidden lg:block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="absolute h-1 w-1 rounded-full bg-novaderm-gold/30"
            style={{ left: `${(i % 3) * 12}px`, top: `${Math.floor(i / 3) * 12}px` }} />
        ))}
      </motion.div>

      {/* ── Gold glow behind main image ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[40%] w-[68%] rounded-3xl blur-3xl"
        style={{ background: "rgba(193,154,107,0.10)", zIndex: -1 }}
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
          ? "bg-novaderm-brown shadow-lg shadow-novaderm-brown/15"
          : "bg-[#F4EFEA] hover:bg-[#EDE8E2]"
      }`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.12 + index * 0.07 }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        {/* Number badge */}
        <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
          isOpen ? "bg-novaderm-gold text-white" : "bg-novaderm-gold/12 text-novaderm-gold"
        }`}>
          {item.number}
        </span>

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
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 pt-1 font-sans text-[0.85rem] font-light leading-[1.7] tracking-[0.01em] text-white/65">
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

  return (
    <section id="why-us" className="relative overflow-hidden py-20 lg:py-28" style={{ background: "#F9F6F0" }}>

      {/* ── Subtle background texture ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-novaderm-gold/6 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-novaderm-brown/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">

        {/* ── Section header (centered, above grid) ── */}
        <div className="mb-12 flex flex-col items-center gap-3 text-center lg:mb-16">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-novaderm-gold/35 bg-novaderm-gold/10 px-4 py-1.5"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-novaderm-gold opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-novaderm-gold" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-novaderm-gold">{badge}</span>
          </motion.span>

          <motion.h2
            className="max-w-2xl font-serif text-[1.9rem] font-semibold leading-[1.18] tracking-[-0.01em] text-novaderm-brown sm:text-[2.3rem] lg:text-[2.65rem] lg:leading-[1.14]"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {headline}
          </motion.h2>

          <motion.p
            className="max-w-xl font-sans text-[0.9rem] font-light leading-[1.75] tracking-[0.015em] text-novaderm-brown/58 sm:text-[0.95rem]"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {description}
          </motion.p>
        </div>

        {/* ── Two-column grid ── */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left — image stack */}
          <motion.div
            initial={{ opacity: 0, x: -44 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ImageStack images={images} ctaText={ctaText} ctaHref={ctaHref} />
          </motion.div>

          {/* Right — accordion cards */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 44 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              transition={{ duration: 0.45, delay: 0.45 }}
              whileHover={{ x: 4 }}
            >
              <div>
                <p className="text-sm font-semibold text-novaderm-brown">Ready to start your journey?</p>
                <p className="text-xs text-novaderm-brown/55">Book a free consultation today</p>
              </div>
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-novaderm-gold text-white shadow-md transition-all duration-300 group-hover:rotate-45 group-hover:shadow-novaderm-gold/30">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
