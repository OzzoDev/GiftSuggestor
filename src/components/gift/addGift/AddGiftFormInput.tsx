import { UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ReactNode, useEffect, useState } from "react";
import { AddGiftFieldName, FormStepFields } from "../../../reducers/addGiftReducer";

interface AddGiftFormInputProps {
  type?: "text" | "number" | "url";
  name: AddGiftFieldName;
  placeholder?: string;
  label: string;
  minLength?: number;
  maxLength?: number;
  formValues: UseFormGetValues<FormStepFields>;
  register: UseFormRegister<FormStepFields>;
  setFormValue: UseFormSetValue<FormStepFields>;
  children?: ReactNode;
}

export default function AddGiftFormInput({
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
}: AddGiftFormInputProps) {
  const value = formValues(name);
  const [localValue, setLocalValue] = useState<string | number>("");

  useEffect(() => {
    const fieldValue = formValues(name);
    setLocalValue(fieldValue !== undefined ? fieldValue : "");
  }, [formValues, name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    const parsedValue =
      type === "number" ? (inputValue === "" ? "" : Number(inputValue)) : inputValue;

    setLocalValue(parsedValue);
    setFormValue(name, parsedValue);
  };

  const charCount = localValue ? String(localValue).length : 0;
  const remainingChars = maxLength !== undefined ? maxLength - charCount : undefined;
  const minCharsMet = minLength !== undefined ? charCount >= minLength : false;
  return (
    <div className="flex flex-col gap-y-2 w-full">
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
