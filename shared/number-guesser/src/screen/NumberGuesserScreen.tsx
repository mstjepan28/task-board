import { deepCopy } from "@services/utils";
import { useMemo, useRef, useState } from "react";
import { MessageList } from "../components/MessageList";
import { NumberInput } from "../components/NumberInput";
import { StatusMenu } from "../components/StatusMenu";
import type {
  TDigitState,
  TFeedbackContent,
  TFeedbackMessageType,
  TFocusDirection,
  TMarkedDigits,
  TMessage,
  TSelectedDigit,
} from "../types/types";
import { INPUT_LENGTH, VALID_NUMBERS, generateInputArray, generateRandomNumber } from "../utils/helpers";

export const NumberGuesserScreen = () => {
  const [inputValues, setInputValues] = useState(generateInputArray());
  const randomNumber = useMemo(generateRandomNumber, []);

  console.log(randomNumber);

  // ------------------------------------------ //
  // --- Message handling --------------------- //
  // ------------------------------------------ //

  const [selectedDigit, setSelectedDigit] = useState<TSelectedDigit | null>(null);
  const [markedDigits, setMarkedDigits] = useState<TMarkedDigits[]>([]);
  const [messageList, setMessageList] = useState<TMessage[]>([]);

  const onDigitClick = (index: number, digit: string) => {
    const isSameDigit = selectedDigit?.digit === digit;
    const isSameIndex = selectedDigit?.index === index;

    if (isSameDigit && isSameIndex) {
      setSelectedDigit(null);
      return;
    }

    setSelectedDigit({ index, digit });
  };

  const onStatusClick = (status: TDigitState | null) => {
    if (!selectedDigit) {
      return;
    }

    if (status === null) {
      const filtered = markedDigits.filter((digit) => digit.digit !== selectedDigit?.digit);
      setMarkedDigits(filtered);

      return;
    }

    const newMarkedDigits = deepCopy(markedDigits);
    const digitIndex = newMarkedDigits.findIndex((digit) => digit.digit === selectedDigit.digit);

    console.log(digitIndex);

    if (digitIndex === -1) {
      newMarkedDigits.push({
        state: status,
        index: selectedDigit.index,
        digit: selectedDigit.digit,
      });
    } else {
      newMarkedDigits[digitIndex].index = selectedDigit.index;
      newMarkedDigits[digitIndex].state = status;
    }

    setMarkedDigits(newMarkedDigits);
  };

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

  const createNewMessage = (content: string | TFeedbackContent, type: TFeedbackMessageType) => {
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

    setSelectedDigit(null);
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
      <StatusMenu selectedDigit={selectedDigit} onStatusClick={onStatusClick} />

      <form onSubmit={onFormSubmit} className="size-full flex flex-col items-center justify-end gap-y-4 p-4 text-white">
        <div className="basis-full max-h-full overflow-y-auto flex flex-col items-center justify-end gap-y-2">
          <MessageList
            messageList={messageList}
            onDigitClick={onDigitClick}
            selectedDigit={selectedDigit}
            markedDigits={markedDigits}
          />
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
