import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <Skeleton className="h-56 sm:h-64 lg:h-72 w-full rounded-lg" />
      </div>
      <div className="mt-2 space-y-2">
        <Skeleton className="h-4 lg:h-5 w-full" />
        <Skeleton className="h-3 lg:h-4 w-3/4 mt-1" />
        <Skeleton className="h-4 w-20 mt-2" />
      </div>
    </div>
  );
}
