"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import UploadVersionButton from "./upload-version-button";
import { Pencil, Upload } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Doc } from "../../../convex/_generated/dataModel";

type ProjectHeaderTabsProps = {
  project: Doc<"projects">;
};

const ProjectHeaderTabs = ({ project }: ProjectHeaderTabsProps) => {
  const projectId = project._id;
  const pathname = usePathname();
  const projectPath = `/projects/${projectId}`;

  const activeTab =
    pathname === projectPath || pathname === `${projectPath}/`
      ? "overview"
      : pathname.startsWith(`${projectPath}/timeline`)
        ? "timeline"
        : pathname.startsWith(`${projectPath}/compare`)
          ? "compare"
          : "overview";

  return (
    <div className="mt-8 flex items-center justify-between border-b py-4">
      <Tabs value={activeTab}>
        <TabsList variant="line">
          <TabsTrigger
            nativeButton={false}
            render={<Link href={`/projects/${projectId}/`} />}
            value="overview"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            nativeButton={false}
            render={<Link href={`/projects/${projectId}/timeline`} />}
            value="timeline"
          >
            Timeline
          </TabsTrigger>
          <TabsTrigger
            nativeButton={false}
            render={<Link href={`/projects/${projectId}/compare`} />}
            value="compare"
          >
            Compare
          </TabsTrigger>
        </TabsList>
      </Tabs>
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
    </div>
  );
};

export default ProjectHeaderTabs;
