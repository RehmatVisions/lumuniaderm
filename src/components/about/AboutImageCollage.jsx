import { motion } from "framer-motion"
import { siteContent } from "../../data/siteContent"
import { useReducedMotion, VP_ONCE } from "../../hooks/usePerf"

const EASE = [0.25, 0.46, 0.45, 0.94]

const child = (delay = 0, y = 20) => ({
  initial:     { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport:    VP_ONCE,
  transition:  { duration: 0.42, delay, ease: EASE },
})

export default function AboutImageCollage() {
  const { images, reviewScore, reviewLabel, experience, specialists } = siteContent.about
  const reduced = useReducedMotion()

  return (
    <div className="relative flex items-end gap-4 lg:gap-5">

      {/* ── Main tall image ── */}
      <motion.div
        className="relative w-[58%] overflow-hidden rounded-3xl shadow-2xl"
        {...child(0.1, 0)}
      >
        <motion.img
          src={images.main}
          alt="Novaderm treatment"
          className="h-[500px] w-full object-cover lg:h-[580px]"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-3xl" />

        {/* Experience badge */}
        <motion.div
          className="absolute bottom-5 left-5 rounded-2xl bg-novaderm-brown/85 px-4 py-3 backdrop-blur-md border border-white/10 shadow-xl"
          {...child(0.6, 12)}
          whileHover={{ scale: 1.06, transition: { duration: 0.3 } }}
        >
          <p className="text-2xl font-bold text-novaderm-gold">{experience.years}</p>
          <p className="text-xs text-white/80">{experience.label}</p>
        </motion.div>
      </motion.div>

      {/* ── Right column ── */}
      <div className="flex w-[42%] flex-col gap-4">

        {/* Rating card */}
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-novaderm-gold px-5 py-6 text-center shadow-xl"
          {...child(0.2, 0)}
          whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
        >
          <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10" />
          <div className="absolute -bottom-4 -left-4 h-14 w-14 rounded-full bg-white/10" />

          {/* Shimmer sweep on mount */}
          <motion.div
            className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-120%" }}
            whileInView={{ x: "220%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeInOut" }}
          />

          <p className="relative text-4xl font-bold text-white">
            {reviewScore}{" "}
            <svg viewBox="0 0 24 24" className="inline h-5 w-5 fill-white align-middle" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
            </svg>
          </p>
          <p className="relative mt-1 text-sm font-medium text-white/90">{reviewLabel}</p>
        </motion.div>

        {/* Secondary image */}
        <motion.div
          className="overflow-hidden rounded-3xl shadow-lg"
          {...child(0.35, 0)}
        >
          <motion.img
            src={images.secondary}
            alt="Novaderm specialist"
            className="h-[240px] w-full object-cover lg:h-[275px]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          />
        </motion.div>

        {/* Specialists counter */}
        <motion.div
          className="rounded-2xl px-4 py-3.5 shadow-md"
          style={{ background: "#FDFBF7", border: "1px solid rgba(193,154,107,0.25)" }}
          {...child(0.5, 0)}
          whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
        >
          <p className="text-2xl font-bold text-novaderm-gold">{specialists.count}</p>
          <p className="text-xs text-novaderm-brown/65">{specialists.label}</p>
        </motion.div>
      </div>

      {/* ── Botanical SVG ── */}
      <motion.div
        className="pointer-events-none absolute -bottom-8 left-[52%] text-novaderm-gold/25"
        initial={{ opacity: 0, rotate: -15 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.9 }}
      >
        <svg viewBox="0 0 120 120" className="h-24 w-24" fill="none" aria-hidden="true">
          <path d="M60 10 Q80 40 60 60 Q40 40 60 10Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M60 60 Q85 80 75 110"               stroke="currentColor" strokeWidth="1.2" />
          <path d="M60 60 Q35 80 45 110"               stroke="currentColor" strokeWidth="1.2" />
          <circle cx="60" cy="60" r="3" fill="currentColor" opacity="0.5" />
        </svg>
      </motion.div>
    </div>
  )
}
