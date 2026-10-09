import { useEffect, useRef } from "react";
import { useAnimationsEnabled } from "../lib/motion";
import { useTheme } from "../lib/theme";

const ASCII_CHAR_SET = ["+", "*", "·", "/", "\\", "_", "0", "1", "x", "~", ":"];

export const AsciiParticles = () => {
    const canvasRef = useRef(null);
    const animationsEnabled = useAnimationsEnabled();
    const theme = useTheme();
    const themeRef = useRef(theme);

    // Keep active theme ref synced without restarting animation loop
    useEffect(() => {
        themeRef.current = theme;
    }, [theme]);

    useEffect(() => {
        if (!animationsEnabled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationFrameId;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const mouse = {
            x: -1000,
            y: -1000,
            radius: 120,
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        document.addEventListener("mouseleave", handleMouseLeave);

        // Density scale: ~85 particles on desktop, ~35 on mobile
        const count = Math.min(90, Math.max(35, Math.floor((width * height) / 14000)));

        const particles = Array.from({ length: count }, () => ({
            char: ASCII_CHAR_SET[Math.floor(Math.random() * ASCII_CHAR_SET.length)],
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.floor(Math.random() * 4) + 14,
            baseAlpha: Math.random() * 0.35 + 0.35, // 0.35 to 0.70 base
        }));

        const maxLineDistance = 125;

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            const isLight = themeRef.current === "light";
            // Vivid green in light mode, clean silver in dark mode
            const colorRgb = isLight ? "15, 157, 88" : "180, 180, 192";
            const alphaBoost = isLight ? 1.5 : 1.1;

            ctx.font = isLight
                ? '600 15px "JetBrains Mono", monospace'
                : '500 14px "JetBrains Mono", monospace';
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Mouse interaction / subtle repulsion
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.hypot(dx, dy);

                if (dist < mouse.radius && dist > 0) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    p.x -= (dx / dist) * force * 1.8;
                    p.y -= (dy / dist) * force * 1.8;
                }

                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Screen edge wrap
                if (p.x < -15) p.x = width + 15;
                if (p.x > width + 15) p.x = -15;
                if (p.y < -15) p.y = height + 15;
                if (p.y > height + 15) p.y = -15;

                // Connect nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const lineDx = p.x - p2.x;
                    const lineDy = p.y - p2.y;
                    const lineDist = Math.hypot(lineDx, lineDy);

                    if (lineDist < maxLineDistance) {
                        const lineFactor = isLight ? 0.32 : 0.18;
                        const lineAlpha = (1 - lineDist / maxLineDistance) * lineFactor;
                        ctx.strokeStyle = `rgba(${colorRgb}, ${lineAlpha})`;
                        ctx.lineWidth = isLight ? 1.3 : 1;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                // Render ASCII glyph
                const glyphAlpha = Math.min(0.92, p.baseAlpha * alphaBoost);
                ctx.fillStyle = `rgba(${colorRgb}, ${glyphAlpha})`;
                ctx.fillText(p.char, p.x, p.y);
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [animationsEnabled]);

    if (!animationsEnabled) return null;

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-0 opacity-100"
        />
    );
};

export default AsciiParticles;
