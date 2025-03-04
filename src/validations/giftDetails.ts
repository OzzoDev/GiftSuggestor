import { z } from "zod";

export const giftDetailsSchema = z.object({
  gift: z.string().nonempty("Gift name is required"),
  description: z
    .string()
    .min(15, "Description must be at least 15 characters")
    .max(30, "Description must not be longer than 30 characters"),
});

export type GiftDetailsFormSchemaProps = z.infer<typeof giftDetailsSchema>;
