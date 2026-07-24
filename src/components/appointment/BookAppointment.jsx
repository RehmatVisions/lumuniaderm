import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import contactGirl from "../../assets/contactgirl.png"
import ArrowUpRight from "../ui/ArrowUpRight"

const EASE = [0.25, 0.46, 0.45, 0.94]

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-40px" },
  transition:  { duration: 0.55, delay, ease: EASE },
})

/* ─── Input field wrapper ────────────────────────────────────── */
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-white">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            className="text-[11px] font-medium text-red-400"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputCls = [
  "w-full rounded-xl border px-4 py-3 text-sm text-white placeholder-white/30",
  "outline-none transition-all duration-200",
  "focus:border-[#C69459] focus:ring-2 focus:ring-[#C69459]/20",
  "bg-white/[0.06] border-white/[0.12] backdrop-blur-sm",
].join(" ")

const errorCls = "border-red-400/60 focus:border-red-400 focus:ring-red-400/20"

/* ─── Check icon with draw animation ───────────────────────── */
function AnimatedCheck() {
  return (
    <svg viewBox="0 0 52 52" className="h-12 w-12" fill="none">
      <motion.circle
        cx="26" cy="26" r="24"
        stroke="#C69459" strokeWidth="2.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      />
      <motion.path
        d="M14 26l9 9 15-16"
        stroke="#C69459" strokeWidth="2.8"
        strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, delay: 0.4, ease: "easeOut" }}
      />
    </svg>
  )
}

/* ─── Confetti particle ─────────────────────────────────────── */
function Particle({ i }) {
  const colors = ["#C69459", "#d4b08a", "#ffffff", "#a8825a", "#e8c98a"]
  const x      = (Math.random() - 0.5) * 300
  const y      = (Math.random() - 0.5) * 300
  const rotate = Math.random() * 720 - 360
  const size   = 4 + Math.random() * 6
  const delay  = Math.random() * 0.3

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 rounded-sm"
      style={{
        width:       size,
        height:      size,
        background:  colors[i % colors.length],
        transformOrigin: "center",
      }}
      initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{ x, y, opacity: 0, rotate, scale: 0.5 }}
      transition={{ duration: 0.9 + Math.random() * 0.5, delay, ease: "easeOut" }}
    />
  )
}

