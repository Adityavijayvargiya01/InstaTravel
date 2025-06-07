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
        className="object-cover rounded"
        loading="lazy"
        sizes={IMAGE_SIZES.CATEGORY_ICON}
      />

      <div className="flex flex-col ml-4">
        <h3 className="font-medium">{category?.title}</h3>
        <p className="text-sm text-muted-foreground">{category?.description}</p>
      </div>
    </div>
  );
}
