import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useState, useEffect, useRef, useCallback } from "react"
import { siteContent } from "../../data/siteContent"
import beforeImg     from "../../assets/hero-images/beforeherobackround.png"
import afterImg      from "../../assets/hero-images/afterherobackround.png"
import beforeMobImg  from "../../assets/hero-images/mobilebefore.png"
import afterMobImg   from "../../assets/hero-images/mobileafter.png"
import logoImg       from "../../assets/novalogo.png"

const EASE      = [0.25, 0.46, 0.45, 0.94]
const EASE_EXPO = [0.16, 1, 0.3, 1]

/* ══════════════════════════════════════════════════════════
   FULL-BACKGROUND BEFORE / AFTER DRAG SLIDER
   z-0 — slider layer (receives all pointer events)
   z-10 — navbar + text overlay (pointer-events on children)
══════════════════════════════════════════════════════════ */
function BackgroundSlider({ sectionRef }) {
  const wrapRef     = useRef(null)
  const widthRef    = useRef(0)
  const [pos, setPos]   = useState(50)
  const [drag, setDrag] = useState(false)
  const [hinted, setHinted] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  /* Parallax — images move at 40% of scroll speed (slow = deep parallax) */
  const { scrollY } = useScroll()
  const rawParallax = useTransform(scrollY, [0, 800], [0, -120])
  const parallaxY   = useSpring(rawParallax, { stiffness: 80, damping: 20, mass: 0.5 })

  /* measure container width + detect mobile */
  useEffect(() => {
    const measure = () => {
      if (wrapRef.current) widthRef.current = wrapRef.current.offsetWidth
      setIsMobile(window.innerWidth < 768)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const bgBefore = isMobile ? beforeMobImg : beforeImg
  const bgAfter  = isMobile ? afterMobImg  : afterImg

  const clamp = (v) => Math.min(Math.max(v, 2), 98)
  const toPercent = useCallback((clientX) => {
    const r = wrapRef.current?.getBoundingClientRect()
    if (!r) return pos
    return clamp(((clientX - r.left) / r.width) * 100)
  }, [pos])

  const onPointerDown = (e) => {
    wrapRef.current?.setPointerCapture(e.pointerId)
    setDrag(true); setHinted(true)
    setPos(toPercent(e.clientX))
  }
  const onPointerMove = (e) => { if (drag) setPos(toPercent(e.clientX)) }
  const onPointerUp   = () => setDrag(false)

  /* auto-hint sweep on load */
  useEffect(() => {
    if (hinted) return
    const t = setTimeout(() => {
      const steps = [50, 42, 35, 43, 58, 65, 55, 50]
      let i = 0
      const run = () => { if (i >= steps.length) return; setPos(steps[i++]); setTimeout(run, 210) }
      run()
    }, 1800)
    return () => clearTimeout(t)
  }, [hinted])

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0"
      style={{ zIndex: 0, touchAction: "none", cursor: "ew-resize", userSelect: "none",
        /* extra height so parallax shift doesn't expose edges */
        top: "-8%", bottom: "-8%", left: 0, right: 0 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* AFTER — full base layer (right side) — moves with parallax */}
      <motion.img
        src={bgAfter} alt="" aria-hidden="true" draggable={false}
        className="absolute inset-0 h-full w-full select-none object-cover"
        style={{ objectPosition: "center top", pointerEvents: "none", y: parallaxY }}
      />

      {/* BEFORE — clipped to left of divider — same parallax */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%`, pointerEvents: "none" }}
      >
        <motion.img
          src={bgBefore} alt="" aria-hidden="true" draggable={false}
          className="absolute inset-0 h-full select-none object-cover"
          style={{
            objectPosition: "center top",
            width: widthRef.current > 0 ? `${widthRef.current}px` : "100vw",
            maxWidth: "none",
            pointerEvents: "none",
            y: parallaxY,
          }}
        />
      </div>

      {/* Divider line */}
      <div
        className="pointer-events-none absolute inset-y-0"
        style={{
          left: `${pos}%`,
          width: 2,
          transform: "translateX(-50%)",
          background: "linear-gradient(to bottom, transparent 3%, rgba(255,255,255,0.75) 12%, rgba(255,255,255,0.75) 88%, transparent 97%)",
        }}
      />

      {/* Handle — dark rounded pill with < > arrows like the example */}
      <div
        className="pointer-events-none absolute"
        style={{ top: "50%", left: `${pos}%`, transform: "translate(-50%,-50%)", zIndex: 3 }}
      >
        <motion.div
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{
            background: "rgba(30,18,12,0.82)",
            border: "2px solid rgba(255,255,255,0.22)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.45)",
          }}
          animate={{ scale: drag ? 1.18 : 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 24 }}
        >
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1.5px solid rgba(255,255,255,0.30)" }}
            animate={{ scale: [1, 1.65], opacity: [0.5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
          {/* < > arrows */}
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />
          </svg>
        </motion.div>
      </div>

      {/* BEFORE label */}
      <div
        className="pointer-events-none absolute flex items-center gap-1.5 rounded-full px-3 py-1.5"
        style={{ left: 20, bottom: 32, background: "rgba(20,12,8,0.52)", backdropFilter: "blur(6px)" }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.6)" }} />
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">Before</span>
      </div>

      {/* AFTER label */}
      <div
        className="pointer-events-none absolute flex items-center gap-1.5 rounded-full px-3 py-1.5"
        style={{ right: 20, bottom: 32, background: "rgba(196,97,74,0.80)", backdropFilter: "blur(6px)" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white/80 rounded-full" />
        <span className="text-[9px] font-bold uppercase tracking-widest text-white">After</span>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════ */
function NavLink({ label, href, active, hasDropdown }) {
  return (
    <a href={href}
      className="relative flex items-center gap-0.5 text-[13px] font-medium transition-colors duration-200 hover:text-[#C4614A]"
      style={{ color: active ? "#C4614A" : "#5a3e32", letterSpacing: "0.01em" }}
    >
      {label}
      {hasDropdown && (
        <svg className="h-3 w-3 opacity-60" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
        </svg>
      )}
      {active && <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full" style={{ background: "#C4614A" }} />}
    </a>
  )
}

function Navbar() {
  const { nav } = siteContent
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{ position: "relative", zIndex: 50 }}>
      <div
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10"
        style={{ background: "transparent", borderBottom: "none" }}
      >
        {/* Logo */}
        <a href="#" aria-label="Novaderm home" className="flex items-center gap-2.5 shrink-0">
          <img
            src={logoImg}
            alt="Novaderm"
            draggable={false}
            className="select-none"
            style={{ height: "clamp(48px,7vw,72px)", width: "auto", objectFit: "contain" }}
          />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          {nav.links.map((l) => (
            <NavLink key={l.label} label={l.label} href={l.href} active={l.label === "Home"} hasDropdown={false} />
          ))}
        </div>

        {/* CTA + socials */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.a href={nav.ctaHref}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-wide text-white"
            style={{ background: "linear-gradient(135deg,#C4614A,#a0432e)", boxShadow: "0 4px 16px rgba(196,97,74,0.35)" }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            {nav.ctaText}
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </motion.a>
          {[
            { label: "Instagram", href: siteContent.topBar?.social?.find(s=>s.icon==="instagram")?.href||"#", d: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 2h11A3.5 3.5 0 0121 5.5v13a3.5 3.5 0 01-3.5 3.5h-11A3.5 3.5 0 013 18.5v-13A3.5 3.5 0 016.5 2z" },
          ].map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors hover:border-[#C4614A] hover:text-[#C4614A]"
              style={{ borderColor: "rgba(196,97,74,0.3)", color: "#7a5a4a" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <path d={s.d}/>
              </svg>
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button className="flex flex-col gap-1.5 p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {[0,1,2].map((i) => (
            <motion.span key={i} className="block h-0.5 w-5 rounded-full" style={{ background: "#3d2e24" }}
              animate={menuOpen ? i===0?{rotate:45,y:8}:i===1?{opacity:0}:{rotate:-45,y:-8}:{rotate:0,y:0,opacity:1}}
              transition={{ duration: 0.22 }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div className="overflow-hidden lg:hidden"
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: EASE }}
        style={{ background: "rgba(244,239,234,0.96)", backdropFilter: "blur(12px)" }}>
        <div className="flex flex-col gap-1 px-6 pb-5 pt-2">
          {nav.links.map((l) => (
            <a key={l.label} href={l.href} className="py-2 text-[14px] font-semibold border-b"
              style={{ color: l.label==="Home"?"#C4614A":"#3d2e24", borderColor:"rgba(61,46,36,0.08)" }}
              onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href={nav.ctaHref}
            className="mt-3 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-wide text-white"
            style={{ background: "linear-gradient(135deg,#C4614A,#a0432e)" }}
            onClick={() => setMenuOpen(false)}>{nav.ctaText}</a>
        </div>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   BOTANICAL LEAF SVG
══════════════════════════════════════════════════════════ */
function BotanicalLeaf() {
  return (
    <motion.svg viewBox="0 0 180 420" aria-hidden="true"
      className="pointer-events-none select-none absolute"
      style={{ left: -20, top: "18%", width: "clamp(80px,11vw,155px)", opacity: 0.22, zIndex: 2 }}
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 0.22, x: 0 }}
      transition={{ duration: 1.1, delay: 0.5, ease: EASE_EXPO }}>
      <path d="M90 400 Q86 300 82 210 Q78 120 90 30" stroke="#C4614A" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      {[320,262,204,150].map((y,i) => (
        <g key={i}>
          <path d={`M${88-i} ${y} Q${52-i*2} ${y-20} ${38-i*2} ${y-60} Q${62} ${y-52} ${88-i} ${y-40}`} stroke="#C4614A" strokeWidth="1.1" fill="rgba(196,97,74,0.10)" strokeLinecap="round"/>
          <path d={`M${92+i} ${y-10} Q${128+i*2} ${y-28} ${142+i*2} ${y-68} Q${118} ${y-58} ${92+i} ${y-48}`} stroke="#C4614A" strokeWidth="1.1" fill="rgba(196,97,74,0.07)" strokeLinecap="round"/>
        </g>
      ))}
    </motion.svg>
  )
}

/* ══════════════════════════════════════════════════════════
   STATS
══════════════════════════════════════════════════════════ */
const STATS = [
  { icon: "patients", target: 3500, suffix: "+",  label: "Happy Patients",   dec: 0 },
  { icon: "years",    target: 12,   suffix: "+",  label: "Years Experience", dec: 0 },
  { icon: "star",     target: 4.9,  suffix: "★",  label: "Avg. Rating",      dec: 1 },
  { icon: "shield",   target: 98,   suffix: "%",  label: "Success Rate",     dec: 0 },
]
const STAT_ICONS = {
  patients: <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  years:    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  star:     <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="#C4614A" strokeWidth="1.7" fill="rgba(196,97,74,0.1)"/></svg>,
  shield:   <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
}

function CountUp({ target, suffix, dec = 0, delay = 0 }) {
  const [v, setV] = useState("0")
  const r = useRef(null)
  useEffect(() => {
    const t = setTimeout(() => {
      const dur = 1100, s = performance.now()
      const tick = (now) => {
        const p = Math.min((now - s) / dur, 1), e = 1 - Math.pow(1 - p, 4)
        setV(dec > 0 ? (e * target).toFixed(dec) : Math.floor(e * target).toLocaleString())
        if (p < 1) r.current = requestAnimationFrame(tick)
        else setV(dec > 0 ? target.toFixed(dec) : target.toLocaleString())
      }
      r.current = requestAnimationFrame(tick)
    }, delay)
    return () => { clearTimeout(t); if (r.current) cancelAnimationFrame(r.current) }
  }, [target, dec, delay])
  return <>{v}{suffix}</>
}

/* ══════════════════════════════════════════════════════════
   MOBILE NAVBAR
══════════════════════════════════════════════════════════ */
function MobileNavbar() {
  const { nav } = siteContent
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div style={{ background: "transparent" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 20px" }}>
        <a href="#" style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:40, height:40, borderRadius:"50%", border:"2px solid #C4614A", background:"rgba(255,255,255,0.85)",
            display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span className="font-serif" style={{ fontSize:"1rem", fontWeight:700, color:"#C4614A" }}>N</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", lineHeight:1 }}>
            <span className="font-serif" style={{ fontSize:"0.95rem", fontWeight:700, color:"#3d2e24" }}>Nova Derm</span>
            <span style={{ fontSize:"0.55rem", fontWeight:600, color:"#C4614A", letterSpacing:"0.15em", textTransform:"uppercase" }}>Skin &amp; Aesthetics</span>
          </div>
        </a>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ padding:8, background:"transparent", border:"none", cursor:"pointer" }} aria-label="Toggle menu">
          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display:"block", width:22, height:2, borderRadius:2, background:"#3d2e24",
                transform: menuOpen ? (i===0?"rotate(45deg) translate(5px,5px)":i===1?"scaleX(0)":"rotate(-45deg) translate(5px,-5px)") : "none",
                opacity: menuOpen&&i===1 ? 0 : 1, transition:"transform 0.22s, opacity 0.22s" }}/>
            ))}
          </div>
        </button>
      </div>
      {menuOpen && (
        <div style={{ background:"rgba(244,239,234,0.97)", padding:"8px 20px 20px", borderTop:"1px solid rgba(196,97,74,0.1)" }}>
          {nav.links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ display:"block", padding:"10px 0", fontSize:14, fontWeight:600, color:l.label==="Home"?"#C4614A":"#3d2e24", borderBottom:"1px solid rgba(61,46,36,0.07)" }}>
              {l.label}
            </a>
          ))}
          <a href={nav.ctaHref} onClick={() => setMenuOpen(false)}
            style={{ display:"block", marginTop:14, textAlign:"center", borderRadius:999, padding:"12px 20px",
              fontSize:"0.72rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"#fff",
              background:"linear-gradient(135deg,#C4614A,#a0432e)" }}>
            {nav.ctaText}
          </a>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   MOBILE SLIDER — standalone, only covers image zone
══════════════════════════════════════════════════════════ */
function MobileSlider() {
  const wrapRef  = useRef(null)
  const widthRef = useRef(0)
  const [pos, setPos]   = useState(50)
  const [drag, setDrag] = useState(false)
  const [hinted, setHinted] = useState(false)

  useEffect(() => {
    const measure = () => { if (wrapRef.current) widthRef.current = wrapRef.current.offsetWidth }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const clamp = (v) => Math.min(Math.max(v, 2), 98)
  const getPercent = (clientX) => {
    const r = wrapRef.current?.getBoundingClientRect()
    if (!r) return pos
    return clamp(((clientX - r.left) / r.width) * 100)
  }

  /* Touch handlers */
  const onTouchStart = (e) => { setDrag(true); setHinted(true); setPos(getPercent(e.touches[0].clientX)) }
  const onTouchMove  = (e) => { e.preventDefault(); if (drag) setPos(getPercent(e.touches[0].clientX)) }
  const onTouchEnd   = () => setDrag(false)
  /* Pointer handlers (desktop fallback) */
  const onPointerDown = (e) => { wrapRef.current?.setPointerCapture(e.pointerId); setDrag(true); setHinted(true); setPos(getPercent(e.clientX)) }
  const onPointerMove = (e) => { if (drag) setPos(getPercent(e.clientX)) }
  const onPointerUp   = () => setDrag(false)

  useEffect(() => {
    if (hinted) return
    const t = setTimeout(() => {
      const steps = [50,40,32,42,60,68,55,50]
      let i = 0
      const run = () => { if (i >= steps.length) return; setPos(steps[i++]); setTimeout(run, 200) }
      run()
    }, 1400)
    return () => clearTimeout(t)
  }, [hinted])

  return (
    <div ref={wrapRef}
      style={{ position: "relative", width: "100%", aspectRatio: "9/16", overflow: "hidden", touchAction: "none", cursor: "ew-resize", userSelect: "none" }}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp} onPointerCancel={onPointerUp}
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
    >
      {/* After — base */}
      <img src={afterMobImg} alt="" aria-hidden draggable={false}
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", pointerEvents:"none" }} />
      {/* Before — clipped */}
      <div style={{ position:"absolute", inset:0, width:`${pos}%`, overflow:"hidden", pointerEvents:"none" }}>
        <img src={beforeMobImg} alt="" aria-hidden draggable={false}
          style={{ position:"absolute", inset:0, height:"100%", objectFit:"cover", objectPosition:"center top",
            width: widthRef.current > 0 ? `${widthRef.current}px` : "100vw", maxWidth:"none", pointerEvents:"none" }} />
      </div>
      {/* Divider */}
      <div style={{ position:"absolute", top:0, bottom:0, left:`${pos}%`, width:2, transform:"translateX(-50%)", pointerEvents:"none",
        background:"linear-gradient(to bottom, transparent 2%, rgba(255,255,255,0.8) 10%, rgba(255,255,255,0.8) 90%, transparent 98%)" }} />
      {/* Handle */}
      <div style={{ position:"absolute", top:"50%", left:`${pos}%`, transform:"translate(-50%,-50%)", zIndex:3, pointerEvents:"none" }}>
        <div style={{ width:44, height:44, borderRadius:"50%", background:"rgba(25,14,8,0.80)",
          border:"2px solid rgba(255,255,255,0.25)", boxShadow:"0 4px 18px rgba(0,0,0,0.4)",
          display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg viewBox="0 0 24 24" fill="none" width={20} height={20} stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l-6-6 6-6M15 6l6 6-6 6"/>
          </svg>
        </div>
      </div>
      {/* Labels */}
      <div style={{ position:"absolute", left:12, bottom:12, display:"flex", alignItems:"center", gap:6, borderRadius:999,
        padding:"4px 10px", background:"rgba(20,12,8,0.50)", pointerEvents:"none" }}>
        <span style={{ width:6, height:6, borderRadius:"50%", background:"rgba(255,255,255,0.6)", display:"inline-block" }}/>
        <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.85)" }}>Before</span>
      </div>
      <div style={{ position:"absolute", right:12, bottom:12, display:"flex", alignItems:"center", gap:6, borderRadius:999,
        padding:"4px 10px", background:"rgba(196,97,74,0.82)", pointerEvents:"none" }}>
        <span style={{ width:6, height:6, borderRadius:"50%", background:"rgba(255,255,255,0.85)", display:"inline-block" }}/>
        <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#fff" }}>After</span>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   MAIN HERO
══════════════════════════════════════════════════════════ */
export default function Hero() {
  const { slides } = siteContent.hero
  const slide = slides[0]

  /* Parallax scroll for desktop content layer */
  const { scrollY } = useScroll()
  const rawContentY = useTransform(scrollY, [0, 600], [0, -40])
  const contentY    = useSpring(rawContentY, { stiffness: 90, damping: 22, mass: 0.4 })
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0.15])

  return (
    <section id="home" style={{
      position: "relative",
      overflow: "hidden",
      minHeight: "100svh",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* ── z-0: full-screen before/after drag slider (all devices) ── */}
      <BackgroundSlider />

      {/* ── z-2: botanical leaf ── */}
      <BotanicalLeaf />

      {/* ── z-10: navbar + content overlay ── */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", flex: 1, pointerEvents: "none" }}>

        {/* Navbar */}
        <div style={{ pointerEvents: "auto" }}>
          <Navbar />
        </div>

        {/* Content — sits in top portion on mobile, centered on desktop */}
        <motion.div
          className="flex items-start md:items-center mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10"
          style={{
            flex: 1,
            paddingTop: "clamp(20px, 5vw, 80px)",
            paddingBottom: "clamp(32px, 5vw, 80px)",
            y: contentY,
            opacity: contentOpacity,
          }}
        >
          <div className="flex flex-col justify-start md:justify-center" style={{ maxWidth: 500, pointerEvents: "auto" }}>

            {/* Badge */}
            <motion.span className="mb-3 inline-flex items-center gap-2"
              style={{ fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#a07060" }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}>
              <span className="inline-block h-px w-5" style={{ background: "rgba(160,112,96,0.5)" }} />
              {slide.badge}
            </motion.span>

            {/* Headline */}
            <motion.h1 style={{ lineHeight: 1.08, letterSpacing: "-0.02em", margin: 0 }}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14, ease: EASE_EXPO }}>
              {(() => {
                const parts = slide.headline.split(/\.\s*/).filter(Boolean)
                return <>
                  <span className="font-serif block"
                    style={{ fontSize: "clamp(1.7rem,4.2vw,3.1rem)", color: "#C4614A", fontWeight: 700, fontStyle: "italic" }}>
                    {parts[0]}.
                  </span>
                  {parts.slice(1).map((p, i) => (
                    <span key={i} className="font-serif block"
                      style={{ fontSize: "clamp(1.7rem,4.2vw,3.1rem)", color: "#2e1f16", fontWeight: 700 }}>
                      {p}.
                    </span>
                  ))}
                </>
              })()}
            </motion.h1>

            {/* Description */}
            <motion.p className="font-sans"
              style={{ fontSize: "clamp(0.8rem,1.1vw,0.93rem)", color: "#7a5a4a", lineHeight: 1.72,
                maxWidth: 370, fontWeight: 400, marginTop: "clamp(10px,1.5vw,16px)" }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24, ease: EASE }}>
              {slide.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="flex flex-wrap items-center gap-3"
              style={{ marginTop: "clamp(18px,2.5vw,28px)" }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.34, ease: EASE }}>
              <motion.a href={slide.primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-full text-white font-bold uppercase"
                style={{ padding: "clamp(9px,1.2vw,12px) clamp(18px,2.5vw,24px)",
                  fontSize: "clamp(0.68rem,0.85vw,0.75rem)", letterSpacing: "0.07em",
                  background: "linear-gradient(135deg,#C4614A,#9a3d2a)", boxShadow: "0 4px 18px rgba(196,97,74,0.42)" }}
                whileHover={{ scale: 1.04, boxShadow: "0 7px 24px rgba(196,97,74,0.55)" }}
                whileTap={{ scale: 0.97 }}>
                {slide.primaryCta.text}
                <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </motion.a>
              <motion.a href={slide.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full font-semibold"
                style={{ padding: "clamp(9px,1.2vw,12px) clamp(16px,2vw,20px)",
                  fontSize: "clamp(0.68rem,0.85vw,0.75rem)",
                  borderColor: "rgba(196,97,74,0.40)", color: "#7a4a38",
                  background: "rgba(255,255,255,0.65)", border: "1.5px solid rgba(196,97,74,0.4)" }}
                whileHover={{ scale: 1.03, borderColor: "#C4614A", color: "#C4614A", background: "rgba(255,255,255,0.88)" }}
                whileTap={{ scale: 0.97 }}>
                {slide.secondaryCta.text}
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 gap-x-4 gap-y-3 md:flex md:flex-wrap md:gap-6"
              style={{ marginTop: "clamp(20px,3vw,36px)" }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5, ease: EASE }}>
              {STATS.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex shrink-0 items-center justify-center rounded-lg"
                    style={{ width: 30, height: 30, background: "rgba(255,255,255,0.60)" }}>
                    {STAT_ICONS[s.icon]}
                  </div>
                  <div className="flex flex-col leading-none gap-0.5">
                    <span className="font-serif font-bold tabular-nums"
                      style={{ fontSize: "clamp(0.92rem,1.4vw,1.1rem)", color: "#2e1f16", letterSpacing: "-0.01em" }}>
                      <CountUp target={s.target} suffix={s.suffix} dec={s.dec} delay={700 + i * 80} />
                    </span>
                    <span style={{ fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "#a07060" }}>
                      {s.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
