import { z } from "zod";

export const giftImagesSchema = z.object({
  images: z
    .array(z.string().nonempty("Image is required").url("Invalid URL format"))
    .min(2, "At least 2 images is required"),
});

export type GiftImagesFormSchemaProps = z.infer<typeof giftImagesSchema>;
