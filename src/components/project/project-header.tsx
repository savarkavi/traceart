import { Upload } from "lucide-react";
import UploadVersionButton from "./upload-version-button";
import { Id } from "../../../convex/_generated/dataModel";

type ProjectHeaderProps = {
  projectName?: string;
  projectId: Id<"projects">;
  description?: string;
};

export default function ProjectHeader({
  projectName = "Untitled",
  projectId,
  description = "A quiet place for this piece to take shape. Add the first version when you are ready.",
}: ProjectHeaderProps) {
  return (
    <section className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
      <div>
        <p className="text-primary text-xs font-medium tracking-[0.18em] uppercase">
          Project
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {projectName}
        </h1>
        <p className="text-muted-foreground mt-3 max-w-md text-base leading-7">
          {description}
        </p>
      </div>
      <UploadVersionButton
        projectId={projectId}
        classNames="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 shrink-0 items-center gap-2 rounded-lg px-4 text-sm font-semibold shadow-sm transition-all active:translate-y-px"
      >
        <Upload className="size-4" />
        Upload version
      </UploadVersionButton>
    </section>
  );
}
