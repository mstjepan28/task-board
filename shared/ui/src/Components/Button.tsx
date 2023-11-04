interface IProps {
  label: string;
  onClick: () => void;
}

export const Button = ({ label, onClick }: IProps) => {
  return (
    <button type="button" onClick={onClick} className="w-fit px-4 py-1 rounded-lg bg-white">
      {label}
    </button>
  );
};
