import { TTask } from "../types/task";

interface IProps {
  task: TTask;
}

export const TaskCard = ({ task }: IProps) => {
  console.log(task.status, task.description);
  return <div>{task.description}</div>;
};
