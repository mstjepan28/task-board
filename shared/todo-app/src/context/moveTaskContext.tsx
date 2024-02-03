import { createContext } from "react";
import { useMoveTask } from "../hooks/useMoveTask";
import { ReactNode } from "react";

type TUseMoveTask = ReturnType<typeof useMoveTask>;
export const MoveTaskContext = createContext<TUseMoveTask>({} as TUseMoveTask);

export const MoveTaskProvider = ({ children }: { children: ReactNode }) => {
  const moveTask = useMoveTask();
  return <MoveTaskContext.Provider value={moveTask}>{children}</MoveTaskContext.Provider>;
};
