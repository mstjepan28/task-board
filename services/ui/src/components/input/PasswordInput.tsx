import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { type ITextInputProps, TextInput } from "./TextInput";
import { InputType, type TInputType } from "../../../types/InputTypes";

export const PasswordInput = (passwordInputProps: ITextInputProps) => {
  const [inputType, setInputType] = useState<TInputType>(InputType.PASSWORD);

  const toggleInputType = () => {
    setInputType(inputType === InputType.PASSWORD ? InputType.TEXT : InputType.PASSWORD);
  };

  return (
    <div className="relative w-full">
      <TextInput type={inputType} {...passwordInputProps} />

      <button type="button" onClick={toggleInputType} className="absolute right-3 top-9">
        {inputType === InputType.PASSWORD ? (
          <HiEye size="24" className="text-gray-500" />
        ) : (
          <HiEyeSlash size="24" className="text-gray-500" />
        )}
      </button>
    </div>
  );
};
