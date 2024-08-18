import { createBrowserRouter, Navigate, RouterProvider } from "@services/navigation";
import { useCryptogramRouter } from "@shared/cryptogram";
import { useChatRouter } from "@shared/live-chat";
import { useLoginRouter } from "@shared/login";
import { useNumberGuesserRouter } from "@shared/number-guesser";
import { usePathFinderRouter } from "@shared/path-finder";
import { useSudokuRouter } from "@shared/sudoku";
import { useTaskMateRouter } from "@shared/task-mate";
import { useTodoRouter } from "@shared/todo-app";

export const MainRouter = () => {
  const numberGuesserRouter = useNumberGuesserRouter();
  const pathFinderRouter = usePathFinderRouter();
  const cryptogramRouter = useCryptogramRouter();
  const taskMateRouter = useTaskMateRouter();
  const sudokuRouter = useSudokuRouter();
  const loginRouter = useLoginRouter();
  const chatRouter = useChatRouter();
  const todoRouter = useTodoRouter();

  const gotoMain = { path: "/", element: <Navigate to="/task-list" replace /> };
  const notFound = {
    path: "*",
    element: <div className="h-screen flex justify-center items-center">404 - Page not found</div>,
  };

  return (
    <RouterProvider
      router={createBrowserRouter([
        gotoMain,
        ...numberGuesserRouter,
        ...pathFinderRouter,
        ...cryptogramRouter,
        ...taskMateRouter,
        ...sudokuRouter,
        ...loginRouter,
        ...chatRouter,
        ...todoRouter,
        notFound,
      ])}
    />
  );
};
