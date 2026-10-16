import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const navLinksRef = useRef({});
    const mobileMenuRef = useRef(null);

    const navItems = [
        { label: "About", href: "#about", id: "about" },
        { label: "Stack", href: "#skills", id: "skills" },
        { label: "Services", href: "#services", id: "services" },
        { label: "Projects", href: "#projects", id: "projects" },
        { label: "Experience", href: "#experience", id: "experience" },
        { label: "Testimonials", href: "#testimonials", id: "testimonials" },
        { label: "Contact", href: "#contact", id: "contact" },
    ];

    // Scroll progress & sticky border detection
    useEffect(() => {
        const handleScrollState = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 12);

            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(totalHeight > 0 ? Math.min(100, (scrollY / totalHeight) * 100) : 0);
        };

        window.addEventListener("scroll", handleScrollState, { passive: true });
        handleScrollState();
        return () => window.removeEventListener("scroll", handleScrollState);
    }, []);

    // Active section spy
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-25% 0px -45% 0px",
            threshold: 0,
        };

        const observedIds = ["home", "about", "skills", "services", "projects", "experience", "testimonials", "contact"];
        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        observedIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        const handleEdgeScroll = () => {
            const scrollY = window.scrollY;
            const scrollBottom = window.innerHeight + scrollY;
            const docHeight = document.documentElement.scrollHeight;

            if (scrollBottom >= docHeight - 80) {
                setActiveSection("contact");
            } else if (scrollY < 80) {
                setActiveSection("home");
            }
        };

        window.addEventListener("scroll", handleEdgeScroll, { passive: true });

        return () => {
            observedIds.forEach((id) => {
                const el = document.getElementById(id);
                if (el) observer.unobserve(el);
            });
            window.removeEventListener("scroll", handleEdgeScroll);
        };
    }, []);

    // Update active sliding underline position
    useEffect(() => {
        const activeEl = navLinksRef.current[activeSection];
        if (activeEl) {
            setIndicatorStyle({
                left: activeEl.offsetLeft,
                width: activeEl.offsetWidth,
                opacity: 1,
            });
        } else {
            setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        }
    }, [activeSection]);

    // Handle resize to close mobile drawer
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Prevent body scroll and handle focus trap when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";

            const handleKeyDown = (e) => {
                if (e.key === "Escape") {
                    setIsOpen(false);
                    return;
                }

                if (e.key === "Tab" && mobileMenuRef.current) {
                    const focusableElements = mobileMenuRef.current.querySelectorAll(
                        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                    );
                    if (focusableElements.length === 0) return;

                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            };

            window.addEventListener("keydown", handleKeyDown);
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
                document.body.style.overflow = "unset";
            };
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        setIsOpen(false);

        const target = document.getElementById(id);
        if (target) {
            const navOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - navOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
            window.history.pushState(null, "", `#${id}`);
            setActiveSection(id);
        }
    };

    return (
        <>
            {/* 2px viewport top scroll progress line */}
            <div
                aria-hidden="true"
                className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-transparent pointer-events-none"
            >
                <div
                    className="h-full bg-accent transition-[width] duration-150 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            <header
                className={`sticky top-0 z-50 w-full h-16 bg-bg/85 backdrop-blur-[12px] border-b transition-colors duration-200 ${
                    isScrolled ? "border-border" : "border-transparent"
                }`}
            >
                <div className="max-w-[1080px] mx-auto h-full px-6 flex items-center justify-between">
                    {/* Wordmark */}
                    <a
                        href="#home"
                        onClick={(e) => scrollToSection(e, "home")}
                        className="group inline-flex items-center gap-1.5 font-semibold text-text-main text-sm sm:text-base tracking-tight"
                    >
                        <span className="font-mono text-accent text-xs font-normal group-hover:translate-x-0.5 transition-transform duration-150">~/</span>
                        <span className="group-hover:text-text-main transition-colors">Jerwin Quijano</span>
                        <span
                            className="inline-block w-1.5 h-3.5 bg-accent ml-0.5 animate-blink-once"
                            aria-hidden="true"
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
                        <div className="relative flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.id;
                                return (
                                    <a
                                        key={item.id}
                                        href={item.href}
                                        ref={(el) => {
                                            if (el) navLinksRef.current[item.id] = el;
                                        }}
                                        onClick={(e) => scrollToSection(e, item.id)}
                                        className={`
                                            px-3 py-1.5
                                            text-sm
                                            font-medium
                                            transition-colors
                                            duration-150
                                            cursor-pointer
                                            ${isActive ? "text-text-main" : "text-text-muted hover:text-text-main"}
                                        `}
                                    >
                                        {item.label}
                                    </a>
                                );
                            })}

                            {/* Sliding underline indicator */}
                            <span
                                aria-hidden="true"
                                className="absolute bottom-0 h-[2px] bg-accent transition-all duration-200 ease-out pointer-events-none"
                                style={{
                                    transform: `translateX(${indicatorStyle.left}px)`,
                                    width: `${indicatorStyle.width}px`,
                                    opacity: indicatorStyle.opacity,
                                }}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                            <a
                                href="#contact"
                                onClick={(e) => scrollToSection(e, "contact")}
                                className="
                                    h-9 px-4
                                    inline-flex items-center justify-center
                                    rounded-[8px]
                                    bg-accent
                                    text-accent-contrast
                                    text-xs sm:text-sm
                                    font-medium
                                    hover:-translate-y-0.5
                                    hover:brightness-95
                                    active:translate-y-0
                                    active:scale-[0.96]
                                    transition-all
                                    duration-150
                                    cursor-pointer
                                "
                            >
                                Let's talk
                            </a>
                        </div>
                    </nav>

                    {/* Mobile Menu & Theme Toggle */}
                    <div className="flex md:hidden items-center gap-2">
                        <ThemeToggle />
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu-drawer"
                            className="
                                w-9 h-9
                                inline-flex items-center justify-center
                                rounded-[8px]
                                text-text-muted
                                hover:text-text-main
                                hover:bg-surface-2
                                border border-transparent
                                hover:border-border
                                transition-colors
                                cursor-pointer
                            "
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Sheet / Drawer */}
            <div
                id="mobile-menu-drawer"
                ref={mobileMenuRef}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                aria-hidden={!isOpen}
                className={`
                    fixed inset-x-0 bottom-0 top-16 z-40
                    bg-bg/95 backdrop-blur-xl
                    border-b border-border
                    md:hidden
                    flex flex-col justify-between
                    p-6
                    transition-all duration-200 ease-out
                    ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
                `}
            >
                <div className="flex flex-col gap-2 pt-4">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.id)}
                            className="
                                text-xl
                                font-medium
                                py-3
                                text-text-muted
                                hover:text-text-main
                                transition-colors
                            "
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="pb-8 pt-4">
                    <a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, "contact")}
                        className="
                            w-full h-11
                            inline-flex items-center justify-center
                            rounded-[8px]
                            bg-accent
                            text-accent-contrast
                            text-sm font-medium
                            transition-all
                        "
                    >
                        Let's talk
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;