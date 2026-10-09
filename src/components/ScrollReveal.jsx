import { useEffect, useRef, useState } from "react";
import { useAnimationsEnabled, getAnimationsEnabled } from "../lib/motion";

export const ScrollReveal = ({
    children,
    delay = 0,
    className = "",
}) => {
    const animationsEnabled = useAnimationsEnabled();
    const [isVisible, setIsVisible] = useState(() => !getAnimationsEnabled());
    const ref = useRef(null);

    useEffect(() => {
        if (!animationsEnabled) {
            return;
        }

        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [animationsEnabled]);

    const active = !animationsEnabled || isVisible;

    return (
        <div
            ref={ref}
            className={`transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                active
                    ? "opacity-100 translate-y-0 blur-none"
                    : "opacity-0 translate-y-6 blur-[3px]"
            } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
