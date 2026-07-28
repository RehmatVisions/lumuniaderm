import { motion } from "framer-motion"
import { useRef } from "react"
import { siteContent } from "../../data/siteContent"
import { useReducedMotion, useIsMobile, VP_ONCE } from "../../hooks/usePerf"
import AboutImageCollage from "./AboutImageCollage"
import AboutContent from "./AboutContent"
import AboutCounters from "./AboutCounters"

export default function About() {
  const { bgImage } = siteContent.about
  const reduced = useReducedMotion()

  return (
    <section id="about" className="relative overflow-hidden py-20 lg:py-28" style={{ background: "#F2D9CF" }}>

      {/* Background image — lazy loaded, only decorative */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={bgImage} alt="" aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[#FDF0EB]/93" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDF0EB]/85 via-transparent to-[#FDF0EB]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDF0EB]/75 via-transparent to-[#FDF0EB]/75" />
      </div>

      {/* Decorative ring — static, no rotation */}
      <div className="pointer-events-none absolute right-8 top-8 hidden lg:block">
        <svg viewBox="0 0 60 60" className="h-14 w-14 text-novaderm-gold/22" fill="none">
          <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 5" />
          <circle cx="30" cy="30" r="2"  fill="currentColor" opacity="0.45" />
        </svg>
      </div>

      {/* Two-column content */}
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP_ONCE}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ willChange: "transform, opacity" }}
        >
          <AboutImageCollage />
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP_ONCE}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ willChange: "transform, opacity" }}
        >
          <AboutContent />
        </motion.div>
      </div>

      <AboutCounters />
    </section>
  )
}
