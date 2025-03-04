import { z } from "zod";
import { giftImagesSchema } from "./giftImages";
import { giftOccasionSchema } from "./giftOccasion";
import { giftPriceSchema } from "./giftPrice";
import { giftUrlSchema } from "./giftUrl";
import { giftDetailsSchema } from "./giftDetails";

export enum GiftFormTypeEnum {
  GiftDetails = "giftDetails",
  GiftPrice = "giftPrice",
  GiftOccasion = "giftOccasion",
  GiftUrl = "giftUrl",
  GiftImages = "giftImages",
}

export const giftFormSchema = z.discriminatedUnion("formType", [
  z.object({
    formType: z.literal(GiftFormTypeEnum.GiftDetails),
    giftDetails: giftDetailsSchema,
  }),
  z.object({
    formType: z.literal(GiftFormTypeEnum.GiftPrice),
    giftPrice: giftPriceSchema,
  }),
  z.object({
    formType: z.literal(GiftFormTypeEnum.GiftOccasion),
    giftOccasion: giftOccasionSchema,
  }),
  z.object({
    formType: z.literal(GiftFormTypeEnum.GiftUrl),
    giftUrl: giftUrlSchema,
  }),
  z.object({
    formType: z.literal(GiftFormTypeEnum.GiftImages),
    giftImages: giftImagesSchema,
  }),
]);

export type GiftFormSchemaProps = z.infer<typeof giftFormSchema>;
