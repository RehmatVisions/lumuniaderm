import { motion } from "framer-motion"

export default function PlayButton({ text, href = "#" }) {
  return (
    <motion.a
      href={href}
      className="group inline-flex items-center gap-3"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="relative flex h-11 w-11 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-novaderm-gold/30 animate-pulse-ring" />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-novaderm-gold transition-colors duration-300 group-hover:bg-novaderm-gold-light">
          <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 text-white" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>

      <span className="text-sm font-medium text-white transition-colors duration-300 group-hover:text-novaderm-gold-light">
        {text}
      </span>
    </motion.a>
  )
}
