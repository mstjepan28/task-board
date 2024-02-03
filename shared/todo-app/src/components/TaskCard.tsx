import { TTask } from "../types/task";

interface IProps {
  task: TTask;
}

export const TaskCard = ({ task }: IProps) => {
  return <div>{task.description}</div>;
};
