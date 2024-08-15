import { useMemo } from "react";
import type { TLoaderSize } from "../types/loaderSize";

interface IProps {
  size?: TLoaderSize;
  color?: `border-t-${string}-${number}`;
}

export const LoadingIndicator = ({ size = "xl", color }: IProps) => {
  const sizeStyles = useMemo(() => {
    const defaultSize = "w-10 h-10 border-4";

    const selectedSize = {
      xl: defaultSize,
      lg: "w-8 h-8 border-4",
      md: "w-6 h-6 border-2",
      sm: "w-4 h-4 border-2",
      xs: "w-2 h-2 border",
    }[size];

    if (!selectedSize) {
      return defaultSize;
    }

    return selectedSize;
  }, [size]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className={`${sizeStyles} animate-spin rounded-full border-gray-200 ${color || "border-t-blue-600"}`}></div>
    </div>
  );
};
