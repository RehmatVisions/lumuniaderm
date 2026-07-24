import { motion, AnimatePresence } from "framer-motion"
import { useState, useCallback, useEffect } from "react"

/* ─── Gallery data ───────────────────────────────────────────── */
const GALLERY_ITEMS = [
  {
    id: 1, category: "Clinic",
    title: "Reception & Lobby",
    caption: "Welcoming luxury space designed for patient comfort",
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=85&fit=crop",
  },
  {
    id: 2, category: "Treatments",
    title: "Laser Treatment Suite",
    caption: "State-of-the-art FDA-cleared laser systems",
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=85&fit=crop",
  },
  {
    id: 3, category: "Equipment",
    title: "Advanced Dermatology Tools",
    caption: "Clinical-grade equipment for precision treatments",
    src: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=85&fit=crop",
  },
  {
    id: 4, category: "Clinic",
    title: "Private Consultation Room",
    caption: "Serene one-on-one consultation spaces",
    src: "https://images.unsplash.com/photo-1666214277730-e2fba93c3d9d?w=800&q=85&fit=crop",
  },
  {
    id: 5, category: "Treatments",
    title: "Facial Treatment Room",
    caption: "Premium facial & rejuvenation suites",
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=85&fit=crop",
  },
  {
    id: 6, category: "Equipment",
    title: "Skin Analysis Station",
    caption: "High-resolution digital skin diagnostics",
    src: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=85&fit=crop",
  },
  {
    id: 7, category: "Clinic",
    title: "Relaxation Lounge",
    caption: "Post-treatment recovery in serene comfort",
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=85&fit=crop",
  },
  {
    id: 8, category: "Treatments",
    title: "PRP Hair Restoration",
    caption: "Advanced platelet-rich plasma therapy",
    src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=85&fit=crop",
  },
  {
    id: 9, category: "Equipment",
    title: "Phototherapy Unit",
    caption: "Precision light-based skin therapy systems",
    src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=85&fit=crop",
  },
]

const FILTERS = ["All", "Clinic", "Treatments", "Equipment"]
const EASE = [0.25, 0.46, 0.45, 0.94]

/* ─── Lightbox ───────────────────────────────────────────────── */
function Lightbox({ item, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape")      onClose()
      if (e.key === "ArrowRight")  onNext()
      if (e.key === "ArrowLeft")   onPrev()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      style={{ background: "rgba(5,4,3,0.92)", backdropFilter: "blur(22px)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-novaderm-gold/60 hover:text-white"
        style={{ background: "rgba(255,255,255,0.06)" }}
        onClick={onClose}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-novaderm-gold/60 hover:text-white"
        style={{ background: "rgba(255,255,255,0.06)" }}
        onClick={(e) => { e.stopPropagation(); onPrev() }}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 rotate-180">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
        </svg>
      </button>

      {/* Next */}
      <button
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-novaderm-gold/60 hover:text-white"
        style={{ background: "rgba(255,255,255,0.06)" }}
        onClick={(e) => { e.stopPropagation(); onNext() }}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
        </svg>
      </button>

      {/* Image */}
      <motion.div
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl"
        style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(193,154,107,0.18)" }}
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1,   y: 0  }}
        exit={{   opacity: 0, scale: 0.93, y: 16 }}
        transition={{ duration: 0.38, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.title}
          className="w-full object-cover"
          style={{ maxHeight: "76vh" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 p-6"
          style={{ background: "linear-gradient(to top, rgba(5,4,3,0.88) 0%, transparent 100%)" }}
        >
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-novaderm-gold/35 bg-novaderm-gold/12 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-novaderm-gold">
            {item.category}
          </span>
          <h3 className="font-serif text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-0.5 text-sm text-white/50">{item.caption}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Gallery card ───────────────────────────────────────────── */
function GalleryCard({ item, index, onOpen }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl"
      style={{ aspectRatio: "4/3" }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(item)}
    >
      {/* Image */}
      <motion.img
        src={item.src}
        alt={item.title}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.65, ease: EASE }}
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

      {/* Hover vignette */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: "rgba(0,0,0,0.18)" }}
      />

      {/* Border glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: hovered
            ? "inset 0 0 0 1.5px rgba(193,154,107,0.5)"
            : "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
        transition={{ duration: 0.28 }}
      />

      {/* Category badge */}
      <div className="absolute left-4 top-4">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-novaderm-gold/40 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-novaderm-gold backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-novaderm-gold" />
          {item.category}
        </span>
      </div>

      {/* Expand icon */}
      <motion.div
        className="absolute right-4 top-4"
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.75 }}
        transition={{ duration: 0.22 }}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm">
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
            <path d="M15 3h6m0 0v6m0-6l-7 7M9 21H3m0 0v-6m0 6l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.div>

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <motion.h3
          className="font-serif text-[0.95rem] font-semibold leading-snug text-white"
          animate={{ y: hovered ? 0 : 6, opacity: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {item.title}
        </motion.h3>
        <motion.p
          className="mt-0.5 text-[11px] leading-relaxed text-white/50"
          animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.32, delay: 0.04, ease: EASE }}
        >
          {item.caption}
        </motion.p>
      </div>
    </motion.article>
  )
}

