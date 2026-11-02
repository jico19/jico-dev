import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Search } from "lucide-react";
import { TECHNOLOGIES, TECHNOLOGY_CATEGORIES } from "../data/technologiesData";
import { navigate } from "../lib/router";

const TechPage = () => {
    const [category, setCategory] = useState("All");
    const [query, setQuery] = useState("");
    const technologies = useMemo(() => {
        const search = query.trim().toLowerCase();
        return TECHNOLOGIES.filter((tech) =>
            (category === "All" || tech.category === category) &&
            [tech.name, tech.summary, tech.usage].some((value) => value.toLowerCase().includes(search))
        );
    }, [category, query]);

    const returnToContact = () => {
        navigate("/");
        requestAnimationFrame(() => {
            document.getElementById("contact")?.scrollIntoView();
        });
    };

    return (
        <div className="min-h-screen text-text-main px-6 md:px-10 py-8 md:py-14">
            <div className="max-w-[1080px] mx-auto">
                <header className="flex items-center justify-between gap-4 mb-10">
                    <a href="/" onClick={(event) => {
                        event.preventDefault();
                        navigate("/");
                    }} className="min-h-11 inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-main">
                        <ArrowLeft size={15} aria-hidden="true" /> Back to portfolio
                    </a>
                </header>
                <main>
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text-main mb-3">Technologies & tools</h1>
                    <p className="text-sm sm:text-base text-text-muted max-w-[64ch] mb-8 leading-relaxed">
                        What I use and where it appears in my work, from React interfaces
                        to Python APIs and PostgreSQL data.
                    </p>
                    <div className="flex flex-col lg:flex-row gap-4 justify-between mb-8">
                        <div className="flex flex-wrap gap-2" aria-label="Filter technologies by category">
                            {["All", ...TECHNOLOGY_CATEGORIES].map((item) => (
                                <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`min-h-11 px-3 rounded-lg border text-sm transition-colors ${category === item ? "border-accent text-accent bg-accent/10" : "border-border text-text-muted hover:text-text-main"}`}>
                                    {item}
                                </button>
                            ))}
                        </div>
                        <div className="relative lg:w-72">
                            <label htmlFor="tech-search" className="sr-only">Search technologies</label>
                            <Search size={16} aria-hidden="true" className="absolute left-3 top-3.5 text-text-muted" />
                            <input id="tech-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search technologies" className="w-full h-11 pl-10 pr-3 rounded-lg bg-surface border border-border text-sm text-text-main placeholder:text-text-faint focus:border-accent focus:outline-none" />
                        </div>
                    </div>
                    <p role="status" className="sr-only">{technologies.length} technologies shown</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {technologies.map((tech) => {
                            const Icon = tech.icon;
                            return (
                                <article key={tech.name} className="blueprint-panel p-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Icon size={22} className="text-accent shrink-0" aria-hidden="true" />
                                        <div>
                                            <h2 className="text-base font-medium text-text-main">{tech.name}</h2>
                                            <p className="text-xs text-text-muted">{tech.category}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-text-muted leading-relaxed mb-4">{tech.summary}</p>
                                    <p className="pt-3 border-t border-border text-xs text-text-muted leading-relaxed">{tech.usage}</p>
                                </article>
                            );
                        })}
                    </div>
                    {technologies.length === 0 && (
                        <p className="py-12 text-center text-text-muted">No technologies match. Try another search or category.</p>
                    )}
                    <div className="mt-12 p-6 rounded-xl border border-border bg-surface flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-medium text-text-main mb-1">Hiring a junior fullstack developer?</h2>
                            <p className="text-sm text-text-muted">I’d be happy to discuss my projects and your team’s needs.</p>
                        </div>
                        <button type="button" onClick={returnToContact} className="min-h-11 px-5 rounded-lg bg-accent text-accent-contrast text-sm font-medium inline-flex items-center gap-2 hover:brightness-95">
                            Get in touch <ArrowUpRight size={15} aria-hidden="true" />
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TechPage;
