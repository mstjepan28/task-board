import { createBrowserRouter, Navigate, RouterProvider } from "@services/navigation";
import { useCryptogramRouter } from "@shared/cryptogram";
import { useChatRouter } from "@shared/live-chat";
import { useNumberGuesserRouter } from "@shared/number-guesser";
import { usePathFinderRouter } from "@shared/path-finder";
import { useSudokuRouter } from "@shared/sudoku";
import { useTaskMateRouter } from "@shared/task-mate";
import { useTodoRouter } from "@shared/todo-app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        structuralSharing: false,
        gcTime: 60 * 1000 * 5,
        staleTime: 60 * 1000 * 4,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};
