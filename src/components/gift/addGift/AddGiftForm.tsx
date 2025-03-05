import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { IoIosArrowRoundBack, IoMdCheckmark, IoIosArrowRoundForward } from "react-icons/io";
import GhostBtn from "../../btn/GhostBtn";
import PrimaryBtn from "../../btn/PrimaryBtn";
import {
  giftFormSchema,
  GiftFormSchemaProps,
  GiftFormTypeEnum,
} from "../../../validations/giftForm";
import GiftDetails from "./giftDetails/GiftDetails";
import GiftPrice from "./giftPrice/GiftPrice";
import GiftOccasion from "./giftOccasion/GiftOccasion";
import GiftUrl from "./giftUrl/GiftUrl";
import GiftImages from "./giftImages/GiftImages";
import { useEffect, useReducer } from "react";
import { AddGiftFormFields, addGiftReducer, initialState } from "../../../reducers/addGiftReducer";
import { validateImage } from "../../../validations/giftImages";
import { PuffLoader } from "react-spinners";

export default function AddGiftForm() {
  const [formState, dispatchFormAction] = useReducer(addGiftReducer, initialState);
  const formMethods = useForm<GiftFormSchemaProps>({
    resolver: zodResolver(giftFormSchema),
    defaultValues: {
      formType: GiftFormTypeEnum.GiftDetails,
    },
  });
  const {
    watch,
    getValues,
    setError,
    formState: { isSubmitting },
    handleSubmit,
  } = formMethods;

  useEffect(() => {
    if (formState.isFormValid) {
      console.log("Form validated successfully, formData: ", formState.formData);
    }
  }, [formState]);

  const formType = watch("formType");
  const formTypeIsGiftDetails = formType === "giftDetails";
  const formTypeIsGiftPrice = formType === "giftPrice";
  const formTypeIsGiftOccasion = formType === "giftOccasion";
  const formTypeIsGiftUrl = formType === "giftUrl";
  const formTypeIsGiftImages = formType === "giftImages";

  const setFormType = (formType: GiftFormTypeEnum): void => {
    formMethods.setValue("formType", formType);
  };

  const getFormFieldValues = (): AddGiftFormFields => {
    const { formType, ...formData } = getValues();
    return formData[formType as keyof typeof formData] as AddGiftFormFields;
  };

  const handleNextFormType = async (): Promise<void> => {
    const data = getFormFieldValues();

    switch (formType) {
      case "giftDetails":
        setFormType(GiftFormTypeEnum.GiftPrice);
        dispatchFormAction({ type: "UPDATE_FORM_DATA", payload: data });
        break;
      case "giftPrice":
        setFormType(GiftFormTypeEnum.GiftOccasion);
        dispatchFormAction({ type: "UPDATE_FORM_DATA", payload: data });
        break;
      case "giftOccasion":
        setFormType(GiftFormTypeEnum.GiftUrl);
        dispatchFormAction({ type: "UPDATE_FORM_DATA", payload: data });
        break;
      case "giftUrl":
        setFormType(GiftFormTypeEnum.GiftImages);
        dispatchFormAction({ type: "UPDATE_FORM_DATA", payload: data });
        break;
      case "giftImages":
        const images = (
          data as {
            images?: string[];
          }
        )?.images;

        const validatedImages =
          images?.map((img) => (img !== "" ? validateImage(img) : null)) || [];
        const resolvedValidatedImages = await Promise.all(validatedImages);

        resolvedValidatedImages.forEach((img, index) => {
          if (index < 2 && img === null) {
            setError(`giftImages.images.${index}`, {
              type: "manual",
              message: "Images is required",
            });
          } else if (img === false) {
            setError(`giftImages.images.${index}`, {
              type: "manual",
              message: "Invalid image URL",
            });
          }
        });

        const minimumValidImages =
          !resolvedValidatedImages.some((img) => img === false) &&
          resolvedValidatedImages.filter((img) => img).length >= 2;

        if (!minimumValidImages) {
          dispatchFormAction({ type: "INVALIDATE_FORM", payload: false });
          return;
        }

        dispatchFormAction({ type: "SUBMIT_FORM", payload: data });
        break;
    }
  };

  const handlePrevFormType = (): void => {
    switch (formType) {
      case "giftDetails":
        console.log("Start of form with first type");
        break;
      case "giftPrice":
        setFormType(GiftFormTypeEnum.GiftDetails);
        break;
      case "giftOccasion":
        setFormType(GiftFormTypeEnum.GiftPrice);
        break;
      case "giftUrl":
        setFormType(GiftFormTypeEnum.GiftOccasion);
        break;
      case "giftImages":
        setFormType(GiftFormTypeEnum.GiftUrl);
        break;
    }
  };

  return (
    <FormProvider {...formMethods}>
      <div className="relative flex justify-center items-center min-h-screen">
        {isSubmitting ? (
          <PuffLoader size={50} className="" />
        ) : (
          <form
            onSubmit={handleSubmit(handleNextFormType)}
            className="relative flex flex-col justify-between h-[600px] w-[90%] max-w-[600px]">
            {formTypeIsGiftDetails && <GiftDetails />}
            {formTypeIsGiftPrice && <GiftPrice />}
            {formTypeIsGiftOccasion && <GiftOccasion />}
            {formTypeIsGiftUrl && <GiftUrl />}
            {formTypeIsGiftImages && <GiftImages />}
            <div className="flex justify-between w-full">
              <span>
                <GhostBtn onClick={handlePrevFormType}>
                  <IoIosArrowRoundBack size={24} />
                  <span>Previous</span>
                </GhostBtn>
              </span>
              <span>
                {formTypeIsGiftImages ? (
                  <PrimaryBtn type="submit">
                    <span>Add Gift</span>
                    <IoMdCheckmark size={24} />
                  </PrimaryBtn>
                ) : (
                  <GhostBtn type="submit">
                    <span>Next</span>
                    <IoIosArrowRoundForward size={24} />
                  </GhostBtn>
                )}
              </span>
            </div>
          </form>
        )}
      </div>
    </FormProvider>
  );
}
