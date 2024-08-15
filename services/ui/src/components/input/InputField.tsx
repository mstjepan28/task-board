import type React from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  id?: string;
  name?: string;
  label: string;
  placeholder?: string;
  className?: string;
  type?: "text" | "number" | "password" | "email";

  defaultValue?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
}: IProps) => {
  return (
    <label className="flex flex-col ">
      <span className="text-sm">{label}</span>

      <input
        id={id}
        name={name}
        type={type || "text"}
        placeholder={placeholder}
        value={value ?? undefined}
        defaultValue={value ?? undefined}
        onChange={onChange}
        className={twMerge("px-2 py-1 bg-black  border border-white !outline-none", className)}
      />
    </label>
  );
};
