const PageOrientation = ({ pageOrientation, className = "mb-2" }) => (
    <span className={`page-orientation flex items-center gap-3 text-[10px] font-mono tracking-[0.16em] text-text-faint uppercase ${className}`}>
        {pageOrientation}
    </span>
);

export default PageOrientation;
