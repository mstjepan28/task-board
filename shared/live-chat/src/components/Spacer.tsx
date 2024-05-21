import { useMemo } from "react";

type TSize = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

interface IProps {
  size?: TSize | undefined;
}

export const Spacer = ({ size }: IProps) => {
  const height = useMemo((): `${number}px` => {
    if (!size) {
      return "8px";
    }

    const pixels = {
      xxs: 1,
      xs: 2,
      sm: 4,
      md: 8,
      lg: 16,
      xl: 32,
      xxl: 64,
    }[size];

    return `${pixels}px`;
  }, [size]);

  return <div style={{ height }} />;
};
