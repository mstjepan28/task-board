import { Button, Textarea } from "@services/ui";
import type { IFormProps } from "@services/utils";
import { useState } from "react";
import type { TTask } from "../schema/taskSchema";
import { ColorPicker } from "./ColorPicker";
import { TaskCard } from "./TaskCard";

// ------------------------------------------------
//  FIELD NAME     |  FIELD TYPE
// ------------------------------------------------
// "description":  |  "string",
// "assigned-by":  |  "uuid",
// "assigned-to":  |  "uuid[]",
// color:          |  "rgba",
// repeatCycle:    |  "never|daily|weekly|monthly",
// deadline:       |  "iso-datetime",
// postponed:      |  "iso-datetime",
// status:         |  "pending|inProgress|closed|done",
// points:         |  "float",
// ------------------------------------------------

type TNewTask = Omit<TTask, "id">;

interface IProps extends IFormProps<TNewTask> {
  initData: TNewTask;
}

export const TaskForm = ({ initData, onDelete }: IProps) => {
  const [task, setTask] = useState<TNewTask>(initData);
  const editMode = !!onDelete;

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    console.log(formValues);
  };

  const onTaskChange = (key: keyof TNewTask, value: string) => {
    setTask((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form onSubmit={onFormSubmit} className="h-full flex flex-col p-4">
      <div className="pt-4 pb-8">
        <TaskCard task={{ id: "", ...task }} previewMode />
      </div>

      <ColorPicker name="color" value={task.color} onChange={(scheme) => onTaskChange("color", scheme)} />

      <div className="h-4" />

      <label>
        <div className="font-medium pb-1">Task description: </div>
        <Textarea
          name="description"
          value={task.description}
          onChange={({ target }) => onTaskChange("description", target.value)}
        />
      </label>

      <div className="basis-full" />

      <Button type="submit" className="w-full text-sm font-semibold uppercase py-2 text-white bg-blue-600">
        {editMode ? "Update Task" : "Create Task"}
      </Button>
    </form>
  );
};
