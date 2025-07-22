/* eslint-disable @next/next/no-img-element */

import { createReservation } from "@/app/actions";
import { CaegoryShowcase } from "@/app/components/CategoryShowcase";
import { HomeMap } from "@/app/components/HomeMap";
import { SelectCalender } from "@/app/components/SelectCalender";
import { ReservationSubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import { getOptimizedImageUrl, IMAGE_SIZES, generateBlurDataURL } from "@/app/lib/imageUtils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";


async function getData(homeid: string) {
  noStore();
  const data = await prisma.home.findUnique({
    where: {
      id: homeid,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      Reservation: {
        where: {
          homeId: homeid,
        },
      },

      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });

  return data;
}

export default async function HomeRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  const { getUser } = getKindeServerSession();
  const user = await getUser();  return (
    <div className="w-full px-4 lg:w-[85%] xl:w-[75%] mx-auto mt-6 lg:mt-10 mb-12">
      <h1 className="font-medium text-xl lg:text-2xl mb-4 lg:mb-5">{data?.title}</h1>      <div className="relative h-[250px] sm:h-[350px] lg:h-[550px]">
        <Image
          alt={`Image of ${data?.title || 'home'}`}
          src={getOptimizedImageUrl(data?.photo || '')}
          fill
          className="rounded-lg h-full object-cover w-full transition-opacity duration-300"
          priority
          sizes={IMAGE_SIZES.HERO_IMAGE}
          placeholder="blur"
          blurDataURL={generateBlurDataURL(800, 550)}
          quality={85}
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-x-24 mt-6 lg:mt-8">
        <div className="w-full lg:w-2/3">
          <div className="flex items-center gap-x-2">
            <Image
              src={country?.flag as string}
              alt="Country Flag"
              width={24}
              height={24}
              className="rounded-full"
            />
            <h3 className="text-lg lg:text-xl font-medium">
              {country?.label} / {country?.region}
            </h3>
          </div>
          <div className="flex gap-x-2 text-muted-foreground text-sm lg:text-base">
            <p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> *{" "}
            {data?.bathrooms} Bathrooms
          </div>          <div className="flex items-center mt-4 lg:mt-6">
            <Image
              src={
                data?.User?.profileImage ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt={`Profile picture of ${data?.User?.firstName || 'host'}`}
              width={44}
              height={44}
              className="rounded-full object-cover w-10 h-10 lg:w-11 lg:h-11"
              loading="lazy"
              sizes={IMAGE_SIZES.AVATAR}
            />
            <div className="flex flex-col ml-3 lg:ml-4">
              <h3 className="font-medium text-sm lg:text-base">Hosted by {data?.User?.firstName}</h3>
              <p className="text-xs lg:text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>

          <Separator className="my-5 lg:my-7" />

          <CaegoryShowcase categoryName={data?.categoryName as string} />

          <Separator className="my-5 lg:my-7" />

          <p className="text-muted-foreground text-sm lg:text-base">{data?.description}</p>

          <Separator className="my-5 lg:my-7" />

          <HomeMap locationValue={country?.value as string} />
        </div>

        <div className="w-full lg:w-1/3 lg:sticky lg:top-4 lg:self-start">
          <form action={createReservation}>
            <input type="hidden" name="homeId" value={params.id} />
            <input type="hidden" name="userId" value={user?.id} />

            <SelectCalender reservation={data?.Reservation} />

            {user?.id ? (
              <ReservationSubmitButton />
            ) : (
              <Button className="w-full" asChild>
                <Link href="/api/auth/login">Make a Reservation</Link>
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
