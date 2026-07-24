import { useRef, useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import beforeImg from "../../assets/before.jpg"
import afterImg  from "../../assets/after.jpg"

export default function BeforeAfterSlider({ compact = false }) {
  const containerRef            = useRef(null)
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const [touched,  setTouched]  = useState(false)

  const toPercent = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return 50
    return Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 2), 98)
  }, [])

  const onPointerDown = useCallback((e) => {
    e.preventDefault()
    setDragging(true)
    setTouched(true)
    containerRef.current?.setPointerCapture(e.pointerId)
    setPosition(toPercent(e.clientX))
  }, [toPercent])

  const onPointerMove = useCallback((e) => {
    if (!dragging) return
    setPosition(toPercent(e.clientX))
  }, [dragging, toPercent])

  const onPointerUp = useCallback(() => setDragging(false), [])

  // Auto-hint sweep on mount — shows the user it's interactive
  useEffect(() => {
    if (touched) return
    const id = setTimeout(() => {
      const steps = [50, 40, 34, 42, 60, 66, 58, 50]
      let frame = 0
      const sweep = () => {
        if (frame >= steps.length) return
        setPosition(steps[frame++])
        setTimeout(sweep, 170)
      }
      sweep()
    }, 1500)
    return () => clearTimeout(id)
  }, [touched])

  return (
    <div className="relative select-none">

      {/* ── Premium outer glow border ── */}
      <div
        aria-hidden="true"
        style={{
          position:   "absolute",
          inset:      -1,
          borderRadius: 22,
          background: "linear-gradient(135deg, rgba(193,154,107,0.6) 0%, rgba(255,255,255,0.06) 45%, rgba(193,154,107,0.25) 100%)",
          zIndex:     0,
        }}
      />

      {/* ── Slider container ── */}
      <motion.div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{
          borderRadius: 20,
          aspectRatio:  compact ? "4 / 3" : "3 / 4",
          cursor:       dragging ? "grabbing" : "ew-resize",
          zIndex:       1,
          boxShadow:    "0 32px 64px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.3)",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        initial={{ opacity: 0, scale: 0.93, y: 28 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
      >

        {/* AFTER — full base layer */}
        <img
          src={afterImg}
          alt="After treatment"
          draggable={false}
          fetchPriority="high"
          decoding="async"
          style={{
            position:       "absolute",
            inset:          0,
            width:          "100%",
            height:         "100%",
            objectFit:      "cover",
            objectPosition: "top center",
            pointerEvents:  "none",
            userSelect:     "none",
          }}
        />

        {/* BEFORE — clipped left slice */}
        <div
          style={{
            position:     "absolute",
            inset:        0,
            overflow:     "hidden",
            width:        `${position}%`,
            pointerEvents:"none",
          }}
        >
          <img
            src={beforeImg}
            alt="Before treatment"
            draggable={false}
            fetchPriority="high"
            decoding="async"
            style={{
              position:       "absolute",
              inset:          0,
              width:          containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%",
              height:         "100%",
              maxWidth:       "none",
              objectFit:      "cover",
              objectPosition: "top center",
              userSelect:     "none",
            }}
          />
        </div>

        {/* Divider line — gradient fade top & bottom */}
        <div
          style={{
            position:   "absolute",
            inset:      "0 auto",
            left:       `${position}%`,
            width:      2,
            transform:  "translateX(-50%)",
            background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.95) 12%, rgba(255,255,255,0.95) 88%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Drag handle */}
        <motion.div
          style={{
            position:  "absolute",
            top:       "50%",
            left:      `${position}%`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex:    2,
          }}
          animate={{ scale: dragging ? 1.18 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          {/* Outer pulse ring */}
          <motion.div
            style={{
              position:     "absolute",
              inset:        -2,
              borderRadius: "9999px",
              border:       "1px solid rgba(193,154,107,0.5)",
            }}
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          {/* Handle circle */}
          <div style={{
            width:          44,
            height:         44,
            borderRadius:   "9999px",
            border:         "2px solid rgba(255,255,255,0.88)",
            background:     "rgba(0,0,0,0.65)",
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            justifyContent: "center",
            position:       "relative",
          }}>
            {/* Gold center dot */}
            <div style={{
              position:     "absolute",
              width:        8,
              height:       8,
              borderRadius: "9999px",
              background:   "#c19a6b",
              boxShadow:    "0 0 10px rgba(193,154,107,0.9)",
            }} />
            {/* Left chevron */}
            <svg style={{ position:"absolute", left:5, width:12, height:12, color:"rgba(255,255,255,0.88)" }} viewBox="0 0 20 20" fill="currentColor">
              <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/>
            </svg>
            {/* Right chevron */}
            <svg style={{ position:"absolute", right:5, width:12, height:12, color:"rgba(255,255,255,0.88)" }} viewBox="0 0 20 20" fill="currentColor">
              <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
            </svg>
          </div>
        </motion.div>

        {/* BEFORE label — top left */}
        <div style={{
          position:       "absolute",
          top:            12,
          left:           12,
          borderRadius:   "9999px",
          overflow:       "hidden",
          pointerEvents:  "none",
          zIndex:         2,
        }}>
          <div style={{
            display:        "flex",
            alignItems:     "center",
            gap:            6,
            padding:        "5px 12px",
            background:     "rgba(0,0,0,0.65)",
          }}>
            <div style={{ width:6, height:6, borderRadius:"9999px", background:"rgba(255,255,255,0.55)" }} />
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.85)" }}>
              Before
            </span>
          </div>
        </div>

        {/* AFTER label — top right */}
        <div style={{
          position:       "absolute",
          top:            12,
          right:          12,
          borderRadius:   "9999px",
          overflow:       "hidden",
          pointerEvents:  "none",
          zIndex:         2,
        }}>
          <div style={{
            display:        "flex",
            alignItems:     "center",
            gap:            6,
            padding:        "5px 12px",
            background:     "linear-gradient(135deg, rgba(193,154,107,0.95), rgba(168,130,90,1))",
          }}>
            <div style={{ width:6, height:6, borderRadius:"9999px", background:"rgba(255,255,255,0.75)" }} />
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#fff" }}>
              After
            </span>
          </div>
        </div>

        {/* Bottom info strip */}
        <div style={{
          position:       "absolute",
          bottom:         10,
          left:           10,
          right:          10,
          display:        "flex",
          alignItems:     "flex-end",
          justifyContent: "space-between",
          pointerEvents:  "none",
          zIndex:         2,
        }}>
          {/* Treatment info */}
          <div style={{
            borderRadius:   10,
            padding:        "7px 10px",
            background:     "rgba(0,0,0,0.65)",
          }}>
            <p style={{ fontSize:9,  fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(255,255,255,0.6)", margin:0 }}>
              Acne Treatment
            </p>
            <p style={{ fontSize:12, fontWeight:700, color:"#c19a6b", margin:0, lineHeight:1.3 }}>
              4-Week Results
            </p>
          </div>

          {/* Star rating */}
          <div style={{
            borderRadius:   10,
            padding:        "7px 10px",
            background:     "rgba(0,0,0,0.65)",
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "flex-end",
            gap:            3,
          }}>
            <div style={{ display:"flex", gap:2 }}>
              {[1,2,3,4,5].map(s => (
                <svg key={s} style={{ width:10, height:10, color:"#c19a6b" }} viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <span style={{ fontSize:9, fontWeight:500, color:"rgba(255,255,255,0.55)" }}>Verified</span>
          </div>
        </div>

        {/* Drag hint — fades away after first interaction */}
        <AnimatePresence>
          {!touched && (
            <motion.div
              style={{
                position:      "absolute",
                bottom:        60,
                left:          0,
                right:         0,
                display:       "flex",
                justifyContent:"center",
                pointerEvents: "none",
                zIndex:        3,
              }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <span style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            6,
                borderRadius:   "9999px",
                padding:        "6px 14px",
                background:     "rgba(0,0,0,0.65)",
                fontSize:       10,
                fontWeight:     500,
                letterSpacing:  "0.16em",
                textTransform:  "uppercase",
                color:          "rgba(255,255,255,0.78)",
              }}>
                <motion.svg
                  style={{ width:12, height:12 }}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                  animate={{ x: [-3, 3, -3] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                >
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
