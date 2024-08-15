import { twMerge } from "tailwind-merge";

interface IProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export const ActionButton = ({ label, onClick, className }: IProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge("flex items-center py-1 text-xs cursor-pointer select-none", className)}
    >
      {label}
    </button>
  );
};
