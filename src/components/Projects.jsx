import { useState } from "react";
import farmPass from '../assets/projects/farmpass.jpeg'
import { FiExternalLink } from "react-icons/fi";
import TerminalPromptReveal from "./TerminalPromptReveal";

const Projects = () => {
    const [showContent, setShowContent] = useState(false);

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
        <section id="projects" className="max-w-4xl mx-auto px-6 py-12 md:py-16">
            <div className="mb-8 border-l-2 border-accent pl-4">
                <TerminalPromptReveal 
                    command="list-projects" 
                    onComplete={() => setShowContent(true)} 
                />

                <p 
                    className={`mt-2 text-xs text-zinc-400 font-mono transition-all duration-300 ${
                        showContent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
                    }`}
                >
                    // Some of the applications I've built.
                </p>
            </div>

            <div 
                className={`grid gap-6 md:grid-cols-2 transition-all duration-300 ${
                    showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                }`}
            >
                {project_data.map((item, idx) => (
                    <a
                        key={idx}
                        rel="noopener noreferrer"
                        target='_blank'
                        href={item.web_link}
                        className="
                            group
                            block
                            overflow-hidden
                            rounded-none
                            border border-zinc-700
                            bg-zinc-900
                            hover:border-accent
                            hover:shadow-[0_0_15px_rgba(0,255,133,0.15)]
                            hover:-translate-y-1
                            transition-all
                            btn-transition
                            "
                    >
                        {/* Card Terminal Header */}
                        <div className="bg-zinc-800 px-4 py-2 border-b border-zinc-700 flex items-center justify-between text-[11px] font-mono text-zinc-400 select-none">
                            <div className="flex gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#FF5C5C] block"></span>
                                <span className="w-2 h-2 rounded-full bg-[#E6C229] block"></span>
                                <span className="w-2 h-2 rounded-full bg-[#00FF85] block"></span>
                            </div>
                            <div className="text-zinc-300 font-medium">~/projects/{item.label.toLowerCase()}</div>
                            <div className="w-8"></div>
                        </div>

                        <div className="overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.label}
                                className="
                                    h-48
                                    w-full
                                    object-cover
                                    transition-transform
                                    duration-200
                                    group-hover:scale-102
                                "
                            />
                        </div>

                        <div className="p-5 space-y-4 font-mono text-left">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-zinc-100">
                                    {item.label}
                                </h3>

                                <FiExternalLink
                                    className="
                                        text-zinc-500
                                        group-hover:text-accent
                                        transition-colors
                                        btn-transition
                                    "
                                    size={16}
                                />
                            </div>

                            <p className="text-xs leading-relaxed text-zinc-400">
                                {item.description}
                            </p>

                            <div className="flex flex-wrap gap-x-2.5 gap-y-1">
                                {item.tech.map((tech, techIdx) => (
                                    <span
                                        key={techIdx}
                                        className="
                                            text-xs
                                            font-mono
                                            text-accent
                                        "
                                    >
                                        [ {tech} ]
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-1.5 text-xs text-accent font-semibold pt-1">
                                <span>$ run demo.sh</span>
                                <FiExternalLink size={12} />
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Projects;