import { useEffect, useRef, useState } from "react";

export const ScrollReveal = ({ 
    children, 
    delay = 0, 
    duration = 1000, 
    direction = "up",
    className = "" 
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% is visible
            }
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
    }, []);

    const getDirectionStyles = () => {
        if (isVisible) {
            return {
                opacity: 1,
                transform: "translate(0, 0)",
            };
        }

        switch (direction) {
            case "up":
                return { opacity: 0, transform: "translateY(30px)" };
            case "down":
                return { opacity: 0, transform: "translateY(-30px)" };
            case "left":
                return { opacity: 0, transform: "translateX(30px)" };
            case "right":
                return { opacity: 0, transform: "translateX(-30px)" };
            default:
                return { opacity: 0 };
        }
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                transitionProperty: "opacity, transform",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
                willChange: "transform, opacity",
                ...getDirectionStyles()
            }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