/* ─── Filter tab ─────────────────────────────────────────────── */
function FilterTab({ label, active, onClick, count }) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-full px-5 py-2 text-[13px] font-semibold transition-colors duration-200"
      style={{ color: active ? "#fff" : "rgba(255,255,255,0.45)" }}
    >
      {active && (
        <motion.span
          layoutId="filter-pill"
          className="absolute inset-0 rounded-full"
          style={{ background: "linear-gradient(135deg, #c19a6b 0%, #a8825a 100%)" }}
          transition={{ type: "spring", bounce: 0.22, duration: 0.42 }}
        />
      )}
      <span className="relative flex items-center gap-2">
        {label}
        <span
          className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
          style={{
            background: active ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)",
            color: active ? "#fff" : "rgba(255,255,255,0.35)",
          }}
        >
          {count}
        </span>
      </span>
    </button>
  )
}

/* ─── MAIN SECTION ───────────────────────────────────────────── */
export default function ClinicGallery() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [lightbox, setLightbox]         = useState(null)

  const filtered = activeFilter === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((i) => i.category === activeFilter)

  const openLightbox  = useCallback((item) => setLightbox(item), [])
  const closeLightbox = useCallback(() => setLightbox(null), [])

  const gotoNext = useCallback(() => {
    if (!lightbox) return
    const idx = filtered.findIndex((i) => i.id === lightbox.id)
    setLightbox(filtered[(idx + 1) % filtered.length])
  }, [lightbox, filtered])

  const gotoPrev = useCallback(() => {
    if (!lightbox) return
    const idx = filtered.findIndex((i) => i.id === lightbox.id)
    setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length])
  }, [lightbox, filtered])

  const countFor = (cat) =>
    cat === "All" ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter((i) => i.category === cat).length

  return (
    <>
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            item={lightbox}
            onClose={closeLightbox}
            onNext={gotoNext}
            onPrev={gotoPrev}
          />
        )}
      </AnimatePresence>

      <section id="gallery" className="relative overflow-hidden py-20 lg:py-28"
        style={{ background: "#0e0b09" }}>

        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full blur-[120px]"
            style={{ background: "rgba(193,154,107,0.05)" }} />
          <div className="absolute -right-40 bottom-10 h-[500px] w-[500px] rounded-full blur-[120px]"
            style={{ background: "rgba(193,154,107,0.04)" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

          {/* ── Section header ── */}
          <div className="mb-12 flex flex-col items-center gap-4 text-center lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-novaderm-gold/30 bg-novaderm-gold/8 px-4 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-novaderm-gold opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-novaderm-gold" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-novaderm-gold">Clinic Gallery</span>
              </span>
            </motion.div>

            <motion.h2
              className="max-w-2xl font-serif text-[1.9rem] font-semibold leading-[1.16] tracking-tight text-white sm:text-[2.4rem] lg:text-[2.8rem]"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              A Glimpse Inside Our{" "}
              <span style={{
                background: "linear-gradient(135deg, #c19a6b 0%, #d4b08a 50%, #a8825a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                World-Class Clinic
              </span>
            </motion.h2>

            <motion.p
              className="max-w-lg text-[0.9rem] font-light leading-[1.75] text-white/45"
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}
            >
              Explore our state-of-the-art facilities, treatment suites, and advanced dermatology
              equipment — all designed to deliver the finest care experience.
            </motion.p>

            <motion.div
              className="h-px w-16 rounded-full"
              style={{ background: "linear-gradient(90deg, rgba(193,154,107,0), #c19a6b, rgba(193,154,107,0))" }}
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.22 }}
            />
          </div>

          {/* ── Filter tabs ── */}
          <motion.div
            className="mb-10 flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.18 }}
          >
            <div
              className="flex flex-wrap items-center justify-center gap-1.5 rounded-full p-1.5"
              style={{
                background:     "rgba(255,255,255,0.04)",
                border:         "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              {FILTERS.map((f) => (
                <FilterTab
                  key={f}
                  label={f}
                  active={activeFilter === f}
                  onClick={() => setActiveFilter(f)}
                  count={countFor(f)}
                />
              ))}
            </div>
          </motion.div>

          {/* ── Uniform grid ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.map((item, i) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={i}
                  onOpen={openLightbox}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── Bottom CTA ── */}
          <motion.div
            className="mt-14 flex flex-col items-center gap-4 text-center"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
          >
            <p className="text-sm text-white/35">
              Experience the difference in person — book your visit today.
            </p>
            <motion.a
              href="#contact"
              className="group inline-flex items-center gap-0"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            >
              <span
                className="rounded-l-full py-3 pl-6 pr-5 text-[13px] font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #c19a6b 0%, #a8825a 100%)", boxShadow: "0 8px 28px rgba(193,154,107,0.28)" }}
              >
                Book a Tour
              </span>
              <span
                className="flex h-[46px] w-[46px] items-center justify-center rounded-r-full text-white transition-transform duration-300 group-hover:rotate-45"
                style={{ background: "linear-gradient(135deg, #a8825a 0%, #8a6745 100%)", boxShadow: "0 8px 28px rgba(193,154,107,0.28)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </motion.a>
          </motion.div>

        </div>
      </section>
    </>
  )
}
