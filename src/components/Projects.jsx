import PageOrientation from "./PageOrientation";
import { useState } from "react";
import { ArrowUpRight, ArrowRight, Ghost, Terminal } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { PROJECT_DATA } from "../data/projectsData";
import { navigate } from "../lib/router";

const Projects = () => {
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: -1000, y: -1000 });
    };

    return (
        <section id="projects" aria-labelledby="projects-heading" className="max-w-[1080px] mx-auto px-6 py-16 md:py-24">
            <ScrollReveal>
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
                    <div>
                        <PageOrientation pageOrientation="Projects" />
                        <h2 id="projects-heading" className="text-3xl font-semibold tracking-tight text-text-main">
                            Featured Projects
                        </h2>
                        <p className="mt-2 text-sm text-text-muted max-w-[56ch]">
                            Production web applications, REST APIs, and municipal systems I've built.
                        </p>
                    </div>

                    <a
                        href="/projects"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/projects");
                        }}
                        className="
                            inline-flex items-center gap-1.5
                            text-xs font-mono text-accent
                            hover:underline
                            cursor-pointer
                            shrink-0
                        "
                    >
                        <span>View case studies</span>
                        <ArrowRight size={13} />
                    </a>
                </div>

                {/* Skimmed Project Cards */}
                <div className="space-y-6">
                    {PROJECT_DATA.map((item, idx) => (
                        <ScrollReveal key={idx} delay={idx * 120}>
                            <article
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                className="
                                    relative
                                    group
                                    rounded-[12px]
                                    border border-border
                                    bg-surface
                                    hover:border-text-faint/80
                                    transition-all
                                    duration-300
                                    overflow-hidden
                                    shadow-xs
                                "
                            >
                                {/* Mouse Spotlight Aura */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                                    style={{
                                        background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, var(--spotlight), transparent 80%)`,
                                    }}
                                />

                                {/* Card Header Bar */}
                                <div className="relative z-10 px-4 py-2 border-b border-border bg-bg/90 backdrop-blur-xs flex items-center justify-between text-xs font-mono text-text-faint">
                                    <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                        <span className="text-text-muted">{item.category || item.badge}</span>
                                    </div>
                                    <span className="text-[11px] text-text-faint">
                                        {item.client}
                                    </span>
                                </div>

                                {/* Skimmed Content Body */}
                                <div className="relative z-10 p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
                                    {/* Visual Thumbnail (lg:col-span-5) */}
                                    <div className="lg:col-span-5">
                                        <div className="relative w-full aspect-[16/10] max-h-[190px] sm:max-h-[220px] rounded-[8px] overflow-hidden border border-border bg-[#0A0A0B] flex items-center justify-center">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={`${item.label} screenshot`}
                                                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center gap-2 p-4 text-center select-none">
                                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-2 border border-border text-accent">
                                                        <Ghost size={20} className="animate-pulse" />
                                                    </div>
                                                    <div className="text-[10px] font-mono text-text-faint">
                                                        // private healthcare portal
                                                    </div>
                                                </div>
                                            )}

                                            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-[4px] bg-bg/90 backdrop-blur-xs border border-border text-[9px] font-mono text-accent flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                                <span>{item.status}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skimmed Info & Actions (lg:col-span-7) */}
                                    <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
                                        <div>
                                            <span className="text-[11px] font-mono text-text-faint block mb-1">
                                                {item.badge}
                                            </span>
                                            <h3 className="text-xl font-semibold text-text-main group-hover:text-accent transition-colors">
                                                {item.label}
                                            </h3>
                                            <p className="mt-1.5 text-xs sm:text-sm text-text-muted leading-relaxed">
                                                {item.shortDescription}
                                            </p>
                                        </div>

                                        {/* Core Tech Chips */}
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {item.tech.map((t) => (
                                                <span
                                                    key={t}
                                                    className="px-2 py-0.5 rounded-[4px] bg-surface-2 border border-border text-[10px] font-mono text-text-muted"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap items-center gap-2.5 pt-2">
                                            <a
                                                href="/projects"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    navigate("/projects");
                                                }}
                                                className="
                                                    h-8 px-3.5
                                                    rounded-[6px]
                                                    bg-surface-2
                                                    hover:bg-surface
                                                    border border-border
                                                    hover:border-accent/50
                                                    text-xs font-mono text-text-main
                                                    inline-flex items-center gap-1.5
                                                    transition-all
                                                    duration-150
                                                    cursor-pointer
                                                "
                                            >
                                                <span>View specifications</span>
                                                <ArrowRight size={12} className="text-accent" />
                                            </a>

                                            {item.web_link && (
                                                <a
                                                    href={item.web_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="
                                                        h-8 px-3.5
                                                        rounded-[6px]
                                                        bg-accent
                                                        text-accent-contrast
                                                        text-xs font-medium
                                                        inline-flex items-center gap-1.5
                                                        hover:brightness-95
                                                        transition-all
                                                        duration-150
                                                        cursor-pointer
                                                    "
                                                >
                                                    <span>Live platform</span>
                                                    <ArrowUpRight size={12} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Section Footer: Link to Full Projects Page */}
                <div className="mt-8 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono text-text-faint">
                    <span>Detailed technical case studies & architecture deep dives</span>
                    <a
                        href="/projects"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/projects");
                        }}
                        className="text-accent hover:underline flex items-center gap-1"
                    >
                        <span>Explore full case studies</span>
                        <ArrowRight size={12} />
                    </a>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Projects;