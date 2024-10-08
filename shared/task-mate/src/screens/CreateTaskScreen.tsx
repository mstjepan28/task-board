import { AuthContext } from "@services/auth";
import { Link, Navigate } from "@services/navigation";
import { toast } from "@services/ui";
import dayjs from "dayjs";
import { useContext } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { TaskForm } from "../components/TaskForm";
import { ColorPallet } from "../enums/colorPallet";
import { CompletionStatus } from "../enums/completionStatus";
import { RepeatCycle } from "../enums/repeatCycle";
import type { TTask } from "../schema/taskSchema";

export const CreateTaskScreen = () => {
  const { authUser } = useContext(AuthContext);

  if (!authUser) {
    toast.error("You need to login to create a task");
    return <Navigate to="/login" />;
  }

  const defaultTaskTemplate: Omit<TTask, "id"> = {
    description: "",
    assigned_by: {
      id: authUser.id,
      name: authUser.name,
    },
    assigned_to: [],
    color: ColorPallet.BLUE,
    repeatCycle: RepeatCycle.NEVER,
    status: CompletionStatus.PENDING,
    deadline: dayjs().add(1, "week").startOf("day").set("hour", 12).toISOString(),
    points: 0,
    created_at: dayjs().toISOString(),
    updated_at: dayjs().toISOString(),
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex gap-x-4 items-center p-2 border-b">
        <Link to="/task-list">
          <HiChevronLeft size={24} />
        </Link>
        <span className="font-medium text-lg">Create new task</span>
      </div>

      <div className="basis-full overflow-y-auto">
        <TaskForm initData={defaultTaskTemplate} onSubmit={() => {}} isSubmitting={false} />
      </div>
    </div>
  );
};
