// import { useReducer } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { AddGiftFormFields, addGiftReducer, FormStepFields, initialState } from "../../../reducers/addGiftReducer";
// import AddGiftForm from "./AddGiftForm";
// import AddGiftFormControls from "./AddGiftFormControls";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// export default function AddGiftMultiStepForm() {
//   const [state, dispatch] = useReducer(addGiftReducer, initialState);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm<AddGiftFormFields>({
//     resolver: zodResolver(currentSchema as z.ZodType<AddGiftFormFields>),
//     // resolver: zodResolver(currentSchema as z.ZodType<AddGiftFormFields>),
//     shouldUnregister: false,
//   });

//   const onSubmit: SubmitHandler<FormStepFields> = (data) => {
//     dispatch({
//       type: "UPDATE_FORM_DATA",
//       payload: { ...data },
//       shouldStepNext: true,
//     });
//   };

//   const submitFromChild = (): void => {
//     onSubmit(getValues());
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] max-w-[520px]">
//         <AddGiftFormControls
//           addGiftState={state}
//           addGiftAction={dispatch}
//           onSubmit={submitFromChild}>
//           <AddGiftForm
//             currentFormStep={state.formStep}
//             formValues={getValues}
//             register={register}
//             setFormValue={setValue}
//           />
//         </AddGiftFormControls>
//       </form>
//     </div>
//   );
// }
