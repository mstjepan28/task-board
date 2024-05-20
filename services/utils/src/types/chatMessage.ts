export type TMessageBody = {
  type: "message" | "join" | "leave" | "clear";
  username: string;
  message: string;
  created_at: string;
};
