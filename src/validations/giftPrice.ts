import { z } from "zod";

export const giftPriceSchema = z.object({
  price: z
    .object({
      min: z.number().min(1, "Minimum price must be at least 0"),
      max: z.number().min(2, "Maximum price must be greater than minimum price"),
    })
    .refine((data) => data.max > data.min, {
      message: "Maximum price should be greater than minimum price",
      path: ["max"],
    }),
});

export type GiftPriceFormSchemaProps = z.infer<typeof giftPriceSchema>;
