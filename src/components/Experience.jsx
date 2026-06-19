
import ScrollReveal from "./ScrollReveal";

const Experience = () => {
    const experiences = [
        {
            title: "Capstone Developer",
            company: "",
            period: "Jan 2026 - Present",
            responsibilities: [
                "Developed a Smart Swine Transport Permit Management System",
                "Built REST APIs using Django REST Framework",
                "Designed PostgreSQL database architecture",
                "Implemented geospatial mapping and document verification",
                "Collaborated with a team during system development",
            ]
        },
        {
            title: "Student Assistant",
            company: "Supplies Office",
            period: "Jan 2025 - June 2025",
            responsibilities: [
                "Assisted faculty and students with administrative tasks.",
                "Managed office documentation and supplies.",
                "Coordinated and assisted 4 OJT students.",
                "Performed data entry and record management."
            ]
        }
    ];

    return (
        <section id="experience" className="max-w-6xl mx-auto px-6 py-24">
            <ScrollReveal direction="up" duration={800}>
                <div className="mb-12">
                    <h2 className="text-4xl font-bold text-zinc-100">
                        Experience
                    </h2>

                    <p className="mt-2 text-zinc-400">
                        Professional and academic experience.
                    </p>
                </div>
            </ScrollReveal>

            <div className="space-y-6">
                {experiences.map((exp, idx) => (
                    <ScrollReveal key={idx} delay={idx * 150} direction="up" duration={800}>
                        <div
                            className="
                                rounded-xl
                                border border-zinc-800
                                bg-zinc-900
                                p-6
                            "
                        >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                <div>
                                    <h3 className="text-xl font-semibold text-zinc-100">
                                        {exp.title}
                                    </h3>

                                    <p className="text-zinc-400">
                                        {exp.company}
                                    </p>
                                </div>

                                <span className="text-sm text-zinc-500">
                                    {exp.period}
                                </span>
                            </div>

                            <ul className="mt-4 space-y-2">
                                {exp.responsibilities.map((item, i) => (
                                    <li
                                        key={i}
                                        className="text-zinc-400 flex gap-2"
                                    >
                                        <span className="text-zinc-600">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
};

export default Experience