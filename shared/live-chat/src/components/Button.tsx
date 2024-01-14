interface IProps {
  type?: "button" | "submit" | "reset";
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button = ({ type, label, onClick, disabled }: IProps) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className="
        border rounded-lg px-2 py-1 bg-white 
        hover:bg-gray-100 active:bg-gray-200
        disabled:opacity-50 disabled:cursor-not-allowed
      "
      disabled={disabled}
    >
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
};
