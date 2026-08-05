/**
 * DoctorProfilePage — Full doctor profile
 *
 * TO UPDATE DOCTOR INFO:
 * Edit the DOCTOR object below — all sections update automatically.
 */

import { motion } from "framer-motion"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PageLayout from "../components/layout/PageLayout"
import ateeqImg from "../assets/doctorsimages/ateeqs.png"
import sectionBg from "../assets/backgroundall/bacrkound.png"

const EASE_EXPO = [0.16, 1, 0.3, 1]

// ── Edit doctor info here ──────────────────────────────────────
const DOCTOR = {
  name:        "Dr. Ateeq",
  title:       "Consultant Dermatologist & Aesthetic Specialist",
  badge:       "Board-Certified Dermatologist",
  tagline:     "Combining advanced dermatological knowledge with a personalized approach, Dr. Ateeq provides evidence-based skin treatments focused on healthy, natural, and confident results.",
  qual1:       "MBBS · MD Dermatology",
  qual2:       "8+ Years Experience",
  image:       ateeqImg,
  bookHref:    "/#contact",

  philosophy: {
    heading: "Care that begins with listening",
    body1:   "Every consultation starts with a detailed conversation about your concerns, medical history, lifestyle and expectations.",
    body2:   "Dr. Ateeq explains suitable options clearly, recommends only what is clinically appropriate, and builds a plan at a pace that feels comfortable.",
    pillars: [
      {
        icon: "ear",
        title: "Listens first",
        desc:  "Time to understand your skin and what matters to you.",
      },
      {
        icon: "speech",
        title: "Explains clearly",
        desc:  "Honest guidance on options, outcomes and aftercare.",
      },
      {
        icon: "heart",
        title: "Treats thoughtfully",
        desc:  "Conservative, tailored care focused on natural results.",
      },
    ],
  },

  journey: [
    { step: "01", title: "Consultation",      desc: "Skin assessment, concerns, history and goals."             },
    { step: "02", title: "Personalised plan", desc: "A clear, evidence-led approach tailored to you."           },
    { step: "03", title: "Treatment & follow up", desc: "Careful treatment, aftercare guidance and progress review." },
  ],

  expertise: [
    { title: "Medical Dermatology",  desc: "Assessment and management of common skin concerns."                    },
    { title: "Acne & Scarring",      desc: "Individual plans for active acne, marks and textural scarring."        },
    { title: "Laser Treatments",     desc: "Technology-led care selected for your skin type and goals."            },
    { title: "Skin Rejuvenation",    desc: "Treatments designed to refresh tone, texture and radiance."            },
    { title: "Anti-Aging Care",      desc: "Subtle, balanced approaches that preserve natural expression."         },
  ],

  expect: [
    "Unhurried, respectful consultations",
    "Clear explanation before every procedure",
    "Real expectations and transparent recommendations",
    "Detailed aftercare and appropriate follow-up",
  ],
}

// ── Small SVG Icons ────────────────────────────────────────────
function PillarIcon({ type }) {
  const s = { width: 22, height: 22, stroke: "#C4614A", fill: "none", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }
  if (type === "ear")    return <svg viewBox="0 0 24 24" style={s}><path d="M6 10a6 6 0 0112 0c0 3.5-2.5 6-4 8a2 2 0 01-3.9-.5"/><path d="M10 10a2 2 0 014 0c0 1.5-1.5 3-1.5 5"/></svg>
  if (type === "speech") return <svg viewBox="0 0 24 24" style={s}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
  if (type === "heart")  return <svg viewBox="0 0 24 24" style={s}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
  return null
}

