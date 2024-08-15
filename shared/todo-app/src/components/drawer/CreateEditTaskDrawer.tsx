import { BaseDrawer } from "@services/ui";
import { useState } from "react";
import type { IOverlayElement } from "../../types/overlay";
import type { TTask } from "../../types/task";
import { TaskForm } from "../forms/TaskForm";

export const CreateEditTaskDrawer = ({ baseRef }: IOverlayElement) => {
  const closeModal = () => baseRef?.current?.close() || (() => console.error("baseRef is not defined"));

  const [selectedTask, setSelectedTask] = useState<TTask | undefined>(undefined);

  const onOpen = (task?: unknown) => {
    setSelectedTask(task as TTask | undefined);
  };

  return (
    <BaseDrawer ref={baseRef} onOpen={onOpen} closeOnOutsideClick>
      <TaskForm initData={selectedTask} onClose={closeModal} />
    </BaseDrawer>
  );
};
