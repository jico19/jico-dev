import { useState, useEffect } from "react";
import { FaGithub, FaFacebook } from "react-icons/fa";
import ScrollReveal from "./ScrollReveal";

const Hero = () => {
    const [text, setText] = useState("");
    const [roleText, setRoleText] = useState("");
    const [showCursor] = useState(true);

    const fullText = "Hi, I'm Jerwin";
    const fullRole = "Backend Developer | Full Stack Developer";

    useEffect(() => {
        let nameIndex = 0;
        const nameInterval = setInterval(() => {
            setText(fullText.slice(0, nameIndex + 1));
            nameIndex++;
            if (nameIndex >= fullText.length) {
                clearInterval(nameInterval);
                
                // Start typing role text after a small delay
                setTimeout(() => {
                    let roleIndex = 0;
                    const roleInterval = setInterval(() => {
                        setRoleText(fullRole.slice(0, roleIndex + 1));
                        roleIndex++;
                        if (roleIndex >= fullRole.length) {
                            clearInterval(roleInterval);
                        }
                    }, 20); // 20ms/char
                }, 300);
            }
        }, 35); // 35ms/char

        return () => {
            clearInterval(nameInterval);
        };
    }, []);

    const tech_stacks = [
        { label: 'Django' },
        { label: 'DRF' },
        { label: 'Python' },
        { label: 'PostgreSQL' },
        { label: 'React' },
    ];

    const social_link = [
        {
            label: 'GitHub', link: 'https://github.com/jico19', icon: FaGithub,
        },
        {
            label: 'Facebook', link: 'https://www.facebook.com/Ekkosecc', icon: FaFacebook,
        },
    ];

    return (
        <section id="home" className="max-w-4xl mx-auto px-6 py-12 md:py-20">
            <ScrollReveal direction="up" duration={200}>
                {/* Terminal Window */}
                <div className="border border-zinc-700 bg-zinc-900 rounded-none overflow-hidden glow-green-hover transition-shadow duration-300">
                    
                    {/* Terminal Header */}
                    <div className="bg-zinc-800 px-4 py-2.5 border-b border-zinc-700 flex items-center justify-between text-xs font-mono text-zinc-400 select-none">
                        <div className="flex gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#FF5C5C] block"></span>
                            <span className="w-3 h-3 rounded-full bg-[#E6C229] block"></span>
                            <span className="w-3 h-3 rounded-full bg-[#00FF85] block"></span>
                        </div>
                        <div className="font-semibold text-zinc-300">jerwin@portfolio: ~</div>
                        <div className="w-12"></div> {/* spacer */}
                    </div>

                    {/* Terminal Body */}
                    <div className="p-6 space-y-6 font-mono text-left">
                        
                        {/* Prompt Line */}
                        <div className="text-zinc-500 text-xs">
                            guest@jico-dev:~$ cat intro.txt
                        </div>

                        {/* Intro */}
                        <div className="space-y-3">
                            <h1 className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight flex items-center flex-wrap">
                                <span>{text}</span>
                                {showCursor && (
                                    <span className="inline-block w-2.5 h-8 md:h-11 bg-accent ml-1.5 cursor-blink align-middle" />
                                )}
                            </h1>

                            <div className="flex gap-4 text-xs font-mono">
                                {social_link.map((item, idx) => {
                                    const Icon = item.icon;

                                    return (
                                        <a
                                            key={idx}
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                                flex items-center gap-1.5
                                                text-zinc-400
                                                hover:text-accent
                                                hover:translate-x-0.5
                                                transition-all
                                                btn-transition
                                            "
                                        >
                                            <Icon size={14} />
                                            <span>{item.label}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Role */}
                        <div>
                            <p className="text-sm md:text-base font-medium text-accent">
                                &gt; {roleText}
                                {roleText.length > 0 && roleText.length < fullRole.length && (
                                    <span className="inline-block w-2 h-4 bg-accent ml-0.5 cursor-blink align-middle" />
                                )}
                            </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-2">
                            <div className="text-zinc-500 text-xs">$ list --skills</div>
                            <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-accent">
                                {tech_stacks.map((item, idx) => (
                                    <span key={idx} className="font-mono">
                                        [ {item.label} ]
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <div className="text-zinc-500 text-xs">$ cat about_me.md</div>
                            <p className="max-w-2xl text-zinc-300 leading-relaxed text-xs md:text-sm">
                                I build secure and scalable web applications
                                using Django, Django REST Framework,
                                PostgreSQL, and React. Currently pursuing
                                a BSIT degree while developing backend-focused
                                projects and REST APIs.
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            <a
                                href="#projects"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="
                                px-4 py-2 rounded-none
                                bg-accent text-zinc-950 font-bold
                                hover:shadow-[0_0_15px_rgba(0,255,133,0.35)]
                                hover:-translate-y-[2px] active:translate-y-0
                                transition-all btn-transition
                                text-center inline-block cursor-pointer text-xs
                            "
                            >
                                $ run projects.sh
                            </a>

                            <button
                                onClick={() => {
                                    // Normally download resume, for now show alert or placeholder
                                    window.open('/resume.pdf', '_blank');
                                }}
                                className="
                                px-4 py-2 rounded-none
                                border border-zinc-700 text-zinc-100 bg-transparent
                                hover:border-accent hover:text-accent
                                hover:-translate-y-[2px] active:translate-y-0
                                transition-all btn-transition
                                text-center inline-block cursor-pointer text-xs
                            "
                            >
                                $ cat resume.pdf
                            </button>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Hero;