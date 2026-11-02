# FarmPass portfolio case study audit

Repository review: 2026-11-02. This is a code and documentation audit, not evidence of deployment, adoption, or client acceptance. Evidence IDs below point to repository-relative paths and line numbers. The author's personal contribution and prototype status are recorded separately as user confirmations, not claims established by code. No private records or credentials are reproduced.

### Author confirmations (preserve in later edits)

| ID | Confirmed by author in conversation | Scope and limit |
|---|---|---|
| U01 | "i build everything lol im a solo fullstack developer" | The author says they built the full system as a solo full-stack developer. This is first-person testimony, not independently verified by repository inspection. |
| U02 | The author confirms FarmPass is a capstone prototype. | Prototype status is first-person testimony; it does not establish live deployment or use. |
| U03 | The author reports that the client said FarmPass was intended as a baseline for a system the client is developing. The author thinks the client may use some solutions from it. | Client-stated intent is reported by the author. Actual reuse, integration, adoption, and outcomes are unconfirmed. |

## 1. Project overview

FarmPass is a **capstone prototype** for livestock transport permit processing in Sariaya, Quezon [U02]. The repository presents it as intended for farmers, Municipal Agriculture Office (MAO) staff, provincial veterinary reviewers (OPV), barangay officials, and roadside inspectors [E01, E02]. **Inferred problem:** paper or fragmented application, document review, payment, census, and checkpoint processes are difficult to track together; this inference comes from the workflow and role design, not a validated user study [E01, E03]. The author confirms solo full-stack ownership [U01]. The author reports that the client described this prototype as a baseline for a system the client is developing; actual reuse or operational use is unconfirmed [U03].

## 2. Implemented features and scope

| Status | Workflow | Evidence and limit |
|---|---|---|
| Implemented in code | Farmer applications with origins and uploaded documents; MAO review, OPV approval or rejection, resubmission, permit issue, payment pending, and release states | Model, transition guards, role checks, transactional actions, and UI routes [E02–E05]. A focused end-to-end test passed [E17]; this does not prove every branch or real operation. |
| Implemented in code | PDF permit and supporting documents, QR token lookup, inspector verification and checkpoint logging | Issue service creates a UUID token; PDF embeds a verification URL; inspector UI scans camera or image; log service stores an inspection and marks application checked [E06, E07]. Do not describe the QR as a signed cryptographic token. |
| Implemented in code | Barangay hog surveys, CSV import/export, aggregation and map views; MAO dashboards and reports | Survey models and scoped endpoints, frontend map layers, dashboard endpoints [E08, E09]. Repository demo survey data is explicitly synthetic [E16]. |
| Implemented in code | OCR-assisted document extraction with manual review fallback; notifications and SMS task integration | OCR task tries OCR.space and optional Gemini rescue, then marks for manual review; transition code queues SMS after commit [E10, E04]. External delivery and extraction accuracy were not checked. |
| **Partial / prototype** | PayMongo checkout and payment verification | Checkout, payment records, an amount check, and offline confirmation exist, but verification can auto-fulfill even when the gateway returns non-200, times out, or reports unpaid; webhook only acknowledges receipt [E11, E12]. Public copy should say *payment integration prototype* until this is corrected and independently verified. |
| **Documented claim, not supported as stated** | “Unforgeable” or “cryptographic” QR validation, “real-time” checkpoint outcomes, predictive risk assessment | README uses these terms [E01]; implementation shows a random stored UUID and database lookup, while AI insights have deterministic fallback [E06, E09]. No operational or model-quality evidence was found. Design.MD is a visual specification, not proof of shipped UI [E15]. |

No separate feature roadmap was found among the reviewed root documentation and `docs/` files. Treat README claims and the design specification as documented intent or description where implementation and runtime evidence are absent [E01, E15].

## 3. Architecture and stack

