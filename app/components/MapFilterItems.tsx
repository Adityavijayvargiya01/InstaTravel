"use client";

import Link from "next/link";
import { categoryItems } from "../lib/categoryItems";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo, memo } from "react";
import { cn } from "@/lib/utils";

// Memoized category item component
const CategoryItem = memo(function CategoryItem({ 
  item, 
  isActive, 
  href 
}: { 
  item: typeof categoryItems[0]; 
  isActive: boolean;
  href: string;
}) {
  return (
    <Link
      href={href}
      prefetch={true}
      className={cn(
        isActive
          ? "border-b-2 border-black pb-2 flex-shrink-0"
          : "opacity-70 flex-shrink-0 hover:opacity-100 transition-opacity",
        "flex flex-col gap-y-2 lg:gap-y-3 items-center min-w-[60px]"
      )}
    >
      <div className="relative w-5 h-5 lg:w-6 lg:h-6">
        <Image
          src={item.imageUrl}
          alt={`${item.title} category`}
          width={24}
          height={24}
          loading="lazy"
          className="w-5 h-5 lg:w-6 lg:h-6"
        />
      </div>
      <p className="text-xs font-medium text-center leading-tight">{item.title}</p>
    </Link>
  );
});

export function MapFilterItems() {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // Memoize category links to avoid recalculation
  const categoryLinks = useMemo(() => 
    categoryItems.map(item => ({
      item,
      href: pathname + "?" + createQueryString("filter", item.name),
      isActive: search === item.name
    })),
    [pathname, createQueryString, search]
  );

  return (
    <div className="flex gap-x-6 lg:gap-x-10 mt-5 w-full overflow-x-scroll no-scrollbar pb-2">
      {categoryLinks.map(({ item, href, isActive }) => (
        <CategoryItem
          key={item.id}
          item={item}
          isActive={isActive}
          href={href}
        />
      ))}
    </div>
  );
}
