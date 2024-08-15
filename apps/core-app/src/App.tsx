import { createBrowserRouter, Navigate, RouterProvider } from "@services/navigation";
import { useCryptogramRouter } from "@shared/cryptogram";
import { useChatRouter } from "@shared/live-chat";
import { useNumberGuesserRouter } from "@shared/number-guesser";
import { usePathFinderRouter } from "@shared/path-finder";
import { useSudokuRouter } from "@shared/sudoku";
import { useTaskMateRouter } from "@shared/task-mate";
import { useTodoRouter } from "@shared/todo-app";

export const App = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([
        { path: "/", element: <Navigate to="/sudoku" replace /> },
        ...useNumberGuesserRouter(),
        ...usePathFinderRouter(),
        ...useCryptogramRouter(),
        ...useTaskMateRouter(),
        ...useSudokuRouter(),
        ...useChatRouter(),
        ...useTodoRouter(),
        {
          path: "*",
          element: <div className="h-screen flex justify-center items-center">404 - Page not found</div>,
        },
      ])}
    />
  );
};
