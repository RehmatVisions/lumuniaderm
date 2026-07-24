import { motion } from "framer-motion"
import { siteContent } from "../../data/siteContent"

export default function HeroBadge() {
  const { badge } = siteContent.hero

  return (
    <motion.div
      className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-5 py-2.5"
      style={{
        background: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.22)",
      }}
      initial={{ opacity: 0, x: -50, filter: "blur(8px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Shimmer sweep */}
      <motion.div
        className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
        initial={{ x: "-120%" }}
        animate={{ x: "220%" }}
        transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }}
      />

      {/* Pulsing dot */}
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-novaderm-gold opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-novaderm-gold" />
      </span>

      {/* Star icon */}
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-novaderm-gold" fill="none" aria-hidden="true">
        <path
          d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
        />
      </svg>

      <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white/88">
        {badge}
      </span>
    </motion.div>
  )
}