// ── Leaf SVG ───────────────────────────────────────────────────
function Leaf({ style }) {
  return (
    <svg viewBox="0 0 120 260" aria-hidden="true" style={{ pointerEvents: "none", ...style }}>
      <path d="M60 250 Q57 175 54 112 Q51 55 60 10" stroke="#C4614A" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {[200, 158, 120, 86].map((y, i) => (
        <g key={i}>
          <path d={`M${59 - i} ${y} Q${33 - i} ${y - 13} ${22 - i} ${y - 42} Q${40} ${y - 36} ${59 - i} ${y - 25}`} stroke="#C4614A" strokeWidth="0.9" fill="rgba(196,97,74,0.12)" strokeLinecap="round" />
          <path d={`M${61 + i} ${y - 5} Q${87 + i} ${y - 20} ${96 + i} ${y - 49} Q${78} ${y - 42} ${61 + i} ${y - 32}`} stroke="#C4614A" strokeWidth="0.9" fill="rgba(196,97,74,0.08)" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  )
}

// ── Section badge ──────────────────────────────────────────────
function Badge({ text }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
      style={{ borderColor: "rgba(196,97,74,0.30)", color: "#C4614A", background: "rgba(196,97,74,0.06)" }}>
      <span className="h-1.5 w-1.5 rounded-full bg-[#C4614A]" />
      {text}
    </div>
  )
}

// ── Hero Banner — Image-2 style ───────────────────────────────
// Full-width banner: left = text content, right = doctor photo
// with organic blob background, circular badge top-right, leaf decor
function HeroBanner({ doc, onBook }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fdf3ec 0%, #fae8dc 40%, #f5ddd0 100%)",
        minHeight: "clamp(480px, 60vw, 620px)",
      }}
    >
      {/* ── Botanical leaf decorations ── */}
      {/* Left leaf */}
      <svg aria-hidden="true" viewBox="0 0 160 340" fill="none"
        className="pointer-events-none absolute"
        style={{ left: 0, top: 0, width: "clamp(90px,12vw,160px)", opacity: 0.22, zIndex: 1 }}>
        <path d="M80 330 Q77 230 74 148 Q71 72 80 12" stroke="#C4614A" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        {[270,212,160,112].map((y,i)=>(
          <g key={i}>
            <path d={`M${78-i} ${y} Q${46-i} ${y-18} ${30-i} ${y-56} Q${53} ${y-48} ${78-i} ${y-34}`} stroke="#C4614A" strokeWidth="1" fill="rgba(196,97,74,0.13)" strokeLinecap="round"/>
            <path d={`M${82+i} ${y-7} Q${114+i} ${y-26} ${130+i} ${y-64} Q${107} ${y-54} ${82+i} ${y-42}`} stroke="#C4614A" strokeWidth="1" fill="rgba(196,97,74,0.09)" strokeLinecap="round"/>
          </g>
        ))}
      </svg>

      {/* Right-side faint leaf */}
      <svg aria-hidden="true" viewBox="0 0 160 340" fill="none"
        className="pointer-events-none absolute"
        style={{ right: "clamp(360px,40vw,560px)", bottom: 0, width: "clamp(70px,9vw,130px)", opacity: 0.13, zIndex: 1, transform: "scaleX(-1) rotate(15deg)" }}>
        <path d="M80 330 Q77 230 74 148 Q71 72 80 12" stroke="#C4614A" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        {[270,212,160].map((y,i)=>(
          <g key={i}>
            <path d={`M${78-i} ${y} Q${46-i} ${y-18} ${30-i} ${y-56} Q${53} ${y-48} ${78-i} ${y-34}`} stroke="#C4614A" strokeWidth="1" fill="rgba(196,97,74,0.13)" strokeLinecap="round"/>
            <path d={`M${82+i} ${y-7} Q${114+i} ${y-26} ${130+i} ${y-64} Q${107} ${y-54} ${82+i} ${y-42}`} stroke="#C4614A" strokeWidth="1" fill="rgba(196,97,74,0.09)" strokeLinecap="round"/>
          </g>
        ))}
      </svg>

      {/* ── Main two-column layout ── */}
      <div
        className="relative hero-banner-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          maxWidth: 1300,
          margin: "0 auto",
          minHeight: "clamp(480px,60vw,620px)",
          zIndex: 2,
        }}
      >
        {/* ── LEFT: text content ── */}
        <motion.div
          className="flex flex-col justify-center"
          style={{ padding: "clamp(40px,6vw,80px) clamp(24px,5vw,72px) clamp(40px,6vw,80px) clamp(24px,5vw,64px)" }}
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: EASE_EXPO }}
        >
          {/* Eyebrow label */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-7" style={{ background: "#C4614A" }} />
            <span style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C4614A" }}>
              Meet Your Specialist
            </span>
          </div>

          {/* Doctor name */}
          <h1 style={{
            fontFamily: "'Nunito',system-ui,sans-serif",
            fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
            fontWeight: 700,
            fontStyle: "italic",
            color: "#C4614A",
            lineHeight: 1.0,
            margin: "0 0 12px",
          }}>
            {doc.name}
          </h1>

          {/* Title */}
          <p style={{ fontSize: "clamp(0.85rem,1.1vw,1rem)", color: "#2e1a10", fontWeight: 500, margin: "0 0 20px", maxWidth: 380 }}>
            {doc.title}
          </p>

          {/* Divider */}
          <div style={{ width: 44, height: 2, background: "#C4614A", borderRadius: 2, marginBottom: 20 }} />

          {/* Qualifications */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            {[
              {
                icon: <svg viewBox="0 0 24 24" fill="none" width={15} height={15} stroke="#C4614A" strokeWidth="1.8" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
                text: doc.qual1,
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" width={15} height={15} stroke="#C4614A" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
                text: doc.qual2,
              },
            ].map((q, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                  background: "rgba(196,97,74,0.10)",
                  border: "1.5px solid rgba(196,97,74,0.28)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {q.icon}
                </div>
                <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#2e1a10" }}>{q.text}</span>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <p style={{ fontSize: "clamp(0.83rem,1vw,0.92rem)", color: "#3d2416", lineHeight: 1.78, margin: "0 0 28px", maxWidth: 390 }}>
            {doc.tagline}
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", marginBottom: 28 }}>
            <motion.button
              onClick={onBook}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#C4614A", borderRadius: 999,
                padding: "13px 28px",
                fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "#fff",
                border: "none", cursor: "pointer",
                boxShadow: "0 6px 20px rgba(196,97,74,0.35)",
              }}
              whileHover={{ background: "#a0432e", scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Book a Consultation
              <svg viewBox="0 0 20 20" fill="currentColor" width={13} height={13}>
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </motion.button>

            <motion.a
              href="#treatments"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.14em",
                textTransform: "uppercase", color:"#1a0f0a", textDecoration: "none",
              }}
              whileHover={{ color: "#C4614A", x: 3 }}
              transition={{ duration: 0.18 }}
            >
              Explore Treatments
              <svg viewBox="0 0 20 20" fill="currentColor" width={12} height={12}>
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </motion.a>
          </div>

          {/* Trust tags with icons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(12px,2vw,24px)" }}>
            {[
              { icon: <svg viewBox="0 0 24 24" fill="none" width={14} height={14} stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round"><path d="M12 22c0 0-7-3.5-7-8.75V5.25L12 3l7 2.25v7.98C19 18.5 12 22 12 22z"/></svg>, label: "Personalised care" },
              { icon: <svg viewBox="0 0 24 24" fill="none" width={14} height={14} stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>, label: "Evidence-led treatments" },
              { icon: <svg viewBox="0 0 24 24" fill="none" width={14} height={14} stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>, label: "Natural-looking results" },
            ].map((t, i, arr) => (
              <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  {t.icon}
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#2e1a10" }}>{t.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(196,97,74,0.40)", display: "inline-block", flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: doctor image ── */}
        <div
          className="relative flex items-end justify-center"
          style={{
            overflow: "hidden",
            background: "linear-gradient(160deg, #f5ddd0 0%, #edc9b4 55%, #e4b89e 100%)",
          }}
        >

          {/* Circular board-certified badge — top right */}
          <motion.div
            aria-label="Board-Certified Dermatologist"
            style={{
              position: "absolute",
              top: "clamp(20px,4vw,40px)",
              right: "clamp(16px,4vw,40px)",
              zIndex: 4,
              width: "clamp(80px,9vw,108px)",
              height: "clamp(80px,9vw,108px)",
            }}
            initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE_EXPO }}
          >
            {/* Circular SVG badge */}
            <svg viewBox="0 0 108 108" fill="none" className="w-full h-full">
              {/* Outer ring */}
              <circle cx="54" cy="54" r="50" stroke="#C4614A" strokeWidth="1.5" fill="rgba(253,243,236,0.92)"/>
              {/* Inner ring */}
              <circle cx="54" cy="54" r="42" stroke="rgba(196,97,74,0.35)" strokeWidth="0.8" fill="none" strokeDasharray="3 3"/>
              {/* Leaf icon center */}
              <path d="M54 38 Q54 54 54 66" stroke="#C4614A" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
              <path d="M54 50 Q44 44 40 34 Q50 36 54 50Z" stroke="#C4614A" strokeWidth="1" fill="rgba(196,97,74,0.18)" strokeLinecap="round"/>
              <path d="M54 46 Q64 40 68 30 Q58 32 54 46Z" stroke="#C4614A" strokeWidth="1" fill="rgba(196,97,74,0.12)" strokeLinecap="round"/>
              {/* Curved text path */}
              <path id="topArc" d="M 16,54 A 38,38 0 0,1 92,54" fill="none"/>
              <path id="botArc" d="M 20,62 A 38,38 0 0,0 88,62" fill="none"/>
              <text fontSize="7.5" fontWeight="700" letterSpacing="1.8" fill="#C4614A" fontFamily="system-ui,sans-serif">
                <textPath href="#topArc" startOffset="50%" textAnchor="middle">BOARD-CERTIFIED</textPath>
              </text>
              <text fontSize="7" fontWeight="700" letterSpacing="1.4" fill="#C4614A" fontFamily="system-ui,sans-serif">
                <textPath href="#botArc" startOffset="50%" textAnchor="middle">DERMATOLOGIST</textPath>
              </text>
            </svg>
          </motion.div>

          {/* Doctor photo — rounded corners */}
          <motion.img
            src={doc.image}
            alt={doc.name}
            draggable={false}
            loading="eager"
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: "clamp(320px,50vw,600px)",
              height: "clamp(440px,58vw,600px)",
              objectFit: "cover",
              objectPosition: "top center",
              borderRadius: "clamp(20px,3vw,36px)",
              boxShadow: "0 24px 64px rgba(100,40,20,0.18)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_EXPO }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .hero-banner-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-banner-grid > div:last-child {
            min-height: 320px;
          }
        }
      `}</style>
    </section>
  )
}

// ── Philosophy Section ─────────────────────────────────────────
function PhilosophySection({ data }) {
  return (
    <section className="relative overflow-hidden py-14 lg:py-16" style={{ background: "transparent" }}>
      <Leaf style={{ position: "absolute", top: 0, left: 0, width: "clamp(80px,10vw,130px)", opacity: 0.16 }} />
      <Leaf style={{ position: "absolute", top: 0, right: 0, width: "clamp(80px,10vw,130px)", opacity: 0.16, transform: "scaleX(-1)" }} />

      <div className="relative mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
        <div
          className="philosophy-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,64px)", alignItems: "center" }}
        >
          {/* Left text */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }}>
            <h2 style={{ fontFamily: "'Nunito',system-ui,sans-serif", fontSize: "clamp(1.7rem,3vw,2.5rem)", fontStyle: "italic", fontWeight: 700, color: "#1a0f0a", lineHeight: 1.2, margin: "0 0 18px" }}>{data.heading}</h2>
            <p style={{ fontSize: "0.93rem", color: "#3d2416", lineHeight: 1.78, marginBottom: 14 }}>{data.body1}</p>
            <p style={{ fontSize: "0.93rem", color: "#3d2416", lineHeight: 1.78, margin: 0 }}>{data.body2}</p>
          </motion.div>

          {/* Right pillars */}
          <motion.div
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.1 }}
          >
            {data.pillars.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, background: "rgba(255,255,255,0.60)", borderRadius: 16, padding: "16px 20px", border: "1.5px solid rgba(196,97,74,0.14)" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(196,97,74,0.08)", border: "1.5px solid rgba(196,97,74,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <PillarIcon type={p.icon} />
                </div>
                <div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "#1a0f0a", margin: "0 0 4px" }}>{p.title}</p>
                  <p style={{ fontSize:"0.88rem", color:"#1a0f0a", lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`@media(max-width:767px){.philosophy-grid{grid-template-columns:1fr !important}}`}</style>
    </section>
  )
}

// ── Treatment Journey ──────────────────────────────────────────
function JourneySection({ steps }) {
  return (
    <section className="py-14 lg:py-16" style={{ background: "transparent" }}>
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
        <motion.div className="mb-10 text-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE_EXPO }}>
          <Badge text="Your Treatment Journey" />
        </motion.div>

        <div className="journey-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(16px,3vw,32px)" }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              style={{ background: "rgba(255,255,255,0.65)", borderRadius: 20, padding: "clamp(20px,3vw,32px)", border: "1.5px solid rgba(196,97,74,0.14)", position: "relative", overflow: "hidden" }}
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.09, ease: EASE_EXPO }}
            >
              {/* Step number — large watermark */}
              <span style={{ position: "absolute", top: -8, right: 12, fontFamily: "'Nunito',system-ui,sans-serif", fontSize: "5rem", fontWeight: 800, color: "rgba(196,97,74,0.06)", lineHeight: 1, pointerEvents: "none" }}>{step.step}</span>

              <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(196,97,74,0.10)", border: "1.5px solid rgba(196,97,74,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <span style={{ fontFamily: "'Nunito',system-ui,sans-serif", fontSize: "1rem", fontWeight: 800, color: "#C4614A" }}>{step.step}</span>
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#1a0f0a", margin: "0 0 8px" }}>{step.title}</h3>
              <p style={{ fontSize: "0.84rem", color:"#1a0f0a", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>

              {/* Connector arrow (not on last) */}
              {i < steps.length - 1 && (
                <div style={{ position: "absolute", top: "50%", right: -16, transform: "translateY(-50%)", zIndex: 2 }} className="hidden lg:flex">
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(196,97,74,0.12)", border: "1.5px solid rgba(196,97,74,0.28)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg viewBox="0 0 20 20" fill="#C4614A" width={12} height={12}><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:767px){.journey-grid{grid-template-columns:1fr !important}}`}</style>
    </section>
  )
}

