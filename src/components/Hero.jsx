import { useState, useEffect, useRef } from "react";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import { useAnimationsEnabled } from "../lib/motion";
import { animate, createTimeline, stagger, scrambleText } from "../lib/anime";

const ORIGINAL_TITLE = "Hi, I'm Jerwin Nico";
const ASCII_CHARS = "!<>-_\\/[]{}—=+*^?#________0101";
const ROLES = [
    "Backend Developer",
    "Full Stack Developer",
    "API & Systems Builder",
];

const Hero = () => {
    const animationsEnabled = useAnimationsEnabled();
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const scrambleAnimRef = useRef(null);

    const tech_stacks = ["Django", "DRF", "Python", "PostgreSQL", "React"];

    const social_links = [
        {
            label: "GitHub",
            link: "https://github.com/jico19",
            icon: FaGithub,
        },
        {
            label: "Facebook",
            link: "https://www.facebook.com/Ekkosecc",
            icon: FaFacebook,
        },
    ];

    const scrollToProjects = (e) => {
        e.preventDefault();
        const el = document.getElementById("projects");
        if (el) {
            const navOffset = 70;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - navOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
            window.history.pushState(null, "", "#projects");
        }
    };

    // Anime.js Entrance timeline
    useEffect(() => {
        if (!containerRef.current) return;

        const targets = containerRef.current.querySelectorAll(".hero-anim-item");
        if (!targets.length) return;

        if (!animationsEnabled) {
            targets.forEach((el) => {
                el.style.opacity = "1";
                el.style.transform = "none";
            });
            return;
        }

        const tl = createTimeline({
            defaults: {
                ease: "outCubic",
                duration: 650,
            },
        });

        tl.add(targets, {
            opacity: [0, 1],
            translateY: [16, 0],
            delay: stagger(80, { start: 60 }),
        });

        return () => {
            tl.pause?.();
        };
    }, [animationsEnabled]);

    // Anime.js ASCII Scramble on hover
    const handleTitleMouseEnter = () => {
        if (!animationsEnabled || !titleRef.current) return;

        if (scrambleAnimRef.current) {
            scrambleAnimRef.current.pause?.();
        }

        scrambleAnimRef.current = animate(titleRef.current, {
            textContent: scrambleText(ORIGINAL_TITLE, {
                characters: ASCII_CHARS,
                duration: 650,
                from: "random",
            }),
        });
    };

    const handleTitleMouseLeave = () => {
        if (scrambleAnimRef.current) {
            scrambleAnimRef.current.pause?.();
            scrambleAnimRef.current = null;
        }
        if (titleRef.current) {
            titleRef.current.textContent = ORIGINAL_TITLE;
        }
    };

    // Typewriter effect for Roles
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayedRole, setDisplayedRole] = useState(ROLES[0]);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!animationsEnabled) {
            setDisplayedRole(ROLES[currentRoleIndex]);
            return;
        }

        const fullRole = ROLES[currentRoleIndex];
        const typingSpeed = isDeleting ? 35 : 70;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (displayedRole.length < fullRole.length) {
                    setDisplayedRole(fullRole.slice(0, displayedRole.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (displayedRole.length > 0) {
                    setDisplayedRole(fullRole.slice(0, displayedRole.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayedRole, isDeleting, currentRoleIndex, animationsEnabled]);

    return (
        <section
            ref={containerRef}
            id="home"
            className="max-w-[1080px] mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24"
        >
            <div className="max-w-3xl">
                {/* H1 Title with Anime.js ASCII scramble on hover */}
                <h1
                    ref={titleRef}
                    onMouseEnter={handleTitleMouseEnter}
                    onMouseLeave={handleTitleMouseLeave}
                    className="hero-anim-item text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-text-main leading-[1.08] mb-3 cursor-default select-none font-sans"
                    style={{ opacity: 0, transform: "translateY(16px)" }}
                >
                    {ORIGINAL_TITLE}
                </h1>

                {/* Role with Typewriter effect */}
                <p
                    className="hero-anim-item text-xl md:text-2xl text-text-muted font-normal mb-6 min-h-[1.75em] flex items-center font-mono"
                    style={{ opacity: 0, transform: "translateY(16px)" }}
                >
                    <span>{displayedRole}</span>
                    <span
                        className="inline-block w-[2px] h-[1em] ml-1 bg-accent animate-pulse"
                        aria-hidden="true"
                    />
                </p>

                {/* About description */}
                <p
                    className="hero-anim-item text-base md:text-lg text-text-muted leading-relaxed max-w-[62ch] mb-6"
                    style={{ opacity: 0, transform: "translateY(16px)" }}
                >
                    I build secure and scalable web applications using Django, Django REST Framework,
                    PostgreSQL, and React. Currently pursuing a BSIT degree while developing
                    backend-focused projects and REST APIs.
                </p>

                {/* Interactive Tech Stack Tags */}
                <div
                    className="hero-anim-item flex flex-wrap items-center gap-2 mb-8"
                    style={{ opacity: 0, transform: "translateY(16px)" }}
                    aria-label="Core technologies"
                >
                    {tech_stacks.map((tech) => (
                        <span
                            key={tech}
                            className="
                                px-2.5 py-1
                                rounded-[6px]
                                border border-border
                                bg-surface
                                text-xs
                                font-mono
                                text-text-muted
                                hover:text-text-main
                                hover:border-accent/40
                                hover:-translate-y-0.5
                                hover:bg-surface-2
                                transition-all
                                duration-200
                                cursor-default
                            "
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Actions & Social Links */}
                <div
                    className="hero-anim-item flex flex-wrap items-center gap-4 pt-1"
                    style={{ opacity: 0, transform: "translateY(16px)" }}
                >
                    <a
                        href="#projects"
                        onClick={scrollToProjects}
                        className="
                            h-11 px-5
                            rounded-[10px]
                            bg-accent
                            text-accent-contrast
                            text-sm font-medium
                            inline-flex items-center justify-center
                            hover:-translate-y-0.5
                            hover:brightness-95
                            active:translate-y-0
                            active:scale-[0.98]
                            transition-all
                            duration-200
                            cursor-pointer
                        "
                    >
                        View projects
                    </a>

                    <a
                        href="/Jerwin_Quijano_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            group
                            h-11 px-5
                            rounded-[10px]
                            border border-border
                            bg-transparent
                            text-text-main
                            text-sm font-medium
                            inline-flex items-center gap-1.5 justify-center
                            hover:border-text-faint
                            hover:bg-surface-2/50
                            hover:-translate-y-0.5
                            active:translate-y-0
                            active:scale-[0.98]
                            transition-all
                            duration-200
                        "
                    >
                        <span>Resume</span>
                        <ArrowUpRight
                            size={15}
                            className="text-text-muted group-hover:text-text-main group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                        />
                    </a>

                    <div className="flex items-center gap-4 ml-2 sm:ml-4">
                        {social_links.map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.label}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        group
                                        inline-flex items-center gap-1.5
                                        text-sm text-text-muted
                                        hover:text-text-main
                                        transition-colors
                                        duration-200
                                    "
                                >
                                    <Icon size={16} className="group-hover:scale-110 transition-transform duration-200" />
                                    <span>{item.label}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;