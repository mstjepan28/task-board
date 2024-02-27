import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  type?: "button" | "submit" | "reset" | undefined;
  children?: ReactNode | undefined;
  className?: string | undefined;
}

export const Button = ({ type, children, className }: IProps) => {
  return (
    <button type={type || "button"} className={twMerge("border rounded-lg text-white px-2 py-1", className || "")}>
      {children}
    </button>
  );
};
