import { useAnimationsEnabled, setAnimationsEnabled } from "../lib/motion";

const MotionToggle = ({ className = "" }) => {
    const enabled = useAnimationsEnabled();

    return (
        <button
            type="button"
            onClick={() => setAnimationsEnabled(!enabled)}
            aria-pressed={enabled}
            title={
                enabled
                    ? "Animations enabled - click to reduce motion"
                    : "Animations reduced - click to enable animations"
            }
            className={`
                text-xs
                font-mono
                text-text-faint
                hover:text-text-muted
                transition-colors
                cursor-pointer
                ${className}
            `}
        >
            motion: {enabled ? "on" : "reduced"}
        </button>
    );
};

export default MotionToggle;