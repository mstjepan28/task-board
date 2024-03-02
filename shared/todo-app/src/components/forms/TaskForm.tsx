import { Button, InputField } from "@services/ui-library";
import { FormEvent, useMemo } from "react";
import { TTask } from "../../types/task";

interface IProps {
  initData: TTask | undefined;
  onClose: () => void;
}

export const TaskForm = ({ initData, onClose }: IProps) => {
  const isEdit = initData?.id !== undefined;

  const title = useMemo(() => {
    return isEdit ? "Edit task" : "Create new task";
  }, [isEdit]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries());
    console.log(JSON.stringify(formValues, null, 2));

    onClose();
  };

  return (
    <form onSubmit={onSubmit} className="px-4 py-2 space-y-2 bg-black text-white border-l border-l-white h-full">
      <div className="flex items-center gap-x-4 mb-4">
        <button type="reset" onClick={onClose} className="text-lg border-white">
          X
        </button>

        <span className="text-lg">{title}</span>
      </div>

      <div className="grid gap-y-4">
        <InputField label="Input field" name="field#1" />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
