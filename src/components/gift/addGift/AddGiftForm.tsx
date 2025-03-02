import { AddGiftFormSteps } from "../../../reducers/addGiftReducer";

interface AddGiftFormProps {
  currentFormStep: AddGiftFormSteps;
}

export default function AddGiftForm({ currentFormStep }: AddGiftFormProps) {
  console.log("Current step: ", currentFormStep);

  switch (currentFormStep) {
    case 1:
      return <p>Step 1</p>;
    case 2:
      return <p>Step 2</p>;
    case 3:
      return <p>Step 3</p>;
    case 4:
      return <p>Step 4</p>;
    case 5:
      return <p>Step 5</p>;
  }
}
