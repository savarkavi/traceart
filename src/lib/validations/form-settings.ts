import * as z from "zod";

export const projectSettingsSchema = z.object({
  title: z.string().trim().min(1, "Project name is required."),
  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 100 characters."),
});

export type ProjectSettingsInput = z.infer<typeof projectSettingsSchema>;
