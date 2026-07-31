import { motion } from "framer-motion"

// ─── Design tokens — change here to update ALL section badges sitewide ───────
const BADGE_BORDER     = "rgba(58, 38, 24, 0.45)"
const BADGE_BG         = "rgba(218, 116, 151, 0.1)"
const BADGE_DOT_COLOR  = "#6B4A2E"
const BADGE_TEXT_COLOR = "#2B170C"
// ─────────────────────────────────────────────────────────────────────────────

/**
 * SectionBadge — the small pill label shown above every section heading.
 *
 * Usage:
 *   <SectionBadge text="Our Story" />
 *   <SectionBadge text="Our Story" animate={false} />        // no entrance animation
 *   <SectionBadge text="Our Story" delay={0.2} />            // custom animation delay
 *   <SectionBadge text="Our Story" className="mb-4" />       // extra wrapper class
 */
export default function SectionBadge({ text, animate = true, delay = 0, className = "" }) {
  const pill = (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 ${className}`}
      style={{
        border: `1px solid ${BADGE_BORDER}`,
        background: BADGE_BG,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Pulsing dot */}
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
          style={{ background: BADGE_DOT_COLOR }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ background: BADGE_DOT_COLOR }}
        />
      </span>

      {/* Label */}
      <span
        className="text-[0.72rem] font-bold uppercase tracking-[0.18em]"
        style={{ color: BADGE_TEXT_COLOR }}
      >
        {text}
      </span>
    </span>
  )

  if (!animate) return pill

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "inline-block" }}
    >
      {pill}
    </motion.div>
  )
}
