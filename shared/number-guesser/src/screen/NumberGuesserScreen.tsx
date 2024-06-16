import { deepCopy } from "@services/utils";
import { useMemo, useRef, useState } from "react";
import { INPUT_LENGTH, VALID_NUMBERS, generateInputArray, generateRandomNumber } from "../utils/helpers";

type TFocusDirection = "forward" | "backward";

type TMessageType = "error" | "feedback";
type TMessage = { content: string | TFeedbackContent; type: TMessageType };
type TFeedbackContent = { correct: number; misplaced: number; guess: string };

type TDigitState = "correct" | "misplaced" | "not-used";
type TMarkedDigits = {
  digit: string;
  state: TDigitState;
};

export const NumberGuesserScreen = () => {
  const [inputValues, setInputValues] = useState(generateInputArray());
  const randomNumber = useMemo(generateRandomNumber, []);

  // ------------------------------------------ //
  // --- Message handling --------------------- //
  // ------------------------------------------ //

  const [markedDigits, setMarkedDigits] = useState<TMarkedDigits[]>([]);
  const [selectedDigit, setSelectedDigit] = useState<string | null>(null);

  const onDigitClick = (digit: string) => {
    if (selectedDigit === digit) {
      setSelectedDigit(null);
      return;
    }

    setSelectedDigit(digit);
  };

  const onStatusClick = (status: TDigitState | null) => {
    if (!selectedDigit) {
      return;
    }

    if (status === null) {
      const filtered = markedDigits.filter((digit) => digit.digit !== selectedDigit);
      setMarkedDigits(filtered);

      return;
    }

    const newMarkedDigits = deepCopy(markedDigits);
    const digitIndex = newMarkedDigits.findIndex((digit) => digit.digit === selectedDigit);

    if (digitIndex === -1) {
      newMarkedDigits.push({ digit: selectedDigit, state: status });
    } else {
      newMarkedDigits[digitIndex].state = status;
    }

    setMarkedDigits(newMarkedDigits);
  };

  // ------------------------------------------ //
  // --- Message handling --------------------- //
  // ------------------------------------------ //
  const [messageList, setMessageList] = useState<TMessage[]>([]);

  const evaluateGuess = (guess: string): TFeedbackContent => {
    const randNumberArr = randomNumber.split("");
    const guessArr = guess.split("");

    let correct = 0;
    let misplaced = 0;

    for (let i = 0; i < guessArr.length; i++) {
      if (guessArr[i] === randNumberArr[i]) {
        correct++;
      } else if (randNumberArr.includes(guessArr[i])) {
        misplaced++;
      }
    }

    return {
      guess: guess,
      correct: correct,
      misplaced: misplaced,
    };
  };

  const createNewMessage = (content: string | TFeedbackContent, type: TMessageType) => {
    const newMessage = { content, type };
    setMessageList((prev) => [...prev, newMessage]);
  };

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

  const resetFocus = () => {
    const inputWrapper = inputWrapperRef.current;
    if (!inputWrapper) {
      return;
    }

    const firstInput = inputWrapper.querySelectorAll("input")[0];
    firstInput.focus();
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasEmptyInputs = inputValues.some((value) => !value);
    if (hasEmptyInputs) {
      createNewMessage("Please fill all inputs", "error");
      return;
    }

    const hasRepeatingDigits = new Set(inputValues).size !== inputValues.length;
    if (hasRepeatingDigits) {
      createNewMessage("Repeating digits are not allowed", "error");
      return;
    }

    const inputString = inputValues.join("");
    if (inputString === randomNumber) {
      setMarkedDigits([]);
      setMessageList([]);

      alert("You win!");
    } else {
      const evaluatedGuess = evaluateGuess(inputString);
      createNewMessage(evaluatedGuess, "feedback");
    }

    setInputValues(generateInputArray());
    resetFocus();
  };

  return (
    <>
      <div className="absolute top-0 right-0 overflow-hidden">
        <div
          data-open={!!selectedDigit}
          className="flex flex-col gap-y-4 p-4 rounded-l-lg bg-black/50 transition-all translate-x-full data-[open=true]:translate-x-0"
        >
          <button
            type="button"
            onClick={() => onStatusClick("correct")}
            className="border rounded-lg border-white size-12 bg-green-600"
          />
          <button
            type="button"
            onClick={() => onStatusClick("misplaced")}
            className="border rounded-lg border-white size-12 bg-yellow-500"
          />
          <button
            type="button"
            onClick={() => onStatusClick("not-used")}
            className="border rounded-lg border-white size-12 bg-red-600"
          />
          <button
            type="button"
            onClick={() => onStatusClick(null)}
            className="border rounded-lg border-white size-12 text-white"
          >
            clear
          </button>
        </div>
      </div>

      <form onSubmit={onFormSubmit} className="size-full flex flex-col items-center justify-end gap-y-4 p-4 text-white">
        <div className="basis-full max-h-full overflow-y-auto flex flex-col items-center justify-end gap-y-2">
          {messageList.map((message, index) => {
            const msgContent = message.content as TFeedbackContent;

            if (message.type === "error") {
              if (typeof msgContent !== "string") {
                throw new Error("Invalid message content for error message type");
              }

              return (
                <div key={index} className="text-sm bg-red-600 px-4 py-1">
                  {msgContent}
                </div>
              );
            }

            if (typeof msgContent !== "object") {
              throw new Error("Invalid message content for feedback message type");
            }

            return (
              <div key={index}>
                <PreviousGuess
                  key={index}
                  guess={msgContent.guess}
                  selectedDigit={selectedDigit}
                  markedDigits={markedDigits}
                  onDigitClick={onDigitClick}
                />

                <div className="flex justify-center gap-x-3 py-2">
                  <span className="text-sm bg-green-600 px-4 py-1">{msgContent.correct} correct</span>
                  <span className="text-sm bg-yellow-500 px-4 py-1">{msgContent.misplaced} misplaced</span>
                </div>
              </div>
            );
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
    </>
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

interface IPreviousGuessProps {
  guess: string;
  selectedDigit: string | null;
  markedDigits: TMarkedDigits[];
  onDigitClick: (digit: string) => void;
}
const PreviousGuess = ({ guess, onDigitClick, selectedDigit, markedDigits }: IPreviousGuessProps) => {
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
