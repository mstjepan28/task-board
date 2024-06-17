export type TFocusDirection = "forward" | "backward";

export type TFeedbackMessageType = "error" | "feedback";

export type TFeedbackContent = {
  correct: number;
  misplaced: number;
  guess: string;
};

export type TMessage = {
  content: string | TFeedbackContent;
  type: TFeedbackMessageType;
};

export type TDigitState = "correct" | "misplaced" | "not-used";

export type TMarkedDigits = {
  digit: string;
  state: TDigitState;
};
