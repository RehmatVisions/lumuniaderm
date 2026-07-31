import { motion } from "framer-motion"
import { useState } from "react"
import { siteContent } from "../../data/siteContent"
import SectionBadge from "../ui/SectionBadge"

const EASE      = [0.25, 0.46, 0.45, 0.94]
const EASE_EXPO = [0.16, 1, 0.3, 1]

/* ─── Arrow circle button ──────────────────────────────────── */
function ArrowBtn({ href, size = 36, dark = false }) {
  return (
    <motion.a href={href}
      className="inline-flex items-center justify-center rounded-full"
      style={{
        width: size, height: size, flexShrink: 0,
        border: dark ? "1.5px solid rgba(196,97,74,0.35)" : "1.5px solid rgba(196,97,74,0.35)",
        background: dark ? "transparent" : "transparent",
        color: "#C4614A",
      }}
      whileHover={{ background: "#C4614A", borderColor: "#C4614A", color: "#fff", scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      transition={{ duration: 0.22 }}
      aria-label="Explore treatment"
    >
      <svg viewBox="0 0 20 20" fill="currentColor" width={14} height={14}>
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
      </svg>
    </motion.a>
  )
}

/* ─── Number label ─────────────────────────────────────────── */
function Num({ n }) {
  return (
    <span style={{
      fontFamily: "'Nunito',system-ui,sans-serif",
      fontSize: "1.15rem", fontWeight: 900, color: "#C4614A",
      letterSpacing: "0.02em", lineHeight: 1,
    }}>
      {String(n).padStart(2,"0")}
    </span>
  )
}

/* ─── Leaf watermark SVG ───────────────────────────────────── */
function LeafWatermark() {
  return (
    <svg viewBox="0 0 100 200" aria-hidden="true"
      style={{ position:"absolute", bottom:12, right:12, width:80, opacity:0.10, pointerEvents:"none" }}>
      <path d="M50 190 Q48 140 46 95 Q44 50 50 10" stroke="#C4614A" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {[150,115,82,52].map((y,i)=>(
        <g key={i}>
          <path d={`M${49-i} ${y} Q${28} ${y-12} ${20} ${y-38} Q${36} ${y-32} ${49-i} ${y-22}`} stroke="#C4614A" strokeWidth="0.9" fill="rgba(196,97,74,0.5)" strokeLinecap="round"/>
          <path d={`M${51+i} ${y-4} Q${72} ${y-18} ${80} ${y-44} Q${64} ${y-36} ${51+i} ${y-28}`} stroke="#C4614A" strokeWidth="0.9" fill="rgba(196,97,74,0.4)" strokeLinecap="round"/>
        </g>
      ))}
    </svg>
  )
}

/* ─── CARD 1 — Large featured left card ───────────────────── */
function CardFeatured({ card, n }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-40px" }}
      transition={{ duration:0.6, ease:EASE_EXPO }}
      style={{
        position:"relative", overflow:"hidden", borderRadius:20,
        gridRow:"1 / 3",
        background:"#fff",
        border:"1.5px solid rgba(196,97,74,0.14)",
        display:"flex", flexDirection:"column",
        cursor:"default",
      }}
    >
      {/* Full image */}
      <motion.div style={{ flex:1, overflow:"hidden", minHeight:340, position:"relative" }}>
        <motion.img
          src={card.image} alt={card.title}
          animate={{ scale: hov ? 1.04 : 1 }}
          transition={{ duration:0.7, ease:EASE }}
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", position:"absolute", inset:0 }}
          loading="lazy"
          decoding="async"
        />
        {/* Subtle bottom fade into content */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:80,
          background:"linear-gradient(to top,rgba(255,255,255,0.95),transparent)" }}/>
      </motion.div>

      {/* Content */}
      <div style={{ padding:"20px 24px 24px", position:"relative" }}>
        {/* Leaf watermark */}
        <LeafWatermark />

        {/* Number + badge row */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
          <Num n={n} />
          <span style={{
            fontSize:"0.70rem", fontWeight:800, letterSpacing:"0.18em",
            textTransform:"uppercase", color:"#C4614A",
          }}>
            {card.badge}
          </span>
          <div style={{ flex:1, height:1, background:"rgba(196,97,74,0.18)" }}/>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily:"'Nunito',system-ui,sans-serif",
          fontSize:"clamp(1.4rem,2.2vw,1.75rem)",
          fontWeight:900, fontStyle:"normal",
          color:"#1a0f0a", lineHeight:1.18,
          margin:"0 0 10px",
        }}>
          {card.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize:"0.84rem", color:"#2e1a10", lineHeight:1.7,
          fontWeight:500, marginBottom:18, maxWidth:300,
        }}>
          {card.description}
        </p>

        {/* CTA button */}
        <motion.a href={card.href}
          style={{
            display:"inline-flex", alignItems:"center", gap:10,
            background:"#C4614A", borderRadius:999,
            padding:"10px 22px",
            fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.14em",
            textTransform:"uppercase", color:"#fff",
            textDecoration:"none",
          }}
          whileHover={{ background:"#a0432e", scale:1.03 }}
          whileTap={{ scale:0.97 }}
          transition={{ duration:0.2 }}
        >
          Explore Treatment
          <svg viewBox="0 0 20 20" fill="currentColor" width={13} height={13}>
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </motion.a>
      </div>
    </motion.div>
  )
}

