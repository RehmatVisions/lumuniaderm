import { motion } from "framer-motion"
import { useState } from "react"
import { siteContent } from "../../data/siteContent"
import ArrowUpRight from "../ui/ArrowUpRight"
import { useReveal } from "../../hooks/useReveal"
import TextReveal from "../ui/TextReveal"

/* top-left + bottom-right rounded image corners */
const IMG_CORNERS = { borderRadius: "2rem 0.5rem 2rem 0.5rem" }

/* ─── SERVICE ICONS ─────────────────────────────────────────── */
function ServiceIcon({ type, className = "h-5 w-5" }) {
  const icons = {
    acne:  <svg viewBox="0 0 24 24" fill="none" className={className}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    laser: <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    aging: <svg viewBox="0 0 24 24" fill="none" className={className}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    glow:  <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    hair:  <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" stroke="currentColor" strokeWidth="1.5"/><path d="M8 14c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    body:  <svg viewBox="0 0 24 24" fill="none" className={className}><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5"/><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  }
  return icons[type] ?? icons.body
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

/* ─── CARD A — Full-bleed image, overlay reveal on hover ───── */
function CardReveal({ card, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      className="group relative overflow-hidden img-shine"
      style={{ height: 440, ...IMG_CORNERS }}
      {...fadeUp(index * 0.06)}
      onMouseLeave={() => setHovered(false)}
      onMouseEnter={() => setHovered(true)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 700)}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
    >
      {/* image */}
      <motion.img
        src={card.image} alt={card.title}
        className="absolute inset-0 h-full w-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        loading="lazy"
      />

      {/* base gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/5" />

      {/* hover gradient boost */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-novaderm-brown/80 via-transparent to-transparent"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* index watermark */}
      <span className="absolute left-5 top-4 font-black text-[5rem] leading-none text-white/[0.06] select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* badge */}
      <div className="absolute right-4 top-4">
        <motion.span
          className="inline-flex items-center gap-1.5 rounded-full border border-novaderm-gold/40 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-novaderm-gold backdrop-blur-md"
          animate={{ y: hovered ? -2 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {card.badge}
        </motion.span>
      </div>

      {/* content */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-novaderm-gold/30 bg-novaderm-gold/10 backdrop-blur-sm transition-colors duration-300 group-hover:bg-novaderm-gold/25">
          <ServiceIcon type={card.icon} className="h-5 w-5 text-novaderm-gold" />
        </div>
        <h3 className="mb-2 text-[1.15rem] font-bold leading-tight text-white">{card.title}</h3>

        {/* description slides up */}
        <motion.div
          className="overflow-hidden"
          animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0, marginBottom: hovered ? 14 : 0 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
        >
          <p className="text-[0.81rem] leading-relaxed text-white/60">{card.description}</p>
        </motion.div>

        <motion.a href={card.href} className="inline-flex items-center gap-2 text-sm font-semibold text-novaderm-gold"
          whileHover={{ x: 4 }} transition={{ duration: 0.18 }}>
          Explore Treatment
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-novaderm-gold text-white transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </motion.a>
      </div>

      {/* border glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 0 1.5px rgba(193,154,107,0.45)", borderRadius: "2rem 0.5rem 2rem 0.5rem" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  )
}

/* ─── CARD B — Split: image top, content bottom ─────────────── */
function CardSplit({ card, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      className="group relative flex flex-col overflow-hidden bg-[#18110d] img-shine"
      style={{ height: 440, ...IMG_CORNERS }}
      {...fadeUp(index * 0.06)}
      onMouseLeave={() => setHovered(false)}
      onMouseEnter={() => setHovered(true)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 700)}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
    >
      {/* image half */}
      <div className="relative h-[52%] overflow-hidden">
        <motion.img
          src={card.image} alt={card.title}
          className="h-full w-full object-cover"
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          loading="lazy"
        />
        {/* shimmer overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-novaderm-gold/15 to-transparent"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#18110d]" />

        {/* floating badge */}
        <div className="absolute bottom-[-14px] left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
          <motion.span
            className="inline-flex items-center gap-1.5 rounded-full border border-novaderm-gold/40 bg-[#18110d] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-novaderm-gold shadow-lg"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.25 }}
          >
            {card.badge}
          </motion.span>
        </div>
      </div>

      {/* content half */}
      <div className="flex flex-1 flex-col justify-between p-5 pt-8">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <motion.div
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-novaderm-gold/10"
              animate={{ backgroundColor: hovered ? "rgba(193,154,107,0.22)" : "rgba(193,154,107,0.10)" }}
              transition={{ duration: 0.3 }}
            >
              <ServiceIcon type={card.icon} className="h-4 w-4 text-novaderm-gold" />
            </motion.div>
            <h3 className="text-[1rem] font-bold leading-snug text-white">{card.title}</h3>
          </div>
          <p className="text-[0.8rem] leading-relaxed text-white/45">{card.description}</p>
        </div>

        <div className="flex items-center justify-end border-t border-white/[0.06] pt-4">
          <motion.a href={card.href}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/35 transition-all duration-250 hover:border-novaderm-gold hover:bg-novaderm-gold hover:text-white"
            whileHover={{ rotate: 45 }} transition={{ duration: 0.2 }} aria-label={card.title}>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.a>
        </div>
      </div>

      {/* animated left accent */}
      <motion.div
        className="absolute inset-y-0 left-0 w-[3px] rounded-r-full bg-gradient-to-b from-novaderm-gold via-novaderm-gold-light to-transparent"
        animate={{ scaleY: hovered ? 1 : 0, originY: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </motion.article>
  )
}

/* ─── CARD WIDE — 2-col span, horizontal layout ─────────────── */
function CardWide({ card, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      className="group relative col-span-1 overflow-hidden bg-novaderm-brown img-shine sm:col-span-2 lg:col-span-2"
      style={{ height: 300, ...IMG_CORNERS }}
      {...fadeUp(index * 0.06)}
      onMouseLeave={() => setHovered(false)}
      onMouseEnter={() => setHovered(true)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 700)}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
    >
      {/* right image */}
      <motion.img
        src={card.image} alt={card.title}
        className="absolute right-0 top-0 h-full w-[55%] object-cover"
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        loading="lazy"
      />
      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-novaderm-brown via-novaderm-brown/92 to-transparent" />

      {/* content */}
      <div className="relative flex h-full flex-col justify-between p-7 sm:p-9" style={{ maxWidth: "56%" }}>
        <div>
          <motion.span
            className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-novaderm-gold/35 bg-novaderm-gold/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-novaderm-gold"
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.25 }}
          >
            {card.badge}
          </motion.span>
          <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">{card.title}</h3>
          <p className="mt-2 text-[0.82rem] leading-relaxed text-white/50">{card.description}</p>
        </div>

        <motion.a href={card.href}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-novaderm-gold/40 px-5 py-2.5 text-sm font-semibold text-novaderm-gold transition-all duration-300 hover:bg-novaderm-gold hover:text-white hover:border-novaderm-gold"
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          Explore Treatment
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-250 group-hover:rotate-45" />
        </motion.a>
      </div>

      {/* shimmer bottom line */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-novaderm-gold via-novaderm-gold-light to-transparent"
        animate={{ scaleX: hovered ? 1 : 0, originX: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </motion.article>
  )
}

/* ─── MAIN SECTION ──────────────────────────────────────────── */
export default function Services() {
  const { badge, headline, description, ctaText, ctaHref, cards } = siteContent.services
  const headerRef = useReveal({ rootMargin: "-40px 0px" })
  const cardsRef  = useReveal({ rootMargin: "-30px 0px", threshold: 0.05 })
  const statsRef  = useReveal({ rootMargin: "-20px 0px" })

  // Layout: Reveal | Split | Reveal | Wide(2col) | Split
  const layout = [
    { Component: CardReveal },
    { Component: CardSplit  },
    { Component: CardReveal },
    { Component: CardWide   },
    { Component: CardSplit  },
  ]

  return (
    <section id="services" className="relative overflow-hidden bg-[#0c0806] py-20 lg:py-28">

      {/* ── Atmospheric bg ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-48 top-16 h-[600px] w-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(193,154,107,0.045) 0%, transparent 70%)" }} />
        <div className="absolute -right-48 bottom-16 h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(61,46,36,0.6) 0%, transparent 70%)" }} />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">

        {/* ── Section header ── */}
        <div ref={headerRef} className="mb-14 grid gap-6 sm:grid-cols-2 sm:items-end lg:mb-20">
          <div className="flex flex-col gap-4">
            <span className="reveal reveal-up reveal-duration-500 reveal-delay-0 inline-flex w-fit items-center gap-2 rounded-full border border-novaderm-gold/30 bg-novaderm-gold/[0.08] px-4 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-novaderm-gold opacity-55" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-novaderm-gold" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-novaderm-gold">{badge}</span>
            </span>

            <TextReveal
              as="h2"
              className="reveal reveal-up reveal-duration-600 reveal-delay-1 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-[1.14]"
              delay={60}
              stagger={55}
            >
              {headline}
            </TextReveal>

            <motion.div
              className="reveal reveal-fade reveal-duration-700 reveal-delay-2 h-px w-20 bg-gradient-to-r from-novaderm-gold to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.18 }}
            />
          </div>

          <div className="reveal reveal-up reveal-duration-600 reveal-delay-2 flex flex-col items-start gap-4 sm:items-end">
            <p className="max-w-[280px] text-sm leading-relaxed text-white/40 sm:text-right">{description}</p>
            <motion.a href={ctaHref} className="group inline-flex items-center gap-1"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <span className="rounded-full bg-novaderm-gold px-5 py-2.5 text-[13px] font-semibold text-white transition-colors duration-250 group-hover:bg-novaderm-gold-dark">
                {ctaText}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-novaderm-gold/40 text-novaderm-gold transition-all duration-250 group-hover:rotate-45 group-hover:bg-novaderm-gold group-hover:text-white">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </motion.a>
          </div>
        </div>

        {/* ── Divider ── */}
        <motion.div
          className="mb-10 h-px bg-gradient-to-r from-transparent via-novaderm-gold/18 to-transparent"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.1 }}
        />

        {/* ── Cards grid — reveal container ── */}
        <div ref={cardsRef} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const { Component } = layout[i] ?? { Component: CardReveal }
            return (
              <div key={card.title}
                className={`reveal reveal-scale reveal-duration-600 reveal-delay-${Math.min(i, 4)}`}>
                <Component card={card} index={i} />
              </div>
            )
          })}
        </div>

        {/* ── Bottom stats bar ── */}
        <div ref={statsRef}
          className="reveal reveal-up reveal-duration-600 reveal-delay-0 mt-14 grid grid-cols-2 gap-4 rounded-[1.5rem] border border-white/[0.06] bg-white/[0.025] p-6 sm:grid-cols-4 sm:p-8">
          {[
            { value: "6+",    label: "Specialised Treatments"  },
            { value: "98%",   label: "Treatment Effectiveness" },
            { value: "3.5K+", label: "Patients Treated"        },
            { value: "4.9★",  label: "Average Rating"          },
          ].map((stat, i) => (
            <div key={stat.label}
              className={`reveal reveal-up reveal-duration-500 reveal-delay-${i} flex flex-col items-center gap-1 text-center`}>
              <span className="text-2xl font-bold text-novaderm-gold sm:text-3xl">{stat.value}</span>
              <span className="text-[11px] uppercase tracking-wider text-white/35">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
