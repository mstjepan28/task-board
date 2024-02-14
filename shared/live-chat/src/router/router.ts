import { AnyRoute, createRoute } from "@tanstack/react-router";
import { Chat } from "../screens/Chat";

export const createModuleRouter = <T extends AnyRoute>(rootRoute: T) => {
  const chat = createRoute({
    getParentRoute: () => rootRoute,
    path: "/chat",
    component: Chat,
  });

  return [chat];
};
