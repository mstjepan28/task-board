import { createRoute } from "@tanstack/react-router";
import type { AnyRoute } from "@tanstack/react-router";
import { ChatScreen } from "../screens/ChatScreen";

export const createModuleRouter = <T extends AnyRoute>(rootRoute: T) => {
  const chat = createRoute({
    getParentRoute: () => rootRoute,
    path: "/chat",
    component: ChatScreen,
  });

  return [chat];
};
