import { motion, AnimatePresence, useInView } from "framer-motion"
import { useState, useCallback, useEffect, useRef } from "react"
import { useReveal } from "../../hooks/useReveal"

/* ── Clinic images ── */
import img0  from "../../assets/clinicimages/image.png"
import img1  from "../../assets/clinicimages/image copy.png"
import img2  from "../../assets/clinicimages/image copy 2.png"
import img3  from "../../assets/clinicimages/image copy 3.png"
import img4  from "../../assets/clinicimages/image copy 4.png"
import img5  from "../../assets/clinicimages/image copy 5.png"
import img6  from "../../assets/clinicimages/image copy 6.png"
import img7  from "../../assets/clinicimages/image copy 7.png"
import img8  from "../../assets/clinicimages/image copy 8.png"
import img9  from "../../assets/clinicimages/image copy 9.png"
import img10 from "../../assets/clinicimages/image copy 10.png"
import img11 from "../../assets/clinicimages/image copy 11.png"
import img12 from "../../assets/clinicimages/image copy 12.png"

const EASE = [0.25, 0.46, 0.45, 0.94]
const EASE_EXPO = [0.16, 1, 0.3, 1]

/* Each image mapped to what it actually shows */
const GALLERY = [
  { id:1,  src:img2,  cat:"Reception",   title:"Grand Reception",          caption:"Neon face art, glowing shelves & a statement welcome desk"  },
  { id:2,  src:img3,  cat:"Reception",   title:"Reception Lounge View",    caption:"Sweeping view of our iconic entrance with coffee corner"      },
  { id:3,  src:img5,  cat:"Waiting",     title:"Main Waiting Lounge",      caption:'"Where skin glows, Energy flows" — our signature lounge'    },
  { id:4,  src:img4,  cat:"Waiting",     title:"Serenity Waiting Area",    caption:'"Smile, it\'s free therapy" — a calming pre-session space'   },
  { id:5,  src:img0,  cat:"Lounge",      title:"Consultation Lounge",      caption:"Terracotta chairs & face-art wall panels for intimate consults"},
  { id:6,  src:img1,  cat:"Lounge",      title:"Art Wall Detail",          caption:"Hand-crafted face silhouette panels, warmly lit"             },
  { id:7,  src:img7,  cat:"Treatment",   title:"Treatment Suite — Front",  caption:"Reclined treatment chair facing the panoramic window"        },
  { id:8,  src:img9,  cat:"Treatment",   title:"Treatment Suite — Side",   caption:"Rose-gold chair with lit oval mirror & oak consultation desk" },
  { id:9,  src:img10, cat:"Treatment",   title:"Treatment Suite — Wide",   caption:"Full equipment view: chair, trolley & lush indoor greenery"   },
  { id:10, src:img8,  cat:"Treatment",   title:"Skincare Station",         caption:"Premium skincare products lined at the treatment counter"     },
  { id:11, src:img6,  cat:"Amenities",   title:"Luxury Prep Room",         caption:"Gold-framed oval mirror, curved light-art wall & product shelves"},
  { id:12, src:img11, cat:"Consultation","title":"Doctor's Office",        caption:'"Filters are great but skin care is better" — our philosophy'},
  { id:13, src:img12, cat:"Consultation","title":"Specialist Suite",       caption:"Warm, intimate doctor's office with glowing arch accent wall"  },
]

const FILTERS = ["All", "Reception", "Waiting", "Lounge", "Treatment", "Amenities", "Consultation"]

