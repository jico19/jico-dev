import { useSyncExternalStore } from "react";

const STORAGE_KEY = "jico:theme";
const THEME_ATTR = "data-theme";

const systemTheme = () =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";

const readStored = () => {
    if (typeof window === "undefined") return null;
    try {
        const value = window.localStorage.getItem(STORAGE_KEY);
        return value === "dark" || value === "light" ? value : null;
    } catch {
        return null;
    }
};

let storedValue = readStored();

const listeners = new Set();

const emitChange = () => {
    listeners.forEach((listener) => listener());
};

export const getTheme = () => storedValue || systemTheme();

export const setTheme = (theme) => {
    storedValue = theme === "light" ? "light" : "dark";

    try {
        window.localStorage.setItem(STORAGE_KEY, storedValue);
    } catch {
        // localStorage unavailable (e.g. private mode) — memory override still applies
    }

    syncThemeAttr();
    emitChange();
};

export const cycleTheme = () => setTheme(getTheme() === "dark" ? "light" : "dark");

const syncThemeAttr = () => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute(THEME_ATTR, getTheme());
};

if (typeof document !== "undefined") {
    syncThemeAttr();
}

export const subscribe = (listener) => {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
};

const getSnapshot = () => getTheme();

export const useTheme = () => useSyncExternalStore(subscribe, getSnapshot, getSnapshot);