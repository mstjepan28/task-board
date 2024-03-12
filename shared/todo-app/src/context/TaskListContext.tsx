import { type ReactNode, createContext } from "react";
import { useTaskList } from "../hooks/useTaskList";

type TUseTask = ReturnType<typeof useTaskList>;
export const TaskListContext = createContext<TUseTask>({} as TUseTask);

export const TaskListProvider = ({ children }: { children: ReactNode }) => {
  const taskListHandler = useTaskList();

  return <TaskListContext.Provider value={taskListHandler}>{children}</TaskListContext.Provider>;
};
