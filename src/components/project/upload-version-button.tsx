"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useId, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";
import { toast } from "../ui/toast";

interface UploadVersionButton {
  children: React.ReactNode;
  projectId: Id<"projects">;
  classNames?: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const UploadVersionButton = ({
  children,
  projectId,
  classNames,
}: UploadVersionButton) => {
  const inputId = useId();
  const [isUploading, setIsUploading] = useState(false);

  const generateUploadUrl = useMutation(api.version.generateUploadUrl);
  const createVersion = useMutation(api.version.createVersion);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.add({
        type: "error",
        description: "Images must be smaller than 10 MB.",
      });
      return;
    }

    setIsUploading(true);

    try {
      const uploadUrl = await generateUploadUrl();

      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error("Image upload failed.");
      }

      const { storageId } = await response.json();

      await createVersion({ projectId, storageId });

      toast.add({
        type: "success",
        description: "Version uploaded successfully",
      });
    } catch (error) {
      console.log(error);
      toast.add({
        type: "error",
        description:
          error instanceof Error ? error.message : "Failed to upload version",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Field className="w-fit">
      <FieldLabel htmlFor={inputId} className={classNames}>
        {isUploading ? "uploading..." : children}
      </FieldLabel>
      <Input
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleFileChange}
        className="sr-only"
      />
    </Field>
  );
};

export default UploadVersionButton;