// ── Clinical Expertise ─────────────────────────────────────────
function ExpertiseSection({ areas }) {
  return (
    <section id="treatments" className="py-14 lg:py-16" style={{ background: "transparent" }}>
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
        <motion.div className="mb-10 text-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE_EXPO }}>
          <Badge text="Clinical Expertise" />
        </motion.div>

        <div className="expertise-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(12px,2vw,20px)" }}>
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              style={{ background: "rgba(255,255,255,0.60)", borderRadius: 18, padding: "clamp(18px,2.5vw,28px)", border: "1.5px solid rgba(196,97,74,0.13)" }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07, ease: EASE_EXPO }}
              whileHover={{ y: -3, borderColor: "rgba(196,97,74,0.35)" }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(196,97,74,0.09)", border: "1.5px solid rgba(196,97,74,0.22)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <svg viewBox="0 0 24 24" fill="none" width={17} height={17} stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#1a0f0a", margin: "0 0 6px" }}>{area.title}</h3>
              <p style={{ fontSize:"0.88rem", color:"#1a0f0a", lineHeight: 1.6, margin: 0 }}>{area.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:767px){.expertise-grid{grid-template-columns:1fr !important}} @media(min-width:768px) and (max-width:1023px){.expertise-grid{grid-template-columns:repeat(2,1fr) !important}}`}</style>
    </section>
  )
}

// ── What Patients Can Expect ───────────────────────────────────
function ExpectSection({ items, onBook }) {
  return (
    <section className="py-14 lg:py-16" style={{ background: "transparent" }}>
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
        <div
          className="expect-grid overflow-hidden rounded-[24px]"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "rgba(255,255,255,0.55)", border: "1.5px solid rgba(196,97,74,0.14)" }}
        >
          {/* Left */}
          <motion.div
            style={{ padding: "clamp(28px,5vw,56px)" }}
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }}
          >
            <h2 style={{ fontFamily: "'Nunito',system-ui,sans-serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontStyle: "italic", fontWeight: 700, color: "#1a0f0a", lineHeight: 1.2, margin: "0 0 24px" }}>What patients can expect</h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: 14, margin: 0, padding: 0, listStyle: "none" }}>
              {items.map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(196,97,74,0.10)", border: "1.5px solid rgba(196,97,74,0.28)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <svg viewBox="0 0 20 20" fill="#C4614A" width={10} height={10}><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <span style={{ fontSize: "0.88rem", color: "#3d2416", lineHeight: 1.6, fontWeight: 500 }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — CTA image panel */}
          <motion.div
            className="relative overflow-hidden"
            style={{ minHeight: "clamp(280px,40vw,400px)" }}
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.1 }}
          >
            <div className="absolute inset-0" style={{ backgroundImage: `url(${sectionBg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className="absolute inset-0" style={{ background: "rgba(196,97,74,0.68)" }} />
            <div className="relative flex h-full flex-col items-center justify-center p-10 text-center">
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <svg viewBox="0 0 24 24" fill="none" width={24} height={24} stroke="#fff" strokeWidth="1.7" strokeLinecap="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Nunito',system-ui,sans-serif", fontStyle: "italic", fontSize: "clamp(1.3rem,2.5vw,1.9rem)", fontWeight: 700, color: "#fff", lineHeight: 1.25, margin: "0 0 12px" }}>Ready to discuss your skin goals?</h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.65, margin: "0 0 24px", maxWidth: 280 }}>Book a private consultation with {DOCTOR.name} and receive a treatment plan built around you.</p>
              <motion.button
                onClick={onBook}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", borderRadius: 999, padding: "12px 24px", border: "none", cursor: "pointer", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C4614A" }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              >
                Book a Consultation
                <svg viewBox="0 0 20 20" fill="currentColor" width={13} height={13}><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </motion.button>
              <p style={{ marginTop: 12, fontSize: "0.72rem", color: "rgba(255,255,255,0.70)", display: "flex", alignItems: "center", gap: 6 }}>
                <svg viewBox="0 0 24 24" fill="none" width={12} height={12} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                Your concerns will be discussed directly during your visit.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`@media(max-width:767px){.expect-grid{grid-template-columns:1fr !important}}`}</style>
    </section>
  )
}

