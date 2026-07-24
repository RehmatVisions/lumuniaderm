import { motion } from "framer-motion"

export default function PlayButton({ text, href = "#" }) {
  return (
    <motion.a
      href={href}
      className="group inline-flex items-center gap-2.5"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Play circle — slightly smaller */}
      <div className="relative flex h-9 w-9 items-center justify-center flex-shrink-0">
        <span className="absolute inset-0 rounded-full bg-novaderm-gold/25 animate-pulse-ring" />
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-novaderm-gold/90 transition-colors duration-300 group-hover:bg-novaderm-gold">
          <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5 text-white" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>

      <span className="text-[0.78rem] font-semibold uppercase tracking-wider text-white/75 transition-colors duration-300 group-hover:text-white">
        {text}
      </span>
    </motion.a>
  )
}
