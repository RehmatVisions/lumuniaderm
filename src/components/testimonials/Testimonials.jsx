import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SectionBadge from "../ui/SectionBadge"

const EASE      = [0.25, 0.46, 0.45, 0.94]
const EASE_EXPO = [0.16, 1, 0.3, 1]

/* ─── Pakistani testimonials ─────────────────────────────────── */
const ALL = [
  {
    id: 1,
    initials: "SM",
    name: "Sana Malik",
    city: "Downtown Dubai",
    treatment: "Advanced Facial Treatment",
    rating: 5,
    featured: true,
    text: "My skin has never felt this good before. Every visit feels warm and personal. The team really cares about you. I am so happy with my results!",
  },
  {
    id: 2,
    initials: "AK",
    name: "Ayesha Khan",
    city: "Marina, Dubai",
    treatment: "Laser Hair Removal",
    rating: 5,
    text: "The results are amazing. My skin looks so much clearer and smoother now. I feel more confident every day. Thank you Luminaderm!",
  },
  {
    id: 3,
    initials: "RB",
    name: "Rabia Butt",
    city: "JBR, Dubai",
    treatment: "HydraGlow Treatment",
    rating: 5,
    text: "Coming from Cantt and it was absolutely worth it. The staff is so welcoming and the results were visible after just one session.",
  },
  {
    id: 4,
    initials: "FN",
    name: "Fatima Noor",
    city: "Business Bay, Dubai",
    treatment: "Skin Renewal Therapy",
    rating: 5,
    text: "Very professional and friendly staff. The treatment worked really well for me. I would not go anywhere else for my skin care.",
  },
  {
    id: 5,
    initials: "ZA",
    name: "Zainab Ahmed",
    city: "Deira, Dubai",
    treatment: "Radiance Boost Facial",
    rating: 5,
    text: "A very relaxing experience with great results. My skin looks natural and healthy. I highly recommend this clinic to everyone.",
  },
  {
    id: 6,
    initials: "NN",
    name: "Nadia Nawaz",
    city: "Al Wasl, Dubai",
    treatment: "Laser Brightening",
    rating: 5,
    text: "From the first visit to the last, the care was excellent. My skin tone has completely changed. I am very satisfied with the outcome.",
  },
  {
    id: 7,
    initials: "HR",
    name: "Hina Rizvi",
    city: "DIFC, Dubai",
    treatment: "Anti-Aging Therapy",
    rating: 5,
    text: "I look so fresh and young again. The team is very kind and skilled. I feel great every time I walk out of the clinic.",
  },
  {
    id: 8,
    initials: "MB",
    name: "Maryam Butt",
    city: "Palm Jumeirah, Dubai",
    treatment: "PRP Hair Restoration",
    rating: 5,
    text: "I saw real hair growth after just a few sessions. This is the only treatment that actually worked for me. Very happy with Luminaderm.",
  },
  {
    id: 9,
    initials: "SA",
    name: "Sara Amjad",
    city: "Emirates Hills, Dubai",
    treatment: "Acne & Scar Revision",
    rating: 5,
    text: "My acne scars have faded so much. Dr. Ateeq explained everything clearly and the results speak for themselves. Truly life changing.",
  },
];
const FEATURED = ALL.find(r => r.featured)
const REGULAR  = ALL.filter(r => !r.featured)

/* ─── Stars ──────────────────────────────────────────────────── */
function Stars({ size = 14, color = "#C4614A" }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" width={size} height={size}>
          <path fill={color} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )
}

/* ─── Avatar ─────────────────────────────────────────────────── */
function Avatar({ initials, size = 44, gradient = false }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      border: "2px solid rgba(196,97,74,0.35)",
      background: gradient
        ? "linear-gradient(135deg,#C4614A,#e8876d)"
        : "rgba(255,255,255,0.90)",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: gradient ? "0 4px 14px rgba(196,97,74,0.35)" : "0 2px 8px rgba(196,97,74,0.12)",
    }}>
      <span style={{
        fontFamily: "'Nunito',system-ui,sans-serif",
        fontSize: size * 0.31, fontWeight: 700,
        color: gradient ? "#fff" : "#C4614A",
        letterSpacing: "0.04em",
      }}>{initials}</span>
    </div>
  )
}

