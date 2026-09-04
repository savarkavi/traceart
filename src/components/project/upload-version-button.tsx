"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "convex/react";
import { Flag, RotateCcw, Upload } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "../ui/toast";
import {
  ACCEPTED_IMAGE_TYPES,
  uploadVersionSchema,
} from "@/lib/validations/form-create-version";
import { cn } from "@/lib/utils";

interface UploadVersionButton {
  children: React.ReactNode;
  projectId: Id<"projects">;
  classNames?: string;
}

type VersionType = "milestone" | "revision";

const UploadVersionButton = ({
  children,
  projectId,
  classNames,
}: UploadVersionButton) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const generateUploadUrl = useMutation(api.version.generateUploadUrl);
  const createVersion = useMutation(api.version.createVersion);
  const versions = useQuery(api.version.getAllVersions, { projectId });

  const form = useForm({
    defaultValues: {
      type: "milestone" as VersionType,
      title: "",
      description: "",
      file: undefined as File | undefined,
    },
    validators: {
      onSubmit: uploadVersionSchema,
    },
    onSubmit: async ({ value }) => {
      const file = value.file;

      if (!file) return;

      setIsUploading(true);

      try {
        const uploadUrl = await generateUploadUrl({ projectId });

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

        await createVersion({
          projectId,
          storageId,
          type: value.type,
          title: value.title.trim(),
          description: value.description.trim(),
        });

        toast.add({
          type: "success",
          description: "Version uploaded successfully.",
        });
        form.reset();
        setIsOpen(false);
      } catch (error) {
        console.log(error);
        toast.add({
          type: "error",
          description:
            error instanceof Error
              ? error.message
              : "Failed to upload version.",
        });
      } finally {
        setIsUploading(false);
      }
    },
  });

  if (versions === undefined) return;

  const milestoneCount = versions.filter(
    (version) => version.type === "milestone",
  ).length;
  const latestMilestoneNumber = Math.max(milestoneCount, 1);
  const latestMilestoneIndex = versions.findIndex(
    (version) => version.type === "milestone",
  );
  const revisionsSinceLatestMilestone =
    latestMilestoneIndex === -1
      ? 0
      : versions
          .slice(0, latestMilestoneIndex)
          .filter((version) => version.type === "revision").length;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!isUploading) {
          setIsOpen(open);
          if (!open) form.reset();
        }
      }}
    >
      <DialogTrigger
        render={
          <Button className={classNames ?? "py-4.5"}>
            {children ?? <Upload className="size-3.5" />}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a version</DialogTitle>
          <DialogDescription>
            Name this stage, add any helpful notes, and choose the artwork image
            to add it to your timeline.
          </DialogDescription>
        </DialogHeader>
        <form
          id="upload-version-form"
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="type">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                const value = field.state.value;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Version Type</FieldLabel>
                    <div className="flex justify-between gap-3">
                      <div
                        className={cn(
                          "text-muted-foreground flex w-full cursor-pointer flex-col gap-1 rounded-lg border p-3 text-xs",
                          value === "milestone" &&
                            "border-primary bg-primary/5",
                        )}
                        onClick={() => field.handleChange("milestone")}
                      >
                        <Flag
                          className={cn(
                            "mb-1 size-4",
                            value === "milestone" && "text-primary",
                          )}
                        />
                        <p className="text-white">Milestone</p>
                        <p>A new major checkpoint</p>
                      </div>
                      <div
                        className={cn(
                          "text-muted-foreground flex w-full cursor-pointer flex-col gap-1 rounded-lg border p-3 text-xs",
                          value === "revision" && "border-primary bg-primary/5",
                        )}
                        onClick={() => field.handleChange("revision")}
                      >
                        <RotateCcw
                          className={cn(
                            "mb-1 size-4",
                            value === "revision" && "text-primary",
                          )}
                        />
                        <p className="text-white">Revision</p>
                        <p>{`An update to version ${latestMilestoneNumber}`}</p>
                      </div>
                    </div>
                    <div className="bg-muted text-muted-foreground w-full rounded-2xl px-4 py-2 text-xs">
                      This will be saved as{" "}
                      <span className="text-foreground font-medium">
                        {value === "milestone"
                          ? `V${milestoneCount + 1}`
                          : `V${latestMilestoneNumber}.${revisionsSinceLatestMilestone + 1}`}
                      </span>
                    </div>
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="title">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      placeholder="e.g. Refined lineart"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      placeholder="What changed in this version? (optional)"
                      rows={4}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="file">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Artwork image</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="file"
                      accept={ACCEPTED_IMAGE_TYPES.join(",")}
                      onBlur={field.handleBlur}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(event.target.files?.[0])
                      }
                      aria-invalid={isInvalid}
                    />
                    <p className="text-muted-foreground text-xs">
                      PNG, JPEG, WEBP, or GIF up to 10 MB.
                    </p>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" disabled={isUploading}>
                Cancel
              </Button>
            }
          />
          <Button
            type="submit"
            form="upload-version-form"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Add version"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadVersionButton;
