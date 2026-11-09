// Dates and engagement types confirmed by the portfolio owner in November 2026.
export const HEALTHCARE_EXPERIENCE = {
    id: "healthcare",
    title: "Multi-State Caregiver Management Platform",
    role: "Freelance Fullstack Developer",
    company: "ST Business Consulting · US client",
    period: "August 2026 to present",
    current: true,
    type: "Freelance Project",
    tech: ["React", "TypeScript", "Django", "Django REST Framework", "PostgreSQL", "Axios"],
    responsibilities: [
        "Developing a unified healthcare operations platform for home-care agencies across Florida, Indiana, and Georgia.",
        "Building caregiver onboarding workflows with online applications, document verification, credential expiration tracking, and training management.",
        "Developing a client portal for digital intake, document submissions, care plans, service schedules, and authorization tracking.",
        "Designing role-based access control (RBAC), state-scoped permissions, secure authentication, and audit logging to protect sensitive records.",
        "Building administrative dashboards for caregiver compliance, client admissions, credential monitoring, and operational reporting.",
        "Planning automated email/SMS notifications, expiration reminders, and electronic signature workflows.",
    ],
};

export const FARMPASS_EXPERIENCE = {
    id: "farmpass",
    title: "Full-Stack Developer",
    company: "FarmPass · Capstone Project",
    client: "Sariaya Municipal Agricultural Office",
    period: "January 2026 to present",
    current: true,
    type: "Capstone Project",
    responsibilities: [
        "Solely building the React, Django REST Framework, and PostgreSQL livestock transport permit prototype.",
        "Implemented guarded MAO and OPV approval transitions with audit records and OCR-assisted document review with a manual fallback.",
        "Built UUID-based QR permit verification, checkpoint logging, and barangay survey maps; PayMongo is a payment integration prototype.",
    ],
};

export const EXPERIENCE_DATA = [
    HEALTHCARE_EXPERIENCE,
    FARMPASS_EXPERIENCE,
    {
        id: "freelance",
        title: "Freelance Developer",
        company: "Independent client projects",
        period: "2024 to present",
        current: true,
        type: "Paid client work",
        responsibilities: [
            "Building tools and web applications for clients based on their project requirements.",
            "Working on project requirements and implementation across individual client engagements.",
        ],
    },
];
