import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import TechStack from "./components/TechStack"
import Projects from "./components/Projects"
import Experience from "./components/Experience"
import Testimonials from "./components/Testimonials"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import CustomCursor from "./components/CustomCursor"
import AsciiParticles from "./components/AsciiParticles"

function App() {
  return (
    <div className="min-h-screen bg-bg text-text-main selection:bg-accent selection:text-accent-contrast relative">
      <AsciiParticles />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
