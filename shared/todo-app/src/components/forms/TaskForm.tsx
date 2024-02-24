import { FormEvent } from "react";
import { TTask } from "../../types/task";

interface IProps {
  initData: TTask;
  onClose: () => void;
}

export const TaskForm = ({ initData, onClose }: IProps) => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
  };

  return (
    <form onSubmit={onSubmit} className="p-1 space-y-2">
      <button type="button" onClick={onClose} className="text-xs">
        close
      </button>
      <pre className="text-xs">{JSON.stringify(initData, null, 2)}</pre>
    </form>
  );
};
