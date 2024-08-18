import { AuthContext } from "@services/auth";
import { Navigate } from "@services/navigation";
import { toast } from "@services/ui";
import dayjs from "dayjs";
import { useContext } from "react";
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
    postponed: null,
    points: 0,
    created_at: dayjs().toISOString(),
    updated_at: dayjs().toISOString(),
  };

  return <TaskForm initData={defaultTaskTemplate} onSubmit={() => {}} isSubmitting={false} />;
};
