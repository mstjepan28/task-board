interface IProps {
  label: string;
  onClick: () => void;
}

export const ActionButton = ({ label, onClick }: IProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center py-1 cursor-pointer select-none"
    >
      <span className="text-xs text-white/25">{label}</span>
    </button>
  );
};
