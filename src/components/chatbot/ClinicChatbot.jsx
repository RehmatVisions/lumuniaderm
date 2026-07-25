import { useState, useRef, useEffect, useCallback } from "react";
import { jsPDF } from "jspdf";
import "./ClinicChatbot.css";
import {
  X, Send, MessageCircle, ChevronDown, Download,
  CheckCircle, Sparkles, Phone, Calendar, User, Mail,
  Clock, MapPin, Stethoscope
} from "lucide-react";
import { clinicKnowledge, quickReplies, treatmentOptions } from "./clinicData";

// ─── helpers ────────────────────────────────────────────────────────────────

function generateBookingId() {
  return "#ND-" + Math.floor(1000 + Math.random() * 9000);
}

function formatTime(date) {
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function matchKnowledge(input) {
  const text = input.toLowerCase().trim();
  let bestMatch = null;
  let bestScore = 0;
  for (const entry of clinicKnowledge) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (text.includes(kw.toLowerCase())) {
        score += kw.split(" ").length > 1 ? 3 : 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }
  return bestScore > 0 ? bestMatch : null;
}

const FALLBACK =
  "I'm not sure about that one, but our team would love to help! You can reach us on WhatsApp at +92 300 1234567, or I can help you book a consultation with our dermatologist. Would you like to try one of the popular topics below?";

// ─── booking flow steps ──────────────────────────────────────────────────────

const BOOKING_STEPS = [
  {
    key: "name",
    prompt: "Let's get you booked in! 😊 First, could I have your **full name** please?",
    icon: <User size={14} />,
    placeholder: "e.g. Sara Ahmed",
    validate: (v) => v.trim().length >= 2 ? null : "Please enter your full name.",
  },
  {
    key: "email",
    prompt: "Perfect! What's your **email address**?",
    icon: <Mail size={14} />,
    placeholder: "e.g. sara@email.com",
    validate: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : "Please enter a valid email.",
  },
  {
    key: "phone",
    prompt: "Got it! And your **phone number** (WhatsApp preferred)?",
    icon: <Phone size={14} />,
    placeholder: "e.g. 0300 1234567",
    validate: (v) =>
      /^[\d\s\+\-]{7,15}$/.test(v.trim()) ? null : "Please enter a valid phone number.",
  },
  {
    key: "treatment",
    prompt: "Which **treatment** are you interested in?",
    icon: <Stethoscope size={14} />,
    placeholder: "Select a treatment",
    type: "select",
    validate: (v) => v ? null : "Please select a treatment.",
  },
  {
    key: "datetime",
    prompt: "Almost done! What's your **preferred date and time window**? (e.g. 'Mon–Wed, afternoon' or a specific date)",
    icon: <Calendar size={14} />,
    placeholder: "e.g. Tuesday after 4 PM",
    validate: (v) => v.trim().length >= 3 ? null : "Please enter a preferred time.",
  },
];

// ─── PDF generator ───────────────────────────────────────────────────────────

function generatePDF(bookingData, messages) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pw = doc.internal.pageSize.getWidth();
  const margin = 18;
  let y = 0;

  // header bar
  doc.setFillColor(10, 10, 20);
  doc.rect(0, 0, pw, 38, "F");

  doc.setTextColor(212, 175, 95);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("NovaDerm", margin, 16);

  doc.setFontSize(8);
  doc.setTextColor(180, 160, 120);
  doc.setFont("helvetica", "normal");
  doc.text("Aesthetic & Dermatology Clinic", margin, 22);
  doc.text("2nd Floor, The Galleria, Main Blvd Gulberg III, Lahore", margin, 27);
  doc.text("hello@novaderm.pk  |  +92 300 1234567", margin, 32);

  // gold rule
  doc.setDrawColor(212, 175, 95);
  doc.setLineWidth(0.5);
  doc.line(margin, 40, pw - margin, 40);
  y = 48;

  // booking pass title
  doc.setTextColor(10, 10, 20);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("APPOINTMENT PASS", margin, y);
  y += 7;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 90);
  doc.text(`Booking ID: ${bookingData.bookingId}`, margin, y);
  doc.text(
    `Issued: ${new Date(bookingData.timestamp).toLocaleString("en-PK")}`,
    pw - margin,
    y,
    { align: "right" }
  );
  y += 10;

  // details box
  doc.setFillColor(249, 248, 245);
  doc.roundedRect(margin, y, pw - margin * 2, 52, 3, 3, "F");
  doc.setDrawColor(212, 175, 95);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, pw - margin * 2, 52, 3, 3, "S");

  const labelX = margin + 5;
  const valueX = margin + 55;
  const rowH = 9;
  let ry = y + 9;

  const fields = [
    ["Patient Name", bookingData.name],
    ["Email Address", bookingData.email],
    ["Phone / WhatsApp", bookingData.phone],
    ["Selected Treatment", bookingData.treatment],
    ["Preferred Date & Time", bookingData.datetime],
  ];

  doc.setFontSize(8.5);
  for (const [label, value] of fields) {
    doc.setTextColor(110, 100, 90);
    doc.setFont("helvetica", "bold");
    doc.text(label + ":", labelX, ry);
    doc.setTextColor(20, 20, 30);
    doc.setFont("helvetica", "normal");
    doc.text(String(value || "—"), valueX, ry);
    ry += rowH;
  }
  y += 58;

  // reception note
  doc.setFillColor(255, 250, 235);
  doc.setDrawColor(212, 175, 95);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, pw - margin * 2, 12, 2, 2, "FD");
  doc.setFontSize(8);
  doc.setTextColor(140, 100, 20);
  doc.setFont("helvetica", "bolditalic");
  doc.text(
    "📋  Please present this pass at reception upon arrival.",
    margin + 5,
    y + 8
  );
  y += 20;

  // transcript
  doc.setDrawColor(200, 195, 185);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pw - margin, y);
  y += 7;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(10, 10, 20);
  doc.text("Chat Transcript", margin, y);
  y += 8;

  doc.setFontSize(7.5);
  for (const msg of messages) {
    if (msg.type === "system") continue;
    const isBot = msg.type === "bot";
    const speaker = isBot ? "Dr. Assistant" : "You";
    const lineColor = isBot ? [50, 50, 80] : [80, 50, 20];
    const time = formatTime(new Date(msg.ts));

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...lineColor);
    doc.text(`${speaker}  [${time}]`, margin, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 50);
    const lines = doc.splitTextToSize(msg.text, pw - margin * 2 - 4);
    for (const line of lines) {
      if (y > 275) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin + 4, y);
      y += 5;
    }
    y += 3;
  }

  // footer
  const pages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFillColor(10, 10, 20);
    doc.rect(0, 287, pw, 10, "F");
    doc.setFontSize(7);
    doc.setTextColor(150, 130, 90);
    doc.setFont("helvetica", "normal");
    doc.text("NovaDerm Aesthetic & Dermatology Clinic  |  novaderm.pk", margin, 293);
    doc.text(`Page ${i} of ${pages}`, pw - margin, 293, { align: "right" });
  }

  doc.save(`NovaDerm-Pass-${bookingData.bookingId.replace("#", "")}.pdf`);
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function Bubble({ msg }) {
  const isBot = msg.type === "bot";
  const isSystem = msg.type === "system";

  if (isSystem) {
    return (
      <div className="nd-chat-system">
        <span>{msg.text}</span>
      </div>
    );
  }

  return (
    <div className={`nd-bubble-row ${isBot ? "nd-bot-row" : "nd-user-row"}`}>
      {isBot && (
        <div className="nd-avatar">
          <Sparkles size={12} />
        </div>
      )}
      <div className={`nd-bubble ${isBot ? "nd-bubble-bot" : "nd-bubble-user"}`}>
        <span
          dangerouslySetInnerHTML={{
            __html: msg.text
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/\n/g, "<br/>"),
          }}
        />
        <span className="nd-ts">{formatTime(new Date(msg.ts))}</span>
      </div>
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="nd-bubble-row nd-bot-row">
      <div className="nd-avatar"><Sparkles size={12} /></div>
      <div className="nd-bubble nd-bubble-bot nd-typing">
        <span /><span /><span />
      </div>
    </div>
  );
}

