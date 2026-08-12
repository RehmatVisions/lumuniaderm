import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import ArrowUpRight from "../ui/ArrowUpRight"
import { useReveal } from "../../hooks/useReveal"
// useReveal uses IntersectionObserver to add CSS 'is-visible' classes — kept separate from animations.js
import TextReveal from "../ui/TextReveal"
import sectionBg from "../../assets/backgroundall/bacrkound.png"

/* ─── Social icons ───────────────────────────────────────────── */
function SocialIcon({ type }) {
  const cls = "h-4 w-4 fill-current"
  if (type === "facebook")
    return <svg viewBox="0 0 24 24" className={cls}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  if (type === "instagram")
    return <svg viewBox="0 0 24 24" className={cls}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  if (type === "whatsapp")
    return <svg viewBox="0 0 32 32" className={cls}><path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.774L0 32l8.476-2.003A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.322 22.293c-.347.977-2.03 1.865-2.789 1.981-.713.11-1.613.156-2.602-.163-.6-.19-1.37-.444-2.357-.87-4.143-1.79-6.845-5.99-7.052-6.268-.207-.278-1.685-2.241-1.685-4.273 0-2.031 1.066-3.027 1.443-3.441.378-.414.824-.518 1.099-.518.275 0 .55.003.791.014.254.013.594-.096.93.709.347.83 1.177 2.862 1.28 3.069.103.207.172.449.034.724-.138.275-.207.449-.414.69-.207.241-.435.538-.621.723-.207.207-.422.43-.181.844.241.414 1.072 1.768 2.302 2.864 1.582 1.41 2.916 1.847 3.33 2.054.414.207.655.172.896-.104.241-.275 1.031-1.203 1.306-1.617.275-.414.55-.345.93-.207.38.138 2.413 1.137 2.827 1.344.414.207.69.31.793.482.103.172.103.996-.244 1.972z"/></svg>
  return null
}

function AsteriskDot() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 flex-shrink-0" style={{ color: "#C4614A" }}>
      <path d="M8 0a1 1 0 011 1v5.586l3.95-3.95a1 1 0 111.414 1.414L10.414 8l3.95 3.95a1 1 0 01-1.414 1.414L9 9.414V15a1 1 0 11-2 0V9.414l-3.95 3.95A1 1 0 011.636 11.95L5.586 8l-3.95-3.95A1 1 0 013.05 2.636L7 6.586V1a1 1 0 011-1z"/>
    </svg>
  )
}

const QUICK_LINKS = [
  { label: "Home",         href: "#"        },
  { label: "About Us",     href: "#about"   },
  { label: "Our Services", href: "#services"},
  { label: "Blogs",        href: "#blog"    },
]

const SERVICES = [
  { label: "Advanced Acne & Scar Revision", href: "#services" },
  { label: "Laser Hair Removal",            href: "#services" },
  { label: "Anti-Aging & Rejuvenation",     href: "#services" },
  { label: "Pigmentation Correction",       href: "#services" },
  { label: "PRP Hair Restoration",          href: "#services" },
]

const HOURS = [
  { day: "Mon – Sun:", hours: "10:00 AM – 10:00 PM" },
]

/* Returns true if current local time is between 10:00 AM and 10:00 PM */
function useClinicOpen() {
  const getOpen = () => {
    const now = new Date()
    const h = now.getHours()
    // open 10:00 (h>=10) and before 22:00 (h<22)
    return h >= 10 && h < 22
  }
  const [isOpen, setIsOpen] = useState(getOpen)
  useEffect(() => {
    // re-check every minute
    const id = setInterval(() => setIsOpen(getOpen()), 60_000)
    return () => clearInterval(id)
  }, [])
  return isOpen
}

const SOCIALS = [
  { type: "whatsapp",  href: "https://wa.me/03244646260",                             label: "WhatsApp"  },
]

/* ─── Subscribe toast ────────────────────────────────────────── */
function SubToast({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-8 right-8 z-[200] flex items-center gap-3 rounded-2xl px-5 py-4 shadow-2xl"
          style={{ background: "#F8E2D8", border: "1px solid rgba(196,97,74,0.40)" }}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0,  scale: 1   }}
          exit={{   opacity: 0, y: 20,  scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: "rgba(196,97,74,0.15)" }}>
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" style={{ color: "#C4614A" }}>
              <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <div>
            <p className="text-sm font-bold text-novaderm-brown">Subscribed!</p>
            <p className="text-xs font-semibold text-novaderm-brown/85">Thanks for joining Auroraderm.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
