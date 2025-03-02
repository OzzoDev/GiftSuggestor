import { BuildUnion, Gift, GiftPrice } from "../types/types";

export type AddGiftFormSteps = BuildUnion<6>;

export type FormFieldsStepOne = {
  gift: string;
  description: string;
};

export type FormFieldsStepTwo = {
  price: GiftPrice;
};

export type FormFieldsStepThree = {
  occassion: string[];
};

export type FormFieldsStepFour = {
  url: string;
};

export type FormFieldsStepFive = {
  images: string[];
};

export const NUM_FORM_STEPS: AddGiftFormSteps = 5;

function getStep(currentStep: AddGiftFormSteps, step: number): AddGiftFormSteps {
  return (step <= NUM_FORM_STEPS && step > 0 ? step : currentStep) as AddGiftFormSteps;
}

function getNextStep(currentStep: AddGiftFormSteps): AddGiftFormSteps {
  return (currentStep < NUM_FORM_STEPS ? currentStep + 1 : currentStep) as AddGiftFormSteps;
}

function getPrevStep(currentStep: AddGiftFormSteps): AddGiftFormSteps {
  return (currentStep > 1 ? currentStep - 1 : currentStep) as AddGiftFormSteps;
}

export type AddGiftFormFields = Omit<Gift, "reviews">;

export type AddGiftFieldName =
  | keyof Omit<AddGiftFormFields, "price" | "occasion" | "images">
  | `price.${keyof GiftPrice}`
  | `occasion.${number}`
  | `images.${number}`;

export interface AddGiftState {
  formStep: AddGiftFormSteps;
  formData: AddGiftFormFields;
}

export const initialState: AddGiftState = {
  formStep: 1,
  formData: {
    id: "",
    gift: "",
    description: "",
    url: "",
    price: {
      min: undefined,
      max: undefined,
    },
    occasion: [],
    images: [],
  },
};

export type AddGiftAction =
  | { type: "STEP"; payload: number }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | {
      type: "UPDATE_FORM_DATA";
      payload:
        | FormFieldsStepOne
        | FormFieldsStepTwo
        | FormFieldsStepThree
        | FormFieldsStepFour
        | FormFieldsStepFive;
    }
  | { type: "RESET_FORM" };

export function addGiftReducer(state: AddGiftState, action: AddGiftAction): AddGiftState {
  switch (action.type) {
    case "STEP":
      return { ...state, formStep: getStep(state.formStep, action.payload) };
    case "NEXT_STEP":
      return { ...state, formStep: getNextStep(state.formStep) };
    case "PREV_STEP":
      return { ...state, formStep: getPrevStep(state.formStep) };
    case "UPDATE_FORM_DATA":
      return {
        ...state,
        formStep: getNextStep(state.formStep),
        formData: { ...state.formData, ...action.payload },
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}
