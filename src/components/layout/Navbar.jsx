import { motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { siteContent } from "../../data/siteContent"
import logoImg from "../../assets/novalogo.png"

const EASE_EXPO = [0.16, 1, 0.3, 1]

// Nav links config — label maps to route or hash
// On home page: hash anchors work. On other pages: navigate to /#section
const NAV_LINKS = [
  { label: "Home",       href: "/",         isRoute: true  },
  { label: "About Us",   href: "/#about",   isRoute: false },
  { label: "Services",   href: "/#services",isRoute: false },
  { label: "Why Us",     href: "/#why-us",  isRoute: false },
  { label: "Gallery",    href: "/gallery",  isRoute: true  },
  { label: "Doctors",    href: "/doctors",  isRoute: true  },
  { label: "Contact Us", href: "/#contact", isRoute: false },
]

function NavItem({ link, onClick }) {
  const location = useLocation()
  const navigate = useNavigate()

  // Determine active state
  const isActive =
    (link.href === "/" && location.pathname === "/" && !location.hash) ||
    (link.isRoute && link.href !== "/" && location.pathname === link.href) ||
    (!link.isRoute && location.hash === link.href.replace(/^\//, ""))

  const handleClick = (e) => {
    if (onClick) onClick()
    if (!link.isRoute) {
      e.preventDefault()
      // If already on home page, just scroll
      if (location.pathname === "/") {
        const id = link.href.replace("/#", "")
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      } else {
        // Navigate to home then scroll
        navigate(link.href)
      }
    }
  }

  if (link.isRoute) {
    return (
      <Link
        to={link.href}
        onClick={onClick}
        className="relative flex items-center transition-colors duration-200 hover:text-[#C4614A]"
        style={{
          fontSize: "17px",
          fontFamily: "'Nunito', system-ui, sans-serif",
          fontWeight: 800,
          color: isActive ? "#C4614A" : "#1a0f0a",
          letterSpacing: "0.01em",
          textDecoration: "none",
        }}
      >
        {link.label}
        {isActive && (
          <span
            className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
            style={{ background: "#C4614A" }}
          />
        )}
      </Link>
    )
  }

  return (
    <a
      href={link.href}
      onClick={handleClick}
      className="relative flex items-center transition-colors duration-200 hover:text-[#C4614A]"
      style={{
        fontSize: "17px",
        fontFamily: "'Nunito', system-ui, sans-serif",
        fontWeight: 800,
        color: isActive ? "#C4614A" : "#1a0f0a",
        letterSpacing: "0.01em",
        textDecoration: "none",
      }}
    >
      {link.label}
      {isActive && (
        <span
          className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
          style={{ background: "#C4614A" }}
        />
      )}
    </a>
  )
}

export default function Navbar({ variant = "hero" }) {
  const { nav } = siteContent
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const location = useLocation()
  const navigate = useNavigate()

  // variant="hero" → transparent overlay on hero
  // variant="page" → solid sticky bar on inner pages
  const isPage = variant === "page"

  const handleCta = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    if (location.pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    } else {
      navigate("/#contact")
    }
  }

  return (
    <motion.div
      style={{
        position: isPage ? "sticky" : "relative",
        top: 0,
        zIndex: 50,
        background: isPage
          ? "rgba(253, 242, 235, 0.72)"
          : "transparent",
        backdropFilter: isPage ? "blur(18px) saturate(1.6)" : "none",
        WebkitBackdropFilter: isPage ? "blur(18px) saturate(1.6)" : "none",
        borderBottom: isPage ? "1px solid rgba(196,97,74,0.10)" : "none",
        boxShadow: isPage ? "0 2px 24px rgba(196,97,74,0.07)" : "none",
      }}
      initial={reduceMotion ? false : { opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.08, ease: EASE_EXPO }}
    >
      {/* Desktop + tablet nav bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">

        {/* Logo */}
        <Link to="/" aria-label="Novaderm home" className="flex items-center shrink-0">
          <img
            src={logoImg}
            alt="Novaderm"
            draggable={false}
            className="select-none"
            style={{
              height: isPage ? "clamp(52px,6vw,72px)" : "clamp(90px,13vw,145px)",
              width: "auto",
              objectFit: "contain",
            }}
            loading="eager"
            decoding="async"
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.label} link={link} />
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.a
            href="/#contact"
            onClick={handleCta}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-wide text-white"
            style={{
              background: "linear-gradient(135deg,#C4614A,#a0432e)",
              boxShadow: "0 4px 16px rgba(196,97,74,0.35)",
              textDecoration: "none",
            }}
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.025 }}
            whileTap={{ scale: 0.97 }}
          >
            {nav.ctaText}
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 p-2 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-0.5 w-5 rounded-full"
              style={{ background: "#c4614a" }}
              animate={
                menuOpen
                  ? i === 0 ? { rotate: 45, y: 8 }
                  : i === 1 ? { opacity: 0 }
                  : { rotate: -45, y: -8 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.22 }}
            />
          ))}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <motion.div
        className="overflow-hidden lg:hidden"
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ background: "rgba(244,239,234,0.97)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex flex-col gap-1 px-6 pb-5 pt-2">
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.label}
              link={link}
              onClick={() => setMenuOpen(false)}
            />
          ))}
          <a
            href="/#contact"
            onClick={handleCta}
            className="mt-3 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-wide text-white"
            style={{ background: "linear-gradient(135deg,#C4614A,#a0432e)", textDecoration: "none" }}
          >
            {nav.ctaText}
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
