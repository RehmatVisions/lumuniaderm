import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion"

import asian1 from "../../assets/asian1.jpg"
import asian2 from "../../assets/asian2.jpg"
import asian3 from "../../assets/asian3.jpg"
import doc1   from "../../assets/doctor1.jpg"
import doc2   from "../../assets/doctor2.jpg"
import doc3   from "../../assets/girldoctor3.jpg"

const EASE      = [0.25, 0.46, 0.45, 0.94]
const EASE_EXPO = [0.16, 1,    0.3, 1]

/* ─── Doctor data ────────────────────────────────────────────── */
const DOCTORS = [
  {
    id: 1,
    name:    "Dr. Sarah Al-Rashid",
    title:   "Founder & Lead Dermatologist",
    qual:    "MBBS · FCPS Dermatology · Fellowship (USA)",
    image:   doc1,
    accent:  "#c19a6b",
    tag:     "15+ Years Experience",
    about:   "Dr. Sarah founded NovaDerm on a singular belief — that medical-grade skincare should be accessible, honest, and deeply personalised. She personally oversees every complex case, blending international training with an innate understanding of South Asian skin biology.",
    approach: [
      { step: "01", title: "Skin Assessment",    desc: "In-depth consultation covering skin type, history, lifestyle, and goals before any treatment is discussed." },
      { step: "02", title: "Personalised Plan",  desc: "A tailored protocol designed exclusively for your skin — no generic packages, no one-size-fits-all." },
      { step: "03", title: "Ongoing Support",    desc: "Post-treatment follow-ups and WhatsApp access ensure results are maintained and adjusted over time." },
    ],
    specialties: ["Anti-Aging", "Laser Resurfacing", "Skin Rejuvenation", "Dermal Fillers"],
    stats: [{ v: "15+", l: "Years" }, { v: "4.9★", l: "Rating" }, { v: "3K+", l: "Patients" }],
  },
  {
    id: 2,
    name:    "Dr. Aisha Malik",
    title:   "Senior Aesthetic Physician",
    qual:    "MBBS · MSc Aesthetic Medicine (London) · Board Certified",
    image:   doc2,
    accent:  "#b89060",
    tag:     "8,000+ Procedures",
    about:   "Dr. Aisha is NovaDerm's lead injector — renowned for results that enhance rather than alter. Her philosophy is rooted in restraint: every treatment must look completely natural. She has performed over 8,000 aesthetic procedures with zero serious complications.",
    approach: [
      { step: "01", title: "Facial Mapping",     desc: "Precise analysis of facial proportions and volume loss to plan enhancements that harmonise rather than change." },
      { step: "02", title: "Conservative Dosing", desc: "Strategic, minimal-dose injections for a refreshed, natural result — always easy to build upon gradually." },
      { step: "03", title: "2-Week Review",       desc: "A complimentary follow-up at two weeks ensures the result is exactly what was envisioned together." },
    ],
    specialties: ["Botox", "Dermal Fillers", "Thread Lifts", "PRP Therapy", "Lip Enhancement"],
    stats: [{ v: "8K+", l: "Procedures" }, { v: "0",    l: "Serious Complications" }, { v: "12+", l: "Years" }],
  },
  {
    id: 3,
    name:    "Dr. Zara Hassan",
    title:   "Laser & Pigmentation Specialist",
    qual:    "MBBS · Diploma Dermatology · Dubai · Fellowship Laser Medicine",
    image:   doc3,
    accent:  "#c8a870",
    tag:     "5,000+ Laser Procedures",
    about:   "Dr. Zara is one of Pakistan's most experienced laser specialists, with particular expertise in treating pigmentation and hair removal across all South Asian skin tones. Her precision-calibrated approach has made her the go-to physician for patients who have struggled with results elsewhere.",
    approach: [
      { step: "01", title: "Skin Tone Analysis",  desc: "Fitzpatrick classification and detailed assessment to select the correct laser wavelength and energy settings." },
      { step: "02", title: "Patch Test Protocol", desc: "Every new patient receives a supervised patch test before full treatment — safety is never compromised for speed." },
      { step: "03", title: "Progressive Results",  desc: "Staged treatment sessions spaced for maximum efficacy, monitored with clinical photography at each visit." },
    ],
    specialties: ["Laser Hair Removal", "Melasma", "Chemical Peels", "IPL Phototherapy", "Pigmentation Correction"],
    stats: [{ v: "5K+", l: "Laser Sessions" }, { v: "All", l: "Skin Tones" }, { v: "98%", l: "Satisfaction" }],
  },
]

/* ─── Floating particles ─────────────────────────────────────── */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: 5 + (i * 4.7) % 90,
  y: 5 + (i * 7.3) % 90,
  size: 1.5 + (i % 3) * 1,
  dur: 5 + (i % 4) * 2,
  delay: (i % 5) * 1.1,
}))

