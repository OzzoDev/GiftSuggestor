import { ReactNode } from "react";
import { AddGiftAction, AddGiftState } from "../../../reducers/addGiftReducer";
import AddGiftFormStepper from "./AddGiftFormStepper";
import GhostBtn from "../../btn/GhostBtn";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

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
  const handlePrev = (): void => {
    addGiftAction({ type: "PREV_STEP" });
  };

  return (
    <div className="flex flex-col items-center gap-y-24 w-full">
      <AddGiftFormStepper currentFormStep={addGiftState.formStep} addGiftAction={addGiftAction} />
      {children}
      <div className="flex justify-between mx-2 w-full">
        <span>
          <GhostBtn onClick={handlePrev}>
            <IoIosArrowRoundBack size={24} />
            <span>Previous</span>
          </GhostBtn>
        </span>
        <span>
          <GhostBtn type="submit">
            <span>Next</span>
            <IoIosArrowRoundForward size={24} />
          </GhostBtn>
        </span>
      </div>
    </div>
  );
}
