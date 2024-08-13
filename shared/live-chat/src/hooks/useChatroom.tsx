import { useEffect } from "react";
import { storage } from "@services/storage";
import { useNavigate } from "@services/navigation";

type TChatDetails = {
  username: string;
  roomId: string;
};

export const useChatroom = () => {
  const navigate = useNavigate();

  const join = (username: string, roomId: string) => {
    storage.setItem("chat-details", { username, roomId });
    navigate(`/join-chat?roomId=${roomId}&username=${username}`);
  };

  const leave = () => {
    storage.removeItem("chat-details");
    navigate("/join-chat");
  };

  useEffect(() => {
    const chatDetails = storage.getItem<TChatDetails>("chat-details");
    if (chatDetails) {
      join(chatDetails.username, chatDetails.roomId);
    }
  }, []);

  return { join, leave };
};
