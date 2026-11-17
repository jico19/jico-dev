import { useEffect, useLayoutEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import PageOrientation from "./PageOrientation";
import { animate, stagger } from "../lib/anime";
import { useAnimationsEnabled } from "../lib/motion";
import { navigate } from "../lib/router";

const LINK_VARIANTS = {
    primary:
        "blueprint-button inline-flex min-h-11 items-center justify-center gap-2 border border-accent bg-accent px-5 text-sm font-medium text-accent-contrast hover:brightness-95",
    secondary:
        "blueprint-button inline-flex min-h-11 items-center justify-center gap-2 border border-border bg-bg/60 px-5 text-sm font-medium text-text-main hover:border-accent",
    text: "min-h-11 inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-main",
};

const CaseStudyLink = ({ href, external = false, variant = "text", icon: Icon, className = "", children }) => {
    const classes = `${LINK_VARIANTS[variant] ?? LINK_VARIANTS.text} ${className}`.trim();
    const content = (
        <>
            {children}
            {Icon && <Icon size={15} aria-hidden="true" />}
        </>
    );

    if (external) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
                {content}
            </a>
        );
    }

    if (href.startsWith("#")) {
        return (
            <a href={href} className={classes}>
                {content}
            </a>
        );
    }

    return (
        <a
            href={href}
            onClick={(event) => {
                event.preventDefault();
                navigate(href);
            }}
            className={classes}
        >
            {content}
        </a>
    );
};

const CaseStudyMedia = ({ src, alt, width, height, className = "", loading = "lazy" }) => (
    <figure className={`blueprint-panel p-2 ${className}`.trim()}>
        <div className="overflow-hidden rounded-[2px]">
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                loading={loading}
                decoding="async"
                className="block h-auto w-full transition-transform duration-300 ease-out hover:scale-[1.02]"
            />
        </div>
    </figure>
);

const CaseStudyFlow = ({ steps = [] }) => (
    <ol className="case-study-flow grid gap-8 md:grid-cols-5 md:gap-5">
        {steps.map((step, index) => {
            const Icon = step.icon;
            return (
                <li key={step.label} className="case-study-flow-step flex gap-4 md:block">
                    <span className="case-study-flow-marker" aria-hidden="true">
                        {Icon ? <Icon size={16} /> : null}
                    </span>
                    <div className="min-w-0 md:mt-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">
                            {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-1 text-sm font-semibold text-text-main">{step.label}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-text-muted">{step.detail}</p>
                    </div>
                </li>
            );
        })}
    </ol>
);

const CaseStudyNote = ({ title, body = [] }) => (
    <aside className="blueprint-panel p-5 sm:p-7">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{title}</h3>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-text-muted">
            {body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
            ))}
        </div>
    </aside>
);

const CaseStudyParagraphs = ({ items = [] }) => (
    <div className="max-w-[68ch] space-y-4 text-sm leading-relaxed text-text-muted sm:text-base">
        {items.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
        ))}
    </div>
);

