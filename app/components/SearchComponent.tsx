"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

import { Search } from "lucide-react";
import { useState, useMemo, useCallback, memo } from "react";
import { useCountries } from "../lib/getCountries";
import { HomeMap } from "./HomeMap";
import { Button } from "@/components/ui/button";
import { CreationSubmit } from "./SubmitButtons";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "./Counter";

// Memoized country item to prevent re-renders
const CountryItem = memo(function CountryItem({ 
  item 
}: { 
  item: { value: string; flag: string; label: string; region: string } 
}) {
  return (
    <SelectItem value={item.value}>
      <div className="flex items-center gap-x-2">
        <Image
          src={item.flag}
          alt={`${item.label} flag`}
          width={20}
          height={20}
          className="rounded-full"
          loading="lazy"
        />
        <span>{item.label} / {item.region}</span>
      </div>
    </SelectItem>
  );
});

export function SearchModalCompnent() {
  const [step, setStep] = useState(1);
  const [locationValue, setLocationValue] = useState("");
  const { getAllCountries } = useCountries();
  
  // Memoize countries list
  const countries = useMemo(() => getAllCountries(), [getAllCountries]);

  const handleNextStep = useCallback(() => {
    setStep(prev => prev + 1);
  }, []);

  const SubmitButtonLocal = useCallback(() => {
    if (step === 1) {
      return (
        <Button onClick={handleNextStep} type="button">
          Next
        </Button>
      );
    } else if (step === 2) {
      return <CreationSubmit />;
    }
    return null;
  }, [step, handleNextStep]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full py-2 px-3 lg:px-5 border flex items-center cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex h-full divide-x font-medium">
            <p className="px-2 sm:px-3 lg:px-4 text-sm lg:text-base">Anywhere</p>
            <p className="px-2 sm:px-3 lg:px-4 text-sm lg:text-base hidden sm:block">Any Week</p>
            <p className="px-2 sm:px-3 lg:px-4 text-sm lg:text-base hidden md:block">Add Guests</p>
          </div>

          <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full flex-shrink-0" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <form className="gap-4 flex flex-col">
          <input type="hidden" name="country" value={locationValue} />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a Country</DialogTitle>
                <DialogDescription>
                  Pleae Choose a Country, so that what you want
                </DialogDescription>
              </DialogHeader>

              <Select
                required
                onValueChange={setLocationValue}
                value={locationValue}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    {countries.map((item) => (
                      <CountryItem key={item.value} item={item} />
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <HomeMap locationValue={locationValue} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select all the info you need</DialogTitle>
                <DialogDescription>
                  Pleae Choose a Country, so that what you want
                </DialogDescription>
              </DialogHeader>

              <Card>
                <CardHeader className="flex flex-col gap-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Guests</h3>
                      <p className="text-muted-foreground text-sm">
                        How many guests do you want?
                      </p>
                    </div>

                    <Counter name="guest" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Rooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many rooms do you have?
                      </p>
                    </div>

                    <Counter name="room" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Bathrooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many bathrooms do you have?
                      </p>
                    </div>

                    <Counter name="bathroom" />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}

          <DialogFooter>
            <SubmitButtonLocal />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
