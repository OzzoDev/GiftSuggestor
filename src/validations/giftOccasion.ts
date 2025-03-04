import { z } from "zod";

export const giftOccasionSchema = z.object({
  occasion: z
    .array(z.string())
    .min(1)
    .refine((data) => data.length > 0 && data.some((item) => item.trim() !== ""), {
      message: "At least one occasion is required",
      path: [0],
    }),
});

export type GiftOccasionFormSchemaProps = z.infer<typeof giftOccasionSchema>;
