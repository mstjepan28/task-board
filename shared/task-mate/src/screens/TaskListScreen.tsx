import { LoadingIndicator } from "@services/ui";
import { useTaskList } from "../hooks/useTaskList";

export const TaskListScreen = () => {
  const taskList = useTaskList();

  if (taskList.loading.fetching) {
    return <LoadingIndicator size="xl" />;
  }

  return (
    <div>
      {taskList.dataList.map((task) => (
        <div key={task.id}>{task.description}</div>
      ))}
    </div>
  );
};
