import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { GiftReviewFormSchemaProps, giftReviewSchema } from "../../../../validations/giftReview";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../common/FormInput";
import GhostBtn from "../../../btn/GhostBtn";
import GiftRating from "./GiftRating";
import { Gift } from "../../../../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGiftReview } from "../../../../api/api";
import { useState } from "react";
import Toast from "../../../common/Toast";

interface AddReviwFormProps {
  gift: Gift;
}

export default function AddReviewForm({ gift }: AddReviwFormProps) {
  const queryClient = useQueryClient();
  const formMethods = useForm<GiftReviewFormSchemaProps>({
    resolver: zodResolver(giftReviewSchema),
    defaultValues: {
      review: "",
      rating: 0,
    },
  });
  const [toastMessage, setToastMessage] = useState<string>("");

  const {
    control,
    setValue,
    watch,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = formMethods;

  const mutation = useMutation({
    mutationFn: addGiftReview,
    onSuccess: () => {
      reset();
      setToastMessage("Review added successfully");
      queryClient.invalidateQueries({ queryKey: ["gift", gift.id] });
    },
    onError: () => {
      setToastMessage("Error adding review");
    },
  });

  const setRating = (rating: number): void => {
    clearErrors("rating");
    setValue("rating", rating);
  };

  const rating = watch("rating");

  const onSubmit: SubmitHandler<GiftReviewFormSchemaProps> = async (data) => {
    const updatedGift: Gift = { ...gift, reviews: [...gift.reviews, data] };
    mutation.mutate(updatedGift);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-8 w-[90%] max-w-[700px]">
        <Controller
          control={control}
          name="review"
          defaultValue=""
          render={({ field }) => (
            <FormInput
              label="Review"
              value={field.value}
              minLength={10}
              maxLength={30}
              placeholder="Enter review"
              errorMessage={errors.review?.message}
              onChange={field.onChange}
            />
          )}
        />
        <div className="flex justify-between items-end w-full">
          <GiftRating rating={rating} errorMessage={errors.rating?.message} setRating={setRating} />
          <div className="mb-4">
            <GhostBtn type="submit">
              <span>{isSubmitting ? "Submitting..." : "Add Gift"}</span>
            </GhostBtn>
          </div>
        </div>
      </form>
      <Toast message={toastMessage} show={!!toastMessage} onClose={() => setToastMessage("")} />
    </>
  );
}
