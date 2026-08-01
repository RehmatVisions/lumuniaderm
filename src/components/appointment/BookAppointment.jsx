 import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import ArrowUpRight from "../ui/ArrowUpRight"
import SectionBadge from "../ui/SectionBadge"

const EASE = [0.25, 0.46, 0.45, 0.94]
const EASE_EXPO = [0.16, 1, 0.3, 1]

/* ─── Google Sheets integration (unchanged) ─────────────────── */
const SHEET_URL = "https://script.google.com/macros/s/AKfycbw66bF_PPhFc4VTEHxbYpIC0qDEZK50BdasTnNUXmaMHPXQsVpMHkeNQDp91d2gry8/exec"

async function saveFormToSheet(form) {
  try {
    await fetch(SHEET_URL, {
      method: "POST", mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name || "",
        email: form.email || "",
        phone: form.phone || "",
        treatment: form.message ? form.message : "General Inquiry",
        appointmentDate: form.date || "",
        notes: form.notes || "",
        source: "Booking Form",
      }),
    })
  } catch (err) { console.error("Sheet save error:", err) }
}

/* ─── Validation (unchanged) ────────────────────────────────── */
function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = "Full name is required."
  if (!form.email.trim()) errors.email = "Email address is required."
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email."
  if (!form.phone.trim()) errors.phone = "Phone number is required."
  else if (!/^[+\d\s\-()]{7,}$/.test(form.phone)) errors.phone = "Enter a valid phone number."
  if (!form.message) errors.message = "Please select a treatment."
  if (!form.date) errors.date = "Please pick an appointment date."
  if (!form.notes.trim()) errors.notes = "Please enter a message or special request."
  return errors
}