// ── Main Page Export ───────────────────────────────────────────
export default function DoctorProfilePage() {
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const handleBook = () => {
    navigate("/#contact")
  }

  return (
    <PageLayout>
      <main>
        {/* Breadcrumb */}
        <div className="mx-auto max-w-[1100px] px-5 pb-0 pt-6 sm:px-8 lg:px-10">
          <nav className="flex items-center gap-2 text-xs font-semibold" aria-label="Breadcrumb">
            <button onClick={() => navigate("/")} style={{ color: "rgba(61,36,20,0.55)", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 600 }} className="hover:text-[#C4614A] transition-colors">Home</button>
            <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" style={{ color: "rgba(61,36,20,0.35)" }}><path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            <button onClick={() => navigate("/#doctors")} style={{ color: "rgba(61,36,20,0.55)", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 600 }} className="hover:text-[#C4614A] transition-colors">Doctors</button>
            <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" style={{ color: "rgba(61,36,20,0.35)" }}><path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            <span style={{ color: "#C4614A" }}>{DOCTOR.name}</span>
          </nav>
        </div>

        <HeroBanner doc={DOCTOR} onBook={handleBook} />
        <PhilosophySection data={DOCTOR.philosophy} />
        <JourneySection steps={DOCTOR.journey} />
        <ExpertiseSection areas={DOCTOR.expertise} />
        <ExpectSection items={DOCTOR.expect} onBook={handleBook} />
      </main>
    </PageLayout>
  )
}
