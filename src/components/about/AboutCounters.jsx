import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { useRef, useEffect } from "react"
import { siteContent } from "../../data/siteContent"

/* ── Single rolling counter — eases to final value on scroll ── */
function Counter({ target, suffix = "", duration = 1.8, delay = 0 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const count  = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString())

  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => {
      const ctrl = animate(count, target, {
        duration,
        ease: [0.16, 1, 0.3, 1], // expo-out
      })
      return ctrl.stop
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [inView, count, target, duration, delay])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

/* ── Slot machine slide-in wrapper ── */
function SlotNumber({ target, suffix = "", delay = 0 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <div ref={ref} className="overflow-hidden leading-none">
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Counter target={target} suffix={suffix} duration={1.6} delay={delay} />
      </motion.div>
    </div>
  )
}

export default function AboutCounters() {
  const { counters } = siteContent.about

  return (
    <div className="relative py-10">

      {/* Top gold divider */}
      <motion.div
        className="mx-auto mb-10 h-px max-w-[1400px] bg-gradient-to-r from-transparent via-novaderm-gold/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-6 lg:grid-cols-4 lg:px-10">
        {counters.map((item, i) => (
          <motion.div
            key={item.label}
            className="group flex flex-col items-center gap-2 text-center"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Icon */}
            <motion.div
              className="mb-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-novaderm-gold/25 bg-novaderm-gold/10 transition-all duration-300 group-hover:border-novaderm-gold/60 group-hover:bg-novaderm-gold/22"
              whileHover={{ scale: 1.12, rotate: 4 }}
              transition={{ duration: 0.28 }}
            >
              <CounterIcon type={item.icon} />
            </motion.div>

            {/* Rolling number */}
            <div className="text-4xl font-bold tracking-tight text-novaderm-brown lg:text-5xl">
              <SlotNumber target={item.value} suffix={item.suffix} delay={0.2 + i * 0.1} />
            </div>

            {/* Label */}
            <motion.p
              className="text-xs font-medium uppercase tracking-widest text-novaderm-brown/55"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
            >
              {item.label}
            </motion.p>

            {/* Animated underline */}
            <motion.div
              className="h-0.5 rounded-full bg-novaderm-gold"
              initial={{ width: 0 }}
              whileInView={{ width: 36 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.7 + i * 0.1, ease: "easeOut" }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom gold divider */}
      <motion.div
        className="mx-auto mt-10 h-px max-w-[1400px] bg-gradient-to-r from-transparent via-novaderm-gold/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
    </div>
  )
}

function CounterIcon({ type }) {
  const cls = "h-5 w-5 text-novaderm-gold"
  if (type === "patients")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  if (type === "experience")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  if (type === "rating")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true">
      <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
