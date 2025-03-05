import { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
import { MdOutlineCircle } from "react-icons/md";
import { GiftFormTypeEnum } from "../../../validations/giftForm";

interface AddGiftFormStepperProps {
  formType: GiftFormTypeEnum;
  isStepsValid: boolean[];
  hasError: boolean;
  setFormType: (formType: GiftFormTypeEnum) => void;
}

export default function AddGiftFormStepper({
  formType,
  isStepsValid,
  hasError,
  setFormType,
}: AddGiftFormStepperProps) {
  const handleStep = (type: GiftFormTypeEnum): void => {
    if (!hasError) {
      setFormType(type);
    }
  };

  const formTypes: GiftFormTypeEnum[] = Object.values(GiftFormTypeEnum) as GiftFormTypeEnum[];

  const isStepFilled = (index: number): boolean => isStepsValid[index];
  const isCurrentStep = (index: number): boolean => index === formTypes.indexOf(formType);

  const stepIcon = (index: number): ReactNode => {
    return isCurrentStep(index) && hasError ? (
      <IoCloseOutline size={24} color="#de0b27" />
    ) : isStepFilled(index) ? (
      <IoCheckmarkOutline size={24} color="#0bdb2a" />
    ) : isCurrentStep(index) ? (
      <MdOutlineCircle size={24} color="#737874" />
    ) : (
      <IoCloseOutline size={24} color="#de0b27" />
    );
  };

  const stepColor = (index: number): string => {
    return isCurrentStep(index) && hasError
      ? "#de0b27"
      : isStepFilled(index)
      ? "#0bdb2a"
      : isCurrentStep(index)
      ? "#737874"
      : "#de0b27";
  };

  return (
    <ul className="flex gap-6 sm:gap-2">
      {formTypes.map((type, index) => {
        const color = stepColor(index);
        const disabled = (!isStepFilled(index) && !isCurrentStep(index)) || hasError;

        return (
          <li key={index} className="flex items-end gap-4">
            <div className="flex flex-col items-center gap-2">
              <span>{stepIcon(index)}</span>
              <button
                type="button"
                onClick={() => handleStep(type as GiftFormTypeEnum)}
                disabled={disabled}
                style={{ borderColor: color }}
                className={`relative py-2 px-4 border-2 rounded-full outline-none transition-all duration-300 ease ${
                  disabled ? "cursor-not-allowed" : "cursor-pointer"
                }`}>
                <span>{index + 1}</span>
              </button>
            </div>
            {index < formTypes.length - 1 && (
              <div
                style={{ backgroundColor: color }}
                className={`hidden sm:block mb-5 mr-2 h-[2px] w-16 transition-all duration-300 ease`}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
