import { useFormContext, Controller } from "react-hook-form";
import { GiftFormSchemaProps } from "../../../../validations/giftForm";
import AddGiftInput from "../AddGiftInput";

export default function GiftUrl() {
  const {
    control,
    formState: { errors: inputErrors },
  } = useFormContext<GiftFormSchemaProps>();

  const urlError = (inputErrors as { giftUrl?: { url?: { message: string } } })?.giftUrl?.url
    ?.message;

  return (
    <div className="flex items-center h-full">
      <Controller
        name="giftUrl.url"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <AddGiftInput
            label="Gift url"
            type="url"
            value={field.value}
            placeholder="Enter name of gift"
            errorMessage={urlError}
            onChange={field.onChange}>
            <p>
              Kindly provide a link to a webshop where you can purchase the gift you wish to add.
              This will serve as a reference for the gift and provide a convenient location for its
              purchase.
            </p>
          </AddGiftInput>
        )}
      />
    </div>
  );
}