// ─── Booking success card ─────────────────────────────────────────────────────

function BookingSuccess({ data, messages, onDownload }) {
  return (
    <div className="nd-success-card">
      <div className="nd-success-icon">
        <CheckCircle size={32} />
      </div>
      <h3>Booking Confirmed!</h3>
      <p className="nd-success-id">{data.bookingId}</p>
      <div className="nd-success-details">
        <div><User size={13} /><span>{data.name}</span></div>
        <div><Stethoscope size={13} /><span>{data.treatment}</span></div>
        <div><Clock size={13} /><span>{data.datetime}</span></div>
        <div><MapPin size={13} /><span>NovaDerm, Gulberg III, Lahore</span></div>
      </div>
      <p className="nd-success-note">
        We'll confirm your slot via WhatsApp within 1–2 hours. See you soon! 🌟
      </p>
      <button className="nd-download-btn" onClick={() => onDownload(data, messages)}>
        <Download size={15} />
        Download Appointment Pass & Transcript
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ClinicChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Welcome to **NovaDerm** 👋\n\nI'm your virtual skin consultant. Ask me about any of our treatments, pricing, or how to book — I'm here to help!",
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const [interactionCount, setInteractionCount] = useState(0);
  const [nudgeSent, setNudgeSent] = useState(false);

  // booking state
  const [bookingMode, setBookingMode] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingData, setBookingData] = useState({});
  const [bookingDone, setBookingDone] = useState(false);
  const [completedBooking, setCompletedBooking] = useState(null);

  // select input for treatment step
  const [selectValue, setSelectValue] = useState("");

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const msgIdRef = useRef(100);

  const nextId = () => ++msgIdRef.current;

  // scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, bookingDone]);

  // focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setUnread(0);
    }
  }, [isOpen]);

  const pushMessage = useCallback((type, text) => {
    const msg = { id: nextId(), type, text, ts: Date.now() };
    setMessages((prev) => [...prev, msg]);
    return msg;
  }, []);

  const botReply = useCallback(
    (text, delay = 900) => {
      setIsTyping(true);
      return new Promise((resolve) => {
        setTimeout(() => {
          setIsTyping(false);
          const msg = pushMessage("bot", text);
          resolve(msg);
        }, delay);
      });
    },
    [pushMessage]
  );

  // ── booking flow handler ──────────────────────────────────────────────────

  const advanceBooking = useCallback(
    async (value) => {
      const step = BOOKING_STEPS[bookingStep];
      const err = step.validate(value);
      if (err) {
        await botReply(`⚠️ ${err} Please try again.`, 400);
        return;
      }

      const updated = { ...bookingData, [step.key]: value };
      setBookingData(updated);
      setSelectValue("");

      if (bookingStep < BOOKING_STEPS.length - 1) {
        setBookingStep((s) => s + 1);
        const next = BOOKING_STEPS[bookingStep + 1];
        await botReply(next.prompt, 700);
      } else {
        // booking complete
        const booking = {
          ...updated,
          bookingId: generateBookingId(),
          timestamp: new Date().toISOString(),
        };
        setCompletedBooking(booking);
        setBookingMode(false);
        setBookingDone(true);
      }
    },
    [bookingStep, bookingData, botReply]
  );

  // ── knowledge base handler ────────────────────────────────────────────────

  const handleUserMessage = useCallback(
    async (text) => {
      if (!text.trim()) return;
      pushMessage("user", text);
      setInput("");

      const newCount = interactionCount + 1;
      setInteractionCount(newCount);

      const lower = text.toLowerCase();
      const wantsBook =
        lower.includes("book") ||
        lower.includes("appointment") ||
        lower.includes("schedule") ||
        lower.includes("reserve") ||
        lower.includes("yes") && nudgeSent;

      if (wantsBook) {
        setBookingMode(true);
        setBookingStep(0);
        setBookingData({});
        await botReply(BOOKING_STEPS[0].prompt, 700);
        return;
      }

      const match = matchKnowledge(text);
      await botReply(match ? match.answer : FALLBACK);

      // smart booking nudge after 2–3 interactions
      if (newCount >= 2 && !nudgeSent && !bookingMode) {
        setNudgeSent(true);
        await botReply(
          "By the way — would you like me to **reserve a priority consultation spot** for you with our senior dermatologist? It only takes a minute! 😊",
          1800
        );
      }
    },
    [pushMessage, botReply, interactionCount, nudgeSent, bookingMode]
  );

  // ── submit handler ────────────────────────────────────────────────────────

  const handleSubmit = (e) => {
    e?.preventDefault();
    const val = bookingMode && BOOKING_STEPS[bookingStep].type === "select"
      ? selectValue
      : input.trim();
    if (!val) return;
    if (bookingMode) {
      pushMessage("user", val);
      setInput("");
      advanceBooking(val);
    } else {
      handleUserMessage(val);
    }
  };

  const handleQuickReply = (query) => {
    if (query === "book") {
      handleUserMessage("I'd like to book an appointment");
    } else {
      handleUserMessage(query);
    }
  };

  const currentStep = bookingMode ? BOOKING_STEPS[bookingStep] : null;
  const isSelectStep = bookingMode && currentStep?.type === "select";

  // ── render ────────────────────────────────────────────────────────────────

  return (
    /*
     * PLACEMENT: Render <ClinicChatbot /> as the very last child of your root
     * wrapper in App.jsx / page.jsx — outside any element that has
     * position:relative, z-index, transform, will-change, or filter set on it.
     * This guarantees the fixed container below always paints on top of every
     * section (headers, hero, sticky navbars, footers, modals, etc.).
     *
     * Correct placement example:
     *   <div className="min-h-screen">
     *     <Header />
     *     <main>...</main>
     *     <Footer />
     *   </div>
     *   <ClinicChatbot />   ← right here, after the wrapper div closes
     */

    /* ── outermost container: fixed, always on top, never clips children ── */
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        zIndex: 999999,
        pointerEvents: "none",   /* container is transparent to mouse events… */
        width: 0,
        height: 0,
        overflow: "visible",
      }}
      aria-live="polite"
    >
      {/* ── floating trigger button ── */}
      <button
        className="nd-trigger"
        style={{ pointerEvents: "auto" }}
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <div className="nd-trigger-pulse" />
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
        {!isOpen && unread > 0 && (
          <span className="nd-badge">{unread}</span>
        )}
      </button>

      {/* ── chat window ── */}
      <div
        className={`nd-window ${isOpen ? "nd-window-open" : ""}`}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        {/* header */}
        <div className="nd-header">
          <div className="nd-header-avatar">
            <Stethoscope size={16} />
            <span className="nd-online-dot" />
          </div>
          <div className="nd-header-info">
            <p className="nd-header-name">Dr. Assistant</p>
            <p className="nd-header-status">
              <span className="nd-status-dot" />
              Online · NovaDerm Clinic
            </p>
          </div>
          <button
            className="nd-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* messages */}
        <div className="nd-messages">
          {messages.map((msg) => (
            <Bubble key={msg.id} msg={msg} />
          ))}
          {isTyping && <TypingDots />}
          {bookingDone && completedBooking && (
            <BookingSuccess
              data={completedBooking}
              messages={messages}
              onDownload={generatePDF}
            />
          )}
          <div ref={bottomRef} />
        </div>

        {/* quick replies — shown only when not in booking mode and booking not done */}
        {!bookingMode && !bookingDone && (
          <div className="nd-quick-replies">
            {quickReplies.map((qr) => (
              <button
                key={qr.query}
                className="nd-chip"
                onClick={() => handleQuickReply(qr.query)}
              >
                {qr.label}
              </button>
            ))}
          </div>
        )}

        {/* input area */}
        {!bookingDone && (
          <form className="nd-input-bar" onSubmit={handleSubmit}>
            {isSelectStep ? (
              <select
                className="nd-select"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                autoFocus
              >
                <option value="">Select a treatment…</option>
                {treatmentOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            ) : (
              <input
                ref={inputRef}
                className="nd-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  bookingMode
                    ? currentStep?.placeholder || "Type your answer…"
                    : "Ask me anything about your skin…"
                }
                autoComplete="off"
              />
            )}
            <button
              type="submit"
              className="nd-send-btn"
              aria-label="Send"
              disabled={isSelectStep ? !selectValue : !input.trim()}
            >
              <Send size={17} />
            </button>
          </form>
        )}

        {bookingDone && (
          <div className="nd-done-bar">
            <button
              className="nd-new-chat-btn"
              onClick={() => {
                setMessages([{
                  id: nextId(),
                  type: "bot",
                  text: "Welcome back to **NovaDerm** 👋\n\nHow else can I help you today?",
                  ts: Date.now(),
                }]);
                setBookingDone(false);
                setCompletedBooking(null);
                setInteractionCount(0);
                setNudgeSent(false);
                setBookingMode(false);
                setBookingStep(0);
                setBookingData({});
                setUnread(0);
              }}
            >
              Start New Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
