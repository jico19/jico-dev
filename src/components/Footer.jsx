import { ArrowUp } from "lucide-react";
import MotionToggle from "./MotionToggle";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="border-t border-border py-8 mt-12 bg-bg">
            <div className="max-w-[1080px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-faint">
                <p className="font-mono text-center sm:text-left">
                    &copy; 2026 Jerwin Quijano. Process completed with exit code 0.
                </p>

                <div className="flex items-center gap-6">
                    <MotionToggle />
                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="group inline-flex items-center gap-1.5 hover:text-text-main transition-colors duration-150 cursor-pointer"
                    >
                        <span>Back to top</span>
                        <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform duration-150" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;