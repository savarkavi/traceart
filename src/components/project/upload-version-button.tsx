"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { Upload } from "lucide-react";
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

interface UploadVersionButton {
  children: React.ReactNode;
  projectId: Id<"projects">;
  classNames?: string;
}

const UploadVersionButton = ({
  children,
  projectId,
  classNames,
}: UploadVersionButton) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const generateUploadUrl = useMutation(api.version.generateUploadUrl);
  const createVersion = useMutation(api.version.createVersion);

  const form = useForm({
    defaultValues: {
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
      <DialogContent className="sm:max-w-sm">
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
