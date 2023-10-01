export const TaskStatus = {
  TODO: "todo",
  IN_PROGRESS: "in progress",
  REVIEW: "review",
  DONE: "done",
} as const;

export type TTaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
