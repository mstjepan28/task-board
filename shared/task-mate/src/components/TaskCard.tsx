import { useMemo } from "react";
import type { TTask } from "../schema/taskSchema";
import { Link } from "@services/navigation";

interface IProps {
  task: TTask;
}

export const TaskCard = ({ task }: IProps) => {
  const cardBgColor = useMemo(() => {
    return { backgroundColor: task.color ?? "white" };
  }, [task.color]);

  return (
    <Link to={`/tasks/edit/${task.id}`} style={cardBgColor} className="px-2 py-1 rounded-lg">
      {task.description}
    </Link>
  );
};
