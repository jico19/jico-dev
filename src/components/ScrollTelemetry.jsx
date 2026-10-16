import { useState, useEffect, useRef } from "react";
import { ArrowUp, Terminal } from "lucide-react";
import { useAnimationsEnabled } from "../lib/motion";
import { animate } from "../lib/anime";

const SECTIONS = [
    { id: "home", label: "01 / HOME" },
    { id: "about", label: "02 / ABOUT" },
    { id: "skills", label: "03 / STACK" },
    { id: "services", label: "04 / SERVICES" },
    { id: "projects", label: "05 / PROJECTS" },
    { id: "experience", label: "06 / EXP" },
    { id: "testimonials", label: "07 / REVIEWS" },
    { id: "contact", label: "08 / CONTACT" },
];

export const ScrollTelemetry = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [activeSection, setActiveSection] = useState("01 / HOME");
    const containerRef = useRef(null);
    const animationsEnabled = useAnimationsEnabled();

    // Scroll listener & active section spy
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? Math.min(100, Math.round((scrollY / docHeight) * 100)) : 0;
            setProgress(pct);
            setIsVisible(scrollY > 280);

            // Determine active section
            for (let i = SECTIONS.length - 1; i >= 0; i--) {
                const el = document.getElementById(SECTIONS[i].id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= window.innerHeight * 0.45) {
                        setActiveSection(SECTIONS[i].label);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Anime.js entrance/exit animation for HUD
    useEffect(() => {
        if (!containerRef.current || !animationsEnabled) return;

        if (isVisible) {
            animate(containerRef.current, {
                opacity: [0, 1],
                translateY: [12, 0],
                scale: [0.94, 1],
                duration: 350,
                ease: "outExpo",
            });
        } else {
            animate(containerRef.current, {
                opacity: [1, 0],
                translateY: [0, 12],
                scale: [1, 0.94],
                duration: 250,
                ease: "inQuad",
            });
        }
    }, [isVisible, animationsEnabled]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Calculate ASCII bar [====>-----]
    const totalBlocks = 8;
    const filledBlocks = Math.round((progress / 100) * totalBlocks);
    const asciiBar = "=".repeat(Math.max(0, filledBlocks - 1)) + (filledBlocks > 0 ? ">" : "-") + "-".repeat(Math.max(0, totalBlocks - filledBlocks));

    if (!isVisible) return null;

    return (
        <aside
            ref={containerRef}
            aria-label="Scroll telemetry HUD"
            className="fixed bottom-5 right-5 z-40 hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-[8px] bg-bg/90 backdrop-blur-md border border-border text-xs font-mono text-text-muted shadow-lg hover:border-accent/40 transition-colors select-none group"
        >
            <div className="flex items-center gap-1.5 text-text-faint">
                <Terminal size={12} className="text-accent animate-pulse" />
                <span className="text-accent font-semibold">{activeSection}</span>
            </div>

            <span className="text-border" aria-hidden="true">|</span>

            <span className="text-[11px] text-text-muted tracking-tight">
                [{asciiBar}] {progress}%
            </span>

            <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="ml-1 -mr-1 p-1 rounded-[5px] text-text-faint hover:text-text-main hover:bg-surface-2 transition-colors cursor-pointer flex items-center justify-center"
                title="Back to top"
            >
                <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
        </aside>
    );
};

export default ScrollTelemetry;
