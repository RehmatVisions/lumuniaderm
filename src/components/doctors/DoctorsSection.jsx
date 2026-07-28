import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

import doc1 from "../../assets/doctor1.jpg"
import doc2 from "../../assets/doctor2.jpg"
import doc3 from "../../assets/girldoctor3.jpg"

const EASE      = [0.25, 0.46, 0.45, 0.94]
const EASE_EXPO = [0.16, 1, 0.3, 1]

const DOCTORS = [
  {
    id: 1,
    name:     "Dr. Bilal Siddiqui",
    title:    "Founder & Lead Dermatologist",
    qual:     "MBBS · FCPS Dermatology · Fellowship (USA)",
    image:    doc1,
    accent:   "#c19a6b",
    exp:      "15+",
    expLabel: "Years",
    patients: "3K+",
    rating:   "4.9★",
    specialties: ["Anti-Aging", "Laser Resurfacing", "Skin Rejuvenation"],
    about: "Dr. Bilal founded NovaDerm on one belief — that every patient deserves a personalised, medically-sound treatment plan. He personally oversees all complex cases, blending 15 years of international dermatology training with a deep understanding of South Asian skin.",
    steps: [
      { n: "01", t: "Skin Assessment",   d: "In-depth consultation covering skin type, history and long-term goals." },
      { n: "02", t: "Personalised Plan", d: "A tailored protocol designed exclusively for your skin — no generics." },
      { n: "03", t: "Ongoing Support",   d: "Post-treatment follow-ups and WhatsApp access to maintain results." },
    ],
  },
  {
    id: 2,
    name:     "Dr. Ali Hassan",
    title:    "Senior Aesthetic Physician",
    qual:     "MBBS · MSc Aesthetic Medicine (London) · Board Certified",
    image:    doc2,
    accent:   "#b89060",
    exp:      "8K+",
    expLabel: "Procedures",
    patients: "12+",
    rating:   "4.8★",
    specialties: ["Botox & Fillers", "Thread Lifts", "PRP Therapy"],
    about: "Dr. Omar is NovaDerm's lead injector, renowned for results that enhance rather than alter. His philosophy is rooted in restraint — every procedure must look completely natural. He has performed over 8,000 aesthetic procedures with zero serious complications.",
    steps: [
      { n: "01", t: "Facial Mapping",      d: "Precise analysis of facial proportions to plan harmonious enhancements." },
      { n: "02", t: "Conservative Dosing", d: "Minimal-dose injections for a refreshed, natural look." },
      { n: "03", t: "2-Week Review",       d: "Complimentary follow-up ensures the result matches the vision." },
    ],
  },
  {
    id: 3,
    name:     "Dr. Zara khan",
    title:    "Laser & Pigmentation Specialist",
    qual:     "MBBS · Diploma Dermatology · Dubai · Fellowship Laser Medicine",
    image:    doc3,
    accent:   "#c8a870",
    exp:      "5K+",
    expLabel: "Laser Sessions",
    patients: "98%",
    rating:   "Satisfaction",
    specialties: ["Laser Hair Removal", "Melasma", "Chemical Peels"],
    about: "Dr. Zara is one of Pakistan's most experienced laser specialists, with deep expertise in pigmentation correction across all South Asian skin tones. Her precision-calibrated approach has made her the go-to physician for patients who have struggled elsewhere.",
    steps: [
      { n: "01", t: "Skin Tone Analysis",  d: "Fitzpatrick classification to select the right wavelength and energy." },
      { n: "02", t: "Patch Test Protocol", d: "Supervised patch test before full treatment — safety first, always." },
      { n: "03", t: "Progressive Results", d: "Staged sessions with clinical photography at each visit." },
    ],
  },
]

