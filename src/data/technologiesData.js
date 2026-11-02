import {
    SiPython, SiDjango, SiFastapi, SiPostgresql, SiReact,
    SiJavascript, SiTailwindcss, SiSupabase, SiGit, SiVite,
} from "react-icons/si";

export const TECHNOLOGIES = [
    { name: "React", category: "Frontend", icon: SiReact, summary: "Component based interfaces and application state.", usage: "Used in this portfolio, FarmPass, and the healthcare client project." },
    { name: "JavaScript", category: "Frontend", icon: SiJavascript, summary: "Browser interactions, asynchronous requests, and application logic.", usage: "Used throughout the React frontend projects." },
    { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss, summary: "Responsive layouts and reusable interface styles.", usage: "Used to build and style this portfolio." },
    { name: "Python", category: "Backend", icon: SiPython, summary: "Backend application logic, API services, and scripts.", usage: "Used with Django in FarmPass and FastAPI in the healthcare project." },
    { name: "Django", category: "Backend", icon: SiDjango, summary: "Application models, backend workflows, and administration.", usage: "Used for the FarmPass backend." },
    { name: "Django REST Framework", category: "Backend", icon: SiDjango, summary: "REST endpoints, request validation, and permissions.", usage: "Used for FarmPass application and review APIs." },
    { name: "FastAPI", category: "Backend", icon: SiFastapi, summary: "Python APIs with request and response validation.", usage: "Used in the ongoing healthcare client project." },
    { name: "PostgreSQL", category: "Database", icon: SiPostgresql, summary: "Relational data models, queries, and application records.", usage: "Used for FarmPass data and the healthcare project." },
    { name: "Supabase", category: "Database", icon: SiSupabase, summary: "Hosted PostgreSQL and supporting application services.", usage: "Used in the ongoing healthcare client project." },
    { name: "Git & GitHub", category: "Tools", icon: SiGit, summary: "Source control and collaboration.", usage: "Used to maintain project code and changes." },
    { name: "Vite", category: "Tools", icon: SiVite, summary: "Frontend development server and production builds.", usage: "Used to develop and build this React portfolio." },
];

export const TECHNOLOGY_CATEGORIES = ["Frontend", "Backend", "Database", "Tools"];
