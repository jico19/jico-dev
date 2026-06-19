import { FaGithub, FaFacebook } from "react-icons/fa";
import ScrollReveal from "./ScrollReveal";


const Hero = () => {
    const tech_stacks = [
        { label: 'Django' },
        { label: 'DRF' },
        { label: 'Python' },
        { label: 'PostgreSQL' },
        { label: 'React' },
    ]

    const social_link = [
        {
            label: 'GitHub', link: 'https://github.com/jico19', icon: FaGithub,
        },
        {
            label: 'Facebook', link: 'https://www.facebook.com/Ekkosecc', icon: FaFacebook,
        },
    ]

    return (
        <section id="home" className="max-w-6xl mx-auto px-6 py-24">
            <ScrollReveal direction="up" duration={800}>
                <div className="space-y-6">

                    {/* Intro */}
                    <div className="space-y-3">
                        <h1 className="text-5xl font-bold text-zinc-100">
                            Hi, I'm Jerwin
                        </h1>

                        <div className="flex gap-5 text-sm">
                            {social_link.map((item, idx) => {
                                const Icon = item.icon;

                                return (
                                    <a
                                        key={idx}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            flex items-center gap-2
                                            text-zinc-400
                                            hover:text-zinc-100
                                            hover:translate-x-0.5
                                            transition-all
                                        "
                                    >
                                        <Icon size={16} />
                                        <span>{item.label}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Role */}
                    <div>
                        <p className="text-xl font-medium text-zinc-300">
                            Backend Developer | Full Stack Developer
                        </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-3">
                        {tech_stacks.map((item, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 text-sm rounded-md
                                bg-zinc-800 border border-zinc-700
                                text-zinc-300 hover:bg-zinc-500 hover:text-zinc-50"
                            >
                                {item.label}
                            </span>
                        ))}
                    </div>

                    {/* Description */}
                    <p className="max-w-2xl text-zinc-400 leading-relaxed">
                        I build secure and scalable web applications
                        using Django, Django REST Framework,
                        PostgreSQL, and React. Currently pursuing
                        a BSIT degree while developing backend-focused
                        projects and REST APIs.
                    </p>

                    {/* CTA */}
                    <div className="flex gap-4 pt-2">
                        <a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="
                            px-5 py-2 rounded-md
                            bg-zinc-100 text-zinc-900
                            hover:bg-zinc-300
                            transition-colors
                            text-center
                            inline-block
                            cursor-pointer
                        "
                        >
                            View Projects
                        </a>

                        <button
                            className="
                            px-5 py-2 rounded-md
                            border border-zinc-700
                            text-zinc-300
                            hover:bg-zinc-800
                            transition-colors
                            cursor-pointer
                        "
                        >
                            Resume
                        </button>
                    </div>

                </div>
            </ScrollReveal>
        </section>
    )
}

export default Hero