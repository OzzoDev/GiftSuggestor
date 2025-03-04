import { useFormContext, Controller } from "react-hook-form";
import { GiftFormSchemaProps } from "../../../../validations/giftForm";
import AddGiftInput from "../AddGiftInput";

export default function GiftOccasion() {
  const {
    control,
    formState: { errors: inputErrors },
  } = useFormContext<GiftFormSchemaProps>();

  const firstOccasionError = (
    inputErrors as {
      giftOccasion?: { occasion?: { 0?: { message: string } } };
    }
  )?.giftOccasion?.occasion?.[0]?.message;

  return (
    <div>
      <Controller
        name="giftOccasion.occasion.0"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <AddGiftInput
            label="Occasion 1"
            value={field.value}
            placeholder="Enter first occasion"
            errorMessage={firstOccasionError}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="giftOccasion.occasion.1"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <AddGiftInput
            label="Occasion 2"
            value={field.value}
            placeholder="Enter second occasion"
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="giftOccasion.occasion.2"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <AddGiftInput
            label="Occasion 3"
            value={field.value}
            placeholder="Enter thrid occasion"
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}
