import { ReactNode } from "react";
import { AddGiftAction, AddGiftState, NUM_FORM_STEPS } from "../../../reducers/addGiftReducer";
import AddGiftFormStepper from "./AddGiftFormStepper";
import GhostBtn from "../../btn/GhostBtn";
import { IoIosArrowRoundBack, IoIosArrowRoundForward, IoMdCheckmark } from "react-icons/io";
import PrimaryBtn from "../../btn/PrimaryBtn";

interface AddGiftFormControlsProps {
  addGiftState: AddGiftState;
  addGiftAction: React.ActionDispatch<[action: AddGiftAction]>;
  onSubmit: () => void;
  children: ReactNode;
}

export default function AddGiftFormControls({
  addGiftState,
  addGiftAction,
  onSubmit,
  children,
}: AddGiftFormControlsProps) {
  const handlePrev = (): void => {
    addGiftAction({ type: "PREV_STEP" });
  };

  const isAllFormStepsFilled = addGiftState.isFormStepsFilled.every((formStep) => formStep);

  return (
    <div className="flex flex-col justify-between items-center gap-y-24 w-full h-[680px]">
      <AddGiftFormStepper
        currentFormStep={addGiftState.formStep}
        addGiftState={addGiftState}
        addGiftAction={addGiftAction}
        onSubmit={onSubmit}
      />
      {children}
      {/* <div className="flex justify-between mx-2 w-full">
        <span>
          <GhostBtn onClick={handlePrev}>
            <IoIosArrowRoundBack size={24} />
            <span>Previous</span>
          </GhostBtn>
        </span>
        <span>
          {addGiftState.formStep === NUM_FORM_STEPS ? (
            isAllFormStepsFilled && (
              <PrimaryBtn type="submit">
                <span>Add Gift</span>
                <IoMdCheckmark size={24} />
              </PrimaryBtn>
            )
          ) : (
            <GhostBtn type="submit">
              <span>Next</span>
              <IoIosArrowRoundForward size={24} />
            </GhostBtn>
          )}
        </span>
      </div> */}
    </div>
  );
}