- **Frontend:** React 19, Vite 8, React Router 7, Tailwind 4, daisyUI 5, TanStack Query, Zustand, MapLibre GL, and `html5-qrcode` are declared dependencies [E13]. Routes partition farmer, Agri, OPV, barangay, and inspector portals with client-side role guards [E02]. Axios uses the configured API base URL and refreshes JWTs from session storage [E14]. Client-side guards are UX routing; server-side permissions must enforce access.
- **Backend:** Django 6.0, Django REST Framework, SimpleJWT, PostgreSQL, `django-tasks-db`, ReportLab, and related packages are pinned [E13]. A root DRF router exposes applications, documents, OPV, permits, payments, surveys, audit/notifications, inspector logs, and reports [E03]. Settings use a custom user model, PostgreSQL, DRF authentication, pagination and throttles, and database-backed task queues [E13].
- **Data model:** `User` carries a role and optional barangay; `PermitApplication` owns multiple `TransportOrigin` records and uploaded documents, a one-to-one OPV validation, and a one-to-one issued permit. Payment history belongs to the issued permit; survey rows belong to barangays; inspector logs reference permit applications [E05, E08, E11, E07].
- **Integrations:** PayMongo API, OCR.space, optional Gemini document parsing and dashboard insights, SMS gateway, PDF/QR generation, and Cloudinary media storage are implemented as code paths or production configuration [E10–E13]. No live-service responses were observed in this audit.
- **Deployment configuration:** `backend/build.sh` installs production dependencies, collects static files, migrates, creates a cache table, and runs a guarded demo seeder. Production settings read `DATABASE_URL`, configure Cloudinary and WhiteNoise, secure cookies/HTTPS, and restrict CORS. `frontend/vercel.json` rewrites routes for an SPA [E12]. These files show deployment intent/configuration, not a successful deployment. The build script's demo seeding deserves explicit disclosure in any live deployment account [E12, E16].

## 4. Engineering highlights

1. **Workflow transition control.** A centralized status transition map rejects illegal moves; MAO and OPV actions check roles and state, use database transactions, and write audit records [E04]. This creates a reviewable lifecycle. Tradeoff: concurrent behavior depends on the particular action's locking; it should not be described as globally race-free.
2. **Permit verification and checkpoint trace.** Issuance generates a UUID token; the PDF links to an inspector verification route. The backend checks token existence and expiry; a separate log action records the inspection and sets `is_checked` [E06, E07]. Tradeoff: this is a server lookup to a bearer-like token, not a signed offline certificate; a scan alone and a recorded checkpoint are distinct actions.
3. **Tiered document processing.** The OCR task uses OCR.space and parsers first, optionally tries Gemini on failure or validation errors, and falls back to staff review [E10]. Tradeoff: external APIs require credentials and may fail or misread documents, so human review remains material.
4. **Scoped census and map data.** Barangay users are limited to their assigned barangay for survey reads/writes; import is transactional; aggregation drives map layers [E08]. Tradeoff: the included generated history is synthetic and must not be presented as measured population or field results [E16].
5. **Authentication lifecycle.** JWT access/refresh lifetimes are configured at five minutes/one day with rotation; the frontend stores credentials per browser session and retries after refresh [E14]. Tradeoff: this describes implemented session behavior, not a security audit.

## 5. Verification and limitations

| Type | Check and result | What it supports |
|---|---|---|
| Static code/document inspection | Reviewed models, services, viewsets, routes, settings, integrations, test names, deployment scripts, and README [E01–E16]. | Implementation and configuration claims only. |
| Django system check | `backend/venv/Scripts/python.exe manage.py check` **passed**, no issues reported. | Django configuration checks; no external integration check. |
| Focused backend tests | `test_full_workflow`, `test_verify_and_log`, and `test_gateway_amount_mismatch_does_not_release` each **passed** (one test each) [E17]. | Only those test scenarios. Each emitted a pytest cache write warning. |
| Frontend static checks | `npm.cmd run lint` **passed** with 0 errors and 3 warnings (Fast Refresh export; two React Hook Form `watch` compatibility warnings). `npm.cmd run build` **passed**, with a >500 kB chunk warning. | Source lint/buildability, not browser behavior. |
| Runtime observation | **None.** No browser journey, live payment, SMS, OCR, Gemini, Cloudinary, or hosted site was exercised. | No claim of production reliability or actual user outcomes. |

