import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Projects from "./components/Projects"
import Experience from "./components/Experience"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

function App() {

  return (
    <div className="min-h-screen bg-zinc-950 crt-screen text-zinc-100 selection:bg-accent selection:text-zinc-950 relative">
      <div className="scanline"></div>
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
