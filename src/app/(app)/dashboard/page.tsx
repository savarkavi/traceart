import { auth } from "@clerk/nextjs/server";
import CreateProjectButton from "@/components/CreateProjectButton";
import ProjectList from "@/components/ProjectList";

const DashboardPage = async () => {
  await auth.protect();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <ProjectList />
      <div className="absolute top-24 right-16">
        <CreateProjectButton />
      </div>
    </div>
  );
};

export default DashboardPage;
