import { useEffect, useRef } from "react";
import { useAnimationsEnabled, getAnimationsEnabled } from "../lib/motion";
import { animate } from "../lib/anime";

export const ScrollReveal = ({
    children,
    delay = 0,
    className = "",
    yOffset = 24,
    scanline = true,
}) => {
    const animationsEnabled = useAnimationsEnabled();
    const ref = useRef(null);
    const beamRef = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        if (!animationsEnabled) {
            element.style.opacity = "1";
            element.style.transform = "none";
            if (beamRef.current) beamRef.current.style.display = "none";
            return;
        }

        // Set initial 3D transform
        element.style.opacity = "0";
        element.style.transform = `perspective(1000px) translateY(${yOffset}px) rotateX(4deg) scale(0.985)`;

        let animInstance = null;
        let beamAnim = null;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Tactile 3D spring settle
                    animInstance = animate(element, {
                        opacity: [0, 1],
                        translateY: [yOffset, 0],
                        rotateX: [4, 0],
                        scale: [0.985, 1],
                        duration: 680,
                        delay,
                        ease: "outExpo",
                    });

                    // Laser aperture scan beam sweep
                    if (scanline && beamRef.current) {
                        beamAnim = animate(beamRef.current, {
                            translateX: ["-100%", "220%"],
                            opacity: [0, 0.9, 0],
                            duration: 850,
                            delay: delay + 80,
                            ease: "outQuad",
                        });
                    }

                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
            if (animInstance) animInstance.pause?.();
            if (beamAnim) beamAnim.pause?.();
        };
    }, [animationsEnabled, delay, yOffset, scanline]);

    return (
        <div
            ref={ref}
            className={`relative ${className}`}
            style={
                !getAnimationsEnabled()
                    ? undefined
                    : {
                          opacity: 0,
                          transform: `perspective(1000px) translateY(${yOffset}px) rotateX(4deg) scale(0.985)`,
                          transformOrigin: "50% 0%",
                      }
            }
        >
            {/* Holographic Laser Aperture Beam */}
            {scanline && (
                <div
                    aria-hidden="true"
                    className="absolute -top-[1px] left-0 right-0 h-[1.5px] overflow-hidden pointer-events-none z-20"
                >
                    <div
                        ref={beamRef}
                        className="w-1/2 h-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 -translate-x-full"
                    />
                </div>
            )}
            {children}
        </div>
    );
};

export default ScrollReveal;
