import Header from "./components/layout/Header"
import Hero from "./components/hero/Hero"
import About from "./components/about/About"
import WhatWeDo from "./components/whatwedo/WhatWeDo"
import WhyChooseUs from "./components/whyus/WhyChooseUs"
import Services from "./components/services/Services"
import BookAppointment from "./components/appointment/BookAppointment"
import ClinicGallery from "./components/gallery/ClinicGallery"
import Footer from "./components/layout/Footer"

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-novaderm-beige">
        <Header />
        <Hero />
        <div style={{ position: "relative", zIndex: 2 }}>
          <About />
          <WhatWeDo />
          <WhyChooseUs />
          <Services />
          <ClinicGallery />
          <BookAppointment />
          <Footer />
        </div>
      </div>
    </>
  )
}
