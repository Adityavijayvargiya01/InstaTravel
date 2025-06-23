import { File, FileQuestion } from "lucide-react";

interface IappProps {
  title: string;
  description: string;
}

export function NoItems({ description, title }: IappProps) {
  return (
    <div className="flex min-h-[300px] lg:min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-6 lg:p-8 text-center animate-in fade-in-50 mt-10 mx-4 lg:mx-0">
      <div className="flex h-16 w-16 lg:h-20 lg:w-20 items-center justify-center rounded-full bg-primary/10">
        <FileQuestion className="h-8 w-8 lg:h-10 lg:w-10 text-primary" />
      </div>
      <h2 className="mt-4 lg:mt-6 text-lg lg:text-xl font-semibold px-4">{title}</h2>
      <p className="mt-2 text-center text-sm leading-6 text-muted-foreground px-4">
        {description}
      </p>
    </div>
  );
}
