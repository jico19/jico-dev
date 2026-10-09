import { Sun, Moon } from "lucide-react";
import { useTheme, cycleTheme } from "../lib/theme";

const ThemeToggle = ({ className = "" }) => {
    const theme = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={cycleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            title={`Switch to ${isDark ? "light" : "dark"} theme`}
            className={`
                w-9 h-9
                inline-flex
                items-center
                justify-center
                rounded-[8px]
                text-text-muted
                hover:text-text-main
                hover:bg-surface-2
                border border-transparent
                hover:border-border
                transition-colors
                cursor-pointer
                shrink-0
                ${className}
            `}
        >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
    );
};

export default ThemeToggle;