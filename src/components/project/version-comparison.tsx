import Image from "next/image";
import { Id } from "../../../convex/_generated/dataModel";

type VersionWithImage = {
  imageUrl: string | null;
  _id: Id<"versions">;
  _creationTime: number;
  projectId: Id<"projects">;
  storageId: Id<"_storage">;
};

interface VersionComparisonProps {
  versions: VersionWithImage[];
}

const VersionComparison = ({ versions }: VersionComparisonProps) => {
  const imageUrl = versions[0].imageUrl;

  return (
    <div className="bg-card border-border overflow-hidden rounded-2xl border shadow-sm">
      {imageUrl ? (
        <div className="relative h-200 w-full">
          <Image
            src={imageUrl}
            alt="First artwork version"
            fill
            className="h-auto w-full object-contain"
          />
        </div>
      ) : (
        <div className="text-muted-foreground flex h-200 w-full items-center justify-center">
          Image unavailable
        </div>
      )}
    </div>
  );
};

export default VersionComparison;
