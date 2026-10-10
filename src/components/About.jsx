import ScrollReveal from "./ScrollReveal";
import AsciiPortrait from "./AsciiPortrait";
import { Terminal, Code2, Server, Database } from "lucide-react";

const About = () => {
    const highlights = [
        {
            icon: Server,
            title: "AI-Driven Development",
            desc: "Leveraging AI tools to accelerate development, explore solutions, and turn ideas into functional, production-ready applications.",
        },
        {
            icon: Database,
            title: "Backend & System Architecture",
            desc: "Building reliable REST APIs, structured database schemas, and secure backend systems using Django REST Framework, FastAPI, and PostgreSQL.",
        },
        {
            icon: Code2,
            title: "Full-Stack Engineering",
            desc: "Developing end-to-end applications by integrating robust backend services with modern React interfaces and intuitive user experiences.",
        },
        {
            icon: Terminal,
            title: "Continuous Experimentation",
            desc: "Exploring emerging AI technologies, developer tools, and modern workflows to build software more efficiently and solve real-world problems.",
        },
    ];

    return (
        <section id="about" aria-labelledby="about-heading" className="max-w-[1080px] mx-auto px-6 py-16 md:py-24">
            <ScrollReveal>
                {/* Section Header */}
                <div className="mb-10">
                    <span className="block text-xs font-mono tracking-wider text-text-faint uppercase mb-2">
                        01 / About
                    </span>
                    <h2 id="about-heading" className="text-3xl font-semibold tracking-tight text-text-main">
                        About Me
                    </h2>
                    <p className="mt-2 text-sm text-text-muted max-w-[60ch]">
                        A developer focused on AI-driven development, building reliable backends, well-structured systems, and practical applications that solve real-world problems.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    {/* Left Column: Interactive ASCII Portrait & Quick Badges */}
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-4">
                        <AsciiPortrait
                            src="/me-pic.png"
                            alt="Jerwin Nico Quijano"
                            className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-none"
                        />

                        <div className="w-full flex flex-wrap gap-2 pt-1 justify-center lg:justify-start">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] border border-border bg-surface text-xs font-mono text-text-muted">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                BS Information Technology
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] border border-border bg-surface text-xs font-mono text-text-muted">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                Philippines
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] border border-border bg-surface text-xs font-mono text-text-muted">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                Open for Opportunities
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Bio Narrative & Focus Highlights */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="space-y-4 text-sm sm:text-base text-text-muted leading-relaxed">
                            <p>
                                Hello! I'm <span className="text-text-main font-medium">Jerwin Nico Quijano</span>, a full-stack developer based in the Philippines focused on AI-driven development and building practical, scalable web applications.
                            </p>
                            <p>
                                I leverage AI tools to accelerate development, explore solutions, and turn ideas into working software. With a foundation in backend engineering, API development, database design, and secure system architecture, I build applications that solve real-world problems—from geospatial permit management systems to multi-tenant healthcare platforms.
                            </p>
                            <p>
                                Beyond traditional development, I'm exploring how AI can improve the way software is designed, built, and delivered. I enjoy experimenting with new tools, integrating intelligent features into applications, and finding more effective ways to turn complex requirements into reliable software.
                            </p>
                        </div>

                        {/* Skill / Focus Highlights in 2x2 Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            {highlights.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-[10px] border border-border bg-surface hover:border-text-faint/60 transition-colors"
                                    >
                                        <div className="flex items-center gap-2.5 mb-1.5">
                                            <div className="w-7 h-7 rounded-[6px] bg-bg border border-border flex items-center justify-center text-accent">
                                                <Icon size={14} />
                                            </div>
                                            <h3 className="text-sm font-semibold text-text-main">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-text-muted leading-relaxed pl-9.5">
                                            {item.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default About;
