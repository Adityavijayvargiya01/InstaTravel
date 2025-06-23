import { Skeleton } from "@/components/ui/skeleton";

export function SkeltonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-56 sm:h-64 lg:h-72 w-full rounded-lg" />
      <div className="space-y-2 flex flex-col">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 lg:h-4 w-3/4" />
        <Skeleton className="h-3 lg:h-4 w-1/2" />
      </div>
    </div>
  );
}
