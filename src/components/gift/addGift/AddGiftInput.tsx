import React, { ReactNode } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type InputValueType = string | number;

type InputType = "text" | "number" | "url";

interface AddGiftInputProps {
  label: string;
  type?: InputType;
  value: InputValueType;
  placeholder?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  errorMessage?: string;
  onChange: (value: InputValueType) => void;
  children?: ReactNode;
}

const AddGiftInput = React.forwardRef<HTMLInputElement, AddGiftInputProps>(
  (
    {
      label,
      type = "text",
      placeholder = "",
      min,
      max,
      minLength,
      maxLength,
      value,
      onChange,
      errorMessage,
      children,
      ...props
    },
    ref
  ) => {
    const charCount = value ? String(value).length : 0;
    const remainingChars = maxLength !== undefined ? maxLength - charCount : undefined;
    const minCharsMet = minLength !== undefined ? charCount >= minLength : false;

    const controlledValue = value === "undefined" || !value ? "" : value;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const inputValue = e.target.value;
      onChange(type === "number" ? Number(inputValue) : inputValue);
    };

    return (
      <div className="flex flex-col gap-y-2 w-full">
        <div className={`flex justify-between mb-4 ${errorMessage ? "opacity-100" : "opacity-0"}`}>
          <p className="text text-red-500 font-bold">{errorMessage}</p>
          <HiOutlineExclamationCircle size={24} color="red" />
        </div>
        <div
          className={`p-4 border-2 rounded-md ${
            errorMessage ? "border-red-500" : "border-transparent"
          }`}>
          <label className="text-lg text-slate-600 font-medium">{label}</label>
          <input
            ref={ref}
            type={type}
            value={controlledValue}
            placeholder={placeholder}
            min={min}
            max={max}
            minLength={minLength}
            maxLength={maxLength}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            onChange={handleChange}
            {...props}
            className="mb-2 p-2 w-full border-0 outline-none border-b-2 border-gray-400"
          />
          {(minLength !== undefined || maxLength !== undefined) && (
            <div className="text-sm text-gray-600">
              {minCharsMet ? (
                remainingChars !== undefined ? (
                  <span>
                    <span className="text-black font-semibold">{remainingChars}</span> char&nbsp;
                    {remainingChars !== 1 ? "s" : ""} remaining
                  </span>
                ) : (
                  "Minimum characters met"
                )
              ) : (
                <span>
                  A minimum of {min} characters is required. The current character count is
                  <span className="text-black font-semibold">&nbsp;{charCount}.</span>
                </span>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }
);

export default AddGiftInput;
