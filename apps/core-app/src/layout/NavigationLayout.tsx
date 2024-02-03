import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { NavLink } from "../components/NavLink";

export const NavigationLayout = () => {
  return (
    <>
      <div className="h-[100svh] w-full items-center justify-center bg-gray-800">
        <div className="px-4 py-2 flex gap-x-4 text-white border-b mb-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/task-board">Task board</NavLink>
          <NavLink to="/brick-breaker">Brick breaker</NavLink>
          <NavLink to="/cryptogram">Cryptogram</NavLink>
          <NavLink to="/live-chat">Live chat</NavLink>
          <NavLink to="/sudoku">Sudoku</NavLink>
        </div>

        <div>
          <Outlet />
        </div>
      </div>

      <TanStackRouterDevtools />
    </>
  );
};
