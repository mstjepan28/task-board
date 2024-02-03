import { TaskBoard } from "../components/TaskBoard";
import { MoveTaskProvider } from "../context/moveTaskContext";

export const TaskBoardScreen = () => {
  return (
    <MoveTaskProvider>
      <TaskBoard />
    </MoveTaskProvider>
  );
};