function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
            background: "rgba(193,154,107,0.35)" }}
          animate={{ y: [0, -18, 0], opacity: [0.1, 0.55, 0.1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

/* ─── Shine sweep on hover ───────────────────────────────────── */
function ShineSweep({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="shine"
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 9,
            background: "linear-gradient(115deg,transparent 22%,rgba(255,255,255,0.10) 43%,rgba(198,148,89,0.18) 50%,rgba(255,255,255,0.10) 57%,transparent 78%)",
          }}
          initial={{ x: "-140%", skewX: -10 }}
          animate={{ x: "140%" }}
          exit={{}}
          transition={{ duration: 0.7, ease: EASE }}
        />
      )}
    </AnimatePresence>
  )
}

/* ─── Approach step card ─────────────────────────────────────── */
function StepCard({ step, index, accent, inView }) {
  return (
    <motion.div
      className="relative flex flex-col gap-2 rounded-2xl p-4"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.55 + index * 0.1, ease: EASE_EXPO }}
      whileHover={{ background: "rgba(255,255,255,0.055)", borderColor: `${accent}35`,
        transition: { duration: 0.22 } }}
    >
      {/* step number circle */}
      <div className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold"
        style={{ background: `${accent}18`, border: `1.5px solid ${accent}45`, color: accent }}>
        {step.step}
      </div>
      <p className="text-[13px] font-semibold text-white/90">{step.title}</p>
      <p className="text-[11.5px] font-light leading-relaxed text-white/40">{step.desc}</p>
    </motion.div>
  )
}

