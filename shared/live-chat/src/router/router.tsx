import type { RouteObject } from "@services/navigation";
import { NavigationOutlet } from "@services/ui";
import { ChatroomSelectScreen } from "../screens/ChatroomSelectScreen";
import { ChatScreen } from "../screens/ChatScreen";

export const useChatRouter = () => {
  return [
    {
      element: <NavigationOutlet />,
      children: [
        { path: "/join-chat", element: <ChatroomSelectScreen /> },
        { path: "/chat-room", element: <ChatScreen /> },
      ],
    },
  ] as const satisfies RouteObject[];
};
