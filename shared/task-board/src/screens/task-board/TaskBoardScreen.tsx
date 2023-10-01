import { generateMockTasks } from "../../utils/generateMockData";
import { TaskBoardUi } from "./TaskBoardUi";

export const TaskBoardScreen = () => {
  const taskList = generateMockTasks(10);
  return <TaskBoardUi taskList={taskList} />;
};
