interface SectionDividerProps {
  variant: "gradient" | "wave" | "angle" | "dots";
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

  /* ── Wave ── */
  if (variant === "wave") {
    return (
      <div
        className={`w-full leading-[0] ${className}`}
        style={{ transform: flip ? "rotate(180deg)" : undefined }}
        role="separator"
        aria-hidden="true"
      >
        <svg
          className="block h-10 w-full"
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 20C240 0 480 40 720 20C960 0 1200 40 1440 20V40H0V20Z"
            fill="currentColor"
            className="text-gray-50 dark:text-gray-800"
          />
        </svg>
      </div>
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
