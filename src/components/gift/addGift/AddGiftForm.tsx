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

export default function AddGiftForm() {
  const formMethods = useForm<GiftFormSchemaProps>({
    resolver: zodResolver(giftFormSchema),
    defaultValues: {
      // formType: GiftFormTypeEnum.GiftDetails,
      // formType: GiftFormTypeEnum.GiftPrice,
      // formType: GiftFormTypeEnum.GiftOccasion,
      // formType: GiftFormTypeEnum.GiftUrl,
      formType: GiftFormTypeEnum.GiftImages,
    },
  });

  const { watch, getValues, handleSubmit } = formMethods;

  const formType = watch("formType");
  const formTypeIsGiftDetails = formType === "giftDetails";
  const formTypeIsGiftPrice = formType === "giftPrice";
  const formTypeIsGiftOccasion = formType === "giftOccasion";
  const formTypeIsGiftUrl = formType === "giftUrl";
  const formTypeIsGiftImages = formType === "giftImages";

  const setFormType = (formType: GiftFormTypeEnum): void => {
    formMethods.setValue("formType", formType);
  };

  const handleNextFormType = (): void => {
    switch (formType) {
      case "giftDetails":
        setFormType(GiftFormTypeEnum.GiftPrice);
        break;
      case "giftPrice":
        setFormType(GiftFormTypeEnum.GiftOccasion);
        break;
      case "giftOccasion":
        setFormType(GiftFormTypeEnum.GiftUrl);
        break;
      case "giftUrl":
        setFormType(GiftFormTypeEnum.GiftImages);
        break;
      case "giftImages":
        console.log("Gift added: ", getValues());
        break;
    }

    console.log("Update form type on form submit: ", formType);
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
      <div className="flex justify-center items-center min-h-screen">
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
      </div>
    </FormProvider>
  );
}
