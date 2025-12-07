interface PillLabelProps {
    text: string;
    color?: string;
    textColor?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export default function PillLabel({
    text,
    color = "bg-primary",
    textColor = "text-white",
    size = "md",
    className = "",
}: PillLabelProps) {
    const sizeClasses = {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
        lg: "text-base px-4 py-1.5",
    };

    return (
        <span
            className={`
        inline-block 
        rounded-full 
        whitespace-nowrap
        ${color} ${textColor} 
        ${sizeClasses[size]} 
        font-medium 
        ${className}
      `}
        >
            {text}
        </span>
    );
}
