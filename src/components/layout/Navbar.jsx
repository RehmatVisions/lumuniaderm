import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { siteContent } from "../../data/siteContent"
import { useReducedMotion, useIsMobile } from "../../hooks/usePerf"
import Logo from "../ui/Logo"
import ChevronDown from "../ui/ChevronDown"
import ArrowUpRight from "../ui/ArrowUpRight"

const EASE        = [0.25, 0.46, 0.45, 0.94]
const EASE_SPRING = { type: "spring", stiffness: 260, damping: 26 }

/* ─── entrance variants ── */
const navV = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.055, delayChildren: 0.20 } },
}
const itemV = {
  hidden:  { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.34, ease: EASE } },
}

/* ──────────────────────────────────────────────────────────────
   MAGNETIC CTA
────────────────────────────────────────────────────────────── */
function MagneticCTA({ text, href, disabled }) {
  const ref     = useRef(null)
  const rawX    = useMotionValue(0)
  const rawY    = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 220, damping: 22 })
  const springY = useSpring(rawY, { stiffness: 220, damping: 22 })

  const onMove = disabled ? undefined : (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    rawX.set((e.clientX - (r.left + r.width  / 2)) * 0.24)
    rawY.set((e.clientY - (r.top  + r.height / 2)) * 0.24)
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
        className="group relative inline-flex items-center gap-0 overflow-hidden rounded-full text-[12.5px] font-semibold text-white"
        style={{
          background:  "linear-gradient(135deg, #c19a6b 0%, #a8825a 100%)",
          boxShadow:   "0 4px 20px rgba(193,154,107,0.32), inset 0 1px 0 rgba(255,255,255,0.15)",
          letterSpacing: "0.04em",
        }}
        whileHover={{ boxShadow: "0 6px 28px rgba(193,154,107,0.52), inset 0 1px 0 rgba(255,255,255,0.18)" }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.22 }}
      >
        {/* Shimmer on hover */}
        <motion.span
          className="pointer-events-none absolute inset-0 -skew-x-12"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)" }}
          initial={{ x: "-110%" }}
          whileHover={{ x: "210%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <span className="relative py-2.5 pl-5 pr-4">{text}</span>
        <span
          className="relative flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:rotate-45"
          style={{ background: "rgba(0,0,0,0.18)", borderLeft: "1px solid rgba(255,255,255,0.12)" }}
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </motion.a>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────────────────────
   NAV LINK
────────────────────────────────────────────────────────────── */
function NavLink({ link, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.li variants={itemV} className="relative">
      <a
        href={link.href}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex items-center gap-0.5 px-4 py-2 text-[13px] font-medium transition-colors duration-200"
        style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.62)" }}
      >
        {/* Active pill background */}
        {isActive && (
          <motion.span
            layoutId="nav-active-pill"
            className="absolute inset-0 rounded-full"
            style={{ background: "rgba(193,154,107,0.14)", border: "1px solid rgba(193,154,107,0.22)" }}
            transition={EASE_SPRING}
          />
        )}

        <span className="relative" style={{ letterSpacing: "0.02em" }}>{link.label}</span>

        {link.hasDropdown && (
          <ChevronDown
            className="relative ml-0.5 h-3 w-3 opacity-45 transition-transform duration-200 group-hover:rotate-180"
          />
        )}

        {/* Underline trace on hover (non-active) */}
        {!isActive && (
          <span className="pointer-events-none absolute bottom-1 left-4 right-4 h-px overflow-hidden">
            <motion.span
              className="block h-full"
              style={{
                background:    "linear-gradient(90deg, rgba(193,154,107,0.0), #c19a6b 40%, #d4b08a 60%, rgba(193,154,107,0.0))",
                borderRadius:  "9999px",
              }}
              initial={{ scaleX: 0, originX: "center" }}
              animate={{ scaleX: hovered ? 1 : 0 }}
              transition={{ duration: 0.26, ease: EASE }}
            />
          </span>
        )}

        {/* Hover text color lift */}
        {!isActive && hovered && (
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ background: "rgba(255,255,255,0.04)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />
        )}
      </a>
    </motion.li>
  )
}

/* ──────────────────────────────────────────────────────────────
   MAIN NAVBAR
────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const { links, ctaText, ctaHref } = siteContent.nav
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const [active,     setActive]     = useState("")
  const reduced  = useReducedMotion()
  const isMobile = useIsMobile()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <>
      {/* ── NAV WRAPPER ── */}
      <motion.nav
        className="absolute left-0 right-0 top-[40px] z-40"
        variants={navV}
        initial="hidden"
        animate="visible"
      >
        {/* ── Inner pill/bar — transitions from transparent → glass on scroll ── */}
        <motion.div
          className="mx-auto transition-all duration-500"
          animate={scrolled ? {
            maxWidth: "1200px",
            marginTop: "10px",
            paddingLeft: "6px",
            paddingRight: "6px",
          } : {
            maxWidth: "1400px",
            marginTop: "0px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <motion.div
            className="flex items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8"
            animate={scrolled ? {
              background:    isMobile ? "rgba(14,11,8,0.97)" : "rgba(14,11,8,0.82)",
              backdropFilter: isMobile ? "none" : "blur(28px) saturate(180%)",
              WebkitBackdropFilter: isMobile ? "none" : "blur(28px) saturate(180%)",
              borderRadius:  "999px",
              boxShadow:     "0 8px 40px rgba(0,0,0,0.30), inset 0 1px 0 rgba(193,154,107,0.12), 0 0 0 1px rgba(193,154,107,0.12)",
            } : {
              background:    "transparent",
              backdropFilter: "none",
              WebkitBackdropFilter: "none",
              borderRadius:  "0px",
              boxShadow:     "none",
            }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {/* Logo */}
            <motion.div variants={itemV} className="z-10 flex-shrink-0">
              <Logo />
            </motion.div>

            {/* Desktop links */}
            <motion.ul
              className="hidden items-center gap-0.5 lg:flex"
              variants={navV}
            >
              {links.map((link) => (
                <NavLink
                  key={link.label}
                  link={link}
                  isActive={active === link.label}
                  onClick={() => setActive(link.label)}
                />
              ))}
            </motion.ul>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <motion.div variants={itemV} className="hidden lg:block">
                <MagneticCTA text={ctaText} href={ctaHref} disabled={reduced || isMobile} />
              </motion.div>

              {/* Mobile burger */}
              <motion.button
                variants={itemV}
                className="group flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-xl text-white lg:hidden"
                style={{
                  background:  "rgba(193,154,107,0.08)",
                  border:      "1px solid rgba(193,154,107,0.22)",
                }}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                whileHover={{ scale: 1.06, background: "rgba(193,154,107,0.16)" }}
                whileTap={{ scale: 0.93 }}
              >
                <span className="h-px w-[18px] rounded-full bg-current transition-all duration-200" />
                <span className="h-px w-[12px] rounded-full bg-current transition-all duration-200 group-hover:w-[18px]" style={{ background: "#c19a6b" }} />
                <span className="h-px w-[18px] rounded-full bg-current transition-all duration-200" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.nav>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60]"
              style={{ background: "rgba(0,0,0,0.70)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.aside
              className="fixed inset-y-0 right-0 z-[70] flex w-[85vw] max-w-[340px] flex-col overflow-hidden"
              style={{ background: "#0e0b08" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.36, ease: EASE }}
            >
              {/* Gold top accent line */}
              <div
                className="h-[2px] w-full flex-shrink-0"
                style={{ background: "linear-gradient(90deg, transparent 0%, #c19a6b 35%, #d4b08a 55%, transparent 100%)" }}
              />

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5">
                <Logo />
                <motion.button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/50"
                  style={{
                    background: "rgba(193,154,107,0.08)",
                    border: "1px solid rgba(193,154,107,0.20)",
                  }}
                  aria-label="Close menu"
                  whileHover={{ scale: 1.08, background: "rgba(193,154,107,0.18)", color: "#fff" }}
                  whileTap={{ scale: 0.92 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </motion.button>
              </div>

              {/* Divider */}
              <div className="mx-6 h-px" style={{ background: "rgba(193,154,107,0.12)" }} />

              {/* Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="flex flex-col gap-1">
                  {links.map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.26, delay: 0.04 + i * 0.05, ease: EASE }}
                    >
                      <a
                        href={link.href}
                        onClick={() => { setActive(link.label); setMobileOpen(false) }}
                        className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200"
                        style={
                          active === link.label
                            ? { background: "rgba(193,154,107,0.12)", color: "#d4b08a", border: "1px solid rgba(193,154,107,0.22)" }
                            : { color: "rgba(255,255,255,0.58)", border: "1px solid transparent" }
                        }
                      >
                        <span style={{ letterSpacing: "0.03em" }}>{link.label}</span>
                        {link.hasDropdown
                          ? <ChevronDown className="h-3.5 w-3.5 opacity-30" />
                          : <ArrowUpRight className="h-3.5 w-3.5 opacity-20" />
                        }
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Bottom divider + CTA */}
              <div className="px-5 pb-8 pt-2">
                <div className="mb-4 h-px" style={{ background: "rgba(193,154,107,0.12)" }} />

                {/* Mini stats strip */}
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {[
                    { v: "4.9★", l: "Rating" },
                    { v: "3.5K+", l: "Patients" },
                    { v: "12+", l: "Years" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="flex flex-col items-center gap-0.5 rounded-xl py-2.5"
                      style={{ background: "rgba(193,154,107,0.06)", border: "1px solid rgba(193,154,107,0.12)" }}
                    >
                      <span className="text-sm font-bold" style={{ color: "#d4b08a" }}>{s.v}</span>
                      <span className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.38)" }}>{s.l}</span>
                    </div>
                  ))}
                </div>

                <motion.a
                  href={ctaHref}
                  onClick={() => setMobileOpen(false)}
                  className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl py-3.5 text-sm font-semibold text-white"
                  style={{
                    background:  "linear-gradient(135deg, #c19a6b 0%, #a8825a 100%)",
                    boxShadow:   "0 6px 24px rgba(193,154,107,0.30), inset 0 1px 0 rgba(255,255,255,0.14)",
                    letterSpacing: "0.04em",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.34 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.span
                    className="pointer-events-none absolute inset-0 -skew-x-12"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
                    initial={{ x: "-110%" }}
                    animate={{ x: "210%" }}
                    transition={{ duration: 1.8, delay: 0.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
                  />
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
