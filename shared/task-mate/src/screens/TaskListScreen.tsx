import { LoadingIndicator, Searchbar } from "@services/ui";
import { useTaskList } from "../hooks/useTaskList";
import { TaskCard } from "../components/TaskCard";

export const TaskListScreen = () => {
  const taskList = useTaskList();

  return (
    <div className="h-full flex flex-col px-2 py-4">
      <div className="pb-4">
        <Searchbar searchValue={taskList.filters.search} searchFn={taskList.search} />
      </div>

      {taskList.loading.fetching ? (
        <LoadingIndicator size="xl" />
      ) : (
        <div className="basis-full flex flex-col gap-y-4">
          {taskList.dataList.map((task, index) => {
            return <TaskCard key={task.id + index} task={task} />;
          })}
        </div>
      )}
    </div>
  );
};
