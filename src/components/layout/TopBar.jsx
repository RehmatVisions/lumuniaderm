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

const MARQUEE_ITEMS = [
  { icon: "✦", text: "Medical-Grade Aesthetic Treatments" },
  { icon: "◈", text: "Internationally Certified Dermatologists" },
  { icon: "✦", text: "4.9★ Verified Patient Rating" },
  { icon: "◈", text: "3,500+ Patients Transformed" },
  { icon: "✦", text: "FDA-Cleared Laser & PRP Therapy" },
  { icon: "◈", text: "Bespoke Treatment Protocols" },
]

export default function TopBar() {
  const { ctaHref, links, social } = siteContent.topBar
  const reduced = useReducedMotion()
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <motion.div
      className="relative z-50 overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #1a1208 0%, #2a1f0e 30%, #1e1609 60%, #2a1f0e 80%, #1a1208 100%)",
        height: "40px",
        borderBottom: "1px solid rgba(193,154,107,0.18)",
      }}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Subtle top gold line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(193,154,107,0.55) 30%, rgba(212,176,138,0.80) 50%, rgba(193,154,107,0.55) 70%, transparent 100%)" }}
      />

      {/* Shimmer sweep — repeating */}
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 -skew-x-12"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(193,154,107,0.07) 50%, transparent 100%)" }}
          initial={{ x: "-120%" }}
          animate={{ x: "220%" }}
          transition={{ duration: 3.5, delay: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 6 }}
        />
      )}

      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10">

        {/* LEFT — marquee (mobile) / text (desktop) */}
        <div className="flex-1 overflow-hidden">

          {/* Mobile marquee */}
          <div className="flex md:hidden overflow-hidden">
            <div className={reduced ? "whitespace-nowrap" : "marquee-track whitespace-nowrap"}>
              {items.map((item, i) => (
                <span key={i} className="mx-5 inline-flex items-center gap-1.5">
                  <span style={{ color: "rgba(193,154,107,0.65)", fontSize: 8 }}>{item.icon}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: "rgba(255,255,255,0.82)", letterSpacing: "0.13em" }}>
                    {item.text}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Desktop */}
          <p className="hidden md:flex items-center gap-2 text-[11.5px] font-medium"
            style={{ color: "rgba(255,255,255,0.72)" }}>
            <span style={{ color: "rgba(193,154,107,0.70)", fontSize: 9 }}>◆</span>
            <span style={{ letterSpacing: "0.04em" }}>
              Ready to Transform Your Skin?{" "}
              <a
                href={ctaHref}
                className="font-bold transition-all duration-200 hover:opacity-80"
                style={{
                  color: "#d4b08a",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(212,176,138,0.45)",
                  paddingBottom: "1px",
                }}
              >
                Consult Our Specialists →
              </a>
            </span>
          </p>
        </div>

        {/* RIGHT — links + divider + social */}
        <div className="hidden shrink-0 items-center gap-5 md:flex">

          {/* Links */}
          <div className="flex items-center gap-4 text-[11px]" style={{ color: "rgba(255,255,255,0.55)" }}>
            {links.map((link, i) => (
              <span key={link.label} className="flex items-center gap-4">
                {i > 0 && <span className="h-2.5 w-px" style={{ background: "rgba(193,154,107,0.22)" }} />}
                <a
                  href={link.href}
                  className="transition-all duration-200 hover:text-white"
                  style={{ letterSpacing: "0.07em", fontWeight: 500 }}
                >
                  {link.label}
                </a>
              </span>
            ))}
          </div>

          {/* Divider */}
          <span className="h-3 w-px" style={{ background: "rgba(193,154,107,0.25)" }} />

          {/* Social icons */}
          <div className="flex items-center gap-1.5">
            {social.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="flex h-[22px] w-[22px] items-center justify-center rounded-full"
                style={{
                  background: "rgba(193,154,107,0.08)",
                  border: "1px solid rgba(193,154,107,0.18)",
                  color: "rgba(255,255,255,0.55)",
                }}
                whileHover={{
                  scale: 1.18,
                  background: "rgba(193,154,107,0.22)",
                  borderColor: "rgba(193,154,107,0.55)",
                  color: "#d4b08a",
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.18 }}
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
