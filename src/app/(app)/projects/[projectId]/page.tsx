import ProjectEmptyUpload from "@/components/project/project-empty-upload";
import ProjectHeader from "@/components/project/project-header";
import { Id } from "../../../../../convex/_generated/dataModel";

const ProjectPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  return (
    <main
      className="bg-background text-foreground min-h-screen"
      data-project-id={projectId}
    >
      <div className="mx-auto max-w-6xl px-3 py-10 lg:py-14">
        <ProjectHeader projectId={projectId as Id<"projects">} />
        <div className="mt-10">
          <ProjectEmptyUpload />
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
