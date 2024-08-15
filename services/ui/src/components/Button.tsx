import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  type?: "button" | "submit" | "reset" | undefined;
  children?: ReactNode | undefined;
  className?: string | undefined;
  onClick?: () => void;
}

export const Button = ({ type, onClick, children, className }: IProps) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={twMerge("border rounded-lg  px-2 py-1", className || "")}
    >
      {children}
    </button>
  );
};
