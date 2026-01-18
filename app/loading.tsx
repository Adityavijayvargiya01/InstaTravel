import { SkeletonCard } from "./components/SkeletonCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 lg:px-5 xl:px-10">
      {/* Category filter skeleton */}
      <div className="flex gap-x-6 lg:gap-x-10 mt-5 w-full overflow-hidden pb-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-y-2 min-w-[60px]">
            <Skeleton className="w-5 h-5 lg:w-6 lg:h-6 rounded-full" />
            <Skeleton className="w-12 h-3" />
          </div>
        ))}
      </div>
      
      {/* Listing cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mt-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
