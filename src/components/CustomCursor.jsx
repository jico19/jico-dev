import { useEffect, useRef, useState } from "react";
import { useAnimationsEnabled } from "../lib/motion";

const CustomCursor = () => {
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);
    const animationsEnabled = useAnimationsEnabled();

    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const [isPointerDevice, setIsPointerDevice] = useState(() => {
        if (typeof window === "undefined") return false;
        return (
            window.matchMedia("(pointer: fine) and (hover: hover)").matches &&
            window.innerWidth >= 1024
        );
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const checkPointer = () => {
            const hasFinePointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
            const isDesktopWidth = window.innerWidth >= 1024;
            setIsPointerDevice(hasFinePointer && isDesktopWidth);
        };

        checkPointer();
        window.addEventListener("resize", checkPointer, { passive: true });
        return () => window.removeEventListener("resize", checkPointer);
    }, []);

    useEffect(() => {
        if (!isPointerDevice || !animationsEnabled) return;

        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;
        let animationFrameId;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            setIsVisible(true);

            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            }
        };

        const onMouseDown = () => setIsClicked(true);
        const onMouseUp = () => setIsClicked(false);

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        // 60-120fps lerp trailing ring loop
        const render = () => {
            ringX += (mouseX - ringX) * 0.2;
            ringY += (mouseY - ringY) * 0.2;

            if (cursorRingRef.current) {
                cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        // Detect hover over interactive elements
        const handleElementHover = (e) => {
            const target = e.target;
            const interactive = target.closest("a, button, input, [role='button'], .cursor-pointer");
            setIsHovered(Boolean(interactive));
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mousemove", handleElementHover, { passive: true });
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mouseenter", onMouseEnter);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousemove", handleElementHover);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mouseenter", onMouseEnter);
        };
    }, [isPointerDevice, animationsEnabled]);

    if (!isPointerDevice || !animationsEnabled) return null;

    return (
        <div className="hidden lg:block pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
            {/* Center precision dot */}
            <div
                ref={cursorDotRef}
                className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-accent transition-opacity duration-150 ${
                    isVisible ? (isHovered ? "opacity-0" : "opacity-90") : "opacity-0"
                }`}
                style={{ willChange: "transform" }}
            />

            {/* Trailing smooth magnetic ring */}
            <div
                ref={cursorRingRef}
                className={`fixed top-0 left-0 rounded-full border border-accent/60 transition-[width,height,margin,border-color,background-color,opacity,transform] duration-200 ease-out ${
                    isVisible ? "opacity-100" : "opacity-0"
                } ${
                    isHovered
                        ? "-ml-5 -mt-5 w-10 h-10 border-accent bg-accent/15 scale-105"
                        : isClicked
                        ? "-ml-3 -mt-3 w-6 h-6 border-accent bg-accent/30 scale-90"
                        : "-ml-3.5 -mt-3.5 w-7 h-7"
                }`}
                style={{ willChange: "transform" }}
            />
        </div>
    );
};

export default CustomCursor;
