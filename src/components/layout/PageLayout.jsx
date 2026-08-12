import { Suspense, lazy } from "react"
import Navbar from "./Navbar"
import sectionBg from "../../assets/backgroundall/bacrkound.webp"
import ClinicChatbot from "../chatbot/ClinicChatbot"
import ScrollToTop from "../ui/ScrollToTop"

const Footer = lazy(() => import("./Footer"))

function SectionFallback() {
  return <div style={{ minHeight: 80 }} aria-hidden="true" />
}

/**
 * Shared wrapper for all inner pages (Gallery, DoctorProfile, etc.)
 * - Sticky Navbar at top
 * - Background image behind content
 * - Footer at bottom
 */
export default function PageLayout({ children }) {
  return (
    <>
      <div className="min-h-screen" style={{ background: "#FFF5ED" }}>
        {/* Sticky navbar */}
        <Navbar variant="page" />

        {/* Content area with background image */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 0,
              backgroundImage: `url(${sectionBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center 80px",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            {children}
            <Suspense fallback={<SectionFallback />}>
              <Footer />
            </Suspense>
          </div>
        </div>
      </div>

      <ClinicChatbot />
      <ScrollToTop />
    </>
  )
}
