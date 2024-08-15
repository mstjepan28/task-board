import { useMemo } from "react";
import type { TTask } from "../schema/taskSchema";
import { Link } from "@services/navigation";
import dayjs from "dayjs";
import { FaUser } from "react-icons/fa";

interface IProps {
  task: TTask;
}

export const TaskCard = ({ task }: IProps) => {
  const colors = useMemo(() => {
    const [primary, secondary, text] = task.color?.split("|") ?? [];
    return { primary, secondary, text };
  }, [task.color]);

  const deadLine = useMemo(() => {
    const dayjsDate = dayjs(task.deadline);

    if (dayjsDate.diff(dayjs(), "hours") > 24) {
      return dayjsDate.format("DD MMM");
    }

    return `${dayjsDate.format("h")}h left`;
  }, [task.deadline]);

  const assignedTo = useMemo(() => {
    const numOfAssignees = task.assigned_to.length;
    if (numOfAssignees > 2) {
      return numOfAssignees;
    }

    return task.assigned_to.map((u) => u.name).join(", ");
  }, [task.assigned_to]);

  const primaryStyle = { backgroundColor: colors.primary };
  const secondaryStyle = { backgroundColor: colors.secondary };

  return (
    <div style={{ color: colors.text }} className="relative">
      <Link to={`/task/edit/${task.id}`} style={primaryStyle} className="block px-4 py-2 rounded-md shadow-xl">
        {/* Description */}
        <div className="pb-2">
          <p className="text-sm text-white font-semibold">{task.description}</p>
        </div>

        <div className="flex items-center justify-between">
          {/* Assigned to badge */}
          <div style={secondaryStyle} className="flex gap-x-2 items-center px-3 py-1 rounded-full">
            <FaUser size={14} />
            <span className="text-sm font-semibold">{assignedTo}</span>
          </div>

          {/* Deadline */}
          <span className="font-semibold">{deadLine}</span>
        </div>
      </Link>

      <div className="absolute inset-x-0 -z-10 -bottom-2">
        <div style={secondaryStyle} className="w-[95%] h-7 mx-auto rounded-md" />
      </div>
    </div>
  );
};
