import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import HomePage          from "./pages/HomePage"
import GalleryPage       from "./pages/GalleryPage"
import DoctorProfilePage from "./pages/DoctorProfilePage"

// Handles /#section navigation from other pages
function HashScroller() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "")
      // Retry up to ~1.2s to handle lazy-loaded sections
      const scrollToSection = (attempts = 0) => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        } else if (attempts < 10) {
          setTimeout(() => scrollToSection(attempts + 1), 120)
        }
      }
      // Small initial delay so the page has time to start rendering
      setTimeout(() => scrollToSection(), 80)
    }
  }, [hash, pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <HashScroller />
      <Routes>
        <Route path="/"        element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/doctors" element={<DoctorProfilePage />} />
        {/* Catch-all → home */}
        <Route path="*"        element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
