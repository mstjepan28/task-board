import dayjs from "dayjs";
import { TaskForm } from "../components/TaskForm";
import { ColorPallet } from "../enums/colorPallet";
import type { TTask } from "../schema/taskSchema";
import { CompletionStatus } from "../enums/completionStatus";

export const CreateTaskScreen = () => {
  const defaultTaskTemplate: Omit<TTask, "id"> = {
    description: "Task description",
    assigned_by: { id: "mock_id", name: "" },
    assigned_to: [{ id: "mock_id", name: "Me" }],
    color: ColorPallet.BLUE,
    repeatCycle: "never",
    deadline: dayjs().toISOString(),
    postponed: null,
    status: CompletionStatus.PENDING,
    points: 5,
    created_at: dayjs().toISOString(),
    updated_at: dayjs().toISOString(),
  };

  return <TaskForm initData={defaultTaskTemplate} onSubmit={() => {}} isSubmitting={false} />;
};
