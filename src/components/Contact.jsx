import { useState } from "react";
import { Check, ArrowUpRight, Send, AlertCircle, Loader2 } from "lucide-react";
import { FaGithub, FaFacebook } from "react-icons/fa";
import ScrollReveal from "./ScrollReveal";
import { sendContactEmail } from "../services/emailService";
import { FaLinkedin } from "react-icons/fa6";

const Contact = () => {

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null,
    });



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (status.error) {
            setStatus((prev) => ({ ...prev, error: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        try {
            await sendContactEmail(formData);
            setStatus({ loading: false, success: true, error: null });
            setFormData({ name: "", email: "", message: "" });

            setTimeout(() => {
                setStatus((prev) => ({ ...prev, success: false }));
            }, 5000);
        } catch (err) {
            setStatus({
                loading: false,
                success: false,
                error: err?.text || err?.message || "Failed to send message. Please try again.",
            });
        }
    };

    const socials = [
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
        {
            label: "LinkedIn",
            value: "https://www.linkedin.com/in/jerwin-nico-h-quijano",
            link: "https://www.linkedin.com/in/jerwin-nico-h-quijano-0471343b7/",
            icon:  FaLinkedin,
        },
    ];

    return (
        <section id="contact" aria-labelledby="contact-heading" className="max-w-[1080px] mx-auto px-6 py-16 md:py-24">
            <ScrollReveal>
                {/* Section Header */}
                <div className="mb-10">
                    <span className="block text-xs font-mono tracking-wider text-text-faint uppercase mb-2">
                        06 / Contact
                    </span>
                    <h2 id="contact-heading" className="text-3xl font-semibold tracking-tight text-text-main">
                        Contact
                    </h2>
                    <p className="mt-2 text-sm text-text-muted max-w-[60ch]">
                        Interested in working together or discussing a project? Send a direct message below.
                    </p>
                </div>

                {/* Form & Direct Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-7 rounded-[12px] border border-border bg-surface p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="contact-name" className="block text-xs font-mono text-text-muted mb-2">
                                    Name
                                </label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Your Name"
                                    className="w-full px-4 py-2.5 rounded-[8px] bg-bg border border-border text-sm text-text-main placeholder:text-text-faint focus:border-accent focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-email" className="block text-xs font-mono text-text-muted mb-2">
                                    Email
                                </label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-2.5 rounded-[8px] bg-bg border border-border text-sm text-text-main placeholder:text-text-faint focus:border-accent focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-message" className="block text-xs font-mono text-text-muted mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Write your message here..."
                                    className="w-full px-4 py-2.5 rounded-[8px] bg-bg border border-border text-sm text-text-main placeholder:text-text-faint focus:border-accent focus:outline-none transition-colors resize-none"
                                />
                            </div>

                            {/* Status notifications */}
                            {status.success && (
                                <div className="p-3 rounded-[6px] bg-accent/10 border border-accent/20 text-accent text-xs flex items-center gap-2 animate-fade-up">
                                    <Check size={14} />
                                    <span>Message sent successfully! I will get back to you soon.</span>
                                </div>
                            )}

                            {status.error && (
                                <div className="p-3 rounded-[6px] bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2 animate-fade-up">
                                    <AlertCircle size={14} />
                                    <span>{status.error}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status.loading}
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[8px] bg-accent text-accent-contrast font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
                            >
                                {status.loading ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={15} />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact details & Links */}
                    <div className="lg:col-span-5 flex flex-col gap-4">

                        {/* Social Cards */}
                        {socials.map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.label}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        group
                                        p-5
                                        rounded-[10px]
                                        border border-border
                                        bg-surface
                                        hover:bg-surface-2
                                        hover:border-accent
                                        hover:-translate-y-0.5
                                        active:translate-y-0
                                        active:scale-[0.99]
                                        transition-all
                                        duration-200
                                        flex flex-col justify-between
                                    "
                                >
                                    <div className="flex items-center justify-between w-full mb-3">
                                        <div className="w-8 h-8 rounded-[6px] bg-bg border border-border flex items-center justify-center text-text-muted group-hover:text-accent transition-colors duration-200">
                                            <Icon size={16} className="group-hover:scale-110 transition-transform duration-200" />
                                        </div>
                                        <div className="text-xs font-mono text-text-muted group-hover:text-accent flex items-center gap-1 transition-colors">
                                            <span>{item.label}</span>
                                            <ArrowUpRight
                                                size={14}
                                                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-xs text-text-faint mb-1">Follow profile</div>
                                        <div className="text-sm font-medium text-text-main truncate group-hover:text-accent transition-colors duration-200">
                                            {item.value}
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Contact;