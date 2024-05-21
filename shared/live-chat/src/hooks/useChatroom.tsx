import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { storage } from "@services/storage";

type TChatDetails = {
  username: string;
  roomId: string;
};

export const useChatroom = () => {
  const navigate = useNavigate();

  const join = (username: string, roomId: string) => {
    storage.setItem("chat-details", { username, roomId });
    navigate({ to: "/chat/room", search: { roomId, username } });
  };

  const leave = () => {
    storage.removeItem("chat-details");
    navigate({ to: "/chat/join" });
  };

  useEffect(() => {
    const chatDetails = storage.getItem<TChatDetails>("chat-details");
    if (chatDetails) {
      join(chatDetails.username, chatDetails.roomId);
    }
  }, []);

  return { join, leave };
};
