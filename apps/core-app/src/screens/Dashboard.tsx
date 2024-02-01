import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Dashboard = () => {
  return (
    <>
      <div className="p-2 flex gap-2 bg-blue-600">
        <Link to="/">Home</Link>
      </div>

      <Outlet />

      <TanStackRouterDevtools />
    </>
  );
};
