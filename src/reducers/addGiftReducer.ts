import { Gift } from "../types/types";
import { GiftDetailsFormSchemaProps } from "../validations/giftDetails";
import { GiftFormTypeEnum } from "../validations/giftForm";
import { GiftImagesFormSchemaProps } from "../validations/giftImages";
import { GiftOccasionFormSchemaProps } from "../validations/giftOccasion";
import { GiftPriceFormSchemaProps } from "../validations/giftPrice";
import { GiftUrlFormSchemaProps } from "../validations/giftUrl";

export type AddGiftData = Omit<Gift, "id">;

export type AddGiftFormFields =
  | GiftDetailsFormSchemaProps
  | GiftPriceFormSchemaProps
  | GiftOccasionFormSchemaProps
  | GiftUrlFormSchemaProps
  | GiftImagesFormSchemaProps;

export interface AddGiftState {
  formData: AddGiftData;
  isFormValid: boolean;
  isStepsValid: boolean[];
}

export const initialState: AddGiftState = {
  formData: {
    gift: "",
    description: "",
    price: {
      min: undefined,
      max: undefined,
    },
    url: "",
    occasion: [],
    images: [],
    reviews: [],
  },
  isFormValid: false,
  isStepsValid: [false, false, false, false, false],
};

export type AddGiftAction =
  | {
      type: "UPDATE_FORM_DATA";
      payload: AddGiftFormFields;
      formType: GiftFormTypeEnum;
    }
  | {
      type: "INVALIDATE_FORM";
      payload: boolean;
    }
  | {
      type: "SUBMIT_FORM";
      payload: AddGiftFormFields;
    };

export function addGiftReducer(state: AddGiftState, action: AddGiftAction): AddGiftState {
  switch (action.type) {
    case "UPDATE_FORM_DATA":
      const formType = action.formType;
      const formTypes: GiftFormTypeEnum[] = Object.values(GiftFormTypeEnum) as GiftFormTypeEnum[];

      const isStepsValid = state.isStepsValid;

      const updatedIsStepsValid = isStepsValid.map((field, index) =>
        index === formTypes.indexOf(formType) ? true : field
      );
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
        isStepsValid: updatedIsStepsValid,
      };
    case "INVALIDATE_FORM":
      return { ...state, isFormValid: action.payload };
    case "SUBMIT_FORM":
      const formData = { ...state.formData, ...action.payload };

      const filteredImages: string[] = formData.images.filter((img) => img);
      const filteredOccasion: string[] = formData.occasion.filter((occ) => occ);

      const filteredFormData: AddGiftData = {
        ...formData,
        images: filteredImages,
        occasion: filteredOccasion,
      };

      return { ...state, formData: filteredFormData, isFormValid: true };
    default:
      return state;
  }
}
