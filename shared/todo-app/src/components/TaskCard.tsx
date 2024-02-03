import dayjs from "dayjs";
import { TTask } from "../types/task";

interface IProps {
  task: TTask;
}

export const TaskCard = ({ task }: IProps) => {
  return (
    <div className="bg-white rounded-lg p-2">
      <div>
        <p className="text-sm font-medium">{task.description}</p>
      </div>
      <div className="flex justify-end mt-2">
        <small className="italic">
          {dayjs(task.createdAt).format("DD.MM.YYYY. HH:mm:ss")}
        </small>
      </div>
    </div>
  );
};
