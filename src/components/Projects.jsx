import { useState } from "react";
import farmPass from "../assets/projects/farmpass.jpeg";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Projects = () => {
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

    const project_data = [
        {
            label: "FarmPass",
            image: farmPass,
            tech: ["Django", "DRF", "React", "PostgreSQL"],
            description:
                "A capstone project for the Municipal Agriculture Office of Sariaya focused on permit processing and geospatial mapping.",
            web_link: "https://farmpass-ph.me/",
        },
    ];

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
                <div className="mb-10">
                    <span className="block text-xs font-mono tracking-wider text-text-faint uppercase mb-2">
                        03 / Projects
                    </span>
                    <h2 id="projects-heading" className="text-3xl font-semibold tracking-tight text-text-main">
                        Projects
                    </h2>
                    <p className="mt-2 text-sm text-text-muted max-w-[60ch]">
                        Some of the applications I've built.
                    </p>
                </div>

                {/* Project List */}
                <div className="space-y-8">
                    {project_data.map((item, idx) => (
                        <article
                            key={idx}
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
                            "
                        >
                            {/* Mouse Spotlight Aura */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"
                                style={{
                                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--spotlight), transparent 80%)`,
                                }}
                            />

                            <div className="relative z-10 grid md:grid-cols-12 gap-0 items-center">
                                {/* Screenshot Frame (approx 58% on desktop) */}
                                <div className="md:col-span-7 p-4 sm:p-6">
                                    <div className="border border-border rounded-[8px] overflow-hidden bg-bg/40 p-2 sm:p-2.5 shadow-sm group-hover:border-border/80 transition-colors">
                                        <div className="overflow-hidden rounded-[6px]">
                                            <img
                                                src={item.image}
                                                alt={`${item.label} project screenshot`}
                                                className="
                                                    w-full
                                                    h-auto
                                                    aspect-[16/10]
                                                    object-cover
                                                    transition-transform
                                                    duration-500
                                                    ease-out
                                                    group-hover:scale-[1.03]
                                                "
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Project Information (approx 42% on desktop) */}
                                <div className="md:col-span-5 p-6 md:pr-8 md:pl-2 flex flex-col justify-center">
                                    <h3 className="text-2xl font-semibold text-text-main mb-3 group-hover:text-text-main transition-colors">
                                        {item.label}
                                    </h3>

                                    <p className="text-sm leading-relaxed text-text-muted mb-6">
                                        {item.description}
                                    </p>

                                    {/* Mono Tech Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6" aria-label="Technologies used">
                                        {item.tech.map((tech, techIdx) => (
                                            <span
                                                key={techIdx}
                                                className="
                                                    px-2.5 py-1
                                                    rounded-[6px]
                                                    border border-border
                                                    bg-bg
                                                    text-xs
                                                    font-mono
                                                    text-text-muted
                                                    hover:border-accent/40
                                                    hover:text-text-main
                                                    hover:-translate-y-0.5
                                                    transition-all
                                                    duration-150
                                                    cursor-default
                                                "
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Labeled Action */}
                                    <div>
                                        <a
                                            href={item.web_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                                group/btn
                                                inline-flex items-center gap-1.5
                                                px-4 py-2
                                                rounded-[8px]
                                                border border-border
                                                bg-bg
                                                text-xs font-medium text-text-main
                                                hover:border-accent/60
                                                hover:bg-surface-2
                                                hover:-translate-y-0.5
                                                active:translate-y-0
                                                active:scale-[0.98]
                                                transition-all
                                                duration-150
                                            "
                                        >
                                            <span>Live demo</span>
                                            <ArrowUpRight
                                                size={14}
                                                className="text-text-muted group-hover/btn:text-accent group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all duration-150"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Projects;