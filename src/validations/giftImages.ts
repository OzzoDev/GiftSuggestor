import { z } from "zod";

export const giftImagesSchema = z.object({
  images: z.array(z.string()).min(2, "At least 2 images is required"),
});

export type GiftImagesFormSchemaProps = z.infer<typeof giftImagesSchema>;

export const validateUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateImage = async (imageUrl: string): Promise<boolean> => {
  return await new Promise((resolve) => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};
