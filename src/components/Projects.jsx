import farmPass from '../assets/projects/farmpass.jpeg'
import { FiExternalLink } from "react-icons/fi";
import ScrollReveal from "./ScrollReveal";

const Projects = () => {
    const project_data = [
        {
            label: "FarmPass",
            image: farmPass,
            tech: ["Django", "DRF", "React", "PostgreSQL"],
            description:
                "A capstone project for the Municipal Agriculture Office of Sariaya focused on permit processing and geospatial mapping.",
            web_link: 'https://farmpass-ph.me/'
        },
    ];

    return (
        <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
            <ScrollReveal direction="up" duration={800}>
                <div className="mb-12">
                    <h2 className="text-4xl font-bold text-zinc-100">
                        Projects
                    </h2>

                    <p className="mt-2 text-zinc-400">
                        Some of the applications I've built.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {project_data.map((item, idx) => (
                    <ScrollReveal key={idx} delay={idx * 150} direction="up" duration={800}>
                        <a
                            rel="noopener noreferrer"
                            target='_blank'
                            href={item.web_link}
                            className="
                                group
                                block
                                overflow-hidden
                                rounded-xl
                                border border-zinc-800
                                bg-zinc-900
                                hover:border-zinc-700
                                hover:-translate-y-1
                                transition-all
                                "
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.label}
                                    className="
                                        h-52
                                        w-full
                                        object-cover
                                        transition-transform
                                        duration-300
                                        group-hover:scale-105
                                    "
                                />
                            </div>

                            <div className="p-5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-zinc-100">
                                        {item.label}
                                    </h3>

                                    <FiExternalLink
                                        className="
                                            text-zinc-500
                                            group-hover:text-zinc-300
                                            transition-colors
                                        "
                                    />
                                </div>

                                <p className="text-sm leading-relaxed text-zinc-400">
                                    {item.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {item.tech.map((tech, techIdx) => (
                                        <span
                                            key={techIdx}
                                            className="
                                                px-2 py-1
                                                text-xs
                                                rounded-md
                                                bg-zinc-800
                                                text-zinc-300
                                                border border-zinc-700
                                            "
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 text-sm text-zinc-500">
                                    <span>View Live Demo</span>
                                    <FiExternalLink size={14} />
                                </div>
                            </div>
                        </a>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
};

export default Projects;