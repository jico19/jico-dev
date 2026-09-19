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
                    ? "Animations enabled - click to disable"
                    : "Animations reduced - click to enable"
            }
            className={`
                px-2.5 py-1.5
                rounded-none
                text-xs
                font-medium
                transition-all
                btn-transition
                border
                cursor-pointer
                select-none
                ${enabled
                    ? "bg-zinc-900 text-accent border-zinc-700 glow-green"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40 border-transparent"
                }
                ${className}
            `}
        >
            [ MOTION: {enabled ? "ON" : "OFF"} ]
        </button>
    );
};

export default MotionToggle;