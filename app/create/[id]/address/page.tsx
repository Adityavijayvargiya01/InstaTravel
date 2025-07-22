"use client";

import { createLocation } from "@/app/actions";
import { CreatioBottomBar } from "@/app/components/CreationBottomBar";
import { useCountries } from "@/app/lib/getCountries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";

export default function AddressRoutw({ params }: { params: { id: string } }) {
  const { getAllCountries } = useCountries();
  const [locationValue, setLocationValue] = useState("");

  const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[40vh] lg:h-[50vh] w-full" />,
  });
  return (
    <>
      <div className="w-full px-4 sm:w-4/5 lg:w-3/5 mx-auto">
        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight transition-colors mb-6 lg:mb-10">
          Where is your Home located?
        </h2>
      </div>

      <form action={createLocation}>
        <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="countryValue" value={locationValue} />
        <div className="w-full px-4 sm:w-4/5 lg:w-3/5 mx-auto mb-36">
          <div className="mb-5">
            <Select required onValueChange={(value) => setLocationValue(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      <div className="flex items-center gap-x-2">
                        <Image
                          src={item.flag}
                          alt="country flag"
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <span>{item.label} / {item.region}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <LazyMap locationValue={locationValue} />
        </div>

        <CreatioBottomBar />
      </form>
    </>
  );
}
