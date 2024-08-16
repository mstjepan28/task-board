import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { LoadingIndicator } from "./LoadingIndicator";

interface IProps {
  type?: "button" | "submit" | "reset" | undefined;
  children?: ReactNode | undefined;
  className?: string | undefined;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({ type, onClick, children, className, loading, disabled }: IProps) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={twMerge("relative border rounded-lg px-2 py-1 cursor-pointer", className || "")}
      disabled={disabled || loading}
    >
      {loading && (
        <div className="absolute inset-0 bg-inherit rounded-lg">
          <LoadingIndicator size="sm" />
        </div>
      )}

      {children}
    </button>
  );
};
