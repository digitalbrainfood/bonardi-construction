const partners = [
  "Lead-Safe Certified",
  "Generac",
  "Cambridge Pavers",
  "Nicolock",
  "Unilock",
];

export default function PartnersCarousel() {
  // Repeat the list so the track is always wider than the viewport,
  // then render it twice — shifting by 50% loops seamlessly.
  const half = [...partners, ...partners, ...partners];

  return (
    <div className="relative overflow-hidden">
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div className="flex w-max animate-marquee items-center">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center gap-12 pr-12"
              aria-hidden={copy === 1}
            >
              {half.map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="text-gray-400 font-body text-sm whitespace-nowrap select-none"
                >
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