/* ─── CARD with image top ──────────────────────────────────── */
function CardWithImage({ card, n, delay = 0 }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-40px" }}
      transition={{ duration:0.6, delay, ease:EASE_EXPO }}
      style={{
        position:"relative", overflow:"hidden", borderRadius:20,
        background:"#fff",
        border:"1.5px solid rgba(196,97,74,0.14)",
        display:"flex", flexDirection:"column",
        cursor:"default",
      }}
    >
      {/* Image */}
      <div style={{ height:170, overflow:"hidden", position:"relative", flexShrink:0 }}>
        <motion.img
          src={card.image} alt={card.title}
          animate={{ scale: hov ? 1.05 : 1 }}
          transition={{ duration:0.65, ease:EASE }}
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center" }}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Content */}
      <div style={{ padding:"16px 20px 18px", flex:1, display:"flex", flexDirection:"column", gap:6, position:"relative" }}>
        <Num n={n} />
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10 }}>
          <div style={{ flex:1 }}>
            <h3 style={{
              fontFamily:"'Nunito',system-ui,sans-serif",
              fontSize:"clamp(1rem,1.5vw,1.15rem)",
              fontWeight:800, fontStyle:"normal",
              color:"#1a0f0a", lineHeight:1.22,
              margin:"0 0 7px",
            }}>
              {card.title}
            </h3>
            <p style={{ fontSize:"0.80rem", color:"#2e1a10", lineHeight:1.65, fontWeight:500 }}>
              {card.description}
            </p>
          </div>
          <ArrowBtn href={card.href} />
        </div>
      </div>
    </motion.div>
  )
}

/* ─── CARD text only (with leaf) ──────────────────────────── */
function CardText({ card, n, delay = 0 }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-40px" }}
      transition={{ duration:0.6, delay, ease:EASE_EXPO }}
      style={{
        position:"relative", overflow:"hidden", borderRadius:20,
        background:"#fff",
        border:"1.5px solid rgba(196,97,74,0.14)",
        padding:"20px 22px 20px",
        display:"flex", flexDirection:"column", gap:6,
        cursor:"default",
      }}
    >
      <LeafWatermark />
      <Num n={n} />
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10 }}>
        <div style={{ flex:1 }}>
          <h3 style={{
            fontFamily:"'Playfair Display',Georgia,serif",
            fontSize:"clamp(1rem,1.5vw,1.15rem)",
            fontWeight:700, fontStyle:"italic",
            color:"#C4614A", lineHeight:1.22,
            margin:"0 0 7px",
          }}>
            {card.title}
          </h3>
          <p style={{ fontSize:"0.80rem", color:"#2e1a10", lineHeight:1.65, fontWeight:500 }}>
            {card.description}
          </p>
        </div>
        <ArrowBtn href={card.href} />
      </div>
    </motion.div>
  )
}

