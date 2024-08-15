import * as reactRouter from "react-router-dom";
import type { useCryptogramRouter } from "@shared/cryptogram";
import type { useChatRouter } from "@shared/live-chat";
import type { useNumberGuesserRouter } from "@shared/number-guesser";
import type { usePathFinderRouter } from "@shared/path-finder";
import type { useTaskMateRouter } from "@shared/task-mate";
import type { useSudokuRouter } from "@shared/sudoku";
import type { useTodoRouter } from "@shared/todo-app";

type ExtractPaths<T extends reactRouter.RouteObject[]> = {
  [Key in keyof T]: T[Key]["children"] extends reactRouter.RouteObject[]
    ? ExtractPaths<T[Key]["children"]>
    : T[Key]["path"];
}[number];

type TNumberGuesserRouter = ExtractPaths<ReturnType<typeof useNumberGuesserRouter>>;
type TCryptogramRouter = ExtractPaths<ReturnType<typeof useCryptogramRouter>>;
type TPathFinderRouter = ExtractPaths<ReturnType<typeof usePathFinderRouter>>;
type TTaskMateRouter = ExtractPaths<ReturnType<typeof useTaskMateRouter>>;
type TSudokuRouter = ExtractPaths<ReturnType<typeof useSudokuRouter>>;
type TChatRouter = ExtractPaths<ReturnType<typeof useChatRouter>>;
type TTodoRouter = ExtractPaths<ReturnType<typeof useTodoRouter>>;

type TRawRoutes =
  | "/"
  | TNumberGuesserRouter
  | TCryptogramRouter
  | TPathFinderRouter
  | TTaskMateRouter
  | TSudokuRouter
  | TChatRouter
  | TTodoRouter;

type TStripParamPlaceholders<T> = T extends `${infer Start}:${infer _ParamNameToRemove}/${infer Rest}`
  ? `${Start}${string}/${TStripParamPlaceholders<`${Rest}`>}`
  : T extends `${infer Start}:${infer _ParamNameToRemove}`
    ? `${Start}${string}`
    : T;

type TAllowGenericRouteParams<T> = T extends string ? T | `${T}?${string}` : never;

export type TToRoute = string extends TRawRoutes
  ? "README: one or more routers is exporting its routes as generic strings, please refer to the @shared/navigation module for more info."
  : TAllowGenericRouteParams<TStripParamPlaceholders<TRawRoutes>>;

export const useLocation = () => {
  const location = reactRouter.useLocation();

  return {
    ...location,
    pathname: location.pathname as TToRoute,
  };
};
export const useNavigate = () => {
  const navigate = reactRouter.useNavigate();
  return (to: TToRoute, options?: reactRouter.NavigateOptions | undefined) => {
    navigate(to, options);
  };
};
export const Navigate = (
  props: reactRouter.NavigateProps & { to: TToRoute | Partial<reactRouter.Path>; from?: TToRoute },
) => {
  return <reactRouter.Navigate {...props} />;
};
export const Link = (props: reactRouter.LinkProps & { to: TToRoute | Partial<reactRouter.Path>; from?: TToRoute }) => {
  return <reactRouter.Link {...props} />;
};

export type RouteObject = reactRouter.RouteObject;

export const Router = reactRouter.Router;
export const Outlet = reactRouter.Outlet;
export const useParams = reactRouter.useParams;
export const RouterProvider = reactRouter.RouterProvider;
export const useSearchParams = reactRouter.useSearchParams;
export const useOutletContext = reactRouter.useOutletContext;
export const createBrowserRouter = reactRouter.createBrowserRouter;
