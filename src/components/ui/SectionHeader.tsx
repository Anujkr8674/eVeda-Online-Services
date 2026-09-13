import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  theme?: "light" | "dark";
  maxWidth?: string;
}

export default function SectionHeader({
  badge,
  title,
  titleHighlight,
  description,
  align = "center",
  className = "",
  theme = "dark",
  maxWidth,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isLight = theme === "light";

  return (
    <div
      className={cn(
        isCenter ? "text-center mx-auto" : "text-left",
        isCenter && !maxWidth && !className.includes("max-w-") && "max-w-2xl",
        className
      )}
      style={maxWidth ? { maxWidth } : undefined}
    >
      {badge && (
        <div className={cn("mb-4", isCenter ? "flex justify-center" : "flex justify-start")}>
          <span className="ng-badge">{badge}</span>
        </div>
      )}

      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight font-sora mb-4"
        style={{ color: isLight ? "#0F172A" : "#ffffff" }}
      >
        {title}{" "}
        {titleHighlight && (
          <span style={{ color: "var(--accent-global)" }}>{titleHighlight}</span>
        )}
      </h2>

      {description && (
        <p
          className="text-[16px] leading-[1.75]"
          style={{ color: isLight ? "#475569" : "#94A3B8" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
