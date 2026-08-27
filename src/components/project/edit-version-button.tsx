"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { ImageIcon, Pencil } from "lucide-react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { editVersionSchema } from "@/lib/validations/form-create-version";
import { Button } from "@/components/ui/button";
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { VersionWithImage } from "./version-timeline";
import { Id } from "../../../convex/_generated/dataModel";

interface EditVersionButtonProps {
  version: VersionWithImage;
  projectId: Id<"projects">;
}

const EditVersionButton = ({ version, projectId }: EditVersionButtonProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const updateVersion = useMutation(api.version.updateVersion);
  const generateUploadUrl = useMutation(api.version.generateUploadUrl);

  const form = useForm({
    defaultValues: {
      title: version.title,
      description: version.description,
      file: undefined as File | undefined,
    },
    validators: {
      onSubmit: editVersionSchema,
    },
    onSubmit: async ({ value }) => {
      setIsUpdating(true);

      try {
        const title = value.title.trim();
        const description = value.description.trim();
        const file = value.file;
        let versionStorageId = version.storageId;

        if (file) {
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

          versionStorageId = storageId;
        }

        await updateVersion({
          versionId: version._id,
          projectId: version.projectId,
          storageId: versionStorageId,
          title,
          description,
        });

        form.reset({ title, description, file: undefined });
        toast.add({
          type: "success",
          description: "Version details updated.",
        });
        setIsOpen(false);
      } catch (error) {
        console.log(error);
        toast.add({
          type: "error",
          description:
            error instanceof Error
              ? error.message
              : "Failed to update the version.",
        });
      } finally {
        setIsUpdating(false);
      }
    },
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!isUpdating) {
          setIsOpen(open);
          if (!open) {
            form.reset({
              title: version.title,
              description: version.description,
              file: undefined,
            });
          }
        }
      }}
    >
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="bg-background/90 shadow-sm backdrop-blur-sm"
            aria-label={`Edit ${version.title}`}
          >
            <Pencil className="size-3" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit version</DialogTitle>
          <DialogDescription>
            Update the title and notes for this stage of your artwork.
          </DialogDescription>
        </DialogHeader>
        <form
          id={`edit-version-form-${version._id}`}
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
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
                  <Field>
                    <FieldLabel htmlFor={field.name}>Artwork image</FieldLabel>
                    <label
                      htmlFor={field.name}
                      className={cn(
                        "relative block w-full rounded-lg",
                        !field.state.value && version.imageUrl
                          ? "h-40 cursor-pointer"
                          : "cursor-default",
                      )}
                    >
                      {!field.state.value && version.imageUrl && (
                        <>
                          <Image
                            src={version.imageUrl}
                            alt="artwork image"
                            fill
                            className="rounded-lg object-cover opacity-40"
                          />
                          <div className="absolute top-1/2 left-1/2 flex -translate-1/2 flex-col items-center gap-1 font-medium text-white">
                            Change Image <ImageIcon className="size-3.5" />
                          </div>
                        </>
                      )}
                      <Input
                        id={field.name}
                        name={field.name}
                        type="file"
                        accept="image/*"
                        className={
                          !field.state.value && version.imageUrl
                            ? "sr-only"
                            : undefined
                        }
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.files?.[0])
                        }
                        aria-invalid={isInvalid}
                      />
                    </label>
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
              <Button variant="outline" disabled={isUpdating}>
                Cancel
              </Button>
            }
          />
          <Button
            type="submit"
            form={`edit-version-form-${version._id}`}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditVersionButton;
