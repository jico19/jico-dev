import { useEffect, useRef, useState } from "react";

export const ScrollReveal = ({ 
    children, 
    delay = 0, 
    duration = 200, 
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
                threshold: 0.05, // Trigger when 5% is visible for faster response
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
                return { opacity: 0, transform: "translateY(10px)" };
            case "down":
                return { opacity: 0, transform: "translateY(-10px)" };
            case "left":
                return { opacity: 0, transform: "translateX(10px)" };
            case "right":
                return { opacity: 0, transform: "translateX(-10px)" };
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
                transitionTimingFunction: "ease-out",
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
