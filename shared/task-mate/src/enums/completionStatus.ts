export const CompletionStatus = {
  PENDING: "pending",
  IN_PROGRESS: "inProgress",
  CLOSED: "closed",
  DONE: "done",
} as const;

export type TCompletionStatus = (typeof CompletionStatus)[keyof typeof CompletionStatus];
