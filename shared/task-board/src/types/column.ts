import { TTask } from "./task";

export type TColumn = {
  id: string;
  title: string;
  taskList: TTask[];
};
