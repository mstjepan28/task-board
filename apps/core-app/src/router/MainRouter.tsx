import { createRootRoute, createRouter } from "@tanstack/react-router";
import { NavigationLayout } from "../layout/NavigationLayout";
// import * as sudokuModule from "@shared/sudoku";
// import * as todoModule from "@shared/todo-app";
// import * as chatModule from "@shared/live-chat";
// import * as pathFinder from "@shared/path-finder";
// import * as cryptogramModule from "@shared/cryptogram";
import * as numberGuesserModule from "@shared/number-guesser";

export const createMainRouter = () => {
  const rootRoute = createRootRoute({ component: NavigationLayout });
  type TRootRoute = typeof rootRoute;

  const numberGuesserRouter = numberGuesserModule.createModuleRouter<TRootRoute>(rootRoute);
  return createRouter({
    routeTree: rootRoute.addChildren(numberGuesserRouter),
  });

  // const indexRoute = createRoute({
  //   getParentRoute: () => rootRoute,
  //   path: "/",
  //   component: () => <></>,
  // });

  // const chatRouter = chatModule.createModuleRouter<TRootRoute>(rootRoute);
  // const todoRouter = todoModule.createModuleRouter<TRootRoute>(rootRoute);
  // const sudokuRouter = sudokuModule.createModuleRouter<TRootRoute>(rootRoute);
  // const pathFinderRouter = pathFinder.createModuleRouter<TRootRoute>(rootRoute);
  // const cryptogramRouter = cryptogramModule.createModuleRouter<TRootRoute>(rootRoute);
  // const numberGuesserRouter = numberGuesserModule.createModuleRouter<TRootRoute>(rootRoute);

  // const routerGroup = [
  //   indexRoute,
  //   todoRouter,
  //   sudokuRouter,
  //   pathFinderRouter,
  //   chatRouter,
  //   cryptogramRouter,
  //   numberGuesserRouter,
  // ].flat();

  // return createRouter({
  //   routeTree: rootRoute.addChildren(routerGroup),
  // });
};