/* ── Floating particles ──────────────────────────────────────── */
const PTS = Array.from({ length: 18 }, (_, i) => ({
  id: i, x: 4 + (i * 5.3) % 92, y: 4 + (i * 7.7) % 92,
  s: 1.5 + (i % 3), dur: 5 + (i % 4) * 1.8, del: (i % 5) * 0.9,
}))
function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PTS.map(p => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s,
            background: "rgba(193,154,107,0.32)" }}
          animate={{ y: [0, -16, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  )
}

/* ── Shine sweep ─────────────────────────────────────────────── */
function Shine({ on }) {
  return (
    <AnimatePresence>
      {on && (
        <motion.div key="sh" className="pointer-events-none absolute inset-0"
          style={{ zIndex: 9, borderRadius: "inherit",
            background: "linear-gradient(115deg,transparent 22%,rgba(255,255,255,0.11) 43%,rgba(198,148,89,0.18) 50%,rgba(255,255,255,0.11) 57%,transparent 78%)" }}
          initial={{ x: "-140%", skewX: -10 }}
          animate={{ x: "140%" }}
          exit={{}}
          transition={{ duration: 0.68, ease: EASE }} />
      )}
    </AnimatePresence>
  )
}

/* ── Doctor card ─────────────────────────────────────────────── */
function DoctorCard({ doc, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-70px" })
  const [hov, setHov]         = useState(false)
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div ref={ref}
      className="flex flex-col overflow-hidden lg:flex-row"
      style={{ borderRadius: "1.8rem", background: "#0e0b08", isolation: "isolate" }}
      initial={{ opacity: 0, y: 55 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.78, delay: index * 0.12, ease: EASE_EXPO }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      {/* animated border */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ borderRadius: "1.8rem" }}
        animate={{ boxShadow: hov
          ? `inset 0 0 0 1.5px ${doc.accent}55, 0 24px 70px ${doc.accent}12`
          : "inset 0 0 0 1px rgba(255,255,255,0.06)" }}
        transition={{ duration: 0.3 }} />

      {/* ── IMAGE SIDE ───────────────────────────── */}
      <div className="relative flex-shrink-0 overflow-hidden lg:w-[300px] xl:w-[340px]"
        style={{ borderRadius: "1.8rem 0 0 1.8rem" }}>

        {/* portrait image — object-top so face shows */}
        <div className="relative h-[320px] w-full overflow-hidden lg:h-full" style={{ minHeight: 420 }}>
          <motion.img src={doc.image} alt={doc.name}
            className="absolute inset-0 h-full w-full object-cover object-top"
            animate={{ scale: hov ? 1.06 : 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            loading="lazy" decoding="async" />

          {/* overlay — only at bottom so face stays visible */}
          <div className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(8,5,2,0.88) 0%, rgba(8,5,2,0.18) 45%, rgba(8,5,2,0.0) 70%)" }} />

          {/* right-edge fade to blend with content */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{ background: "linear-gradient(to right, transparent 55%, rgba(14,11,8,0.95) 100%)" }} />

          <Shine on={hov} />

          {/* experience badge — top left */}
          <motion.div
            className="absolute left-3 top-3 flex flex-col items-center rounded-2xl px-3 py-2"
            style={{ background: "rgba(8,5,2,0.80)", border: `1px solid ${doc.accent}44`,
              backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
            animate={{ scale: hov ? 1.04 : 1, y: hov ? -2 : 0 }}
            transition={{ duration: 0.28 }}>
            <span className="text-lg font-bold leading-none" style={{ color: doc.accent }}>{doc.exp}</span>
            <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-widest text-white/40">{doc.expLabel}</span>
          </motion.div>

          {/* bottom name on mobile */}
          <div className="absolute inset-x-0 bottom-0 p-4 lg:hidden">
            <p className="font-serif text-xl font-semibold text-white">{doc.name}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: doc.accent }}>{doc.title}</p>
          </div>
        </div>
      </div>

      {/* ── CONTENT SIDE ─────────────────────────── */}
      <div className="flex flex-1 flex-col justify-center gap-4 px-7 py-7 lg:px-9 lg:py-8">

        {/* name — hidden on mobile (shown in image overlay) */}
        <div className="hidden lg:block">
          <motion.p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color: doc.accent }}
            initial={{ opacity: 0, x: 18 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.22, ease: EASE }}>
            {doc.title}
          </motion.p>
          <motion.h3 className="font-serif text-white leading-tight"
            style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.85rem)", fontWeight: 500 }}
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.27, ease: EASE_EXPO }}>
            {doc.name}
          </motion.h3>
          <motion.p className="mt-1 text-[10.5px] text-white/30" style={{ letterSpacing: "0.04em" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}>
            {doc.qual}
          </motion.p>
        </div>

        {/* gold divider */}
        <motion.div className="h-px"
          style={{ background: `linear-gradient(to right, ${doc.accent}55, transparent)` }}
          initial={{ scaleX: 0, originX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }} />

        {/* about */}
        <motion.p className="text-[0.81rem] leading-[1.8] text-white/50 font-light"
          initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.38, ease: EASE }}>
          {doc.about}
        </motion.p>

        {/* specialties */}
        <motion.div className="flex flex-wrap gap-1.5"
          initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.44, ease: EASE }}>
          {doc.specialties.map(s => (
            <span key={s} className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
              style={{ background: `${doc.accent}14`, border: `1px solid ${doc.accent}40`, color: doc.accent }}>
              {s}
            </span>
          ))}
        </motion.div>

        {/* approach label */}
        <motion.p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}>
          Approach to Care
        </motion.p>

        {/* 3 step cards */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {doc.steps.map((s, i) => (
            <motion.div key={s.n}
              className="flex flex-col gap-2 rounded-xl p-3.5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.52, delay: 0.56 + i * 0.09, ease: EASE_EXPO }}
              whileHover={{ background: "rgba(255,255,255,0.055)", borderColor: `${doc.accent}35`,
                transition: { duration: 0.2 } }}>
              <div className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold"
                style={{ background: `${doc.accent}18`, border: `1.5px solid ${doc.accent}44`, color: doc.accent }}>
                {s.n}
              </div>
              <p className="text-[12.5px] font-semibold text-white/90">{s.t}</p>
              <p className="text-[11px] font-light leading-relaxed text-white/38">{s.d}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.a href="#contact"
          className="inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-[11.5px] font-semibold uppercase tracking-wider text-white"
          style={{ background: `linear-gradient(135deg,${doc.accent} 0%,#8a6745 100%)`,
            boxShadow: `0 4px 18px ${doc.accent}30` }}
          initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.72, ease: EASE }}
          whileHover={{ scale: 1.05, boxShadow: `0 8px 28px ${doc.accent}50` }}
          whileTap={{ scale: 0.96 }}>
          Book Consultation
          <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
            <path fillRule="evenodd" d="M8.293 2.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L11.586 9H2a1 1 0 110-2h9.586L8.293 3.707a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </motion.a>
      </div>
    </motion.div>
  )   
}

