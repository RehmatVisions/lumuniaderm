import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { siteContent } from "../../data/siteContent"
import { useReducedMotion, useIsMobile } from "../../hooks/usePerf"
import Logo from "../ui/Logo"
import ChevronDown from "../ui/ChevronDown"
import ArrowUpRight from "../ui/ArrowUpRight"

const EASE = [0.25, 0.46, 0.45, 0.94]

const navV = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.22 } },
}
const itemV = {
  hidden:  { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE } },
}

/* ─── Magnetic CTA — disabled on mobile/reduced-motion ── */
function MagneticCTA({ text, href, disabled }) {
  const ref     = useRef(null)
  const rawX    = useMotionValue(0)
  const rawY    = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 220, damping: 22 })
  const springY = useSpring(rawY, { stiffness: 220, damping: 22 })

  const onMove = disabled ? undefined : (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    rawX.set((e.clientX - (r.left + r.width / 2))  * 0.25)
    rawY.set((e.clientY - (r.top  + r.height / 2)) * 0.25)
  }
  const onLeave = disabled ? undefined : () => { rawX.set(0); rawY.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={disabled ? {} : { x: springX, y: springY, willChange: "transform" }}
    >
      <motion.a
        href={href}
        className="group inline-flex items-center"
        whileTap={{ scale: 0.96 }}
      >
        <span
          className="py-2.5 pl-5 pr-4 text-[13px] font-semibold uppercase tracking-wide text-white transition-colors duration-200"
          style={{
            background: "linear-gradient(135deg,#c19a6b 0%,#a8825a 100%)",
            borderRadius: "2rem 0 0 2rem",
            boxShadow: "0 4px 18px rgba(193,154,107,0.28)",
          }}>
          {text}
        </span>
        <span
          className="flex h-[40px] w-[40px] items-center justify-center text-white transition-transform duration-300 group-hover:rotate-45"
          style={{
            background: "linear-gradient(135deg,#a8825a 0%,#8a6745 100%)",
            borderRadius: "0 0.5rem 0 0.5rem",
            boxShadow: "0 4px 18px rgba(193,154,107,0.28)",
          }}>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </motion.a>
    </motion.div>
  )
}

/* ─── NavLink with underline trace ── */
function NavLink({ link, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.li variants={itemV}>
      <a
        href={link.href}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`group relative flex items-center gap-0.5 rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-200 ${
          isActive ? "text-white" : "text-white/70 hover:text-white"
        }`}
      >
        {isActive && (
          <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full"
            style={{ background: "rgba(193,154,107,0.13)" }}
            transition={{ type: "spring", bounce: 0.18, duration: 0.4 }}
          />
        )}
        <span className="relative">{link.label}</span>
        {link.hasDropdown && (
          <ChevronDown className="relative h-3 w-3 opacity-50 transition-transform duration-200 group-hover:rotate-180" />
        )}
        {!isActive && (
          <span className="pointer-events-none absolute -bottom-0.5 left-3 right-3 h-px overflow-hidden">
            <motion.span
              className="block h-full rounded-full bg-gradient-to-r from-novaderm-gold to-novaderm-gold-light"
              initial={{ scaleX: 0, originX: "left" }}
              animate={{ scaleX: hovered ? 1 : 0, originX: hovered ? "left" : "right" }}
              transition={{ duration: 0.24, ease: EASE }}
              style={{ willChange: "transform" }}
            />
          </span>
        )}
      </a>
    </motion.li>
  )
}

/* ─── MAIN NAVBAR ── */
export default function Navbar() {
  const { links, ctaText, ctaHref } = siteContent.nav
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const [active,     setActive]     = useState("")
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 55)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  /* Scrolled style — solid bg on mobile, glass on desktop */
  const scrolledStyle = scrolled ? {
    background:     isMobile ? "rgba(20,16,12,0.97)" : "rgba(20,16,12,0.88)",
    backdropFilter: isMobile ? "none" : "blur(24px) saturate(160%)",
    WebkitBackdropFilter: isMobile ? "none" : "blur(24px) saturate(160%)",
    borderBottom:   "1px solid rgba(193,154,107,0.10)",
    boxShadow:      "0 6px 32px rgba(0,0,0,0.24)",
  } : {}

  return (
    <>
      <motion.nav
        className="absolute left-0 right-0 top-[38px] z-40 transition-all duration-400"
        style={scrolledStyle}
        variants={navV}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-2 sm:px-6 lg:px-10">

          <motion.div variants={itemV} className="z-10 flex-shrink-0">
            <Logo />
          </motion.div>

          <motion.ul className="hidden items-center gap-0.5 lg:flex" variants={navV}>
            {links.map((link) => (
              <NavLink key={link.label} link={link} isActive={active === link.label} onClick={() => setActive(link.label)} />
            ))}
          </motion.ul>

          <div className="flex items-center gap-3">
            <motion.div variants={itemV} className="hidden lg:block">
              <MagneticCTA text={ctaText} href={ctaHref} disabled={reduced || isMobile} />
            </motion.div>

            <motion.button
              variants={itemV}
              className="group flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl text-white lg:hidden"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
            >
              <span className="h-px w-5 bg-current" />
              <span className="h-px w-3 bg-current transition-all duration-200 group-hover:w-5" />
              <span className="h-px w-5 bg-current" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60]"
              style={{ background: "rgba(0,0,0,0.65)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-[70] flex w-[82vw] max-w-[360px] flex-col overflow-hidden"
              style={{ background: "rgba(20,16,12,0.98)" }}
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, transparent, #c19a6b 40%, #d4b08a 60%, transparent)" }} />
              <div className="flex items-center justify-between px-6 py-5">
                <Logo />
                <motion.button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/55"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                  aria-label="Close menu"
                  whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </motion.button>
              </div>
              <div className="mx-6 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
              <nav className="flex-1 overflow-y-auto px-4 py-5">
                <ul className="flex flex-col gap-1">
                  {links.map((link, i) => (
                    <motion.li key={link.label}
                      initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.26, delay: 0.04 + i * 0.05, ease: EASE }}
                    >
                      <a
                        href={link.href}
                        onClick={() => { setActive(link.label); setMobileOpen(false) }}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                          active === link.label ? "bg-novaderm-gold/12 text-novaderm-gold" : "text-white/62 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{link.label}</span>
                        {link.hasDropdown ? <ChevronDown className="h-3.5 w-3.5 text-white/28" /> : <ArrowUpRight className="h-3.5 w-3.5 text-white/20" />}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="px-5 pb-8 pt-3">
                <motion.a href={ctaHref} onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#c19a6b 0%,#a8825a 100%)", boxShadow: "0 6px 22px rgba(193,154,107,0.28)" }}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.32 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {ctaText}
                  <ArrowUpRight className="h-4 w-4" />
                </motion.a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
