import { useTask } from "../../hooks/task-hooks/useTask";
import { TaskBoardUi } from "./TaskBoardUi";

export const TaskBoardScreen = () => {
  const { taskGroupList, onTaskMove } = useTask();

  return <TaskBoardUi taskGroupList={taskGroupList} onTaskMove={onTaskMove} />;
};
