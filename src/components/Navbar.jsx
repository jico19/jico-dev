import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("home");
    const [isOpen, setIsOpen] = useState(false);

    const sections = [
        { label: "Home", href: "#home", id: "home" },
        { label: "Projects", href: "#projects", id: "projects" },
        { label: "Experience", href: "#experience", id: "experience" },
        { label: "Contact", href: "#contact", id: "contact" },
    ];

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-30% 0px -40% 0px",
            threshold: 0,
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        // Highlight first section at top, and last section at the bottom
        const handleScrollSpy = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
                setActiveSection("contact");
            } else if (window.scrollY < 100) {
                setActiveSection("home");
            }
        };

        window.addEventListener("scroll", handleScrollSpy);

        return () => {
            sections.forEach((section) => {
                const el = document.getElementById(section.id);
                if (el) observer.unobserve(el);
            });
            window.removeEventListener("scroll", handleScrollSpy);
        };
    }, []);

    // Close mobile menu when switching to larger screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Toggle body scroll behavior when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleScroll = (e, id) => {
        e.preventDefault();
        setIsOpen(false); // Close mobile drawer
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // navbar height + cushion
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            window.history.pushState(null, "", `#${id}`);
            setActiveSection(id);
        }
    };

    return (
        <>
            <nav className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-700">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

                    <a
                        href="#home"
                        onClick={(e) => handleScroll(e, "home")}
                        className="text-sm font-bold tracking-wide text-accent hover:opacity-80 btn-transition"
                    >
                        jico@portfolio:~$
                    </a>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-1 sm:gap-4">
                        {sections.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    onClick={(e) => handleScroll(e, item.id)}
                                    className={`
                                        relative
                                        px-3 py-1.5
                                        rounded-none
                                        text-xs
                                        font-medium
                                        transition-all
                                        btn-transition
                                        border
                                        cursor-pointer
                                        ${activeSection === item.id
                                            ? "bg-zinc-900 text-accent border-zinc-700 glow-green"
                                            : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40 border-transparent"
                                        }
                                    `}
                                >
                                    {activeSection === item.id ? "> " : "$ "}{item.label.toLowerCase()}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="
                            md:hidden
                            p-2
                            rounded-none
                            text-zinc-400
                            hover:text-zinc-100
                            hover:bg-zinc-900/60
                            transition-all
                            cursor-pointer
                            focus:outline-none
                        "
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                    </button>

                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            <div
                className={`
                    fixed inset-x-0 bottom-0 top-16 z-40
                    bg-zinc-950/95 backdrop-blur-lg
                    border-b border-zinc-700
                    md:hidden
                    transition-all duration-200 ease-out
                    flex flex-col px-6 py-8 gap-4
                    ${isOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-8 pointer-events-none"
                    }
                `}
            >
                <ul className="flex flex-col gap-4">
                    {sections.map((item) => (
                        <li key={item.label}>
                            <a
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.id)}
                                className={`
                                    block
                                    w-full
                                    px-4 py-3
                                    rounded-none
                                    text-sm
                                    font-medium
                                    transition-all
                                    btn-transition
                                    border
                                    cursor-pointer
                                    ${activeSection === item.id
                                        ? "bg-zinc-900 text-accent border-zinc-700 glow-green"
                                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40 border-transparent"
                                    }
                                `}
                            >
                                {activeSection === item.id ? "> " : "$ "}{item.label.toLowerCase()}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Navbar;