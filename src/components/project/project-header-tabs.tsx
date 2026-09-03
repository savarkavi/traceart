"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="flex items-center justify-between border-b py-2">
      <Tabs value={activeTab}>
        <TabsList variant="line" className="gap-6">
          <TabsTrigger
            nativeButton={false}
            render={<Link href={`/projects/${projectId}/`} />}
            value="overview"
            className="data-active:font-bold"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            nativeButton={false}
            render={<Link href={`/projects/${projectId}/timeline`} />}
            value="timeline"
            className="data-active:font-bold"
          >
            Timeline
          </TabsTrigger>
          <TabsTrigger
            nativeButton={false}
            render={<Link href={`/projects/${projectId}/compare`} />}
            value="compare"
            className="data-active:font-bold"
          >
            Compare
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ProjectHeaderTabs;
