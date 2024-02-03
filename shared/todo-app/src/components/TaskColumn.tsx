import { TTask } from "../types/task";
import { TaskCard } from "./TaskCard";

interface IProps {
  title: string;
  taskList: TTask[];
}

export const TaskColumn = ({ title, taskList }: IProps) => {
  return (
    <div className="basis-full px-2 rounded-md bg-white/10 border border-white">
      <div className="text-white font-semibold border-b p-2">{title}</div>
      <div className="space-y-2 py-4">
        {taskList.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
