import { useSyncExternalStore } from "react";

const parseRoute = () => {
    if (typeof window === "undefined") return "/";
    const pathname = window.location.pathname.replace(/\/$/, "").toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (pathname === "/tech" || hash === "#/tech") return "/tech";
    if (pathname === "/projects" || hash === "#/projects") return "/projects";
    return "/";
};

let currentRoute = parseRoute();
const listeners = new Set();

const emitChange = () => {
    listeners.forEach((listener) => listener());
};

export const navigate = (path) => {
    if (typeof window === "undefined") return;

    const normalizedPath = path.replace(/\/$/, "").toLowerCase();
    currentRoute = normalizedPath;

    try {
        window.history.pushState(null, "", path);
    } catch {
        window.location.hash = `#${normalizedPath}`;
    }

    emitChange();
    window.scrollTo({ top: 0, behavior: "instant" });
};

if (typeof window !== "undefined") {
    const syncFromBrowser = () => {
        currentRoute = parseRoute();
        emitChange();
    };

    window.addEventListener("popstate", syncFromBrowser);
    window.addEventListener("hashchange", syncFromBrowser);
}

const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

const getSnapshot = () => currentRoute;

export const useCurrentPath = () => {
    const path = useSyncExternalStore(subscribe, getSnapshot, () => "/");
    return [path, navigate];
};

export default useCurrentPath;
