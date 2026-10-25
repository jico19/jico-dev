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
            "React 19.2.4",
            "Vite 8.0.7",
            "Tailwind CSS 4.2.2",
            "daisyUI 5.5.19",
            "TanStack Query 5.96.2",
            "Zustand 5.0.12",
            "Django 6.0.3",
            "Django REST Framework 3.17.1",
            "PostgreSQL",
            "MapLibre GL 5.22.0",
            "html5-qrcode 2.3.8",
            "ReportLab 4.4.10",
            "django-tasks 0.12.0"
        ],
        shortDescription:
            "A livestock transport permit system where farmers apply online, staff review documents, and inspectors check permits by scanning a QR code.",
        fullDescription:
            "FarmPass follows a livestock transport permit from application to checkpoint inspection. Farmers submit their documents online, municipal agriculture staff and provincial veterinarians review the request, and inspectors scan the permit's QR code to look up the transport details. Barangay staff also record hog counts, which appear on a shared map.",
        challenge:
            "A permit passes through several people before livestock can travel. Each reviewer needs the supporting documents and previous decisions, while checkpoint inspectors need a way to check the permit. The system has to keep those steps connected and control who can approve each one.",
        solution:
            "Each application keeps its documents, review results, and permit details together. Staff work through defined approval stages, with OCR results available to help check uploaded documents. Generated permits include a QR link to the record inspectors use at checkpoints.",
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
            clientTier: "React dashboards give farmers, reviewers, barangay staff, and inspectors their own workspace. TanStack Query manages API data, Axios handles requests and token refresh, and MapLibre displays barangay maps.",
            apiTier: "Django REST Framework checks who can submit, review, and issue a permit at each stage. Background tasks process uploaded documents, generate PDFs, and send SMS notifications.",
            dataTier: "PostgreSQL stores applications, review decisions, permits, payments, and hog surveys. Barangay boundaries are saved as GeoJSON in JSON fields; uploaded documents and generated PDFs live in file storage.",
            integrations: "OCR.space and Gemini extract details from uploaded documents. PayMongo handles checkout requests, an SMS gateway sends updates, and Cloudinary is configured for media storage. Payment verification still includes a prototype fallback that can mark an unconfirmed payment as successful."
        },
        buildSteps: [
            {
                stepNumber: "01",
                title: "Keeping approvals in order",
                desc: "Municipal and veterinary reviews are separate steps, with checks on who can act and when. Municipal approval and permit issuance lock the application record during updates to prevent conflicting changes."
            },
            {
                stepNumber: "02",
                title: "Helping staff check documents",
                desc: "OCR extracts details from uploaded documents and checks the required fields. Staff can see which checks passed and which documents need a closer look."
            },
            {
                stepNumber: "03",
                title: "Checking permits at checkpoints",
                desc: "Generated PDFs include a QR code linked to the permit record. Inspectors scan it to view transport details and record the inspection."
            },
            {
                stepNumber: "04",
                title: "Barangay surveys and maps",
                desc: "Barangay staff enter hog counts through survey forms or CSV uploads. The map groups those counts by barangay, and permit release updates the survey totals to account for transported livestock."
            }
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