The first `npm run` attempts were blocked by PowerShell execution policy and succeeded through `npm.cmd`. A payment and inspector test launched concurrently collided while creating the same PostgreSQL test database; the inspector test passed, then the payment test passed when rerun alone. The full test suite was not run, per `AGENTS.md` [E18]. Significant unverified claims: external integration behavior, actual email/SMS receipt, PDF appearance, browser/mobile usability, accessibility, production configuration in a live host, actual municipal use, and measured impact. The payment demo fallback [E11] is a material constraint on any public reliability or security claim.

## 6. Portfolio case-study draft

**FarmPass — solo-built livestock transport permit capstone prototype**

I built FarmPass as a solo full-stack capstone prototype. The client described it as a baseline for a system they are developing. It brings livestock transport applications, document review, payment steps, and checkpoint checks into one workflow for farmer and agriculture/veterinary roles. The application includes farmer submission and tracking, MAO and OPV review, document generation, barangay hog surveys, dashboards, and inspector QR checks. I built the role-specific React frontend and Django REST Framework/PostgreSQL backend, including guarded approval transitions with audit records, OCR-assisted review with a manual fallback, and UUID-based permit verification with checkpoint logs. The PayMongo integration includes a demo fulfillment path and should be presented as a prototype rather than live payment processing.

