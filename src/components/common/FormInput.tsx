import { UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ReactNode, useEffect, useState } from "react";
import {
  AddGiftFieldName,
  AddGiftFormFields,
  AddGiftFormSteps,
} from "../../reducers/addGiftReducer";

interface FormInputProps {
  type?: "text" | "number" | "url";
  name: AddGiftFieldName;
  placeholder?: string;
  label: string;
  minLength?: number;
  maxLength?: number;
  formValues: UseFormGetValues<AddGiftFormFields>;
  register: UseFormRegister<AddGiftFormFields>;
  setFormValue: UseFormSetValue<AddGiftFormFields>;
  children?: ReactNode;
}

export default function FormInput({
  type = "text",
  name,
  placeholder = "",
  label,
  minLength,
  maxLength,
  formValues,
  register,
  setFormValue,
  children,
}: FormInputProps) {
  const value = formValues(name);
  const [charCount, setCharCount] = useState<number>(value ? String(value).length : 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;

    setCharCount(inputValue.length);
    setFormValue(name, inputValue);
  };

  const remainingChars = maxLength !== undefined ? maxLength - charCount : undefined;
  const minCharsMet = minLength !== undefined ? charCount >= minLength : false;

  return (
    <div className="flex flex-col gap-y-2">
      <label className="text-lg text-slate-600 font-medium">{label}</label>
      <div className="flex items-end p-2 border-b-2 border-gray-400">
        <input
          {...register(name)}
          type={type}
          value={value || ""}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          onChange={handleChange}
          className="w-full border-0 outline-none"
        />
      </div>
      {(minLength !== undefined || maxLength !== undefined) && (
        <div className="text-sm text-gray-600">
          {minCharsMet ? (
            remainingChars !== undefined ? (
              <span>
                <span className="text-black font-semibold">{remainingChars}</span> char{" "}
                {remainingChars !== 1 ? "s" : ""} remaining
              </span>
            ) : (
              "Minimum characters met"
            )
          ) : (
            <span>
              A minimum of {minLength} characters is required. The current character count is
              <span className="text-black font-semibold">&nbsp;{charCount}.</span>
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
