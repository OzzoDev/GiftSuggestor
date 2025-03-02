import { ReactNode } from "react";
import { AddGiftAction, AddGiftState } from "../../../reducers/addGiftReducer";
import AddGiftFormStepper from "./AddGiftFormStepper";

interface AddGiftFormControlsProps {
  addGiftState: AddGiftState;
  addGiftAction: React.ActionDispatch<[action: AddGiftAction]>;
  children: ReactNode;
}

export default function AddGiftFormControls({
  addGiftState,
  addGiftAction,
  children,
}: AddGiftFormControlsProps) {
  const handleNext = (): void => {
    addGiftAction({ type: "NEXT_STEP" });
  };

  const handlePrev = (): void => {
    addGiftAction({ type: "PREV_STEP" });
  };

  return (
    <div>
      <AddGiftFormStepper currentFormStep={addGiftState.formStep} addGiftAction={addGiftAction} />
      {children}
      <div className="flex gap-x-6">
        <button onClick={handleNext}>Next</button>
        <button onClick={handlePrev}>Prev</button>
      </div>
    </div>
  );
}
