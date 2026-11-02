import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import AsciiParticles from "./components/AsciiParticles";
import ScrollTelemetry from "./components/ScrollTelemetry";
import TechPage from "./pages/TechPage";
import ProjectsPage from "./pages/ProjectsPage";
import FarmPassCaseStudy from "./pages/FarmPassCaseStudy";
import { useCurrentPath } from "./lib/router";
import { Analytics } from "@vercel/analytics/react";

function App() {
    const [currentPath] = useCurrentPath();
    const isHome = currentPath === "/";

    return (
        <div className="blueprint-app relative isolate min-h-screen bg-bg text-text-main selection:bg-accent selection:text-accent-contrast">
            <AsciiParticles />
            <CustomCursor />
            {isHome && <Analytics />}
            <Navbar />
            <div id="main-content" tabIndex={-1} className="portfolio-content relative z-10 pt-16 lg:pl-56 lg:pt-0">
                {currentPath === "/tech" ? <TechPage /> : currentPath === "/projects/farmpass" ? <FarmPassCaseStudy /> : currentPath === "/projects" ? <ProjectsPage /> : (
                    <main className="portfolio-main page-orientations">
                        <Hero />
                        <Projects />
                        <Experience />
                        <TechStack />
                        <About />
                        <Contact />
                    </main>
                )}
                <Footer />
            </div>
            {isHome && <ScrollTelemetry />}
        </div>
    );
}

export default App;
