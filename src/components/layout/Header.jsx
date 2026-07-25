import TopBar from "./TopBar"
import Navbar from "./Navbar"

export default function Header() {
  return (
    <header className="relative left-0 right-0 top-0 z-50">
      <TopBar />
      <Navbar />
    </header>
  )
}
