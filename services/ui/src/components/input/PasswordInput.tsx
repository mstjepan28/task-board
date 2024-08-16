import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import type { IInputProps } from "../../types/inputTypes";
import { TextInput } from "../..";

export const PasswordInput = (passwordInputProps: IInputProps<HTMLInputElement>) => {
  const [inputType, setInputType] = useState<"text" | "password">("password");

  const toggleInputType = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="relative w-full">
      <TextInput type={inputType} {...passwordInputProps} />

      <button type="button" onClick={toggleInputType} className="absolute right-3 top-9">
        {inputType === "password" ? (
          <HiEye size="24" className="text-gray-500" />
        ) : (
          <HiEyeSlash size="24" className="text-gray-500" />
        )}
      </button>
    </div>
  );
};
