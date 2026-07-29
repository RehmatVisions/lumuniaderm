import { lazy, Suspense } from "react"
import Hero   from "./components/hero/Hero"
import ClinicChatbot from "./components/chatbot/ClinicChatbot"
import ScrollToTop from "./components/ui/ScrollToTop"
import sectionBg from "./assets/backgroundall/bacrkound.png"

// ─── Placement note ───────────────────────────────────────────────────────────
// <ClinicChatbot /> must render OUTSIDE any element that establishes a new
// stacking context (position + z-index, transform, will-change, filter, etc.).
// It is placed after the closing tag of the main wrapper div below so its own
// fixed container (z-index: 999999) is never clipped by a parent z-index.
// ─────────────────────────────────────────────────────────────────────────────

// Below-fold sections — loaded only when browser is idle / scroll reaches them
const About              = lazy(() => import("./components/about/About"))
const TransformationSection = lazy(() => import("./components/transformations/TransformationSection"))
const WhatWeDo       = lazy(() => import("./components/whatwedo/WhatWeDo"))
const WhyChooseUs    = lazy(() => import("./components/whyus/WhyChooseUs"))
const Services       = lazy(() => import("./components/services/Services"))
const DoctorsSection = lazy(() => import("./components/doctors/DoctorsSection"))
const ClinicGallery  = lazy(() => import("./components/gallery/ClinicGallery"))
const Testimonials   = lazy(() => import("./components/testimonials/Testimonials"))
const BookAppointment= lazy(() => import("./components/appointment/BookAppointment"))
const Footer         = lazy(() => import("./components/layout/Footer"))

// Minimal fallback — invisible height placeholder so layout doesn't jump
function SectionFallback() {
  return <div style={{ minHeight: 120 }} aria-hidden="true" />
}

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-novaderm-beige">
        {/* Hero */}
        <Hero />
        <div style={{
          position: "relative", zIndex: 2,
        }}>
          {/* Background image — covers all sections below hero */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, zIndex: 0,
            backgroundImage: `url(${sectionBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
          <Suspense fallback={<SectionFallback />}><About /></Suspense>
          <Suspense fallback={<SectionFallback />}><TransformationSection /></Suspense>
          <Suspense fallback={<SectionFallback />}><WhatWeDo /></Suspense>
          <Suspense fallback={<SectionFallback />}><WhyChooseUs /></Suspense>
          <Suspense fallback={<SectionFallback />}><Services /></Suspense>
          <Suspense fallback={<SectionFallback />}><DoctorsSection /></Suspense>
          <Suspense fallback={<SectionFallback />}><ClinicGallery /></Suspense>
          <Suspense fallback={<SectionFallback />}><Testimonials /></Suspense>
          <Suspense fallback={<SectionFallback />}><BookAppointment /></Suspense>
          <Suspense fallback={<SectionFallback />}><Footer /></Suspense>
          </div>
        </div>
      </div>

      {/*
       * ClinicChatbot sits OUTSIDE the main wrapper div so no parent
       * stacking context can suppress its z-index: 999999 fixed container.
       */}
      <ClinicChatbot />
      <ScrollToTop />
    </>
  )
}
