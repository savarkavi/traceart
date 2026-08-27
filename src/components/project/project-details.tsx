import { Clipboard, Pencil } from "lucide-react";
import type { Doc } from "../../../convex/_generated/dataModel";
import Link from "next/link";

type ProjectDetailsProps = {
  project: Doc<"projects">;
};

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <aside className="border-border bg-card rounded-2xl border p-5 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-muted-foreground text-[10px] font-semibold tracking-[0.16em] uppercase">
            Project details
          </p>
        </div>
        <Link href={`/projects/${project._id}/settings`}>
          <button
            type="button"
            className="text-primary hover:text-primary/70 inline-flex items-center gap-1 text-xs font-semibold transition-colors"
          >
            <Pencil className="size-3" />
            Edit
          </button>
        </Link>
      </div>
      <div className="space-y-4 text-sm">
        <div>
          <p className="text-muted-foreground mb-1 text-xs">Title</p>
          <p className="font-medium">{project.title}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1 text-xs">Description</p>
          <p className="leading-5 font-medium">
            {project.description || "No description yet."}
          </p>
        </div>
      </div>
      <div className="border-border mt-5 border-t pt-4">
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <span className="flex items-center gap-2">
            <Clipboard className="size-3.5" />
            Started
          </span>
          <span className="text-foreground">
            {new Date(project._creationTime).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default ProjectDetails;
