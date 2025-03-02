import { useReducer } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddGiftFormFields, addGiftReducer, initialState } from "../../../reducers/addGiftReducer";
import AddGiftForm from "./AddGiftForm";
import AddGiftFormControls from "./AddGiftFormControls";

export default function AddGiftMultiStepForm() {
  const [state, dispatch] = useReducer(addGiftReducer, initialState);
  const { register, handleSubmit, setValue, getValues } = useForm<AddGiftFormFields>();

  const onSubmit: SubmitHandler<AddGiftFormFields> = (data) => {
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { ...data },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] max-w-[520px]">
        <AddGiftFormControls addGiftState={state} addGiftAction={dispatch}>
          <AddGiftForm
            currentFormStep={state.formStep}
            formValues={getValues}
            register={register}
            setFormValue={setValue}
          />
        </AddGiftFormControls>
      </form>
    </div>
  );
}
