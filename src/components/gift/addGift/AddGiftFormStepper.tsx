import { AddGiftAction, AddGiftFormSteps, NUM_FORM_STEPS } from "../../../reducers/addGiftReducer";

interface AddGiftFormStepperProps {
  currentFormStep: AddGiftFormSteps;
  addGiftAction: React.ActionDispatch<[action: AddGiftAction]>;
}

export default function AddGiftFormStepper({
  currentFormStep,
  addGiftAction,
}: AddGiftFormStepperProps) {
  const handleStep = (step: number): void => {
    addGiftAction({ type: "STEP", payload: step });
  };

  return (
    <ul className="flex gap-6 sm:gap-2">
      {Array.from({ length: NUM_FORM_STEPS }, (_, index) => {
        return (
          <li key={index} className="flex items-center">
            <button
              onClick={() => handleStep(index + 1)}
              className={`py-2 px-4 border-2 rounded-full outline-none cursor-pointer transition-all duration-300 ease ${
                index >= currentFormStep ? "border-gray-600" : "border-green-500"
              }`}>
              {index + 1}
            </button>
            {index < NUM_FORM_STEPS - 1 && (
              <div
                className={`hidden sm:block ml-2 h-[2px] w-16 transition-all duration-300 ease ${
                  index >= currentFormStep - 1 ? "bg-gray-600" : "bg-green-500"
                }`}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
