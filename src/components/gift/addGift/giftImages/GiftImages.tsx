import { useFormContext, Controller } from "react-hook-form";
import { GiftFormSchemaProps } from "../../../../validations/giftForm";
import AddGiftInput from "../AddGiftInput";
import { useState } from "react";
import { PuffLoader } from "react-spinners";
import { validateImage, validateUrl } from "../../../../validations/giftImages";

export default function GiftImages() {
  const {
    control,
    setError,
    clearErrors,
    formState: { errors: inputErrors },
  } = useFormContext<GiftFormSchemaProps>();

  const [isValidating, setIsValidating] = useState<boolean>(false);

  const firstImageError = (
    inputErrors as {
      giftImages?: { images?: { 0?: { message: string } } };
    }
  )?.giftImages?.images?.[0]?.message;

  const secondImageError = (
    inputErrors as {
      giftImages?: { images?: { 1?: { message: string } } };
    }
  )?.giftImages?.images?.[1]?.message;

  const validateImages = async (imageUrl: string, index: number): Promise<void> => {
    if (!imageUrl) return;

    setIsValidating(true);

    const isValid = validateUrl(imageUrl);

    if (!isValid) {
      setError(`giftImages.images.${index}`, {
        type: "manual",
        message: "Invalid image URL",
      });
      setIsValidating(false);
      return;
    }

    const isValidImage = await validateImage(imageUrl);

    if (isValidImage) {
      clearErrors(`giftImages.images.${index}`);
    } else {
      setError(`giftImages.images.${index}`, {
        type: "manual",
        message: "Invalid image URL",
      });
    }

    setIsValidating(false);
  };

  if (isValidating) {
    return (
      <PuffLoader
        size={50}
        className="absoulte top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    );
  }

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-x-12">
      <Controller
        name="giftImages.images.0"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <AddGiftInput
            label="Image 1"
            value={field.value || ""}
            placeholder="Enter first image as a url"
            errorMessage={firstImageError}
            onChange={field.onChange}
            onBlur={() => validateImages(field.value || "", 0)}
          />
        )}
      />
      <Controller
        name="giftImages.images.1"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <AddGiftInput
            label="Image 2"
            value={field.value || ""}
            placeholder="Enter second image as a url"
            errorMessage={secondImageError}
            onChange={field.onChange}
            onBlur={() => validateImages(field.value || "", 1)}
          />
        )}
      />
      <Controller
        name="giftImages.images.2"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <AddGiftInput
            label="Image 3"
            value={field.value || ""}
            placeholder="Enter third image as a url"
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="giftImages.images.3"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <AddGiftInput
            label="Image 4"
            value={field.value || ""}
            placeholder="Enter fourth image as a url"
            onChange={field.onChange}
          />
        )}
      />
      <span className="col-span-2">
        <Controller
          name="giftImages.images.4"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <AddGiftInput
              label="Image 5"
              value={field.value || ""}
              placeholder="Enter fifth image as a url"
              onChange={field.onChange}
            />
          )}
        />
      </span>
    </div>
  );
}
