import { motion, AnimatePresence } from "framer-motion"
import { siteContent } from "../../data/siteContent"
import PillButton from "../ui/PillButton"
import PlayButton from "../ui/PlayButton"

/* Word-by-word reveal — each word springs up from below clip */
function WordReveal({ text, delay = 0 }) {
  return (
    <span className="inline">
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom leading-[1.15]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.055,
              ease: [0.16, 1, 0.3, 1], // expo out — fast rise, soft land
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* Shared fade-up animation factory */
const blurUp = (delay) => ({
  initial:    { opacity: 0, y: 16 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function HeroContent({ slideIndex }) {
  const { slides, stats, avatars } = siteContent.hero
  const { headline, description, primaryCta, secondaryCta } = slides[slideIndex] ?? slides[0]

  return (
    <div className="grid items-end gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">

      {/* ── Left — headline ── */}
      <div>
        <AnimatePresence mode="wait">
          <motion.h1
            key={`h-${slideIndex}`}
            className="font-serif text-[1.75rem] font-medium leading-[1.1] tracking-[-0.01em] text-white sm:text-[2.2rem] lg:text-[2.9rem] lg:leading-[1.07]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <WordReveal text={headline} delay={0.05} />
          </motion.h1>
        </AnimatePresence>

        {/* Gold underline — springs in after headline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`ul-${slideIndex}`}
            className="mt-4 h-[1.5px] bg-gradient-to-r from-novaderm-gold via-novaderm-gold-light to-transparent"
            initial={{ scaleX: 0, originX: "left" }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0, originX: "right" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: "52%" }}
          />
        </AnimatePresence>
      </div>

      {/* ── Right — desc + CTAs + micro-stats ── */}
      <div className="flex flex-col gap-6 lg:items-start">

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`d-${slideIndex}`}
            className="max-w-sm font-sans text-[0.82rem] font-light leading-[1.65] tracking-[0.015em] text-white/62 sm:text-[0.875rem]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {description}
          </motion.p>
        </AnimatePresence>

        {/* CTAs */}
        <motion.div className="flex flex-wrap items-center gap-4" {...blurUp(0.85)}>
          <PillButton text={primaryCta.text} href={primaryCta.href} />
          <PlayButton text={secondaryCta.text} href={secondaryCta.href} />
        </motion.div>

        {/* Micro-stats row */}
        <motion.div className="flex flex-wrap items-center gap-4 sm:gap-5" {...blurUp(1.05)}>
          {/* Avatars */}
          <div className="flex -space-x-2">
            {avatars.slice(0, 3).map((src, i) => (
              <motion.img key={i} src={src} alt="" loading="lazy"
                className="h-7 w-7 rounded-full border-2 border-white/30 object-cover sm:h-8 sm:w-8"
                initial={{ opacity: 0, x: -10, scale: 0.7 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>

          <div className="h-5 w-px bg-white/18" />

          <div className="flex flex-col gap-0.5">
            <span className="font-serif text-[0.95rem] font-semibold text-novaderm-gold leading-none">{stats.rating}</span>
            <span className="font-sans text-[9px] font-600 uppercase tracking-[0.14em] text-white/45">Rating</span>
          </div>

          <div className="h-5 w-px bg-white/18" />

          <div className="flex flex-col gap-0.5">
            <span className="font-serif text-[0.95rem] font-semibold text-white leading-none">{stats.patients.split(" ")[0]}</span>
            <span className="font-sans text-[9px] font-600 uppercase tracking-[0.14em] text-white/45">Patients</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
