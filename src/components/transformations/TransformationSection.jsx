import { useRef, useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import SectionBadge from "../ui/SectionBadge"

// ── Image pairs (2 sets)
import hairBefore   from "../../assets/beforeafter/hairbefore.png"
import hairAfter    from "../../assets/beforeafter/hairafter.png"
import jawBefore    from "../../assets/beforeafter/jawlinebefore.png"
import jawAfter     from "../../assets/beforeafter/jawlineafter.png"

const PAIRS = [
  { before: hairBefore, after: hairAfter, label: "Hair Restoration",    duration: "8-Week Results",  tag: "PRP Hair Therapy"      },
  { before: jawBefore,  after: jawAfter,  label: "Jawline Contouring",  duration: "Single Session",  tag: "Facial Sculpting"      },
]

const INTERVAL = 3800

// ─────────────────────────────────────────────────────────────
// SliderCard — single draggable before/after card
// ─────────────────────────────────────────────────────────────
function SliderCard({ pair }) {
  const containerRef   = useRef(null)
  const isDraggingRef  = useRef(false) // ref so onPointerMove always reads the current value

  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false) // only used for the handle scale animation
  const [touched,  setTouched]  = useState(false)

  // Convert a raw clientX pixel value into a 0–100 percentage inside the card
  const toPercent = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return 50
    return Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 3), 97)
  }, [])

  const onPointerDown = useCallback((e) => {
    // Capture the pointer so move/up events keep firing even off the element
    containerRef.current?.setPointerCapture(e.pointerId)
    isDraggingRef.current = true   // write to ref immediately — no async lag
    setDragging(true)
    setTouched(true)
    setPosition(toPercent(e.clientX))
  }, [toPercent])

  const onPointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return   // read ref, not state — always up to date
    setPosition(toPercent(e.clientX))
  }, [toPercent])

  const onPointerUp = useCallback(() => {
    isDraggingRef.current = false
    setDragging(false)
  }, [])

  // Reset position when the pair image changes
  useEffect(() => {
    setPosition(50)
    setTouched(false)
  }, [pair])

  // Intro hint sweep — shows the user this is draggable
  useEffect(() => {
    if (touched) return
    const id = setTimeout(() => {
      const steps = [50, 42, 35, 44, 62, 68, 58, 50]
      let frame = 0
      const sweep = () => {
        if (frame >= steps.length) return
        setPosition(steps[frame++])
        setTimeout(sweep, 160)
      }
      sweep()
    }, 700)
    return () => clearTimeout(id)
  }, [touched, pair])

  return (
    <div className="relative select-none img-shine" style={{ borderRadius: 22 }}>
      {/* Glow border */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: -1, borderRadius: 22, zIndex: 0,
        background: "linear-gradient(135deg,rgba(193,154,107,0.55) 0%,rgba(255,255,255,0.04) 50%,rgba(193,154,107,0.2) 100%)",
      }} />

      {/* Container — touchAction:none lets pointer events work on all touch devices */}
      <motion.div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{
          borderRadius: 20, aspectRatio: "4 / 5",
          cursor: dragging ? "grabbing" : "ew-resize",
          touchAction: "none",   // tell the browser: we handle all touch gestures here
          userSelect: "none",
          zIndex: 1,
          boxShadow: "0 40px 80px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.28)",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* AFTER base */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`after-${pair.label}`}
            src={pair.after} alt="After treatment" draggable={false}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "top center",
              pointerEvents: "none", userSelect: "none",
            }}
          />
        </AnimatePresence>

        {/* BEFORE clipped slice */}
        <div style={{ position:"absolute", inset:0, overflow:"hidden", width:`${position}%`, pointerEvents:"none" }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={`before-${pair.label}`}
              src={pair.before} alt="Before treatment" draggable={false}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
              style={{
                position: "absolute", inset: 0,
                width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%",
                height: "100%", maxWidth: "none",
                objectFit: "cover", objectPosition: "top center", userSelect: "none",
              }}
            />
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div style={{
          position:"absolute", inset:"0 auto", left:`${position}%`, width:2,
          transform:"translateX(-50%)",
          background:"linear-gradient(to bottom,transparent 0%,rgba(255,255,255,0.95) 10%,rgba(255,255,255,0.95) 90%,transparent 100%)",
          pointerEvents:"none",
        }} />

        {/* Handle */}
        <motion.div
          style={{
            position:"absolute", top:"50%", left:`${position}%`,
            transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:3,
          }}
          animate={{ scale: dragging ? 1.2 : 1 }}
          transition={{ type:"spring", stiffness:400, damping:20 }}
        >
          <motion.div style={{
            position:"absolute", inset:-3, borderRadius:"9999px",
            border:"1px solid rgba(193,154,107,0.55)",
          }}
            animate={{ scale:[1,1.7], opacity:[0.7,0] }}
            transition={{ duration:1.8, repeat:Infinity, ease:"easeOut" }}
          />
          <div style={{
            width:46, height:46, borderRadius:"9999px",
            border:"2px solid rgba(255,255,255,0.85)", background:"rgba(0,0,0,0.7)",
            display:"flex", alignItems:"center", justifyContent:"center", position:"relative",
          }}>
            <div style={{ position:"absolute", width:8, height:8, borderRadius:"9999px", background:"#c19a6b", boxShadow:"0 0 12px rgba(193,154,107,1)" }} />
            <svg style={{ position:"absolute",left:5,width:13,height:13,color:"rgba(255,255,255,0.9)" }} viewBox="0 0 20 20" fill="currentColor">
              <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/>
            </svg>
            <svg style={{ position:"absolute",right:5,width:13,height:13,color:"rgba(255,255,255,0.9)" }} viewBox="0 0 20 20" fill="currentColor">
              <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
            </svg>
          </div>
        </motion.div>

        {/* BEFORE label */}
        <div style={{ position:"absolute",top:12,left:12,borderRadius:"9999px",overflow:"hidden",pointerEvents:"none",zIndex:2 }}>
          <div style={{ display:"flex",alignItems:"center",gap:5,padding:"5px 12px",background:"rgba(0,0,0,0.68)" }}>
            <div style={{ width:5,height:5,borderRadius:"9999px",background:"rgba(255,255,255,0.5)" }} />
            <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.82)" }}>Before</span>
          </div>
        </div>

        {/* AFTER label */}
        <div style={{ position:"absolute",top:12,right:12,borderRadius:"9999px",overflow:"hidden",pointerEvents:"none",zIndex:2 }}>
          <div style={{ display:"flex",alignItems:"center",gap:5,padding:"5px 12px",background:"linear-gradient(135deg,rgba(193,154,107,0.95),rgba(168,130,90,1))" }}>
            <div style={{ width:5,height:5,borderRadius:"9999px",background:"rgba(255,255,255,0.7)" }} />
            <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"#fff" }}>After</span>
          </div>
        </div>

        {/* Bottom strip */}
        <div style={{ position:"absolute",bottom:10,left:10,right:10,display:"flex",alignItems:"flex-end",justifyContent:"space-between",pointerEvents:"none",zIndex:2 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={pair.label}
              initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-8 }}
              transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
              style={{ borderRadius:10,padding:"7px 11px",background:"rgba(0,0,0,0.68)" }}
            >
              <p style={{ fontSize:10,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(255,255,255,0.90)",margin:0 }}>{pair.tag}</p>
              <p style={{ fontSize:12,fontWeight:700,color:"#c19a6b",margin:0,lineHeight:1.3 }}>{pair.duration}</p>
            </motion.div>
          </AnimatePresence>
          <div style={{ borderRadius:10,padding:"7px 10px",background:"rgba(0,0,0,0.68)",display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3 }}>
            <div style={{ display:"flex",gap:2 }}>
              {[1,2,3,4,5].map(s => (
                <svg key={s} style={{ width:10,height:10,color:"#c19a6b" }} viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <span style={{ fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.95)" }}>Verified</span>
          </div>
        </div>

        {/* Drag hint */}
        <AnimatePresence>
          {!touched && (
            <motion.div
              style={{ position:"absolute",bottom:62,left:0,right:0,display:"flex",justifyContent:"center",pointerEvents:"none",zIndex:3 }}
              initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-6 }}
              transition={{ delay:0.5,duration:0.4 }}
            >
              <span style={{
                display:"inline-flex",alignItems:"center",gap:5,borderRadius:"9999px",
                padding:"5px 13px",background:"rgba(0,0,0,0.65)",
                fontSize:9,fontWeight:500,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,0.75)",
              }}>
                <motion.svg style={{ width:11,height:11 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                  animate={{ x:[-3,3,-3] }} transition={{ duration:1.1,repeat:Infinity,ease:"easeInOut" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 12h8M8 17h8"/>
                </motion.svg>
                Drag to compare
              </span>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Shared dot indicators
// ─────────────────────────────────────────────────────────────
function Dots({ total, active, onDotClick }) {
  return (
    <div style={{ display:"flex", gap:8, alignItems:"center", justifyContent:"center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`Go to set ${i + 1}`}
          style={{
            width: i === active ? 24 : 7, height: 7, borderRadius:"9999px",
            background: i === active ? "#c19a6b" : "rgba(193,154,107,0.35)",
            border:"none", cursor:"pointer", padding:0,
            boxShadow: i === active ? "0 0 10px rgba(193,154,107,0.7)" : "none",
          }}
          animate={{ width: i === active ? 24 : 7, background: i === active ? "#c19a6b" : "rgba(193,154,107,0.35)" }}
          transition={{ duration:0.35, ease:[0.16,1,0.3,1] }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Shared progress bar
// ─────────────────────────────────────────────────────────────
function ProgressBar({ activeIndex }) {
  return (
    <div style={{ height:3, background:"rgba(193,154,107,0.15)", borderRadius:99, overflow:"hidden", marginTop:4 }}>
      <motion.div
        key={activeIndex}
        style={{ height:"100%", background:"linear-gradient(90deg,#c19a6b,#d4b08a)", transformOrigin:"left" }}
        initial={{ scaleX:0 }}
        animate={{ scaleX:1 }}
        transition={{ duration: INTERVAL / 1000, ease:"linear" }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────────────────────
export default function TransformationSection() {
  const sectionRef  = useRef(null)
  const isInView    = useInView(sectionRef, { once:true, margin:"-80px" })
  const [paused, setPaused] = useState(false)

  // Fixed: Card A always PAIRS[0], Card B always PAIRS[1] — no auto-rotation
  const idxA = 0
  const idxB = 1

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }
  const fadeUp = {
    hidden:  { opacity:0, y:50 },
    visible: { opacity:1, y:0, transition:{ duration:0.85, ease:[0.16,1,0.3,1] } },
  }
  const fadeIn = {
    hidden:  { opacity:0, scale:0.96 },
    visible: { opacity:1, scale:1,   transition:{ duration:0.9, ease:[0.16,1,0.3,1] } },
  }

  return (
    <section
      id="transformations"
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position:"relative",
        background:"transparent",
        padding:"100px 0 110px",
        overflow:"hidden",
      }}
    >
      {/* Ambient orbs */}
      <div aria-hidden="true" style={{
        position:"absolute",top:"-10%",left:"-8%",width:500,height:500,borderRadius:"9999px",
        background:"radial-gradient(circle,rgba(193,154,107,0.10) 0%,transparent 70%)",
        filter:"blur(40px)",pointerEvents:"none",
      }} />
      <div aria-hidden="true" style={{
        position:"absolute",bottom:"-10%",right:"-8%",width:600,height:600,borderRadius:"9999px",
        background:"radial-gradient(circle,rgba(193,154,107,0.08) 0%,transparent 70%)",
        filter:"blur(50px)",pointerEvents:"none",
      }} />
      {/* Diagonal texture */}
      <div aria-hidden="true" style={{
        position:"absolute",inset:0,opacity:0.025,pointerEvents:"none",
        backgroundImage:"repeating-linear-gradient(45deg,#c19a6b 0px,#c19a6b 1px,transparent 1px,transparent 60px)",
      }} />

      <motion.div
        style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* ── Header ── */}
        <motion.div variants={fadeUp} style={{ textAlign:"center", marginBottom:64 }}>
          <SectionBadge text="Treatment Transformations" delay={0.1} />

          <h2 style={{
            fontFamily:"'Nunito',system-ui,sans-serif",
            fontSize:"clamp(2rem,4.5vw,3rem)",fontWeight:700,
            color:"#1a0f0a",margin:"0 0 18px",lineHeight:1.15,
          }}>
            Visible results that{" "}
            <span style={{ color: "#1a0f0a" }}>
              reflect care
            </span>
          </h2>

          <p style={{
            fontFamily:"'Nunito',sans-serif",fontWeight:600,
            fontSize:"clamp(0.92rem,1.5vw,1.05rem)",color:"#1a0f0a",
            maxWidth:580,margin:"0 auto",lineHeight:1.75,letterSpacing:"0.015em",
          }}>
            Our before and after gallery showcases genuine patient transformations, highlighting advanced hair restoration treatments and jawline contouring procedures with natural, confidence-boosting results.
          </p>

          <motion.div
            style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginTop:28 }}
            initial={{ opacity:0,scaleX:0 }}
            animate={isInView ? { opacity:1,scaleX:1 } : {}}
            transition={{ duration:0.8,delay:0.35,ease:[0.16,1,0.3,1] }}
          >
            <div style={{ height:1,width:60,background:"linear-gradient(to right,transparent,#c19a6b)" }} />
            <div style={{ width:5,height:5,borderRadius:"9999px",background:"#c19a6b",boxShadow:"0 0 8px rgba(193,154,107,0.8)" }} />
            <div style={{ height:1,width:60,background:"linear-gradient(to left,transparent,#c19a6b)" }} />
          </motion.div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={fadeIn}
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
            gap:28,
            alignItems:"start",
          }}
        >
        {/* Card A — Hair Restoration (fixed) */}
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              <p style={{ fontFamily:"'Nunito',system-ui,sans-serif",fontSize:"1.05rem",fontWeight:600,color:"#1a0f0a",margin:0 }}>
                {PAIRS[idxA].label}
              </p>
            </div>
            <SliderCard pair={PAIRS[idxA]} />
          </div>

          {/* Card B — Jawline Contouring (fixed) */}
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              <p style={{ fontFamily:"'Nunito',system-ui,sans-serif",fontSize:"1.05rem",fontWeight:600,color:"#1a0f0a",margin:0 }}>
                {PAIRS[idxB].label}
              </p>
            </div>
            <SliderCard pair={PAIRS[idxB]} />
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={fadeUp}
          style={{
            marginTop:64,
            display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
            gap:1,background:"rgba(193,154,107,0.18)",borderRadius:16,
            border:"1px solid rgba(193,154,107,0.22)",overflow:"hidden",
          }}
        >
          {[
            { num:"94%",    label:"Satisfaction Rate"  },
            { num:"3,570+", label:"Patients Treated"   },
            { num:"8+",     label:"Months Experience"  },
            { num:"12+",    label:"Specialists & Doctors" },
          ].map((stat, i) => (
            <div key={i} style={{
              padding:"24px 20px",textAlign:"center",
              background: i % 2 === 0 ? "rgba(244,239,234,0.75)" : "rgba(252,238,231,0.75)",
            }}>
              <p style={{
                fontFamily:"'Nunito',system-ui,sans-serif",
                fontSize:"clamp(1.6rem,3vw,2.1rem)",fontWeight:600,
                background:"linear-gradient(135deg,#c19a6b,#a8825a)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                margin:"0 0 4px",
              }}>{stat.num}</p>
              <p style={{
                fontFamily:"'Nunito',sans-serif",fontWeight:700,
                fontSize:"0.88rem",letterSpacing:"0.1em",textTransform:"uppercase",
                color:"#1a0f0a",margin:0,
              }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  )
}
