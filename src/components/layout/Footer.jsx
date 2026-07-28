import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import ArrowUpRight from "../ui/ArrowUpRight"
import { useReveal } from "../../hooks/useReveal"
import TextReveal from "../ui/TextReveal"

/* ─── Social icons ───────────────────────────────────────────── */
function SocialIcon({ type }) {
  const cls = "h-4 w-4 fill-current"
  if (type === "facebook")
    return <svg viewBox="0 0 24 24" className={cls}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  if (type === "instagram")
    return <svg viewBox="0 0 24 24" className={cls}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  if (type === "dribbble")
    return <svg viewBox="0 0 24 24" className={cls}><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.073c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.84 1.756 11.84c-.037 0-.366-.004-.708-.025.004.708.1 1.395.28 2.05zm-2.14-5.038c.35.01 4.725.07 9.566-1.296C9.678 7.5 8.147 5.754 7.65 5.186 5.272 6.268 3.43 8.21 2.244 10.34zm7.102-6.76c.52.603 2.07 2.33 3.73 5.166 3.563-1.336 5.07-3.36 5.257-3.618-1.634-1.455-3.776-2.34-6.12-2.34-.956 0-1.885.12-2.773.342l-.094-.012v.462zm9.307 2.78c-.208.297-1.884 2.476-5.59 3.99.234.48.453.966.652 1.46.076.18.148.36.22.54 3.407-.43 6.79.257 7.132.334-.02-2.394-.84-4.6-2.414-6.324z"/></svg>
  if (type === "linkedin")
    return <svg viewBox="0 0 24 24" className={cls}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  if (type === "whatsapp")
    return <svg viewBox="0 0 32 32" className={cls}><path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.774L0 32l8.476-2.003A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.322 22.293c-.347.977-2.03 1.865-2.789 1.981-.713.11-1.613.156-2.602-.163-.6-.19-1.37-.444-2.357-.87-4.143-1.79-6.845-5.99-7.052-6.268-.207-.278-1.685-2.241-1.685-4.273 0-2.031 1.066-3.027 1.443-3.441.378-.414.824-.518 1.099-.518.275 0 .55.003.791.014.254.013.594-.096.93.709.347.83 1.177 2.862 1.28 3.069.103.207.172.449.034.724-.138.275-.207.449-.414.69-.207.241-.435.538-.621.723-.207.207-.422.43-.181.844.241.414 1.072 1.768 2.302 2.864 1.582 1.41 2.916 1.847 3.33 2.054.414.207.655.172.896-.104.241-.275 1.031-1.203 1.306-1.617.275-.414.55-.345.93-.207.38.138 2.413 1.137 2.827 1.344.414.207.69.31.793.482.103.172.103.996-.244 1.972z"/></svg>
  return null
}

/* ─── Asterisk bullet used in link lists ─────────────────────── */
function AsteriskDot() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 flex-shrink-0"
      style={{ color: "#C69459" }}>
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
  { day: "Mon – Friday:",  hours: "10:00 AM – 7:00 PM" },
  { day: "Saturday:",      hours: "10:00 AM – 4:00 PM" },
  { day: "Sunday:",        hours: "Closed"              },
]

const SOCIALS = [
  { type: "facebook",  href: "https://www.facebook.com/profile.php?id=61592414917780", label: "Facebook"  },
  { type: "instagram", href: "https://www.instagram.com/novaderm42026/",               label: "Instagram" },
  { type: "whatsapp",  href: "https://wa.me/923244646260",                             label: "WhatsApp"  },
]

