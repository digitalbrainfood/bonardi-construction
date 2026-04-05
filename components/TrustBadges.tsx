export default function TrustBadges() {
  const badges = [
    {
      label: "30+ Years",
      icon: (
        <svg
          className="h-5 w-5 text-brand"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
          />
        </svg>
      ),
    },
    {
      label: "Licensed & Bonded",
      icon: (
        <svg
          className="h-5 w-5 text-brand"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      label: "Lead-Safe Certified",
      icon: (
        <svg
          className="h-5 w-5 text-brand"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
          />
        </svg>
      ),
    },
    {
      label: "500+ Projects",
      icon: (
        <svg
          className="h-5 w-5 text-brand"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0H5m14 0h2m-16 0H3m2-9h.01M7 8h.01M7 12h.01M7 16h.01M11 8h.01M11 12h.01M11 16h.01M15 8h.01M15 12h.01M15 16h.01"
          />
        </svg>
      ),
    },
    {
      label: "Free Estimates",
      icon: (
        <svg
          className="h-5 w-5 text-brand"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 7h.01M7 3h5a1.99 1.99 0 0 1 1.414.586l7 7a2 2 0 0 1 0 2.828l-7 7a2 2 0 0 1-2.828 0l-7-7A2 2 0 0 1 3 12V7a4 4 0 0 1 4-4z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-brand-50 dark:bg-brand-900/30 py-6">
      <div className="mx-auto max-w-7xl px-6">
        {/* Desktop: flex row | Mobile: scrollable or 2-row grid */}
        <div className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-3 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center lg:gap-8">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              {badge.icon}
              <span className="font-body text-sm font-medium text-gray-700 dark:text-gray-300">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
