import { createCategoryPage } from "@/app/actions";
import { CreatioBottomBar } from "@/app/components/CreationBottomBar";
import { SelctetCategory } from "@/app/components/SelectedCategory";

export default function StrucutreRoute({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="w-full px-4 sm:w-4/5 lg:w-3/5 mx-auto">
        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>
      </div>

      <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={params.id} />
        <SelctetCategory />

        <CreatioBottomBar />
      </form>
    </>
  );
}
