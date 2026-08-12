// import { motion, AnimatePresence, useInView } from "framer-motion"
// import { useState, useRef } from "react"
// import TextReveal from "../ui/TextReveal"
// import SectionBadge from "../ui/SectionBadge"

// /* ── Clinic images ── */
// import img0  from "../../assets/clinicimages/image.png"
// import img1  from "../../assets/clinicimages/image copy.png"
// import img2  from "../../assets/clinicimages/image copy 2.png"
// import img3  from "../../assets/clinicimages/image copy 3.png"
// import img4  from "../../assets/clinicimages/image copy 4.png"
// import img5  from "../../assets/clinicimages/image copy 5.png"
// import img6  from "../../assets/clinicimages/image copy 6.png"
// import img7  from "../../assets/clinicimages/image copy 7.png"
// import img8  from "../../assets/clinicimages/image copy 8.png"
// import img9  from "../../assets/clinicimages/image copy 9.png"
// import img10 from "../../assets/clinicimages/image copy 10.png"
// import img11 from "../../assets/clinicimages/image copy 11.png"
// import img12 from "../../assets/clinicimages/image copy 12.png"

// const EASE      = [0.25, 0.46, 0.45, 0.94]
// const EASE_EXPO = [0.16, 1,    0.3,  1   ]

// const GALLERY = [
//   { id:1,  src:img2,  cat:"Reception",   title:"Grand Reception",         caption:"Neon face art, glowing shelves & a statement welcome desk"   },
//   { id:2,  src:img3,  cat:"Reception",   title:"Reception Lounge View",   caption:"Sweeping view of our iconic entrance with coffee corner"       },
//   { id:3,  src:img5,  cat:"Waiting",     title:"Main Waiting Lounge",     caption:'"Where skin glows, Energy flows" — our signature lounge'     },
//   { id:4,  src:img4,  cat:"Waiting",     title:"Serenity Waiting Area",   caption:'"Smile, it\'s free therapy" — a calming pre-session space'    },
//   { id:5,  src:img0,  cat:"Lounge",      title:"Consultation Lounge",     caption:"Terracotta chairs & face-art wall panels for intimate consults"},
//   { id:6,  src:img1,  cat:"Lounge",      title:"Art Wall Detail",         caption:"Hand-crafted face silhouette panels, warmly lit"              },
//   { id:7,  src:img7,  cat:"Treatment",   title:"Treatment Suite — Front", caption:"Reclined treatment chair facing the panoramic window"         },
//   { id:8,  src:img9,  cat:"Treatment",   title:"Treatment Suite — Side",  caption:"Rose-gold chair with lit oval mirror & oak consultation desk"  },
//   { id:9,  src:img10, cat:"Treatment",   title:"Treatment Suite — Wide",  caption:"Full equipment view: chair, trolley & lush indoor greenery"    },
//   { id:10, src:img8,  cat:"Treatment",   title:"Skincare Station",        caption:"Premium skincare products lined at the treatment counter"      },
//   { id:11, src:img6,  cat:"Amenities",   title:"Luxury Prep Room",        caption:"Gold-framed oval mirror, curved light-art wall & product shelves"},
//   { id:12, src:img11, cat:"Consultation",title:"Doctor's Office",         caption:'"Filters are great but skin care is better" — our philosophy' },
//   { id:13, src:img12, cat:"Consultation",title:"Specialist Suite",        caption:"Warm, intimate doctor's office with glowing arch accent wall"   },
// ]

// const FILTERS = ["All", "Reception", "Waiting", "Lounge", "Treatment", "Amenities", "Consultation"]

// /* ─── Gallery Card ───────────────────────────────────────────── */
// function GalleryCard({ item, index, featured = false }) {
//   const [hovered, setHovered] = useState(false)
//   const ref    = useRef(null)
//   // always: once=false so re-renders after filter change still animate in
//   const inView = useInView(ref, { once: false, margin: "-40px" })

//   return (
//     <motion.article
//       ref={ref}
//       className="group relative w-full overflow-hidden img-shine"
//       style={{
//         borderRadius: "1.5rem",
//         aspectRatio: featured ? "16/7" : "4/3",
//         cursor: "default",
//         // explicit initial opacity so cards are NEVER invisible before animation
//         backgroundColor: "#F5D5C0",
//       }}
//       initial={{ opacity: 0, y: 28, scale: 0.96 }}
//       animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.96 }}
//       transition={{ duration: 0.5, delay: Math.min(index % 4, 3) * 0.07, ease: EASE_EXPO }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       onTouchStart={() => setHovered(true)}
//       onTouchEnd={() => setTimeout(() => setHovered(false), 5000)}
//     >
//       {/* Image */}
//       <motion.img
//         src={item.src}
//         alt={item.title}
//         draggable={false}
//         loading="lazy"
//         decoding="async"
//         className="absolute inset-0 h-full w-full object-cover"
//         animate={{ scale: hovered ? 1.06 : 1 }}
//         transition={{ duration: 0.7, ease: EASE }}
//       />

