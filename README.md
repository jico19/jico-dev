# 💻 Jerwin Quijano - Full Stack Portfolio

Welcome to the repository for my developer portfolio! I am a Full Stack Developer specializing in robust backend systems, secure REST APIs, and highly interactive, smooth-experience Single Page Applications (SPAs).

---

## ⚡ Key Highlights & Features

- **Fluid SPA Transitions**: Embedded custom `ScrollReveal` hooks using `IntersectionObserver` and *EaseOutExpo* easing for premium fade-and-slide entry transitions.
- **Dynamic ScrollSpy**: Highlights active sections in the header capsule navigation as you scroll or click.
- **Responsive Mobile Navigation**: Designed a responsive drawer slide overlay menu with background filters and resize hooks.
- **Accented Theme**: Minimalistic dark theme (`zinc-900`/`zinc-800`) focused on clean typography, readable layouts, and performance.

---

## 🛠️ Tech Stack

- **Backend / APIs**: Python, Django, Django REST Framework (DRF)
- **Frontend / Styling**: React (v19), Tailwind CSS (v4), React Icons
- **Database / GIS**: PostgreSQL, Geospatial Mapping
- **Development Tooling**: Vite, ESLint

---

## 📂 Project Showcase

### 🐷 FarmPass (Capstone Project)
- **Description**: A permit processing and geospatial mapping web application built for the Municipal Agriculture Office of Sariaya.
- **Tech Stack**: Django, DRF, React, PostgreSQL.
- **Live Site**: [farmpass-ph.me](https://farmpass-ph.me/)

---

## 🚀 Getting Started

To run the portfolio application locally:

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/jico19/jico-dev.git

# Navigate to the workspace
cd jico-dev

# Install dependencies
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build
To build and optimize the portfolio for hosting:
```bash
npm run build
```

> [!NOTE]
> **Windows/PowerShell Security Hint**: If script execution is disabled on your machine, bypass it by running the package manager via command prompt or setting the execution bypass flag:
> ```powershell
> powershell -ExecutionPolicy Bypass -Command "npm run build"
> # OR invoke the CMD executable wrapper directly:
> npm.cmd run build
> ```

