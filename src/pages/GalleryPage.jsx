/**
 * GalleryPage — Full clinic photo gallery
 *
 * HOW TO ADD PHOTOS:
 * 1. Import the image at the top of the CLINIC_IMAGES array section
 * 2. Add an entry: { src: yourImage, alt: "description", cat: "Reception" }
 * 3. If it's a new category, add it to FILTERS array too
 * Done — photo count and filters update automatically.
 */

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PageLayout from "../components/layout/PageLayout"

// ── Clinic images — easy to add more ──────────────────────────
// Just import and add to CLINIC_IMAGES below
import image01 from "../assets/clinicimages/image.png"
import image02 from "../assets/clinicimages/image copy.png"
import image03 from "../assets/clinicimages/image copy 2.png"
import image04 from "../assets/clinicimages/image copy 3.png"
import image05 from "../assets/clinicimages/image copy 4.png"
import image06 from "../assets/clinicimages/image copy 5.png"
import image07 from "../assets/clinicimages/image copy 6.png"
import image08 from "../assets/clinicimages/image copy 7.png"
import image09 from "../assets/clinicimages/image copy 8.png"
import image10 from "../assets/clinicimages/image copy 9.png"
import image11 from "../assets/clinicimages/image copy 10.png"
import image12 from "../assets/clinicimages/image copy 11.png"
import image13 from "../assets/clinicimages/image copy 12.png"

// ── Add or remove images here ─────────────────────────────────
const CLINIC_IMAGES = [
  { id: 1,  src: image03, alt: "Nova Derm reception area",         cat: "Reception"    },
  { id: 2,  src: image04, alt: "Reception lounge view",            cat: "Reception"    },
  { id: 3,  src: image01, alt: "Consultation lounge",              cat: "Waiting"      },
  { id: 4,  src: image02, alt: "Waiting area seating",             cat: "Waiting"      },
  { id: 5,  src: image06, alt: "Treatment room corridor",          cat: "Treatment"    },
  { id: 6,  src: image05, alt: "Treatment room interior",          cat: "Treatment"    },
  { id: 7,  src: image08, alt: "Treatment suite - wide view",      cat: "Treatment"    },
  { id: 8,  src: image09, alt: "Skincare treatment station",       cat: "Treatment"    },
  { id: 9,  src: image10, alt: "Treatment suite with equipment",   cat: "Treatment"    },
  { id: 10, src: image07, alt: "Luxury preparation room",          cat: "Interiors"    },
  { id: 11, src: image11, alt: "Clinic interior detail",           cat: "Interiors"    },
  { id: 12, src: image12, alt: "Doctor consultation room",         cat: "Details"      },
  { id: 13, src: image13, alt: "Specialist consultation suite",    cat: "Details"      },
]

// ── Filter categories — add new ones as needed ────────────────
const FILTERS = ["All", "Reception", "Waiting", "Treatment", "Interiors", "Details"]

const EASE_EXPO = [0.16, 1, 0.3, 1]

// ── Lightbox ──────────────────────────────────────────────────
function Lightbox({ image, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      className="fixed inset-0 z-[9000] flex items-center justify-center"
      style={{ background: "rgba(10,5,2,0.92)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full"
        style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
        aria-label="Close"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full"
        style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
        aria-label="Previous"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Image */}
      <motion.img
        key={image.id}
        src={image.src}
        alt={image.alt}
        className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
        style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: EASE_EXPO }}
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full"
        style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
        aria-label="Next"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Caption */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <span
          className="rounded-full px-5 py-2 text-sm font-semibold text-white/80"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
        >
          {image.alt}
        </span>
      </div>
    </motion.div>
  )
}

