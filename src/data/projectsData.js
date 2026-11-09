import { FARMPASS_EXPERIENCE, HEALTHCARE_EXPERIENCE } from "./experienceData";

export const PROJECT_DATA = [
    {
        id: "farmpass",
        label: "FarmPass",
        category: "Solo-built full-stack capstone prototype",
        client: FARMPASS_EXPERIENCE.client,
        status: "Preparing for final defense",
        role: FARMPASS_EXPERIENCE.title,
        timeline: FARMPASS_EXPERIENCE.period,
        web_link: "https://farmpass-ph.me/",
        tech: ["React", "Django REST Framework", "PostgreSQL", "MapLibre"],
        description:
            "Livestock transport permit prototype with guarded reviews, audit records, OCR-assisted document checks, UUID-based QR verification, checkpoint logs, and barangay survey maps.",
        caseStudyPath: "/projects/farmpass",
        progress:
            "Started in January 2026. Pre-oral defense completed in June, with final defense scheduled for the third week of November 2026.",
    },
    {
        id: "healthcare",
        label: HEALTHCARE_EXPERIENCE.title,
        category: "Freelance client project",
        client: "ST Business Consulting (US)",
        status: "In development",
        role: HEALTHCARE_EXPERIENCE.role,
        timeline: HEALTHCARE_EXPERIENCE.period,
        web_link: null,
        tech: HEALTHCARE_EXPERIENCE.tech,
        description:
            "Developing a unified healthcare operations platform for home-care agencies across Florida, Indiana, and Georgia, with caregiver onboarding, credential and training management, a client portal, state-scoped access, and administrative dashboards.",
        progress:
            "Client work began in August 2026 and is ongoing. The application is private.",
    },
];

export default PROJECT_DATA;
