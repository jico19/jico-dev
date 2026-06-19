import { useState, useEffect } from "react";

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("home");

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

    const handleScroll = (e, id) => {
        e.preventDefault();
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
        <nav className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800/80">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

                <a
                    href="#home"
                    onClick={(e) => handleScroll(e, "home")}
                    className="text-xl font-bold tracking-wide text-zinc-100 hover:opacity-80 transition-opacity"
                >
                    JICO
                </a>

                <ul className="flex items-center gap-1 sm:gap-4">
                    {sections.map((item) => (
                        <li key={item.label}>
                            <a
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.id)}
                                className={`
                                    relative
                                    px-3 py-1.5
                                    rounded-lg
                                    text-sm
                                    font-medium
                                    transition-all
                                    duration-300
                                    border
                                    cursor-pointer
                                    ${activeSection === item.id
                                        ? "bg-zinc-800/90 text-zinc-100 border-zinc-700 shadow-md shadow-black/20"
                                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 border-transparent"
                                    }
                                `}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

            </div>
        </nav>
    );
};

export default Navbar;