//       {/* Bottom gradient */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

//       {/* Hover gold wash */}
//       <motion.div
//         className="absolute inset-0"
//         style={{ background: "linear-gradient(135deg, rgba(193,154,107,0.14) 0%, transparent 60%)" }}
//         animate={{ opacity: hovered ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//       />

//       {/* Border glow on hover */}
//       <motion.div
//         className="pointer-events-none absolute inset-0"
//         style={{ borderRadius: "1.5rem" }}
//         animate={{
//           boxShadow: hovered
//             ? "inset 0 0 0 1.5px rgba(193,154,107,0.55)"
//             : "inset 0 0 0 1px rgba(255,255,255,0.05)",
//         }}
//         transition={{ duration: 0.25 }}
//       />

//       {/* Category chip */}
//       <div className="absolute left-4 top-4">
//         <span className="inline-flex items-center gap-1.5 rounded-full border border-novaderm-gold/45 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-novaderm-gold">
//           <span className="h-1.5 w-1.5 rounded-full bg-novaderm-gold" />
//           {item.cat}
//         </span>
//       </div>

//       {/* Title + caption */}
//       <div className="absolute inset-x-0 bottom-0 p-5">
//         <h3 className="font-serif text-base font-semibold leading-snug text-white sm:text-lg">
//           {item.title}
//         </h3>
//         <motion.p
//           className="mt-1 text-[11px] font-semibold leading-relaxed text-white/85"
//           animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
//           transition={{ duration: 0.25 }}
//         >
//           {item.caption}
//         </motion.p>
//       </div>
//     </motion.article>
//   )
// }

// /* ─── Filter Tab ─────────────────────────────────────────────── */
// function FilterTab({ label, active, onClick, count }) {
//   return (
//     <motion.button
//       onClick={onClick}
// className="relative rounded-full px-5 py-3 text-[15px] font-bold tracking-wide transition-colors duration-200"      style={{ color: active ? "#fff" : "rgba(64, 35, 18, 0.85)" }}
//       whileHover={{ scale: 1.04 }}
//       whileTap={{ scale: 0.96 }}
//     >
//       {active && (
//         <motion.span
//           layoutId="gallery-pill"
//           className="absolute inset-0 rounded-full"
//           style={{ background: "linear-gradient(135deg, #c19a6b 0%, #a8825a 100%)" }}
//           transition={{ type: "spring", bounce: 0.22, duration: 0.42 }}
//         />
//       )}
//       <span className="relative flex items-center gap-1.5">
//         {label}
//         <span
//           className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
//           style={{
//             background: active ? "rgba(255,255,255,0.22)" : "rgba(61,46,36,0.10)",
//          color: active ? "#fff" : "#1A0F0A",
//           }}
//         >
//           {count}
//         </span>
//       </span>
//     </motion.button>
//   )
// }

// /* ─── Marquee strip ──────────────────────────────────────────── */
// const MARQUEE_WORDS = [
//   "Reception", "Treatment Suites", "Consultation Room",
//   "Waiting Lounge", "Prep Room", "Doctor's Office", "Premium Care", "Advanced Clinic",
// ]
// function MarqueeStrip() {
//   const words = [...MARQUEE_WORDS, ...MARQUEE_WORDS]
//   return (
//     <div
//       className="relative overflow-hidden py-4 border-y"
//       style={{ borderColor: "rgba(193,154,107,0.30)" }}
//     >
//       <motion.div
//         className="flex gap-8 whitespace-nowrap"
//         animate={{ x: ["0%", "-50%"] }}
//         transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
//       >
//         {words.map((w, i) => (
//           <span
//             key={i}
//             className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.22em]"
//             style={{ color: "rgba(27, 15, 3, 0.85)" }}
//           >
//             {w}
//             <span className="h-1 w-1 rounded-full" style={{ background: "rgba(193,154,107,0.40)" }} />
//           </span>
//         ))}
//       </motion.div>
//     </div>
//   )
// }

