import { Button, TextArea } from "@services/ui";
import { type FormEvent, useContext } from "react";
import { TaskListContext } from "../../context/TaskListContext";
import type { TTask } from "../../types/task";

interface IProps {
  initData: TTask | undefined;
  onClose: () => void;
}

export const TaskForm = ({ initData, onClose }: IProps) => {
  const { createTask } = useContext(TaskListContext);
  const isEdit = initData?.id !== undefined;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries());

    const description = formValues.description as string;
    createTask("pending", description);

    event.currentTarget.reset();
    onClose();
  };

  return (
    <form onSubmit={onSubmit} className="px-4 py-2 space-y-2 bg-white h-full">
      <div className="flex items-center gap-x-4 mb-4">
        <button type="reset" onClick={onClose} className="text-lg border-white">
          X
        </button>

        <span className="text-lg">{isEdit ? "Edit task" : "Create new task"}</span>
      </div>

      <div className="grid gap-y-4">
        <TextArea label="Input field" name="description" className="min-h-16" />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
