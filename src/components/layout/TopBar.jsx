import { motion } from "framer-motion"
import { siteContent } from "../../data/siteContent"
import { useReducedMotion } from "../../hooks/usePerf"

function SocialIcon({ icon }) {
  if (icon === "x")
    return <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  if (icon === "facebook")
    return <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
  return <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
}

/* Marquee items — duplicated for seamless loop */
const MARQUEE_ITEMS = [
  "✦ Medical-Grade Aesthetic Treatments",
  "✦ Internationally Certified Dermatologists",
  "✦ 4.9★ Verified Patient Rating",
  "✦ 3,500+ Patients Transformed",
  "✦ FDA-Cleared Laser & PRP Therapy",
  "✦ Bespoke Treatment Protocols",
]

export default function TopBar() {
  const { ctaHref, links, social } = siteContent.topBar
  const reduced = useReducedMotion()
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <motion.div
      className="relative z-50 overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #3d2e24 0%, #c19a6b 50%, #3d2e24 100%)",
        backgroundSize: "200% 100%",
        animation: reduced ? "none" : "gradient-shift 8s ease infinite",
        height: "38px",
      }}
      initial={{ y: -38, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Shimmer sweep */}
      <motion.div
        className="pointer-events-none absolute inset-0 -skew-x-12"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }}
        initial={{ x: "-120%" }}
        animate={{ x: "220%" }}
        transition={{ duration: 2.2, delay: 0.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 4 }}
      />

      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10">

        {/* LEFT — scrolling marquee (mobile) / static message (md+) */}
        <div className="flex-1 overflow-hidden">
          {/* Mobile marquee — paused on reduced-motion via CSS */}
          <div className="flex md:hidden overflow-hidden">
            <div className={reduced ? "whitespace-nowrap" : "marquee-track whitespace-nowrap"}>
              {items.map((item, i) => (
                <span key={i} className="mx-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop — static message */}
          <p className="hidden md:block truncate text-xs font-medium text-white/90">
            <span className="mr-1 text-white/55">✦</span>
            Ready to Transform Your Skin?{" "}
            <a href={ctaHref} className="font-bold text-white underline underline-offset-2 transition-opacity hover:text-white/80">
              Consult Our Specialists Now
            </a>
          </p>
        </div>

        {/* RIGHT — links + social */}
        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <div className="flex items-center gap-3 text-[11px] text-white/80">
            {links.map((link, i) => (
              <span key={link.label} className="flex items-center gap-3">
                {i > 0 && <span className="h-3 w-px bg-white/25" />}
                <a
                  href={link.href}
                  className="transition-all duration-200 hover:text-white"
                  style={{ letterSpacing: "0.06em" }}
                >
                  {link.label}
                </a>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 border-l border-white/20 pl-4">
            {social.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="flex h-6 w-6 items-center justify-center rounded-full text-white/70 transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.08)" }}
                whileHover={{
                  scale: 1.2,
                  backgroundColor: "rgba(255,255,255,0.22)",
                  color: "#fff",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <SocialIcon icon={item.icon} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
