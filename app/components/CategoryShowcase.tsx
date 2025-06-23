import Image from "next/image";
import { categoryItems } from "../lib/categoryItems";
import { IMAGE_SIZES } from "../lib/imageUtils";

export function CaegoryShowcase({ categoryName }: { categoryName: string }) {
  const category = categoryItems.find((item) => item.name === categoryName);

  return (
    <div className="flex items-center">      <Image
        src={category?.imageUrl as string}
        alt={`${category?.title || 'Category'} icon`}
        width={44}
        height={44}
        className="object-cover rounded w-10 h-10 lg:w-11 lg:h-11 flex-shrink-0"
        loading="lazy"
        sizes={IMAGE_SIZES.CATEGORY_ICON}
      />

      <div className="flex flex-col ml-3 lg:ml-4 min-w-0">
        <h3 className="font-medium text-sm lg:text-base">{category?.title}</h3>
        <p className="text-xs lg:text-sm text-muted-foreground line-clamp-2">{category?.description}</p>
      </div>
    </div>
  );
}
