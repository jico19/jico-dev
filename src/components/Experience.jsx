import PageOrientation from "./PageOrientation";
import ScrollReveal from "./ScrollReveal";
import { EXPERIENCE_DATA } from "../data/experienceData";

const Experience = () => {
    return (
        <section id="experience" aria-labelledby="experience-heading" className="max-w-[1080px] mx-auto px-6 md:px-10 py-12 md:py-16">
            <ScrollReveal>
                {/* Section Header */}
                <div className="mb-12">
                    <PageOrientation pageOrientation="Experience" />
                    <h2 id="experience-heading" className="text-3xl font-semibold tracking-tight text-text-main">
                        Experience
                    </h2>
                    <p className="mt-2 text-sm text-text-muted max-w-[60ch]">
                        Freelance client work and selected development projects.
                    </p>
                </div>

                {/* Clean Timeline without any green glow */}
                <div className="relative pl-6 sm:pl-8 border-l border-border space-y-12 ml-2 sm:ml-3">
                    {EXPERIENCE_DATA.map((exp, idx) => (
                        <ScrollReveal key={exp.id} delay={idx * 100}>
                            <article className="group relative">
                                {/* Clean timeline dot (no glow) */}
                                <div
                                    aria-hidden="true"
                                    className={`
                                        absolute -left-[29px] sm:-left-[37px] top-1.5
                                        w-2 h-2
                                        transition-transform duration-200 ease-out
                                        group-hover:scale-125
                                        ${exp.current
                                            ? "bg-accent ring-4 ring-bg"
                                            : "bg-text-faint ring-4 ring-bg group-hover:bg-text-muted"
                                        }
                                    `}
                                />

                                {/* Role, Company and Date */}
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
                                    <div>
                                        <span className="inline-block text-xs font-mono text-accent mb-2">{exp.type}</span>
                                        <h3 className="text-lg font-semibold text-text-main group-hover:text-accent transition-colors duration-200">
                                            {exp.title}
                                        </h3>
                                        <p className="text-sm text-text-muted">
                                            {exp.company}
                                        </p>
                                        {exp.client && (
                                            <p className="mt-1 text-sm text-text-muted">Client: {exp.client}</p>
                                        )}
                                    </div>

                                    <span className="text-xs font-mono text-text-muted group-hover:text-text-main transition-colors duration-200 shrink-0">
                                        {exp.period}
                                    </span>
                                </div>

                                {/* Responsibilities list with clean dot markers */}
                                <ul className="space-y-2.5">
                                    {exp.responsibilities.map((item, i) => (
                                        <li
                                            key={i}
                                            className="text-sm text-text-muted flex items-start gap-3 leading-relaxed hover:text-text-main transition-colors duration-150"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="w-1.5 h-1.5 rounded-full bg-text-faint shrink-0 mt-2 transition-colors duration-150"
                                            />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        </ScrollReveal>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Experience;
