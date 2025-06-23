"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { categoryItems } from "../lib/categoryItems";
import Image from "next/image";
import { useState } from "react";

export function SelctetCategory() {
  const [selectedCategory, setSelectredCategory] = useState<string | undefined>(
    undefined
  );  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8 mt-10 w-full px-4 sm:w-4/5 lg:w-3/5 mx-auto mb-36">
      <input
        type="hidden"
        name="categoryName"
        value={selectedCategory as string}
      />
      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={selectedCategory === item.name ? "border-primary" : ""}
            onClick={() => setSelectredCategory(item.name)}
          >
            <CardHeader className="p-4 lg:p-6">
              <Image
                src={item.imageUrl}
                alt={item.name}
                height={32}
                width={32}
                className="w-6 h-6 lg:w-8 lg:h-8"
              />

              <h3 className="font-medium text-sm lg:text-base">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
