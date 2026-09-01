"use client";

import { Pencil, Upload } from "lucide-react";
import Link from "next/link";
import type { Doc } from "../../../convex/_generated/dataModel";
import { Button } from "../ui/button";
import UploadVersionButton from "./upload-version-button";

type ProjectHeaderProps = {
  project: Doc<"projects">;
};

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const projectId = project._id;

  return (
    <section className="flex flex-col items-start justify-between gap-6 border-b py-6 md:flex-row md:items-end">
      <div className="flex max-w-xl flex-col gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-5xl font-semibold capitalize">{project.title}</h1>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-200">
            <span className="relative size-1.5">
              <span className="absolute size-1.5 animate-ping rounded-full bg-amber-400" />
              <span className="absolute size-1.5 rounded-full bg-amber-400" />
            </span>
            In progress
          </span>
        </div>
        {project.description && (
          <p className="text-muted-foreground">{project.description}</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Link href={`/projects/${projectId}/settings`}>
          <Button variant="outline" className="py-3.5">
            <Pencil className="text-muted-foreground size-3.5" />
            Edit details
          </Button>
        </Link>
        <UploadVersionButton
          projectId={projectId}
          classNames="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex py-2 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-semibold shadow-sm transition-all active:translate-y-px cursor-pointer"
        >
          <Upload className="size-3.5" />
          Upload version
        </UploadVersionButton>
      </div>
    </section>
  );
}
