import { useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { sendProjectRequestEmail } from "../services/emailService";

const emptyBrief = {
    name: "", email: "", applicationType: "", description: "",
    features: "", budget: "", targetDate: "",
};

const fields = [
    { name: "name", label: "Name", autoComplete: "name", maxLength: 120 },
    { name: "email", label: "Email", type: "email", autoComplete: "email", maxLength: 254 },
    { name: "applicationType", label: "What are you building?", placeholder: "A booking app, inventory system, customer portal...", wide: true, maxLength: 120 },
    { name: "description", label: "Project description", placeholder: "What should your application do, and who will use it?", multiline: true, maxLength: 4000 },
    { name: "features", label: "Features you have in mind", placeholder: "Accounts, payments, reports... A rough list is fine.", multiline: true, maxLength: 4000 },
    { name: "budget", label: "Budget (optional)", placeholder: "e.g. PHP 30,000 or still deciding", optional: true, maxLength: 200 },
    { name: "targetDate", label: "Target date (optional)", type: "date", optional: true },
];

const ProjectRequestForm = () => {
    const [brief, setBrief] = useState(emptyBrief);
    const [status, setStatus] = useState({ loading: false, success: false, error: null });
    const sendingRef = useRef(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        event.target.setCustomValidity("");
        setBrief((previous) => ({ ...previous, [name]: value }));
        setStatus((previous) => ({ ...previous, success: false, error: null }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (sendingRef.current) return;

        const form = event.currentTarget;
        const trimmed = Object.fromEntries(
            Object.entries(brief).map(([name, value]) => [name, value.trim()]),
        );
        for (const field of fields) {
            form.elements.namedItem(field.name).setCustomValidity(
                !field.optional && !trimmed[field.name] ? "Please fill out this field." : "",
            );
        }
        if (!form.reportValidity()) return;

        sendingRef.current = true;
        setBrief(trimmed);
        setStatus({ loading: true, success: false, error: null });
        try {
            await sendProjectRequestEmail(trimmed);
            setBrief(emptyBrief);
            setStatus({ loading: false, success: true, error: null });
        } catch {
            setStatus({
                loading: false,
                success: false,
                error: "Your request could not be sent. Your details are saved in this form. Please try again.",
            });
        } finally {
            sendingRef.current = false;
        }
    };

    return (
        <form onSubmit={handleSubmit} aria-labelledby="project-request-heading" aria-busy={status.loading} className="space-y-5">
            <fieldset disabled={status.loading} className="grid grid-cols-1 sm:grid-cols-2 gap-5 disabled:opacity-70">
                <legend className="sr-only">Your application brief</legend>
                {fields.map((field) => {
                    const Control = field.multiline ? "textarea" : "input";
                    const id = `project-request-${field.name}`;
                    return (
                        <div key={field.name} className={field.wide || field.multiline ? "sm:col-span-2 min-w-0" : "min-w-0"}>
                            <label htmlFor={id} className="block text-xs font-mono text-text-muted mb-2">
                                {field.label}{!field.optional && " *"}
                            </label>
                            <Control
                                id={id}
                                name={field.name}
                                {...(field.multiline ? { rows: 3 } : { type: field.type || "text" })}
                                autoComplete={field.autoComplete}
                                required={!field.optional}
                                maxLength={field.maxLength}
                                placeholder={field.placeholder}
                                value={brief[field.name]}
                                onChange={handleChange}
                                className="w-full min-w-0 px-4 py-2.5 rounded-[8px] bg-bg border border-border text-base text-text-main placeholder:text-text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors resize-y"
                            />
                        </div>
                    );
                })}
            </fieldset>
            <div role="status" aria-live="polite" aria-atomic="true" className="text-sm text-accent">
                {status.loading && "Sending your project request..."}
                {status.success && "Thanks, your request is sent. I’ll reply to the email you provided."}
            </div>
            <div role="alert" aria-atomic="true" className="text-sm text-text-main">
                {status.error}
            </div>
            <button
                type="submit"
                disabled={status.loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-11 px-5 py-2.5 rounded-[8px] bg-accent text-accent-contrast text-sm font-medium hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:opacity-60 disabled:cursor-wait cursor-pointer transition-colors"
            >
                {status.loading ? <Loader2 size={16} aria-hidden="true" className="motion-safe:animate-spin" /> : <Send size={16} aria-hidden="true" />}
                {status.loading ? "Sending request..." : "Send project request"}
            </button>
        </form>
    );
};

export default ProjectRequestForm;