export default function Footer() {
  const [email,  setEmail]  = useState("")
  const [subErr, setSubErr] = useState("")
  const [toast,  setToast]  = useState(false)
  const colRef = useReveal({ rootMargin: "-40px 0px" })
  const isOpen = useClinicOpen()

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubErr("Enter a valid email address.")
      return
    }
    setEmail("")
    setSubErr("")
    setToast(true)
    setTimeout(() => setToast(false), 3500)
  }

  return (
    <>
      <SubToast visible={toast} />

      <footer style={{ background: "#FCEEE7" }}>

        {/* ── CTA banner — background image with terracotta overlay ── */}
        <div
          className="relative overflow-hidden py-14 lg:py-16"
          style={{
            backgroundImage: `url(${sectionBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {/* terracotta tint so text stays readable */}
          <div className="absolute inset-0" style={{ background: "rgba(196,97,74,0.72)" }} />

          <div className="relative mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10 flex flex-col items-center gap-6 text-center">

            <TextReveal
              as="h2"
              className="font-sans text-[1.9rem] font-semibold leading-[1.2] text-white sm:text-[2.4rem] lg:text-[2.8rem]"
              delay={0}
              stagger={60}
            >
              Begin Your Skin Transformation Today
            </TextReveal>

            <motion.p
              className="max-w-lg text-[0.9rem] leading-[1.7] text-white/75"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              Join thousands of patients who have transformed their skin with our
              medical-grade treatments. Your first consultation is the first step.
            </motion.p>

            {/* Email subscribe bar */}
            <motion.form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md flex-col gap-2"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.14 }}
              noValidate
            >
              <div className="flex items-center overflow-hidden rounded-full"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.30)" }}>
                <span className="pl-5 pr-2 text-white/60">
                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                    <path d="M2 5l8 5 8-5M2 5h16v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5z"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setSubErr("") }}
                  placeholder="Enter Email Address*"
                  className="flex-1 bg-transparent py-3 pr-2 text-sm text-white placeholder-white/55 outline-none"
                />
                <motion.button
                  type="submit"
                  className="m-1 rounded-full px-5 py-2.5 text-sm font-bold text-[#C4614A]"
                  style={{ background: "#fff" }}
                  whileHover={{ scale: 1.04, background: "#F8E2D8" }}
                  whileTap={{ scale: 0.96 }}
                >
                  Subscribe Now
                </motion.button>
              </div>
              {subErr && (
                <p className="text-center text-xs text-white/80">{subErr}</p>
              )}
            </motion.form>
          </div>
        </div>

        {/* ── Main footer columns — beige bg ── */}
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10 py-14 lg:py-16">
          <div ref={colRef} className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

            {/* Col 1 — Brand */}
            <div className="reveal reveal-up reveal-duration-600 reveal-delay-0 flex flex-col gap-5">
              <p className="max-w-[220px] text-sm font-semibold leading-[1.75]" style={{ color: "#1a0f0a" }}>
                Auroraderm is a premium aesthetic dermatology clinic dedicated to delivering{" "}
                <span className="font-semibold text-[#C4614A]">medically precise, confidence-restoring results</span>{" "}
                for every patient we serve.
              </p>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ type, href, label }) => (
                  <motion.a
                    key={type} href={href} aria-label={label}
                    target="_blank" rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200"
                    style={{ borderColor: "rgba(196,97,74,0.30)", color: "rgba(61,36,20,0.80)", background: "rgba(196,97,74,0.06)" }}
                    whileHover={{ scale: 1.1, borderColor: "#C4614A", color: "#C4614A", background: "rgba(196,97,74,0.12)" }}
                  >
                    <SocialIcon type={type} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Col 2 — Quick Links */}
            <div className="reveal reveal-up reveal-duration-600 reveal-delay-1">
              <h4 className="mb-5 text-base font-bold text-novaderm-brown">Quick Links</h4>
              <ul className="flex flex-col gap-3">
                {QUICK_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href}
                      className="group flex items-center gap-2.5 text-sm font-semibold text-novaderm-brown transition-colors duration-200 hover:text-[#C4614A]"
                    >
                      <AsteriskDot />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Our Services */}
            <div className="reveal reveal-up reveal-duration-600 reveal-delay-2">
              <h4 className="mb-5 text-base font-bold text-novaderm-brown">Our Services</h4>
              <ul className="flex flex-col gap-3">
                {SERVICES.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href}
                      className="flex items-center gap-2.5 text-sm font-semibold text-novaderm-brown transition-colors duration-200 hover:text-[#C4614A]"
                    >
                      <AsteriskDot />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Working Hours */}
            <div className="reveal reveal-up reveal-duration-600 reveal-delay-3">
              <h4 className="mb-5 text-base font-bold text-novaderm-brown">Working Hours</h4>

              {/* Live Open / Closed badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1"
                style={{
                  background: isOpen ? "rgba(34,197,94,0.12)" : "rgba(220,38,38,0.10)",
                  border: `1px solid ${isOpen ? "rgba(34,197,94,0.35)" : "rgba(220,38,38,0.25)"}`,
                }}>
                <span className="relative flex h-2 w-2">
                  {isOpen && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                      style={{ background: "#22c55e" }} />
                  )}
                  <span className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ background: isOpen ? "#22c55e" : "#dc2626" }} />
                </span>
                <span className="text-xs font-bold"
                  style={{ color: isOpen ? "#15803d" : "#b91c1c" }}>
                  {isOpen ? "Open Now" : "Closed"}
                </span>
              </div>

              <ul className="flex flex-col gap-3">
                {HOURS.map(({ day, hours }) => (
                  <li key={day} className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-semibold text-novaderm-brown">{day}</span>
                    <span style={{ color: "#1a0f0a", fontWeight: 700 }}>{hours}</span>
                  </li>
                ))}
              </ul>

              {/* Phone */}
              <a href="tel:03211102018"
                className="mt-4 flex items-center gap-2 text-sm font-bold transition-colors duration-200 hover:text-[#C4614A]"
                style={{ color: "#1a0f0a" }}>
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 flex-shrink-0" stroke="#C4614A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .92h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                0321 1102018
              </a>
            </div>

          </div>
        </div>

        {/* ── Copyright bar ── */}
        <div
          className="py-5 text-center text-sm font-semibold text-novaderm-brown/65"
          style={{ borderTop: "1px solid rgba(196,97,74,0.15)" }}
        >
          Copyright &copy; {new Date().getFullYear()} All Rights Reserved.
        </div>

      </footer>
    </>
  )
}
