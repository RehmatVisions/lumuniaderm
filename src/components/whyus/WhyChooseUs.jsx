import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { siteContent } from "../../data/siteContent"

const EASE = [0.25, 0.46, 0.45, 0.94]

/* ────────────────────────────────────────────────────────────
   DECORATIVE ICON — small gold ornament above headline
──────────────────────────────────────────────────────────── */
function OrnamentIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"
      style={{ width: 36, height: 36, color: "#C4A97D" }}>
      <path d="M24 4 L24 44" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M4 24 L44 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10 10 L38 38" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
      <path d="M38 10 L10 38" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
      <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="24" cy="24" r="1.5" fill="currentColor"/>
      <circle cx="24" cy="4"  r="1.5" fill="currentColor"/>
      <circle cx="24" cy="44" r="1.5" fill="currentColor"/>
      <circle cx="4"  cy="24" r="1.5" fill="currentColor"/>
      <circle cx="44" cy="24" r="1.5" fill="currentColor"/>
    </svg>
  )
}

/* ────────────────────────────────────────────────────────────
   IMAGE BLOCK — large main image + small inset thumbnail
──────────────────────────────────────────────────────────── */
function ImageBlock({ images }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "4/5", maxHeight: 580 }}>

      {/* Main large image */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: "1.5rem" }}
        initial={{ opacity: 0, x: -32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <img
          src={images.main}
          alt="Skin specialist treating patient"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center top",
            display: "block",
          }}
          loading="lazy"
        />
      </motion.div>

      {/* Small inset image — bottom left corner */}
      <motion.div
        className="absolute overflow-hidden"
        style={{
          bottom: "1.5rem",
          left: "1.5rem",
          width: "36%",
          aspectRatio: "1 / 1",
          borderRadius: "1rem",
          border: "3px solid #fff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        }}
        initial={{ opacity: 0, y: 24, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.35, ease: EASE }}
      >
        <img
          src={images.tertiary}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          loading="lazy"
        />
        {/* Label badge over thumbnail */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(30,15,8,0.72) 0%, transparent 60%)",
          borderRadius: "0.8rem",
          display: "flex", alignItems: "flex-end",
          padding: "10px 10px",
        }}>
          <p style={{
            fontSize: "0.65rem", fontWeight: 600,
            color: "#fff", lineHeight: 1.4,
            fontFamily: "inherit",
          }}>
            <span style={{ color: "#C4A97D", marginRight: 4 }}>+</span>
            Advanced care.<br />
            <em>Thoughtful results.</em>
          </p>
        </div>
      </motion.div>

    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   ACCORDION ITEM — matches reference: light bg, number | divider | title, open=warm fill
