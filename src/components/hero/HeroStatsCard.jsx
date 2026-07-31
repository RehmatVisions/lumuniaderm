// import { motion, useInView } from "framer-motion"
// import { useRef, useEffect, useState } from "react"
// import { siteContent } from "../../data/siteContent"

// function CountUp({ target, duration = 1.6, delay = 0, suffix = "" }) {
//   const [value, setValue] = useState(0)
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true })

//   useEffect(() => {
//     if (!inView) return
//     let startTs = null
//     const tick = (ts) => {
//       if (!startTs) startTs = ts + delay * 1000
//       const elapsed = Math.max(0, ts - startTs)
//       const progress = Math.min(elapsed / (duration * 1000), 1)
//       setValue(Math.floor((1 - Math.pow(1 - progress, 3)) * target))
//       if (progress < 1) requestAnimationFrame(tick)
//     }
//     requestAnimationFrame(tick)
//   }, [inView, target, duration, delay])

//   return <span ref={ref}>{value}{suffix}</span>
// }

// export default function HeroStatsCard() {
//   const { stats, avatars } = siteContent.hero

//   return (
//     <motion.div
//       className="glass-card rounded-2xl px-4 py-4 sm:animate-float sm:px-5 sm:py-5"
//       style={{ minWidth: 180, maxWidth: "100%" }}
//       initial={{ opacity: 0, x: 50, y: 16, filter: "blur(8px)" }}
//       animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
//       transition={{ duration: 0.85, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
//       whileHover={{ scale: 1.04, rotate: 0.8, transition: { duration: 0.3 } }}
//     >
//       {/* Rating row */}
//       <div className="mb-3 flex items-center gap-2">
//         <motion.div
//           className="flex h-8 w-8 items-center justify-center rounded-full bg-novaderm-gold/20"
//           animate={{ rotate: [0, 6, -6, 0] }}
//           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <svg viewBox="0 0 24 24" className="h-4 w-4 fill-novaderm-gold" aria-hidden="true">
//             <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
//           </svg>
//         </motion.div>
//         <div>
//           <p className="text-xl font-bold leading-none text-white sm:text-2xl">
//             <CountUp target={49} suffix="/5" duration={1.5} delay={1.1} />
//           </p>
//           <p className="text-[10px] uppercase tracking-wider text-white/50">Rating</p>
//         </div>
//       </div>

//       {/* Divider */}
//       <motion.div
//         className="mb-3 h-px bg-gradient-to-r from-white/15 via-novaderm-gold/35 to-transparent"
//         initial={{ scaleX: 0, originX: 0 }}
//         animate={{ scaleX: 1 }}
//         transition={{ duration: 0.7, delay: 1.5 }}
//       />

//       <p className="mb-3 text-xs font-medium text-white/75">{stats.patients}</p>

//       {/* Avatars */}
//       <div className="flex items-center gap-2">
//         <div className="flex -space-x-1.5">
//           {avatars.slice(0, 3).map((src, i) => (
//             <motion.img key={i} src={src} alt="" loading="lazy"
//               className="h-6 w-6 rounded-full border-2 border-white/25 object-cover sm:h-7 sm:w-7"
//               initial={{ opacity: 0, scale: 0, x: -6 }}
//               animate={{ opacity: 1, scale: 1, x: 0 }}
//               transition={{ duration: 0.35, delay: 1.15 + i * 0.09 }}
//             />
//           ))}
//         </div>
//         <span className="text-[11px] text-white/55">+2.8k more</span>
//       </div>
//     </motion.div>
//   )
// }