/* ─── MAIN SECTION ─────────────────────────────────────────── */
export default function Services() {
  const { badge, headline, description, ctaText, ctaHref, cards } = siteContent.services

  return (
    <section id="services" style={{
      position:"relative", overflow:"hidden", background:"transparent",
      padding:"clamp(56px,7vw,96px) 0 clamp(48px,6vw,80px)",
    }}>

      {/* Botanical leaves */}
      <svg viewBox="0 0 140 320" aria-hidden="true" style={{
        position:"absolute", top:0, left:0,
        width:"clamp(80px,11vw,160px)", opacity:0.14, pointerEvents:"none",
      }}>
        <path d="M70 310 Q66 220 62 145 Q58 70 70 12" stroke="#C4614A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {[250,195,148,106].map((y,i)=>(
          <g key={i}>
            <path d={`M${69-i} ${y} Q${38-i} ${y-16} ${26-i} ${y-54} Q${48} ${y-46} ${69-i} ${y-32}`} stroke="#C4614A" strokeWidth="1" fill="rgba(196,97,74,0.15)" strokeLinecap="round"/>
            <path d={`M${71+i} ${y-7} Q${102+i} ${y-24} ${112+i} ${y-62} Q${90} ${y-52} ${71+i} ${y-40}`} stroke="#C4614A" strokeWidth="1" fill="rgba(196,97,74,0.10)" strokeLinecap="round"/>
          </g>
        ))}
      </svg>
      <svg viewBox="0 0 140 320" aria-hidden="true" style={{
        position:"absolute", top:0, right:0,
        width:"clamp(80px,11vw,160px)", opacity:0.14, pointerEvents:"none",
        transform:"scaleX(-1)",
      }}>
        <path d="M70 310 Q66 220 62 145 Q58 70 70 12" stroke="#C4614A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {[250,195,148,106].map((y,i)=>(
          <g key={i}>
            <path d={`M${69-i} ${y} Q${38-i} ${y-16} ${26-i} ${y-54} Q${48} ${y-46} ${69-i} ${y-32}`} stroke="#C4614A" strokeWidth="1" fill="rgba(196,97,74,0.15)" strokeLinecap="round"/>
            <path d={`M${71+i} ${y-7} Q${102+i} ${y-24} ${112+i} ${y-62} Q${90} ${y-52} ${71+i} ${y-40}`} stroke="#C4614A" strokeWidth="1" fill="rgba(196,97,74,0.10)" strokeLinecap="round"/>
          </g>
        ))}
      </svg>

      <div style={{ position:"relative", maxWidth:1100, margin:"0 auto", padding:"0 clamp(16px,5vw,56px)" }}>

        {/* ── HEADER ────────────────────────────────────────── */}
        <motion.div style={{ textAlign:"center", marginBottom:"clamp(32px,4vw,52px)" }}
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6, ease:EASE_EXPO }}>

          <SectionBadge text={badge} className="mb-2" />

          <h2 style={{
            fontFamily:"'Playfair Display',Georgia,serif",
            fontSize:"clamp(2rem,4.8vw,3.2rem)",
            fontWeight:700, fontStyle:"italic",
            color:"#1a0f0a", lineHeight:1.1,
            margin:"0 0 16px",
          }}>
            {headline}
          </h2>

          <p style={{
            fontSize:"clamp(0.83rem,1.1vw,0.94rem)", color:"#3d2416",
            lineHeight:1.72, maxWidth:480, margin:"0 auto", fontWeight:400,
          }}>
            {description}
          </p>
        </motion.div>

        {/* ── CARDS GRID ────────────────────────────────────── */}
        {/*
          Reference layout:
          Col 1 (wide): featured card spanning 2 rows
          Col 2-3: top row = card with image, bottom row = card with image
          On the right side: col 3 top = text only, col 3 bottom = text only
          Simplified to a 3-col grid matching the reference
        */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"1fr 1fr 1fr",
          gridTemplateRows:"auto auto",
          gap:"clamp(10px,1.5vw,16px)",
        }}
          className="services-grid"
        >
          {/* Card 01 — large featured, spans 2 rows */}
          <div style={{ gridColumn:"1", gridRow:"1 / 3" }}>
            <CardFeatured card={cards[0]} n={1} />
          </div>

          {/* Card 02 — image card top-center */}
          <div style={{ gridColumn:"2", gridRow:"1" }}>
            <CardWithImage card={cards[1]} n={2} delay={0.08} />
          </div>

          {/* Card 03 — image card top-right */}
          <div style={{ gridColumn:"3", gridRow:"1" }}>
            <CardWithImage card={cards[2]} n={3} delay={0.14} />
          </div>

          {/* Card 04 — image card bottom-center */}
          <div style={{ gridColumn:"2", gridRow:"2" }}>
            <CardWithImage card={cards[3]} n={4} delay={0.18} />
          </div>

          {/* Card 05 — image card bottom-right */}
          <div style={{ gridColumn:"3", gridRow:"2" }}>
            <CardWithImage card={cards[4]} n={5} delay={0.22} />
          </div>
        </div>

        {/* ── FOOTER TRUST BAR ──────────────────────────────── */}
        <motion.div
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }}
          style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            flexWrap:"wrap",
            marginTop:"clamp(28px,4vw,48px)",
            gap:0,
          }}
        >
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" width={22} height={22} stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              ),
              label: "Certified Specialists",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" width={22} height={22} stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              ),
              label: "Personalized Plans",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" width={22} height={22} stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                </svg>
              ),
              label: "Clinically Led Care",
            },
          ].map((item, i, arr) => (
            <div key={item.label} style={{ display:"flex", alignItems:"center" }}>
              <div style={{
                display:"flex", alignItems:"center", gap:10,
                padding:"0 clamp(20px,3vw,44px)",
              }}>
                <div style={{
                  width:40, height:40, borderRadius:"50%",
                  border:"1.5px solid rgba(196,97,74,0.25)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  background:"rgba(196,97,74,0.06)",
                  flexShrink:0,
                }}>
                  {item.icon}
                </div>
                <span style={{
                  fontSize:"clamp(0.84rem,1vw,0.94rem)",
                  fontWeight:700, color:"#2e1a10",
                  
                  whiteSpace:"nowrap",
                }}>
                  {item.label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div style={{ width:1, height:28, background:"rgba(196,97,74,0.20)", flexShrink:0 }}/>
              )}
            </div>
          ))}
        </motion.div>

      </div>

      {/* Mobile: stack grid to single column */}
      <style>{`
        @media (max-width: 767px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .services-grid > div {
            grid-column: 1 !important;
            grid-row: auto !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .services-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .services-grid > div:first-child {
            grid-column: 1 / 3 !important;
            grid-row: auto !important;
          }
          .services-grid > div:not(:first-child) {
            grid-column: auto !important;
            grid-row: auto !important;
          }
        }
      `}</style>
    </section>
  )
}
