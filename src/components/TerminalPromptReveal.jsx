import { useEffect, useRef, useState } from "react";

export const TerminalPromptReveal = ({
    prompt = "guest@jico-dev:~$",
    command = "",
    delay = 0,
    onComplete
}) => {
    const [typed, setTyped] = useState("");
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [started]);

    useEffect(() => {
        if (!started) return;

        const timeout = setTimeout(() => {
            let index = 0;
            const interval = setInterval(() => {
                setTyped(command.slice(0, index + 1));
                index++;
                if (index >= command.length) {
                    clearInterval(interval);
                    if (onComplete) {
                        setTimeout(onComplete, 150);
                    }
                }
            }, 25); // 25ms per char
            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [started, command, delay]);

    return (
        <div ref={ref} className="font-mono flex items-center select-none">
            <span className="text-zinc-500 mr-2">{prompt}</span>
            <span className="text-zinc-100 font-bold text-lg md:text-2xl">{typed}</span>
            <span className="inline-block w-2 h-5 bg-accent ml-1 cursor-blink align-middle" />
        </div>
    );
};

export default TerminalPromptReveal;