// /* ─── MAIN SECTION ───────────────────────────────────────────── */
// export default function ClinicGallery() {
//   const [activeFilter, setActiveFilter] = useState("All")

//   const filtered = activeFilter === "All" ? GALLERY : GALLERY.filter(i => i.cat === activeFilter)
//   const countFor = (cat) => cat === "All" ? GALLERY.length : GALLERY.filter(i => i.cat === cat).length

//   const [heroItem, ...gridItems] = filtered
//   const showHero = activeFilter === "All" && filtered.length > 0

//   return (
//     <section id="gallery" className="relative overflow-hidden" style={{ background: "transparent" }}>

//       {/* Static ambient — NO blur filter */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
//         <div className="absolute -left-60 top-20 h-[600px] w-[600px] rounded-full"
//           style={{ background: "radial-gradient(circle, rgba(193,154,107,0.12) 0%, transparent 70%)" }} />
//         <div className="absolute -right-60 bottom-20 h-[500px] w-[500px] rounded-full"
//           style={{ background: "radial-gradient(circle, rgba(252,238,231,0.60) 0%, transparent 70%)" }} />
//       </div>

//       {/* ── Section Header ── */}
//       <div className="relative mx-auto max-w-[1440px] px-4 pt-20 sm:px-6 lg:px-12 lg:pt-28">
//         <div className="mb-14 flex flex-col items-center gap-4 text-center">

//           <SectionBadge text="Our Clinic" />

//           <TextReveal
//             as="h2"
//             className="max-w-3xl font-serif font-semibold leading-[1.12] tracking-tight"
//             style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#1a0f0a" }}
//             delay={60}
//             stagger={50}
//           >
//             Step Inside Novaderm — Where Luxury Meets Care
//           </TextReveal>

//           <motion.p
//             className="max-w-xl text-[0.92rem] font-normal leading-[1.8]"
//             style={{ color: "#361c0c" }}
//             initial={{ opacity: 0, y: 14 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.15 }}
//           >
//             Every corner of our clinic is crafted to make you feel at ease — from the welcoming reception
//             to our cutting-edge treatment suites and specialist consultation rooms.
//           </motion.p>

//           <motion.div
//             className="flex items-center gap-3"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <motion.div className="h-px bg-gradient-to-r from-transparent to-novaderm-gold" style={{ width: 48 }}
//               initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
//               transition={{ duration: 0.7, delay: 0.3 }} />
//             <span className="h-1.5 w-1.5 rounded-full bg-novaderm-gold" />
//             <motion.div className="h-px bg-gradient-to-l from-transparent to-novaderm-gold" style={{ width: 48 }}
//               initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
//               transition={{ duration: 0.7, delay: 0.3 }} />
//           </motion.div>
//         </div>

//         {/* Marquee */}
//         <MarqueeStrip />

//         {/* Filters */}
//         <motion.div
//           className="my-10 flex flex-wrap items-center justify-center gap-2"
//           initial={{ opacity: 0, y: 14 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           <div
//             className="flex flex-wrap items-center justify-center gap-1 rounded-full p-1.5"
//             style={{
//               background: "rgba(252,238,231,0.80)",
//               border: "1px solid rgba(193,154,107,0.25)",
//             }}
//           >
//             {FILTERS.map(f => (
//               <FilterTab
//                 key={f}
//                 label={f}
//                 active={activeFilter === f}
//                 onClick={() => setActiveFilter(f)}
//                 count={countFor(f)}
//               />
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* ── Gallery Grid ── */}
//       <div className="relative mx-auto max-w-[1440px] px-4 pb-20 sm:px-6 lg:px-12 lg:pb-28">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeFilter}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             {/* Hero row — full width (only on "All" filter) */}
//             {showHero && (
//               <div className="mb-4 sm:mb-5">
//                 <GalleryCard item={heroItem} index={0} featured={true} />
//               </div>
//             )}

//             {/* Grid */}
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
//               {(showHero ? gridItems : filtered).map((item, i) => (
//                 <GalleryCard
//                   key={item.id}
//                   item={item}
//                   index={showHero ? i + 1 : i}
//                   featured={false}
//                 />
//               ))}
//             </div>
//           </motion.div>
//         </AnimatePresence>

