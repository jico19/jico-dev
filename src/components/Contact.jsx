import { useState } from "react";
import { FaGithub, FaFacebook, FaEnvelope } from "react-icons/fa";
import TerminalPromptReveal from "./TerminalPromptReveal";

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const contacts = [
        {
            label: "GitHub",
            value: "github.com/jico19",
            link: "https://github.com/jico19/",
            icon: FaGithub,
        },
        {
            label: "Facebook",
            value: "facebook.com/Ekkosecc",
            link: "https://www.facebook.com/Ekkosecc",
            icon: FaFacebook,
        },
    ];

    const copyEmail = async () => {
        await navigator.clipboard.writeText(
            "jerwinquijano19@gmail.com"
        );

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <section id="contact" className="max-w-4xl mx-auto px-6 py-12 md:py-16">
            <div className="mb-8 border-l-2 border-accent pl-4">
                <TerminalPromptReveal 
                    command="ping -c 1 contact" 
                    onComplete={() => setShowContent(true)} 
                />

                <p 
                    className={`mt-2 text-xs text-zinc-400 font-mono transition-all duration-300 ${
                        showContent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
                    }`}
                >
                    // Interested in working together or discussing a project?
                </p>
            </div>

            <div 
                className={`grid gap-6 md:grid-cols-3 transition-all duration-300 ${
                    showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                }`}
            >

                {/* Email Card */}
                <button
                    onClick={copyEmail}
                    className="
                        w-full
                        text-left
                        group
                        rounded-none
                        border border-zinc-700
                        bg-zinc-900
                        hover:border-accent
                        hover:shadow-[0_0_15px_rgba(0,255,133,0.15)]
                        transition-all
                        btn-transition
                        cursor-pointer
                        overflow-hidden
                    "
                >
                    {/* Terminal Header */}
                    <div className="bg-zinc-850 px-3 py-1.5 border-b border-zinc-700 flex items-center justify-between text-[10px] font-mono text-zinc-400 select-none">
                        <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C5C] block"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E6C229] block"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF85] block"></span>
                        </div>
                        <div className="text-zinc-400 font-mono">~/contact/email</div>
                    </div>

                    <div className="p-4 flex gap-3 font-mono items-center">
                        <FaEnvelope
                            size={18}
                            className="
                                text-zinc-500
                                group-hover:text-accent
                                transition-colors
                                btn-transition
                                shrink-0
                            "
                        />

                        <div className="space-y-1.5 text-xs min-w-0">
                            <div className="text-zinc-500 text-[10px]">$ cat email.txt</div>
                            <div className="text-zinc-100 font-semibold break-all text-[11px] sm:text-xs">
                                jerwinquijano19@gmail.com
                            </div>
                            <div className="text-accent text-[10px] font-semibold">
                                {copied
                                    ? "[ SUCCESS ] copied!"
                                    : "[ CLICK TO COPY ]"}
                            </div>
                        </div>
                    </div>
                </button>

                {/* Socials */}
                {contacts.map((item, idx) => {
                    const Icon = item.icon;

                    return (
                        <a
                            key={idx}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                block
                                group
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
                            {/* Terminal Header */}
                            <div className="bg-zinc-850 px-3 py-1.5 border-b border-zinc-700 flex items-center justify-between text-[10px] font-mono text-zinc-400 select-none">
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C5C] block"></span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#E6C229] block"></span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF85] block"></span>
                                </div>
                                <div className="text-zinc-400 font-mono">~/contact/{item.label.toLowerCase()}</div>
                            </div>

                            <div className="p-4 flex gap-3 font-mono items-center">
                                <Icon
                                    size={18}
                                    className="
                                        text-zinc-500
                                        group-hover:text-accent
                                        transition-colors
                                        btn-transition
                                        shrink-0
                                    "
                                />

                                <div className="space-y-1.5 text-xs min-w-0">
                                    <div className="text-zinc-500 text-[10px]">$ get --link</div>
                                    <div className="text-zinc-100 font-semibold break-all text-[11px] sm:text-xs">
                                        {item.value}
                                    </div>
                                    <div className="text-accent text-[10px] font-semibold">
                                        [ VISIT SITE ]
                                    </div>
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
        </section>
    );
};

export default Contact;