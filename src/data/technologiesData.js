import {
    SiPython, SiDjango, SiPostgresql, SiReact,
    SiJavascript, SiTypescript, SiTailwindcss, SiAxios, SiGit, SiVite,
    SiClaude, SiOpenai,
} from "react-icons/si";
import { Heart, Orbit } from "lucide-react";

export const TECHNOLOGIES = [
    { name: "React", category: "Frontend", icon: SiReact, summary: "Component based interfaces and application state.", usage: "Used in this portfolio, FarmPass, and the healthcare client project." },
    { name: "JavaScript", category: "Frontend", icon: SiJavascript, summary: "Browser interactions, asynchronous requests, and application logic.", usage: "Used throughout the React frontend projects." },
    { name: "TypeScript", category: "Frontend", icon: SiTypescript, summary: "Typed application logic and component interfaces.", usage: "Used in the healthcare client project." },
    { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss, summary: "Responsive layouts and reusable interface styles.", usage: "Used to build and style this portfolio." },
    { name: "Python", category: "Backend", icon: SiPython, summary: "Backend application logic, API services, and scripts.", usage: "Used with Django in FarmPass and the healthcare project." },
    { name: "Django", category: "Backend", icon: SiDjango, summary: "Application models, backend workflows, and administration.", usage: "Used for the FarmPass and healthcare backends." },
    { name: "Django REST Framework", category: "Backend", icon: SiDjango, summary: "REST endpoints, request validation, and permissions.", usage: "Used for FarmPass and healthcare application APIs." },
    { name: "PostgreSQL", category: "Database", icon: SiPostgresql, summary: "Relational data models, queries, and application records.", usage: "Used for FarmPass data and the healthcare project." },
    { name: "Axios", category: "Tools", icon: SiAxios, summary: "HTTP requests and API communication.", usage: "Used to connect the healthcare frontend to its API." },
    { name: "Git & GitHub", category: "Tools", icon: SiGit, summary: "Source control and collaboration.", usage: "Used to maintain project code and changes." },
    { name: "Vite", category: "Tools", icon: SiVite, summary: "Frontend development server and production builds.", usage: "Used to develop and build this React portfolio." },
    { name: "Claude Code", category: "AI Tools", icon: SiClaude, summary: "AI assistance for coding and code review.", usage: "Used to support my development workflow." },
    { name: "Codex", category: "AI Tools", icon: SiOpenai, summary: "AI assistance for implementation and debugging.", usage: "Used to support my development workflow." },
    { name: "AntiGravity", category: "AI Tools", icon: Orbit, summary: "AI-assisted development.", usage: "Used alongside my development tools." },
    { name: "Lovable", category: "AI Tools", icon: Heart, summary: "AI-assisted application prototyping.", usage: "Used to explore and prototype application ideas." },
];

export const TECHNOLOGY_CATEGORIES = ["Frontend", "Backend", "Database", "Tools", "AI Tools"];
