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
import { validateImage, validateUrl } from "../../../validations/giftImages";
import { PuffLoader } from "react-spinners";
import { useAddGiftContext } from "../../../hooks/contexts/useAddGiftContext";
import AddGiftFormStepper from "./AddGiftFormStepper";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { addGift } from "../../../api/api";

export default function AddGiftForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formState, dispatchFormAction] = useReducer(addGiftReducer, initialState);
  const { setState: setAddGiftState } = useAddGiftContext();

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
    formState: { isSubmitting, errors },
    handleSubmit,
  } = formMethods;

  useEffect(() => {
    if (formState.isFormValid) {
      const data = formState.formData;
      mutation.mutate(data);
      console.log("Form validated successfully, formData: ", formState.formData);
    }
  }, [formState]);

  const watchedImages = watch("giftImages.images", ["", "", "", "", ""]);

  useEffect(() => {
    (async () => {
      const validUrls = watchedImages
        .map((img) => (validateUrl(img) ? img : ""))
        .map((img) => validateImage(img));
      const validatedImages = await Promise.all(validUrls);
      const images = validatedImages.map((_, index) => watchedImages[index]).filter((img) => img);

      setAddGiftState((prev) => ({
        ...prev,
        images: images,
      }));
    })();
  }, [watchedImages.join(",")]);

  const mutation = useMutation({
    mutationFn: addGift,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gifts"] });
      navigate("/");
    },
    onError: () => {
      console.log("Error adding gift");
    },
  });

  const formType = watch("formType");
  const formTypeIsGiftDetails = formType === "giftDetails";
  const formTypeIsGiftPrice = formType === "giftPrice";
  const formTypeIsGiftOccasion = formType === "giftOccasion";
  const formTypeIsGiftUrl = formType === "giftUrl";
  const formTypeIsGiftImages = formType === "giftImages";

  const isValid = Object.keys(errors).length === 0;

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
        dispatchFormAction({
          type: "UPDATE_FORM_DATA",
          payload: data,
          formType: GiftFormTypeEnum.GiftDetails,
        });
        break;
      case "giftPrice":
        setFormType(GiftFormTypeEnum.GiftOccasion);
        dispatchFormAction({
          type: "UPDATE_FORM_DATA",
          payload: data,
          formType: GiftFormTypeEnum.GiftPrice,
        });
        break;
      case "giftOccasion":
        setFormType(GiftFormTypeEnum.GiftUrl);
        dispatchFormAction({
          type: "UPDATE_FORM_DATA",
          payload: data,
          formType: GiftFormTypeEnum.GiftOccasion,
        });
        break;
      case "giftUrl":
        setFormType(GiftFormTypeEnum.GiftImages);
        dispatchFormAction({
          type: "UPDATE_FORM_DATA",
          payload: data,
          formType: GiftFormTypeEnum.GiftUrl,
        });
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
    if (isValid) {
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
            className="relative flex flex-col justify-between mt-[120px] h-[660px] w-[90%] max-w-[600px]">
            <AddGiftFormStepper
              formType={formType}
              isStepsValid={formState.isStepsValid}
              hasError={!isValid}
              setFormType={setFormType}
            />
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
