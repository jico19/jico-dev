import { useState, useEffect, useRef } from "react";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import { useAnimationsEnabled } from "../lib/motion";

const ORIGINAL_TITLE = "Hi, I'm Jerwin Nico";
const ASCII_CHARS = "!<>-_\\/[]{}—=+*^?#________0101";
const ROLES = [
    "Backend Developer",
    "Full Stack Developer",
    "API & Systems Builder",
];

const Hero = () => {
    const animationsEnabled = useAnimationsEnabled();
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

    // ASCII Scrambler on hover
    const [titleText, setTitleText] = useState(ORIGINAL_TITLE);
    const scrambleIntervalRef = useRef(null);

    const handleTitleMouseEnter = () => {
        if (!animationsEnabled) return;

        let iteration = 0;
        const totalIterations = ORIGINAL_TITLE.length;

        if (scrambleIntervalRef.current) {
            clearInterval(scrambleIntervalRef.current);
        }

        scrambleIntervalRef.current = setInterval(() => {
            setTitleText(
                ORIGINAL_TITLE.split("")
                    .map((char, index) => {
                        if (char === " " || char === "'") return char;
                        if (index < iteration) {
                            return ORIGINAL_TITLE[index];
                        }
                        return ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= totalIterations) {
                clearInterval(scrambleIntervalRef.current);
                scrambleIntervalRef.current = null;
                setTitleText(ORIGINAL_TITLE);
            }

            iteration += 1 / 2;
        }, 30);
    };

    const handleTitleMouseLeave = () => {
        if (scrambleIntervalRef.current) {
            clearInterval(scrambleIntervalRef.current);
            scrambleIntervalRef.current = null;
        }
        setTitleText(ORIGINAL_TITLE);
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
                    // Pause when word is completely typed
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

    useEffect(() => {
        return () => {
            if (scrambleIntervalRef.current) {
                clearInterval(scrambleIntervalRef.current);
            }
        };
    }, []);

    return (
        <section id="home" className="max-w-[1080px] mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="max-w-3xl">
                {/* H1 Title with ASCII scramble on hover */}
                <h1
                    onMouseEnter={handleTitleMouseEnter}
                    onMouseLeave={handleTitleMouseLeave}
                    className="animate-fade-up text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-text-main leading-[1.08] mb-3 cursor-default select-none font-sans"
                    style={{ animationDelay: "60ms" }}
                >
                    {titleText}
                </h1>

                {/* Role with Typewriter effect */}
                <p
                    className="animate-fade-up text-xl md:text-2xl text-text-muted font-normal mb-6 min-h-[1.75em] flex items-center font-mono"
                    style={{ animationDelay: "120ms" }}
                >
                    <span>{displayedRole}</span>
                    <span
                        className="inline-block w-[2px] h-[1em] ml-1 bg-accent animate-pulse"
                        aria-hidden="true"
                    />
                </p>

                {/* About description */}
                <p
                    className="animate-fade-up text-base md:text-lg text-text-muted leading-relaxed max-w-[62ch] mb-6"
                    style={{ animationDelay: "180ms" }}
                >
                    I build secure and scalable web applications using Django, Django REST Framework,
                    PostgreSQL, and React. Currently pursuing a BSIT degree while developing
                    backend-focused projects and REST APIs.
                </p>

                {/* Interactive Tech Stack Tags */}
                <div
                    className="animate-fade-up flex flex-wrap items-center gap-2 mb-8"
                    style={{ animationDelay: "240ms" }}
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
                    className="animate-fade-up flex flex-wrap items-center gap-4 pt-1"
                    style={{ animationDelay: "300ms" }}
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
                        href="/resume.pdf"
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