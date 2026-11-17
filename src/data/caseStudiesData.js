import {
    ArrowDownRight,
    ArrowUpRight,
    BadgeCheck,
    ClipboardList,
    CreditCard,
    FileSearch,
    FileText,
    Map,
    QrCode,
    ScanLine,
    ShieldCheck,
} from "lucide-react";
import { FARMPASS_EXPERIENCE } from "./experienceData";
import farmpassImage from "../assets/projects/farmpass.jpeg";

/**
 * Case study content. Copy stays factual: no invented metrics, quotes or outcomes.
 * Section blocks reuse the renderers in components/case-study/CaseStudyBlocks.jsx.
 */
export const FARMPASS_CASE_STUDY = {
    id: "farmpass",
    title: "FarmPass",
    orientation: "Case study",
    deck: "A livestock transport permit prototype that carries an application from submission to a checkpoint scan.",
    meta: `${FARMPASS_EXPERIENCE.type} · Sariaya, Quezon`,
    facts: [
        { label: "Role", value: "Solo full-stack developer" },
        { label: "Timeline", value: FARMPASS_EXPERIENCE.period },
        { label: "Stack", value: "React · Django REST Framework · PostgreSQL" },
        { label: "Status", value: "Capstone prototype" },
    ],
    actions: [
        { label: "View repository", href: "https://github.com/jico19/capstoneV2", external: true, variant: "primary", icon: ArrowUpRight },
        { label: "See the workflow", href: "#workflow", variant: "secondary", icon: ArrowDownRight },
    ],
    media: {
        src: farmpassImage,
        alt: "FarmPass web interface",
        width: 1910,
        height: 957,
    },
    sections: [
        {
            id: "problem",
            label: "The problem",
            heading: "Paper permits are slow, and falsified ones move pigs unchecked",
            intro:
                "The office still runs transport permits on paper. Applications and approvals take longer than the trip they cover, and a falsified permit can move pigs without a valid inspection. One unchecked shipment is enough to raise the risk of an African Swine Fever (ASF) outbreak in Sariaya, Quezon.",
            blocks: [
                {
                    type: "facts",
                    items: [
                        { label: "Constraint", value: "Paper-based applications, reviews, and approvals" },
                        { label: "Risk", value: "Falsified transport permits moving pigs without valid inspection" },
                        { label: "Scope", value: "Applications, document review, permit checks, barangay hog surveys" },
                    ],
                },
            ],
        },
        {
            id: "workflow",
            label: "The workflow",
            heading: "One record from application to checkpoint",
            intro:
                "Each step updates the same permit record, so staff make decisions on current state and inspectors verify the issued permit rather than a copy.",
            blocks: [
                {
                    type: "flow",
                    steps: [
                        {
                            label: "Apply",
                            detail: "An applicant submits a transport application with the required documents.",
                            icon: FileText,
                        },
                        {
                            label: "Review",
                            detail: "OCR extracts document fields. Staff review manually when extraction fails or needs correction.",
                            icon: FileSearch,
                        },
                        {
                            label: "Approve",
                            detail: "MAO and provincial veterinary approvals run as guarded transitions with audit records.",
                            icon: BadgeCheck,
                        },
                        {
                            label: "Issue",
                            detail: "The issued permit carries a UUID and QR code for lookup.",
                            icon: QrCode,
                        },
                        {
                            label: "Checkpoint",
                            detail: "An inspector scans the permit. A separate action writes the inspection log.",
                            icon: ScanLine,
                        },
                    ],
                },
            ],
        },
        {
            id: "safeguards",
            label: "Safeguards",
            heading: "Guarded transitions, not free edits",
            intro:
                "Approval state changes are constrained by role and recorded. The parts below are what the prototype actually implements.",
            blocks: [
                {
                    type: "capabilities",
                    items: [
                        {
                            icon: ShieldCheck,
                            title: "Guarded approvals",
                            detail: "MAO and provincial veterinary transitions follow a fixed path instead of an open status field.",
                        },
                        {
                            icon: ClipboardList,
                            title: "Audit records",
                            detail: "Every approval transition leaves a record of who changed the permit and when.",
                        },
                        {
                            icon: FileSearch,
                            title: "OCR with a fallback",
                            detail: "Document fields are extracted automatically. Staff can correct or review by hand when extraction fails.",
                        },
                        {
                            icon: QrCode,
                            title: "UUID permit lookup",
                            detail: "Issued permits resolve through a UUID, so a printed QR code points to one permit record.",
                        },
                        {
                            icon: ScanLine,
                            title: "Checkpoint logs",
                            detail: "An inspection is a separate recorded action, not a status edit on the permit.",
                        },
                        {
                            icon: Map,
                            title: "Barangay survey maps",
                            detail: "Barangay-scoped hog survey data feeds map views for the agricultural office.",
                        },
                    ],
                },
            ],
        },
        {
            id: "payments",
            label: "Payments",
            heading: "PayMongo stays a prototype",
            intro:
                "PayMongo is wired as a payment integration prototype. It is not presented as a live municipal payment channel.",
            blocks: [
                {
                    type: "capabilities",
                    items: [
                        {
                            icon: CreditCard,
                            title: "Payment integration prototype",
                            detail: "The payment path exists to test the integration shape, not to collect live fees.",
                        },
                    ],
                },
            ],
        },
        {
            id: "scope",
            label: "Scope",
            heading: "What this is not",
            blocks: [
                {
                    type: "note",
                    title: "A prototype, not an approved municipal system",
                    body: [
                        "FarmPass digitizes the office's existing permit workflow, but the municipal office has not approved it for use. The system remains a prototype; no office runs it in production.",
                        "Its workflows and integrations have not been established as municipal operations, and no field outcomes have been measured. The copy on this page describes implemented scope only.",
                    ],
                },
            ],
        },
    ],
    close: {
        heading: "Read the code",
        body: "The repository holds the React frontend, the Django REST Framework API, and the PostgreSQL schema. The project summary on the projects page links back here.",
        actions: [
            { label: "View repository", href: "https://github.com/jico19/capstoneV2", external: true, variant: "primary", icon: ArrowUpRight },
            { label: "Visit the prototype", href: "https://farmpass-ph.me/", external: true, variant: "secondary", icon: ArrowUpRight },
            { label: "Back to projects", href: "/projects", variant: "text" },
        ],
    },
};

export default FARMPASS_CASE_STUDY;
