import type { TTaskStatus } from "../enums/taskStatus";

export type TTask = {
  id: string;
  ordinalNumber: number;
  description: string;
  status: TTaskStatus;
  created_at: string;
  updated_at: string;
};
