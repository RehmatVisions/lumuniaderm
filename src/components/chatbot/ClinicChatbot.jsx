import { useState, useRef, useEffect, useCallback, memo } from "react";
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
      const kwLower = kw.toLowerCase();
      if (text.includes(kwLower)) {
        // longer / multi-word keyword = higher score
        score += kw.split(" ").length > 1 ? 4 : 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // Extra: if score is 0, try matching individual words of the input
  // against keywords — catches "tell me about you" → finds "about you"
  if (bestScore === 0) {
    const words = text.split(/\s+/).filter(w => w.length > 2);
    for (const entry of clinicKnowledge) {
      let score = 0;
      for (const kw of entry.keywords) {
        const kwLower = kw.toLowerCase()
        for (const word of words) {
          if (kwLower.includes(word) || word.includes(kwLower)) {
            score += 1
          }
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }
    // Only use word-level match if score is meaningful
    if (bestScore < 2) return null;
  }

  return bestScore > 0 ? bestMatch : null;
}

const WHATSAPP_NUMBER = "03244646260"
const WHATSAPP_FALLBACK_MSG = encodeURIComponent("Hi Luminaderm! I have a question that I couldn't get answered through the chatbot. Can you help me?")
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_FALLBACK_MSG}`

const FALLBACK_TEXT =
  "I'm not sure about that one, but our team would love to help you personally! 😊\n\nClick below to chat with us directly on **WhatsApp** — we typically reply within a few minutes."

// sentinel so Bubble knows to render the WA button
const FALLBACK_WITH_WA = "__WHATSAPP_FALLBACK__";

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
    placeholder: "e.g. 0324 4646260",
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
];

// ─── PDF generator ───────────────────────────────────────────────────────────

function generatePDF(bookingData, messages) {
  const doc    = new jsPDF({ unit: "mm", format: "a4" });
  const pw     = doc.internal.pageSize.getWidth();   // 210
  const ph     = doc.internal.pageSize.getHeight();  // 297
  const ml     = 16;   // left margin
  const mr     = 16;   // right margin
  const cw     = pw - ml - mr;  // content width
  let   y      = 0;

  // ── colour palette ──────────────────────────────────────────────
  const GOLD_D  = [168, 130,  90];  // dark gold
  const GOLD_M  = [212, 175,  95];  // mid gold
  const GOLD_L  = [245, 225, 170];  // light gold
  const DARK    = [ 14,  11,   8];  // near-black
  const DARK2   = [ 30,  22,  12];  // header bg
  const WHITE   = [255, 255, 255];
  const CREAM   = [253, 249, 242];  // page bg tint
  const TEXT_D  = [ 22,  18,  10];
  const TEXT_M  = [ 80,  65,  45];
  const TEXT_L  = [140, 120,  90];
  const DIVIDER = [220, 205, 180];

  // helper: set fill + stroke to gold
  const goldFill   = () => { doc.setFillColor(...GOLD_M); doc.setDrawColor(...GOLD_D); };
  const darkFill   = () => { doc.setFillColor(...DARK2);  doc.setDrawColor(...DARK2);  };
  const creamFill  = () => { doc.setFillColor(...CREAM);  doc.setDrawColor(...DIVIDER); };

  // helper: add new page if needed
  const checkPage = (needed = 12) => {
    if (y + needed > ph - 18) { doc.addPage(); y = 22; }
  };

  // ══════════════════════════════════════════════════════════════
  // PAGE 1 — HEADER BANNER
  // ══════════════════════════════════════════════════════════════

  // Dark header bar
  darkFill();
  doc.rect(0, 0, pw, 44, "F");

  // Gold left accent stripe
  doc.setFillColor(...GOLD_M);
  doc.rect(0, 0, 5, 44, "F");

  // Brand name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...GOLD_M);
  doc.text("LUMINA DERM", ml + 4, 18);

  // Tagline
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...GOLD_L);
  doc.text("Aesthetic & Dermatology Clinic", ml + 4, 25);

  // Right side clinic info
  doc.setFontSize(7.5);
  doc.setTextColor(200, 185, 155);
  doc.text("Dubai, UAE", pw - mr, 16, { align: "right" });
  doc.text("info@luminaderm.com  |  +92 324 4646260", pw - mr, 22, { align: "right" });
  doc.text("Sun–Thu: 10:00 AM – 8:00 PM  |  Fri–Sat: 2:00 PM – 10:00 PM", pw - mr, 28, { align: "right" });

  // Gold bottom line of header
  doc.setDrawColor(...GOLD_M);
  doc.setLineWidth(0.8);
  doc.line(0, 44, pw, 44);

  y = 54;

  // ── VERIFIED APPOINTMENT PASS title row ──────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...TEXT_D);
  doc.text("APPOINTMENT PASS", ml, y);

  // VERIFIED badge — right aligned
  doc.setFillColor(...GOLD_M);
  doc.roundedRect(pw - mr - 38, y - 6, 38, 9, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...WHITE);
  doc.text("VERIFIED", pw - mr - 19, y - 0.5, { align: "center" });

  y += 5;

  // Booking ID + issued date
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_M);
  doc.text(`Booking ID: ${bookingData.bookingId}`, ml, y);
  doc.text(
    `Issued: ${new Date(bookingData.timestamp).toLocaleString("en-PK")}`,
    pw - mr, y, { align: "right" }
  );
  y += 10;

  // ── PATIENT DETAILS BOX ───────────────────────────────────────
  const boxH = 58;
  creamFill();
  doc.setLineWidth(0.25);
  doc.roundedRect(ml, y, cw, boxH, 3, 3, "FD");

  // gold left accent bar inside box
  doc.setFillColor(...GOLD_M);
  doc.roundedRect(ml, y, 3, boxH, 1.5, 1.5, "F");

  const labelX = ml + 8;
  const valueX = ml + 60;
  const rowH   = 10;
  let   ry     = y + 11;

  const fields = [
    ["Patient Name",        bookingData.name],
    ["Email Address",       bookingData.email],
    ["Phone / WhatsApp",    bookingData.phone],
    ["Treatment Selected",  bookingData.treatment],
  ];

  for (const [label, value] of fields) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...TEXT_L);
    doc.text(label, labelX, ry);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...TEXT_D);
    const wrapped = doc.splitTextToSize(String(value || "—"), cw - 68);
    doc.text(wrapped, valueX, ry);
    ry += rowH;
  }
  y += boxH + 8;

  // ── CLINIC NOTE STRIP ─────────────────────────────────────────
  doc.setFillColor(255, 250, 235);
  doc.setDrawColor(...GOLD_D);
  doc.setLineWidth(0.3);
  doc.roundedRect(ml, y, cw, 11, 2, 2, "FD");
  doc.setFont("helvetica", "bolditalic");
  doc.setFontSize(8);
  doc.setTextColor(...GOLD_D);
  doc.text(
    "Please present this pass at reception upon arrival. Slot subject to confirmation.",
    ml + cw / 2, y + 7, { align: "center" }
  );
  y += 18;

  // ── DIVIDER with label ────────────────────────────────────────
  doc.setDrawColor(...DIVIDER);
  doc.setLineWidth(0.3);
  doc.line(ml, y, pw - mr, y);
  y += 7;

  // ══════════════════════════════════════════════════════════════
  // CHAT TRANSCRIPT SECTION
  // ══════════════════════════════════════════════════════════════

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...TEXT_D);
  doc.text("Chat Transcript", ml, y);

  // small gold underline
  doc.setDrawColor(...GOLD_M);
  doc.setLineWidth(0.6);
  doc.line(ml, y + 2, ml + 40, y + 2);
  y += 10;

  const relevantMsgs = messages.filter(m => m.type !== "system");

  for (const msg of relevantMsgs) {
    const isBot  = msg.type === "bot";
    const speaker = isBot ? "Dr. Assistant" : "You";
    const time    = formatTime(new Date(msg.ts));
    // strip markdown bold markers for PDF
    const cleanText = msg.text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\n/g, " ");

    // estimate line count
    const textLines = doc.splitTextToSize(cleanText, cw - 16);
    const bubbleH   = 8 + textLines.length * 5 + 4;

    checkPage(bubbleH + 6);

    if (isBot) {
      // Bot bubble — light cream background, gold left border
      doc.setFillColor(250, 246, 239);
      doc.setDrawColor(...DIVIDER);
      doc.setLineWidth(0.2);
      doc.roundedRect(ml, y, cw * 0.84, bubbleH, 2, 2, "FD");
      doc.setFillColor(...GOLD_M);
      doc.roundedRect(ml, y, 2.5, bubbleH, 1, 1, "F");

      // Speaker label
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(...GOLD_D);
      doc.text(`Dr. Assistant`, ml + 6, y + 5.5);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(...TEXT_L);
      doc.text(time, ml + cw * 0.84 - 2, y + 5.5, { align: "right" });

      // Message text
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...TEXT_D);
      doc.text(textLines, ml + 6, y + 11);

    } else {
      // User bubble — dark background, right aligned
      const bw = cw * 0.72;
      const bx = ml + cw - bw;
      doc.setFillColor(...DARK2);
      doc.setDrawColor(...DARK);
      doc.setLineWidth(0.2);
      doc.roundedRect(bx, y, bw, bubbleH, 2, 2, "FD");

      // Speaker label
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(...GOLD_L);
      doc.text("You", bx + 6, y + 5.5);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(160, 140, 110);
      doc.text(time, bx + bw - 4, y + 5.5, { align: "right" });

      // Message text
      const userLines = doc.splitTextToSize(cleanText, bw - 12);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(235, 225, 210);
      doc.text(userLines, bx + 6, y + 11);
    }

    y += bubbleH + 5;
  }

  // ── FOOTER on every page ──────────────────────────────────────
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // dark footer bar
    doc.setFillColor(...DARK2);
    doc.rect(0, ph - 12, pw, 12, "F");
    doc.setFillColor(...GOLD_M);
    doc.rect(0, ph - 12, pw, 0.8, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...GOLD_L);
    doc.text("Luminaderm Aesthetic & Dermatology Clinic  |  luminaderm.com", ml, ph - 5.5);
    doc.text(`Page ${i} of ${totalPages}`, pw - mr, ph - 5.5, { align: "right" });
  }

  doc.save(`LuminaDerm-Appointment-${bookingData.bookingId.replace("#", "")}.pdf`);
}

// ─── Typewriter hook ──────────────────────────────────────────────────────────

function useTypewriter(fullText, enabled) {
  const [displayed, setDisplayed] = useState(enabled ? "" : fullText);
  const [done, setDone]           = useState(!enabled);
  const rafRef   = useRef(null);

  useEffect(() => {
    if (!enabled) { setDisplayed(fullText); setDone(true); return; }
    setDisplayed("");
    setDone(false);

    let index = 0;
    // Print multiple characters per animation frame for GPT-like speed
    const CHARS_PER_FRAME = 6;

    const tick = () => {
      index = Math.min(index + CHARS_PER_FRAME, fullText.length);
      setDisplayed(fullText.slice(0, index));
      if (index < fullText.length) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullText, enabled]);

  return { displayed, done };
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function renderMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");
}

function Bubble({ msg, isLatestBot }) {
  const isBot    = msg.type === "bot";
  const isSystem = msg.type === "system";
  const isWAFallback = isBot && msg.text === FALLBACK_WITH_WA

  // Typewriter only on the latest bot message
  const { displayed, done } = useTypewriter(
    isWAFallback ? FALLBACK_TEXT : msg.text,
    isBot && isLatestBot
  );

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
          dangerouslySetInnerHTML={{ __html: renderMarkdown(displayed) }}
        />
        {/* blinking cursor while typing */}
        {isBot && isLatestBot && !done && (
          <span className="nd-cursor" aria-hidden="true">▍</span>
        )}
        {/* WhatsApp button — shown after typing completes */}
        {isWAFallback && done && (
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            8,
              marginTop:      10,
              padding:        "9px 16px",
              borderRadius:   "9999px",
              background:     "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              color:          "#fff",
              fontWeight:     700,
              fontSize:       12,
              letterSpacing:  "0.04em",
              textDecoration: "none",
              boxShadow:      "0 4px 14px rgba(37,211,102,0.38)",
              transition:     "transform 0.18s ease, box-shadow 0.18s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,211,102,0.52)" }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)";    e.currentTarget.style.boxShadow = "0 4px 14px rgba(37,211,102,0.38)" }}
          >
            {/* WhatsApp SVG icon */}
            <svg width="15" height="15" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.774L0 32l8.476-2.003A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.322 22.293c-.347.977-2.03 1.865-2.789 1.981-.713.11-1.613.156-2.602-.163-.6-.19-1.37-.444-2.357-.87-4.143-1.79-6.845-5.99-7.052-6.268-.207-.278-1.685-2.241-1.685-4.273 0-2.031 1.066-3.027 1.443-3.441.378-.414.824-.518 1.099-.518.275 0 .55.003.791.014.254.013.594-.096.93.709.347.83 1.177 2.862 1.28 3.069.103.207.172.449.034.724-.138.275-.207.449-.414.69-.207.241-.435.538-.621.723-.207.207-.422.43-.181.844.241.414 1.072 1.768 2.302 2.864 1.582 1.41 2.916 1.847 3.33 2.054.414.207.655.172.896-.104.241-.275 1.031-1.203 1.306-1.617.275-.414.55-.345.93-.207.38.138 2.413 1.137 2.827 1.344.414.207.69.31.793.482.103.172.103.996-.244 1.972z"/>
            </svg>
            Chat on WhatsApp
          </a>
        )}
        {/* timestamp only after typing is done */}
        {(!isBot || done) && (
          <span className="nd-ts">{formatTime(new Date(msg.ts))}</span>
        )}
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
        <div><MapPin size={13} /><span>Luminaderm, Dubai, UAE</span></div>
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
      text: "Welcome to **Lumina Derm** 👋\n\nI'm your virtual skin consultant. Ask me about any of our treatments, pricing, or how to book — I'm here to help!",
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
        // booking complete — show success
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
      await botReply(match ? match.answer : FALLBACK_WITH_WA);

      // smart booking nudge after 2–3 interactions
      if (newCount >= 2 && !nudgeSent && !bookingMode) {
        setNudgeSent(true);
        await botReply(
        "Would you like to book an appointment? I can help you right now — it only takes a minute.",
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
      setSelectValue("");
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
              Online · Lumina Derm Clinic
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
          {messages.map((msg, i) => {
            // find index of last bot message
            const isLatestBot =
              msg.type === "bot" &&
              i === [...messages].map(m => m.type).lastIndexOf("bot");
            return (
              <Bubble key={msg.id} msg={msg} isLatestBot={isLatestBot} />
            );
          })}
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
                  text: "Welcome back to **Lumina Derm** 👋\n\nHow else can I help you today?",
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