/* ─── Single doctor featured card ───────────────────────────── */
function DoctorCard({ doc, index }) {
  const ref       = useRef(null)
  const inView    = useInView(ref, { once: true, margin: "-80px" })
  const [hovered, setHovered] = useState(false)
  const isEven    = index % 2 === 0   // alternate layout direction

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-[2rem]"
      style={{ background: "linear-gradient(145deg,#0f0c08 0%,#1a1408 100%)", isolation: "isolate" }}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: EASE_EXPO }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* animated border glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[2rem]"
        animate={{ boxShadow: hovered
          ? `inset 0 0 0 1.5px ${doc.accent}55, 0 30px 80px ${doc.accent}14`
          : `inset 0 0 0 1px rgba(255,255,255,0.06)` }}
        transition={{ duration: 0.35 }}
      />

      {/* ambient glow blob */}
      <div className="pointer-events-none absolute"
        style={{ width: 350, height: 350, borderRadius: "50%",
          background: `radial-gradient(circle, ${doc.accent}10 0%, transparent 70%)`,
          [isEven ? "left" : "right"]: -80, top: "50%", transform: "translateY(-50%)" }}
        aria-hidden="true" />

      <div className={`flex flex-col lg:flex-row ${!isEven ? "lg:flex-row-reverse" : ""} gap-0`}>

        {/* ── LEFT / RIGHT — image column ── */}
        <div className="relative w-full flex-shrink-0 overflow-hidden lg:w-[340px] xl:w-[380px]"
          style={{ minHeight: 420, borderRadius: isEven ? "2rem 0 0 2rem" : "0 2rem 2rem 0" }}>
          <motion.img
            src={doc.image}
            alt={doc.name}
            className="h-full w-full object-cover object-top"
            style={{ minHeight: 420 }}
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            loading="lazy"
            decoding="async"
          />
          {/* gradient */}
          <div className="pointer-events-none absolute inset-0"
            style={{ background: isEven
              ? "linear-gradient(to right,rgba(10,7,3,0.0) 60%,rgba(10,7,3,0.85) 100%), linear-gradient(to top,rgba(10,7,3,0.7) 0%,transparent 40%)"
              : "linear-gradient(to left,rgba(10,7,3,0.0) 60%,rgba(10,7,3,0.85) 100%), linear-gradient(to top,rgba(10,7,3,0.7) 0%,transparent 40%)"
            }} />
          <ShineSweep active={hovered} />

          {/* tag badge top */}
          <motion.div
            className="absolute left-4 top-4 rounded-full px-3 py-1.5"
            style={{ background: "rgba(10,7,3,0.80)", border: `1px solid ${doc.accent}44`,
              backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
            animate={{ y: hovered ? -2 : 0 }} transition={{ duration: 0.3 }}>
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: doc.accent }}>
              {doc.tag}
            </span>
          </motion.div>

          {/* stat pills bottom of image */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            {doc.stats.map((s, i) => (
              <motion.div key={i}
                className="flex flex-1 flex-col items-center rounded-xl py-2"
                style={{ background: "rgba(10,7,3,0.78)", border: `1px solid ${doc.accent}33`,
                  backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease: EASE }}>
                <span className="text-sm font-bold leading-tight" style={{ color: doc.accent }}>{s.v}</span>
                <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-wider text-white/40">{s.l}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── RIGHT / LEFT — content column ── */}
        <div className="flex flex-1 flex-col justify-center gap-5 px-7 py-8 lg:px-10">

          {/* name + title */}
          <div>
            <motion.p
              className="mb-1.5 text-[10.5px] font-bold uppercase tracking-[0.18em]"
              style={{ color: doc.accent }}
              initial={{ opacity: 0, x: isEven ? 20 : -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2, ease: EASE }}>
              {doc.title}
            </motion.p>
            <motion.h3
              className="font-serif text-white"
              style={{ fontSize: "clamp(1.45rem,2.5vw,1.9rem)", fontWeight: 500, lineHeight: 1.15 }}
              initial={{ opacity: 0, x: isEven ? 24 : -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE_EXPO }}>
              {doc.name}
            </motion.h3>
            <motion.p
              className="mt-1.5 text-[11px] text-white/30"
              style={{ letterSpacing: "0.04em" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}>
              {doc.qual}
            </motion.p>
          </div>

          {/* gold divider */}
          <motion.div className="h-px"
            style={{ background: `linear-gradient(to right,${doc.accent}55,transparent)` }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }} />

          {/* about text */}
          <motion.p
            className="text-[0.82rem] font-light leading-[1.75] text-white/50"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.38, ease: EASE }}>
            {doc.about}
          </motion.p>

          {/* specialties */}
          <motion.div
            className="flex flex-wrap gap-1.5"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.44, ease: EASE }}>
            {doc.specialties.map(s => (
              <span key={s}
                className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: `${doc.accent}14`, border: `1px solid ${doc.accent}40`, color: doc.accent }}>
                {s}
              </span>
            ))}
          </motion.div>

          {/* approach heading */}
          <motion.p
            className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/35"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.48 }}>
            Approach to Care
          </motion.p>

          {/* 3 step cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {doc.approach.map((step, i) => (
              <StepCard key={step.step} step={step} index={i} accent={doc.accent} inView={inView} />
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="#contact"
            className="inline-flex w-fit items-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-white"
            style={{ background: `linear-gradient(135deg,${doc.accent} 0%,#8a6745 100%)`,
              boxShadow: `0 4px 20px ${doc.accent}30` }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
            whileHover={{ scale: 1.05, boxShadow: `0 8px 28px ${doc.accent}50` }}
            whileTap={{ scale: 0.96 }}>
            Book with {doc.name.split(" ")[1]}
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
              <path fillRule="evenodd" d="M8.293 2.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L11.586 9H2a1 1 0 110-2h9.586L8.293 3.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </motion.a>

        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main export ────────────────────────────────────────────── */
export default function DoctorsSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])

  return (
    <section
      id="doctors"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#080604", paddingTop: 110, paddingBottom: 120 }}
    >
      <Particles />

      {/* ambient orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-60 top-1/3 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(193,154,107,0.06) 0%,transparent 65%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-60 bottom-1/4 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(193,154,107,0.05) 0%,transparent 65%)" }} />

      {/* parallax top line */}
      <motion.div aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(193,154,107,0.4) 40%,rgba(212,176,138,0.65) 50%,rgba(193,154,107,0.4) 60%,transparent)", y: bgY }} />

      <div className="relative mx-auto max-w-[1260px] px-4 sm:px-6 lg:px-10">

        {/* ── Section header ── */}
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.div
            className="mb-5 inline-flex items-center gap-2.5 rounded-full px-5 py-2"
            style={{ background: "rgba(193,154,107,0.07)", border: "1px solid rgba(193,154,107,0.20)" }}
            initial={{ opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}>
            <motion.span className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#c19a6b" }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: "rgba(193,154,107,0.80)" }}>
              Our Medical Team
            </span>
            <motion.span className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#c19a6b" }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, delay: 1, repeat: Infinity }} />
          </motion.div>

          <motion.h2
            className="font-serif text-white"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, lineHeight: 1.13 }}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_EXPO }}>
            The Physicians Who Will
            <br />
            <span style={{ background: "linear-gradient(135deg,#c19a6b 0%,#d4b08a 50%,#a8825a 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Transform Your Skin
            </span>
          </motion.h2>

          <motion.p
            className="mt-5 max-w-[560px] text-[0.85rem] font-light leading-relaxed text-white/42"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE }}>
            Board-certified. Internationally trained. Deeply committed to your skin.
            Every doctor at NovaDerm brings both clinical excellence and genuine care to every consultation.
          </motion.p>

          <motion.div className="mt-7 h-px w-28"
            style={{ background: "linear-gradient(to right,transparent,#c19a6b 50%,transparent)" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }} />
        </div>

        {/* ── Doctor cards ── */}
        <div className="flex flex-col gap-8">
          {DOCTORS.map((doc, i) => (
            <DoctorCard key={doc.id} doc={doc} index={i} />
          ))}
        </div>

        {/* ── Bottom trust bar ── */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-10 rounded-2xl px-8 py-6"
          style={{ background: "rgba(193,154,107,0.05)", border: "1px solid rgba(193,154,107,0.12)" }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}>
          {[
            { value: "45+",    label: "Certified Specialists" },
            { value: "4.9★",  label: "Verified Patient Rating" },
            { value: "3,500+", label: "Lives Transformed" },
            { value: "12+",   label: "Years of Excellence" },
            { value: "98%",   label: "Patient Satisfaction" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="font-serif text-[1.6rem] font-semibold leading-none"
                style={{ background: "linear-gradient(135deg,#c19a6b,#d4b08a)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {s.value}
              </span>
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/32">{s.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