/* ─── Gallery Card — CSS reveal, no framer overhead ─────────── */
function GalleryCard({ item, index, featured = false }) {
  const [hovered, setHovered] = useState(false)
  // stagger delay capped at delay-8
  const delayClass = `reveal-delay-${Math.min(index % 4, 8)}`

  return (
    <article
      className={`reveal reveal-scale reveal-duration-600 ${delayClass} group relative w-full overflow-hidden`}
      style={{
        borderRadius: "1.5rem",
        aspectRatio: featured ? "16/7" : "4/3",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 600)}
    >
      {/* Image fills card completely */}
      <motion.img
        src={item.src} alt={item.title} draggable={false} loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.75, ease: EASE }}
      />

      {/* Dark gradient at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      {/* Hover gold wash */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(193,154,107,0.16) 0%, transparent 60%)" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* Border glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ borderRadius: "1.5rem" }}
        animate={{ boxShadow: hovered ? "inset 0 0 0 2px rgba(193,154,107,0.55)" : "inset 0 0 0 1px rgba(255,255,255,0.06)" }}
        transition={{ duration: 0.28 }}
      />

      {/* Category chip — top left */}
      <motion.div
        className="absolute left-4 top-4"
        animate={{ y: hovered ? -2 : 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-novaderm-gold/45 bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-novaderm-gold backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-novaderm-gold" />
          {item.cat}
        </span>
      </motion.div>

      {/* Expand icon — removed (no click functionality) */}

      {/* Title + caption — bottom */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <motion.h3
          className="font-serif text-base font-semibold leading-snug text-white sm:text-lg"
          animate={{ y: hovered ? 0 : 6, opacity: 1 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {item.title}
        </motion.h3>
        <motion.p
          className="mt-1 text-xs leading-relaxed text-white/50"
          animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.32, delay: 0.05, ease: EASE }}
        >
          {item.caption}
        </motion.p>
      </div>
    </article>
  )
}

/* ─── Filter Tab ────────────────────────────────────────────── */
function FilterTab({ label, active, onClick, count }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative rounded-full px-4 py-2 text-[12px] font-semibold transition-colors duration-200"
      style={{ color: active ? "#fff" : "rgba(255,255,255,0.45)" }}
      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
    >
      {active && (
        <motion.span
          layoutId="gallery-pill"
          className="absolute inset-0 rounded-full"
          style={{ background: "linear-gradient(135deg, #c19a6b 0%, #a8825a 100%)" }}
          transition={{ type: "spring", bounce: 0.22, duration: 0.42 }}
        />
      )}
      <span className="relative flex items-center gap-1.5">
        {label}
        <span className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
          style={{ background: active ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)", color: active ? "#fff" : "rgba(255,255,255,0.35)" }}>
          {count}
        </span>
      </span>
    </motion.button>
  )
}

/* ─── Marquee strip ─────────────────────────────────────────── */
const MARQUEE_WORDS = ["Reception","Treatment Suites","Consultation Room","Waiting Lounge","Prep Room","Doctor's Office","Premium Care","Advanced Clinic"]
function MarqueeStrip() {
  const words = [...MARQUEE_WORDS, ...MARQUEE_WORDS]
  return (
    <div className="relative overflow-hidden py-4 border-y" style={{ borderColor: "rgba(193,154,107,0.14)" }}>
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {words.map((w, i) => (
          <span key={i} className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "rgba(193,154,107,0.55)" }}>
            {w}
            <span className="h-1 w-1 rounded-full" style={{ background: "rgba(193,154,107,0.40)" }} />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ─── MAIN SECTION ──────────────────────────────────────────── */
export default function ClinicGallery() {
  const [activeFilter, setActiveFilter] = useState("All")
  const gridRef = useReveal({ rootMargin: "-40px 0px", threshold: 0.06 })

  const filtered = activeFilter === "All" ? GALLERY : GALLERY.filter(i => i.cat === activeFilter)
  const countFor = (cat) => cat === "All" ? GALLERY.length : GALLERY.filter(i => i.cat === cat).length

  /* Split: first item is the hero card (full-width), rest go in the grid */
  const [heroItem, ...gridItems] = filtered
  const showHero = activeFilter === "All" && filtered.length > 0

  return (
    <section id="gallery" className="relative overflow-hidden" style={{ background: "#080604" }}>

        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-60 top-20 h-[600px] w-[600px] rounded-full blur-[140px]" style={{ background: "rgba(193,154,107,0.055)" }} />
          <div className="absolute -right-60 bottom-20 h-[600px] w-[600px] rounded-full blur-[140px]" style={{ background: "rgba(193,154,107,0.04)" }} />
          <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full blur-[120px]" style={{ background: "rgba(193,154,107,0.028)" }} />
        </div>

        {/* ── Section Header ── */}
        <div className="relative mx-auto max-w-[1440px] px-4 pt-20 sm:px-6 lg:px-12 lg:pt-28">
          <div className="mb-14 flex flex-col items-center gap-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-novaderm-gold/35 bg-novaderm-gold/10 px-5 py-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-novaderm-gold opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-novaderm-gold" />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-novaderm-gold">Our Clinic</span>
              </span>
            </motion.div>

            <motion.h2
              className="max-w-3xl font-serif font-semibold leading-[1.12] tracking-tight text-white"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.08, ease: EASE_EXPO }}
            >
              Step Inside{" "}
              <span style={{ background: "linear-gradient(135deg, #c19a6b 0%, #e8c98a 50%, #a8825a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Novaderm
              </span>
              {" "}— Where Luxury Meets Science
            </motion.h2>

            <motion.p
              className="max-w-xl text-[0.92rem] font-light leading-[1.8] text-white/45"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Every corner of our clinic is crafted to make you feel at ease — from the welcoming reception
              to our cutting-edge treatment suites and specialist consultation rooms.
            </motion.p>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.22 }}
            >
              <motion.div className="h-px bg-gradient-to-r from-transparent to-novaderm-gold" style={{ width: 48 }}
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }} />
              <span className="h-1.5 w-1.5 rounded-full bg-novaderm-gold" />
              <motion.div className="h-px bg-gradient-to-l from-transparent to-novaderm-gold" style={{ width: 48 }}
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }} />
            </motion.div>
          </div>

          {/* Marquee */}
          <MarqueeStrip />

          {/* Filters */}
          <motion.div
            className="my-10 flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-1 rounded-full p-1.5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(12px)" }}>
              {FILTERS.map(f => (
                <FilterTab key={f} label={f} active={activeFilter === f}
                  onClick={() => setActiveFilter(f)} count={countFor(f)} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Gallery Grid ── */}
        <div ref={gridRef} className="relative mx-auto max-w-[1440px] px-4 pb-20 sm:px-6 lg:px-12 lg:pb-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero row — full width card (only on "All" filter) */}
              {showHero && (
                <div className="mb-4 sm:mb-5">
                  <GalleryCard item={heroItem} index={0} featured={true} />
                </div>
              )}

              {/* Uniform 3-column grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
                {(showHero ? gridItems : filtered).map((item, i) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    index={showHero ? i + 1 : i}
                    featured={false}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Bottom CTA ── */}
          <motion.div
            className="mt-16 flex flex-col items-center gap-5 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-sm text-white/30">Experience the difference in person.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="#contact"
                className="group inline-flex items-center gap-0 overflow-hidden rounded-full"
                style={{ boxShadow: "0 10px 36px rgba(193,154,107,0.30)" }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              >
                <span
                  className="py-3.5 pl-7 pr-5 text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #c19a6b 0%, #a8825a 100%)" }}
                >
                  Book a Visit
                </span>
                <span
                  className="flex h-[50px] w-[50px] items-center justify-center text-white transition-transform duration-300 group-hover:rotate-45"
                  style={{ background: "linear-gradient(135deg, #a8825a 0%, #8a6745 100%)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </motion.a>

              <motion.a
                href="#gallery"
                className="inline-flex items-center gap-2 rounded-full border border-white/14 px-6 py-3.5 text-sm font-semibold text-white/55 hover:border-novaderm-gold/50 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                  <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                  <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                  <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
                View All {GALLERY.length} Photos
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
  )
}
