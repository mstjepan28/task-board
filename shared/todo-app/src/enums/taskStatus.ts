import type { TypeFromEnum } from "@services/utils";

export const TaskStatus = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELED: "canceled",
  FAILED: "failed",
} as const;

export type TTaskStatus = TypeFromEnum<typeof TaskStatus>;
