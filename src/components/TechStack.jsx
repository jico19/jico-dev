import { ArrowUpRight } from "lucide-react";
import PageOrientation from "./PageOrientation";
import ScrollReveal from "./ScrollReveal";
import { TECHNOLOGIES, TECHNOLOGY_CATEGORIES } from "../data/technologiesData";
import { navigate } from "../lib/router";

const TechStack = () => (
    <section id="skills" aria-labelledby="skills-heading" className="max-w-[1080px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                <div>
                    <PageOrientation pageOrientation="Skills" />
                    <h2 id="skills-heading" className="text-3xl font-semibold tracking-tight text-text-main">Technologies I use</h2>
                    <p className="mt-2 text-sm text-text-muted">The tools behind my current projects and this portfolio.</p>
                </div>
                <a href="/tech" onClick={(event) => {
                    event.preventDefault();
                    navigate("/tech");
                }} className="min-h-11 inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
                    Where I use them <ArrowUpRight size={14} aria-hidden="true" />
                </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {TECHNOLOGY_CATEGORIES.map((category) => (
                    <div key={category} className="blueprint-panel p-5">
                        <h3 className="text-xs font-mono uppercase tracking-wider text-text-main mb-4">{category}</h3>
                        <ul className="space-y-3">
                            {TECHNOLOGIES.filter((tech) => tech.category === category).map((tech) => {
                                const Icon = tech.icon;
                                return (
                                    <li key={tech.name} className="flex items-center gap-2.5 text-sm text-text-muted">
                                        <Icon size={16} className="text-accent shrink-0" aria-hidden="true" />
                                        {tech.name}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </ScrollReveal>
    </section>
);

export default TechStack;
