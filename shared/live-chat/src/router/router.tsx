import type { RouteObject } from "@services/navigation";
import { NoLayoutOutlet } from "@services/ui";
import { ChatroomSelectScreen } from "../screens/ChatroomSelectScreen";
import { ChatScreen } from "../screens/ChatScreen";

export const useChatRouter = () => {
  return [
    {
      element: <NoLayoutOutlet />,
      children: [
        { path: "/join-chat", element: <ChatroomSelectScreen /> },
        { path: "/chat-room", element: <ChatScreen /> },
      ],
    },
  ] as const satisfies RouteObject[];
};
