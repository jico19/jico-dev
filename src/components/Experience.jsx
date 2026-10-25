import PageOrientation from "./PageOrientation";
import ScrollReveal from "./ScrollReveal";

const Experience = () => {
    const experiences = [
        {
            title: "Capstone Developer",
            company: "Sariaya Municipal Agriculture Office",
            period: "Jan 2026 - Present",
            current: true,
            responsibilities: [
                "Developed a Smart Swine Transport Permit Management System",
                "Built REST APIs using Django REST Framework",
                "Designed PostgreSQL database architecture",
                "Implemented geospatial mapping and document verification",
                "Collaborated with a team during system development",
            ],
        },
        {
            title: "Full-Stack Developer",
            company: "ST Business Consulting",
            period: "July 2026 - Present",
            current: true,
            responsibilities: [
                "Developed a multi-tenant healthcare SaaS platform using FastAPI, React 19, and Supabase",
                "Implemented state-scoped authorization and secure data isolation across Florida, Indiana, and Georgia",
                "Built compliance features including cryptographic e-signatures, tamper-resistant audit logs, legal holds, and automated data-retention workflows",
                "Developed caregiver onboarding, credential tracking, client intake, service agreements, care plans, authorizations, and scheduling workflows",
                "Refactored monolithic backend components into modular, maintainable domain-focused services",
                "Optimized database queries and reduced unnecessary PostgREST egress",
                "Maintained an automated test suite with over 235 tests",
            ],
        },
    ];

    return (
        <section id="experience" aria-labelledby="experience-heading" className="max-w-[1080px] mx-auto px-6 py-16 md:py-24">
            <ScrollReveal>
                {/* Section Header */}
                <div className="mb-12">
                    <PageOrientation pageOrientation="Experience" />
                    <h2 id="experience-heading" className="text-3xl font-semibold tracking-tight text-text-main">
                        Experience
                    </h2>
                    <p className="mt-2 text-sm text-text-muted max-w-[60ch]">
                        Professional and academic experience.
                    </p>
                </div>

                {/* Clean Timeline without any green glow */}
                <div className="relative pl-6 sm:pl-8 border-l border-border space-y-12 ml-2 sm:ml-3">
                    {experiences.map((exp, idx) => (
                        <ScrollReveal key={idx} delay={idx * 140}>
                            <article className="group relative">
                                {/* Clean timeline dot (no glow) */}
                                <div
                                    aria-hidden="true"
                                    className={`
                                        absolute -left-[29px] sm:-left-[37px] top-1.5
                                        w-2 h-2 rounded-full
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
                                        <h3 className="text-lg font-semibold text-text-main group-hover:text-accent transition-colors duration-200">
                                            {exp.title}
                                        </h3>
                                        <p className="text-sm text-text-muted">
                                            {exp.company}
                                        </p>
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