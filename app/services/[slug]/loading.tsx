import { SkeletonText, SkeletonImage } from "@/components/Skeleton";

export default function ServiceDetailLoading() {
  return (
    <>
      {/* Header area */}
      <section className="pt-10 pb-16 bg-white border-b border-gray-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-brand/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
            <span className="text-gray-300 text-xs">/</span>
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
            <span className="text-gray-300 text-xs">/</span>
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              {/* Tags skeleton */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-gray-200" />
                <div className="flex gap-2">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              {/* Title skeleton */}
              <div className="h-10 w-[80%] bg-gray-200 rounded animate-pulse mb-3" />
              {/* Tagline skeleton */}
              <div className="h-5 w-[60%] bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <div className="h-14 w-48 bg-gray-200 rounded-lg animate-pulse ml-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Content left */}
            <div className="lg:col-span-7 space-y-12">
              {/* Intro text */}
              <SkeletonText lines={4} />

              {/* What's included */}
              <div>
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-6 h-px bg-gray-200" />
                  <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 bg-gray-200 rotate-45 mt-2 flex-shrink-0" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Project image */}
              <SkeletonImage />
            </div>

            {/* Sidebar right */}
            <div className="lg:col-span-5 space-y-8">
              {/* Quote card skeleton */}
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse mb-5" />
                <SkeletonText lines={2} className="mb-6" />
                <div className="space-y-4">
                  <div className="h-11 bg-gray-200 rounded animate-pulse" />
                  <div className="h-11 bg-gray-200 rounded animate-pulse" />
                  <div className="h-11 bg-gray-200 rounded animate-pulse" />
                  <div className="h-11 w-full bg-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>

              {/* Service highlights skeleton */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
                <div className="h-3 w-36 bg-gray-200 rounded animate-pulse" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gray-200 rounded-full flex-shrink-0" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
                  </div>
                ))}
              </div>

              {/* Service area skeleton */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mb-3" />
                <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
