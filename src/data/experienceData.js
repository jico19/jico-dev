// Dates and engagement types confirmed by the portfolio owner in November 2026.
export const HEALTHCARE_EXPERIENCE = {
    id: "healthcare",
    title: "Freelance Fullstack Developer",
    company: "ST Business Consulting · US client",
    period: "August 2026 to present",
    current: true,
    type: "Client project",
    responsibilities: [
        "Working on an ongoing healthcare operations platform for a US client, introduced through a referral.",
        "Building application workflows using React, FastAPI, and PostgreSQL through Supabase.",
    ],
};

export const FARMPASS_EXPERIENCE = {
    id: "farmpass",
    title: "Fullstack Developer",
    company: "FarmPass · Capstone project",
    client: "Sariaya Municipal Agricultural Office",
    period: "January 2026 to present",
    current: true,
    type: "Capstone project",
    responsibilities: [
        "Developing a livestock transport permit management system using React, Django REST Framework, and PostgreSQL.",
        "The project includes online applications, document review, QR permit lookup, and barangay survey maps.",
        "Pre-oral defense completed in June 2026. Final defense is scheduled for the third week of November 2026.",
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
