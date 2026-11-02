import PageOrientation from "./PageOrientation";
import ScrollReveal from "./ScrollReveal";
import { ArrowUpRight } from "lucide-react";

const About = () => (
    <section id="about" aria-labelledby="about-heading" className="max-w-[1080px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <ScrollReveal>
            <div className="max-w-[920px] mx-auto grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] lg:grid-cols-[340px_minmax(0,1fr)] gap-8 md:gap-10 lg:gap-14 items-center">
                <div className="relative isolate w-full max-w-[280px] sm:max-w-[340px] justify-self-center md:justify-self-start">
                    <div aria-hidden="true" className="absolute inset-0 -z-10 translate-x-2.5 translate-y-2.5 border border-accent/25" />
                    <div className="blueprint-panel p-2">
                        <img src="/me-pic.png" alt="Jerwin Nico Quijano" width="998" height="956" loading="lazy" className="block w-full h-auto rounded-[2px]" />
                    </div>
                </div>
                <div className="space-y-4 text-sm sm:text-base text-text-muted leading-relaxed max-w-[66ch]">
                    <div className="mb-5">
                        <PageOrientation pageOrientation="About" />
                        <h2 id="about-heading" className="text-3xl md:text-4xl font-medium tracking-tight leading-tight text-text-main">Jerwin Nico Quijano</h2>
                    </div>
                    <p>
                        I’m a freelance fullstack developer based in the Philippines.
                        Since 2024, I’ve built tools and web applications for clients
                        using React, Python, and PostgreSQL.
                    </p>
                    <p>
                        My current work includes a healthcare platform for a US client
                        and FarmPass, a solo-built livestock permit capstone prototype.
                        I’m open to junior fullstack opportunities.
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2 font-mono text-xs">
                        <a href="https://github.com/jico19" target="_blank" rel="noopener noreferrer" className="min-h-11 inline-flex items-center gap-1 hover:text-text-main transition-colors">
                            github <ArrowUpRight size={12} aria-hidden="true" />
                        </a>
                        <a href="https://www.linkedin.com/in/jerwin-nico-h-quijano-0471343b7/" target="_blank" rel="noopener noreferrer" className="min-h-11 inline-flex items-center gap-1 hover:text-text-main transition-colors">
                            linkedin <ArrowUpRight size={12} aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    </section>
);

export default About;
