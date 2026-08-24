import type { Id } from "../../../../../convex/_generated/dataModel";
import ProjectView from "@/components/project/project-view";

const ProjectPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  return <ProjectView projectId={projectId as Id<"projects">} />;
};

export default ProjectPage;
