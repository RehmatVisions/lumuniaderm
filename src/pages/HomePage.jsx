import { lazy, Suspense } from "react"
import Hero from "../components/hero/Hero"
import ClinicChatbot from "../components/chatbot/ClinicChatbot"
import ScrollToTop from "../components/ui/ScrollToTop"
import sectionBg from "../assets/backgroundall/bacrkound.png"

const About               = lazy(() => import("../components/about/About"))
const TransformationSection = lazy(() => import("../components/transformations/TransformationSection"))
const WhatWeDo            = lazy(() => import("../components/whatwedo/WhatWeDo"))
const WhyChooseUs         = lazy(() => import("../components/whyus/WhyChooseUs"))
const Services            = lazy(() => import("../components/services/Services"))
const DoctorsSection      = lazy(() => import("../components/doctors/DoctorsSection"))
const ClinicGallery       = lazy(() => import("../components/gallery/ClinicGallery"))
const Testimonials        = lazy(() => import("../components/testimonials/Testimonials"))
const BookAppointment     = lazy(() => import("../components/appointment/BookAppointment"))
const Footer              = lazy(() => import("../components/layout/Footer"))

function SectionFallback() {
  return <div style={{ minHeight: 120 }} aria-hidden="true" />
}

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-novaderm-beige">
        <Hero />
        <div style={{ position: "relative", zIndex: 2 }}>
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
            <Suspense fallback={<SectionFallback />}><DoctorsSection /></Suspense>
            <Suspense fallback={<SectionFallback />}><TransformationSection /></Suspense>
            <Suspense fallback={<SectionFallback />}><WhatWeDo /></Suspense>
            <Suspense fallback={<SectionFallback />}><WhyChooseUs /></Suspense>
            <Suspense fallback={<SectionFallback />}><Services /></Suspense>
            <Suspense fallback={<SectionFallback />}><ClinicGallery /></Suspense>
            <Suspense fallback={<SectionFallback />}><Testimonials /></Suspense>
            <Suspense fallback={<SectionFallback />}><BookAppointment /></Suspense>
            <Suspense fallback={<SectionFallback />}><Footer /></Suspense>
          </div>
        </div>
      </div>
      <ClinicChatbot />
      <ScrollToTop />
    </>
  )
}
