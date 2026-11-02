import { useSyncExternalStore } from "react";

const STORAGE_KEY = "jico:motion-override";
const REDUCED_CLASS = "motion-reduced";

const readOverride = () => {
    if (typeof window === "undefined") return null;
    try {
        return window.localStorage.getItem(STORAGE_KEY); // "on" | "reduced" | null
    } catch {
        return null;
    }
};

let override = readOverride();

const listeners = new Set();

const emitChange = () => {
    listeners.forEach((listener) => listener());
};

export const getAnimationsEnabled = () => {
    return override !== "reduced";
};

export const setAnimationsEnabled = (enabled) => {
    override = enabled ? "on" : "reduced";

    try {
        window.localStorage.setItem(STORAGE_KEY, override);
    } catch {
        // localStorage unavailable (e.g. private mode) — memory override still applies
    }

    syncReducedClass();
    emitChange();
};

const syncReducedClass = () => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle(REDUCED_CLASS, !getAnimationsEnabled());
};

export const subscribe = (listener) => {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
};

const getSnapshot = () => getAnimationsEnabled();

export const useAnimationsEnabled = () => useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