const CaseStudyFacts = ({ items = [] }) => (
    <dl className="grid gap-x-8 gap-y-5 border-t border-border pt-5 sm:grid-cols-3">
        {items.map((item) => (
            <div key={item.label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">{item.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-text-main">{item.value}</dd>
            </div>
        ))}
    </dl>
);

const CaseStudyList = ({ items = [] }) => (
    <ul className="max-w-[68ch] space-y-2 text-sm leading-relaxed text-text-muted sm:text-base">
        {items.map((item) => (
            <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 bg-accent" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

const CaseStudyCapabilities = ({ items = [] }) => (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => {
            const Icon = item.icon;
            return (
                <li key={item.title} className="blueprint-panel p-5 transition-transform duration-200 ease-out hover:-translate-y-0.5">
                    {Icon && <Icon size={18} className="text-accent" aria-hidden="true" />}
                    <h3 className="mt-3 text-sm font-semibold text-text-main">{item.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-text-muted">{item.detail}</p>
                </li>
            );
        })}
    </ul>
);

const BLOCK_TYPES = {
    paragraphs: CaseStudyParagraphs,
    facts: CaseStudyFacts,
    list: CaseStudyList,
    capabilities: CaseStudyCapabilities,
    flow: CaseStudyFlow,
    note: CaseStudyNote,
    media: CaseStudyMedia,
};

const CaseStudyBlocks = ({ blocks = [] }) =>
    blocks.map((block, index) => {
        const Block = BLOCK_TYPES[block.type];
        if (!Block) return null;

        return <Block key={`${block.type}-${index}`} {...block} />;
    });

const CaseStudyHero = ({ study, backHref, backLabel }) => {
    const heroRef = useRef(null);
    const animationsEnabled = useAnimationsEnabled();

    useLayoutEffect(() => {
        const root = heroRef.current;
        if (!root || !animationsEnabled) return;

        const targets = root.querySelectorAll(".case-study-enter");
        const animation = animate(targets, {
            opacity: [0, 1],
            translateY: [12, 0],
            duration: 520,
            delay: stagger(70),
            ease: "outExpo",
        });

        return () => animation.pause?.();
    }, [animationsEnabled, study.id]);

    return (
        <section
            ref={heroRef}
            aria-labelledby="case-study-title"
            className="mx-auto max-w-[1080px] px-6 pb-14 pt-8 md:px-10 md:pb-20 md:pt-10"
        >
            <div className="flex flex-wrap items-center justify-between gap-3">
                <CaseStudyLink href={backHref}>
                    <ArrowLeft size={15} aria-hidden="true" /> {backLabel}
                </CaseStudyLink>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">{study.orientation}</span>
            </div>

            <div className="mt-10 grid gap-10 md:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,430px)] lg:items-center xl:gap-14">
                <div className="min-w-0">
                    <h1
                        id="case-study-title"
                        className="case-study-enter text-[clamp(3rem,6.4vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-text-main"
                    >
                        {study.title}
                        <span className="text-accent" aria-hidden="true">.</span>
                    </h1>
                    <p className="case-study-enter mt-5 max-w-[46ch] text-base leading-relaxed text-text-muted md:text-lg">
                        {study.deck}
                    </p>
                    <p className="case-study-enter mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
                        {study.meta}
                    </p>
                    <div className="case-study-enter mt-7 flex flex-wrap items-center gap-3">
                        {study.actions?.map((action) => (
                            <CaseStudyLink
                                key={action.label}
                                href={action.href}
                                external={action.external}
                                variant={action.variant}
                                icon={action.icon}
                            >
                                {action.label}
                            </CaseStudyLink>
                        ))}
                    </div>
                </div>

                {study.media && <CaseStudyMedia {...study.media} loading="eager" className="case-study-enter" />}
            </div>

            {study.facts?.length > 0 && (
                <dl className="case-study-enter mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 sm:grid-cols-4">
                    {study.facts.map((fact) => (
                        <div key={fact.label}>
                            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">{fact.label}</dt>
                            <dd className="mt-1 text-sm leading-relaxed text-text-main">{fact.value}</dd>
                        </div>
                    ))}
                </dl>
            )}
        </section>
    );
};

const CaseStudySection = ({ section }) => (
    <section
        id={section.id}
        aria-labelledby={`${section.id}-heading`}
        className="mx-auto max-w-[1080px] border-t border-border px-6 py-14 md:px-10 md:py-20"
    >
        <PageOrientation pageOrientation={section.label} className="mb-3" />
        <h2
            id={`${section.id}-heading`}
            className="max-w-[34ch] text-2xl font-semibold tracking-tight text-text-main md:text-3xl"
        >
            {section.heading}
        </h2>
        {section.intro && (
            <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-text-muted md:text-base">{section.intro}</p>
        )}
        {section.blocks?.length > 0 && (
            <div className="mt-8 space-y-8">
                <CaseStudyBlocks blocks={section.blocks} />
            </div>
        )}
    </section>
);

const CaseStudyClose = ({ close }) => {
    if (!close) return null;

    return (
        <section
            aria-labelledby="case-study-close-heading"
            className="mx-auto max-w-[1080px] border-t border-border px-6 py-14 md:px-10 md:py-20"
        >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end">
                <div>
                    <h2 id="case-study-close-heading" className="text-2xl font-semibold tracking-tight text-text-main md:text-3xl">
                        {close.heading}
                    </h2>
                    {close.body && (
                        <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-text-muted md:text-base">{close.body}</p>
                    )}
                </div>
                <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                    {close.actions?.map((action) => (
                        <CaseStudyLink
                            key={action.label}
                            href={action.href}
                            external={action.external}
                            variant={action.variant}
                            icon={action.icon}
                        >
                            {action.label}
                        </CaseStudyLink>
                    ))}
                </div>
            </div>
        </section>
    );
};

/**
 * Reusable case study page. Pass one study object (see data/caseStudiesData.js):
 * { id, title, orientation, deck, meta, facts, actions, media, sections, close }.
 * Section blocks: paragraphs | facts | list | capabilities | flow | note | media.
 */
const CaseStudy = ({ study, backHref = "/projects", backLabel = "Back to projects" }) => {
    useEffect(() => {
        if (!study?.title) return undefined;

        const previousTitle = document.title;
        document.title = `${study.title} case study · Jerwin Nico Quijano`;
        return () => {
            document.title = previousTitle;
        };
    }, [study?.title]);

    if (!study) return null;

    return (
        <main className="page-orientations min-h-screen text-text-main">
            <CaseStudyHero study={study} backHref={backHref} backLabel={backLabel} />
            {study.sections?.map((section) => (
                <CaseStudySection key={section.id} section={section} />
            ))}
            <CaseStudyClose close={study.close} />
        </main>
    );
};

export default CaseStudy;
