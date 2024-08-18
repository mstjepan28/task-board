interface IProps {
  label: string;
  children: React.ReactNode;
}

export const InputLabel = ({ label, children }: IProps) => {
  return (
    <label>
      <div className="pb-2 font-medium text-sm">{label}</div>
      {children}
    </label>
  );
};
