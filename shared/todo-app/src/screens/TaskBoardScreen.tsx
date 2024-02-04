import { TaskBoard } from "../components/TaskBoard";
import { TaskListProvider } from "../context/TaskListContext";

export const TaskBoardScreen = () => {
  return (
    <TaskListProvider>
      <TaskBoard />
    </TaskListProvider>
  );
};
