import { Suspense, cache } from "react";
import { MapFilterItems } from "./components/MapFilterItems";
import prisma from "./lib/db";
import { SkeletonCard } from "./components/SkeletonCard";
import { NoItems } from "./components/NoItem";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ListingCard } from "./components/ListingCard";
import { connection } from "next/server";

// Revalidate every 60 seconds for fresh data while maintaining cache
export const revalidate = 60;

// Cached data fetching function
const getData = cache(async ({
  searchParams,
  userId,
}: {
  userId: string | undefined;
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) => {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLoaction: true,
      addedDescription: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guest ?? undefined,
      bedrooms: searchParams?.room ?? undefined,
      bathrooms: searchParams?.bathroom ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
    // Limit initial load for better performance
    take: 20,
    orderBy: {
      createdAT: 'desc',
    },
  });

  return data;
});

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  }>;
}) {
  const params = await searchParams;
  
  return (
    <div className="container mx-auto px-4 lg:px-5 xl:px-10">
      <MapFilterItems />

      <Suspense key={params?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={params} />
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  // Defer to request time for user-specific data
  await connection();
  
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams: searchParams, userId: user?.id });

  return (
    <>
      {data.length === 0 ? (
        <NoItems
          description="Please check a other category or create your own listing!"
          title="Sorry no listings found for this category..."
        />
      ) : (        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mt-8">
          {data.map((item, index) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              imagePath={item.photo as string}
              location={item.country as string}
              price={item.price as number}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id}
              isInFavoriteList={item.Favorite.length > 0 ? true : false}
              homeId={item.id}
              pathName="/"
              priority={index < 4} // Prioritize first 4 images for LCP
            />
          ))}
        </div>
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
