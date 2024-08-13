import type { TMarkedDigits, TSelectedDigit } from "../types/types";

interface IProps {
  guess: string;
  selectedDigit: TSelectedDigit | null;
  markedDigits: TMarkedDigits[];
  onDigitClick: (digit: string) => void;
}

const CORRECT_COLOR = "bg-green-600";
const MISPLACED_COLOR = "bg-yellow-500";
const NOT_USED_COLOR = "bg-red-600";

export const PreviousGuess = ({ guess, onDigitClick, selectedDigit, markedDigits }: IProps) => {
  console.log(JSON.stringify({ selectedDigit, markedDigits }, null, 2));

  const getMarkedDigitColor = (charIndex: number, digitState: TMarkedDigits | undefined) => {
    if (!digitState) {
      return "";
    }

    if (digitState.state === "correct") {
      if (charIndex === digitState.index) {
        return CORRECT_COLOR;
      }

      return MISPLACED_COLOR;
    }

    if (digitState.state === "misplaced") {
      return MISPLACED_COLOR;
    }

    if (digitState.state === "not-used") {
      return NOT_USED_COLOR;
    }

    throw new Error(`Invalid digit state ${digitState.state}}`);
  };

  return (
    <div className="flex gap-x-4">
      {guess.split("").map((char, index) => {
        const digitMark = markedDigits.find((digit) => digit.digit === char);
        const bgColor = getMarkedDigitColor(index, digitMark);

        return (
          <button
            type="button"
            key={index}
            onClick={() => onDigitClick(char)}
            className={`size-16 flex justify-center items-center rounded-lg border ${bgColor}`}
          >
            <span
              data-selected={selectedDigit?.digit === char && selectedDigit?.index === index}
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
