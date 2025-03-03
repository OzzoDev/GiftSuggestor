import { UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { AddGiftFormFields, AddGiftFormSteps } from "../../../reducers/addGiftReducer";
import AddGiftFormInput from "./AddGiftFormInput";

interface AddGiftFormProps {
  currentFormStep: AddGiftFormSteps;
  formValues: UseFormGetValues<AddGiftFormFields>;
  register: UseFormRegister<AddGiftFormFields>;
  setFormValue: UseFormSetValue<AddGiftFormFields>;
}

export default function AddGiftForm({
  currentFormStep,
  formValues,
  register,
  setFormValue,
}: AddGiftFormProps) {
  switch (currentFormStep) {
    case 1:
      return (
        <div className="flex flex-col gap-y-16 w-full">
          <AddGiftFormInput
            name="gift"
            placeholder="Enter name of gift"
            label="Gift"
            formValues={formValues}
            register={register}
            setFormValue={setFormValue}
          />
          <AddGiftFormInput
            name="description"
            placeholder="Describe gift"
            label="Description"
            minLength={15}
            maxLength={30}
            formValues={formValues}
            register={register}
            setFormValue={setFormValue}
          />
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col gap-y-16 w-full">
          <AddGiftFormInput
            type="number"
            name="price.min"
            placeholder="Enter minimum price of gift"
            label="Min price"
            formValues={formValues}
            register={register}
            setFormValue={setFormValue}>
            <p className="text-sm text-gray-600">
              All prices are displayed in US Dollars (USD). Please ensure you are aware of the
              exchange rates if using a different currency.
            </p>
          </AddGiftFormInput>
          <AddGiftFormInput
            type="number"
            name="price.max"
            placeholder="Enter maximum price of gift"
            label="Max price"
            formValues={formValues}
            register={register}
            setFormValue={setFormValue}>
            <p className="text-sm text-gray-600">
              All prices are displayed in US Dollars (USD). Please ensure you are aware of the
              exchange rates if using a different currency.
            </p>
          </AddGiftFormInput>
        </div>
      );
    case 3:
      return (
        <div className="flex flex-col gap-y-16 w-full">
          <AddGiftFormInput
            name="occasion.0"
            placeholder="Enter most suitable occasion for giving the gift"
            label="Occasion 1"
            formValues={formValues}
            register={register}
            setFormValue={setFormValue}
          />
          <AddGiftFormInput
            name="occasion.1"
            placeholder="Enter second most suitable occasion for giving the gift"
            label="Occasion 2"
            formValues={formValues}
            register={register}
            setFormValue={setFormValue}
          />
          <AddGiftFormInput
            name="occasion.2"
            placeholder="Enter thrid most suitable occasion for giving the gift"
            label="Occasion 3"
            formValues={formValues}
            register={register}
            setFormValue={setFormValue}
          />
        </div>
      );
    case 4:
      return <p>Step 4</p>;
    case 5:
      return <p>Step 5</p>;
  }
}
