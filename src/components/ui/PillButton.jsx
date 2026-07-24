import { motion } from "framer-motion"
import ArrowUpRight from "./ArrowUpRight"

export default function PillButton({
  text,
  href = "#",
  variant = "gold",
  showArrow = true,
  className = "",
}) {
  const isGold = variant === "gold"

  return (
    <motion.a
      href={href}
      className={`group inline-flex items-center gap-0 overflow-hidden ${className}`}
      style={{
        /* Top-left large curve, bottom-right large curve — signature asymmetric pill */
        borderRadius: "2rem 0.5rem 2rem 0.5rem",
        boxShadow: isGold ? "0 6px 24px rgba(193,154,107,0.30)" : "none",
      }}
      whileHover={{ scale: 1.04, boxShadow: isGold ? "0 8px 32px rgba(193,154,107,0.45)" : undefined }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Label area */}
      <span
        className="px-5 py-2.5 text-[0.78rem] font-semibold uppercase tracking-wider text-white transition-colors duration-300"
        style={{
          background: isGold
            ? "linear-gradient(135deg, #c19a6b 0%, #a8825a 100%)"
            : "rgba(255,255,255,0.10)",
        }}
      >
        {text}
      </span>

      {/* Arrow chip */}
      {showArrow && (
        <span
          className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center text-white transition-transform duration-300 group-hover:rotate-45"
          style={{
            background: isGold
              ? "linear-gradient(135deg, #a8825a 0%, #8a6745 100%)"
              : "rgba(255,255,255,0.16)",
          }}
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      )}
    </motion.a>
  )
}