/* ─── Leaf decoration ────────────────────────────────────────── */
function Leaf({ flip }) {
  return (
    <svg viewBox="0 0 140 320" aria-hidden="true" style={{
      position: "absolute", top: 0,
      [flip ? "right" : "left"]: 0,
      width: "clamp(70px,9vw,130px)",
      opacity: 0.18, pointerEvents: "none",
      transform: flip ? "scaleX(-1)" : "none",
    }}>
      <path d="M70 310 Q66 220 62 145 Q58 70 70 12" stroke="#C4614A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {[250,195,148,106].map((y,i) => (
        <g key={i}>
          <path d={`M${69-i} ${y} Q${38-i} ${y-16} ${26-i} ${y-54} Q${48} ${y-46} ${69-i} ${y-32}`} stroke="#C4614A" strokeWidth="1" fill="rgba(196,97,74,0.12)" strokeLinecap="round"/>
          <path d={`M${71+i} ${y-7} Q${102+i} ${y-24} ${112+i} ${y-62} Q${90} ${y-52} ${71+i} ${y-40}`} stroke="#C4614A" strokeWidth="1" fill="rgba(196,97,74,0.08)" strokeLinecap="round"/>
        </g>
      ))}
    </svg>
  )
}

/* ─── Quote icon ─────────────────────────────────────────────── */
function QuoteIcon({ size = 40, opacity = 0.14 }) {
  return (
    <svg viewBox="0 0 40 30" width={size} aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}>
      <path fill={`rgba(196,97,74,${opacity})`}
        d="M0 20c0-7.5 5.3-13.8 11.8-16.5L14 7.2C9.4 9.4 7 13 7 17H12v13H0V20zm22 0c0-7.5 5.3-13.8 11.8-16.5L36 7.2C31.4 9.4 29 13 29 17h5v13H22V20z"/>
    </svg>
  )
}

/* ─── Verified badge ─────────────────────────────────────────── */
function VerifiedBadge() {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: "rgba(196,97,74,0.10)", borderRadius: 999,
      padding: "3px 10px", fontSize: "0.6rem", fontWeight: 700,
      letterSpacing: "0.12em", textTransform: "uppercase", color: "#C4614A",
    }}>
      <svg viewBox="0 0 16 16" width={10} height={10}>
        <path fill="#C4614A" d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.54 6.54l-4 4a.75.75 0 01-1.08 0l-2-2a.75.75 0 011.08-1.08L7 9.19l3.46-3.46a.75.75 0 011.08 1.06v-.25z"/>
      </svg>
      Verified
    </span>
  )
}

/* ─── Small review card ──────────────────────────────────────── */
function ReviewCard({ r, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.38, delay: i * 0.07, ease: EASE }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      style={{
        background: "rgba(255,255,255,0.78)",
        border: "1.5px solid rgba(196,97,74,0.15)",
        borderRadius: 20,
        padding: "20px 18px 18px",
        display: "flex", flexDirection: "column", gap: 12,
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 24px rgba(196,97,74,0.08)",
        cursor: "default",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: "linear-gradient(90deg,#C4614A,rgba(196,97,74,0.2),transparent)",
        borderRadius: "20px 20px 0 0",
      }}/>

      {/* Avatar + stars */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar initials={r.initials} size={40} gradient />
          <div>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1a0f0a", lineHeight: 1.2 }}>{r.name}</p>
            <p style={{ fontSize: "0.62rem", color: "#3d2010", fontWeight: 700 }}>{r.city}</p>
          </div>
        </div>
        <Stars size={11} />
      </div>

      {/* Quote */}
      <p style={{
        fontSize:"0.88rem", color: "#1a0f0a", lineHeight: 1.75,
        fontWeight: 600, flex: 1,
        borderLeft: "2px solid rgba(196,97,74,0.25)",
        paddingLeft: 10,
      }}>
        {r.text}
      </p>

      {/* Treatment tag */}
      <div style={{
        display: "inline-flex", alignSelf: "flex-start",
        background: "rgba(196,97,74,0.08)", borderRadius: 999,
        padding: "3px 10px", fontSize: "0.62rem", fontWeight: 600,
        color: "#C4614A", letterSpacing: "0.06em",
      }}>
        {r.treatment}
      </div>
    </motion.div>
  )
}

