import { useState } from "react";
import { FaGithub, FaFacebook, FaEnvelope } from "react-icons/fa";
import ScrollReveal from "./ScrollReveal";

const Contact = () => {
    const [copied, setCopied] = useState(false);

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
        <section id="contact" className="max-w-6xl mx-auto px-6 py-24">
            <ScrollReveal direction="up" duration={800}>
                <div className="mb-12">
                    <h2 className="text-4xl font-bold text-zinc-100">
                        Contact
                    </h2>

                    <p className="mt-2 text-zinc-400">
                        Interested in working together or discussing a project?
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid gap-4 md:grid-cols-3">

                {/* Email Card */}
                <ScrollReveal delay={0} direction="up" duration={800}>
                    <button
                        onClick={copyEmail}
                        className="
                            w-full
                            text-left
                            group
                            rounded-xl
                            border border-zinc-800
                            bg-zinc-900
                            p-5
                            hover:border-zinc-700
                            transition-all
                            cursor-pointer
                        "
                    >
                        <div className="flex items-center gap-3">
                            <FaEnvelope
                                size={20}
                                className="
                                    text-zinc-400
                                    group-hover:text-zinc-100
                                    transition-colors
                                "
                            />

                            <div>
                                <p className="text-sm text-zinc-500">
                                    Email
                                </p>

                                <p className="text-zinc-100 break-all text-sm md:text-base">
                                    jerwinquijano19@gmail.com
                                </p>

                                <p className="text-xs text-zinc-500">
                                    {copied
                                        ? "Copied!"
                                        : "Click to copy"}
                                </p>
                            </div>
                        </div>
                    </button>
                </ScrollReveal>

                {/* Socials */}
                {contacts.map((item, idx) => {
                    const Icon = item.icon;

                    return (
                        <ScrollReveal key={item.label} delay={(idx + 1) * 150} direction="up" duration={800}>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    block
                                    group
                                    rounded-xl
                                    border border-zinc-800
                                    bg-zinc-900
                                    p-5
                                    hover:border-zinc-700
                                    transition-all
                                "
                            >
                                <div className="flex items-center gap-3">
                                    <Icon
                                        size={20}
                                        className="
                                            text-zinc-400
                                            group-hover:text-zinc-100
                                            transition-colors
                                        "
                                    />

                                    <div>
                                        <p className="text-sm text-zinc-500">
                                            {item.label}
                                        </p>

                                        <p className="text-zinc-100">
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </ScrollReveal>
                    );
                })}
            </div>
        </section>
    );
};

export default Contact;