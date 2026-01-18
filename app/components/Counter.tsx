"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState, useCallback } from "react";

export function Counter({ name }: { name: string }) {
  const [amount, setAmount] = useState(0);

  const increase = useCallback(() => {
    setAmount(prev => prev + 1);
  }, []);

  const decrease = useCallback(() => {
    setAmount(prev => (prev > 0 ? prev - 1 : 0));
  }, []);  return (
    <div className="flex items-center gap-x-2 lg:gap-x-4">
      <input type="hidden" name={name} value={amount} />
      <Button variant="outline" size="icon" type="button" onClick={decrease} className="h-8 w-8 lg:h-10 lg:w-10">
        <Minus className="h-3 w-3 lg:h-4 lg:w-4 text-primary" />
      </Button>
      <p className="font-medium text-base lg:text-lg min-w-[24px] text-center">{amount}</p>
      <Button variant="outline" size="icon" type="button" onClick={increase} className="h-8 w-8 lg:h-10 lg:w-10">
        <Plus className="h-3 w-3 lg:h-4 lg:w-4 text-primary" />
      </Button>
    </div>
  );
}