/* ─── Main export ────────────────────────────────────────────── */
export default function Testimonials() {
  const CHUNK = 3
  const totalChunks = Math.ceil(REGULAR.length / CHUNK)
  const [page, setPage]   = useState(0)
  const [dir,  setDir]    = useState(1)
  const touchStart = useRef(null)

  const go = (n) => {
    setDir(n > page ? 1 : -1)
    setPage((n + totalChunks) % totalChunks)
  }

  /* Touch swipe on mobile */
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchStart.current === null) return
    const dx = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(dx) > 40) go(dx > 0 ? page + 1 : page - 1)
    touchStart.current = null
  }

  const visible = REGULAR.slice(page * CHUNK, page * CHUNK + CHUNK)

  return (
    <section id="testimonials" style={{
      position: "relative", overflow: "hidden", background: "transparent",
      padding: "clamp(60px,8vw,100px) 0 clamp(48px,6vw,72px)",
    }}>
      <Leaf /><Leaf flip />

      {/* Ambient glow */}
      <div aria-hidden="true" style={{ pointerEvents: "none", position: "absolute", inset: 0 }}>
        <div style={{ position:"absolute", top:"-10%", left:"20%", width:"50%", height:"50%", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(196,97,74,0.07) 0%,transparent 70%)" }}/>
        <div style={{ position:"absolute", bottom:0, right:"10%", width:"40%", height:"40%", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(196,97,74,0.05) 0%,transparent 70%)" }}/>
      </div>

      <div style={{ position:"relative", maxWidth:1100, margin:"0 auto", padding:"0 clamp(16px,5vw,56px)" }}>

        {/* ── HEADER ──────────────────────────────────────────── */}
        <motion.div style={{ textAlign:"center", marginBottom:44 }}
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6, ease:EASE_EXPO }}>

          <SectionBadge text="Real Stories, Real Results" />

          <h2 style={{
            fontFamily:"'Nunito',system-ui,sans-serif",
            fontSize:"clamp(2rem,4.8vw,3.2rem)",
            fontWeight:700, fontStyle:"italic", color:"#1a0f0a",
            lineHeight:1.1, margin:"0 0 16px",
          }}>
            Loved by Our Clients.
          </h2>

          <p style={{
            fontSize:"clamp(0.83rem,1.1vw,0.94rem)", color:"#3d2416",
            lineHeight:1.72, maxWidth:400, margin:"0 auto", fontWeight:400,
          }}>
            Trusted care, expert treatments, aur visible results —<br/>
            seedha un logon se jo sabse behtar jaante hain.
          </p>
        </motion.div>

        {/* ── FEATURED CARD ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.7, ease:EASE_EXPO }}
          style={{
            position:"relative",
            background:"rgba(255,255,255,0.82)",
            border:"1.5px solid rgba(196,97,74,0.20)",
            borderRadius:28,
            padding:"clamp(36px,5vw,60px) clamp(32px,6vw,72px)",
            marginBottom:16, textAlign:"center",
            backdropFilter:"blur(12px)",
            boxShadow:"0 8px 48px rgba(196,97,74,0.10)",
          }}
        >
          {/* Gradient top border */}
          <div style={{
            position:"absolute", top:0, left:0, right:0, height:4,
            background:"linear-gradient(90deg,transparent,#C4614A,#e8876d,#C4614A,transparent)",
            borderRadius:"28px 28px 0 0",
          }}/>

          {/* Decorative quote marks */}
          <div style={{ position:"absolute", top:20, left:24, opacity:0.14 }}>
            <QuoteIcon size={52} opacity={1} />
          </div>
          <div style={{ position:"absolute", bottom:20, right:24, opacity:0.14, transform:"rotate(180deg)" }}>
            <QuoteIcon size={52} opacity={1} />
          </div>

          {/* Stars + verified */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:22 }}>
            <Stars size={18} />
            <VerifiedBadge />
          </div>

          {/* Quote text */}
          <p style={{
            fontFamily:"'Nunito',system-ui,sans-serif",
            fontSize:"clamp(1.05rem,2.2vw,1.4rem)",
            fontStyle:"italic", fontWeight:600,
            color:"#C4614A", lineHeight:1.72,
            maxWidth:580, margin:"0 auto 30px",
          }}>
            "{FEATURED.text}"
          </p>

          {/* Divider */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:24 }}>
            <div style={{ flex:1, maxWidth:80, height:1, background:"rgba(196,97,74,0.25)" }}/>
            <div style={{ width:5, height:5, borderRadius:"50%", background:"rgba(196,97,74,0.35)" }}/>
            <div style={{ flex:1, maxWidth:80, height:1, background:"rgba(196,97,74,0.25)" }}/>
          </div>

          {/* Author */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14 }}>
            <Avatar initials={FEATURED.initials} size={50} gradient />
            <div style={{ textAlign:"left" }}>
              <p style={{ fontSize:"0.95rem", fontWeight:700, color:"#1a0f0a", lineHeight:1.3 }}>
                {FEATURED.name}
              </p>
              <p style={{ fontSize:"0.82rem", color:"#3d2010", fontWeight:700 }}>
                {FEATURED.city} · {FEATURED.treatment}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── SLIDER ROW ──────────────────────────────────────── */}
        <div
          style={{ display:"flex", alignItems:"center", gap:"clamp(8px,1.5vw,16px)" }}
          onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
        >
          {/* Left arrow */}
          <motion.button
            onClick={() => go(page - 1)}
            whileHover={{ scale:1.1, background:"rgba(196,97,74,0.12)" }}
            whileTap={{ scale:0.93 }}
            className="testimonial-arrow"
            style={{
              flexShrink:0, width:44, height:44, borderRadius:"50%",
              border:"1.5px solid rgba(196,97,74,0.30)",
              background:"rgba(255,255,255,0.75)",
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer", color:"#C4614A",
              backdropFilter:"blur(8px)",
              boxShadow:"0 2px 12px rgba(196,97,74,0.10)",
            }}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" fill="none" width={17} height={17} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </motion.button>

          {/* Cards grid */}
          <div style={{
            flex:1, display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(min(220px,100%),1fr))",
            gap:"clamp(10px,1.5vw,16px)",
          }}>
            <AnimatePresence mode="popLayout" custom={dir}>
              {visible.map((r, i) => <ReviewCard key={r.id} r={r} i={i} />)}
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <motion.button
            onClick={() => go(page + 1)}
            whileHover={{ scale:1.1, background:"rgba(196,97,74,0.12)" }}
            whileTap={{ scale:0.93 }}
            className="testimonial-arrow"
            style={{
              flexShrink:0, width:44, height:44, borderRadius:"50%",
              border:"1.5px solid rgba(196,97,74,0.30)",
              background:"rgba(255,255,255,0.75)",
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer", color:"#C4614A",
              backdropFilter:"blur(8px)",
              boxShadow:"0 2px 12px rgba(196,97,74,0.10)",
            }}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" fill="none" width={17} height={17} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </motion.button>
        </div>

        {/* ── PAGINATION DOTS ──────────────────────────────────── */}
        <div style={{ display:"flex", justifyContent:"center", gap:7, marginTop:20 }}>
          {[...Array(totalChunks)].map((_, i) => (
            <motion.button key={i} onClick={() => go(i)} aria-label={`Page ${i+1}`}
              animate={{ width: i === page ? 28 : 8, background: i === page ? "#C4614A" : "rgba(196,97,74,0.28)" }}
              transition={{ duration: 0.3 }}
              style={{ height:8, borderRadius:999, border:"none", cursor:"pointer", padding:0 }}
            />
          ))}
        </div>

        {/* ── FOOTER STRIP ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          viewport={{ once:true }} transition={{ duration:0.6, delay:0.3 }}
          style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            flexWrap:"wrap", gap:"clamp(8px,1.5vw,14px)", marginTop:32,
            fontSize:"clamp(0.80rem,1vw,0.88rem)", color:"#1a0f0a", fontWeight:700,
          }}
        >
          <svg viewBox="0 0 20 20" width={16} height={16}>
            <path fill="#C4614A" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span><strong style={{ color:"#1a0f0a" }}>4.7</strong> average rating</span>
          <span style={{ color:"rgba(196,97,74,0.35)" }}>·</span>
          <span><strong style={{ color:"#1a0f0a" }}>94%</strong> satisfaction rate</span>
          <span style={{ color:"rgba(196,97,74,0.35)" }}>·</span>
          <span><strong style={{ color:"#1a0f0a" }}>3,570+</strong> satisfied patients</span>
          <svg viewBox="0 0 24 24" fill="none" width={16} height={16} stroke="#C4614A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 400px) {
          .testimonial-arrow { display: none !important; }
        }
      `}</style>
    </section>
  )
}

