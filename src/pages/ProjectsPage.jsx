import { ArrowLeft } from "lucide-react";
import Projects from "../components/Projects";
import { navigate } from "../lib/router";

// Keep existing /projects links useful after retiring the detailed case studies.
const ProjectsPage = () => (
    <div className="min-h-screen text-text-main">
        <header className="max-w-[1080px] mx-auto px-6 pt-8 flex flex-wrap items-center justify-between gap-4">
            <a href="/" onClick={(event) => {
                event.preventDefault();
                navigate("/");
            }} className="min-h-11 inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-main">
                <ArrowLeft size={15} aria-hidden="true" /> Back to portfolio
            </a>
        </header>
        <main className="page-orientations">
            <h1 className="sr-only">Jerwin Nico Quijano’s projects</h1>
            <Projects />
        </main>
    </div>
);

export default ProjectsPage;