/* ── Main export ─────────────────────────────────────────────── */
export default function DoctorsSection() {
  return (
    <section id="doctors" className="relative overflow-hidden"
      style={{ background: "#080604", paddingTop: 110, paddingBottom: 120 }}>

      <Particles />

      {/* ambient orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-60 top-1/3 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(193,154,107,0.06) 0%,transparent 65%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-60 bottom-1/4 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(193,154,107,0.05) 0%,transparent 65%)" }} />

      {/* top gold line */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(193,154,107,0.45) 40%,rgba(212,176,138,0.70) 50%,rgba(193,154,107,0.45) 60%,transparent)" }} />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">

        {/* ── Header ── */}
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.div
            className="mb-5 inline-flex items-center gap-2.5 rounded-full px-5 py-2"
            style={{ background: "rgba(193,154,107,0.07)", border: "1px solid rgba(193,154,107,0.20)" }}
            initial={{ opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}>
            <motion.span className="h-1.5 w-1.5 rounded-full" style={{ background: "#c19a6b" }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: "rgba(193,154,107,0.82)" }}>Our Medical Team</span>
            <motion.span className="h-1.5 w-1.5 rounded-full" style={{ background: "#c19a6b" }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, delay: 1, repeat: Infinity }} />
          </motion.div>

          <motion.h2 className="font-serif text-white"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, lineHeight: 1.13 }}
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_EXPO }}>
            The Physicians Behind
            <br />
            <span style={{ background: "linear-gradient(135deg,#c19a6b 0%,#d4b08a 50%,#a8825a 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Every Transformation
            </span>
          </motion.h2>

          <motion.p className="mt-5 max-w-[540px] text-[0.84rem] font-light leading-relaxed text-white/42"
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE }}>
            Board-certified. Internationally trained. Deeply committed to your skin.
            Every doctor at NovaDerm brings clinical excellence and genuine care to every single consultation.
          </motion.p>

          <motion.div className="mt-7 h-px w-28"
            style={{ background: "linear-gradient(to right,transparent,#c19a6b 50%,transparent)" }}
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }} />
        </div>

        {/* ── Cards ── */}
        <div className="flex flex-col gap-7">
          {DOCTORS.map((doc, i) => (
            <DoctorCard key={doc.id} doc={doc} index={i} />
          ))}
        </div>

        {/* ── Trust bar ── */}
        <motion.div
          className="mt-14 flex flex-wrap items-center justify-center gap-8 rounded-2xl px-8 py-6"
          style={{ background: "rgba(193,154,107,0.05)", border: "1px solid rgba(193,154,107,0.12)" }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}>
          {[
            { v: "45+",    l: "Certified Specialists" },
            { v: "4.9★",  l: "Verified Patient Rating" },
            { v: "3,500+", l: "Lives Transformed" },
            { v: "12+",   l: "Years of Excellence" },
            { v: "98%",   l: "Patient Satisfaction" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="font-serif text-[1.55rem] font-semibold leading-none"
                style={{ background: "linear-gradient(135deg,#c19a6b,#d4b08a)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {s.v}
              </span>
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.15em] text-white/30">{s.l}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
