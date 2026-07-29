import { motion } from "framer-motion"
import { useState } from "react"
import asian1 from "../../assets/asian1.jpg"
import asian2 from "../../assets/asian2.jpg"
import asian3 from "../../assets/asian3.jpg"
import { siteContent } from "../../data/siteContent"
import { useReveal } from "../../hooks/useReveal"
import TextReveal from "../ui/TextReveal"

const IMG_CORNERS = { borderRadius: "2rem 0.5rem 2rem 0.5rem" }

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-50px" },
  transition:  { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

/* ─── Play button ────────────────────────────────────────────── */
function PlayCircle() {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.button
      aria-label="Watch video"
      className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full"
      style={{ background: "rgba(196,97,74,0.92)", backdropFilter: "blur(8px)" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.93 }}
    >
      {hovered && [0, 1].map((i) => (
        <motion.span key={i}
          className="pointer-events-none absolute inline-flex h-full w-full rounded-full border border-[#C4614A]/40"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 1.1, delay: i * 0.4, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6 translate-x-0.5">
        <path d="M8 5v14l11-7z" />
      </svg>
    </motion.button>
  )
}

/* ─── LEFT STAT CARD ─────────────────────────────────────────── */
function StatCard({ stat }) {
  return (
    <motion.div
      className="relative flex flex-col justify-between overflow-hidden img-shine"
      style={{ background: "#C4614A", minHeight: 420, ...IMG_CORNERS }}
      {...fadeUp(0.05)}
      whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(196,97,74,0.35)", transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
    >
      {stat.image && (
        <>
          <motion.img
            src={stat.image}
            alt="Laser treatment"
            className="absolute inset-0 h-full w-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            loading="lazy"
          />
          
        </>
      )}

      <div className="relative z-10 flex flex-col justify-between h-full p-7">
        <div className="flex -space-x-3">
          {[asian1, asian2, asian3].map((src, i) => (
            <motion.img key={i} src={src} alt=""
              className="h-11 w-11 rounded-full border-2 object-cover"
              style={{ borderColor: "#C4614A" }}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
            />
          ))}
        </div>

        <div className="mt-auto pt-8">
          <motion.p
            className="font-serif text-[3.2rem] font-bold leading-none text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {stat.value}
          </motion.p>
          <p className="mt-2 text-base font-semibold text-white">{stat.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-white/75">
            {stat.description}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full blur-2xl"
        style={{ background: "rgba(255,255,255,0.10)" }} />
    </motion.div>
  )
}

/* ─── CENTER IMAGE + QUOTE CARD ──────────────────────────────── */
function CenterCard({ card }) {
  return (
    <motion.div
      className="relative overflow-hidden img-shine"
      style={{ minHeight: 420, ...IMG_CORNERS }}
      {...fadeUp(0.12)}
      whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(196,97,74,0.25)", transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.img
        src={card.image} alt="Treatment"
        className="absolute inset-0 h-full w-full object-cover"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        loading="lazy"
      />
      
      <PlayCircle />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <svg viewBox="0 0 40 30" fill="none" className="mb-3 h-6 w-6 opacity-70" style={{ color: "#FCEEE7" }}>
          <path d="M0 30V18C0 8.4 5.2 2.8 15.6 1.2L17 4.8C11.6 6.4 8.6 10 8 15.6H14V30H0ZM22 30V18C22 8.4 27.2 2.8 37.6 1.2L39 4.8C33.6 6.4 30.6 10 30 15.6H36V30H22Z" fill="currentColor"/>
        </svg>
        <p className="text-[0.95rem] font-medium italic leading-[1.65] text-white">"{card.quote}"</p>
        <p className="mt-3 text-sm font-semibold text-white">
          {card.author} <span style={{ color: "rgba(255,255,255,0.60)" }}>/ {card.role}</span>
        </p>
      </div>
    </motion.div>
  )
}

/* ─── MAIN SECTION ───────────────────────────────────────────── */
export default function WhatWeDo() {
  const { badge, headline, stat, centerCard } = siteContent.whatWeDo
  const sectionRef = useReveal({ rootMargin: "-40px 0px" })

  return (
    <section id="what-we-do" className="relative overflow-hidden py-20 lg:py-28"
      style={{ background: "transparent" }}>

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full"
          style={{ background: "rgba(196,97,74,0.08)" }} />
        <div className="absolute -right-40 bottom-0 h-[300px] w-[300px] rounded-full"
          style={{ background: "rgba(245,213,192,0.50)" }} />
      </div>

      <div ref={sectionRef} className="relative mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <span className="reveal reveal-up reveal-duration-500 reveal-delay-0 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
            style={{ borderColor: "rgba(196,97,74,0.35)", background: "rgba(196,97,74,0.10)" }}>
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" style={{ color: "#C4614A" }} fill="currentColor">
              <path d="M8 0a1 1 0 011 1v5.586l3.95-3.95a1 1 0 111.414 1.414L10.414 8l3.95 3.95a1 1 0 01-1.414 1.414L9 9.414V15a1 1 0 11-2 0V9.414l-3.95 3.95A1 1 0 011.636 11.95L5.586 8l-3.95-3.95A1 1 0 013.05 2.636L7 6.586V1a1 1 0 011-1z"/>
            </svg>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#C4614A" }}>
              {badge}
            </span>
          </span>

          <TextReveal
            as="h2"
            className="reveal reveal-up reveal-duration-600 reveal-delay-1 max-w-2xl font-serif font-semibold leading-[1.15] text-novaderm-brown"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.6rem)" }}
            delay={60}
            stagger={55}
          >
            {headline}
          </TextReveal>
        </div>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="reveal reveal-left reveal-duration-700 reveal-delay-0">
            <StatCard stat={stat} />
          </div>
          <div className="reveal reveal-right reveal-duration-700 reveal-delay-1">
            <CenterCard card={centerCard} />
          </div>
        </div>
      </div>
    </section>
  )
}
