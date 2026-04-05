import { SkeletonText, SkeletonCard } from "@/components/Skeleton";

export default function BlogLoading() {
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
            <div className="h-10 w-[45%] bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-[35%] bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured post skeleton */}
          <div className="mb-16">
            <div className="grid lg:grid-cols-2 bg-white rounded-lg border border-gray-200 shadow-card overflow-hidden">
              <div className="aspect-[16/9] lg:aspect-auto lg:min-h-[360px] bg-gray-200 animate-pulse" />
              <div className="p-10 flex flex-col justify-center">
                <div className="h-2.5 w-32 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="h-7 w-[90%] bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-7 w-[60%] bg-gray-200 rounded animate-pulse mb-4" />
                <SkeletonText lines={3} className="mb-6" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Grid of 3 card skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg shadow-card overflow-hidden flex flex-col"
              >
                <div className="aspect-[16/10] bg-gray-200 animate-pulse mb-5" />
                <div className="px-8 pb-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-2.5 w-16 bg-gray-200 rounded animate-pulse" />
                    <div className="h-2.5 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="h-5 w-[85%] bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-5 w-[60%] bg-gray-200 rounded animate-pulse mb-3" />
                  <SkeletonText lines={3} className="flex-1" />
                  <div className="mt-6 flex items-center justify-between">
                    <div className="h-2.5 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
