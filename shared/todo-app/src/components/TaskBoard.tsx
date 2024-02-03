import { TaskColumn } from "./TaskColumn";

export const TaskBoard = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex basis-full gap-x-4 mx-8 my-4">
        <TaskColumn title="To do" taskList={[]} />
        <TaskColumn title="In progress" taskList={[]} />
        <TaskColumn title="Done" taskList={[]} />
      </div>
    </div>
  );
};
