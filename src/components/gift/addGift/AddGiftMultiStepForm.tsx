import { useReducer } from "react";
import { addGiftReducer, initialState } from "../../../reducers/addGiftReducer";
import AddGiftForm from "./AddGiftForm";
import AddGiftFormControls from "./AddGiftFormControls";

export default function AddGiftMultiStepForm() {
  const [state, dispatch] = useReducer(addGiftReducer, initialState);

  return (
    <div>
      <AddGiftFormControls addGiftState={state} addGiftAction={dispatch}>
        <form>
          <AddGiftForm currentFormStep={state.formStep} />
        </form>
      </AddGiftFormControls>
    </div>
  );
}
