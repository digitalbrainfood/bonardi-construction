export function SkeletonText({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-3 bg-gray-200 rounded animate-pulse mb-2 ${
            i === lines - 1 ? "w-[60%]" : "w-full"
          }`}
        />
      ))}
    </div>
  );
}

export function SkeletonImage({ className = "" }: { className?: string }) {
  return (
    <div
      className={`aspect-video bg-gray-200 rounded-lg animate-pulse ${className}`}
    />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`border border-gray-200 rounded-lg overflow-hidden ${className}`}
    >
      <SkeletonImage />
      <div className="p-5">
        <SkeletonText lines={3} />
      </div>
    </div>
  );
}
