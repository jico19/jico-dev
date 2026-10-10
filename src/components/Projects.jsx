import { useState } from "react";
import farmPass from "../assets/projects/farmpass.jpeg";
import { ArrowUpRight, Terminal, Image as ImageIcon, Braces, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Projects = () => {
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    // Tab state per project index: "preview" | "api" | "deploy"
    const [activeTabs, setActiveTabs] = useState({ 0: "preview" });

    const project_data = [
        {
            label: "FarmPass",
            slug: "farmpass",
            path: "~/projects/farmpass",
            image: farmPass,
            badge: "Municipal GIS & Permitting",
            tech: ["Django", "DRF", "React", "PostgreSQL"],
            description:
                "A capstone project for the Municipal Agriculture Office of Sariaya focused on digital permit processing and geospatial land parcel mapping.",
            web_link: "https://farmpass-ph.me/",
            api_data: {
                system: "FarmPass GIS & Permitting",
                client: "MAO Sariaya",
                status: "200 OK [Production]",
                backend: "Django REST Framework 3.14",
                database: "PostgreSQL + PostGIS",
                frontend: "React 18 + Tailwind",
                modules: [
                    "Geospatial land parcel mapping",
                    "Digital permit workflow pipeline",
                    "Applicant audit trail & reporting",
                ],
            },
            logs: [
                "$ jico run --target farmpass.service",
                "[08:12:01] Spatial GeoDjango engine: [OK]",
                "[08:12:02] PostgreSQL pool: [ESTABLISHED]",
                "[08:12:03] Binding REST /api/v1/permits: [ONLINE]",
                "[08:12:04] 412 agricultural parcels verified",
                "$ curl -I https://farmpass-ph.me/ -> 200 OK",
            ],
        },
    ];

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: -1000, y: -1000 });
    };

    const handleTabChange = (projIdx, tabKey) => {
        setActiveTabs((prev) => ({
            ...prev,
            [projIdx]: tabKey,
        }));
    };

    return (
        <section id="projects" aria-labelledby="projects-heading" className="max-w-[1080px] mx-auto px-6 py-16 md:py-24">
            <ScrollReveal>
                {/* Section Header */}
                <div className="mb-8 md:mb-10">
                    <span className="block text-xs font-mono tracking-wider text-text-faint uppercase mb-2">
                        03 / Projects
                    </span>
                    <h2 id="projects-heading" className="text-3xl font-semibold tracking-tight text-text-main">
                        Projects
                    </h2>
                    <p className="mt-2 text-sm text-text-muted max-w-[60ch]">
                        Applications, APIs, and systems I've built.
                    </p>
                </div>

                {/* Project List */}
                <div className="space-y-8">
                    {project_data.map((item, idx) => {
                        const currentTab = activeTabs[idx] || "preview";

                        return (
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

                                {/* Compact Terminal Window Header */}
                                <div className="relative z-10 px-3.5 py-2.5 border-b border-border bg-bg/90 backdrop-blur-xs flex items-center justify-between gap-2">
                                    {/* Left: Traffic Lights & Path */}
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-mono text-text-faint truncate">
                                            <span className="hidden sm:inline text-accent shrink-0">jico@dev:</span>
                                            <span className="truncate">{item.path}</span>
                                        </div>
                                    </div>

                                    {/* Right: Mobile-Compact Tabs */}
                                    <div className="flex items-center gap-0.5 bg-surface-2 p-0.5 rounded-[6px] border border-border shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => handleTabChange(idx, "preview")}
                                            className={`
                                                flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[11px] font-mono transition-all duration-150 cursor-pointer
                                                ${currentTab === "preview"
                                                    ? "bg-bg text-text-main font-medium border border-border/80 shadow-xs"
                                                    : "text-text-muted hover:text-text-main"}
                                            `}
                                        >
                                            <ImageIcon size={11} className={currentTab === "preview" ? "text-accent" : ""} />
                                            <span>preview</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleTabChange(idx, "api")}
                                            className={`
                                                flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[11px] font-mono transition-all duration-150 cursor-pointer
                                                ${currentTab === "api"
                                                    ? "bg-bg text-text-main font-medium border border-border/80 shadow-xs"
                                                    : "text-text-muted hover:text-text-main"}
                                            `}
                                        >
                                            <Braces size={11} className={currentTab === "api" ? "text-accent" : ""} />
                                            <span>api</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleTabChange(idx, "deploy")}
                                            className={`
                                                flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[11px] font-mono transition-all duration-150 cursor-pointer
                                                ${currentTab === "deploy"
                                                    ? "bg-bg text-text-main font-medium border border-border/80 shadow-xs"
                                                    : "text-text-muted hover:text-text-main"}
                                            `}
                                        >
                                            <Terminal size={11} className={currentTab === "deploy" ? "text-accent" : ""} />
                                            <span>logs</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Desktop Split-Pane / Mobile Stacked Body */}
                                <div className="relative z-10 p-3.5 sm:p-5 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">

                                    {/* Left: Viewport Pane (lg:col-span-7) */}
                                    <div className="lg:col-span-7">
                                        <div className="relative w-full aspect-[16/10] max-h-[210px] sm:max-h-[260px] lg:max-h-[290px] rounded-[8px] overflow-hidden border border-border bg-bg shadow-inner flex flex-col justify-center">

                                            {/* TAB 1: GUI Preview Viewport */}
                                            {currentTab === "preview" && (
                                                <div className="relative w-full h-full group/preview overflow-hidden bg-[#0A0A0B] flex items-center justify-center">
                                                    <img
                                                        src={item.image}
                                                        alt={`${item.label} project screenshot`}
                                                        className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/preview:scale-[1.02]"
                                                    />

                                                    {/* Desktop Corner Coordinates */}
                                                    <div className="hidden sm:block absolute top-2 left-2 px-1.5 py-0.5 rounded-[4px] bg-bg/90 backdrop-blur-xs border border-border text-[9px] font-mono text-text-faint pointer-events-none">
                                                        [+] 1920x1080
                                                    </div>
                                                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-[4px] bg-bg/90 backdrop-blur-xs border border-border text-[9px] font-mono text-accent pointer-events-none flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                                        <span>LIVE</span>
                                                    </div>
                                                    <div className="hidden sm:block absolute bottom-2 left-2 px-1.5 py-0.5 rounded-[4px] bg-bg/90 backdrop-blur-xs border border-border text-[9px] font-mono text-text-faint pointer-events-none">
                                                        LAT: 13.96° N / LON: 121.52° E
                                                    </div>
                                                </div>
                                            )}

                                            {/* TAB 2: API Specification (Compact JSON) */}
                                            {currentTab === "api" && (
                                                <div className="w-full h-full p-3 sm:p-4 overflow-y-auto font-mono text-[10px] sm:text-[11px] bg-surface leading-tight flex flex-col">
                                                    <div className="text-text-faint mb-1.5 pb-1 border-b border-border flex items-center justify-between text-[10px]">
                                                        <span>// GET /api/v1/specs</span>
                                                        <span className="text-accent">200 OK</span>
                                                    </div>
                                                    <pre className="text-text-muted overflow-x-auto whitespace-pre leading-relaxed">
                                                        <code>
{`{
  `}<span className="text-accent">"system"</span>{`: `}<span className="text-text-main">"{item.api_data.system}"</span>{`,
  `}<span className="text-accent">"status"</span>{`: `}<span className="text-accent">"{item.api_data.status}"</span>{`,
  `}<span className="text-accent">"backend"</span>{`: `}<span className="text-text-main">"{item.api_data.backend}"</span>{`,
  `}<span className="text-accent">"database"</span>{`: `}<span className="text-text-main">"{item.api_data.database}"</span>{`,
  `}<span className="text-accent">"modules"</span>{`: [
`}{item.api_data.modules.map((m, mIdx) => `    "${m}"${mIdx < item.api_data.modules.length - 1 ? "," : ""}`).join("\n")}{`
  ]
}`}
                                                        </code>
                                                    </pre>
                                                </div>
                                            )}

                                            {/* TAB 3: CLI Deployment Logs */}
                                            {currentTab === "deploy" && (
                                                <div className="w-full h-full p-3 sm:p-4 overflow-y-auto font-mono text-[10px] sm:text-[11px] bg-[#0A0A0B] text-[#EDEDEF] leading-relaxed flex flex-col">
                                                    <div className="text-text-faint mb-2 pb-1 border-b border-border/60 flex items-center justify-between text-[10px]">
                                                        <span className="flex items-center gap-1 text-accent">
                                                            <Sparkles size={10} />
                                                            <span>pipeline.log</span>
                                                        </span>
                                                        <span className="text-text-faint">UTC+8</span>
                                                    </div>

                                                    <div className="space-y-1">
                                                        {item.logs.map((line, logIdx) => (
                                                            <div
                                                                key={logIdx}
                                                                className={
                                                                    line.startsWith("$")
                                                                        ? "text-accent font-semibold"
                                                                        : line.includes("[OK]") || line.includes("200 OK")
                                                                        ? "text-text-muted"
                                                                        : "text-text-faint"
                                                                }
                                                            >
                                                                {line}
                                                            </div>
                                                        ))}
                                                        <div className="flex items-center gap-1 pt-1 text-accent">
                                                            <span>$</span>
                                                            <span className="inline-block w-1.5 h-3 bg-accent animate-pulse" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right: Project Information Pane (lg:col-span-5) */}
                                    <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-2 py-0.5 rounded-[4px] bg-surface-2 border border-border text-[10px] font-mono text-accent">
                                                    {item.badge}
                                                </span>
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-semibold text-text-main">
                                                {item.label}
                                            </h3>
                                        </div>

                                        <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                                            {item.description}
                                        </p>

                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-1.5 pt-0.5" aria-label="Technologies used">
                                            {item.tech.map((tech, techIdx) => (
                                                <span
                                                    key={techIdx}
                                                    className="
                                                        px-2 py-0.5
                                                        rounded-[5px]
                                                        border border-border
                                                        bg-bg
                                                        text-[11px]
                                                        font-mono
                                                        text-text-muted
                                                        hover:border-accent/40
                                                        hover:text-text-main
                                                        transition-colors
                                                        cursor-default
                                                    "
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Button */}
                                        <div className="pt-2">
                                            <a
                                                href={item.web_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="
                                                    group/btn
                                                    inline-flex items-center justify-center gap-1.5
                                                    w-full sm:w-auto
                                                    px-3.5 py-1.5
                                                    rounded-[6px]
                                                    border border-accent/40
                                                    bg-accent/10
                                                    text-xs font-mono font-medium text-text-main
                                                    hover:border-accent
                                                    hover:bg-accent
                                                    hover:text-accent-contrast
                                                    hover:-translate-y-0.5
                                                    active:translate-y-0
                                                    active:scale-[0.98]
                                                    transition-all
                                                    duration-150
                                                "
                                            >
                                                <span>$ open live_site</span>
                                                <ArrowUpRight
                                                    size={13}
                                                    className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-150"
                                                />
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </article>
                        );
                    })}
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Projects;