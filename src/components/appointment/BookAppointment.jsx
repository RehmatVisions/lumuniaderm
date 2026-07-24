import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import contactGirl from "../../assets/contactgirl.png"
import ArrowUpRight from "../ui/ArrowUpRight"

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-40px" },
  transition:  { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

/* ─── Input field wrapper ────────────────────────────────────── */
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-white">{label}</label>
      {children}
      {error && (
        <span className="text-[11px] font-medium text-red-400">{error}</span>
      )}
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

/* ─── Success popup ──────────────────────────────────────────── */
function SuccessPopup({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-8 right-8 z-[200] flex items-center gap-3 rounded-2xl px-6 py-4 shadow-2xl"
          style={{ background: "#282A23", border: "1px solid rgba(198,148,89,0.40)" }}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0,  scale: 1   }}
          exit={{   opacity: 0, y: 20,  scale: 0.95 }}
          transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* green check */}
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
            style={{ background: "rgba(198,148,89,0.18)" }}>
            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" style={{ color: "#C69459" }}>
              <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-bold text-white">Appointment Booked!</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.50)" }}>
              We'll confirm your booking shortly.
            </p>
          </div>
        </motion.div>
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
    // clear individual error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    // ── Log to console ──────────────────────────────────────────
    console.group("📅 New Appointment Booking")
    console.log("Full Name:    ", form.name)
    console.log("Email:        ", form.email)
    console.log("Phone:        ", form.phone  || "(not provided)")
    console.log("Date:         ", form.date)
    console.log("Message:      ", form.message || "(none)")
    console.log("Submitted at:", new Date().toLocaleString())
    console.groupEnd()

    // Reset + show popup
    setForm(EMPTY)
    setErrors({})
    setPopup(true)
    setTimeout(() => setPopup(false), 4000)
  }

  return (
    <>
      <SuccessPopup visible={popup} />

      <section id="contact" className="relative overflow-hidden py-16 lg:py-20"
        style={{ background: "#F4EFEA" }}>

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
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* inner ambient glow */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full blur-3xl"
              style={{ background: "rgba(198,148,89,0.07)" }} />

            <div className="grid items-end lg:grid-cols-[1fr_auto]">

              {/* ── Form side ── */}
              <div className="p-8 sm:p-10 lg:p-14">

                <motion.h2
                  className="mb-8 font-serif text-[2rem] font-semibold leading-[1.15] text-white sm:text-[2.4rem]"
                  {...fadeUp(0.05)}
                >
                  Book An Appointment
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
                          onChange={handle} placeholder="Write Message Here......"
                          rows={4}
                        />
                      </Field>
                    </motion.div>

                  </div>

                  <motion.div className="mt-7" {...fadeUp(0.30)}>
                    <motion.button
                      type="submit"
                      className="group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-lg"
                      style={{ background: "linear-gradient(135deg, #C69459 0%, #a8825a 100%)" }}
                      whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(198,148,89,0.40)" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Book Appointment
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 transition-all duration-300 group-hover:rotate-45 group-hover:border-white/60">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </motion.button>
                  </motion.div>
                </form>
              </div>

              {/* ── Doctor girl ── */}
              <motion.div
                className="hidden lg:flex items-end justify-end self-end"
                style={{ width: 340, minHeight: 420 }}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <img
                  src={contactGirl}
                  alt="Specialist"
                  className="w-full max-h-[480px] object-contain object-bottom select-none drop-shadow-2xl"
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
