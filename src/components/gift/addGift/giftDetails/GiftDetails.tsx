import { Controller, useFormContext } from "react-hook-form";
import AddGiftInput from "../AddGiftInput";
import { GiftFormSchemaProps } from "../../../../validations/giftForm";

export default function GiftDetails() {
  const {
    control,
    formState: { errors: inputErrors },
  } = useFormContext<GiftFormSchemaProps>();

  const giftError = (inputErrors as { giftDetails?: { gift?: { message: string } } })?.giftDetails
    ?.gift?.message;

  const descriptionError = (inputErrors as { giftDetails?: { description?: { message: string } } })
    ?.giftDetails?.description?.message;

  return (
    <div className="flex flex-col gap-y-20">
      <Controller
        name="giftDetails.gift"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <AddGiftInput
            label="Gift name"
            value={field.value}
            placeholder="Enter name of gift"
            errorMessage={giftError}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="giftDetails.description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <AddGiftInput
            label="Gift description"
            value={String(field.value)}
            placeholder="Enter gift description"
            minLength={15}
            maxLength={50}
            errorMessage={descriptionError}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}
