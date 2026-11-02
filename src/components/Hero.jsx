import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import StackDiagram from "./StackDiagram";

const Hero = () => (
    <section id="home" aria-labelledby="home-heading" className="blueprint-hero max-w-[1080px] mx-auto px-6 py-12 md:px-10 md:py-14">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em]">
            <span className="text-text-faint">00 / Introduction</span>
            <span className="flex items-center gap-2 text-text-muted"><span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />PH · Open to junior roles</span>
        </div>
        <div className="grid items-center gap-10 xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
                <p className="mb-5 font-mono text-xs text-accent">Freelance Fullstack Developer</p>
                <h1 id="home-heading" className="hero-name font-semibold tracking-[-0.055em] text-text-main">
                    <span className="block">Jerwin Nico</span>
                    <span className="block text-text-muted">Quijano<span className="text-accent" aria-hidden="true">.</span></span>
                </h1>
                <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-text-muted">
                    I build web applications and tools for clients using React, Python,
                    and PostgreSQL. Based in the Philippines, currently working on
                    a healthcare platform for a US client.
                </p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] text-text-muted" aria-label="Core technologies">
                    {["React", "Python", "Django", "FastAPI", "PostgreSQL"].map((tech) => <span key={tech}>{tech}</span>)}
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a href="#projects" className="blueprint-button inline-flex min-h-11 items-center justify-center gap-3 border border-accent bg-accent px-5 text-sm font-medium text-accent-contrast hover:brightness-95">
                        View projects <ArrowDownRight size={15} aria-hidden="true" />
                    </a>
                    <a href="/Jerwin_Quijano_Resume.pdf" target="_blank" rel="noopener noreferrer" className="blueprint-button inline-flex min-h-11 items-center gap-2 border border-border bg-bg/60 px-5 text-sm font-medium text-text-main hover:border-accent">
                        Resume <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-text-muted">
                    <a href="https://github.com/jico19" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-text-main"><FaGithub size={14} aria-hidden="true" /> GitHub <ArrowUpRight size={11} aria-hidden="true" /></a>
                    <a href="https://www.linkedin.com/in/jerwin-nico-h-quijano-0471343b7/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-text-main"><FaLinkedin size={14} aria-hidden="true" /> LinkedIn <ArrowUpRight size={11} aria-hidden="true" /></a>
                </div>
            </div>
            <div className="hidden xl:block"><StackDiagram /></div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-text-faint">
            <span>Client work / Independent projects</span>
            <span aria-hidden="true">Scroll to explore ↓</span>
        </div>
    </section>
);

export default Hero;
