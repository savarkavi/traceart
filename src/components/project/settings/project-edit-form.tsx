"use client";

import { projectSettingsSchema } from "@/lib/validations/form-settings";
import { useForm } from "@tanstack/react-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "@/components/ui/toast";
import { useState } from "react";

interface ProjectEditFormProps {
  project: Doc<"projects">;
}

const ProjectEditForm = ({ project }: ProjectEditFormProps) => {
  const updateProject = useMutation(api.project.updateProject);
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm({
    defaultValues: {
      title: project.title,
      description: project.description,
    },
    validators: {
      onSubmit: projectSettingsSchema,
    },
    onSubmit: async ({ value }) => {
      setIsUpdating(true);

      try {
        await updateProject({
          projectId: project._id,
          title: value.title,
          description: value.description,
        });
        toast.add({
          type: "success",
          description: "Project details updated.",
        });
      } catch (error) {
        console.log(error);
        toast.add({
          type: "error",
          description:
            error instanceof Error
              ? error.message
              : "Failed to update the project.",
        });
      } finally {
        setIsUpdating(false);
      }
    },
  });

  return (
    <Card className="w-full sm:max-w-lg">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Edit project details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="project-edit-form"
          onSubmit={(e) => {
            e.preventDefault();
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
                    <FieldLabel htmlFor={field.name}>Project name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter project name"
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
                    <InputGroup>
                      <InputGroupTextarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Describe your project (optional)"
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={isInvalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.state.value.length}/500 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="project-edit-form" disabled={isUpdating}>
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default ProjectEditForm;
