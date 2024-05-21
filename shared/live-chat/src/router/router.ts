import { createRoute } from "@tanstack/react-router";
import type { AnyRoute } from "@tanstack/react-router";
import { ChatScreen } from "../screens/ChatScreen";
import { ChatroomSelectScreen } from "../screens/ChatroomSelectScreen";

export const createModuleRouter = <T extends AnyRoute>(rootRoute: T) => {
  const baseChatScreen = createRoute({
    getParentRoute: () => rootRoute,
    path: "/chat/join",
    component: ChatroomSelectScreen,
  });

  const chatroomScreen = createRoute({
    getParentRoute: () => rootRoute,
    path: "/chat/room",
    component: ChatScreen,
    validateSearch: (search: Record<string, unknown>) => {
      return {
        chatroomId: search.chatroomId,
        username: search.username,
      };
    },
  });

  return [baseChatScreen, chatroomScreen];
};
