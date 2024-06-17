import type { TMarkedDigits } from "../types/types";

interface IProps {
  guess: string;
  selectedDigit: string | null;
  markedDigits: TMarkedDigits[];
  onDigitClick: (digit: string) => void;
}
export const PreviousGuess = ({ guess, onDigitClick, selectedDigit, markedDigits }: IProps) => {
  const getMarkedDigitColor = (digitState: TMarkedDigits["state"] | undefined) => {
    if (!digitState) {
      return "";
    }

    return {
      correct: "bg-green-600",
      misplaced: "bg-yellow-500",
      "not-used": "bg-red-600",
    }[digitState];
  };

  return (
    <div className="flex gap-x-4">
      {guess.split("").map((char, index) => {
        const isDigitState = markedDigits.find((digit) => digit.digit === char)?.state;
        const bgColor = getMarkedDigitColor(isDigitState);

        return (
          <button
            type="button"
            key={index}
            onClick={() => onDigitClick(char)}
            className={`size-16 flex justify-center items-center rounded-lg border ${bgColor}`}
          >
            <span
              data-selected={char === selectedDigit}
              className="font-bold text-xl transition-all data-[selected=true]:text-3xl"
            >
              {char}
            </span>
          </button>
        );
      })}
    </div>
  );
};