/* ─── Success modal popup ────────────────────────────────────── */
function SuccessModal({ visible, onClose }) {
  // Auto-close after 4s
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [visible, onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (visible) document.body.style.overflow = "hidden"
    else         document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center px-4"
            style={{ background: "rgba(5,4,3,0.75)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          >
            {/* Modal card */}
            <motion.div
              className="relative w-full max-w-sm overflow-hidden rounded-3xl p-8 text-center"
              style={{
                background:   "linear-gradient(145deg, #1e1c17 0%, #282A23 100%)",
                border:       "1px solid rgba(198,148,89,0.30)",
                boxShadow:    "0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(198,148,89,0.10)",
              }}
              initial={{ opacity: 0, scale: 0.75, y: 40 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{   opacity: 0, scale: 0.85,  y: 20 }}
              transition={{ duration: 0.45, ease: [0.34, 1.4, 0.64, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Confetti burst */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {Array.from({ length: 18 }).map((_, i) => (
                  <Particle key={i} i={i} />
                ))}
              </div>

              {/* Ambient glow */}
              <div
                className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                style={{ background: "rgba(198,148,89,0.18)" }}
              />

              {/* Icon with ripple rings */}
              <div className="relative mb-6 flex items-center justify-center">
                {/* Ripple rings */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-novaderm-gold/25"
                    style={{ width: 56 + i * 24, height: 56 + i * 24 }}
                    initial={{ opacity: 0.6, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 1.5 }}
                    transition={{
                      duration: 1.4,
                      delay:    0.3 + i * 0.22,
                      repeat:   Infinity,
                      ease:     "easeOut",
                    }}
                  />
                ))}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ background: "rgba(198,148,89,0.12)", border: "1px solid rgba(198,148,89,0.35)" }}>
                  <AnimatedCheck />
                </div>
              </div>

              {/* Text */}
              <motion.h3
                className="mb-2 font-serif text-2xl font-semibold text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.35 }}
              >
                Appointment Booked!
              </motion.h3>

              <motion.p
                className="mb-6 text-sm font-light leading-relaxed text-white/55"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.45 }}
              >
                Your request has been received. Our team will confirm your appointment shortly via email or phone.
              </motion.p>

              {/* Notification badge row */}
              <motion.div
                className="mb-6 flex items-center justify-center gap-3 rounded-xl border border-novaderm-gold/20 bg-novaderm-gold/8 px-4 py-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.55, type: "spring", bounce: 0.3 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-novaderm-gold opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-novaderm-gold" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-novaderm-gold">
                  Message Sent Successfully
                </span>
              </motion.div>

              {/* Progress bar — counts down to auto-close */}
              <div className="mb-5 h-0.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-novaderm-gold"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 4, ease: "linear" }}
                />
              </div>

              {/* Close button */}
              <motion.button
                onClick={onClose}
                className="w-full rounded-full py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-novaderm-gold"
                style={{ background: "rgba(198,148,89,0.18)", border: "1px solid rgba(198,148,89,0.30)" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                Done
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ─── Validation ─────────────────────────────────────────────── */
function validate(form) {
  const errors = {}
  if (!form.name.trim())
    errors.name = "Full name is required."
  if (!form.email.trim())
    errors.email = "Email address is required."
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address."
  if (form.phone && !/^[+\d\s\-()]{7,}$/.test(form.phone))
    errors.phone = "Enter a valid phone number."
  if (!form.date)
    errors.date = "Please pick an appointment date."
  return errors
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function BookAppointment() {
  const EMPTY = { name: "", email: "", phone: "", date: "", message: "" }
  const [form,   setForm]   = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [popup,  setPopup]  = useState(false)

  const handle = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    console.group("📅 New Appointment Booking")
    console.log("Full Name:    ", form.name)
    console.log("Email:        ", form.email)
    console.log("Phone:        ", form.phone  || "(not provided)")
    console.log("Date:         ", form.date)
    console.log("Message:      ", form.message || "(none)")
    console.log("Submitted at:", new Date().toLocaleString())
    console.groupEnd()
    setForm(EMPTY)
    setErrors({})
    setPopup(true)
  }

  return (
    <>
      <SuccessModal visible={popup} onClose={() => setPopup(false)} />

      <section
        id="contact"
        className="relative overflow-hidden py-16 lg:py-20"
        style={{ background: "#F4EFEA" }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full blur-[100px]"
            style={{ background: "rgba(198,148,89,0.08)" }} />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
          <motion.div
            className="relative overflow-hidden rounded-[2rem]"
            style={{ background: "#282A23" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            {/* ambient glow */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full blur-3xl"
              style={{ background: "rgba(198,148,89,0.07)" }} />

            <div className="grid items-end lg:grid-cols-[1fr_auto]">

              {/* ── Form side ── */}
              <div className="p-8 sm:p-10 lg:p-14">

                <motion.h2
                  className="mb-8 font-serif text-[2rem] font-semibold leading-[1.15] text-white sm:text-[2.4rem]"
                  {...fadeUp(0.05)}
                >
                  Reserve Your Appointment
                </motion.h2>

                <motion.div
                  className="mb-8 h-px"
                  style={{ background: "linear-gradient(to right, rgba(198,148,89,0.55), transparent)" }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                />

                <form onSubmit={submit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">

                    <motion.div {...fadeUp(0.10)}>
                      <Field label="Full Name:" error={errors.name}>
                        <motion.input
                          className={`${inputCls} ${errors.name ? errorCls : ""}`}
                          type="text" name="name" value={form.name}
                          onChange={handle} placeholder="Enter Full Name"
                          whileFocus={{ scale: 1.01 }}
                          transition={{ duration: 0.15 }}
                        />
                      </Field>
                    </motion.div>

                    <motion.div {...fadeUp(0.14)}>
                      <Field label="Email Address:" error={errors.email}>
                        <motion.input
                          className={`${inputCls} ${errors.email ? errorCls : ""}`}
                          type="email" name="email" value={form.email}
                          onChange={handle} placeholder="Enter Email Address *"
                          whileFocus={{ scale: 1.01 }}
                          transition={{ duration: 0.15 }}
                        />
                      </Field>
                    </motion.div>

                    <motion.div {...fadeUp(0.18)}>
                      <Field label="Phone Number:" error={errors.phone}>
                        <motion.input
                          className={`${inputCls} ${errors.phone ? errorCls : ""}`}
                          type="tel" name="phone" value={form.phone}
                          onChange={handle} placeholder="Enter Phone Number"
                          whileFocus={{ scale: 1.01 }}
                          transition={{ duration: 0.15 }}
                        />
                      </Field>
                    </motion.div>

                    <motion.div {...fadeUp(0.22)}>
                      <Field label="Appointment Date:" error={errors.date}>
                        <motion.input
                          className={`${inputCls} ${errors.date ? errorCls : ""}`}
                          type="date" name="date" value={form.date}
                          onChange={handle}
                          style={{ colorScheme: "dark" }}
                          whileFocus={{ scale: 1.01 }}
                          transition={{ duration: 0.15 }}
                        />
                      </Field>
                    </motion.div>

                    <motion.div className="sm:col-span-2" {...fadeUp(0.26)}>
                      <Field label="Message">
                        <textarea
                          className={`${inputCls} resize-none`}
                          name="message" value={form.message}
                          onChange={handle} placeholder="Write Message Here......"
                          rows={4}
                        />
                      </Field>
                    </motion.div>
                  </div>

                  <motion.div className="mt-7" {...fadeUp(0.30)}>
                    <motion.button
                      type="submit"
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-lg"
                      style={{ background: "linear-gradient(135deg, #C69459 0%, #a8825a 100%)" }}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 32px rgba(198,148,89,0.45)" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {/* shimmer sweep */}
                      <motion.span
                        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/15"
                        whileHover={{ translateX: "200%" }}
                        transition={{ duration: 0.45 }}
                      />
                      Book Appointment
                      <motion.span
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25"
                        whileHover={{ rotate: 45, borderColor: "rgba(255,255,255,0.6)" }}
                        transition={{ duration: 0.25 }}
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </motion.span>
                    </motion.button>
                  </motion.div>
                </form>
              </div>

              {/* ── Doctor girl — visible on all screens, adapts size ── */}
              <motion.div
                className="flex items-end justify-center self-end overflow-hidden lg:justify-end"
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
              >
                <img
                  src={contactGirl}
                  alt="Novaderm Specialist"
                  className="w-auto select-none drop-shadow-2xl
                    h-[200px]
                    sm:h-[260px]
                    lg:h-[480px] lg:max-h-[480px]"
                  style={{ objectFit: "contain", objectPosition: "bottom" }}
                  draggable={false}
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
