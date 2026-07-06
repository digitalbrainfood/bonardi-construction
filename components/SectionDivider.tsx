interface SectionDividerProps {
  variant: "gradient" | "angle" | "dots";
  flip?: boolean;
  className?: string;
}

export default function SectionDivider({
  variant,
  flip = false,
  className = "",
}: SectionDividerProps) {
  /* ── Gradient ── */
  if (variant === "gradient") {
    return (
      <div
        className={`h-[2px] w-full ${className}`}
        style={{
          background: "linear-gradient(90deg, #0055A5 0%, #FBB62E 100%)",
          transform: flip ? "rotate(180deg)" : undefined,
        }}
        role="separator"
        aria-hidden="true"
      />
    );
  }

  /* ── Angle ── */
  if (variant === "angle") {
    return (
      <div
        className={`relative w-full overflow-hidden ${className}`}
        role="separator"
        aria-hidden="true"
      >
        <div
          className="h-16 w-full bg-brand-50 dark:bg-brand-900/30"
          style={{
            clipPath: flip
              ? "polygon(0 0, 100% 0, 100% 100%, 0 20%)"
              : "polygon(0 0, 100% 80%, 100% 100%, 0 100%)",
          }}
        />
      </div>
    );
  }

  /* ── Dots ── */
  return (
    <div
      className={`flex w-full items-center justify-center gap-3 py-6 ${className}`}
      role="separator"
      aria-hidden="true"
    >
      <span className="h-2 w-2 rounded-full bg-brand" />
      <span className="h-2 w-2 rounded-full bg-brand/60" />
      <span className="h-2 w-2 rounded-full bg-brand/30" />
    </div>
  );
}
