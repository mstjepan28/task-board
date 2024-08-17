interface IProps {
  label: string;
  children: React.ReactNode;
}

export const InputLabel = ({ label, children }: IProps) => {
  return (
    <label>
      <span>{label}</span>
      {children}
    </label>
  );
};
