import { useState, useRef, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import {
    Code2,
    ArrowRight,
    Terminal,
    Layers,
    Database,
    ShieldCheck,
} from "lucide-react";
import { animate } from "../lib/anime";
import { useAnimationsEnabled } from "../lib/motion";

const Services = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const contentRef = useRef(null);
    const animationsEnabled = useAnimationsEnabled();

    const services = [
        {
            id: "fullstack",
            number: "01",
            tabLabel: "Fullstack Engineering",
            title: "Fullstack Web Engineering",
            badge: "Production & SaaS",
            icon: Code2,
            route: "POST /services/fullstack/dispatch",
            description:
                "Engineering scalable, production-ready web applications from intuitive React frontends to robust REST backends and optimized PostgreSQL schemas.",
            pillars: [
                {
                    label: "01 // Frontend Systems",
                    icon: Layers,
                    detail: "Single-page apps built with React 19, Tailwind CSS, accessible semantics, and fluid animations.",
                },
                {
                    label: "02 // Backend & APIs",
                    icon: Terminal,
                    detail: "High-throughput REST APIs built with FastAPI or Django REST Framework with clean domain architecture.",
                },
                {
                    label: "03 // Database Modeling",
                    icon: Database,
                    detail: "Relational schema design, migrations, indexing, and egress optimization in PostgreSQL & Supabase.",
                },
                {
                    label: "04 // Security & Integrations",
                    icon: ShieldCheck,
                    detail: "Role-based access control, cryptographic verification, PayMongo payment gateways, and cloud deployment.",
                },
            ],
            tech: ["React 19", "FastAPI", "Django REST", "PostgreSQL", "Supabase", "PayMongo"],
            actionText: "Inquire for Project",
        }
    ];

    const currentService = services[activeIndex];

    // Anime.js smooth transition on tab change
    useEffect(() => {
        if (!contentRef.current || !animationsEnabled) return;

        animate(contentRef.current, {
            opacity: [0.35, 1],
            translateY: [6, 0],
            duration: 260,
            ease: "outQuad",
        });
    }, [activeIndex, animationsEnabled]);

    const scrollToContact = (e) => {
        e.preventDefault();
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            const navOffset = 70;
            const elementPosition = contactSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - navOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
            window.history.pushState(null, "", "#contact");
        }
    };

    return (
        <section id="services" aria-labelledby="services-heading" className="max-w-[1080px] mx-auto px-6 py-16 md:py-24">
            <ScrollReveal>
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <span className="block text-xs font-mono tracking-wider text-text-faint uppercase mb-2">
                            03 / Services
                        </span>
                        <h2 id="services-heading" className="text-3xl font-semibold tracking-tight text-text-main">
                            Engineering Solutions
                        </h2>
                        <p className="mt-2 text-sm text-text-muted max-w-[54ch]">
                            Interactive service registry for client web applications and academic capstone engineering.
                        </p>
                    </div>

                    {/* Console Tab Selector */}
                    <div
                        role="tablist"
                        aria-label="Service offerings"
                        className="flex items-center p-1 rounded-[10px] bg-surface border border-border w-fit shrink-0 select-none shadow-xs"
                    >
                        {services.map((svc, idx) => {
                            const isSelected = activeIndex === idx;
                            const Icon = svc.icon;

                            return (
                                <button
                                    key={svc.id}
                                    role="tab"
                                    aria-selected={isSelected}
                                    aria-controls={`service-panel-${svc.id}`}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`
                                        flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-[7px] text-xs font-mono transition-all duration-150 cursor-pointer
                                        ${
                                            isSelected
                                                ? "bg-surface-2 text-text-main border border-border font-medium shadow-xs"
                                                : "text-text-muted hover:text-text-main border border-transparent"
                                        }
                                    `}
                                >
                                    <Icon
                                        size={14}
                                        className={isSelected ? "text-accent" : "text-text-faint"}
                                    />
                                    <span>SYS.{svc.number}</span>
                                    <span className="hidden sm:inline">// {svc.tabLabel}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Console Main Window */}
                <div
                    id={`service-panel-${currentService.id}`}
                    role="tabpanel"
                    className="
                        relative
                        rounded-[12px]
                        border border-border
                        bg-surface
                        overflow-hidden
                        shadow-sm
                        transition-colors
                        duration-200
                        hover:border-text-faint/80
                    "
                >
                    {/* Console Top Navigation Bar */}
                    <div className="px-4 py-2.5 border-b border-border bg-bg/90 backdrop-blur-xs flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-text-muted">{currentService.route}</span>
                        </div>
                        <span className="text-[11px] font-mono text-text-muted">
                            {currentService.badge}
                        </span>
                    </div>

                    {/* Console Content Area */}
                    <div
                        ref={contentRef}
                        className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
                    >
                        {/* Left Column: Scope, Tech & Direct CTA (lg:col-span-5) */}
                        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-semibold text-text-main tracking-tight mb-2.5">
                                    {currentService.title}
                                </h3>
                                <p className="text-sm text-text-muted leading-relaxed">
                                    {currentService.description}
                                </p>
                            </div>

                            {/* Tech Stack Matrix */}
                            <div>
                                <span className="block text-[11px] font-mono text-text-faint uppercase tracking-wider mb-2">
                                    Target Technologies
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                    {currentService.tech.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0.5 rounded-[5px] bg-bg border border-border text-[11px] font-mono text-text-muted"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Dispatch Button */}
                            <div className="pt-2">
                                <a
                                    href="#contact"
                                    onClick={scrollToContact}
                                    className="
                                        w-full sm:w-auto
                                        h-10 px-5
                                        inline-flex items-center justify-center gap-2
                                        rounded-[8px]
                                        bg-accent
                                        text-accent-contrast
                                        text-xs sm:text-sm font-medium
                                        hover:-translate-y-0.5
                                        hover:brightness-95
                                        active:translate-y-0
                                        active:scale-[0.98]
                                        transition-all
                                        duration-150
                                        cursor-pointer
                                    "
                                >
                                    <span>{currentService.actionText}</span>
                                    <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Architectural Deliverables Matrix (lg:col-span-7) */}
                        <div className="lg:col-span-7 space-y-2.5">
                            <span className="block text-[11px] font-mono text-text-faint uppercase tracking-wider mb-2">
                                Architectural Deliverables & Scope
                            </span>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {currentService.pillars.map((pillar, idx) => {
                                    const PillarIcon = pillar.icon;

                                    return (
                                        <div
                                            key={idx}
                                            className="
                                                p-3.5
                                                rounded-[8px]
                                                border border-border
                                                bg-bg/60
                                                hover:bg-bg
                                                hover:border-accent/40
                                                transition-all
                                                duration-150
                                                flex flex-col justify-between
                                                gap-2
                                                group
                                            "
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-[5px] bg-surface-2 border border-border flex items-center justify-center text-accent shrink-0 group-hover:scale-105 transition-transform">
                                                    <PillarIcon size={13} />
                                                </div>
                                                <span className="text-xs font-mono font-medium text-text-main">
                                                    {pillar.label}
                                                </span>
                                            </div>

                                            <p className="text-[11px] text-text-muted leading-relaxed">
                                                {pillar.detail}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Verification Footnote */}
                            <div className="px-3 py-2 rounded-[6px] bg-surface-2/60 border border-border/80 flex items-center justify-between text-[11px] font-mono text-text-faint">
                                <span>// SLA: Direct developer communication</span>
                                <span className="text-accent">100% defense & deploy record</span>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Services;
