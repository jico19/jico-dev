import { Code2, Database, Monitor } from "lucide-react";

const LAYERS = [
    { label: "Interface", value: "React", detail: "Components & interactions", Icon: Monitor },
    { label: "Application", value: "Python APIs", detail: "Django / FastAPI", Icon: Code2 },
    { label: "Data", value: "PostgreSQL", detail: "Models & queries", Icon: Database },
];

const StackDiagram = () => (
    <figure className="blueprint-panel stack-diagram p-5" aria-label="Application stack: React interfaces connect to Python APIs and PostgreSQL">
        <div className="mb-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-text-faint">
            <span>Fig. 01 / Application flow</span>
            <span aria-hidden="true">+</span>
        </div>
        {LAYERS.map(({ label, value, detail, Icon }, index) => (
            <div key={label}>
                {index > 0 && (
                    <div className="stack-connector" aria-hidden="true"><span>{index === 1 ? "HTTP / JSON" : "SQL"}</span></div>
                )}
                <div className="relative border border-border bg-bg/80 p-3.5">
                    <div className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-text-faint">
                        <span className="text-accent">0{index + 1}</span><span>{label}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-text-main">{value}</span>
                        <Icon size={15} className="text-accent" aria-hidden="true" />
                    </div>
                    <p className="mt-1 text-[11px] text-text-muted">{detail}</p>
                </div>
            </div>
        ))}
        <figcaption className="mt-5 border-t border-border pt-3 font-mono text-[9px] uppercase tracking-widest text-text-faint">Interfaces → Logic → Data</figcaption>
    </figure>
);

export default StackDiagram;
