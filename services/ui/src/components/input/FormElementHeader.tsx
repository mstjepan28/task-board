import { twMerge } from "tailwind-merge";

interface IProps {
  name?: string;
  label?: string;
  required?: boolean;
  isDataValid?: boolean;
  tooltip?: string | JSX.Element;
  className?: string;
}

export const FormElementHeader = ({ isDataValid, name, label, required, className }: IProps) => {
  const shouldRender = label || required;
  if (!shouldRender) {
    return <></>;
  }

  return (
    <div className={twMerge("mb-2 flex items-center", className)}>
      <label
        htmlFor={name}
        data-valid={isDataValid ?? true}
        className="whitespace-nowrap text-sm font-medium leading-5 text-gray-900 data-[valid=false]:text-red-600"
      >
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
    </div>
  );
};
