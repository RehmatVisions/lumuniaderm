import { lazy, Suspense } from "react"
import Header from "./components/layout/Header"
import Hero   from "./components/hero/Hero"

// Below-fold sections — loaded only when browser is idle / scroll reaches them
const About          = lazy(() => import("./components/about/About"))
const WhatWeDo       = lazy(() => import("./components/whatwedo/WhatWeDo"))
const WhyChooseUs    = lazy(() => import("./components/whyus/WhyChooseUs"))
const Services       = lazy(() => import("./components/services/Services"))
const ClinicGallery  = lazy(() => import("./components/gallery/ClinicGallery"))
const BookAppointment= lazy(() => import("./components/appointment/BookAppointment"))
const Footer         = lazy(() => import("./components/layout/Footer"))

// Minimal fallback — invisible height placeholder so layout doesn't jump
function SectionFallback() {
  return <div style={{ minHeight: 120 }} aria-hidden="true" />
}

export default function App() {
  return (
    <div className="min-h-screen bg-novaderm-beige">
      <Header />
      {/* Dark wrapper so hero margins show dark, not beige */}
      <div style={{ background: "#080604" }}>
        <Hero />
      </div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Suspense fallback={<SectionFallback />}><About /></Suspense>
        <Suspense fallback={<SectionFallback />}><WhatWeDo /></Suspense>
        <Suspense fallback={<SectionFallback />}><WhyChooseUs /></Suspense>
        <Suspense fallback={<SectionFallback />}><Services /></Suspense>
        <Suspense fallback={<SectionFallback />}><ClinicGallery /></Suspense>
        <Suspense fallback={<SectionFallback />}><BookAppointment /></Suspense>
        <Suspense fallback={<SectionFallback />}><Footer /></Suspense>
      </div>
    </div>
  )
}
