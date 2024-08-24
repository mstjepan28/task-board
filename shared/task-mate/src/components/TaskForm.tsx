import { FirebaseContext } from "@services/firebase";
import { useNavigate } from "@services/navigation";
import { Button, DatePicker, InputLabel, SelectDropdown, Spacer, Textarea, toast } from "@services/ui";
import type { IFormProps } from "@services/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { CompletionStatus } from "../enums/completionStatus";
import { QueryKeys } from "../enums/queryKeys";
import { RepeatCycle } from "../enums/repeatCycle";
import { newTaskSchema, type TTask } from "../schema/taskSchema";
import { ColorPicker } from "./ColorPicker";
import { FriendPicker } from "./FriendPicker";
import { TaskCard } from "./TaskCard";
import { useFormValidation } from "@services/validation";

type TNewTask = Omit<TTask, "id">;

interface IProps extends IFormProps<TNewTask> {
  initData: TNewTask;
}

export const TaskForm = ({ initData, onDelete }: IProps) => {
  const [task, setTask] = useState<TNewTask>(initData);
  const queryClient = useQueryClient();
  const editMode = !!onDelete;

  const { createDocument } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const validation = useFormValidation(newTaskSchema);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const formValues: Record<string, unknown> = Object.fromEntries(formData.entries());
    formValues.assigned_to = (formValues.assigned_to as string).split(",");

    try {
      const newTask = newTaskSchema.parse({ ...initData, ...formValues });

      createDocument("tasks", newTask).then(() => {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.TASK_LIST] });
        navigate("/task-list");

        toast.success("Successfully created a new task");
      });
    } catch (error: any) {
      console.log(error.issues);
      toast.error("Error creating task");
    }
  };

  const onTaskChange = (key: keyof TNewTask, value: string) => {
    setTask((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form onSubmit={onFormSubmit} className="h-full flex flex-col p-4">
      <div className="flex flex-col gap-y-4 border rounded-lg p-2 bg-blue-50 dark:bg-blue-950">
        <TaskCard task={{ id: "", ...task }} previewMode />
        <ColorPicker
          name={validation.fieldNames.color}
          value={task.color}
          onChange={(scheme) => onTaskChange("color", scheme)}
        />
      </div>
      <Spacer />

      <div className="flex flex-col gap-y-4 border rounded-lg p-2 bg-blue-50 dark:bg-blue-950">
        <InputLabel label="Task description">
          <Textarea
            value={task.description}
            name={validation.fieldNames.description}
            onChange={({ target }) => onTaskChange("description", target.value)}
            className="resize-none"
          />
        </InputLabel>
      </div>
      <Spacer />

      <div className=" flex flex-col gap-y-4 border rounded-lg p-2 bg-blue-50 dark:bg-blue-950">
        <InputLabel label="Deadline">
          <DatePicker name={validation.fieldNames.deadline} defaultValue={initData.deadline} />
        </InputLabel>

        <InputLabel label="Status">
          <SelectDropdown
            name={validation.fieldNames.status}
            defaultValue={CompletionStatus.PENDING}
            optionsList={[
              { label: "Pending", value: CompletionStatus.PENDING },
              { label: "In progress", value: CompletionStatus.IN_PROGRESS },
              { label: "Closed", value: CompletionStatus.CLOSED },
              { label: "Done", value: CompletionStatus.DONE },
            ]}
          />
        </InputLabel>

        <InputLabel label="How often should this task repeat?">
          <SelectDropdown
            name={validation.fieldNames.repeatCycle}
            defaultValue={RepeatCycle.NEVER}
            optionsList={[
              { label: "Never", value: RepeatCycle.NEVER },
              { label: "Daily", value: RepeatCycle.DAILY },
              { label: "Weekly", value: RepeatCycle.WEEKLY },
              { label: "Monthly", value: RepeatCycle.MONTHLY },
            ]}
          />
        </InputLabel>

        <InputLabel label="Select users to assign this task to">
          <FriendPicker name={validation.fieldNames.assigned_to} />
        </InputLabel>
      </div>

      <Spacer full />

      <Button type="submit" className="w-full text-sm font-semibold uppercase py-2 bg-blue-600 ">
        {editMode ? "Update Task" : "Create Task"}
      </Button>
    </form>
  );
};
