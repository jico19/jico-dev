import PageOrientation from "./PageOrientation";
import { useEffect, useRef } from "react";
import { AppWindow, ArrowRight, BookOpen, GraduationCap, Workflow, X } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ProjectRequestForm from "./ProjectRequestForm";

const services = [
    {
        title: "Custom apps",
        icon: AppWindow,
        description: "An app made for the way you work. Manage bookings, track inventory, or keep customer records in one place.",
    },
    {
        title: "Automation tools",
        icon: Workflow,
        description: "Spend less time on repetitive tasks. I can build tools to organize files, update spreadsheets, or put together reports for you.",
    },
    {
        title: "School projects",
        icon: BookOpen,
        description: "Websites and simple apps for class requirements, built around your teacher’s instructions, with help understanding how they work.",
    },
    {
        title: "Capstone systems",
        icon: GraduationCap,
        description: "A working system based on your approved proposal, with help setting it up and walking through its features.",
    },
];

const Services = () => {
    const dialogRef = useRef(null);
    const triggerRef = useRef(null);
    const previousOverflowRef = useRef("");
    const backdropPointerRef = useRef(false);

    useEffect(() => {
        const dialog = dialogRef.current;
        return () => {
            if (dialog.open) {
                dialog.close();
                document.body.style.overflow = previousOverflowRef.current;
            }
        };
    }, []);

    const openRequest = () => {
        if (dialogRef.current.open) return;
        previousOverflowRef.current = document.body.style.overflow;
        dialogRef.current.showModal();
        document.body.style.overflow = "hidden";
    };

    const handleClose = () => {
        document.body.style.overflow = previousOverflowRef.current;
        triggerRef.current?.focus({ preventScroll: true });
    };

    return (
        <section id="services" aria-labelledby="services-heading" className="max-w-[1080px] mx-auto px-6 py-16 md:py-24">
            <ScrollReveal>
                <div className="mb-8 md:mb-10">
                    <PageOrientation pageOrientation="Services" />
                    <h2 id="services-heading" className="text-3xl font-semibold tracking-tight text-text-main">
                        Custom apps at affordable rates.
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-text-muted max-w-[58ch] leading-relaxed">
                        Need an app for your business, a tool to save time, or help with a school project?
                        I build custom apps, automation tools, and capstone systems at affordable rates.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                    <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                        <div className="relative flex flex-col p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-border">
                            <div aria-hidden="true" className="mb-6 flex size-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                                <AppWindow size={24} strokeWidth={1.5} />
                            </div>
                            <p className="text-xs font-mono text-accent mb-3">For businesses & students</p>
                            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight text-text-main max-w-[16ch]">
                                Let’s work with your budget.
                            </h3>
                            <p className="mt-4 text-sm sm:text-base leading-relaxed text-text-muted">
                                Tell me what you need, your budget, and when you need it.
                                I’ll help you decide which features to include and give you a price before we start.
                            </p>
                            <div className="mt-8 lg:mt-auto lg:pt-10">
                                <button
                                    ref={triggerRef}
                                    type="button"
                                    aria-haspopup="dialog"
                                    aria-controls="project-request"
                                    onClick={openRequest}
                                    className="inline-flex w-full sm:w-auto min-h-11 items-center justify-center gap-3 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-hover cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                                >
                                    Tell me about your project
                                    <ArrowRight size={16} aria-hidden="true" />
                                </button>
                                <p className="mt-3 text-xs leading-relaxed text-text-muted">
                                    No technical knowledge needed. Just tell me your idea.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 lg:p-10">
                            <h4 className="mb-6 text-xs font-mono uppercase tracking-wider text-text-muted">What I can help with</h4>
                            <ul className="divide-y divide-border">
                                {services.map(({ title, icon: Icon, description }) => (
                                    <li key={title} className="flex items-start gap-4 py-5 first:pt-0 last:pb-0">
                                        <Icon size={19} strokeWidth={1.5} aria-hidden="true" className="mt-1 shrink-0 text-accent" />
                                        <div>
                                            <h5 className="text-sm font-semibold text-text-main">{title}</h5>
                                            <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            <dialog
                ref={dialogRef}
                id="project-request"
                aria-labelledby="project-request-heading"
                aria-describedby="project-request-intro"
                onClose={handleClose}
                onKeyDown={(event) => {
                    if (event.key !== "Tab") return;
                    const controls = event.currentTarget.querySelectorAll(
                        "button:not(:disabled), input:not(:disabled), textarea:not(:disabled)",
                    );
                    const first = controls[0];
                    const last = controls[controls.length - 1];
                    if (event.shiftKey && (document.activeElement === first || document.activeElement.id === "project-request-heading")) {
                        event.preventDefault();
                        last?.focus();
                    } else if (!event.shiftKey && document.activeElement === last) {
                        event.preventDefault();
                        first?.focus();
                    }
                }}
                onPointerDown={(event) => {
                    backdropPointerRef.current = event.target === event.currentTarget;
                }}
                onClick={(event) => {
                    if (backdropPointerRef.current && event.target === event.currentTarget) {
                        event.currentTarget.close();
                    }
                }}
                className="m-auto w-[calc(100%-2rem)] max-w-2xl max-h-[calc(100dvh-2rem)] overflow-hidden rounded-2xl border border-border bg-surface p-0 text-text-main shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm open:flex open:flex-col"
            >
                <div className="shrink-0 flex items-start justify-between gap-4 border-b border-border px-5 py-5 sm:px-8 sm:py-6">
                    <div>
                        <h2 id="project-request-heading" tabIndex={-1} autoFocus className="text-xl sm:text-2xl font-semibold tracking-tight focus:outline-none">
                            Tell me about your project
                        </h2>
                        <p id="project-request-intro" className="mt-2 text-sm leading-relaxed text-text-muted">
                            Share what you have in mind. I’ll reply by email to discuss the details.
                        </p>
                    </div>
                    <button
                        type="button"
                        aria-label="Close project request"
                        onClick={() => dialogRef.current.close()}
                        className="flex size-11 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-2 hover:text-text-main cursor-pointer"
                    >
                        <X size={20} aria-hidden="true" />
                    </button>
                </div>
                <div className="min-h-0 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
                    <p className="mb-5 text-xs text-text-muted">Fields marked * are required. Your draft stays here if you close this window.</p>
                    <ProjectRequestForm />
                </div>
            </dialog>
        </section>
    );
};

export default Services;
