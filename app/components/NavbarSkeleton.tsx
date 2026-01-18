"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function NavbarSkeleton() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-4 lg:px-5 xl:px-10 py-4 lg:py-5">
        {/* Logo skeleton */}
        <Skeleton className="w-28 lg:w-52 h-8 lg:h-12" />
        
        {/* Search skeleton */}
        <Skeleton className="hidden sm:block w-48 lg:w-64 h-10 rounded-full" />
        
        {/* User nav skeleton */}
        <Skeleton className="w-16 lg:w-24 h-10 rounded-full" />
      </div>
    </nav>
  );
}
