import { ArrowLeft, ArrowUpRight } from "lucide-react";
import PageOrientation from "../components/PageOrientation";
import { FARMPASS_EXPERIENCE } from "../data/experienceData";
import { navigate } from "../lib/router";

const FarmPassCaseStudy = () => (
    <main className="min-h-screen max-w-[1080px] mx-auto px-6 md:px-10 py-8 md:py-14 text-text-main">
        <a href="/projects" onClick={(event) => {
            event.preventDefault();
            navigate("/projects");
        }} className="min-h-11 inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-main">
            <ArrowLeft size={15} aria-hidden="true" /> Back to projects
        </a>
        <article className="mt-10 max-w-[760px]">
            <PageOrientation pageOrientation="Case study" />
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">FarmPass</h1>
            <p className="mt-2 font-mono text-xs text-accent">Solo-built full-stack capstone prototype · {FARMPASS_EXPERIENCE.period}</p>
            <div className="blueprint-panel mt-8 p-5 sm:p-7 space-y-5 text-sm sm:text-base leading-relaxed text-text-muted">
                <p>
                    I built FarmPass as a solo full-stack capstone prototype for livestock transport permit processing in Sariaya, Quezon. It brings applications, document review, permit checks, and barangay hog surveys into one role-specific workflow. The frontend uses React; the API and data layer use Django REST Framework and PostgreSQL.
                </p>
                <p>
                    I implemented guarded MAO and provincial veterinary approval transitions with audit records. OCR assists document extraction, while staff can review documents manually when extraction fails or needs correction. Issued permits use UUID-based QR lookup for inspector verification; a separate checkpoint action writes an inspection log. Barangay-scoped survey data feeds map views. PayMongo is included as a payment integration prototype.
                </p>
                <p>
                    This is a prototype. Its workflows and integrations have not been established as municipal operations or measured field outcomes.
                </p>
            </div>
            <a href="https://github.com/jico19/capstoneV2" target="_blank" rel="noopener noreferrer" className="mt-5 min-h-11 inline-flex items-center gap-2 text-sm text-accent hover:text-text-main">
                View repository <ArrowUpRight size={15} aria-hidden="true" />
            </a>
        </article>
    </main>
);

export default FarmPassCaseStudy;
