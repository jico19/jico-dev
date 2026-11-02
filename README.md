# Jerwin Nico Quijano | Fullstack Developer

Personal portfolio for junior fullstack opportunities. Built with React, Vite, and Tailwind CSS.

The site presents a freelance fullstack developer based in the Philippines, with paid client work, an ongoing US healthcare client project, and FarmPass. FarmPass remains labelled as a capstone project.

## Experience and project content

The shared experience data lives in `src/data/experienceData.js`. Project summaries in `src/data/projectsData.js` reuse its dates.

- Freelance development for clients: 2024 to present.
- Healthcare client project: August 2026 to present.
- FarmPass: January 2026 to present. Pre-oral defense completed in June 2026; final defense scheduled for the third week of November 2026.

These dates and engagement types were confirmed by the portfolio owner in November 2026. Update the defense status after the event. Keep the linked resume consistent when replacing it.

Project summaries describe the scope and current status. Detailed case studies, unsupported outcome metrics, placeholder testimonials, and school project sales copy have been removed.

## Development

Requirements: Node.js compatible with the installed Vite version, and npm.

```sh
npm install
npm run dev
```

Open the local address printed by Vite.

```sh
npm run lint
npm run build
npm run preview
```

On Windows, use `npm.cmd` if PowerShell blocks the npm script.

## Contact form

The contact form sends messages with EmailJS. Configure `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` in a local `.env` file and in the deployment environment. The EmailJS template must accept the sender name, email, reply address, and message. Do not commit environment files.

The form shows loading, success, and error states. LinkedIn remains available as another contact method.

## Main files

- `src/components/Navbar.jsx`: desktop sidebar and native mobile navigation dialog.
- `src/data/navigationData.js`: shared section order for navigation and scroll telemetry.
- `src/components/Hero.jsx`: introduction, role, resume, and professional links.
- `src/components/StackDiagram.jsx`: illustrative React, Python API, and PostgreSQL flow.
- `src/components/Projects.jsx`: brief project summaries.
- `src/components/Experience.jsx`: freelance client work and selected development projects.
- `src/data/technologiesData.js`: shared technology names and usage.
- `src/pages/TechPage.jsx`: searchable technology list.
- `public/Jerwin_Quijano_Resume.pdf`: downloadable resume.

The existing `/projects` URL displays the same brief summaries for older links. The site supports light and dark themes and an animation preference.

## Visual design

The portfolio uses a subtle blueprint grid, fine borders, corner marks, and monospace annotations over the existing charcoal and green theme. At widths of 1024px and above, navigation sits in a fixed 224px sidebar. Smaller screens use a compact top bar and a native dialog menu. The original portrait and floating particles are preserved. The desktop application diagram is decorative and hidden on narrower screens.
