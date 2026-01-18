"use client";

import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { memo } from "react";

// Dynamic import with better loading optimization
const LazyMap = dynamic(() => import("@/app/components/Map"), {
  ssr: false,
  loading: () => <Skeleton className="h-[40vh] lg:h-[50vh] w-full rounded-lg" />,
});

// Memoize to prevent unnecessary re-renders
export const HomeMap = memo(function HomeMap({ locationValue }: { locationValue: string }) {
  return <LazyMap locationValue={locationValue} />;
});

