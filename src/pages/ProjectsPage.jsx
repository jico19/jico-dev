import { useState, useEffect, useRef } from "react";
import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    ShieldCheck,
    CheckCircle2,
    Layers,
    Globe,
    Lock,
    Building2,
    Calendar,
    Briefcase,
    Cpu,
} from "lucide-react";
import { PROJECT_DATA } from "../data/projectsData";
import { navigate } from "../lib/router";
import { animate } from "../lib/anime";
import { useAnimationsEnabled } from "../lib/motion";
import ThemeToggle from "../components/ThemeToggle";

export const ProjectsPage = () => {
    const getInitialSlug = () => {
        if (typeof window === "undefined") return PROJECT_DATA[0].slug;
        const hash = window.location.hash.replace(/^#/, "");
        if (PROJECT_DATA.some((p) => p.slug === hash)) return hash;
        const params = new URLSearchParams(window.location.search);
        const querySlug = params.get("project");
        if (querySlug && PROJECT_DATA.some((p) => p.slug === querySlug)) return querySlug;
        return PROJECT_DATA[0].slug;
    };

    const [selectedSlug, setSelectedSlug] = useState(getInitialSlug);
    const contentRef = useRef(null);
    const animationsEnabled = useAnimationsEnabled();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const currentProject =
        PROJECT_DATA.find((p) => p.slug === selectedSlug) || PROJECT_DATA[0];

    const currentIndex = PROJECT_DATA.findIndex((p) => p.slug === currentProject.slug);
    const nextProject = PROJECT_DATA[(currentIndex + 1) % PROJECT_DATA.length];

    const handleSelectProject = (slug) => {
        if (slug === selectedSlug) return;
        setSelectedSlug(slug);
        try {
            window.history.replaceState(null, "", `#${slug}`);
        } catch {
            // ignore
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Smooth transition when switching projects
    useEffect(() => {
        if (!contentRef.current || !animationsEnabled) return;
        animate(contentRef.current, {
            opacity: [0.35, 1],
            translateY: [8, 0],
            duration: 240,
            ease: "outQuad",
        });
    }, [selectedSlug, animationsEnabled]);

    const handleBack = () => {
        navigate("/");
        setTimeout(() => {
            const el = document.getElementById("projects");
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    return (
        <div className="min-h-screen bg-bg text-text-main py-8 md:py-14 px-5 sm:px-6">
            <div className="max-w-[960px] mx-auto">
                {/* Header & Navigation Bar */}
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-border/80">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="
                                inline-flex items-center gap-2
                                px-3 py-1.5
                                rounded-[8px]
                                bg-surface
                                border border-border
                                hover:border-accent/40
                                text-xs font-mono text-text-muted
                                hover:text-text-main
                                transition-all
                                cursor-pointer
                            "
                        >
                            <ArrowLeft size={13} className="text-accent" />
                            <span>Back to portfolio</span>
                        </button>

                        <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-text-faint">
                            <span>/</span>
                            <span>Case Studies</span>
                            <span>/</span>
                            <span className="text-text-muted">{currentProject.label}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {currentProject.web_link && (
                            <a
                                href={currentProject.web_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    inline-flex items-center gap-1.5
                                    px-3 py-1.5
                                    rounded-[8px]
                                    bg-surface
                                    border border-border
                                    hover:border-accent/40
                                    text-xs font-mono text-accent
                                    hover:text-text-main
                                    transition-all
                                "
                            >
                                <span>Live Site</span>
                                <ExternalLink size={12} />
                            </a>
                        )}
                        <ThemeToggle />
                    </div>
                </header>

                {/* Project Segmented Tabs */}
                <nav
                    aria-label="Case study selector"
                    className="flex flex-wrap items-center gap-2 p-1.5 rounded-[12px] bg-surface border border-border mb-10"
                >
                    {PROJECT_DATA.map((proj, idx) => {
                        const isSelected = selectedSlug === proj.slug;
                        return (
                            <button
                                key={proj.slug}
                                type="button"
                                onClick={() => handleSelectProject(proj.slug)}
                                className={`
                                    flex items-center gap-2 px-4 py-2 rounded-[8px] text-xs font-mono transition-all duration-150 cursor-pointer text-left
                                    ${
                                        isSelected
                                            ? "bg-surface-2 text-text-main font-semibold shadow-xs border border-border"
                                            : "text-text-muted hover:text-text-main hover:bg-surface-2/50 border border-transparent"
                                    }
                                `}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-accent animate-pulse" : "bg-text-faint/50"}`} />
                                <span className="text-text-faint">0{idx + 1}.</span>
                                <span>{proj.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Main Case Study Content */}
                <article ref={contentRef} className="space-y-12">
                    {/* Case Study Hero */}
                    <div className="space-y-6">
                        {/* Status & Badge Row */}
                        <div className="flex flex-wrap items-center gap-2.5">
                            <span className="px-2.5 py-1 rounded-[6px] bg-surface border border-border text-xs font-mono text-text-muted">
                                {currentProject.category}
                            </span>
                            <span className="px-2.5 py-1 rounded-[6px] bg-accent/10 border border-accent/30 text-xs font-mono text-accent inline-flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                {currentProject.status}
                            </span>
                            {currentProject.confidential && (
                                <span className="px-2.5 py-1 rounded-[6px] bg-surface-2 border border-border text-xs font-mono text-text-faint inline-flex items-center gap-1">
                                    <Lock size={11} className="text-text-faint" />
                                    <span>Enterprise Client</span>
                                </span>
                            )}
                        </div>

                        {/* Title & Overview */}
                        <div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text-main mb-4 leading-tight">
                                {currentProject.label}
                            </h1>
                            <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-[76ch]">
                                {currentProject.fullDescription}
                            </p>
                        </div>

                        {/* Project Metadata Card */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-[12px] bg-surface border border-border">
                            <div className="space-y-1">
                                <div className="text-[11px] font-mono text-text-faint uppercase flex items-center gap-1.5">
                                    <Briefcase size={12} className="text-accent" />
                                    <span>Role</span>
                                </div>
                                <div className="text-xs sm:text-sm font-medium text-text-main">
                                    {currentProject.role}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-[11px] font-mono text-text-faint uppercase flex items-center gap-1.5">
                                    <Building2 size={12} className="text-accent" />
                                    <span>Client</span>
                                </div>
                                <div className="text-xs sm:text-sm font-medium text-text-main">
                                    {currentProject.client}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-[11px] font-mono text-text-faint uppercase flex items-center gap-1.5">
                                    <Calendar size={12} className="text-accent" />
                                    <span>Timeline</span>
                                </div>
                                <div className="text-xs sm:text-sm font-medium text-text-main">
                                    {currentProject.timeline}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-[11px] font-mono text-text-faint uppercase flex items-center gap-1.5">
                                    <Globe size={12} className="text-accent" />
                                    <span>Access</span>
                                </div>
                                <div>
                                    {currentProject.web_link ? (
                                        <a
                                            href={currentProject.web_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs sm:text-sm font-medium text-accent hover:underline inline-flex items-center gap-1"
                                        >
                                            <span>Live Platform</span>
                                            <ExternalLink size={11} />
                                        </a>
                                    ) : (
                                        <span className="text-xs sm:text-sm font-medium text-text-faint">
                                            Private Infrastructure
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visual Media Showcase */}
                    {currentProject.image ? (
                        <div className="rounded-[12px] overflow-hidden border border-border bg-[#0A0A0B] shadow-sm">
                            {/* Browser-style Chrome Bar */}
                            <div className="px-4 py-2.5 border-b border-border bg-surface flex items-center justify-between text-xs font-mono text-text-faint">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                                </div>
                                <div className="px-3 py-1 rounded-[6px] bg-bg border border-border text-[11px] text-text-muted flex items-center gap-1.5">
                                    <Lock size={10} className="text-accent" />
                                    <span>farmpass-ph.me</span>
                                </div>
                                <div className="w-12 text-right">
                                    <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
                                </div>
                            </div>

                            <img
                                src={currentProject.image}
                                alt={`${currentProject.label} user interface`}
                                className="w-full h-auto object-cover object-top max-h-[500px]"
                            />
                        </div>
                    ) : (
                        <div className="p-8 sm:p-10 rounded-[12px] border border-border bg-surface text-center space-y-4">
                            <div className="w-12 h-12 rounded-full bg-surface-2 border border-border text-accent flex items-center justify-center mx-auto">
                                <ShieldCheck size={24} />
                            </div>
                            <div className="space-y-1.5 max-w-[50ch] mx-auto">
                                <h3 className="text-base font-semibold text-text-main">
                                    Enterprise Confidentiality Architecture
                                </h3>
                                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                                    Production healthcare interfaces and client patient data are governed under non-disclosure agreements. System architecture and engineering specifications are shared below.
                                </p>
                            </div>
                            <div className="pt-2 flex flex-wrap justify-center gap-2">
                                <span className="px-2.5 py-1 rounded-[6px] bg-surface-2 border border-border text-[11px] font-mono text-text-muted">
                                    Multi-Tenant (FL, IN, GA)
                                </span>
                                <span className="px-2.5 py-1 rounded-[6px] bg-surface-2 border border-border text-[11px] font-mono text-text-muted">
                                    PostgreSQL RLS
                                </span>
                                <span className="px-2.5 py-1 rounded-[6px] bg-surface-2 border border-border text-[11px] font-mono text-text-muted">
                                    SHA-256 E-Signatures
                                </span>
                                <span className="px-2.5 py-1 rounded-[6px] bg-surface-2 border border-border text-[11px] font-mono text-text-muted">
                                    235+ Passing Tests
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Section 01: The Problem & Operational Context */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-faint">
                            <span className="text-accent font-bold">01</span>
                            <span>/</span>
                            <span>The Problem & Operational Context</span>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[12px] bg-surface border border-border space-y-3">
                            <h2 className="text-lg sm:text-xl font-semibold text-text-main">
                                Legacy Bottlenecks & Regulatory Stakes
                            </h2>
                            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                                {currentProject.challenge}
                            </p>
                            {currentProject.solution && (
                                <div className="mt-4 pt-4 border-t border-border/70 text-xs sm:text-sm text-text-main leading-relaxed flex items-start gap-2.5">
                                    <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                                    <span>{currentProject.solution}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Section 02: System Architecture */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-faint">
                            <span className="text-accent font-bold">02</span>
                            <span>/</span>
                            <span>System Architecture & Engineering</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div className="p-4 sm:p-5 rounded-[10px] border border-border bg-surface space-y-2">
                                <div className="flex items-center gap-2 text-xs font-mono text-accent">
                                    <Layers size={13} />
                                    <span>Client Tier (Frontend)</span>
                                </div>
                                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                                    {currentProject.architecture.clientTier}
                                </p>
                            </div>

                            <div className="p-4 sm:p-5 rounded-[10px] border border-border bg-surface space-y-2">
                                <div className="flex items-center gap-2 text-xs font-mono text-accent">
                                    <Cpu size={13} />
                                    <span>API & Application Tier</span>
                                </div>
                                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                                    {currentProject.architecture.apiTier}
                                </p>
                            </div>

                            <div className="p-4 sm:p-5 rounded-[10px] border border-border bg-surface space-y-2">
                                <div className="flex items-center gap-2 text-xs font-mono text-accent">
                                    <Building2 size={13} />
                                    <span>Database & Spatial Storage</span>
                                </div>
                                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                                    {currentProject.architecture.dataTier}
                                </p>
                            </div>

                            <div className="p-4 sm:p-5 rounded-[10px] border border-border bg-surface space-y-2">
                                <div className="flex items-center gap-2 text-xs font-mono text-accent">
                                    <ShieldCheck size={13} />
                                    <span>Security & Integrations</span>
                                </div>
                                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                                    {currentProject.architecture.integrations}
                                </p>
                            </div>
                        </div>

                        {/* Technology Stack Pills */}
                        <div className="pt-2">
                            <span className="text-xs font-mono text-text-faint block mb-2">Technologies Used:</span>
                            <div className="flex flex-wrap gap-2">
                                {currentProject.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="px-3 py-1 rounded-[6px] bg-surface-2 border border-border text-xs font-mono text-text-main"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Section 03: Implementation Highlights */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-faint">
                            <span className="text-accent font-bold">03</span>
                            <span>/</span>
                            <span>Implementation & Key Solutions</span>
                        </div>

                        <div className="space-y-3">
                            {currentProject.buildSteps.map((step) => (
                                <div
                                    key={step.stepNumber}
                                    className="p-5 rounded-[10px] bg-surface border border-border flex items-start gap-4 hover:border-border/90 transition-colors"
                                >
                                    <span className="w-8 h-8 rounded-[6px] bg-surface-2 border border-border flex items-center justify-center font-mono text-xs font-bold text-accent shrink-0">
                                        {step.stepNumber}
                                    </span>
                                    <div className="space-y-1.5">
                                        <h3 className="text-sm sm:text-base font-semibold text-text-main">
                                            {step.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 04: Production Metrics & Impact */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-faint">
                            <span className="text-accent font-bold">04</span>
                            <span>/</span>
                            <span>Production Impact & Results</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                            {currentProject.metrics.map((m, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 rounded-[10px] border border-border bg-surface flex flex-col justify-between gap-2"
                                >
                                    <span className="text-[11px] font-mono text-text-faint uppercase">
                                        {m.label}
                                    </span>
                                    <span className="text-2xl sm:text-3xl font-bold font-mono text-accent tracking-tight">
                                        {m.value}
                                    </span>
                                    {m.description && (
                                        <span className="text-[11px] text-text-muted leading-snug">
                                            {m.description}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Next Case Study Card */}
                    <div className="p-6 rounded-[12px] border border-border bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <span className="text-[11px] font-mono text-text-faint uppercase">Next Case Study</span>
                            <h3 className="text-base font-semibold text-text-main">
                                {nextProject.label}
                            </h3>
                            <p className="text-xs text-text-muted max-w-[50ch]">
                                {nextProject.shortDescription}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleSelectProject(nextProject.slug)}
                            className="
                                px-4 py-2
                                rounded-[8px]
                                bg-surface-2
                                hover:bg-surface
                                border border-border
                                hover:border-accent/50
                                text-xs font-mono text-text-main
                                inline-flex items-center gap-2
                                transition-all
                                cursor-pointer
                                shrink-0
                            "
                        >
                            <span>Read case study</span>
                            <ArrowRight size={13} className="text-accent" />
                        </button>
                    </div>

                    {/* Footer Actions */}
                    <footer className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="
                                inline-flex items-center gap-2
                                text-xs font-mono text-text-muted
                                hover:text-text-main
                                transition-colors
                                cursor-pointer
                            "
                        >
                            <ArrowLeft size={13} className="text-accent" />
                            <span>Return to main portfolio</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                navigate("/");
                                setTimeout(() => {
                                    const el = document.getElementById("contact");
                                    if (el) el.scrollIntoView({ behavior: "smooth" });
                                }, 100);
                            }}
                            className="
                                h-9 px-4
                                rounded-[8px]
                                bg-accent
                                text-accent-contrast
                                text-xs font-medium
                                inline-flex items-center gap-1.5
                                hover:brightness-95
                                transition-all
                                cursor-pointer
                            "
                        >
                            <span>Discuss a project</span>
                            <ArrowRight size={13} />
                        </button>
                    </footer>
                </article>
            </div>
        </div>
    );
};

export default ProjectsPage;
