import * as z from "zod";

export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
];

export const uploadVersionSchema = z.object({
  type: z.enum(["milestone", "revision"]),
  title: z.string().trim().min(1, "Version title is required."),
  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 100 characters."),
  file: z
    .custom<File | undefined>(
      (value) => typeof File !== "undefined" && value instanceof File,
      "Please select an image.",
    )
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "Images must be smaller than 10 MB.",
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Please select a PNG, JPEG, WEBP, or GIF image.",
    ),
});

export const editVersionSchema = z.object({
  title: uploadVersionSchema.shape.title,
  description: uploadVersionSchema.shape.description,
  file: z
    .custom<File | undefined>(
      (value) =>
        value === undefined ||
        (typeof File !== "undefined" && value instanceof File),
      "Please select an image.",
    )
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "Images must be smaller than 10 MB.",
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Please select a PNG, JPEG, WEBP, or GIF image.",
    ),
});
