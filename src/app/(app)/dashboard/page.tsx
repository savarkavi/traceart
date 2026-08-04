import { auth } from "@clerk/nextjs/server";
import CreateProjectButton from "@/components/CreateProjectButton";

const DashboardPage = async () => {
  await auth.protect();

  return (
    <div className="flex h-screen items-center justify-center">
      <CreateProjectButton />
    </div>
  );
};

export default DashboardPage;
