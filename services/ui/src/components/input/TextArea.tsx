import type React from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  id?: string;
  name?: string;
  label: string;
  placeholder?: string;
  className?: string;

  defaultValue?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({ id, name, label, value, onChange, placeholder = "", className = "" }: IProps) => {
  return (
    <label className="flex flex-col text-white">
      <span className="text-sm">{label}</span>

      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value ?? undefined}
        defaultValue={value ?? undefined}
        onChange={onChange}
        className={twMerge("resize-none px-2 py-1 bg-black text-white border border-white !outline-none", className)}
      />
    </label>
  );
};
