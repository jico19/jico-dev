import { ArrowUpRight, Lock } from "lucide-react";
import PageOrientation from "./PageOrientation";
import ScrollReveal from "./ScrollReveal";
import { PROJECT_DATA } from "../data/projectsData";

const Projects = () => (
    <section id="projects" aria-labelledby="projects-heading" className="max-w-[1080px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <ScrollReveal scanline={false}>
            <div className="mb-5">
                <PageOrientation pageOrientation="Projects" />
                <h2 id="projects-heading" className="text-3xl font-semibold tracking-tight text-text-main">Selected projects</h2>
            </div>
            <div className="divide-y divide-border border-y border-border">
                {PROJECT_DATA.map((project, index) => (
                    <article key={project.id} className="group py-5 sm:py-6">
                        <div className="min-w-0">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <h3 className="flex items-baseline gap-3 text-base sm:text-lg font-semibold text-text-main leading-snug"><span className="font-mono text-[10px] font-normal text-text-faint" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{project.label}</h3>
                                    <p className="mt-1 text-xs text-text-muted">{project.category} · {project.timeline}</p>
                                </div>
                                {project.web_link ? (
                                    <a href={project.web_link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.label}`} className="shrink-0 min-h-11 min-w-11 -mt-2 inline-flex items-center justify-center gap-1 text-xs font-medium text-accent hover:text-text-main transition-colors">
                                        <span className="hidden sm:inline">Visit site</span>
                                        <ArrowUpRight size={16} aria-hidden="true" />
                                    </a>
                                ) : (
                                    <span className="shrink-0 inline-flex items-center gap-1 pt-1 text-xs text-text-muted">
                                        <Lock size={12} aria-hidden="true" /> Private
                                    </span>
                                )}
                            </div>
                            <p className="mt-2 text-sm text-text-muted leading-relaxed">{project.description}</p>
                            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                                <span className="text-accent">{project.status}</span>
                                {project.client && (
                                    <span className="text-text-muted">Client: {project.client}</span>
                                )}
                            </p>
                            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono text-text-muted" aria-label={`${project.label} technologies`}>
                                {project.tech.map((tech) => (
                                    <li key={tech}>{tech}</li>
                                ))}
                            </ul>
                        </div>
                    </article>
                ))}
            </div>
        </ScrollReveal>
    </section>
);

export default Projects;
