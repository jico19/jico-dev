import { useEffect, useRef, useState, useCallback } from "react";
import { useAnimationsEnabled } from "../lib/motion";
import { useTheme } from "../lib/theme";
import { Terminal, Sparkles } from "lucide-react";

// Ordered from dark to light
const ASCII_RAMP = " .:-=+*#%@";

export const AsciiPortrait = ({
    src = "/me-pic.png",
    alt = "Jerwin Nico Quijano",
    className = "",
}) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const offscreenCanvasRef = useRef(null);
    const animationFrameRef = useRef(null);
    const fadeTimerRef = useRef(null);

    const animationsEnabled = useAnimationsEnabled();
    const theme = useTheme();

    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Mouse coordinates and lens radius
    const mouseRef = useRef({
        x: -1000,
        y: -1000,
        targetX: -1000,
        targetY: -1000,
        active: false,
        alpha: 0,
    });

    const CELL_W = 6;
    const CELL_H = 10;
    const LENS_RADIUS = 85;

    // Load and downsample image on offscreen canvas
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;

        img.onload = () => {
            const offscreen = document.createElement("canvas");
            offscreen.width = img.naturalWidth;
            offscreen.height = img.naturalHeight;
            const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
            if (offCtx) {
                offCtx.drawImage(img, 0, 0);
                offscreenCanvasRef.current = {
                    canvas: offscreen,
                    ctx: offCtx,
                    img,
                };
                setImageLoaded(true);
            }
        };
    }, [src]);

    // Handle canvas sizing
    const updateCanvasSize = useCallback(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.scale(dpr, dpr);
        }
    }, []);

    useEffect(() => {
        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);
        return () => window.removeEventListener("resize", updateCanvasSize);
    }, [updateCanvasSize]);

    // Render loop for ASCII hover lens
    useEffect(() => {
        if (!animationsEnabled || !imageLoaded) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const render = () => {
            const rect = container.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            const m = mouseRef.current;

            // Smooth mouse interpolation (LERP)
            m.x += (m.targetX - m.x) * 0.25;
            m.y += (m.targetY - m.y) * 0.25;

            // Fade in / out
            if (m.active && m.alpha < 1) {
                m.alpha = Math.min(1, m.alpha + 0.12);
            } else if (!m.active && m.alpha > 0) {
                m.alpha = Math.max(0, m.alpha - 0.08);
            }

            ctx.clearRect(0, 0, width, height);

            if (m.alpha > 0 && offscreenCanvasRef.current) {
                const isLight = theme === "light";
                const off = offscreenCanvasRef.current;

                ctx.save();
                ctx.globalAlpha = m.alpha;

                // Circular lens clipping path
                ctx.beginPath();
                ctx.arc(m.x, m.y, LENS_RADIUS, 0, Math.PI * 2);
                ctx.clip();

                // Lens backdrop (dark terminal look)
                ctx.fillStyle = isLight ? "rgba(250, 250, 250, 0.94)" : "rgba(11, 11, 12, 0.94)";
                ctx.fill();

                // Sample and draw ASCII characters inside the lens
                const startCol = Math.max(0, Math.floor((m.x - LENS_RADIUS) / CELL_W));
                const endCol = Math.min(Math.ceil(width / CELL_W), Math.ceil((m.x + LENS_RADIUS) / CELL_W));
                const startRow = Math.max(0, Math.floor((m.y - LENS_RADIUS) / CELL_H));
                const endRow = Math.min(Math.ceil(height / CELL_H), Math.ceil((m.y + LENS_RADIUS) / CELL_H));

                ctx.font = '600 9px "JetBrains Mono", monospace';
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                // Scale factor between displayed canvas and source image
                const scaleX = off.img.naturalWidth / width;
                const scaleY = off.img.naturalHeight / height;

                for (let r = startRow; r < endRow; r++) {
                    const cy = r * CELL_H + CELL_H / 2;
                    for (let c = startCol; c < endCol; c++) {
                        const cx = c * CELL_W + CELL_W / 2;

                        // Check if inside circle
                        const dist = Math.hypot(cx - m.x, cy - m.y);
                        if (dist > LENS_RADIUS) continue;

                        // Sample brightness from source image
                        const srcX = Math.floor(cx * scaleX);
                        const srcY = Math.floor(cy * scaleY);

                        try {
                            const pixel = off.ctx.getImageData(srcX, srcY, 1, 1).data;
                            // Luminance calculation
                            const brightness = 0.299 * pixel[0] + 0.587 * pixel[1] + 0.114 * pixel[2];
                            const rampIndex = Math.floor((brightness / 255) * (ASCII_RAMP.length - 1));
                            const char = ASCII_RAMP[rampIndex] || " ";

                            if (char !== " ") {
                                // Accent green glow for brighter areas
                                const greenR = isLight ? "15, 157, 88" : "61, 220, 132";
                                const charAlpha = Math.max(0.35, brightness / 255);
                                ctx.fillStyle = `rgba(${greenR}, ${charAlpha})`;
                                ctx.fillText(char, cx, cy);
                            }
                        } catch {
                            // Ignore bounds errors if any
                        }
                    }
                }

                ctx.restore();

                // Lens boundary ring & scanner crosshair
                ctx.save();
                ctx.globalAlpha = m.alpha;
                ctx.beginPath();
                ctx.arc(m.x, m.y, LENS_RADIUS, 0, Math.PI * 2);
                ctx.strokeStyle = isLight ? "rgba(15, 157, 88, 0.45)" : "rgba(61, 220, 132, 0.55)";
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Small center target indicator
                ctx.beginPath();
                ctx.arc(m.x, m.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = isLight ? "#0F9D58" : "#3DDC84";
                ctx.fill();

                ctx.restore();
            }

            animationFrameRef.current = requestAnimationFrame(render);
        };

        animationFrameRef.current = requestAnimationFrame(render);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [animationsEnabled, imageLoaded, theme]);

    const handlePointerMove = (e) => {
        if (!containerRef.current || !animationsEnabled) return;
        const rect = containerRef.current.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
        const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);

        if (clientX !== undefined && clientY !== undefined) {
            mouseRef.current.targetX = clientX - rect.left;
            mouseRef.current.targetY = clientY - rect.top;
            if (!mouseRef.current.active) {
                mouseRef.current.x = mouseRef.current.targetX;
                mouseRef.current.y = mouseRef.current.targetY;
                mouseRef.current.active = true;
            }
            setIsHovered(true);
        }
    };

    const handlePointerLeave = () => {
        mouseRef.current.active = false;
        setIsHovered(false);
    };

    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            {/* Portrait Frame */}
            <div
                ref={containerRef}
                onMouseMove={handlePointerMove}
                onMouseLeave={handlePointerLeave}
                onTouchMove={handlePointerMove}
                onTouchEnd={handlePointerLeave}
                className="relative w-full aspect-[4/5] rounded-[14px] overflow-hidden border border-border bg-surface group select-none shadow-sm transition-all duration-300 hover:border-accent/40"
            >
                {/* Real Photo Base Layer */}
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                />

                {/* Subtle vignette gradient overlay to blend naturally */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none bg-gradient-to-t from-bg/40 via-transparent to-transparent"
                />

                {/* ASCII Lens Canvas Overlay */}
                <canvas
                    ref={canvasRef}
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none w-full h-full z-10"
                />

                {/* Corner Matrix Tag */}
                <div
                    className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-[5px] bg-bg/85 backdrop-blur-xs border border-border text-[10px] font-mono text-text-muted flex items-center gap-1.5 z-20 pointer-events-none transition-opacity duration-200"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span>ASCII LENS</span>
                </div>

                {/* Hover Invitation / Interactive Prompt Badge */}
                <div
                    className={`absolute bottom-2.5 left-2.5 right-2.5 px-2.5 py-1.5 rounded-[8px] bg-bg/90 backdrop-blur-xs border border-border text-[11px] font-mono text-text-muted flex items-center justify-between z-20 pointer-events-none transition-all duration-200 ${
                        isHovered ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
                    }`}
                >
                    <span className="flex items-center gap-1 text-text-faint">
                        <Terminal size={12} className="text-accent" />
                        <span>Hover to decode</span>
                    </span>
                    <Sparkles size={11} className="text-accent/80" />
                </div>
            </div>

            {/* Quick Caption */}
            <div className="flex items-center justify-between px-1 text-xs font-mono text-text-faint">
                <span>jerwin_nico.raw</span>
                <span className="text-accent">● live</span>
            </div>
        </div>
    );
};

export default AsciiPortrait;