/* ─── Subscribe toast ────────────────────────────────────────── */
function SubToast({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-8 right-8 z-[200] flex items-center gap-3 rounded-2xl px-5 py-4 shadow-2xl"
          style={{ background: "#282A23", border: "1px solid rgba(198,148,89,0.40)" }}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0,  scale: 1   }}
          exit={{   opacity: 0, y: 20,  scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: "rgba(198,148,89,0.18)" }}>
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" style={{ color: "#C69459" }}>
              <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <div>
            <p className="text-sm font-bold text-white">Subscribed!</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              Thanks for joining Novaderm.
            </p>
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

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubErr("Enter a valid email address.")
      return
    }
    console.log("📧 Newsletter subscription:", email)
    setEmail("")
    setSubErr("")
    setToast(true)
    setTimeout(() => setToast(false), 3500)
  }

  return (
    <>
      <SubToast visible={toast} />

      <footer style={{ background: "#1a1c16" }}>

        {/* ── CTA banner ── */}
        <div
          className="relative overflow-hidden py-14 lg:py-16"
          style={{ background: "#282A23", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(198,148,89,0.06) 0%, transparent 70%)" }} />

          <div className="relative mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10 flex flex-col items-center gap-6 text-center">

            <TextReveal
              as="h2"
              className="font-serif text-[1.9rem] font-semibold leading-[1.2] text-white sm:text-[2.4rem] lg:text-[2.8rem]"
              delay={0}
              stagger={60}
            >
              Begin Your Skin Transformation Today
            </TextReveal>

            <motion.p
              className="max-w-lg text-[0.9rem] leading-[1.7]"
              style={{ color: "rgba(255,255,255,0.50)" }}
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
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                {/* mail icon */}
                <span className="pl-5 pr-2 text-white/35">
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
                  className="flex-1 bg-transparent py-3 pr-2 text-sm text-white placeholder-white/35 outline-none"
                />
                <motion.button
                  type="submit"
                  className="m-1 rounded-full px-5 py-2.5 text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg,#C69459,#a8825a)" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Subscribe Now
                </motion.button>
              </div>
              {subErr && (
                <p className="text-center text-xs text-red-400">{subErr}</p>
              )}
            </motion.form>
          </div>
        </div>

        {/* ── Main footer columns ── */}
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10 py-14 lg:py-16">
          <div ref={colRef} className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

            {/* Col 1 — Brand */}
            <div className="reveal reveal-up reveal-duration-600 reveal-delay-0 flex flex-col gap-5">
              <p className="max-w-[220px] text-sm leading-[1.75]"
                style={{ color: "rgba(255,255,255,0.55)" }}>
                Novaderm is a premium aesthetic dermatology clinic dedicated to delivering{" "}
                <span style={{ color: "#C69459" }}>medically precise, confidence-restoring results</span>{" "}
                for every patient we serve.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ type, href, label }) => (
                  <motion.a
                    key={type} href={href} aria-label={label}
                    target="_blank" rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200"
                    style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)" }}
                    whileHover={{ scale: 1.1, borderColor: "#C69459", color: "#C69459" }}
                  >
                    <SocialIcon type={type} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Col 2 — Quick Links */}
            <div className="reveal reveal-up reveal-duration-600 reveal-delay-1">
              <h4 className="mb-5 text-base font-bold text-white">Quick Links</h4>
              <ul className="flex flex-col gap-3">
                {QUICK_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href}
                      className="group flex items-center gap-2.5 text-sm transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#C69459"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
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
              <h4 className="mb-5 text-base font-bold text-white">Our Services</h4>
              <ul className="flex flex-col gap-3">
                {SERVICES.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href}
                      className="flex items-center gap-2.5 text-sm transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#C69459"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
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
              <h4 className="mb-5 text-base font-bold text-white">Working Hours</h4>
              <ul className="flex flex-col gap-3">
                {HOURS.map(({ day, hours }) => (
                  <li key={day} className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-semibold text-white">{day}</span>
                    <span style={{ color: hours === "Closed" ? "rgba(255,80,80,0.80)" : "rgba(255,255,255,0.50)" }}>
                      {hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ── Copyright bar ── */}
        <div
          className="py-5 text-center text-sm"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.38)",
          }}
        >
          Copyright &copy; {new Date().getFullYear()} All Rights Reserved.
        </div>

      </footer>
    </>
  )
}
