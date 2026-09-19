import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme, cycleTheme } from "../lib/theme";

const ThemeToggle = ({ className = "" }) => {
    const theme = useTheme();
    const dark = theme === "dark";

    return (
        <button
            type="button"
            onClick={cycleTheme}
            aria-pressed={dark}
            aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
            title={`Switch to ${dark ? "light" : "dark"} mode`}
            className={`
                inline-flex
                items-center
                gap-1.5
                px-2.5 py-1.5
                rounded-none
                text-xs
                font-medium
                transition-all
                btn-transition
                border
                cursor-pointer
                select-none
                ${dark
                    ? "bg-zinc-900 text-accent border-zinc-700 glow-green"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40 border-transparent"
                }
                ${className}
            `}
        >
            {dark ? <FiMoon size={13} /> : <FiSun size={13} />}
            [{dark ? "DARK" : "LIGHT"}]
        </button>
    );
};

export default ThemeToggle;