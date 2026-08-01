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
      // Small delay so the page has time to render before scrolling
      const timer = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "smooth" })
      }, 120)
      return () => clearTimeout(timer)
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
