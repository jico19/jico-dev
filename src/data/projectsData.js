import farmPass from "../assets/projects/farmpass.jpeg";

export const PROJECT_DATA = [
    {
        id: "farmpass",
        slug: "farmpass",
        label: "FarmPass",
        title: "FarmPass",
        category: "Municipal GIS & Biosecurity",
        badge: "Municipal GIS & Biosecurity",
        status: "Live / Production",
        client: "MAO Sariaya (Municipal Agriculture Office)",
        role: "Lead Full-Stack & Systems Developer",
        timeline: "2024",
        confidential: false,
        image: farmPass,
        web_link: "https://farmpass-ph.me/",
        tech: [
            "Django",
            "Django REST Framework",
            "PostgreSQL",
            "PostGIS",
            "React 19",
            "PayMongo API",
            "Tailwind CSS",
        ],
        shortDescription:
            "A municipal platform digitizing swine transport permits and biosecurity tracking with GIS zoning, OCR validation, and QR checkpoints.",
        fullDescription:
            "A mission-critical municipal platform built for the Municipality of Sariaya to digitize livestock transport permits and curb African Swine Fever (ASF) transmission. It replaces a paper-heavy 3-day manual approval workflow with an automated geospatial verification pipeline, instant PayMongo fee checkout, OCR document scanning, and offline-resilient QR checkpoints for field officers.",
        challenge:
            "Municipal agricultural officers previously relied on paper documents that took 48-72 hours to verify. During African Swine Fever outbreaks, manual paper permits created severe biosecurity blind spots, lacked real-time spatial parcel quarantine validation, and offered zero auditability for checkpoint inspectors on highways.",
        solution:
            "Engineered an automated geospatial permit pipeline with PostGIS boundary checks, instant digital fee settlement via PayMongo, tamper-evident cryptographic QR issuance, and mobile verification tooling for field officers.",
        metrics: [
            {
                label: "Approval Latency",
                value: "< 5 mins",
                description: "Reduced from 48-72 hour manual cycles",
            },
            {
                label: "Parcels Mapped",
                value: "412 verified",
                description: "Geotagged agricultural parcel boundaries",
            },
            {
                label: "Permit Processing",
                value: "100% digital",
                description: "Fully paperless approval workflow",
            },
            {
                label: "Field Checkpoints",
                value: "Instant QR",
                description: "Offline-resilient roadside verification",
            },
        ],
        architecture: {
            clientTier:
                "React 19 SPA + Tailwind CSS with responsive GIS map layers and offline-cached QR validation.",
            apiTier:
                "Django REST Framework 3.14 with transactional permit pipelines and asynchronous notifications.",
            dataTier:
                "PostgreSQL 15 paired with PostGIS for spatial parcel polygon intersection checks.",
            integrations:
                "PayMongo webhooks for real-time payments, Tesseract OCR for document parsing, and SMS gateways.",
        },
        buildSteps: [
            {
                stepNumber: "01",
                title: "Spatial PostGIS Schema & Quarantine Boundaries",
                desc: "Engineered geospatial models linking livestock farms to municipal GIS parcel coordinates. Every permit request automatically runs spatial polygon intersection queries against active ASF quarantine buffer zones before approval.",
            },
            {
                stepNumber: "02",
                title: "Transactional REST Permit Pipeline",
                desc: "Developed DRF API viewsets enforcing atomic state machine transitions: Draft → OCR Verification → Agricultural Officer Review → Payment Gateway → Signed Permit Issuance.",
            },
            {
                stepNumber: "03",
                title: "PayMongo Webhook Automation & SMS Alerts",
                desc: "Implemented idempotent PayMongo checkout webhooks. When fees are confirmed, the system signs a tamper-resistant cryptographic QR code and dispatches SMS verification to farmers.",
            },
            {
                stepNumber: "04",
                title: "Field Officer QR Checkpoint Scanner",
                desc: "Constructed an officer portal optimized for low-bandwidth mobile connections at highway checkpoints, enabling instant offline-resilient verification of livestock permit authenticity.",
            },
        ],
    },
    {
        id: "st-business-consulting",
        slug: "st-business-consulting",
        label: "Healthcare SaaS Platform",
        title: "Healthcare SaaS Platform",
        category: "Multi-Tenant Healthcare SaaS",
        badge: "Multi-Tenant Healthcare SaaS",
        status: "Active Development",
        client: "ST Business Consulting",
        role: "Full-Stack Backend Engineer",
        timeline: "2024 – Present",
        confidential: true,
        image: null,
        web_link: null,
        tech: [
            "FastAPI",
            "React 19",
            "Supabase",
            "PostgreSQL",
            "Row-Level Security",
            "Tailwind CSS",
        ],
        shortDescription:
            "A multi-tenant healthcare platform featuring state-scoped data isolation across FL, IN, and GA, cryptographic e-signatures, and caregiver workflows.",
        fullDescription:
            "A compliance-driven multi-tenant healthcare operations platform architected for ST Business Consulting. Designed to manage caregiver onboarding, client intakes, state-regulated service agreements, and automated staff scheduling across three distinct US state jurisdictions (Florida, Indiana, and Georgia) with zero cross-tenant leakage.",
        challenge:
            "Healthcare operating regulations differ substantially across Florida, Indiana, and Georgia regarding caregiver credentialing and patient consent laws. The platform needed strict multi-tenant isolation, tamper-resistant cryptographic audit logs to satisfy state audits, and a high-throughput API handling scheduling conflict detection.",
        solution:
            "Designed dependency-injected tenancy contexts in FastAPI, Row-Level Security policies in PostgreSQL, SHA-256 cryptographic document audit hashing, and conflict-detection scheduling algorithms.",
        metrics: [
            {
                label: "Automated Tests",
                value: "235 passing",
                description: "Rigorous unit and integration test suite",
            },
            {
                label: "Tenant Isolation",
                value: "100% enforced",
                description: "Strict multi-tenant state data boundary",
            },
            {
                label: "Jurisdictions",
                value: "FL, IN, GA",
                description: "State-specific compliance workflows",
            },
            {
                label: "P95 API Latency",
                value: "< 140ms",
                description: "Optimized domain services & queries",
            },
        ],
        architecture: {
            clientTier:
                "React 19 + Tailwind CSS dashboard with optimistic updates and accessible form wizards.",
            apiTier:
                "FastAPI asynchronous microservices structured with domain-driven modular boundaries.",
            dataTier:
                "Supabase + PostgreSQL with automated migrations, indexes, and Row-Level Security policies.",
            integrations:
                "Cryptographic e-signature engines, immutable audit hash chains, and PostgREST.",
        },
        buildSteps: [
            {
                stepNumber: "01",
                title: "State-Scoped Multi-Tenant Authorization",
                desc: "Designed dependency-injected tenancy contexts in FastAPI. Each request strictly enforces tenant and jurisdiction boundaries (FL, IN, GA), verified both at the middleware layer and inside PostgreSQL Row-Level Security (RLS) policies.",
            },
            {
                stepNumber: "02",
                title: "Cryptographic E-Signatures & Audit Hashes",
                desc: "Engineered tamper-resistant document sign-off workflows for caregiver service agreements. Each signature generates an SHA-256 cryptographic digest linked to immutable audit logs for regulatory compliance.",
            },
            {
                stepNumber: "03",
                title: "Caregiver Scheduling & Collision Engine",
                desc: "Built automated shift assignment logic preventing double-booking and overtime violations while validating active state licenses and mandatory background clearance dates.",
            },
            {
                stepNumber: "04",
                title: "PostgREST Egress Optimization & 235+ Test Suite",
                desc: "Refactored monolithic endpoints into domain services, optimizing SQL joins to cut unnecessary egress by 40%, and maintaining a rigorous automated test suite with over 235 unit and integration tests.",
            },
        ],
    },
];

export default PROJECT_DATA;
