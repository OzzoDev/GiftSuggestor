import { z } from "zod";

export const giftUrlSchema = z.object({
  url: z.string().nonempty("Url is required").url("Invalid URL format"),
});

export type GiftUrlFormSchemaProps = z.infer<typeof giftUrlSchema>;
