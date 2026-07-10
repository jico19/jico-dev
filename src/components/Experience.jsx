import { useState } from "react";
import TerminalPromptReveal from "./TerminalPromptReveal";

const Experience = () => {
    const [showContent, setShowContent] = useState(false);

    const experiences = [
        {
            title: "Capstone Developer",
            company: "Sariaya Municipal Agriculture Office",
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
        <section id="experience" className="max-w-4xl mx-auto px-6 py-12 md:py-16">
            <div className="mb-8 border-l-2 border-accent pl-4">
                <TerminalPromptReveal 
                    command="cat experience.json" 
                    onComplete={() => setShowContent(true)} 
                />

                <p 
                    className={`mt-2 text-xs text-zinc-400 font-mono transition-all duration-300 ${
                        showContent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
                    }`}
                >
                    // Professional and academic experience.
                </p>
            </div>

            <div 
                className={`space-y-6 transition-all duration-300 ${
                    showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                }`}
            >
                {experiences.map((exp, idx) => (
                    <div
                        key={idx}
                        className="
                            rounded-none
                            border border-zinc-700
                            bg-zinc-900
                            hover:border-accent
                            hover:shadow-[0_0_15px_rgba(0,255,133,0.15)]
                            transition-all
                            btn-transition
                            overflow-hidden
                        "
                    >
                        {/* Card Terminal Header */}
                        <div className="bg-zinc-800 px-4 py-2 border-b border-zinc-700 flex items-center justify-between text-[11px] font-mono text-zinc-400 select-none">
                            <div className="flex gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#FF5C5C] block"></span>
                                <span className="w-2 h-2 rounded-full bg-[#E6C229] block"></span>
                                <span className="w-2 h-2 rounded-full bg-[#00FF85] block"></span>
                            </div>
                            <div className="text-zinc-300 font-medium">~/experience/{exp.title.toLowerCase().replace(/ /g, "-")}</div>
                            <div className="w-8"></div>
                        </div>

                        <div className="p-5 font-mono text-left">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                <div>
                                    <h3 className="text-lg font-semibold text-zinc-100">
                                        {exp.title}
                                    </h3>

                                    <p className="text-sm text-zinc-400">
                                        {exp.company || "Independent"}
                                    </p>
                                </div>

                                <span className="text-xs text-accent">
                                    [ {exp.period} ]
                                </span>
                            </div>

                            <ul className="mt-4 space-y-2 text-xs">
                                {exp.responsibilities.map((item, i) => (
                                    <li
                                        key={i}
                                        className="text-zinc-300 flex gap-2 items-start"
                                    >
                                        <span className="text-accent font-bold">&gt;</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;