import { useNavigate } from "@tanstack/react-router";

export const useChatroom = () => {
  const navigate = useNavigate();

  const join = (username: string, roomId: string) => {
    navigate({
      to: "/chat/room",
      search: { roomId, username },
    });
  };

  const leave = () => {
    navigate({ to: "/chat/join" });
  };

  return { join, leave };
};
