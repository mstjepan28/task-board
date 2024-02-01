import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Dashboard = () => {
  return (
    <>
      <div className="h-[100svh] w-full items-center justify-center bg-gray-800">
        <div className="px-4 py-2 flex gap-x-4 text-white border-b mb-4">
          <Link to="/" className="[&.active]:underline [&.active]:font-medium">
            Home
          </Link>
          <Link to="/task-board" className="[&.active]:underline [&.active]:font-medium">
            Task board
          </Link>
          <Link to="/brick-breaker" className="[&.active]:underline [&.active]:font-medium">
            Brick breaker
          </Link>
        </div>

        <div>
          <Outlet />
        </div>
      </div>

      <TanStackRouterDevtools />
    </>
  );
};