//         {/* ── Bottom CTA ── */}
//         <motion.div
//           className="mt-16 flex flex-col items-center gap-5 text-center"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <p className="text-sm font-semibold text-novaderm-brown">Experience the difference in person.</p>
//           <div className="flex flex-wrap items-center justify-center gap-4">
//             <motion.a
//               href="#contact"
//               className="group inline-flex items-center gap-0 overflow-hidden rounded-full"
//               style={{ boxShadow: "0 10px 36px rgba(220, 177, 124, 0.3)" }}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.97 }}
//             >
//               <span
//                 className="py-3.5 pl-7 pr-5 text-sm font-bold text-white"
//                 style={{ background: "linear-gradient(135deg, #c19a6b 0%, #a8825a 100%)" }}
//               >
//                 Book a Visit
//               </span>
//               <span
//                 className="flex h-[50px] w-[50px] items-center justify-center text-white transition-transform duration-300 group-hover:rotate-45"
//                 style={{ background: "linear-gradient(135deg, #a8825a 0%, #8a6745 100%)" }}
//               >
//                 <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
//                   <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </span>
//             </motion.a>

//             <motion.a
//               href="#gallery"
//               className="inline-flex items-center gap-2 rounded-full border border-novaderm-brown/30 px-6 py-3.5 text-sm font-bold text-novaderm-brown/85 hover:border-novaderm-gold/50 hover:text-novaderm-brown transition-colors duration-200"
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//             >
//               <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
//                 <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
//                 <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
//                 <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
//                 <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
//               </svg>
//               View All {GALLERY.length} Photos
//             </motion.a>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }



















import { AnimatePresence, motion } from "framer-motion"
import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"

/*
 * ADDING PHOTOS IS EASY:
 * 1. Import the new image below.
 * 2. Add it to CLINIC_IMAGES.
 * The photo counter and full gallery update automatically.
 */

// ── HD clinic images ──────────────────────────────────────────
import dummyImg from "../../assets/clinicimages/new/dummy.webp"
const hd01 = dummyImg
const hd02 = dummyImg
const hd09 = dummyImg
const hd15 = dummyImg
const hd17 = dummyImg
const hd14 = dummyImg
const hd28 = dummyImg

// Total images count (matches GalleryPage — all 29 photos)
const TOTAL_IMAGES = 29

/*
 * 7 distinct preview images for the homepage grid.
 *   [0] hd01  — Reception lobby (wide view)        — large featured left
 *   [1] hd14  — Consultation office (warm brown)   — top row
 *   [2] hd02  — Waiting lounge (quote wall)        — top row
 *   [3] hd17  — Treatment room (amber chair)       — top row
 *   [4] hd28  — Doctor's office (motivation wall)  — bottom row
 *   [5] hd09  — Procedure room (curved wall)       — bottom row
 *   [6] hd29  — Procedure room (twin chairs)       — bottom row
 */
const PREVIEW_IMAGES = [
  { src: hd01, alt: "Reception lobby — wide view" },
  { src: hd14, alt: "Consultation office — warm brown" },
  { src: hd02, alt: "Waiting lounge — quote wall" },
  { src: hd17, alt: "Treatment room — amber chair" },
  { src: hd28, alt: "Doctor's office — motivation wall" },
  { src: hd09, alt: "Procedure room — curved wall" },
  { src: hd15, alt: "Consultation office — sage green" },
]

function GalleryImage({ image, className = "" }) {
  const [loaded, setLoaded] = useState(false)
  const onLoad = useCallback(() => setLoaded(true), [])

  return (
    <div className={`group relative min-h-0 overflow-hidden rounded-[16px] bg-[#efd9ca] ${className}`}>
      {/* Skeleton shimmer shown until image loads */}
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: "linear-gradient(90deg,#efd9ca 25%,#f5e4d8 50%,#efd9ca 75%)", backgroundSize: "200% 100%" }}
          aria-hidden="true"
        />
      )}
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        onLoad={onLoad}
        className="h-full w-full object-cover transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.035]"
        style={{
          opacity: loaded ? 1 : 0,
          willChange: "transform, opacity",
        }}
      />
    </div>
  )
}

