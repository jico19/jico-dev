import ScrollReveal from "./ScrollReveal";
import {
    SiPython,
    SiDjango,
    SiFastapi,
    SiPostgresql,
    SiReact,
    SiJavascript,
    SiTailwindcss,
    SiSupabase,
    SiGit,
    SiDocker,
    SiPostman,
    SiLinux,
} from "react-icons/si";

const TechStack = () => {
    const categories = [
        {
            title: "Backend & APIs",
            description: "Core server-side development, RESTful APIs, and architectures.",
            skills: [
                { name: "Python", icon: SiPython, level: "Advanced" },
                { name: "Django", icon: SiDjango, level: "Advanced" },
                { name: "Django REST", icon: SiDjango, level: "Advanced" },
                { name: "FastAPI", icon: SiFastapi, level: "Proficient" },
            ],
        },
        {
            title: "Databases & Cloud",
            description: "Data modeling, relational integrity, migrations, and BaaS.",
            skills: [
                { name: "PostgreSQL", icon: SiPostgresql, level: "Advanced" },
                { name: "Supabase", icon: SiSupabase, level: "Proficient" },
            ],
        },
        {
            title: "Frontend Engineering",
            description: "Interactive SPAs, state synchronization, and component design.",
            skills: [
                { name: "React 19", icon: SiReact, level: "Proficient" },
                { name: "JavaScript", icon: SiJavascript, level: "Proficient" },
                { name: "Tailwind CSS", icon: SiTailwindcss, level: "Advanced" },
            ],
        },
        {
            title: "Tools & DevOps",
            description: "Version control, API testing, containers, and terminal tooling.",
            skills: [
                { name: "Git & GitHub", icon: SiGit, level: "Advanced" },
                { name: "Postman", icon: SiPostman, level: "Proficient" },
                { name: "Docker", icon: SiDocker, level: "Familiar" },
                { name: "Linux / CLI", icon: SiLinux, level: "Proficient" },
            ],
        },
    ];

    return (
        <section id="skills" aria-labelledby="skills-heading" className="max-w-[1080px] mx-auto px-6 py-16 md:py-24">
            <ScrollReveal>
                {/* Section Header */}
                <div className="mb-10">
                    <span className="block text-xs font-mono tracking-wider text-text-faint uppercase mb-2">
                        02 / Tech Stack
                    </span>
                    <h2 id="skills-heading" className="text-3xl font-semibold tracking-tight text-text-main">
                        Technologies & Tools
                    </h2>
                    <p className="mt-2 text-sm text-text-muted max-w-[60ch]">
                        The languages, frameworks, and developer tools I work with daily to build production applications.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            className="
                                p-6
                                rounded-[12px]
                                border border-border
                                bg-surface
                                hover:border-text-faint/80
                                transition-all
                                duration-200
                            "
                        >
                            <div className="mb-4">
                                <h3 className="text-base font-semibold text-text-main flex items-center justify-between">
                                    <span>{cat.title}</span>
                                    <span className="text-[11px] font-mono text-accent">0{idx + 1}</span>
                                </h3>
                                <p className="text-xs text-text-muted mt-1">
                                    {cat.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-border/60">
                                {cat.skills.map((skill) => {
                                    const Icon = skill.icon;
                                    return (
                                        <div
                                            key={skill.name}
                                            className="
                                                group
                                                flex items-center gap-2.5
                                                p-2.5
                                                rounded-[8px]
                                                bg-bg
                                                border border-border
                                                hover:border-accent
                                                hover:bg-surface-2
                                                transition-all
                                                duration-150
                                            "
                                        >
                                            <div className="w-6 h-6 rounded-[5px] bg-surface flex items-center justify-center text-text-muted group-hover:text-accent transition-colors shrink-0">
                                                <Icon size={14} />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-xs font-medium text-text-main group-hover:text-accent transition-colors truncate">
                                                    {skill.name}
                                                </div>
                                                <div className="text-[10px] font-mono text-text-faint truncate">
                                                    {skill.level}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
};

export default TechStack;
