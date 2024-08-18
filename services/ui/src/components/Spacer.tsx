interface IProps {
  size?: number;
  full?: boolean;
}

export const Spacer = ({ size, full }: IProps) => {
  if (full) {
    return <div className="basis-full" />;
  }

  return <div style={{ height: `${size ?? 4}rem` }} />;
};
