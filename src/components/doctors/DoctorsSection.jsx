import { motion } from "framer-motion"
import ateeqImg from "../../assets/doctorsimages/ateeq.png"

const EASE      = [0.25, 0.46, 0.45, 0.94]
const EASE_EXPO = [0.16, 1, 0.3, 1]

const DOCTOR = {
  name:        "Dr. Ateeq",
  role:        "Consultant Dermatologist & Aesthetic Medicine Specialist",
  badge:       "Board-Certified Dermatologist",
  about:       "Blending medical expertise with an artistic eye, Dr. Ateeq creates thoughtful treatment plans focused on natural, confident results.",
  exp:         "12+",
  expLabel:    "Years Experience",
  qual1:       "MBBS · MD",
  qual1Sub:    "Dermatology",
  qual2:       "Advanced Laser",
  qual2Sub:    "& Aesthetic Care",
  expertise:   ["Medical Dermatology","Acne & Scarring","Laser Treatments","Skin Rejuvenation","Anti-Aging Care"],
  bookHref:    "#contact",
  profileHref: "#about",
}

/* ─── Leaf SVG ──────────────────────────────────────────── */
function Leaf({ style }) {
  return (
    <svg viewBox="0 0 120 260" aria-hidden="true" style={{ pointerEvents:"none", ...style }}>
      <path d="M60 250 Q57 175 54 112 Q51 55 60 10" stroke="#C4614A" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      {[200,158,120,86].map((y,i)=>(
        <g key={i}>
          <path d={`M${59-i} ${y} Q${33-i} ${y-13} ${22-i} ${y-42} Q${40} ${y-36} ${59-i} ${y-25}`}
            stroke="#C4614A" strokeWidth="0.9" fill="rgba(196,97,74,0.12)" strokeLinecap="round"/>
          <path d={`M${61+i} ${y-5} Q${87+i} ${y-20} ${96+i} ${y-49} Q${78} ${y-42} ${61+i} ${y-32}`}
            stroke="#C4614A" strokeWidth="0.9" fill="rgba(196,97,74,0.08)" strokeLinecap="round"/>
        </g>
      ))}
    </svg>
  )
}

