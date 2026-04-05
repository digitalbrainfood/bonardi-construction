import { SkeletonCard } from "@/components/Skeleton";

export default function GalleryLoading() {
  return (
    <>
      {/* Header */}
      <section className="pt-16 pb-14 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gray-200" />
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="space-y-3">
            <div className="h-10 w-[50%] bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-[40%] bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Filter tab bar skeleton */}
      <section className="py-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-hidden pb-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`flex-shrink-0 h-9 rounded-lg bg-gray-200 animate-pulse ${
                  i === 0 ? "w-14" : "w-28"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Masonry grid skeleton */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="break-inside-avoid">
                <div
                  className={`bg-gray-200 rounded-lg animate-pulse ${
                    i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
