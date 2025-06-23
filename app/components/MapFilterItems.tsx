"use client";

import Link from "next/link";
import { categoryItems } from "../lib/categoryItems";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

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
  return (
    <div className="flex gap-x-6 lg:gap-x-10 mt-5 w-full overflow-x-scroll no-scrollbar pb-2">
      {categoryItems.map((item) => (
        <Link
          key={item.id}
          href={pathname + "?" + createQueryString("filter", item.name)}
          className={cn(
            search === item.name
              ? "border-b-2 border-black pb-2 flex-shrink-0"
              : "opacity-70 flex-shrink-0",
            "flex flex-col gap-y-2 lg:gap-y-3 items-center min-w-[60px]"
          )}
        >
          <div className="relative w-5 h-5 lg:w-6 lg:h-6">
            <Image
              src={item.imageUrl}
              alt="Category image"
              className="w-5 h-5 lg:w-6 lg:h-6"
              width={24}
              height={24}
            />
          </div>
          <p className="text-xs font-medium text-center leading-tight">{item.title}</p>
        </Link>
      ))}
    </div>
  );
}
