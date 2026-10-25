import PageOrientation from "./PageOrientation";
import { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
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
import { Layers, ArrowUpRight } from "lucide-react";
import { navigate } from "../lib/router";
import { rawAnimate } from "../lib/anime";
import { useAnimationsEnabled } from "../lib/motion";

const TechStack = () => {
    const track1Ref = useRef(null);
    const track2Ref = useRef(null);
    const anim1Ref = useRef(null);
    const anim2Ref = useRef(null);
    const animationsEnabled = useAnimationsEnabled();
    // Stream rows for the kinetic moving ticker
    const row1 = [
        { name: "Python", icon: SiPython, level: "Advanced" },
        { name: "Django", icon: SiDjango, level: "Advanced" },
        { name: "FastAPI", icon: SiFastapi, level: "Proficient" },
        { name: "PostgreSQL", icon: SiPostgresql, level: "Advanced" },
        { name: "React 19", icon: SiReact, level: "Proficient" },
        { name: "Tailwind CSS", icon: SiTailwindcss, level: "Advanced" },
        { name: "Supabase", icon: SiSupabase, level: "Proficient" },
        { name: "Git & GitHub", icon: SiGit, level: "Advanced" },
    ];

    const row2 = [
        { name: "Django REST", icon: SiDjango, level: "Advanced" },
        { name: "SQLite3", icon: SiSqlite, level: "Proficient" },
        { name: "JavaScript", icon: SiJavascript, level: "Proficient" },
        { name: "Linux / CLI", icon: SiLinux, level: "Proficient" },
        { name: "Docker", icon: SiDocker, level: "Familiar" },
        { name: "Postman", icon: SiPostman, level: "Proficient" },
        { name: "Redis", icon: SiRedis, level: "Familiar" },
        { name: "Celery", icon: SiCelery, level: "Familiar" },
    ];

    useEffect(() => {
        if (!animationsEnabled) {
            anim1Ref.current?.pause?.();
            anim2Ref.current?.pause?.();
            return;
        }

        if (track1Ref.current) {
            anim1Ref.current = rawAnimate(track1Ref.current, {
                translateX: ["0%", "-50%"],
                duration: 28000,
                ease: "linear",
                loop: true,
                autoplay: true,
            });
        }

        if (track2Ref.current) {
            anim2Ref.current = rawAnimate(track2Ref.current, {
                translateX: ["-50%", "0%"],
                duration: 28000,
                ease: "linear",
                loop: true,
                autoplay: true,
            });
        }

        return () => {
            anim1Ref.current?.pause?.();
            anim2Ref.current?.pause?.();
        };
    }, [animationsEnabled]);

    const handleMouseEnter = () => {
        anim1Ref.current?.pause?.();
        anim2Ref.current?.pause?.();
    };

    const handleMouseLeave = () => {
        if (animationsEnabled) {
            anim1Ref.current?.play?.();
            anim2Ref.current?.play?.();
        }
    };

    return (
        <section id="skills" aria-labelledby="skills-heading" className="max-w-[1080px] mx-auto px-6 py-12 md:py-16">
            <ScrollReveal>
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                    <div>
                        <PageOrientation pageOrientation="Tech Stack" className="mb-1" />
                        <h2 id="skills-heading" className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-main">
                            Technologies & Tools
                        </h2>
                    </div>
                    <span className="text-xs font-mono text-text-muted">
                        // 16 dependencies
                    </span>
                </div>

                {/* Main Tech Console Card */}
                <div className="rounded-[12px] border border-border bg-surface overflow-hidden shadow-xs hover:border-text-faint/80 transition-colors">
                    {/* Console Header Bar */}
                    <div className="px-4 py-2 border-b border-border bg-bg/90 backdrop-blur-xs flex items-center justify-between text-xs font-mono text-text-faint">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            <span>env.manifest // core_stack</span>
                        </div>
                        <span className="text-[11px] text-text-muted">
                            Kinetic Stream
                        </span>
                    </div>

                    {/* KINETIC MOVING TICKER */}
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="py-4 space-y-2.5 overflow-hidden relative select-none"
                    >
                        {/* Side fade masks for smooth infinite visual clipping */}
                        <div
                            aria-hidden="true"
                            className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none"
                        />
                        <div
                            aria-hidden="true"
                            className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none"
                        />

                        {/* Track 1: Moving Left */}
                        <div
                            ref={track1Ref}
                            className="flex w-max gap-2.5 will-change-transform"
                        >
                            {[...row1, ...row1, ...row1, ...row1].map((skill, idx) => {
                                const Icon = skill.icon;
                                return (
                                    <div
                                        key={`r1-${idx}`}
                                        className="
                                            group flex items-center gap-2
                                            px-3 py-1.5
                                            rounded-[6px]
                                            bg-bg/70
                                            border border-border/80
                                            hover:border-accent/40
                                            hover:bg-bg
                                            transition-all
                                            duration-150
                                            cursor-default
                                            shrink-0
                                        "
                                    >
                                        <Icon
                                            size={13}
                                            className="text-text-muted group-hover:text-accent transition-colors shrink-0"
                                        />
                                        <span className="text-xs font-medium text-text-main group-hover:text-accent transition-colors whitespace-nowrap">
                                            {skill.name}
                                        </span>
                                        <span className="text-[9px] font-mono text-text-faint group-hover:text-text-muted transition-colors whitespace-nowrap">
                                            {skill.level}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Track 2: Moving Right */}
                        <div
                            ref={track2Ref}
                            className="flex w-max gap-2.5 will-change-transform"
                        >
                            {[...row2, ...row2, ...row2, ...row2].map((skill, idx) => {
                                const Icon = skill.icon;
                                return (
                                    <div
                                        key={`r2-${idx}`}
                                        className="
                                            group flex items-center gap-2
                                            px-3 py-1.5
                                            rounded-[6px]
                                            bg-bg/70
                                            border border-border/80
                                            hover:border-accent/40
                                            hover:bg-bg
                                            transition-all
                                            duration-150
                                            cursor-default
                                            shrink-0
                                        "
                                    >
                                        <Icon
                                            size={13}
                                            className="text-text-muted group-hover:text-accent transition-colors shrink-0"
                                        />
                                        <span className="text-xs font-medium text-text-main group-hover:text-accent transition-colors whitespace-nowrap">
                                            {skill.name}
                                        </span>
                                        <span className="text-[9px] font-mono text-text-faint group-hover:text-text-muted transition-colors whitespace-nowrap">
                                            {skill.level}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Console Footer: Link to Dedicated Tech Page */}
                    <div className="px-4 py-2.5 border-t border-border bg-bg/90 backdrop-blur-xs flex items-center justify-center">
                        <a
                            href="/tech"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/tech");
                            }}
                            className="
                                inline-flex items-center gap-2
                                px-4 py-1.5
                                rounded-[6px]
                                bg-surface-2
                                hover:bg-surface
                                border border-border
                                hover:border-accent/40
                                text-xs font-mono text-text-muted
                                hover:text-text-main
                                transition-all
                                duration-150
                                cursor-pointer
                            "
                        >
                            <Layers size={12} className="text-accent" />
                            <span>View full technology specification</span>
                            <ArrowUpRight size={12} className="text-text-faint" />
                        </a>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default TechStack;
