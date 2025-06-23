import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreationSubmit } from "./SubmitButtons";

export function CreatioBottomBar() {
  return (
    <div className="fixed w-full bottom-0 z-10 bg-white border-t h-20 lg:h-24">
      <div className="flex items-center justify-between mx-auto px-4 lg:px-5 xl:px-10 h-full">
        <Button variant="secondary" size="default" className="text-sm lg:text-base px-4 lg:px-6" asChild>
          <Link href="/">Cancel</Link>
        </Button>
        <CreationSubmit />
      </div>
    </div>
  );
}
