const partners = [
  "Lead-Safe Certified",
  "Generac",
  "Cambridge Pavers",
  "Nicolock",
  "Unilock",
];

export default function PartnersCarousel() {
  // Duplicate the list for seamless looping
  const items = [...partners, ...partners];

  return (
    <div className="relative overflow-hidden">
      <style>{`
        @keyframes partners-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      {/* Gradient fade on edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-inherit to-transparent z-10 pointer-events-none"
        style={{ maskImage: "none" }}
      />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-inherit to-transparent z-10 pointer-events-none"
        style={{ maskImage: "none" }}
      />

      {/* Mask for smooth edges */}
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div
          className="flex items-center gap-12 w-max"
          style={{
            animation: "partners-scroll 20s linear infinite",
          }}
        >
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-gray-400 font-body text-sm whitespace-nowrap select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
