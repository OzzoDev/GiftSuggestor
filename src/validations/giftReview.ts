import { z } from "zod";

export const giftReviewSchema = z.object({
  review: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(30, "Review must be no longer than 10 characters"),
  rating: z.number().min(1, "Rating is required. Click to selcted").max(5),
});

export type GiftReviewFormSchemaProps = z.infer<typeof giftReviewSchema>;
