"use client";

import Link from "next/link";
import type { Doc } from "../../../convex/_generated/dataModel";

import ProjectHeaderTabs from "./project-header-tabs";
import { Button } from "../ui/button";
import { Globe, GlobeOff, Loader, Pencil, Upload } from "lucide-react";
import UploadVersionButton from "./upload-version-button";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "../ui/toast";
import { useState } from "react";

type ProjectHeaderProps = {
  project: Doc<"projects">;
};

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const [isPublishing, setIsPublishing] = useState(false);

  const projectId = project._id;
  const publishProject = useMutation(api.project.publishProject);
  const unpublishProject = useMutation(api.project.unpublishProject);

  const handlePublish = async () => {
    setIsPublishing(true);

    try {
      if (project.isPublic) {
        await unpublishProject({ projectId });
        toast.add({
          type: "success",
          description: "Project Unpublished",
        });
      } else {
        await publishProject({ projectId });

        toast.add({
          type: "success",
          description: "Project published",
        });
      }
    } catch (error) {
      console.log(error);
      toast.add({
        type: "error",
        description:
          error instanceof Error ? error.message : "Failed to publish.",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <section>
      <div className="flex flex-col items-start justify-between gap-6 border-b py-6 md:flex-row md:items-end">
        <div className="flex max-w-xl flex-col gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-5xl font-semibold capitalize">
              {project.title}
            </h1>
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
          <Button
            className={cn(
              "py-3.5 text-white",
              project.isPublic
                ? "bg-primary/20 border-primary hover:bg-primary/50"
                : "bg-input/30 border-input hover:bg-input/50",
            )}
            onClick={handlePublish}
            disabled={isPublishing}
          >
            {isPublishing ? (
              <Loader className="text-muted-foreground size-3.5 animate-spin" />
            ) : project.isPublic ? (
              <GlobeOff className="text-muted-foreground size-3.5" />
            ) : (
              <Globe className="text-muted-foreground size-3.5" />
            )}
            {isPublishing
              ? project.isPublic
                ? "Unpublishing..."
                : "Publishing..."
              : project.isPublic
                ? "Unpublish"
                : "Publish"}
          </Button>
          <UploadVersionButton
            projectId={projectId}
            classNames="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex py-2 shrink-0 items-center gap-2 rounded-lg px-3 text-sm shadow-sm transition-all active:translate-y-px cursor-pointer"
          >
            <Upload className="size-3.5" />
            Add Version
          </UploadVersionButton>
        </div>
      </div>
      <ProjectHeaderTabs project={project} />
    </section>
  );
}
