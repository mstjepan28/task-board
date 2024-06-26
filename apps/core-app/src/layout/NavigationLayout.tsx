import { Outlet } from "@tanstack/react-router";
// import { NavLink } from "../components/NavLink";

export const NavigationLayout = () => {
  return (
    <div className="h-full flex flex-col bg-gray-950">
      <div className="basis-full max-h-full overflow-y-scroll">
        <Outlet />
      </div>

      {/* <div className="px-4 py-2 flex gap-x-4 text-white border-t">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/task-board">Task board</NavLink>
        <NavLink to="/cryptogram">Cryptogram</NavLink>
        <NavLink to="/chat/join">Live chat</NavLink>
        <NavLink to="/sudoku">Sudoku</NavLink>
        <NavLink to="/path-finder">Path finder</NavLink>
        <NavLink to="/number-guesser">Number guesser</NavLink>
      </div> */}
    </div>
  );
};
