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

export type FormStepFields =
  | FormFieldsStepOne
  | FormFieldsStepTwo
  | FormFieldsStepThree
  | FormFieldsStepFour
  | FormFieldsStepFive;

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

// export type AddGiftFieldName =
//   | keyof FormFieldsStepOne
//   | keyof FormFieldsStepFour
//   | `price.${keyof GiftPrice}`
//   | `occasion.${number}`
//   | `images.${number}`;

export type AddGiftFieldName =
  | keyof Omit<AddGiftFormFields, "price" | "occasion" | "images" | "id">
  | `price.${keyof GiftPrice}`
  | `occasion.${number}`
  | `images.${number}`;

export interface AddGiftState {
  formStep: AddGiftFormSteps;
  isFormStepsFilled: boolean[];
  formData: AddGiftFormFields;
}

export const initialState: AddGiftState = {
  formStep: 1,
  isFormStepsFilled: new Array(5).fill(false),
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
      payload: FormStepFields;
      shouldStepNext: boolean;
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
      const step = state.formStep;
      const nextStep = getNextStep(step);

      const isFormStepsFilled = state.isFormStepsFilled.map((formStep, index) =>
        index === step - 1 ? true : formStep
      );

      return {
        ...state,
        formStep: action.shouldStepNext ? nextStep : step,
        isFormStepsFilled,
        formData: { ...state.formData, ...action.payload },
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}
