import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButtons";
import { DeleteFromFavorite, addToFavorite } from "../actions";
import { getOptimizedImageUrl, IMAGE_SIZES, generateBlurDataURL } from "../lib/imageUtils";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  pathName: string;
}

export function ListingCard({
  description,
  imagePath,
  location,
  price,
  userId,
  favoriteId,
  homeId,
  isInFavoriteList,
  pathName,
}: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);  return (
    <div className="flex flex-col">      <div className="relative h-56 sm:h-64 lg:h-72">
        <Image 
          src={getOptimizedImageUrl(imagePath)}
          alt={`Image of home in ${country?.label || 'destination'}`}
          sizes={IMAGE_SIZES.LISTING_CARD}
          fill
          className="rounded-lg h-full object-cover transition-opacity duration-300"
          loading="lazy"
          placeholder="blur"
          blurDataURL={generateBlurDataURL(400, 288)}
          quality={80}
        />

        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={DeleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={`/home/${homeId}`} className="mt-2">
        <div className="flex items-center gap-x-2">
          <Image
            src={country?.flag as string}
            alt="Country flag"
            width={16}
            height={16}
            className="rounded-full"
          />
          <h3 className="font-medium text-sm lg:text-base">
            {country?.label} / {country?.region}
          </h3>
        </div>
        <p className="text-muted-foreground text-xs lg:text-sm line-clamp-2 mt-1">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground text-sm">
          <span className="font-medium text-black">${price}</span> Night
        </p>
      </Link>
    </div>
  );
}
