import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import MotionToggle from "./MotionToggle";
import { useCurrentPath, navigate } from "../lib/router";
import { getAnimationsEnabled } from "../lib/motion";
import { NAVIGATION_SECTIONS } from "../data/navigationData";

const SectionLinks = ({ activeSection, onNavigate }) => (
    <div className="space-y-1">
        {NAVIGATION_SECTIONS.map((section, index) => (
            <a key={section.id} href={`/#${section.id}`} onClick={(event) => onNavigate(event, section.id)}
                aria-current={activeSection === section.id ? "location" : undefined}
                className={`sidebar-link group flex min-h-11 items-center gap-3 border-l px-3 text-sm transition-colors ${activeSection === section.id ? "border-accent bg-accent/5 text-text-main" : "border-transparent text-text-muted hover:bg-surface hover:text-text-main"}`}>
                <span className={`font-mono text-[10px] ${activeSection === section.id ? "text-accent" : "text-text-faint"}`} aria-hidden="true">
                    {String(index).padStart(2, "0")}
                </span>
                <span>{section.label}</span>
                {activeSection === section.id && <ArrowRight size={13} className="ml-auto text-accent" aria-hidden="true" />}
            </a>
        ))}
    </div>
);

const ProfessionalLinks = () => (
    <div className="flex items-center gap-4">
        <a href="https://github.com/jico19" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="min-h-11 inline-flex items-center text-text-muted hover:text-accent"><FaGithub size={16} aria-hidden="true" /></a>
        <a href="https://www.linkedin.com/in/jerwin-nico-h-quijano-0471343b7/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="min-h-11 inline-flex items-center text-text-muted hover:text-accent"><FaLinkedin size={16} aria-hidden="true" /></a>
    </div>
);

const Navbar = () => {
    const [currentPath] = useCurrentPath();
    const [activeSection, setActiveSection] = useState("home");
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef(null);
    const triggerRef = useRef(null);
    const selectedSection = currentPath === "/tech" ? "skills" : currentPath === "/projects" ? "projects" : activeSection;

    useEffect(() => {
        if (currentPath !== "/") return;
        let frame = 0;
        const update = () => {
            frame = 0;
            let selected = "home";
            for (const section of NAVIGATION_SECTIONS) {
                const element = document.getElementById(section.id);
                if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.3) selected = section.id;
            }
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 12) selected = "contact";
            setActiveSection(selected);
        };
        const scheduleUpdate = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        scheduleUpdate();
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
        };
    }, [currentPath]);

    useEffect(() => {
        if (!isOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = previousOverflow; };
    }, [isOpen]);

    useEffect(() => {
        const desktop = window.matchMedia("(min-width: 1024px)");
        const closeOnDesktop = () => {
            if (desktop.matches && dialogRef.current?.open) dialogRef.current.close();
        };
        desktop.addEventListener("change", closeOnDesktop);
        return () => desktop.removeEventListener("change", closeOnDesktop);
    }, []);

    const goToSection = (event, id) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        if (dialogRef.current?.open) dialogRef.current.close();
        if (currentPath !== "/") navigate("/");
        setActiveSection(id);
        requestAnimationFrame(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: getAnimationsEnabled() ? "smooth" : "instant", block: "start" });
            window.history.replaceState(null, "", `/#${id}`);
        });
    };

    const openMenu = () => {
        if (!dialogRef.current.open) dialogRef.current.showModal();
        setIsOpen(true);
    };

    const closeOnBackdrop = (event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialogRef.current.close();
    };

    return (
        <>
            <a href="#main-content" className="skip-link">Skip to content</a>
            <aside className="fixed inset-y-0 left-0 z-50 hidden w-56 flex-col overflow-y-auto border-r border-border bg-bg/95 px-5 py-7 backdrop-blur-xl lg:flex">
                <a href="/#home" onClick={(event) => goToSection(event, "home")} aria-label="Jerwin Quijano, overview" className="inline-flex items-center gap-3">
                    <span className="brand-mark font-mono text-xl font-semibold text-text-main">JQ<span className="text-accent">.</span></span>
                    <span className="text-xs leading-relaxed text-text-muted">Jerwin Quijano<br /><span className="font-mono text-[10px] text-text-faint">developer portfolio</span></span>
                </a>
                <nav aria-label="Primary" className="mt-10 shrink-0">
                    <p className="mb-4 pl-3 font-mono text-[9px] uppercase tracking-[0.2em] text-text-faint">Index / 00 — {String(NAVIGATION_SECTIONS.length - 1).padStart(2, "0")}</p>
                    <SectionLinks activeSection={selectedSection} onNavigate={goToSection} />
                </nav>
                <div className="mt-auto shrink-0 pt-6">
                    <p className="mb-4 flex items-center gap-2 text-[11px] text-text-muted"><span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />Open to junior roles</p>
                    <a href="/Jerwin_Quijano_Resume.pdf" target="_blank" rel="noopener noreferrer" className="blueprint-button flex min-h-10 items-center justify-between border border-border bg-surface px-3 text-xs text-text-main hover:border-accent">
                        Download resume <ArrowUpRight size={14} className="text-accent" aria-hidden="true" />
                    </a>
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-3"><ProfessionalLinks /><ThemeToggle /></div>
                    <MotionToggle className="min-h-10" />
                    <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-text-faint">Based in the Philippines</p>
                </div>
            </aside>

            <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-bg/95 px-6 backdrop-blur-xl lg:hidden">
                <a href="/#home" onClick={(event) => goToSection(event, "home")} className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-text-main"><span className="font-semibold">JQ<span className="text-accent">.</span></span><span className="text-text-faint">/ portfolio</span></a>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button ref={triggerRef} type="button" onClick={openMenu} aria-label="Open navigation" aria-expanded={isOpen} aria-controls="mobile-navigation" className="inline-flex h-11 w-11 items-center justify-center border border-border text-text-main">
                        <Menu size={19} aria-hidden="true" />
                    </button>
                </div>
            </header>

            <dialog ref={dialogRef} id="mobile-navigation" aria-labelledby="navigation-heading" className="mobile-navigation" onClick={closeOnBackdrop} onClose={() => {
                setIsOpen(false);
                triggerRef.current?.focus();
            }}>
                <div className="flex items-center justify-between border-b border-border px-5 py-3">
                    <h2 id="navigation-heading" className="font-mono text-xs uppercase tracking-widest text-text-muted">Portfolio / Index</h2>
                    <button type="button" onClick={() => dialogRef.current.close()} aria-label="Close navigation" className="inline-flex h-11 w-11 items-center justify-center text-text-main"><X size={19} aria-hidden="true" /></button>
                </div>
                <nav aria-label="Mobile" className="p-4"><SectionLinks activeSection={selectedSection} onNavigate={goToSection} /></nav>
                <div className="px-6 pb-3">
                    <a href="/Jerwin_Quijano_Resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-xs text-text-main hover:text-accent">Download resume <ArrowUpRight size={14} aria-hidden="true" /></a>
                </div>
                <div className="flex items-center justify-between border-t border-border px-6 py-2"><ProfessionalLinks /><MotionToggle className="min-h-11" /></div>
            </dialog>
        </>
    );
};

export default Navbar;
