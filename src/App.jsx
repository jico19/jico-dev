import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import TechStack from "./components/TechStack"
import Services from "./components/Services"
import Projects from "./components/Projects"
import Experience from "./components/Experience"
import Testimonials from "./components/Testimonials"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import CustomCursor from "./components/CustomCursor"
import AsciiParticles from "./components/AsciiParticles"
import ScrollTelemetry from "./components/ScrollTelemetry"
import TechPage from "./pages/TechPage"
import ProjectsPage from "./pages/ProjectsPage"
import { useCurrentPath } from "./lib/router"
import { Analytics } from "@vercel/analytics/next"

function App() {
  const [currentPath] = useCurrentPath()

  if (currentPath === "/tech") {
    return (
      <div className="min-h-screen bg-bg text-text-main selection:bg-accent selection:text-accent-contrast relative">
        <AsciiParticles />
        <CustomCursor />
        <TechPage />
      </div>
    )
  }

  if (currentPath === "/projects") {
    return (
      <div className="min-h-screen bg-bg text-text-main selection:bg-accent selection:text-accent-contrast relative">
        <AsciiParticles />
        <CustomCursor />
        <ProjectsPage />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg text-text-main selection:bg-accent selection:text-accent-contrast relative">
      <AsciiParticles />
      <CustomCursor />
      <Analytics/>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Services />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollTelemetry />
    </div>
  )
}

export default App