function LeafDecoration({ side }) {
  const right = side === "right"

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 124 245"
      fill="none"
      className={`pointer-events-none absolute top-[42px] hidden h-[245px] w-[124px] text-[#edbb9c]/55 xl:block ${
        right ? "-right-2 top-auto bottom-[106px] scale-x-[-1]" : "-left-2"
      }`}
    >
      <path d="M6 231C49 188 60 132 61 70C61 49 66 27 82 8" stroke="currentColor" strokeWidth="1.15" />
      <path d="M60 79C42 67 34 50 34 30C48 42 57 58 60 79Z" stroke="currentColor" strokeWidth="1.15" />
      <path d="M61 68C77 54 88 36 91 15C74 29 65 47 61 68Z" stroke="currentColor" strokeWidth="1.15" />
      <path d="M55 116C34 108 20 94 14 75C34 83 49 96 55 116Z" stroke="currentColor" strokeWidth="1.15" />
      <path d="M56 105C77 96 92 83 102 65C79 69 64 84 56 105Z" stroke="currentColor" strokeWidth="1.15" />
      <path d="M43 153C23 150 9 141 1 126C20 127 35 137 43 153Z" stroke="currentColor" strokeWidth="1.15" />
      <path d="M46 142C67 138 84 129 97 114C75 113 57 124 46 142Z" stroke="currentColor" strokeWidth="1.15" />
      <path d="M26 192C10 191 2 184 0 173C13 174 22 181 26 192Z" stroke="currentColor" strokeWidth="1.15" />
      <path d="M31 179C48 179 63 172 74 161C56 159 41 166 31 179Z" stroke="currentColor" strokeWidth="1.15" />
    </svg>
  )
}

export default function ClinicGallery() {
  const navigate = useNavigate()

  return (
    <section
      id="gallery"
      className="relative isolate overflow-hidden rounded-[22px] bg-[#fff5ed] px-5 py-[68px] sm:px-8 lg:px-14 lg:py-[72px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 13% 20%, rgba(255,255,255,.9), transparent 33%), radial-gradient(circle at 82% 75%, rgba(255,255,255,.72), transparent 37%), linear-gradient(120deg, #fff7f0 0%, #fff1e8 48%, #fff7f1 100%)",
        }}
      />

      <LeafDecoration side="left" />
      <LeafDecoration side="right" />

      <div className="relative mx-auto max-w-[1518px]">
        <header className="text-center">
          <div className="mb-[22px] flex items-center justify-center gap-4 text-[12px] font-bold uppercase tracking-[0.14em] text-[#c45238] sm:text-[13px]">
            <span className="h-px w-7 bg-[#df957e]" />
            Inside Nova Derm
            <span className="h-px w-7 bg-[#df957e]" />
          </div>

          <h2 className="text-[clamp(2.05rem,4vw,3.9rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-[#18110d]">
            A Space Designed For Your Comfort.
          </h2>

          <p className="mx-auto mt-[18px] max-w-[650px] text-[15px] leading-[1.65] text-[#694d40] sm:text-[17px]">
            Every detail of our clinic is thoughtfully designed to help you relax,
            <br className="hidden sm:block" /> feel at ease, and enjoy a truly elevated experience.
          </p>
        </header>

        <div className="mt-[38px] flex justify-center lg:mt-[-2px] lg:justify-end lg:pr-[10px]">
          <div className="inline-flex h-[52px] items-center gap-3 rounded-full border border-[#eab89e] px-[23px] text-[13px] font-bold uppercase tracking-[0.055em] text-[#be4b34]">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="9" cy="9" r="1.7" fill="currentColor" />
              <path d="m5.8 18 4.3-4.5 3.1 3 2.4-2.3 2.6 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {TOTAL_IMAGES} Photos
          </div>
        </div>

        <div className="mt-[25px] grid grid-cols-1 gap-[12px] lg:h-[522px] lg:grid-cols-[1.28fr_1fr_.46fr_.52fr] lg:grid-rows-2">
          <GalleryImage image={PREVIEW_IMAGES[0]} className="h-[430px] lg:row-span-2 lg:h-auto" />
          <GalleryImage image={PREVIEW_IMAGES[1]} className="h-[250px] lg:h-auto" />
          <GalleryImage image={PREVIEW_IMAGES[2]} className="h-[250px] lg:h-auto" />
          <GalleryImage image={PREVIEW_IMAGES[3]} className="h-[250px] lg:h-auto" />
          <GalleryImage image={PREVIEW_IMAGES[4]} className="h-[250px] lg:h-auto" />
          <GalleryImage image={PREVIEW_IMAGES[5]} className="h-[250px] lg:h-auto" />
          <GalleryImage image={PREVIEW_IMAGES[6]} className="h-[250px] lg:h-auto" />
        </div>

        <div className="mt-[24px] flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/gallery")}
            className="group inline-flex min-w-[292px] items-center justify-center gap-6 rounded-full bg-gradient-to-r from-[#c94e37] to-[#b83c27] px-8 py-[17px] text-[14px] font-bold uppercase tracking-[0.075em] text-white shadow-[0_7px_14px_rgba(160,57,36,.2)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            View Full Gallery — {TOTAL_IMAGES} Photos
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-[19px] w-[19px] transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path d="M5 12h13M14 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}