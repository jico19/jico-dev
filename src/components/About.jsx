import ScrollReveal from "./ScrollReveal";
import AsciiPortrait from "./AsciiPortrait";

const About = () => {
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

                    {/* Right Column: Bio Narrative */}
                    <div className="lg:col-span-8 flex flex-col justify-center">
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
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default About;
