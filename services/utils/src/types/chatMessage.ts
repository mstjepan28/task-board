export type TMessageBody = {
  type: "message" | "join" | "leave";
  username: string;
  message: string;
  created_at: string;
};