/* ─── Small icon + stat block ───────────────────────────── */
function StatBlock({ icon, top, sub }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <div style={{
        width:40, height:40, borderRadius:"50%", flexShrink:0,
        border:"1.5px solid rgba(196,97,74,0.25)",
        background:"rgba(196,97,74,0.07)",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        {icon}
      </div>
      <div style={{ lineHeight:1.25 }}>
        <p style={{ fontSize:"0.85rem", fontWeight:700, color:"#2e1f16", margin:0 }}>{top}</p>
        <p style={{ fontSize:"0.72rem", color:"#a07060", margin:0 }}>{sub}</p>
      </div>
    </div>
  )
}

/* ─── Expertise pill ────────────────────────────────────── */
function Pill({ label }) {
  return (
    <span style={{
      display:"inline-flex",
      border:"1.5px solid rgba(196,97,74,0.28)",
      borderRadius:999,
      padding:"5px 14px",
      fontSize:"0.75rem", fontWeight:500, color:"#5a3e32",
      background:"rgba(255,255,255,0.55)",
      whiteSpace:"nowrap",
    }}>
      {label}
    </span>
  )
}

/* ─── Main Export ───────────────────────────────────────── */
export default function DoctorsSection() {
  const d = DOCTOR

  return (
    <section id="doctors" style={{
      position:"relative", overflow:"hidden", background:"transparent",
      padding:"clamp(56px,7vw,96px) 0",
    }}>

      {/* Leaf decorations */}
      <Leaf style={{ position:"absolute", top:0, left:0, width:"clamp(80px,10vw,145px)", opacity:0.18 }}/>
      <Leaf style={{ position:"absolute", top:0, right:0, width:"clamp(80px,10vw,145px)", opacity:0.18, transform:"scaleX(-1)" }}/>

      <div style={{ position:"relative", maxWidth:1080, margin:"0 auto", padding:"0 clamp(16px,5vw,56px)" }}>

        {/* Header badge */}
        <motion.div style={{ textAlign:"center", marginBottom:"clamp(28px,4vw,48px)" }}
          initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.55, ease:EASE_EXPO }}>
          <p style={{
            fontSize:"0.66rem", fontWeight:700, letterSpacing:"0.22em",
            textTransform:"uppercase", color:"#C4614A",
          }}>
            Meet Your Skin Expert
          </p>
        </motion.div>

        {/* ── TWO-COLUMN CARD ────────────────────────────── */}
        <motion.div
          initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.7, ease:EASE_EXPO }}
          style={{
            display:"grid",
            gridTemplateColumns:"clamp(280px,38%,420px) 1fr",
            borderRadius:24,
            overflow:"hidden",
            background:"rgba(255,255,255,0.60)",
            border:"1.5px solid rgba(196,97,74,0.15)",
          }}
          className="doctor-grid"
        >

          {/* ── LEFT: image ─────────────────────────────── */}
          <div style={{ position:"relative", minHeight:"clamp(480px,65vw,620px)" }}>
            <img
              src={ateeqImg} alt={d.name}
              style={{
                position:"absolute", inset:0,
                width:"100%", height:"100%",
                objectFit:"cover", objectPosition:"top center",
                background:"#f5ebe2",
              }}
              loading="eager"
            />

            {/* Board-certified badge bottom */}
            <div style={{
              position:"absolute", bottom:20, left:"50%", transform:"translateX(-50%)",
              display:"flex", alignItems:"center", gap:8,
              background:"rgba(255,255,255,0.88)",
              borderRadius:999,
              padding:"8px 18px",
              border:"1.5px solid rgba(196,97,74,0.18)",
              whiteSpace:"nowrap",
            }}>
              <svg viewBox="0 0 24 24" fill="none" width={14} height={14} stroke="#C4614A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
              <span style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", color:"#5a3e32" }}>
                {d.badge}
              </span>
            </div>
          </div>

          {/* ── RIGHT: content ──────────────────────────── */}
          <div style={{
            padding:"clamp(28px,4vw,52px) clamp(24px,4vw,48px)",
            display:"flex", flexDirection:"column", gap:"clamp(14px,2vw,22px)",
            position:"relative",
          }}>

            {/* Name */}
            <div>
              <h2 style={{
                fontFamily:"'Playfair Display',Georgia,serif",
                fontSize:"clamp(1.8rem,3.8vw,2.8rem)",
                fontWeight:700, fontStyle:"italic",
                color:"#C4614A", lineHeight:1.1,
                margin:"0 0 6px",
              }}>
                {d.name}
              </h2>
              <p style={{ fontSize:"clamp(0.82rem,1.1vw,0.95rem)", color:"#5a3e32", fontWeight:500, margin:0 }}>
                {d.role}
              </p>
            </div>

            {/* Divider */}
            <div style={{ width:48, height:2, background:"#C4614A", borderRadius:2 }}/>

            {/* About */}
            <p style={{
              fontSize:"clamp(0.82rem,1vw,0.92rem)",
              color:"#7a5a4a", lineHeight:1.75, fontWeight:400,
              margin:0, maxWidth:400,
            }}>
              {d.about}
            </p>

            {/* Stats row */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:"clamp(14px,2.5vw,32px)" }}>
              <StatBlock
                icon={
                  <svg viewBox="0 0 24 24" fill="none" width={18} height={18} stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                }
                top={d.exp}
                sub={d.expLabel}
              />
              <StatBlock
                icon={
                  <svg viewBox="0 0 24 24" fill="none" width={18} height={18} stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                }
                top={d.qual1}
                sub={d.qual1Sub}
              />
              <StatBlock
                icon={
                  <svg viewBox="0 0 24 24" fill="none" width={18} height={18} stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                }
                top={d.qual2}
                sub={d.qual2Sub}
              />
            </div>

            {/* Expertise box */}
            <div style={{
              border:"1.5px solid rgba(196,97,74,0.18)",
              borderRadius:16, padding:"16px 18px",
              background:"rgba(255,255,255,0.55)",
              position:"relative",
            }}>
              {/* Leaf watermark inside box */}
              <svg viewBox="0 0 80 160" aria-hidden="true" style={{
                position:"absolute", bottom:0, right:8, width:70, opacity:0.10, pointerEvents:"none",
              }}>
                <path d="M40 155 Q38 110 36 72 Q34 36 40 8" stroke="#C4614A" strokeWidth="1" fill="none" strokeLinecap="round"/>
                {[125,97,72,50].map((y,i)=>(
                  <g key={i}>
                    <path d={`M${39-i} ${y} Q${22} ${y-9} ${16} ${y-29} Q${27} ${y-25} ${39-i} ${y-17}`} stroke="#C4614A" strokeWidth="0.7" fill="rgba(196,97,74,0.5)" strokeLinecap="round"/>
                    <path d={`M${41+i} ${y-3} Q${58} ${y-14} ${64} ${y-33} Q${53} ${y-28} ${41+i} ${y-21}`} stroke="#C4614A" strokeWidth="0.7" fill="rgba(196,97,74,0.4)" strokeLinecap="round"/>
                  </g>
                ))}
              </svg>

              <p style={{
                fontFamily:"'Playfair Display',Georgia,serif",
                fontSize:"1rem", fontStyle:"italic", fontWeight:600,
                color:"#C4614A", marginBottom:12,
              }}>
                Areas of Expertise
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {d.expertise.map(e => <Pill key={e} label={e} />)}
              </div>
            </div>

            {/* CTA buttons */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:12, alignItems:"center" }}>
              <motion.a href={d.bookHref}
                style={{
                  display:"inline-flex", alignItems:"center", gap:10,
                  background:"#C4614A", borderRadius:999,
                  padding:"12px 26px",
                  fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.14em",
                  textTransform:"uppercase", color:"#fff", textDecoration:"none",
                }}
                whileHover={{ background:"#a0432e", scale:1.03 }}
                whileTap={{ scale:0.97 }}
                transition={{ duration:0.2 }}
              >
                Book a Consultation
                <svg viewBox="0 0 20 20" fill="currentColor" width={13} height={13}>
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </motion.a>
              <motion.a href={d.profileHref}
                style={{
                  display:"inline-flex", alignItems:"center",
                  borderRadius:999,
                  padding:"11px 26px",
                  fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.14em",
                  textTransform:"uppercase", color:"#5a3e32", textDecoration:"none",
                  border:"1.5px solid rgba(196,97,74,0.35)",
                  background:"transparent",
                }}
                whileHover={{ borderColor:"#C4614A", color:"#C4614A", scale:1.03 }}
                whileTap={{ scale:0.97 }}
                transition={{ duration:0.2 }}
              >
                View Doctor Profile
              </motion.a>
            </div>

            {/* Footer tags */}
            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"clamp(8px,1.5vw,16px)" }}>
              {["Personalized care","Evidence-led treatments","Natural-looking results"].map((t,i,arr)=>(
                <span key={t} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:"0.76rem", color:"#7a5a4a", fontWeight:500 }}>{t}</span>
                  {i < arr.length-1 && (
                    <span style={{ width:4, height:4, borderRadius:"50%", background:"rgba(196,97,74,0.45)", display:"inline-block" }}/>
                  )}
                </span>
              ))}
            </div>

          </div>
        </motion.div>

      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 767px) {
          .doctor-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
