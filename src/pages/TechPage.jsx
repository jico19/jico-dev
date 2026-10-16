import { useState, useMemo, useEffect, useRef } from "react";
import {
    ArrowLeft,
    Search,
    Layers,
    ArrowUpRight,
    Sparkles,
    Terminal,
} from "lucide-react";
import {
    SiPython,
    SiDjango,
    SiFastapi,
    SiPostgresql,
    SiReact,
    SiJavascript,
    SiTailwindcss,
    SiSupabase,
    SiGit,
    SiPostman,
    SiSqlite,
    SiDocker,
    SiLinux,
    SiRedis,
    SiCelery,
} from "react-icons/si";
import { navigate } from "../lib/router";
import { animate, stagger } from "../lib/anime";
import { useAnimationsEnabled } from "../lib/motion";
import ThemeToggle from "../components/ThemeToggle";

const ALL_TECHNOLOGIES = [
    // Backend & APIs
    {
        name: "Python",
        category: "Backend",
        icon: SiPython,
        level: "Advanced",
        summary: "Primary language for backend services, data modeling, automated task pipelines, and scripts.",
        usage: "Used in FarmPass, healthcare SaaS backend, and automation workflows.",
    },
    {
        name: "Django",
        category: "Backend",
        icon: SiDjango,
        level: "Advanced",
        summary: "High-level web framework for scalable, secure web backends with robust ORM and admin capabilities.",
        usage: "Powers core municipal livestock permitting and geospatial engine in FarmPass.",
    },
    {
        name: "Django REST Framework",
        category: "Backend",
        icon: SiDjango,
        level: "Advanced",
        summary: "Toolkit for building flexible, browsable RESTful APIs with serializers and auth policies.",
        usage: "Built REST permit endpoints, payment verification, and mobile endpoints.",
    },
    {
        name: "FastAPI",
        category: "Backend",
        icon: SiFastapi,
        level: "Proficient",
        summary: "Modern, high-performance async framework based on standard Python type hints.",
        usage: "Engineered multi-tenant healthcare SaaS microservices for ST Business Consulting.",
    },
    {
        name: "Celery",
        category: "Backend",
        icon: SiCelery,
        level: "Familiar",
        summary: "Distributed task queue for background workers, asynchronous jobs, and scheduled jobs.",
        usage: "Used for background permit notifications, email delivery, and periodic checks.",
    },

    // Data & Cloud
    {
        name: "PostgreSQL",
        category: "Database",
        icon: SiPostgresql,
        level: "Advanced",
        summary: "Advanced relational database system with PostGIS geospatial spatial indexing and ACID compliance.",
        usage: "Architected geospatial schemas for zoning maps and healthcare client records.",
    },
    {
        name: "Supabase",
        category: "Database",
        icon: SiSupabase,
        level: "Proficient",
        summary: "Postgres-backed backend-as-a-service providing row-level security (RLS), real-time, and storage.",
        usage: "Powers state-scoped healthcare authorization, cryptographic logs, and document storage.",
    },
    {
        name: "SQLite3",
        category: "Database",
        icon: SiSqlite,
        level: "Proficient",
        summary: "Lightweight, zero-config relational database engine ideal for testing and rapid local prototypes.",
        usage: "Used for automated test suites (235+ tests) and offline local verification.",
    },
    {
        name: "Redis",
        category: "Database",
        icon: SiRedis,
        level: "Familiar",
        summary: "In-memory data store used as a high-speed cache, session broker, and message queue backend.",
        usage: "Employed for session rate-limiting, temporary token caching, and worker broker queues.",
    },

    // Frontend UI
    {
        name: "React 19",
        category: "Frontend",
        icon: SiReact,
        level: "Proficient",
        summary: "Declarative component library with Actions, optimistic state, and concurrent UI primitives.",
        usage: "Engineered responsive client dashboards for FarmPass, STBC SaaS, and developer portfolios.",
    },
    {
        name: "Tailwind CSS",
        category: "Frontend",
        icon: SiTailwindcss,
        level: "Advanced",
        summary: "Utility-first CSS framework for precision styling, responsive grids, and design tokens.",
        usage: "Styled modular components across all projects with custom dark/light color variables.",
    },
    {
        name: "JavaScript (ES6+)",
        category: "Frontend",
        icon: SiJavascript,
        level: "Proficient",
        summary: "Core client language leveraging modern async/await, closures, and DOM event architecture.",
        usage: "Interactive animations, custom cursor physics, and real-time state synchronization.",
    },

    // DevOps & Tooling
    {
        name: "Git & GitHub",
        category: "DevOps",
        icon: SiGit,
        level: "Advanced",
        summary: "Distributed version control system, branch workflows, pull requests, and automated actions.",
        usage: "Maintained team repositories, release tags, and version history across client projects.",
    },
    {
        name: "Linux / CLI",
        category: "DevOps",
        icon: SiLinux,
        level: "Proficient",
        summary: "UNIX environment navigation, Bash scripting, systemd service management, and SSH deployment.",
        usage: "Server provisioning, VPS deployment, environment configuration, and service monitoring.",
    },
    {
        name: "Postman",
        category: "DevOps",
        icon: SiPostman,
        level: "Proficient",
        summary: "API platform for designing, testing, and documenting HTTP and REST endpoints.",
        usage: "Created automated integration test collections and regression suites for permit endpoints.",
    },
    {
        name: "Docker",
        category: "DevOps",
        icon: SiDocker,
        level: "Familiar",
        summary: "Containerization platform to standardize application runtimes across development and production.",
        usage: "Containerized backend services and PostgreSQL instances for reproducible environments.",
    },
];

