import { useState } from "react";
import { IOverlayElement } from "../../types/overlay";
import { TaskForm } from "../forms/TaskForm";
import { BaseDrawer } from "./BaseDrawer";
import { TTask } from "../../types/task";

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