**Code:** [View the FarmPass GitHub repository](https://github.com/jico19/capstoneV2). This is the configured `origin` remote in the local repository; public visibility and whether the remote has the latest local changes were not verified in this audit. The repository demonstrates implementation, not client adoption or production outcomes.

The draft uses a single repository link for readers. The evidence IDs and line references elsewhere in this audit remain private working notes for claim review. Solo ownership, prototype status, and the client's stated baseline intent come from the author's account [U01–U03]. The draft makes no claim about launch, reuse, adoption, client approval, time saved, or field outcomes.

## 7. Visual evidence plan

Use a fresh fictional dataset, generic names and phone numbers, and a visible “demo data” label. Capture (1) public landing/requirements page; (2) farmer application with two origins and document checklist; (3) MAO review and audit trail; (4) OPV approval and issued PDF with a fictional QR; (5) inspector verification and resulting log; (6) barangay survey and MAO map/dashboard. A 60–90 second demo can follow farmer submission → MAO review → OPV decision → **simulated/offline** payment → PDF → QR verification → checkpoint record. Avoid recording real identifiers, keys, municipal records, or implying PayMongo live settlement. Verify the PDFs and browser route visually before publication [E02, E06–E09, E11, E16].

## Evidence register

| ID | Repository source (line references) | What it proves |
|---|---|---|
| E01 | `README.md:1-24`, `README.md:35-60`, `README.md:73-82` | Project-stated purpose, users, lifecycle and marketing claims; documentation, not operational proof. |
| E02 | `frontend/src/routes/index.jsx:78-170`, `frontend/src/routes/protectedRoute.jsx:6-10` | Role-specific frontend routes and client-side route guard. |
| E03 | `backend/config/router.py:12-38`, `backend/config/urls.py:16-26` | Registered API resources and root URL layout. |
| E04 | `backend/apps/permits/services/application.py:13-70`, `backend/apps/permits/services/application.py:142-225`, `backend/apps/permits/services/opv.py:59-103`, `backend/apps/permits/views/documents.py:105-126` | Transition map, MAO/OPV guards, transactions/audit, document editing lock. |
| E05 | `backend/apps/permits/models.py:28-67`, `backend/apps/permits/models.py:76-81`, `backend/apps/permits/models.py:110-151`, `backend/apps/permits/models.py:167-179`, `backend/apps/permits/models.py:216-238`; `backend/apps/api/models.py:15-52` | Application, origin, document, validation, permit, and user relationships. |
| E06 | `backend/apps/permits/services/permit.py:195-224`, `backend/apps/permits/services/permit.py:279-309`, `backend/apps/documents/services/permit_documents.py:384-385`, `frontend/src/pages/inspector/QR/QRScannerPage.jsx:4-27`, `frontend/src/pages/inspector/QR/QRScannerPage.jsx:184-209` | UUID-based QR lookup, issuance and PDF URL, browser camera/file scanning. |
| E07 | `backend/apps/inspector/services.py:15-43`, `backend/apps/inspector/models.py:1-18`, `frontend/src/pages/inspector/Application/VerifyApplication.jsx:42-62` | Inspector-only log action, check state and notifications, log persistence and UI verification. |
| E08 | `backend/apps/maps/models.py:6-51`, `backend/apps/maps/viewsets.py:39-54`, `backend/apps/maps/viewsets.py:80-105`, `backend/apps/maps/viewsets.py:133-199`, `backend/apps/maps/viewsets.py:213-241`, `frontend/src/pages/agri/Map/DensityMap/MainMap.jsx:108-145` | Census data, barangay scoping, transactional upload, export, map layers. |
| E09 | `backend/apps/dashboard/urls.py:6-12`, `backend/apps/dashboard/views.py:7-36`, `backend/apps/dashboard/insights_engine.py:812-825`, `backend/apps/dashboard/insights_engine.py:943-996` | Dashboard routes, role rules, Gemini configuration/fallback and insight cache path. |
| E10 | `backend/apps/ocr/tasks.py:144-225`, `backend/apps/ocr/providers.py:23-28`, `backend/apps/ocr/providers.py:83-86`, `backend/apps/permits/services/application.py:76-88` | OCR chain/manual fallback and queued SMS status notification. |
| E11 | `backend/apps/payment/models.py:15-40`, `backend/apps/payment/services.py:67-112`, `backend/apps/payment/services.py:212-333`, `backend/apps/payment/views.py:14-59` | Payment records/checkout; gateway amount check; demo auto-fulfillment; webhook only parses and acknowledges. |
| E12 | `backend/config/settings/prod.py:9-78`, `backend/build.sh:4-13`, `frontend/vercel.json:1-8`, `backend/scripts/seed_realistic_operations.py:183-186` | Production configuration and deploy/build actions, including guarded demo seed. |
| E13 | `frontend/package.json:5-44`, `backend/requirements.txt:1-52`, `backend/config/settings/base.py:94-101`, `backend/config/settings/base.py:139-168`, `backend/config/settings/base.py:212-220` | Declared stack and Django database/API/task settings. |
| E14 | `backend/config/settings/base.py:180-183`, `frontend/src/store/authStore.js:91-97`, `frontend/src/lib/api.js:5-21`, `frontend/src/lib/api.js:54-75` | JWT lifetime/rotation and frontend session/refresh behavior. |
| E15 | `Design.MD:1-17`, `Design.MD:23-56` | Design specification; no shipped UI proof by itself. |
| E16 | `backend/datasets/README.md:1-3`, `backend/datasets/README.md:102-106`, `backend/build.sh:12-13` | Data generator is explicitly synthetic; deployment script invokes seed. |
| E17 | `backend/apps/permits/tests/test_workflow.py:61-185`, `backend/apps/inspector/tests/test_inspector.py:23-24`, `backend/apps/payment/tests/test_payment_security.py:97-120`, `frontend/package.json:6-10` | Locations and scope of focused tests and frontend check scripts; execution results reported above. |
| E18 | `AGENTS.md:12-23`, `backend/tests/README.md:32-45` | Repository rule to run focused tests, PostgreSQL requirement, and test guidance. |
