import { deepCopy } from "@services/utils";
import { useMemo, useRef, useState } from "react";
import { INPUT_LENGTH, VALID_NUMBERS, generateInputArray, generateRandomNumber } from "../utils/helpers";

type TFocusDirection = "forward" | "backward";

export const NumberGuesserScreen = () => {
  const [inputValues, setInputValues] = useState(generateInputArray());
  const [guessList, setGuessList] = useState<string[]>([]);

  const randomNumber = useMemo(generateRandomNumber, []);

  // ------------------------------------------ //
  // --- Input element handling --------------- //
  // ------------------------------------------ //
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const inputArr = useMemo(generateInputArray, [INPUT_LENGTH]);

  // ------------------------------------------ //
  // --- Handle new input --------------------- //
  // ------------------------------------------ //
  const updateNewInput = (index: number, newValue: string) => {
    if (!VALID_NUMBERS.includes(newValue)) {
      return;
    }

    const inputCopy = deepCopy(inputValues);
    inputCopy[index] = newValue;

    setInputValues(inputCopy);
    shiftInputFocusForward(index);
  };
  const shiftInputFocusForward = (index: number) => {
    const inputWrapper = inputWrapperRef.current;
    if (!inputWrapper) {
      return;
    }

    const nextInput = inputWrapperRef.current.querySelectorAll("input")[index + 1];
    nextInput?.focus();
  };

  // ------------------------------------------ //
  // --- Handle input delete ------------------ //
  // ------------------------------------------ //
  const deleteInput = (index: number) => {
    if (!inputValues[index]) {
      shiftInputFocusBackward(index);
      return;
    }

    const inputCopy = deepCopy(inputValues);
    inputCopy[index] = "";

    setInputValues(inputCopy);
  };
  const shiftInputFocusBackward = (index: number) => {
    const inputWrapper = inputWrapperRef.current;
    if (!inputWrapper) {
      return;
    }

    const nextInput = inputWrapperRef.current.querySelectorAll("input")[index - 1];
    nextInput?.focus();
  };

  const shiftFocus = (index: number, direction: TFocusDirection) => {
    if (direction === "forward") {
      shiftInputFocusForward(index);
    } else if (direction === "backward") {
      shiftInputFocusBackward(index);
    }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasEmptyInputs = inputValues.some((value) => !value);
    if (hasEmptyInputs) {
      console.log("Please fill all inputs");
      return;
    }

    const alreadyTried = guessList.some((guess) => guess === inputValues.join(""));
    if (alreadyTried) {
      console.log("You already tried this combination");
      return;
    }

    const hasRepeatingDigits = new Set(inputValues).size !== inputValues.length;
    if (hasRepeatingDigits) {
      console.log("Repeating digits are not allowed");
      return;
    }

    const inputString = inputValues.join("");
    if (inputString === randomNumber) {
      alert("You win!");
    } else {
      setGuessList((prev) => [...prev, inputString]);
    }
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="w-full h-full flex flex-col items-center justify-end gap-y-4 p-4 text-white"
    >
      <div className="size-full max-h-full overflow-y-scroll flex flex-col items-center justify-end gap-y-2">
        {guessList.map((guess, index) => {
          return <PreviousGuess key={`${guess}-${index}`} guess={guess} />;
        })}
      </div>

      <div ref={inputWrapperRef} className="flex gap-x-4">
        {inputArr.map((_, index) => {
          return (
            <NumberInput
              key={index}
              value={inputValues[index]}
              onDelete={() => deleteInput(index)}
              onChange={(newValue) => updateNewInput(index, newValue)}
              shiftFocus={(direction) => shiftFocus(index, direction)}
            />
          );
        })}

        <button type="submit" className="sr-only" />
      </div>
    </form>
  );
};

interface INumberInputProps {
  value: string | undefined;
  onChange: (newValue: string) => void;
  onDelete: () => void;
  shiftFocus: (direction: TFocusDirection) => void;
}

const NumberInput = ({ value, onChange, onDelete, shiftFocus }: INumberInputProps) => {
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

const PreviousGuess = ({ guess }: { guess: string }) => {
  return (
    <div className="flex gap-x-4">
      {guess.split("").map((char, index) => {
        return (
          <div key={index} className="size-16 flex justify-center items-center rounded-lg border">
            {char}
          </div>
        );
      })}
    </div>
  );
};
