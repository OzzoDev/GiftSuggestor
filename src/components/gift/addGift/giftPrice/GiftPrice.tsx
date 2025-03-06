import { useFormContext, Controller } from "react-hook-form";
import { GiftFormSchemaProps } from "../../../../validations/giftForm";
import FormInput from "../../../common/FormInput";

export default function GiftPrice() {
  const {
    control,
    formState: { errors: inputErrors },
  } = useFormContext<GiftFormSchemaProps>();

  const minPriceError = (inputErrors as { giftPrice?: { price?: { min?: { message: string } } } })
    ?.giftPrice?.price?.min?.message;

  const maxPriceError = (inputErrors as { giftPrice?: { price?: { max?: { message: string } } } })
    ?.giftPrice?.price?.max?.message;

  return (
    <div className="flex flex-col gap-y-20">
      <Controller
        name="giftPrice.price.min"
        control={control}
        defaultValue={10}
        render={({ field }) => (
          <FormInput
            label="Minimum price of gift"
            type="number"
            value={field.value}
            placeholder="Enter minimum price"
            min={1}
            errorMessage={minPriceError}
            onChange={field.onChange}>
            <p className="text-sm text-gray-600">
              Prices are displayed in US Dollars (USD). Please ensure you are aware of the exchange
              rates if using a different currency.
            </p>
          </FormInput>
        )}
      />
      <Controller
        name="giftPrice.price.max"
        control={control}
        defaultValue={20}
        render={({ field }) => (
          <FormInput
            label="Maximum price of gift"
            type="number"
            value={String(field.value)}
            placeholder="Enter maximum"
            min={2}
            errorMessage={maxPriceError}
            onChange={field.onChange}>
            <p className="text-sm text-gray-600">
              Prices are displayed in US Dollars (USD). Please ensure you are aware of the exchange
              rates if using a different currency.
            </p>
          </FormInput>
        )}
      />
    </div>
  );
}
