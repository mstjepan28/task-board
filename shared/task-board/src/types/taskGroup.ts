import { TTask } from "./task";

export type TTaskGroup = {
  id: string;
  title: string;
  order: number;
  taskList: TTask[];
};
