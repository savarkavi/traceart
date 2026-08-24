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
    <section className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
      <div>
        <h1 className="mt-3 text-4xl font-semibold">{project.title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <Link href={`/projects/${projectId}/settings`}>
          <Button variant="outline" className="py-4.5">
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
