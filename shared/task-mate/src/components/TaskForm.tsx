import { Button, DatePicker, InputLabel, SelectDropdown, Spacer, Textarea } from "@services/ui";
import type { IFormProps } from "@services/utils";
import { useState } from "react";
import type { TTask } from "../schema/taskSchema";
import { ColorPicker } from "./ColorPicker";
import { TaskCard } from "./TaskCard";
import { CompletionStatus } from "../enums/completionStatus";
import { RepeatCycle } from "../enums/repeatCycle";

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
      <div className="flex flex-col gap-y-4 border rounded-lg p-2 bg-blue-50 dark:bg-blue-950">
        <TaskCard task={{ id: "", ...task }} previewMode />
        <ColorPicker name="color" value={task.color} onChange={(scheme) => onTaskChange("color", scheme)} />
      </div>
      <Spacer />

      <div className="flex flex-col gap-y-4 border rounded-lg p-2 bg-blue-50 dark:bg-blue-950">
        <InputLabel label="Task description">
          <Textarea
            name="description"
            value={task.description}
            onChange={({ target }) => onTaskChange("description", target.value)}
          />
        </InputLabel>
      </div>
      <Spacer />

      <div className=" flex flex-col gap-y-4 border rounded-lg p-2 bg-blue-50 dark:bg-blue-950">
        <InputLabel label="Deadline">
          <DatePicker />
        </InputLabel>

        <InputLabel label="Status">
          <SelectDropdown
            name="status"
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
            name="repeatCycle"
            defaultValue={RepeatCycle.NEVER}
            optionsList={[
              { label: "Never", value: RepeatCycle.NEVER },
              { label: "Daily", value: RepeatCycle.DAILY },
              { label: "Weekly", value: RepeatCycle.WEEKLY },
              { label: "Monthly", value: RepeatCycle.MONTHLY },
            ]}
          />
        </InputLabel>
      </div>
      <Spacer full />

      <Button type="submit" className="w-full text-sm font-semibold uppercase py-2 bg-blue-600 ">
        {editMode ? "Update Task" : "Create Task"}
      </Button>
    </form>
  );
};
