import type { TFeedbackContent, TMarkedDigits, TMessage, TSelectedDigit } from "../types/types";
import { PreviousGuess } from "./PreviousGuess";

interface IProps {
  messageList: TMessage[];
  markedDigits: TMarkedDigits[];
  selectedDigit: TSelectedDigit | null;
  onDigitClick: (index: number, digit: string) => void;
}

export const MessageList = ({ messageList, selectedDigit, markedDigits, onDigitClick }: IProps) => {
  return messageList.map((message, index) => {
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
          onDigitClick={(digit) => onDigitClick(index, digit)}
        />

        <div className="flex justify-center gap-x-3 py-2">
          <span className="text-sm bg-green-600 px-4 py-1">{msgContent.correct} correct</span>
          <span className="text-sm bg-yellow-500 px-4 py-1">{msgContent.misplaced} misplaced</span>
        </div>
      </div>
    );
  });
};
