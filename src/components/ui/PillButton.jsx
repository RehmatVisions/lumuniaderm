import { motion } from "framer-motion"
import ArrowUpRight from "./ArrowUpRight"

export default function PillButton({
  text,
  href = "#",
  variant = "gold",
  showArrow = true,
  className = "",
}) {
  const bgClass =
    variant === "gold"
      ? "bg-novaderm-gold hover:bg-novaderm-gold-light"
      : "bg-white/10 hover:bg-white/20 border border-white/20"

  return (
    <motion.a
      href={href}
      className={`group inline-flex items-center ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <span
        className={`rounded-full px-6 py-3 text-sm font-medium text-white transition-colors duration-300 ${bgClass}`}
      >
        {text}
      </span>

      {showArrow && (
        <span
          className={`ml-1 flex h-11 w-11 items-center justify-center rounded-full text-white transition-all duration-300 group-hover:rotate-45 ${bgClass}`}
        >
          <ArrowUpRight />
        </span>
      )}
    </motion.a>
  )
}
