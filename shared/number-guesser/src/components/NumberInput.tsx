import type { TFocusDirection } from "../types/types";

interface IProps {
  value: string | undefined;
  onChange: (newValue: string) => void;
  onDelete: () => void;
  shiftFocus: (direction: TFocusDirection) => void;
}

export const NumberInput = ({ value, onChange, onDelete, shiftFocus }: IProps) => {
  const onKeyDown = (key: string) => {
    if (key === "Backspace") {
      onDelete();
    } else if (key === "ArrowLeft") {
      shiftFocus("backward");
    } else if (key === "ArrowRight") {
      shiftFocus("forward");
    } else {
      onChange(key);
    }
  };

  return (
    <input
      type="number"
      value={value}
      onKeyDown={(e) => onKeyDown(e.key)}
      onChange={() => {}}
      className="
        size-16 text-center block rounded-lg text-black bg-white font-medium text-2xl
        focus:ring-0 focus:outline-none 
        [appearance:textfield] 
        [&::-webkit-inner-spin-button]:appearance-none 
        [&::-webkit-outer-spin-button]:appearance-none
      "
    />
  );
};