/* ─── Leaf decoration ────────────────────────────────────────── */
function Leaf({ style }) {
  return (
    <svg viewBox="0 0 120 260" aria-hidden="true" style={{ pointerEvents: "none", ...style }}>
      <path d="M60 250 Q57 175 54 112 Q51 55 60 10" stroke="#C4614A" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {[200, 158, 120, 86].map((y, i) => (
        <g key={i}>
          <path d={`M${59 - i} ${y} Q${33 - i} ${y - 13} ${22 - i} ${y - 42} Q${40} ${y - 36} ${59 - i} ${y - 25}`} stroke="#C4614A" strokeWidth="0.9" fill="rgba(196,97,74,0.14)" strokeLinecap="round" />
          <path d={`M${61 + i} ${y - 5} Q${87 + i} ${y - 20} ${96 + i} ${y - 49} Q${78} ${y - 42} ${61 + i} ${y - 32}`} stroke="#C4614A" strokeWidth="0.9" fill="rgba(196,97,74,0.09)" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  )
}

/* ─── Input style ────────────────────────────────────────────── */
const inputStyle = {
  width: "100%", borderRadius: 10,
  border: "1.5px solid rgba(196,97,74,0.35)",
  padding: "11px 14px 11px 40px",
  fontSize: "0.88rem", color: "#1a0f08",
  background: "#fff",
  outline: "none",
  boxShadow: "none",
  fontFamily: "inherit",
  fontWeight: 500,
}
const labelStyle = {
  fontSize: "0.86rem", fontWeight: 700,
  color: "#1a0f08", marginBottom: 6, display: "block",
}

/* ─── Field wrapper ──────────────────────────────────────────── */
function Field({ label, icon, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: "relative" }}>
        <span style={{
          position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
          color: "rgba(196,97,74,0.65)", display: "flex",
        }}>
          {icon}
        </span>
        {children}
      </div>
      {error && (
        <span style={{ fontSize: "0.7rem", color: "#c0392b", marginTop: 2 }}>{error}</span>
      )}
    </div>
  )
}

/* ─── Mini Calendar ──────────────────────────────────────────── */
const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function MiniCalendar({ selectedDate, onChange }) {
  const today = new Date()
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() })

  const { year, month } = view
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const prevMonth = () => setView(v => {
    const m = v.month === 0 ? 11 : v.month - 1
    const y = v.month === 0 ? v.year - 1 : v.year
    return { year: y, month: m }
  })
  const nextMonth = () => setView(v => {
    const m = v.month === 11 ? 0 : v.month + 1
    const y = v.month === 11 ? v.year + 1 : v.year
    return { year: y, month: m }
  })

  const toISO = (d) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`
  const isSelected = (d) => d && selectedDate === toISO(d)
  const isToday = (d) => d && d === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  const isPast = (d) => {
    if (!d) return false
    const dt = new Date(year, month, d)
    dt.setHours(0, 0, 0, 0)
    const t = new Date(); t.setHours(0, 0, 0, 0)
    return dt < t
  }

  return (
    <div style={{ width: "100%" }}>
      {/* Month nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <button type="button" onClick={prevMonth}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#C4614A", padding: "4px 6px", fontSize: "1rem" }}>
          ‹
        </button>
        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1a0f08" }}>
          {MONTHS[month]} {year}
        </span>
        <button type="button" onClick={nextMonth}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#C4614A", padding: "4px 6px", fontSize: "1rem" }}>
          ›
        </button>
      </div>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 4 }}>
        {DAYS.map(d => (
          <div key={d} style={{
            textAlign: "center", fontSize: "0.6rem", fontWeight: 700,
            letterSpacing: "0.06em", color: "#C4614A", padding: "2px 0"
          }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
        {cells.map((d, i) => (
          <button key={i} type="button"
            disabled={!d || isPast(d)}
            onClick={() => d && !isPast(d) && onChange(toISO(d))}
            style={{
              textAlign: "center",
              fontSize: "0.82rem", fontWeight: isSelected(d) ? 700 : 600,
              padding: "6px 2px",
              borderRadius: 8,
              border: "none",
              cursor: d && !isPast(d) ? "pointer" : "default",
              background: isSelected(d) ? "#C4614A" : isToday(d) ? "rgba(196,97,74,0.12)" : "transparent",
              color: isSelected(d) ? "#fff" : isPast(d) ? "rgba(100,60,40,0.45)" : d ? "#1a0f08" : "transparent",
              transition: "background 0.15s",
            }}
          >
            {d ?? ""}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── Success banner (logic unchanged, styled new) ───────────── */
function SuccessBanner({ onReset }) {
  return (
    <motion.div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: 20, textAlign: "center", padding: "48px 24px",
    }}
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.34, 1.2, 0.64, 1] }}
    >
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        border: "2px solid rgba(196,97,74,0.45)",
        background: "rgba(196,97,74,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg viewBox="0 0 24 24" fill="none" width={28} height={28}>
          <motion.path d="M5 13l4 4L19 7" stroke="#C4614A" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }} />
        </svg>
      </div>
      <div>
        <h3 style={{ fontFamily: "'Nunito',system-ui,sans-serif", fontSize: "1.5rem", fontWeight: 800, fontStyle: "normal", color: "#1a0f0a", margin: "0 0 8px" }}>
          Appointment Request Sent!
        </h3>
        <p style={{ fontSize: "0.88rem", color: "#3d2416", lineHeight: 1.7, maxWidth: 340, margin: "0 auto" }}>
          We received your request. Our team will call or WhatsApp you shortly to confirm your appointment.
        </p>
      </div>
      <button type="button" onClick={onReset} style={{
        borderRadius: 999, padding: "10px 24px",
        border: "1.5px solid rgba(196,97,74,0.35)",
        background: "transparent", cursor: "pointer",
        fontSize: "0.8rem", fontWeight: 600, color: "#C4614A",
      }}>
        Book Another Appointment
      </button>
    </motion.div>
  )
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function BookAppointment() {
  const EMPTY = { name: "", email: "", phone: "", date: "", message: "", notes: "" }
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handle = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
  }

  const setDate = (iso) => {
    setForm(prev => ({ ...prev, date: iso }))
    if (errors.date) setErrors(prev => ({ ...prev, date: "" }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    saveFormToSheet(form)
    setForm(EMPTY)
    setErrors({})
    setSubmitted(true)
  }

  const TREATMENTS = [
    "Laser Hair Removal", "Advanced Facial Treatment",
    "Acne & Skin Renewal", "Anti-Aging Treatments",
    "Pigmentation Correction", "PRP Hair Restoration",
    "HydraGlow Facial", "Skin Brightening", "Other"
  ]

  return (
    <section id="contact" style={{
      position: "relative", overflow: "hidden", background: "transparent",
      padding: "clamp(56px,7vw,96px) 0"
    }}>

      {/* Leaf decorations */}
      <Leaf style={{ position: "absolute", top: 0, left: 0, width: "clamp(70px,9vw,130px)", opacity: 0.16 }} />
      <Leaf style={{ position: "absolute", top: 0, right: 0, width: "clamp(70px,9vw,130px)", opacity: 0.16, transform: "scaleX(-1)" }} />

      <div style={{ position: "relative", maxWidth: 1060, margin: "0 auto", padding: "0 clamp(16px,5vw,48px)" }}>

        {/* ── HEADER ────────────────────────────────────────── */}
        <motion.div style={{ textAlign: "center", marginBottom: "clamp(28px,4vw,44px)" }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE_EXPO }}>
          <SectionBadge text="Your Skin Journey Starts Here" className="mb-3" />
          <h2 style={{
            fontFamily: "'Nunito',system-ui,sans-serif",
            fontSize: "clamp(1.9rem,4.5vw,3rem)", fontWeight: 900, fontStyle: "normal",
            color: "#1a0f0a", lineHeight: 1.1, margin: "0 0 14px"
          }}>
            Book Your Consultation.
          </h2>
          <p style={{ fontSize: "clamp(0.82rem,1vw,0.93rem)", color: "#3d2416", lineHeight: 1.72, margin: 0 }}>
            Choose your treatment, preferred date, and time.<br />
            Our team will confirm your appointment shortly.
          </p>
        </motion.div>

        {/* ── FORM CARD ─────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="success"
              style={{
                background: "rgba(255,255,255,0.80)", borderRadius: 24,
                border: "1.5px solid rgba(196,97,74,0.18)"
              }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SuccessBanner onReset={() => setSubmitted(false)} />
            </motion.div>
          ) : (
            <motion.div key="form"
              style={{
                background: "rgba(255,255,255,0.80)", borderRadius: 24,
                border: "1.5px solid rgba(196,97,74,0.18)",
                padding: "clamp(24px,4vw,40px)"
              }}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE_EXPO }}
            >
              <form onSubmit={submit} noValidate>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px,2.5vw,28px)" }}
                  className="booking-grid">

                  {/* ── LEFT COLUMN ─ Your Details ── */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <h3 style={{
                      fontFamily: "'Nunito',system-ui,sans-serif",
                      fontSize: "1.1rem", fontStyle: "normal", fontWeight: 800,
                      color: "#1a0f0a", margin: "0 0 4px",
                      borderBottom: "2px solid rgba(196,97,74,0.20)", paddingBottom: 8
                    }}>
                      Your Details
                    </h3>

                    {/* Full Name */}
                    <Field label="Full Name *" error={errors.name}
                      icon={<svg viewBox="0 0 24 24" fill="none" width={15} height={15} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}>
                      <input type="text" name="name" value={form.name} onChange={handle}
                        placeholder="Enter your full name" required
                        style={{
                          ...inputStyle,
                          borderColor: errors.name
                            ? "#c0392b"
                            : "rgba(196,97,74,0.35)"
                        }} />
                    </Field>

                    {/* Email */}
                    <Field label="Email Address *" error={errors.email}
                      icon={<svg viewBox="0 0 24 24" fill="none" width={15} height={15} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>}>
                      <input type="email" name="email" value={form.email} onChange={handle}
                        placeholder="Enter your email address" required
                        style={{
                          ...inputStyle,
                          borderColor: errors.email
                            ? "#c0392b"
                            : "rgba(196,97,74,0.35)"
                        }} />
                    </Field>

                    {/* Phone */}
                    <Field label="Phone Number *" error={errors.phone}
                      icon={<svg viewBox="0 0 24 24" fill="none" width={15} height={15} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 012.09 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81l-1.27 1.27a16 16 0 006.29 6.29l1.27-1.27a12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>}>
                      <input type="tel" name="phone" value={form.phone} onChange={handle}
                        placeholder="Enter your phone number" required
                        style={{
                          ...inputStyle,
                          borderColor: errors.phone
                            ? "#c0392b"
                            : "rgba(196,97,74,0.35)"
                        }} />
                    </Field>

                    {/* Treatment */}
                    <Field label="Select Treatment *" error={errors.message}
                      icon={<svg viewBox="0 0 24 24" fill="none" width={15} height={15} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" /></svg>}>
                      <select name="message" value={form.message} onChange={handle}
                        required
                        style={{
                          ...inputStyle, appearance: "none",
                          paddingRight: 36, cursor: "pointer",
                          color: form.message ? "#3d2e24" : "rgba(61,46,36,0.45)",
                          borderColor: errors.message ? "#c0392b" : "rgba(196,97,74,0.35)"
                        }}>
                        <option value="">Choose a treatment</option>
                        {TREATMENTS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <span style={{
                        position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                        color: "rgba(196,97,74,0.65)", pointerEvents: "none"
                      }}>
                        <svg viewBox="0 0 20 20" fill="currentColor" width={14} height={14}>
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </Field>
                  </div>

                  {/* ── RIGHT COLUMN ─ Date & Time ── */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <h3 style={{
                      fontFamily: "'Nunito',system-ui,sans-serif",
                      fontSize: "1.1rem", fontStyle: "normal", fontWeight: 800,
                      color: "#1a0f0a", margin: "0 0 4px",
                      borderBottom: "2px solid rgba(196,97,74,0.20)", paddingBottom: 8
                    }}>
                      Choose a Date &amp; Time *
                    </h3>

                    {/* Calendar */}
                    <div style={{
                      border: "1.5px solid rgba(196,97,74,0.18)", borderRadius: 12,
                      padding: "12px 14px", background: "#fff"
                    }}>
                      <MiniCalendar selectedDate={form.date} onChange={setDate} />
                      {errors.date && <p style={{ fontSize: "0.7rem", color: "#c0392b", marginTop: 4 }}>{errors.date}</p>}
                    </div>
                  </div>
                </div>

                {/* ── NOTES row — spans full width ── */}
                <div style={{ marginTop: "clamp(14px,2vw,20px)" }}>
                  <label style={labelStyle}>Anything you'd like us to know? *</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 12, top: 12, color: "rgba(196,97,74,0.65)" }}>
                      <svg viewBox="0 0 24 24" fill="none" width={15} height={15} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                      </svg>
                    </span>
                    <textarea name="notes" value={form.notes} placeholder="Share any details or special requests..."
                      style={{
                        ...inputStyle, resize: "vertical", minHeight: 72, paddingTop: 10,
                        borderColor: errors.notes ? "#c0392b" : "rgba(196,97,74,0.35)"
                      }}
                      rows={3}
                      onChange={handle}
                      required
                    />
                  </div>
                  {errors.notes && (
                    <span style={{ display: "block", fontSize: "0.7rem", color: "#c0392b", marginTop: 6 }}>
                      {errors.notes}
                    </span>
                  )}
                </div>

                {/* ── SUBMIT ── */}
                <div style={{ marginTop: "clamp(14px,2vw,20px)", display: "flex", flexDirection: "column", alignItems: "stretch", gap: 10 }}>
                  <motion.button type="submit"
                    style={{
                      width: "100%", background: "#C4614A", borderRadius: 999,
                      padding: "14px 24px", border: "none", cursor: "pointer",
                      fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.16em",
                      textTransform: "uppercase", color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10
                    }}
                    whileHover={{ background: "#a0432e", scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                  >
                    Request Appointment
                    <svg viewBox="0 0 20 20" fill="currentColor" width={14} height={14}>
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                  <p style={{
                    textAlign: "center", fontSize: "0.78rem", color: "#2e1a10",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6
                  }}>
                    <svg viewBox="0 0 24 24" fill="none" width={13} height={13} stroke="#C4614A" strokeWidth="1.8" strokeLinecap="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    Your information is private and securely handled.
                  </p>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── TRUST BAR ─────────────────────────────────────── */}
        <motion.div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          flexWrap: "wrap", gap: 0, marginTop: "clamp(24px,3vw,36px)"
        }}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          {[
            {
              icon: <svg viewBox="0 0 24 24" fill="none" width={22} height={22} stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><path d="M9 16l2 2 4-4" /></svg>,
              label: "Quick Confirmation",
            },
            {
              icon: <svg viewBox="0 0 24 24" fill="none" width={22} height={22} stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
              label: "Personalized Consultation",
            },
            {
              icon: <svg viewBox="0 0 24 24" fill="none" width={22} height={22} stroke="#C4614A" strokeWidth="1.7" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
              label: "No Obligation",
            },
          ].map((item, i, arr) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "0 clamp(20px,3vw,44px)"
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  border: "1.5px solid rgba(196,97,74,0.25)",
                  background: "rgba(196,97,74,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: "clamp(0.84rem,1vw,0.94rem)", fontWeight: 700, color: "#1a0f0a", whiteSpace: "nowrap" }}>
                  {item.label}
                </span>
              </div>
              {i < arr.length - 1 && <div style={{ width: 1, height: 28, background: "rgba(196,97,74,0.20)", flexShrink: 0 }} />}
            </div>
          ))}
        </motion.div>

      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 700px) {
          .booking-grid { grid-template-columns: 1fr !important; }
        }
        .booking-grid input,
        .booking-grid textarea,
        .booking-grid select {
          color: #1a0f08 !important;
          font-weight: 500 !important;
        }
        .booking-grid input::placeholder,
        .booking-grid textarea::placeholder {
          color: #7a5040 !important;
          font-weight: 400 !important;
        }
        .booking-grid select option { color: #1a0f08; }
        .booking-grid label { color: #1a0f08 !important; font-weight: 700 !important; }
        
        
      `}</style>
    </section>
  )
}