import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Dashboard = () => {
  return (
    <>
      <div className="h-[100svh] w-full items-center justify-center bg-gray-800">
        <div className="p-2 flex gap-2 bg-blue-600">
          <Link to="/">Home</Link>
          <Link to="/task-board">Task board</Link>
          <Link to="/brick-breaker">Brick breaker</Link>
        </div>

        <Outlet />
      </div>

      <TanStackRouterDevtools />
    </>
  );
};
