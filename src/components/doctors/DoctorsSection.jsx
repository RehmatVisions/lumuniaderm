import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import TextReveal from "../ui/TextReveal"

const EASE      = [0.25, 0.46, 0.45, 0.94]
const EASE_EXPO = [0.16, 1, 0.3, 1]

const DOCTORS = [
  {
    id: 1,
    name: "Dr. Sarah Al-Rashid",
    role: "Founder & Lead Dermatologist",
    qual: "MBBS · FCPS Dermatology · Fellowship USA",
    specialties: ["Anti-Aging", "Laser Resurfacing", "Skin Rejuvenation"],
    focus: "Dr. Sarah believes every patient deserves a treatment plan built around their unique biology. She leads all complex cases personally, combining 15 years of clinical mastery with the latest evidence-based protocols.",
    stat: { value: "15+", label: "Years Experience" },
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=720&fit=crop&crop=face",
    accent: "#c19a6b",
  },
  {
    id: 2,
    name: "Dr. Aisha Malik",
    role: "Senior Aesthetic Physician",
    qual: "MBBS · MSc Aesthetic Medicine · London",
    specialties: ["Botox & Fillers", "Thread Lifts", "PRP Therapy"],
    focus: "With precision as her philosophy, Dr. Aisha specialises in natural-looking aesthetic enhancements. Her approach: listen deeply, treat conservatively, and always prioritise the patient's comfort over trends.",
    stat: { value: "8K+", label: "Procedures Done" },
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=720&fit=crop&crop=face",
    accent: "#b08a5a",
  },
  {
    id: 3,
    name: "Dr. Zara Hassan",
    role: "Laser & Pigmentation Specialist",
    qual: "MBBS · Diploma Dermatology · Dubai",
    specialties: ["Laser Hair Removal", "Melasma", "Chemical Peels"],
    focus: "Dr. Zara's passion lies in restoring confidence through skin clarity. She has performed over 5,000 laser procedures and is renowned for her results across all skin tones including Asian and darker complexions.",
    stat: { value: "5K+", label: "Laser Procedures" },
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&h=720&fit=crop&crop=face",
    accent: "#a07848",
  },
  {
    id: 4,
    name: "Dr. Nadia Qureshi",
    role: "Acne & Scar Revision Expert",
    qual: "MBBS · MCPS Dermatology · Board Certified",
    specialties: ["Acne Therapy", "Scar Revision", "Microneedling RF"],
    focus: "Dr. Nadia understands the emotional weight of persistent acne and scarring. She takes time to understand each patient's history, then designs multi-phase treatment journeys that address root causes, not just surface symptoms.",
    stat: { value: "98%", label: "Patient Satisfaction" },
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600&h=720&fit=crop&crop=face",
    accent: "#c8a870",
  },
]

// ── Floating particle background ──────────────────────────────
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1.5 + Math.random() * 3,
    dur: 4 + Math.random() * 6,
    delay: Math.random() * 4,
  }))
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map(p => (
        <motion.div key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
            background: "rgba(193,154,107,0.45)" }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

// ── Shine sweep on hover ───────────────────────────────────────
function ShineSweep({ trigger }) {
  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(115deg,transparent 25%,rgba(255,255,255,0.13) 45%,rgba(198,148,89,0.18) 50%,rgba(255,255,255,0.13) 55%,transparent 75%)", zIndex: 10 }}
          initial={{ x: "-140%", skewX: "-12deg" }}
          animate={{ x: "140%" }}
          exit={{ x: "140%" }}
          transition={{ duration: 0.65, ease: EASE }}
        />
      )}
    </AnimatePresence>
  )
}

// ── Single Doctor Card ────────────────────────────────────────
function DoctorCard({ doc, index }) {
  const [hovered, setHovered] = useState(false)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col overflow-hidden"
      style={{ borderRadius: "1.8rem", background: "#0e0b08", cursor: "default" }}
      initial={{ opacity: 0, y: 52, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: EASE_EXPO }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 700)}
      whileHover={{ y: -8, transition: { duration: 0.35, ease: EASE } }}
    >
      {/* ── image wrapper ── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/3.5" }}>
        <motion.img
          src={doc.image} alt={doc.name}
          className="h-full w-full object-cover object-top"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.75, ease: EASE }}
          loading="lazy"
          decoding="async"
        />
        {/* gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,7,4,0.92) 0%, rgba(10,7,4,0.30) 45%, rgba(10,7,4,0.05) 100%)" }} />
        {/* gold tint on hover */}
        <motion.div className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${doc.accent}22 0%, transparent 60%)` }}
          animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.4 }} />
        {/* shine sweep */}
        <ShineSweep trigger={hovered} />
        {/* stat badge top-right */}
        <motion.div
          className="absolute right-3 top-3 flex flex-col items-center rounded-2xl px-3 py-2"
          style={{ background: "rgba(10,7,4,0.75)", border: "1px solid rgba(193,154,107,0.28)",
            backdropFilter: "blur(8px)" }}
          animate={{ y: hovered ? -3 : 0 }} transition={{ duration: 0.3 }}>
          <span className="text-base font-bold leading-none" style={{ color: doc.accent }}>{doc.stat.value}</span>
          <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-widest text-white/50">{doc.stat.label}</span>
        </motion.div>
        {/* specialties chips — slide up on hover */}
        <motion.div
          className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 p-3"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.32 }}>
          {doc.specialties.map(s => (
            <span key={s} className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider"
              style={{ background: `${doc.accent}22`, border: `1px solid ${doc.accent}55`, color: doc.accent }}>
              {s}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── content ── */}
      <div className="relative flex flex-1 flex-col gap-3 p-5">
        {/* animated gold left bar */}
        <motion.div className="absolute left-0 top-0 w-[3px] rounded-r-full"
          style={{ background: `linear-gradient(to bottom, ${doc.accent}, transparent)` }}
          animate={{ height: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.45, ease: EASE }} />

        <div>
          <h3 className="font-serif text-[1.05rem] font-semibold leading-snug text-white">{doc.name}</h3>
          <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest" style={{ color: doc.accent }}>{doc.role}</p>
          <p className="mt-1 text-[10px] text-white/35" style={{ letterSpacing: "0.04em" }}>{doc.qual}</p>
        </div>

        {/* divider */}
        <motion.div className="h-px w-full"
          style={{ background: `linear-gradient(to right, ${doc.accent}40, transparent)` }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 + index * 0.1 }} />

        {/* focus text */}
        <p className="text-[0.78rem] font-light leading-relaxed text-white/50">{doc.focus}</p>

        {/* CTA */}
        <motion.a href="#contact"
          className="mt-auto inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white"
          style={{ background: `linear-gradient(135deg, ${doc.accent} 0%, #8a6745 100%)`,
            boxShadow: `0 4px 18px ${doc.accent}35` }}
          whileHover={{ scale: 1.06, boxShadow: `0 6px 26px ${doc.accent}55` }}
          whileTap={{ scale: 0.96 }}>
          Book Consultation
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </motion.a>
      </div>

      {/* border glow */}
      <motion.div className="pointer-events-none absolute inset-0"
        style={{ borderRadius: "1.8rem" }}
        animate={{ boxShadow: hovered ? `inset 0 0 0 1.5px ${doc.accent}66, 0 0 40px ${doc.accent}18` : "inset 0 0 0 1px rgba(255,255,255,0.05)" }}
        transition={{ duration: 0.28 }} />
    </motion.div>
  )
}
