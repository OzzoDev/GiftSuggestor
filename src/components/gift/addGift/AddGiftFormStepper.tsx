import { ReactNode } from "react";
import {
  AddGiftAction,
  AddGiftFormSteps,
  AddGiftState,
  NUM_FORM_STEPS,
} from "../../../reducers/addGiftReducer";
import { IoCloseOutline } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
import { MdOutlineCircle } from "react-icons/md";

interface AddGiftFormStepperProps {
  currentFormStep: AddGiftFormSteps;
  addGiftState: AddGiftState;
  addGiftAction: React.ActionDispatch<[action: AddGiftAction]>;
  onSubmit: () => void;
}

export default function AddGiftFormStepper({
  currentFormStep,
  addGiftState,
  addGiftAction,
  onSubmit,
}: AddGiftFormStepperProps) {
  const handleStep = (step: number): void => {
    onSubmit();
    addGiftAction({ type: "STEP", payload: step });
  };

  const isFormStepsFilled = addGiftState.isFormStepsFilled;

  const isStepFilled = (index: number): boolean => isFormStepsFilled[index];
  const isCurrentStep = (index: number): boolean => index === currentFormStep - 1;

  const stepIcon = (index: number): ReactNode => {
    return isStepFilled(index) ? (
      <IoCheckmarkOutline size={24} color="green" />
    ) : isCurrentStep(index) ? (
      <MdOutlineCircle size={24} color="grey" />
    ) : (
      <IoCloseOutline size={24} color="red" />
    );
  };

  const stepColor = (index: number): string => {
    return isStepFilled(index) ? "green-500" : isCurrentStep(index) ? "gray-600" : "red-500";
  };

  return (
    <ul className="flex gap-6 sm:gap-2">
      {Array.from({ length: NUM_FORM_STEPS }, (_, index) => {
        const color = stepColor(index);
        return (
          <li key={index} className="flex items-end gap-4">
            <div className="flex flex-col items-center gap-2">
              <span>{stepIcon(index)}</span>
              <button
                type="button"
                onClick={() => handleStep(index + 1)}
                className={`relative py-2 px-4 border-2 rounded-full outline-none cursor-pointer transition-all duration-300 ease border-${color}`}>
                <span>{index + 1}</span>
              </button>
            </div>
            {index < NUM_FORM_STEPS - 1 && (
              <div
                className={`hidden sm:block mb-5 mr-2 h-[2px] w-16 transition-all duration-300 ease bg-${color}`}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
