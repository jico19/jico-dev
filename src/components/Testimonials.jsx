import PageOrientation from "./PageOrientation";
import ScrollReveal from "./ScrollReveal";
import { MessageSquareQuote, Sparkles } from "lucide-react";

const Testimonials = () => {
    const placeholders = [
        {
            quote: "Testimonial coming soon. Currently collaborating with client teams on backend and full-stack solutions.",
            author: "Client / Collaborator",
            role: "Product Lead",
            company: "Tech Venture",
            available: false,
        },
        {
            quote: "Testimonial placeholder. Delivering scalable APIs, system architecture, and modern React interfaces.",
            author: "Engineering Manager",
            role: "Software Team",
            company: "Digital Studio",
            available: false,
        },
    ];

    return (
        <section id="testimonials" aria-labelledby="testimonials-heading" className="max-w-[1080px] mx-auto px-6 py-16 md:py-24">
            <ScrollReveal>
                {/* Section Header */}
                <div className="mb-10">
                    <PageOrientation pageOrientation="Testimonials" />
                    <h2 id="testimonials-heading" className="text-3xl font-semibold tracking-tight text-text-main">
                        Testimonials
                    </h2>
                    <p className="mt-2 text-sm text-text-muted max-w-[60ch]">
                        Feedback and recommendations from people I collaborate with.
                    </p>
                </div>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {placeholders.map((item, idx) => (
                        <div
                            key={idx}
                            className="
                                relative
                                p-6
                                rounded-[12px]
                                border border-dashed border-border
                                bg-surface/50
                                hover:border-text-faint/80
                                transition-all
                                flex flex-col justify-between
                                min-h-[190px]
                            "
                        >
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-3 text-text-faint">
                                    <MessageSquareQuote size={20} className="text-accent/80" />
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-surface-2 border border-border text-text-muted">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                                        Pending Review
                                    </span>
                                </div>
                                <p className="text-sm text-text-muted italic leading-relaxed">
                                    "{item.quote}"
                                </p>
                            </div>

                            <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                                <div>
                                    <div className="font-medium text-text-main">
                                        {item.author}
                                    </div>
                                    <div className="text-text-faint font-mono text-[11px]">
                                        {item.role} · {item.company}
                                    </div>
                                </div>
                                <span className="text-[11px] font-mono text-accent">#0{idx + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Callout box inviting future reviews */}
                <div className="rounded-[10px] border border-border bg-surface p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-[6px] bg-bg border border-border flex items-center justify-center text-accent shrink-0">
                            <Sparkles size={16} />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-text-main">
                                Have we worked together?
                            </div>
                            <div className="text-xs text-text-muted">
                                If you've collaborated with me on a project, I'd welcome your feedback.
                            </div>
                        </div>
                    </div>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-surface-2 hover:bg-border text-xs font-mono text-text-main transition-colors border border-border shrink-0 cursor-pointer"
                    >
                        <span>Leave feedback</span>
                        <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Testimonials;
