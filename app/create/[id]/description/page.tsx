import { CreateDescription } from "@/app/actions";
import { Counter } from "@/app/components/Counter";
import { CreatioBottomBar } from "@/app/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DescriptionPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <div className="w-full px-4 sm:w-4/5 lg:w-3/5 mx-auto">
        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight transition-colors">
          Please describe your home as good as you can!
        </h2>
      </div>

      <form action={CreateDescription}>
        <input type="hidden" name="homeId" value={params.id} />
        <div className="mx-auto w-full px-4 sm:w-4/5 lg:w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              type="text"
              required
              placeholder="Short and simple..."
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Descrption</Label>
            <Textarea
              name="description"
              required
              placeholder="Please describe your home..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              required
              placeholder="Price per Night in USD"
              min={10}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Image</Label>
            <Input name="image" type="file" required />
          </div>

          <Card>
            <CardHeader className="flex flex-col gap-y-4 lg:gap-y-5 p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium text-sm lg:text-base">Guests</h3>
                  <p className="text-muted-foreground text-xs lg:text-sm">
                    How many guests do you want?
                  </p>
                </div>

                <Counter name="guest" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium text-sm lg:text-base">Rooms</h3>
                  <p className="text-muted-foreground text-xs lg:text-sm">
                    How many rooms do you have?
                  </p>
                </div>

                <Counter name="room" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium text-sm lg:text-base">Bathrooms</h3>
                  <p className="text-muted-foreground text-xs lg:text-sm">
                    How many bathrooms do you have?
                  </p>
                </div>

                <Counter name="bathroom" />
              </div>
            </CardHeader>
          </Card>
        </div>

        <CreatioBottomBar />
      </form>
    </>
  );
}