// ── Gallery Card ──────────────────────────────────────────────
function GalleryCard({ image, index, onOpen }) {
  return (
    <motion.article
      className="group relative cursor-pointer overflow-hidden"
      style={{ borderRadius: 18, background: "#f0ddd0", aspectRatio: "4/3" }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index % 6, 5) * 0.06, ease: EASE_EXPO }}
      onClick={() => onOpen(index)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(index)}
      role="button"
      aria-label={`View ${image.alt}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />

      {/* Overlay on hover */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "linear-gradient(to top, rgba(10,5,2,0.75) 0%, transparent 60%)" }}
      >
        <span
          className="inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90"
          style={{ background: "rgba(196,97,74,0.80)" }}
        >
          {image.cat}
        </span>
        <p className="mt-1.5 text-sm font-semibold text-white/90">{image.alt}</p>
      </div>

      {/* Zoom icon */}
      <div
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "rgba(255,255,255,0.90)" }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="#C4614A" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
        </svg>
      </div>
    </motion.article>
  )
}

// ── Filter Pill ───────────────────────────────────────────────
function FilterPill({ label, active, count, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-200"
      style={{ color: active ? "#fff" : "rgba(64,35,18,0.85)" }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      {active && (
        <motion.span
          layoutId="gallery-page-pill"
          className="absolute inset-0 rounded-full"
          style={{ background: "linear-gradient(135deg,#C4614A 0%,#a0432e 100%)" }}
          transition={{ type: "spring", bounce: 0.22, duration: 0.42 }}
        />
      )}
      <span className="relative flex items-center gap-1.5">
        {label}
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
          style={{
            background: active ? "rgba(255,255,255,0.22)" : "rgba(61,46,36,0.10)",
            color: active ? "#fff" : "#1a0f0a",
          }}
        >
          {count}
        </span>
      </span>
    </motion.button>
  )
}

// ── Leaf SVG Decoration ───────────────────────────────────────
function LeafDecoration({ side }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 124 245"
      fill="none"
      className={`pointer-events-none absolute top-[60px] hidden h-[245px] w-[124px] text-[#edbb9c]/45 xl:block ${
        side === "right" ? "-right-2 top-auto bottom-[160px] scale-x-[-1]" : "-left-2"
      }`}
    >
      <path d="M6 231C49 188 60 132 61 70C61 49 66 27 82 8" stroke="currentColor" strokeWidth="1.15" />
      <path d="M60 79C42 67 34 50 34 30C48 42 57 58 60 79Z" stroke="currentColor" strokeWidth="1.15" />
      <path d="M61 68C77 54 88 36 91 15C74 29 65 47 61 68Z" stroke="currentColor" strokeWidth="1.15" />
      <path d="M55 116C34 108 20 94 14 75C34 83 49 96 55 116Z" stroke="currentColor" strokeWidth="1.15" />
      <path d="M56 105C77 96 92 83 102 65C79 69 64 84 56 105Z" stroke="currentColor" strokeWidth="1.15" />
      <path d="M43 153C23 150 9 141 1 126C20 127 35 137 43 153Z" stroke="currentColor" strokeWidth="1.15" />
      <path d="M46 142C67 138 84 129 97 114C75 113 57 124 46 142Z" stroke="currentColor" strokeWidth="1.15" />
    </svg>
  )
}

// ── Main Page ─────────────────────────────────────────────────
export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const navigate = useNavigate()

  const filtered = activeFilter === "All"
    ? CLINIC_IMAGES
    : CLINIC_IMAGES.filter((img) => img.cat === activeFilter)

  const countFor = (cat) =>
    cat === "All" ? CLINIC_IMAGES.length : CLINIC_IMAGES.filter((i) => i.cat === cat).length

  const openLightbox = (idx) => setLightboxIdx(idx)
  const closeLightbox = () => setLightboxIdx(null)
  const prevPhoto = () => setLightboxIdx((i) => (i - 1 + filtered.length) % filtered.length)
  const nextPhoto = () => setLightboxIdx((i) => (i + 1) % filtered.length)

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <PageLayout>
      <main>
        {/* ── Hero Header ──────────────────────────────────── */}
        <section
          className="relative overflow-hidden py-16 lg:py-20"
          style={{ background: "transparent" }}
        >
          <LeafDecoration side="left" />
          <LeafDecoration side="right" />

          <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">

            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold" aria-label="Breadcrumb">
              <button
                onClick={() => navigate("/")}
                className="transition-colors hover:text-[#C4614A]"
                style={{ color: "rgba(61,36,20,0.60)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                Home
              </button>
              <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" style={{ color: "rgba(61,36,20,0.35)" }}>
                <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span style={{ color: "#C4614A" }}>Gallery</span>
            </nav>

            {/* Title */}
            <div className="mb-10 text-center">
              <div className="mb-4 flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: "#c45238" }}>
                <span className="h-px w-8 bg-[#df957e]" />
                Our Clinic
                <span className="h-px w-8 bg-[#df957e]" />
              </div>

              <h1
                className="font-semibold leading-[1.08] tracking-tight"
                style={{
                  fontSize: "clamp(2rem,5vw,3.6rem)",
                  color: "#18110d",
                  fontFamily: "'Nunito', system-ui, sans-serif",
                  fontWeight: 800,
                }}
              >
                Step Inside Nova Derm.
              </h1>

              <p className="mx-auto mt-4 max-w-[620px] leading-[1.7]" style={{ fontSize: "clamp(0.9rem,1.2vw,1.05rem)", color:"#1a0f0a" }}>
                Explore the calm, modern spaces created around your comfort and care.
              </p>

              {/* Photo count badge */}
              <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-[#eab89e] px-5 py-2 text-sm font-bold uppercase tracking-wide" style={{ color: "#be4b34" }}>
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="9" cy="9" r="1.7" fill="currentColor" />
                  <path d="m5.8 18 4.3-4.5 3.1 3 2.4-2.3 2.6 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {CLINIC_IMAGES.length} Photos
              </div>
            </div>

            {/* ── Filter Bar ──────────────────────────────── */}
            <div className="mb-8 flex justify-center">
              <div
                className="flex flex-wrap items-center justify-center gap-1 rounded-full p-1.5"
                style={{
                  background: "rgba(252,238,231,0.85)",
                  border: "1px solid rgba(196,97,74,0.22)",
                }}
              >
                {FILTERS.map((f) => (
                  <FilterPill
                    key={f}
                    label={f}
                    active={activeFilter === f}
                    count={countFor(f)}
                    onClick={() => setActiveFilter(f)}
                  />
                ))}
              </div>
            </div>

            {/* ── Gallery Grid ──────────────────────────── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {filtered.length === 0 ? (
                  <div className="py-20 text-center" style={{ color:"#1a0f0a" }}>
                    No photos in this category yet.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((img, i) => (
                      <GalleryCard key={img.id} image={img} index={i} onOpen={openLightbox} />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* ── Bottom CTA ──────────────────────────────── */}
            <motion.div
              className="mt-16 overflow-hidden rounded-[22px] py-12 text-center"
              style={{
                background: "linear-gradient(135deg,#C4614A 0%,#a0432e 100%)",
                position: "relative",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Decorative circles */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />

              <div className="relative">
                <h2 className="mb-2 font-bold text-white" style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontFamily: "'Nunito',system-ui,sans-serif" }}>
                  Ready to Begin Your Skin Journey?
                </h2>
                <p className="mb-6 text-white/80" style={{ fontSize: "0.95rem" }}>
                  Our experts are here to guide you with care that's personalised, safe and effective.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <motion.a
                    href="/#contact"
                    onClick={(e) => { e.preventDefault(); navigate("/#contact") }}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wide"
                    style={{ color: "#C4614A", textDecoration: "none" }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Book a Consultation
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                  <div className="flex items-center gap-2 text-white/75 text-sm font-semibold">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                    Trusted care, lasting confidence.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIdx !== null && (
            <Lightbox
              image={filtered[lightboxIdx]}
              onClose={closeLightbox}
              onPrev={prevPhoto}
              onNext={nextPhoto}
            />
          )}
        </AnimatePresence>
      </main>
    </PageLayout>
  )
}
