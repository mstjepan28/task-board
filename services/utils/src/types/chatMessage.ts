export type TMessageType = "message" | "join" | "leave" | "clear";

export type TMessageBody = {
  type: TMessageType;
  username: string;
  message: string;
  created_at: string;
};
