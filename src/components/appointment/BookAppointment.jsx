import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import contactGirl from "../../assets/contactgirl.png"
import ArrowUpRight from "../ui/ArrowUpRight"
import TextReveal from "../ui/TextReveal"

const EASE = [0.25, 0.46, 0.45, 0.94]

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-40px" },
  transition:  { duration: 0.55, delay, ease: EASE },
})

/* â”€â”€â”€ Input field wrapper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
  "bg-white/[0.06] border-white/[0.12]",
].join(" ")

const errorCls = "border-red-400/60 focus:border-red-400 focus:ring-red-400/20"

/* â”€â”€â”€ Inline success banner â€” no fixed overlay, no body scroll lock â”€â”€ */
function SuccessBanner({ onReset }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-5 rounded-2xl py-10 px-6 text-center"
      style={{ border: "1px solid rgba(198,148,89,0.30)", background: "rgba(198,148,89,0.06)" }}
      initial={{ opacity: 0, scale: 0.95, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.34, 1.2, 0.64, 1] }}
    >
      {/* Check circle */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: "rgba(198,148,89,0.15)", border: "1.5px solid rgba(198,148,89,0.45)" }}>
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
          <motion.path
            d="M5 13l4 4L19 7"
            stroke="#C69459" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          />
        </svg>
      </div>

      <div>
        <h3 className="font-serif text-xl font-semibold text-white sm:text-2xl">
          Appointment Request Sent!
        </h3>
        <p className="mt-2 text-sm font-light leading-relaxed text-white/55">
          We received your request. Our team will call or WhatsApp you shortly to confirm your appointment.
        </p>
      </div>

      {/* Pulsing status dot */}
      <div className="flex items-center gap-2 rounded-full border border-novaderm-gold/20 px-4 py-2"
        style={{ background: "rgba(198,148,89,0.08)" }}>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-novaderm-gold opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-novaderm-gold" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-novaderm-gold">
          Request Confirmed
        </span>
      </div>

      <motion.button
        onClick={onReset}
        className="rounded-full px-6 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:text-white"
        style={{ border: "1px solid rgba(255,255,255,0.12)" }}
        whileHover={{ borderColor: "rgba(198,148,89,0.5)", color: "#fff" }}
        whileTap={{ scale: 0.97 }}
      >
        Book Another Appointment
      </motion.button>
    </motion.div>
  )
}

/* â”€â”€â”€ Validation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€ MAIN COMPONENT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function BookAppointment() {
  const EMPTY = { name: "", email: "", phone: "", date: "", message: "" }
  const [form,      setForm]      = useState(EMPTY)
  const [errors,    setErrors]    = useState({})
  const [submitted, setSubmitted] = useState(false)

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
    console.group("ðŸ“… New Appointment Booking")
    console.log("Full Name:    ", form.name)
    console.log("Email:        ", form.email)
    console.log("Phone:        ", form.phone  || "(not provided)")
    console.log("Date:         ", form.date)
    console.log("Message:      ", form.message || "(none)")
    console.log("Submitted at:", new Date().toLocaleString())
    console.groupEnd()
    setForm(EMPTY)
    setErrors({})
    setSubmitted(true)
  }

  const reset = () => setSubmitted(false)

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 lg:py-20"
      style={{ background: "#F4EFEA" }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(198,148,89,0.08) 0%, transparent 70%)" }} />
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
          {/* ambient glow — no blur filter */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(198,148,89,0.07) 0%, transparent 70%)" }} />

          <div className="grid items-end lg:grid-cols-[1fr_auto]">

            {/* â”€â”€ Form / success side â”€â”€ */}
            <div className="p-8 sm:p-10 lg:p-14">

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}>
                    <SuccessBanner onReset={reset} />
                  </motion.div>
                ) : (
                  <motion.div key="form"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}>

                    <TextReveal
                      as="h2"
                      className="mb-8 font-serif text-[2rem] font-semibold leading-[1.15] text-white sm:text-[2.4rem]"
                      delay={0}
                      stagger={65}
                    >
                      Reserve Your Appointment
                    </TextReveal>

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
                            <input
                              className={`${inputCls} ${errors.name ? errorCls : ""}`}
                              type="text" name="name" value={form.name}
                              onChange={handle} placeholder="Enter Full Name"
                            />
                          </Field>
                        </motion.div>

                        <motion.div {...fadeUp(0.14)}>
                          <Field label="Email Address:" error={errors.email}>
                            <input
                              className={`${inputCls} ${errors.email ? errorCls : ""}`}
                              type="email" name="email" value={form.email}
                              onChange={handle} placeholder="Enter Email Address *"
                            />
                          </Field>
                        </motion.div>

                        <motion.div {...fadeUp(0.18)}>
                          <Field label="Phone Number:" error={errors.phone}>
                            <input
                              className={`${inputCls} ${errors.phone ? errorCls : ""}`}
                              type="tel" name="phone" value={form.phone}
                              onChange={handle} placeholder="Enter Phone Number"
                            />
                          </Field>
                        </motion.div>

                        <motion.div {...fadeUp(0.22)}>
                          <Field label="Appointment Date:" error={errors.date}>
                            <input
                              className={`${inputCls} ${errors.date ? errorCls : ""}`}
                              type="date" name="date" value={form.date}
                              onChange={handle}
                              style={{ colorScheme: "dark" }}
                            />
                          </Field>
                        </motion.div>

                        <motion.div className="sm:col-span-2" {...fadeUp(0.26)}>
                          <Field label="Message">
                            <textarea
                              className={`${inputCls} resize-none`}
                              name="message" value={form.message}
                              onChange={handle} placeholder="Write your message here..."
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
                          Book Appointment
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </span>
                        </motion.button>
                      </motion.div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* â”€â”€ Doctor girl â”€â”€ */}
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
                className="w-auto select-none drop-shadow-2xl h-[200px] sm:h-[260px] lg:h-[480px] lg:max-h-[480px]"
                style={{ objectFit: "contain", objectPosition: "bottom" }}
                draggable={false}
                loading="lazy"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
