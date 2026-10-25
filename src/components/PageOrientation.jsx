const PageOrientation = ({ pageOrientation, className = "mb-2" }) => (
    <span className={`page-orientation block text-xs font-mono tracking-wider text-text-faint uppercase ${className}`}>
        {pageOrientation}
    </span>
);

export default PageOrientation;