──────────────────────────────────────────────────────────── */
function AccordionItem({ item, isOpen, onOpen, index }) {
  return (
    <motion.div
      onMouseEnter={onOpen}
      style={{
        borderRadius: 12,
        border: isOpen
          ? "1.5px solid rgba(196,97,74,0.30)"
          : "1.5px solid rgba(196,97,74,0.15)",
        background: isOpen ? "rgba(252,242,236,0.90)" : "rgba(255,255,255,0.85)",
        overflow: "hidden",
        transition: "border-color 0.25s, background 0.25s",
        cursor: "pointer",
      }}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.42, delay: 0.08 + index * 0.07 }}
    >
      <div
        aria-expanded={isOpen}
        style={{
          display: "flex", alignItems: "center",
          width: "100%", padding: "16px 18px",
          background: "none", border: "none",
          textAlign: "left", gap: 0,
        }}
      >
        {/* Number */}
        <span style={{
          fontSize: "0.78rem", fontWeight: 700,
          color: "#C4614A",
          minWidth: 28, flexShrink: 0,
          fontFamily: "'Playfair Display', Georgia, serif",
          letterSpacing: "0.02em",
        }}>
          {item.number}
        </span>

        {/* Vertical divider */}
        <span style={{
          width: 1, height: 22,
          background: "rgba(196,97,74,0.30)",
          marginLeft: 6, marginRight: 14,
          flexShrink: 0,
        }} />

        {/* Title */}
        <span style={{
          flex: 1,
          fontSize: "clamp(0.82rem, 1.1vw, 0.92rem)",
          fontWeight: 600,
          color: "#2a1208",
          lineHeight: 1.4,
          fontFamily: "inherit",
        }}>
          {item.title}
        </span>

        {/* Chevron circle */}
        <motion.span
          style={{
            flexShrink: 0, marginLeft: 12,
            width: 28, height: 28,
            borderRadius: "50%",
            border: "1.5px solid rgba(196,97,74,0.30)",
            background: isOpen ? "rgba(196,97,74,0.10)" : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#C4614A",
            transition: "background 0.2s",
          }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.26, ease: EASE }}
        >
          <svg viewBox="0 0 24 24" fill="none" width={13} height={13}>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              padding: "0 18px 16px 18px",
              fontSize: "0.83rem",
              lineHeight: 1.75,
              color: "#5a3a28",
              fontFamily: "inherit",
              margin: 0,
            }}>
              {item.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────
   MAIN SECTION
──────────────────────────────────────────────────────────── */
export default function WhyChooseUs() {
  const { badge, headline, description, images, ctaText, ctaHref, accordion } = siteContent.whyUs
  const [openIndex, setOpenIndex] = useState(3)

  return (
    <section
      id="why-us"
      style={{ position: "relative", overflow: "hidden", background: "transparent",
        padding: "clamp(56px,7vw,96px) 0" }}
    >
      {/* Decorative leaf — top right (purely visual) */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, right: 0,
        width: "clamp(120px,18vw,260px)", pointerEvents: "none", opacity: 0.55,
        zIndex: 0,
      }}>
        <svg viewBox="0 0 260 300" fill="none" style={{ width: "100%", height: "auto" }}>
          <path d="M200 10 Q260 80 240 160 Q220 240 160 280 Q200 200 190 120 Q180 60 200 10Z"
            fill="rgba(212,178,140,0.25)" stroke="rgba(196,154,107,0.30)" strokeWidth="1"/>
          <path d="M240 30 Q280 100 260 180 Q240 260 180 295 Q225 210 215 130 Q205 65 240 30Z"
            fill="rgba(212,178,140,0.15)"/>
        </svg>
      </div>
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0,
        width: "clamp(80px,12vw,180px)", pointerEvents: "none", opacity: 0.40,
        zIndex: 0, transform: "scaleX(-1)",
      }}>
        <svg viewBox="0 0 260 300" fill="none" style={{ width: "100%", height: "auto" }}>
          <path d="M200 10 Q260 80 240 160 Q220 240 160 280 Q200 200 190 120 Q180 60 200 10Z"
            fill="rgba(212,178,140,0.25)" stroke="rgba(196,154,107,0.30)" strokeWidth="1"/>
        </svg>
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 1160, margin: "0 auto",
        padding: "0 clamp(16px,5vw,48px)",
      }}>

        {/* ── Centered header ── */}
        <motion.div
          style={{ textAlign: "center", marginBottom: "clamp(36px,5vw,60px)" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Gold ornament */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <OrnamentIcon />
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.9rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "#2a1208",
            lineHeight: 1.15,
            margin: "0 0 18px",
            maxWidth: 640,
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            {headline}
          </h2>

          {/* Description */}
          <p style={{
            fontSize: "clamp(0.84rem,1vw,0.95rem)",
            color: "#4a2e1a",
            lineHeight: 1.78,
            maxWidth: 560,
            margin: "0 auto",
            fontWeight: 500,
          }}>
            {description}
          </p>
        </motion.div>

        {/* ── Two-column content ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(24px,4vw,60px)",
          alignItems: "start",
        }}
          className="why-choose-grid"
        >
          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <ImageBlock images={images} />
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 4 }}
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          >
            {accordion.map((item, i) => (
              <AccordionItem
                key={item.number}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onOpen={() => setOpenIndex(i)}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 720px) {
          .why-choose-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
