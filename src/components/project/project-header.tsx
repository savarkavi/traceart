"use client";

import { useQuery } from "convex/react";
import { Pencil, Upload } from "lucide-react";
import Link from "next/link";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { Button } from "../ui/button";
import UploadVersionButton from "./upload-version-button";

type ProjectHeaderProps = {
  projectId: Id<"projects">;
};

export default function ProjectHeader({ projectId }: ProjectHeaderProps) {
  const project = useQuery(api.project.getProjectById, { projectId });

  if (project === undefined) {
    return <div>Loading project...</div>;
  }

  if (project === null) {
    return <div>Project not found.</div>;
  }

  return (
    <section className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
      <div>
        <h1 className="mt-3 text-4xl font-semibold">{project.title}</h1>
        <p className="text-muted-foreground mt-3 max-w-md text-base leading-7">
          {project.description}
        </p>
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
