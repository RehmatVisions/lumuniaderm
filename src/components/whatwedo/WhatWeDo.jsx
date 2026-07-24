import { motion } from "framer-motion"
import { useState } from "react"
import { siteContent } from "../../data/siteContent"

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-50px" },
  transition:  { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

/* ─── Play button ────────────────────────────────────────────── */
function PlayCircle() {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.button
      aria-label="Watch video"
      className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full"
      style={{ background: "rgba(198,148,89,0.92)", backdropFilter: "blur(8px)" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.93 }}
    >
      {hovered && [0, 1].map((i) => (
        <motion.span key={i}
          className="pointer-events-none absolute inline-flex h-full w-full rounded-full border border-[#C69459]/40"
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
      className="relative flex flex-col justify-between overflow-hidden rounded-3xl"
      style={{ background: "#1e2018", minHeight: 420 }}
      {...fadeUp(0.05)}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {/* Background image */}
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
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(10,10,8,0.88) 0%, rgba(10,10,8,0.40) 55%, rgba(10,10,8,0.15) 100%)" }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-7">
        {/* Avatar cluster */}
        <div className="flex -space-x-3">
          {[
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
          ].map((src, i) => (
            <motion.img key={i} src={src} alt=""
              className="h-11 w-11 rounded-full border-2 object-cover"
              style={{ borderColor: "#1e2018" }}
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
          <p className="mt-1 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            {stat.description}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full blur-2xl"
        style={{ background: "rgba(198,148,89,0.12)" }} />
    </motion.div>
  )
}

/* ─── CENTER IMAGE + QUOTE CARD ──────────────────────────────── */
function CenterCard({ card }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl"
      style={{ minHeight: 420 }}
      {...fadeUp(0.12)}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      <motion.img
        src={card.image} alt="Treatment"
        className="absolute inset-0 h-full w-full object-cover"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        loading="lazy"
      />
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(10,10,8,0.90) 0%, rgba(10,10,8,0.30) 50%, rgba(10,10,8,0.10) 100%)" }}
      />
      <PlayCircle />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <svg viewBox="0 0 40 30" fill="none" className="mb-3 h-6 w-6 opacity-60" style={{ color: "#C69459" }}>
          <path d="M0 30V18C0 8.4 5.2 2.8 15.6 1.2L17 4.8C11.6 6.4 8.6 10 8 15.6H14V30H0ZM22 30V18C22 8.4 27.2 2.8 37.6 1.2L39 4.8C33.6 6.4 30.6 10 30 15.6H36V30H22Z" fill="currentColor"/>
        </svg>
        <p className="text-[0.95rem] font-medium italic leading-[1.65] text-white">"{card.quote}"</p>
        <p className="mt-3 text-sm font-semibold text-white">
          {card.author} <span style={{ color: "rgba(255,255,255,0.45)" }}>/ {card.role}</span>
        </p>
      </div>
    </motion.div>
  )
}

/* ─── MAIN SECTION ───────────────────────────────────────────── */
export default function WhatWeDo() {
  const { badge, headline, stat, centerCard } = siteContent.whatWeDo

  return (
    <section id="what-we-do" className="relative overflow-hidden py-20 lg:py-28"
      style={{ background: "#282A23" }}>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ background: "rgba(198,148,89,0.05)" }} />
        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full blur-[100px]"
          style={{ background: "rgba(198,148,89,0.04)" }} />
      </div>

      <div className="relative mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
            style={{ borderColor: "rgba(198,148,89,0.35)", background: "rgba(198,148,89,0.10)" }}
            {...fadeUp(0)}
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" style={{ color: "#C69459" }} fill="currentColor">
              <path d="M8 0a1 1 0 011 1v5.586l3.95-3.95a1 1 0 111.414 1.414L10.414 8l3.95 3.95a1 1 0 01-1.414 1.414L9 9.414V15a1 1 0 11-2 0V9.414l-3.95 3.95A1 1 0 011.636 11.95L5.586 8l-3.95-3.95A1 1 0 013.05 2.636L7 6.586V1a1 1 0 011-1z"/>
            </svg>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#C69459" }}>
              {badge}
            </span>
          </motion.span>

          <motion.h2
            className="max-w-2xl font-serif font-semibold leading-[1.15] text-white"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.6rem)" }}
            {...fadeUp(0.08)}
          >
            {headline}
          </motion.h2>
        </div>

        {/* 2-col grid — stat + center image */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <StatCard   stat={stat} />
          <CenterCard card={centerCard} />
        </div>
      </div>
    </section>
  )
}