const CATEGORIES = ["All", "Backend", "Database", "Frontend", "DevOps"];

export const TechPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const gridRef = useRef(null);
    const animationsEnabled = useAnimationsEnabled();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredTech = useMemo(() => {
        return ALL_TECHNOLOGIES.filter((tech) => {
            const matchesCategory =
                selectedCategory === "All" || tech.category === selectedCategory;
            const matchesQuery =
                tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tech.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tech.usage.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesQuery;
        });
    }, [selectedCategory, searchQuery]);

    // Anime.js stagger on grid change
    useEffect(() => {
        if (!gridRef.current || !animationsEnabled) return;
        const cards = gridRef.current.querySelectorAll(".tech-card");
        if (!cards.length) return;

        animate(cards, {
            opacity: [0, 1],
            translateY: [12, 0],
            delay: stagger(35, { start: 30 }),
            duration: 300,
            ease: "outQuad",
        });
    }, [selectedCategory, searchQuery, animationsEnabled]);

    const handleBack = () => {
        navigate("/");
        // Wait briefly for route transition then scroll to skills section
        setTimeout(() => {
            const el = document.getElementById("skills");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }, 80);
    };

    return (
        <div className="min-h-screen bg-bg text-text-main py-12 md:py-20 px-6">
            <div className="max-w-[1080px] mx-auto">
                {/* Back navigation & breadcrumb */}
                <div className="flex items-center justify-between gap-4 mb-8">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="
                            inline-flex items-center gap-2
                            px-3.5 py-1.5
                            rounded-[8px]
                            bg-surface
                            border border-border
                            hover:border-accent/50
                            text-xs font-mono text-text-muted
                            hover:text-text-main
                            transition-all
                            cursor-pointer
                        "
                    >
                        <ArrowLeft size={14} className="text-accent" />
                        <span>Back to portfolio</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-text-faint">
                            <Terminal size={12} className="text-accent" />
                            <span>~/jico-dev/technologies</span>
                        </div>
                        <ThemeToggle />
                    </div>
                </div>

                {/* Page Title & Subtitle */}
                <div className="mb-10">
                    <span className="block text-xs font-mono tracking-wider text-text-faint uppercase mb-2">
                        System Architecture // Dependencies
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text-main mb-3">
                        Technologies & Tools
                    </h1>
                    <p className="text-sm sm:text-base text-text-muted max-w-[64ch] leading-relaxed">
                        A detailed breakdown of all languages, frameworks, databases, and developer infrastructure used to build scalable production applications.
                    </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8 p-1.5 rounded-[10px] bg-surface border border-border">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap items-center gap-1">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`
                                    px-3 py-1.5 rounded-[7px] text-xs font-mono transition-all duration-150 cursor-pointer
                                    ${
                                        selectedCategory === cat
                                            ? "bg-surface-2 text-text-main border border-border font-medium shadow-xs"
                                            : "text-text-muted hover:text-text-main border border-transparent"
                                    }
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative flex items-center min-w-[200px] sm:min-w-[240px]">
                        <Search
                            size={14}
                            className="absolute left-3 text-text-faint pointer-events-none"
                        />
                        <input
                            type="text"
                            placeholder="Filter by keyword..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="
                                w-full
                                h-8 pl-8 pr-3
                                rounded-[6px]
                                bg-bg
                                border border-border
                                text-xs font-mono text-text-main
                                placeholder:text-text-faint
                                focus:outline-hidden
                                focus:border-accent
                                transition-colors
                            "
                        />
                    </div>
                </div>

                {/* Technology Cards Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
                >
                    {filteredTech.map((tech) => {
                        const Icon = tech.icon;

                        return (
                            <div
                                key={tech.name}
                                className="
                                    tech-card
                                    p-5
                                    rounded-[12px]
                                    border border-border
                                    bg-surface
                                    hover:border-accent/40
                                    transition-all
                                    duration-200
                                    flex flex-col justify-between
                                    gap-4
                                    group
                                "
                            >
                                <div>
                                    {/* Card Header: Icon, Name, Category */}
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-[7px] bg-bg border border-border flex items-center justify-center text-accent group-hover:scale-105 transition-transform shrink-0">
                                                <Icon size={16} />
                                            </div>
                                            <div>
                                                <h2 className="text-sm font-semibold text-text-main group-hover:text-accent transition-colors">
                                                    {tech.name}
                                                </h2>
                                                <span className="text-[10px] font-mono text-text-faint">
                                                    {tech.category}
                                                </span>
                                            </div>
                                        </div>

                                        <span className="px-2 py-0.5 rounded-[4px] bg-bg border border-border text-[10px] font-mono text-text-muted">
                                            {tech.level}
                                        </span>
                                    </div>

                                    {/* Summary */}
                                    <p className="text-xs text-text-muted leading-relaxed mb-3">
                                        {tech.summary}
                                    </p>
                                </div>

                                {/* Usage footer */}
                                <div className="pt-2.5 border-t border-border/60">
                                    <div className="text-[11px] font-mono text-text-faint flex items-start gap-1.5 leading-snug">
                                        <span className="text-accent shrink-0">↳</span>
                                        <span>{tech.usage}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Inquiry Card */}
                <div className="p-6 sm:p-8 rounded-[12px] border border-border bg-surface flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
                    <div>
                        <h3 className="text-lg font-semibold text-text-main mb-1">
                            Need a custom architecture built?
                        </h3>
                        <p className="text-xs sm:text-sm text-text-muted max-w-[50ch]">
                            Available for fullstack web development, REST API engineering, and capstone system creation.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            navigate("/");
                            setTimeout(() => {
                                const el = document.getElementById("contact");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                            }, 80);
                        }}
                        className="
                            h-10 px-5
                            rounded-[8px]
                            bg-accent
                            text-accent-contrast
                            text-xs sm:text-sm font-medium
                            inline-flex items-center gap-2
                            hover:-translate-y-0.5
                            hover:brightness-95
                            transition-all
                            cursor-pointer
                            shrink-0
                        "
                    >
                        <span>Start a conversation</span>
                        <ArrowUpRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TechPage;
